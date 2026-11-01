#!/usr/bin/env python3
"""Miki dashboard: a JSON API + the Tabler page, served on the Air's Tailscale address only (private to your devices).
  MIKI_HOST=100.107.126.69 python3 tools/dash/server.py        # http://100.107.126.69:8787  (launchd: com.miki.dash)
Standard library only. Data: db.py (SQLite). Videos come from the Air's episode copy or the local Telegram server;
thumbnails from macOS QuickLook; screenshot numbers from macOS Vision (ocrparse.py).
"""
import json, os, sys, mimetypes, statistics, subprocess, datetime, re, glob
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlsplit, parse_qs
HERE = Path(__file__).parent
sys.path.insert(0, str(HERE)); import db, ocrparse

HOST, PORT = os.environ.get("MIKI_HOST", "127.0.0.1"), int(os.environ.get("MIKI_PORT", "8787"))
STATIC = HERE / "static"
OPS = Path.home() / "miki-ops"
STATS, THUMBS = OPS / "stats", OPS / "thumbs"
EPISODES = HERE.parents[1] / "04_episodes"
NUM = ("views", "avg_watch", "full_pct", "likes", "comments", "shares", "saves", "follows", "fyp_pct")
STARTED = db.now()


# ---------- video, thumbnails ----------
def video_path(ep):
    """The episode's final: the Air's copy (export/), else the file the local Telegram server keeps for the stored final."""
    for d in EPISODES.glob(ep + "_*"):
        ex = sorted(d.glob("export/*-Final.mp4")) or sorted(d.glob("export/*.mp4"))
        if ex: return ex[0]
    try:
        sys.path.insert(0, str(HERE.parent)); import tgstore
        ix = tgstore.load_index()
        v = next((v for v in tgstore.files(ix).values() if v["episode"] == ep and v["role"] == "final"), None)
        if v:
            p = tgstore.local_file(v["file_id"])
            if p.exists(): return p
    except Exception as e:
        print(f"video {ep}: {type(e).__name__}", flush=True)      # never the message: local Telegram paths contain the bot token
    return None


def thumb_path(ep):
    THUMBS.mkdir(parents=True, exist_ok=True); t = THUMBS / f"{ep}.png"
    if t.exists(): return t
    v = video_path(ep)
    if not v: return None
    link = THUMBS / f"_{ep}.mp4"                                  # Telegram's stored files have no extension: QuickLook needs one
    try:
        link.unlink(missing_ok=True); link.symlink_to(v)
        subprocess.run(["qlmanage", "-t", "-s", "540", "-o", str(THUMBS), str(link)], capture_output=True, timeout=45)
    except (OSError, subprocess.SubprocessError):
        print(f"thumb {ep}: failed", flush=True)
    finally:
        link.unlink(missing_ok=True)
    made = THUMBS / (link.name + ".png")
    if made.exists(): made.rename(t)
    return t if t.exists() else None


# ---------- state ----------
def median(a):
    a = sorted(x for x in a if x is not None); return statistics.median(a) if a else None


def state():
    with db.conn() as c:
        db.auto_post(c)
        eps = [dict(r) for r in c.execute("select * from episodes order by id")]
        posts = [dict(r) for r in c.execute("select * from posts order by coalesce(posted_at, planned_at)")]
        mets = [dict(r) for r in c.execute("select * from metrics")]
        inbox = [dict(r) for r in c.execute("select * from inbox order by received_at desc")]
        due = db.due(c); s = db.settings(c)
    for e in eps:
        e["stack"] = json.loads(e["stack"] or "{}")
        e["has_video"] = any(EPISODES.glob(e["id"] + "_*/export/*.mp4")) or e["status"] in ("ready", "posted")
    for i in inbox: i["suggest"] = json.loads(i["suggest"]) if i["suggest"] else {}
    byp = {}
    for m in mets: byp.setdefault(m["post_id"], {})[m["checkpoint"]] = m
    for p in posts: p["metrics"] = byp.get(p["id"], {})
    v72 = [p["metrics"]["72h"]["views"] for p in posts if p["platform"] == "tiktok" and p["metrics"].get("72h", {}).get("views") is not None]
    return {"episodes": eps, "posts": posts, "inbox": inbox, "due": due, "settings": s, "median_72h_tiktok": median(v72),
            "checkpoints": db.CHECKPOINTS, "platforms": db.PLATFORMS, "server": {"started": STARTED, "now": db.now()}}


def save_shot(ep, cp, data, ext, origin="upload"):
    d = STATS / ep; d.mkdir(parents=True, exist_ok=True)
    f = d / f"{cp}_{datetime.datetime.now().strftime('%Y%m%d-%H%M%S')}_{origin}{ext}"; f.write_bytes(data)
    sug = ocrparse.read(str(f))
    return db.add_inbox(ep, cp, f"{ep}/{f.name}", sug, origin), sug


def write_metrics(c, d):
    vals = [d.get(k) if d.get(k) not in ("", None) else None for k in NUM]
    c.execute(f"insert into metrics(post_id, checkpoint, {', '.join(NUM)}, source, recorded_at) values(?,?,{','.join('?' * len(NUM))},?,?) "
              f"on conflict(post_id, checkpoint) do update set {', '.join(f'{k}=excluded.{k}' for k in NUM)}, source=excluded.source, recorded_at=excluded.recorded_at",
              [d["post_id"], d["checkpoint"], *vals, d.get("source", "manual"), db.now()])


class H(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"
    def log_message(self, *a): pass
    def handle_one_request(self):
        try: super().handle_one_request()
        except Exception as e: print(f"request error: {type(e).__name__}", flush=True)   # no tracebacks: paths can hold the token

    def send(self, code, body, ctype="application/json", extra=None):
        b = body if isinstance(body, bytes) else json.dumps(body).encode()
        self.send_response(code); self.send_header("Content-Type", ctype); self.send_header("Content-Length", str(len(b)))
        self.send_header("Cache-Control", "no-store")
        for k, v in (extra or {}).items(): self.send_header(k, v)
        self.end_headers(); self.wfile.write(b)

    def file(self, p, download=None):
        """Serve a file with Range support (Safari won't play a video without it)."""
        if not p or not Path(p).is_file(): return self.send(404, {"error": "not found"})
        p = Path(p); size = p.stat().st_size; ctype = mimetypes.guess_type(p.name)[0] or "application/octet-stream"
        rng = self.headers.get("Range"); start, end = 0, size - 1
        if rng and (m := re.match(r"bytes=(\d*)-(\d*)", rng)):
            if m.group(1): start = int(m.group(1))
            if m.group(2): end = min(int(m.group(2)), size - 1)
            elif not m.group(1): start = max(0, size - int(m.group(2) or 0))
        self.send_response(206 if rng else 200); self.send_header("Content-Type", ctype); self.send_header("Accept-Ranges", "bytes")
        self.send_header("Content-Length", str(end - start + 1))
        if rng: self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        if download: self.send_header("Content-Disposition", f'attachment; filename="{download}"')
        self.send_header("Cache-Control", "max-age=3600" if "/media/video" in self.path else "no-cache"); self.end_headers()
        with open(p, "rb") as f:
            f.seek(start); left = end - start + 1
            while left > 0:
                chunk = f.read(min(1 << 20, left))
                if not chunk: break
                try: self.wfile.write(chunk)
                except (BrokenPipeError, ConnectionResetError): return
                left -= len(chunk)

    def static(self, rel):
        p = (STATIC / rel).resolve()
        if not str(p).startswith(str(STATIC.resolve())): return self.send(404, {"error": "not found"})
        return self.file(p)

    def do_GET(self):
        u = urlsplit(self.path); path, q = u.path, parse_qs(u.query)
        if path in ("/", "/index.html"): return self.static("index.html")
        if path in ("/manifest.webmanifest", "/icon.png", "/apple-touch-icon.png"): return self.static(path[1:])
        if path.startswith("/static/"): return self.static(path[8:])
        if path.startswith("/shots/"):
            p = (STATS / path[7:]).resolve()
            return self.file(p if str(p).startswith(str(STATS.resolve())) else None)
        if path.startswith("/media/video/"):
            ep = path.rsplit("/", 1)[1].upper(); return self.file(video_path(ep), f"{ep}.mp4" if "dl" in q else None)
        if path.startswith("/media/thumb/"):
            return self.file(thumb_path(path.rsplit("/", 1)[1].upper()))
        if path == "/api/state": return self.send(200, state())
        self.send(404, {"error": "not found"})

    def do_POST(self):
        u = urlsplit(self.path); path, q = u.path, parse_qs(u.query)
        n = int(self.headers.get("Content-Length", 0)); raw = self.rfile.read(n) if n else b""
        try:
            if path == "/api/upload":                               # raw image body; ?episode=EX05&checkpoint=72h
                ep, cp = q["episode"][0].upper(), q["checkpoint"][0]
                if cp not in db.CHECKPOINTS or not raw: raise ValueError("episode, checkpoint and an image are needed")
                ext = mimetypes.guess_extension(self.headers.get("Content-Type", "image/jpeg")) or ".jpg"
                iid, sug = save_shot(ep, cp, raw, ".jpg" if ext == ".jpe" else ext)
                return self.send(200, {"ok": True, "id": iid, "suggest": sug})
            d = json.loads(raw or b"{}")
            if path == "/api/settings": db.set_settings(d); return self.send(200, {"ok": True})
            if path == "/api/replan": return self.send(200, {"ok": True, "plan": db.replan()})
            if path == "/api/posted": db.record_post(d["episode"], d.get("platform", "tiktok"), d.get("posted_at") or None); return self.send(200, {"ok": True})
            if path == "/api/schedule": db.schedule(d["episode"], d["scheduled_at"], d.get("platform", "tiktok")); return self.send(200, {"ok": True})
            if path == "/api/unschedule": db.unschedule(d["episode"], d.get("platform", "tiktok")); return self.send(200, {"ok": True})
            if path == "/api/unpost": db.unpost(d["episode"], d.get("platform", "tiktok")); return self.send(200, {"ok": True})
            with db.conn() as c:
                if path == "/api/plan":                             # {episode, platform, planned_at|null}
                    c.execute("insert into posts(episode, platform, planned_at) values(?,?,?) on conflict(episode, platform) "
                              "do update set planned_at=excluded.planned_at, reminded=0", (d["episode"], d.get("platform", "tiktok"), d.get("planned_at")))
                elif path == "/api/url":                            # {episode, platform, url}
                    c.execute("insert into posts(episode, platform, url) values(?,?,?) on conflict(episode, platform) do update set url=excluded.url",
                              (d["episode"], d.get("platform", "tiktok"), d["url"]))
                elif path == "/api/note":                           # {episode, notes}
                    c.execute("update episodes set notes=? where id=?", (d["notes"], d["episode"]))
                elif path == "/api/metrics":                        # {post_id, checkpoint, views, …, inbox_id?}
                    write_metrics(c, d)
                    if d.get("inbox_id"): c.execute("update inbox set processed=1 where id=?", (d["inbox_id"],))
                elif path == "/api/inbox/done":                     # {id}
                    c.execute("update inbox set processed=1 where id=?", (d["id"],))
                elif path == "/api/inbox/delete":                   # {id}
                    c.execute("delete from inbox where id=?", (d["id"],))
                else:
                    return self.send(404, {"error": "not found"})
            self.send(200, {"ok": True})
        except (KeyError, ValueError, json.JSONDecodeError) as e:
            self.send(400, {"error": str(e)})


if __name__ == "__main__":
    db.conn().close()
    print(f"miki dashboard on http://{HOST}:{PORT}", flush=True)
    ThreadingHTTPServer((HOST, PORT), H).serve_forever()

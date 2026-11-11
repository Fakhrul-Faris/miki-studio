#!/usr/bin/env python3
"""Telegram as storage for Miki Explained: push an episode's source media and final export to your private chat with the bot, pull the
final export back. Standard library only. Run from anywhere:

  python3 miki-explained/tools/tgstore.py check                 # bot, API mode, storage chat access
  python3 miki-explained/tools/tgstore.py find-chat             # after you send /start to the bot: prints your chat id
  python3 miki-explained/tools/tgstore.py push-episode EX06     # media/, audio/, export/ (skips files already stored)
  python3 miki-explained/tools/tgstore.py push <file>... --episode EX06
  python3 miki-explained/tools/tgstore.py ls [EX06]
  python3 miki-explained/tools/tgstore.py pull EX06 [--to DIR] [--postiz]   # the final export only
  python3 miki-explained/tools/tgstore.py push-all              # every episode in 04_episodes (not _archive)
  python3 miki-explained/tools/tgstore.py commands              # the bot's / menu: one command per stored episode, with its title
  python3 miki-explained/tools/tgstore.py rm-episode EX20       # delete an episode's messages (bot can only delete within 48 h) and its index entries
  python3 miki-explained/tools/tgstore.py serve                 # answers those commands in your chat (run by launchd at login)
  python3 miki-explained/tools/tgstore.py posted                # which episodes are posted (also /posted in the bot)
  python3 miki-explained/tools/tgstore.py mark-posted EX04 [2026-11-01]   # also: /posted ex04 in the bot; updates calendar.md
  python3 miki-explained/tools/tgstore.py recaption             # rewrite stored captions in the current style
  python3 miki-explained/tools/tgstore.py logout-cloud --yes    # one time, before switching to the local Bot API server

In the chat (serve, on the Air): /exNN · /posted · /posted ex13 [tiktok|instagram|threads] [HH:MM | YYYY-MM-DD HH:MM]
· /scheduled ex13 [HH:MM | YYYY-MM-DD HH:MM] (scheduled in TikTok Studio; counts as posted at that time)
· /stats ex13 72h with an analytics screenshot (saved to ~/miki-ops/stats and the dashboard inbox) · /dash

Roles: media/ and audio/ are "source"; export/*-Final.mp4 is "final" (what pull returns); other exports are "render".

Config: ~/.config/telegram/tgstore.env (chmod 600; see tgstore.env.example). The bot token is read from TG_TOKEN_FILE and
is never printed: errors are scrubbed, and requests go through http.client, so it never appears in a process list.
Limits: the cloud Bot API takes uploads up to 50 MB and downloads up to 20 MB; the local Bot API server (TG_API_BASE =
http://127.0.0.1:8081, TG_LOCAL_DATA = its mounted data dir) takes both up to 2,000 MB.
"""
import hashlib, html, http.client, json, mimetypes, os, re, shutil, ssl, subprocess, sys, time, uuid
from pathlib import Path
from urllib.parse import urlsplit, urlencode

REPO = Path(__file__).resolve().parents[1]                       # miki-explained/
EPISODES, INDEX = REPO / "04_episodes", REPO / "storage" / "telegram-index.json"
POSTED, CALENDAR = REPO / "storage" / "posted.json", REPO / "05_calendar" / "calendar.md"
CONF = Path.home() / ".config" / "telegram" / "tgstore.env"
SOURCE_DIRS, FINAL_DIR, FINAL_EXT = ("media", "audio"), "export", {".mp4", ".mov"}
ICON = {"final": "🎬", "render": "🎞", "source": "📎"}
CLOUD = "https://api.telegram.org"
MB = 1024 * 1024


def load_conf():
    env = {}
    if CONF.exists():
        for line in CONF.read_text().splitlines():
            if "=" in line and not line.strip().startswith("#"):
                k, v = line.split("=", 1); env[k.strip()] = os.path.expanduser(v.strip().strip('"'))
    env.update({k: v for k, v in os.environ.items() if k.startswith("TG_")})
    tf = Path(env.get("TG_TOKEN_FILE", "~/.config/telegram/meikigoBot.token")).expanduser()
    if not tf.exists():
        sys.exit(f"no token file at {tf}")
    env["_TOKEN"] = tf.read_text().strip()
    env.setdefault("TG_API_BASE", CLOUD)
    return env


C = load_conf()
TOKEN, BASE = C["_TOKEN"], C["TG_API_BASE"].rstrip("/")
LOCAL = BASE != CLOUD
UP_LIMIT, DOWN_LIMIT = (2000 * MB, 2000 * MB) if LOCAL else (50 * MB, 20 * MB)


def scrub(s):
    return str(s).replace(TOKEN, "<token>")


class TgError(Exception):
    pass


def _conn():
    u = urlsplit(BASE)
    if u.scheme == "https":
        return http.client.HTTPSConnection(u.hostname, u.port or 443, timeout=600, context=ssl.create_default_context())
    return http.client.HTTPConnection(u.hostname, u.port or 80, timeout=600)


def _send(method, fields=None, file_field=None, path=None):
    """One request. Multipart when a file is attached (streamed from disk, never fully in memory)."""
    url = f"{urlsplit(BASE).path}/bot{TOKEN}/{method}"
    conn = _conn()
    try:
        if path is None:
            body = urlencode(fields or {}).encode()
            conn.request("POST", url, body, {"Content-Type": "application/x-www-form-urlencoded"})
        else:
            b = uuid.uuid4().hex; pre = b""
            for k, v in (fields or {}).items():
                pre += f'--{b}\r\nContent-Disposition: form-data; name="{k}"\r\n\r\n{v}\r\n'.encode()
            ctype = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
            pre += (f'--{b}\r\nContent-Disposition: form-data; name="{file_field}"; filename="{path.name}"\r\n'
                    f"Content-Type: {ctype}\r\n\r\n").encode()
            post = f"\r\n--{b}--\r\n".encode()
            conn.putrequest("POST", url); conn.putheader("Content-Type", f"multipart/form-data; boundary={b}")
            conn.putheader("Content-Length", str(len(pre) + path.stat().st_size + len(post))); conn.endheaders()
            conn.send(pre)
            with open(path, "rb") as f:
                while chunk := f.read(MB):
                    conn.send(chunk)
            conn.send(post)
        r = conn.getresponse(); raw = r.read()
        try:
            return json.loads(raw)
        except ValueError:
            return {"ok": False, "error_code": r.status, "description": raw[:200].decode(errors="replace")}
    finally:
        conn.close()


def call(method, fields=None, file_field=None, path=None, tries=6):
    """Bot API call with retries: 429 waits retry_after; 5xx and network errors back off 2, 4, 8 … s."""
    delay = 2
    for attempt in range(tries):
        try:
            res = _send(method, fields, file_field, path)
        except (OSError, http.client.HTTPException) as e:
            res = {"ok": False, "error_code": 0, "description": f"network: {e}"}
        if res.get("ok"):
            return res["result"]
        code = res.get("error_code", 0)
        if code == 429:
            wait = int(res.get("parameters", {}).get("retry_after", 5)) + 1
            print(f"  rate limited, waiting {wait}s"); time.sleep(wait); continue
        if code == 0 or code >= 500:
            print(f"  {scrub(res.get('description'))}; retry in {delay}s"); time.sleep(delay); delay *= 2; continue
        raise TgError(scrub(f"{method}: {code} {res.get('description')}"))
    raise TgError(f"{method}: gave up after {tries} tries")


# ---------- index ----------
def load_index():
    return json.loads(INDEX.read_text()) if INDEX.exists() else {}


def files(ix):
    return {k: v for k, v in ix.items() if not k.startswith("_")}


def save_index(ix):
    INDEX.parent.mkdir(parents=True, exist_ok=True)
    tmp = INDEX.with_suffix(".tmp"); tmp.write_text(json.dumps(ix, indent=1, sort_keys=True)); tmp.replace(INDEX)


def sha256(p):
    h = hashlib.sha256()
    with open(p, "rb") as f:
        while chunk := f.read(MB):
            h.update(chunk)
    return h.hexdigest()


def episode_dir(ep):
    hits = sorted(EPISODES.glob(f"{ep}_*")) or ([EPISODES / ep] if (EPISODES / ep).is_dir() else [])
    if not hits:
        sys.exit(f"no episode folder for {ep}")
    return hits[0]


def ep_title(ep, root=None):
    try:
        root = root or episode_dir(ep)
        doc = next(f for f in (root / "episode.md", root / "README.md") if f.exists())
        line = doc.read_text().splitlines()[0]
        t = line.split("—", 1)[1] if "—" in line else line.lstrip("# ")
        t = re.sub(r"\s*\(.*?\)\s*$", "", t).strip().strip('"')
        return re.sub(r"^" + re.escape(ep) + r'\s*"?', "", t).strip().strip('"')
    except (OSError, IndexError, SystemExit, StopIteration):
        return ""


def tag(ep):
    return "#" + "".join(ch for ch in ep if ch.isalnum())


def caption(ep, title, rel, role, size, digest):
    return (f"{ICON[role]} <b>{html.escape(ep)}{' · ' + html.escape(title) if title else ''}</b>\n"
            f"{tag(ep)} #{role}\n<code>{html.escape(rel)}</code> · {size / MB:.1f} MB · sha256 {digest[:12]}")


def header(ix, ep, title):
    """One title card per episode in the chat, so the files below it read as one block."""
    hd = ix.setdefault("_headers", {})
    if ep in hd:
        return
    m = call("sendMessage", {"chat_id": channel(), "parse_mode": "HTML", "disable_notification": "true",
                              "text": f"━━━━━━━━━━━━━━━━\n📼 <b>{html.escape(ep)}</b>\n<b>{html.escape(title)}</b>\n{tag(ep)}\n━━━━━━━━━━━━━━━━"})
    hd[ep] = m["message_id"]; save_index(ix); time.sleep(1.1)


def role_of(p):
    if p.parent.name == FINAL_DIR and p.suffix.lower() in FINAL_EXT:
        return "final" if "final" in p.stem.lower() else "render"
    return "source"


def channel():
    ch = C.get("TG_CHAT_ID") or C.get("TG_CHANNEL_ID")
    if not ch:
        sys.exit("TG_CHAT_ID is not set in ~/.config/telegram/tgstore.env (send /start to the bot, then run find-chat)")
    return ch


# ---------- commands ----------
def cmd_check(_):
    me = call("getMe")
    print(f"bot @{me['username']} (id {me['id']}) via {'local Bot API server' if LOCAL else 'cloud Bot API'}; "
          f"limits up {UP_LIMIT // MB} MB / down {DOWN_LIMIT // MB} MB")
    if C.get("TG_CHAT_ID") or C.get("TG_CHANNEL_ID"):
        ch = call("getChat", {"chat_id": channel()})
        print(f"storage chat '{ch.get('title') or ch.get('first_name')}' ({ch['id']}, {ch['type']}) reachable")
    else:
        print("no storage chat set yet: send /start to the bot in Telegram, then run find-chat")


def cmd_find_chat(_):
    seen = {}
    for u in call("getUpdates", {"allowed_updates": json.dumps(["message", "channel_post", "my_chat_member"])}):
        chat = (u.get("message") or u.get("channel_post") or u.get("my_chat_member") or {}).get("chat")
        if chat and chat.get("type") in ("private", "channel"):
            seen[chat["id"]] = (chat.get("title") or " ".join(x for x in (chat.get("first_name"), chat.get("last_name")) if x), chat["type"])
    if not seen:
        print("no messages yet: send /start to the bot in Telegram, then run this again")
    for cid, (name, kind) in seen.items():
        print(f"{cid}  {name} ({kind})    → TG_CHAT_ID={cid}")


def push_file(ix, ep, ep_root, p, role):
    rel = p.relative_to(ep_root).as_posix(); key = f"{ep}/{rel}"; size = p.stat().st_size; digest = sha256(p)
    if ix.get(key, {}).get("sha256") == digest:
        print(f"  = {key} (already stored)"); return
    if size > UP_LIMIT:
        print(f"  ! {key}: {size / MB:.1f} MB is over the {UP_LIMIT // MB} MB upload limit"
              f"{'' if LOCAL else ' (set up the local Bot API server for up to 2,000 MB)'}"); return
    cap = caption(ep, ep_title(ep, ep_root), rel, role, size, digest)
    msg = call("sendDocument", {"chat_id": channel(), "caption": cap, "parse_mode": "HTML",
                                "disable_content_type_detection": "true", "disable_notification": "true"}, "document", p)
    doc = msg.get("document") or msg.get("video") or msg.get("audio") or {}
    ix[key] = {"episode": ep, "path": rel, "role": role, "size": size, "sha256": digest, "message_id": msg["message_id"],
               "file_id": doc.get("file_id"), "file_unique_id": doc.get("file_unique_id"), "chat_id": msg["chat"]["id"],
               "stored": time.strftime("%Y-%m-%d %H:%M:%S")}
    save_index(ix)
    print(f"  + {key} ({size / MB:.1f} MB) → message {msg['message_id']}")
    time.sleep(1.1)                                           # ~1 message a second to one chat


def episode_files(ep_root):
    out = []
    for d in SOURCE_DIRS:
        out += [(p, "source") for p in sorted((ep_root / d).rglob("*")) if p.is_file() and not p.name.startswith(".")]
    ex = [(p, role_of(p)) for p in sorted((ep_root / FINAL_DIR).glob("*")) if p.suffix.lower() in FINAL_EXT and "preview" not in p.name]
    if len(ex) == 1 and ex[0][1] == "render":                 # no -Final file: a lone export is the final
        ex = [(ex[0][0], "final")]
    return out + ex


def cmd_push_episode(args):
    ep = args[0]; root = episode_dir(ep); ix = load_index(); files = episode_files(root)
    print(f"{ep}: {len(files)} files from {root.name}/ ({', '.join(SOURCE_DIRS)}, {FINAL_DIR})")
    if files:
        header(ix, ep, ep_title(ep, root))
    for p, role in files:
        push_file(ix, ep, root, p, role)


def cmd_push(args):
    if "--episode" not in args:
        sys.exit("push needs --episode EXNN")
    i = args.index("--episode"); ep = args[i + 1]; paths = args[:i] + args[i + 2:]; root = episode_dir(ep); ix = load_index()
    for a in paths:
        p = Path(a).resolve()
        role = role_of(p); header(ix, ep, ep_title(ep, root))
        push_file(ix, ep, root if root in p.parents else p.parent, p, role)


def cmd_ls(args):
    ix = load_index(); ep = args[0] if args else None
    for k, v in sorted(files(ix).items()):
        if not ep or v["episode"] == ep:
            print(f"{v['role']:6} {v['size'] / MB:8.1f} MB  msg {v['message_id']:<6} {k}")


def cmd_pull(args):
    ep = args[0]; ix = load_index()
    finals = [v for v in files(ix).values() if v["episode"] == ep and v["role"] == "final"]
    if not finals:
        sys.exit(f"no final export stored for {ep} (push-episode {ep} first)")
    to = Path(args[args.index("--to") + 1]).expanduser() if "--to" in args else REPO / "storage" / "pulled" / ep
    to.mkdir(parents=True, exist_ok=True)
    for v in finals:
        if v["size"] > DOWN_LIMIT:
            print(f"  ! {v['path']}: {v['size'] / MB:.1f} MB is over the {DOWN_LIMIT // MB} MB download limit"
                  f"{'' if LOCAL else ' (needs the local Bot API server)'}"); continue
        f = call("getFile", {"file_id": v["file_id"]}); dest = to / Path(v["path"]).name
        if LOCAL:                                             # the server returns its own absolute path: map it to the mounted dir
            src = Path(f["file_path"]); data = Path(C.get("TG_LOCAL_DATA", "~/Private/telegram-bot-api/data")).expanduser()
            host = data / src.relative_to("/var/lib/telegram-bot-api") if src.is_absolute() else data / src
            shutil.copyfile(host, dest)
        else:
            conn = http.client.HTTPSConnection("api.telegram.org", timeout=600)
            conn.request("GET", f"/file/bot{TOKEN}/{f['file_path']}"); r = conn.getresponse()
            if r.status != 200:
                raise TgError(f"download {v['path']}: HTTP {r.status}")
            with open(dest, "wb") as out:
                shutil.copyfileobj(r, out, MB)
            conn.close()
        ok = sha256(dest) == v["sha256"]
        print(f"  ↓ {v['episode']}/{v['path']} → {dest} ({'checksum ok' if ok else 'CHECKSUM MISMATCH'})")
        if ok and "--postiz" in args:
            subprocess.run([sys.executable, str(REPO / "tools" / "postiz.py"), "upload", str(dest)], check=True)


def load_posted():
    return json.loads(POSTED.read_text()) if POSTED.exists() else {}


def mark_posted(ep, date=None):
    """Record ep as posted (date default: today) in storage/posted.json and in calendar.md's Posted column."""
    date = date or time.strftime("%Y-%m-%d"); pd = load_posted(); pd[ep] = date
    POSTED.parent.mkdir(parents=True, exist_ok=True); POSTED.write_text(json.dumps(pd, indent=1, sort_keys=True))
    if CALENDAR.exists():
        rows, nice = CALENDAR.read_text().split("\n"), "✓ " + time.strftime("%d %b %Y", time.strptime(date, "%Y-%m-%d"))
        for i, r in enumerate(rows):
            c = r.split("|")
            if len(c) >= 10 and re.search(r"\(" + re.escape(ep) + r"[,)]", c[4]) and not c[8].strip():
                c[7], c[8] = " ready ", f" {nice} "; rows[i] = "|".join(c)
        CALENDAR.write_text("\n".join(rows))
    return date


def posted_lines():
    ix, pd = load_index(), load_posted(); out = []
    for ep in episodes(ix):
        d = pd.get(ep)
        when = "" if not d or d == "posted" else " · " + time.strftime("%d %b", time.strptime(d, "%Y-%m-%d"))
        out.append(f"{'✅' if d else '⏳'} /{ep.lower()}  <b>{html.escape(ep_title(ep))}</b>{' — posted' + when if d else ' — not posted'}")
    return out


def reply_posted(chat, note=""):
    lines = ([note, ""] if note else []) + ["📣 <b>Posted?</b>", ""] + posted_lines() + ["", "Mark one: <code>/posted ex04</code>"]
    call("sendMessage", {"chat_id": chat, "parse_mode": "HTML", "text": "\n".join(lines)})


def cmd_posted(_):
    for l in posted_lines():
        print(re.sub(r"<[^>]+>", "", l))


def cmd_mark_posted(args):
    ep = args[0].upper(); print(f"{ep} posted {mark_posted(ep, args[1] if len(args) > 1 else None)}")


def episodes(ix):
    eps = {}
    for v in files(ix).values():
        e = eps.setdefault(v["episode"], {"n": 0, "mb": 0.0, "final": None})
        e["n"] += 1; e["mb"] += v["size"] / MB
        if v["role"] == "final": e["final"] = v
    return dict(sorted(eps.items()))


def cmd_push_all(_):
    for d in sorted(EPISODES.iterdir()):
        if d.is_dir() and not d.name.startswith("_") and "_" in d.name and any((d / x).is_dir() for x in SOURCE_DIRS + (FINAL_DIR,)):
            cmd_push_episode([d.name.split("_")[0]])
    cmd_commands([])


def cmd_commands(_):
    ix = load_index(); cmds = [{"command": "start", "description": "📼 All episodes in storage"},
                               {"command": "posted", "description": "📣 Posted? · /posted ex13 tiktok 18:00 marks one"},
                               {"command": "scheduled", "description": "📅 Scheduled in TikTok Studio · /scheduled ex05 12:30"},
                               {"command": "stats", "description": "📊 Send a screenshot with /stats ex13 72h"},
                               {"command": "dash", "description": "📈 Dashboard summary and link"}]
    for ep in episodes(ix):
        cmds.append({"command": ep.lower(), "description": (f"🎬 {ep} · {ep_title(ep)}")[:256]})
    call("setMyCommands", {"commands": json.dumps(cmds)})
    call("setMyDescription", {"description": "Miki Explained storage: every episode's source media and final export. Tap / to pick an episode."})
    print("menu: " + ", ".join("/" + c["command"] for c in cmds))


def reply_list(chat):
    ix, pd = load_index(), load_posted(); lines = ["📼 <b>Miki Explained · storage</b>", ""]
    for ep, e in episodes(ix).items():
        lines.append(f"{'✅' if pd.get(ep) else '⏳'} /{ep.lower()}  <b>{html.escape(ep_title(ep))}</b> · {e['n']} files · {e['mb']:.0f} MB{' · 🎬 final' if e['final'] else ''}")
    lines += ["", "✅ posted · ⏳ not yet · /posted for the list"]
    call("sendMessage", {"chat_id": chat, "parse_mode": "HTML", "text": "\n".join(lines)})


def post_text(ep):
    """The episode's caption and pinned comment from episode.md (or README.md) § Post: [(label, text), …]."""
    try:
        root = episode_dir(ep); doc = next(f for f in (root / "episode.md", root / "README.md") if f.exists()).read_text()
    except (SystemExit, StopIteration, OSError):
        return []
    out = []
    for label in ("Caption", "Pinned comment"):
        m = re.search(r"\*\*" + label + r":\*\*\s*```\n(.*?)\n```", doc, re.S)
        if m: out.append((label, m.group(1).strip()))
    return out


def reply_episode(chat, ep):
    ix = load_index(); rows = sorted((v for v in files(ix).values() if v["episode"] == ep), key=lambda v: (v["role"] != "final", v["path"]))
    if not rows:
        call("sendMessage", {"chat_id": chat, "text": f"Nothing stored for {ep} yet."}); return
    lines = [f"📼 <b>{html.escape(ep)} · {html.escape(ep_title(ep))}</b>", f"{tag(ep)} · {len(rows)} files", ""]
    for v in rows:
        lines.append(f"{ICON[v['role']]} <code>{html.escape(v['path'])}</code> · {v['size'] / MB:.1f} MB")
    hd = ix.get("_headers", {}).get(ep)
    call("sendMessage", {"chat_id": chat, "parse_mode": "HTML", "text": "\n".join(lines)[:4000], **({"reply_to_message_id": hd} if hd else {})})
    for label, txt in post_text(ep):                          # the caption and pinned comment, each one tap to copy
        call("sendMessage", {"chat_id": chat, "parse_mode": "HTML", "text": f"{'📝' if label == 'Caption' else '📌'} <b>{label}</b>\n<pre>{html.escape(txt)}</pre>"[:4096]})
    for v in rows:
        if v["role"] == "final":                              # re-send the final from storage (by file_id: no upload)
            call("sendDocument", {"chat_id": chat, "document": v["file_id"], "parse_mode": "HTML",
                                  "caption": caption(ep, ep_title(ep), v["path"], v["role"], v["size"], v["sha256"])})


# ---------- dashboard hooks (the Air: tools/dash, ~/miki-ops) ----------
STATS = Path.home() / "miki-ops" / "stats"
DASH_URL = os.environ.get("MIKI_DASH_URL", "")


def dash():
    sys.path.insert(0, str(Path(__file__).parent / "dash")); import db; return db


def local_file(file_id):
    """getFile on the local Bot API server → the file on this machine's disk."""
    f = call("getFile", {"file_id": file_id}); src = Path(f["file_path"])
    data = Path(C.get("TG_LOCAL_DATA", "~/Private/telegram-bot-api/data")).expanduser()
    return data / src.relative_to("/var/lib/telegram-bot-api") if src.is_absolute() else data / src


def save_stat(chat, ep, cp, m):
    """An analytics screenshot (photo or image file) for ep at checkpoint cp → ~/miki-ops/stats/EP/ + the dashboard inbox."""
    fid = (m.get("photo") or [{}])[-1].get("file_id") or ((m.get("document") or {}).get("mime_type", "").startswith("image/") and m["document"]["file_id"])
    if not fid:
        call("sendMessage", {"chat_id": chat, "text": f"Send the screenshot as a photo with the caption /stats {ep.lower()} {cp}"}); return
    src = local_file(fid); d = STATS / ep; d.mkdir(parents=True, exist_ok=True)
    dest = d / f"{cp}_{time.strftime('%Y%m%d-%H%M%S')}_{m['message_id']}{src.suffix or '.jpg'}"; shutil.copyfile(src, dest)
    try:
        sys.path.insert(0, str(Path(__file__).parent / "dash")); import ocrparse; sug = ocrparse.read(str(dest))
    except Exception:
        sug = {}
    dash().add_inbox(ep, cp, f"{ep}/{dest.name}", sug, "bot")
    got = ", ".join(f"{k} {v}" for k, v in sug.items()) or "no numbers found"
    call("sendMessage", {"chat_id": chat, "parse_mode": "HTML", "text": f"📊 Saved <b>{ep} · {cp}</b>. Read: {html.escape(got)}.\n"
                         f"Confirm it in the dashboard Inbox{(': ' + DASH_URL + '/#inbox') if DASH_URL else ''}."})


def parse_when(parts):
    """['18:00'] / ['2026-11-02', '18:00'] / [] → ISO minutes (today when only a time is given)."""
    t = " ".join(parts).strip()
    if not t: return None
    if re.fullmatch(r"\d{1,2}:\d{2}", t): return time.strftime("%Y-%m-%d") + "T" + t.zfill(5)
    m = re.fullmatch(r"(\d{4}-\d\d-\d\d)[ T](\d{1,2}:\d{2})", t)
    return f"{m.group(1)}T{m.group(2).zfill(5)}" if m else None


def reply_dash(chat):
    with dash().conn() as c:
        n_post = c.execute("select count(*) from posts where posted_at is not null").fetchone()[0]
        n_ready = c.execute("select count(*) from episodes where status='ready' and coalesce(archived, 0) = 0").fetchone()[0]
        unread = c.execute("select count(*) from inbox where processed=0").fetchone()[0]
        nxt = c.execute("select episode, planned_at from posts where posted_at is null and planned_at is not null order by planned_at limit 3").fetchall()
    lines = ["📈 <b>Miki dashboard</b>", f"Posted: {n_post} · ready: {n_ready} · screenshots to read: {unread}"]
    if nxt: lines += ["", "Up next:"] + [f"• {e} · {w.replace('T', ' ')}" for e, w in nxt]
    if DASH_URL: lines += ["", DASH_URL]
    call("sendMessage", {"chat_id": chat, "parse_mode": "HTML", "text": "\n".join(lines), "disable_web_page_preview": True})


def quiet(s, t):
    a, b = s["quiet"]; hm = t.strftime("%H:%M")
    return (a <= hm or hm < b) if a > b else (a <= hm < b)


def tick(chat):
    """Every poll: remind before a planned slot (video + caption), and nudge for stats that have come due."""
    import datetime as dt
    D = dash(); t = dt.datetime.now(); s = D.settings(); ix = load_index()
    with D.conn() as c:
        D.auto_post(c)
        soon = c.execute("select id, episode, planned_at from posts where platform='tiktok' and posted_at is null and planned_at is not null "
                         "and scheduled_at is null and reminded = 0").fetchall()
        for p in soon:
            at = dt.datetime.fromisoformat(p["planned_at"])
            if not (t <= at <= t + dt.timedelta(minutes=int(s["lead_min"]))): continue
            ep = p["episode"]
            call("sendMessage", {"chat_id": chat, "parse_mode": "HTML", "text":
                 f"⏰ <b>{ep} · {html.escape(ep_title(ep))}</b> is due on TikTok at <b>{at.strftime('%H:%M')}</b>.\n"
                 f"Video and caption below. Schedule it in TikTok Studio, then <code>/scheduled {ep.lower()}</code> (or tap the button on the dashboard)."})
            for label, txt in post_text(ep):
                call("sendMessage", {"chat_id": chat, "parse_mode": "HTML", "text": f"{'📝' if label == 'Caption' else '📌'} <b>{label}</b>\n<pre>{html.escape(txt)}</pre>"[:4096]})
            fin = next((v for v in files(ix).values() if v["episode"] == ep and v["role"] == "final"), None)
            if fin: call("sendDocument", {"chat_id": chat, "document": fin["file_id"], "caption": f"{ep} final"})
            c.execute("update posts set reminded = 1 where id = ?", (p["id"],))
        if quiet(s, t): return
        for d in D.due(c):
            if d["state"] != "due": continue
            n = c.execute("select sent_at from nudges where post_id=? and checkpoint=?", (d["post_id"], d["checkpoint"])).fetchone()
            if n and dt.datetime.fromisoformat(n["sent_at"]) > t - dt.timedelta(hours=12): continue   # then again every 12 h until it's in
            ep, cp = d["episode"], d["checkpoint"]
            call("sendMessage", {"chat_id": chat, "parse_mode": "HTML", "text":
                 f"📊 {'⏳ Still waiting: ' if n else ''}<b>{ep}</b> {cp} numbers are due ({d['platform']}). Screenshot the post's analytics in TikTok Studio and send it here "
                 f"with the caption <code>/stats {ep.lower()} {cp}</code>, or upload it on the dashboard."})
            c.execute("insert into nudges values(?, ?, ?) on conflict(post_id, checkpoint) do update set sent_at=excluded.sent_at", (d["post_id"], cp, D.now()))


def cmd_serve(_):
    """Long-poll for commands in the storage chat only; everyone else is ignored."""
    me, off = str(channel()), 0
    print("serving /start and /<episode> in the storage chat", flush=True)
    while True:
        try:
            try: tick(me)
            except Exception as e: print(f"tick: {e}", flush=True)
            ups = call("getUpdates", {"offset": off, "timeout": 50, "allowed_updates": json.dumps(["message"])})
        except (TgError, OSError) as e:
            print(f"error: {e}", flush=True); time.sleep(10); continue
        for u in ups:
            off = u["update_id"] + 1; m = u.get("message") or {}
            text = m.get("text") or m.get("caption") or ""
            if str(m.get("chat", {}).get("id")) != me or not text.startswith("/"):
                continue
            parts = text.split(); cmd = parts[0][1:].split("@")[0].lower()
            try:
                eps = {e.lower(): e for e in episodes(load_index())}
                if cmd == "stats" and len(parts) > 2 and eps.get(parts[1].lstrip("/").lower()) and parts[2].lower() in ("24h", "72h", "7d"):
                    save_stat(me, eps[parts[1].lstrip("/").lower()], parts[2].lower(), m)
                elif cmd == "stats":
                    call("sendMessage", {"chat_id": me, "parse_mode": "HTML", "text": "Send the analytics screenshot as a photo with the caption <code>/stats ex13 72h</code> (24h, 72h or 7d)."})
                elif cmd == "dash":
                    reply_dash(me)
                elif cmd == "scheduled" and len(parts) > 1 and eps.get(parts[1].lstrip("/").lower()):
                    ep = eps[parts[1].lstrip("/").lower()]; w = parse_when(parts[2:])
                    if not w:
                        with dash().conn() as c: r = c.execute("select planned_at from posts where episode=? and platform='tiktok'", (ep,)).fetchone()
                        w = r["planned_at"] if r and r["planned_at"] else None
                    if w:
                        dash().schedule(ep, w)
                        call("sendMessage", {"chat_id": me, "parse_mode": "HTML", "text": f"📅 <b>{ep}</b> scheduled in TikTok Studio for {w.replace('T', ' ')}. It counts as posted then; stats reminders start from that time."})
                    else:
                        call("sendMessage", {"chat_id": me, "parse_mode": "HTML", "text": f"When? <code>/scheduled {ep.lower()} 18:00</code> or <code>/scheduled {ep.lower()} 2026-11-03 18:00</code>"})
                elif cmd == "posted" and len(parts) > 1:
                    ep = eps.get(parts[1].lstrip("/").lower())
                    plat = parts[2].lower() if len(parts) > 2 and parts[2].lower() in ("tiktok", "instagram", "threads") else "tiktok"
                    rest = parts[3:] if len(parts) > 2 and parts[2].lower() in ("tiktok", "instagram", "threads") else parts[2:]
                    w = parse_when(rest)
                    if ep:
                        day = mark_posted(ep, w[:10] if w else None)
                        try: dash().record_post(ep, plat, w or time.strftime("%Y-%m-%dT%H:%M"))
                        except Exception as e: print(f"dashboard: {e}", flush=True)
                        reply_posted(me, f"✅ Marked <b>{ep} · {html.escape(ep_title(ep))}</b> posted on {plat} ({w.replace('T', ' ') if w else day}).")
                    else: reply_posted(me, f"No episode called {html.escape(parts[1])}.")
                elif cmd == "posted": reply_posted(me)
                elif cmd in eps: reply_episode(me, eps[cmd])
                else: reply_list(me)
            except (TgError, OSError, ValueError) as e:
                print(f"error: {e}", flush=True)


def cmd_recaption(_):
    ix = load_index()
    for k, v in files(ix).items():
        cap = caption(v["episode"], ep_title(v["episode"]), v["path"], v["role"], v["size"], v["sha256"])
        try:
            call("editMessageCaption", {"chat_id": v["chat_id"], "message_id": v["message_id"], "caption": cap, "parse_mode": "HTML"})
            print(f"  ✎ {k}")
        except TgError as e:
            print(f"  ! {k}: {e}")
        time.sleep(1.1)


def cmd_logout_cloud(args):
    if "--yes" not in args:
        sys.exit("logOut moves the bot off the cloud Bot API so the local server can serve it (it can move back after 10 min). Re-run with --yes.")
    conn = http.client.HTTPSConnection("api.telegram.org", timeout=60)
    conn.request("POST", f"/bot{TOKEN}/logOut"); print(scrub(conn.getresponse().read().decode()))


def cmd_rm_episode(args):
    """Delete an episode from storage: the bot deletes its messages (header + files) and they leave the index.
    Telegram lets a bot delete its own messages only within 48 hours of sending; older ones are reported, not deleted."""
    if not args: sys.exit("usage: rm-episode EXNN")
    ep = args[0].upper(); ix = load_index(); gone, kept = 0, []
    keys = [k for k, v in files(ix).items() if v.get("episode") == ep]
    msgs = [(k, ix[k]["message_id"], ix[k].get("chat_id") or channel()) for k in keys]
    hd = ix.get("_headers", {})
    if ep in hd: msgs.append(("_header", hd[ep], channel()))
    for k, mid, chat in msgs:
        try:
            call("deleteMessage", {"chat_id": chat, "message_id": mid}); gone += 1
            if k == "_header": hd.pop(ep, None)
            else: ix.pop(k, None)
        except TgError as e:
            kept.append((k, mid, str(e)))
        time.sleep(0.4)
    save_index(ix)
    print(f"{ep}: deleted {gone} message(s)" + (f"; could not delete {len(kept)} (older than 48 h?): " + ", ".join(str(m) for _, m, _ in kept) if kept else ""))
    cmd_commands([])


CMDS = {"rm-episode": cmd_rm_episode, "check": cmd_check, "find-chat": cmd_find_chat, "push-episode": cmd_push_episode, "push": cmd_push,
        "ls": cmd_ls, "pull": cmd_pull, "logout-cloud": cmd_logout_cloud, "push-all": cmd_push_all, "commands": cmd_commands,
        "serve": cmd_serve, "recaption": cmd_recaption, "posted": cmd_posted, "mark-posted": cmd_mark_posted}
if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] not in CMDS:
        sys.exit(__doc__)
    try:
        CMDS[sys.argv[1]](sys.argv[2:])
    except TgError as e:
        sys.exit(f"error: {e}")

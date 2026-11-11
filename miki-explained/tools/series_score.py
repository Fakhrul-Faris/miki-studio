#!/usr/bin/env python3
"""Series scoreboard: which series earns completion and follows (content-bank.md § 6, rule: ~5 videos a series, then keep / drop).

Data: the Miki dashboard (SQLite on the Air: episodes, posts, logged checkpoints) + the newest TikTok Studio CSV export in
06_analytics/*/tiktok-*.csv (per-video totals). Series tags: 06_analytics/series.json.
  python3 miki-explained/tools/series_score.py            # → 06_analytics/series-scoreboard.md (+ prints the series table)
Metrics per series: videos, views, avg watch as % of length, watched-full %, follows per 1k views, comments + shares + saves per
1k, search %. Keep/drop after 5 videos: keep if follows/1k ≥ 2 × the account median OR watched-full ≥ 10 %; else drop.
"""
import csv, glob, json, os, re, statistics, subprocess, datetime
ME = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CFG = json.load(open(f"{ME}/06_analytics/series.json"))
PY = "/Users/mac/.local/share/uv/python/cpython-3.12-macos-aarch64-none/bin/python3.12"
Q = r'''
import sqlite3, os, json
c = sqlite3.connect(os.path.expanduser("~/miki-ops/data/miki.db"), timeout=10); c.row_factory = sqlite3.Row
print(json.dumps({"episodes": [dict(r) for r in c.execute("select id, title, duration, status, caption from episodes where deleted=0")],
  "posts": [dict(r) for r in c.execute("select id, episode, planned_at, posted_at, scheduled_at from posts")],
  "metrics": [dict(r) for r in c.execute("select m.*, p.episode from metrics m join posts p on p.id = m.post_id")]}))
'''
dash = json.loads(subprocess.run(["ssh", "air", PY, "-"], input=Q, capture_output=True, text=True, check=True).stdout)
EP = {e["id"]: e for e in dash["episodes"]}
key = lambda s: re.sub(r"[^a-z0-9]", "", (s or "").lower())[:28]
cap2ep = {key(e["caption"]): e["id"] for e in dash["episodes"] if e["caption"]}
csvf = sorted(glob.glob(f"{ME}/06_analytics/*/tiktok-*.csv"))[-1]
num = lambda x: float(re.sub(r"[^0-9.]", "", x)) if x and re.search(r"\d", x) else None
def secs(x):
    if not x or "%" in x: return None
    m = re.match(r"^\s*(?:(\d+)m:)?([\d.]+)s\s*$", x); return (int(m.group(1) or 0) * 60 + float(m.group(2))) if m else None
vids = {}
for r in csv.DictReader(open(csvf, encoding="utf-8-sig")):
    t = r["Video Title"]; ep = next((v for k, v in CFG["title_map"].items() if t.startswith(k)), None) or cap2ep.get(key(t))
    if not ep: print("unmatched:", t[:60]); continue
    v = dict(views=num(r["Views"]), likes=num(r["Likes"]), comments=num(r["Comments"]) or 0, shares=num(r["Shares"]) or 0, saves=num(r["Saves"]) or 0,
             avg_watch=secs(r["Avg Watch Time"]), full_pct=num(r["Watched Full Video %"]), follows=num(r["New Followers"]), search_pct=num(r["Traffic Search %"]), posted=r["Posted Date"], src=os.path.basename(csvf))
    v.update(CFG["overrides"].get(ep, {})); vids[ep] = v
# dashboard checkpoints fill videos the export doesn't have (latest checkpoint wins)
for m in sorted(dash["metrics"], key=lambda m: m["recorded_at"] or ""):
    if m["episode"] in vids and vids[m["episode"]]["src"].endswith(".csv"): continue
    vids[m["episode"]] = dict(views=m["views"], likes=m["likes"], comments=m["comments"] or 0, shares=m["shares"] or 0, saves=m["saves"] or 0, avg_watch=m["avg_watch"],
                              full_pct=m["full_pct"], follows=m["follows"], search_pct=None, posted=None, src=f"dashboard {m['checkpoint']}")
posted = {p["episode"]: (p["posted_at"] or p["scheduled_at"]) for p in dash["posts"] if p["posted_at"] or p["scheduled_at"]}
now = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M")
missing = sorted(e for e, w in posted.items() if e not in vids and w <= now)
length = lambda e: (EP.get(e, {}).get("duration") or CFG["lengths"].get(e))
rows = []
for e, v in vids.items():
    L = length(e); vw = v["views"] or 0
    rows.append(dict(ep=e, s=CFG["episodes"].get(e, "?"), views=vw, watch_pct=(100 * v["avg_watch"] / L) if (v["avg_watch"] and L) else None, avg_watch=v["avg_watch"], full=v["full_pct"],
                     f1k=(1000 * (v["follows"] or 0) / vw) if vw else 0, eng1k=(1000 * (v["comments"] + v["shares"] + v["saves"]) / vw) if vw else 0, search=v["search_pct"], src=v["src"]))
med_f1k = statistics.median(r["f1k"] for r in rows) if rows else 0
fmt = lambda x, d=1, suf="": "—" if x is None else f"{x:.{d}f}{suf}"
by = {}
for r in rows: by.setdefault(r["s"], []).append(r)
def agg(rs):
    V = sum(r["views"] for r in rs); w = [r for r in rs if r["watch_pct"] is not None]; fu = [r for r in rs if r["full"] is not None]
    return dict(n=len(rs), views=V, watch=(sum(r["watch_pct"] * r["views"] for r in w) / sum(r["views"] for r in w)) if w else None,
                full=(sum(r["full"] * r["views"] for r in fu) / sum(r["views"] for r in fu)) if fu else None,
                f1k=1000 * sum(r["f1k"] * r["views"] / 1000 for r in rs) / V if V else 0, eng1k=1000 * sum(r["eng1k"] * r["views"] / 1000 for r in rs) / V if V else 0)
def verdict(a):
    if a["n"] < 5: return f"testing ({a['n']}/5)"
    return "KEEP" if (a["f1k"] >= 2 * max(med_f1k, 0.5) or (a["full"] or 0) >= 10) else "DROP"
S = CFG["series"]
lines = [f"# Series scoreboard — {now.replace('T', ' ')}", "",
         f"Built by `tools/series_score.py` from the Miki dashboard (Air) + `{os.path.basename(os.path.dirname(csvf))}/{os.path.basename(csvf)}`. "
         f"Keep/drop after 5 videos: keep if follows per 1k ≥ 2 × the account median ({med_f1k:.2f}, floor 0.5) or watched-full ≥ 10 %.", "",
         "| Series | Videos | Views | Avg watch % of length | Watched full % | Follows / 1k | Comments+shares+saves / 1k | Verdict |", "|---|---|---|---|---|---|---|---|"]
for sid in sorted(by, key=lambda s: -agg(by[s])["f1k"]):
    a = agg(by[sid]); lines.append(f"| {sid} {S.get(sid, '?')} | {a['n']} | {a['views']:.0f} | {fmt(a['watch'], 0, '%')} | {fmt(a['full'], 1, '%')} | {a['f1k']:.2f} | {a['eng1k']:.1f} | {verdict(a)} |")
lines += ["", "Series with no posted video yet: " + ", ".join(f"{k} {v}" for k, v in S.items() if k not in by), "",
          "## Per video", "", "| Ep | Series | Views | Avg watch | % of length | Full % | Follows / 1k | Eng / 1k | Search % | Source |", "|---|---|---|---|---|---|---|---|---|---|"]
for r in sorted(rows, key=lambda r: -r["views"]):
    lines.append(f"| {r['ep']} | {r['s']} | {r['views']:.0f} | {fmt(r['avg_watch'], 1, ' s')} | {fmt(r['watch_pct'], 0, '%')} | {fmt(r['full'])} | {r['f1k']:.2f} | {r['eng1k']:.1f} | {fmt(r['search'])} | {r['src']} |")
lines += ["", "## Missing data", "", ("Posted (or scheduled and past) with no numbers in the export or the dashboard: " + ", ".join(missing) +
          ". Export TikTok Studio again (or send `/stats` screenshots) to score them.") if missing else "None."]
open(f"{ME}/06_analytics/series-scoreboard.md", "w").write("\n".join(lines) + "\n")
print("\n".join(lines[:6 + len(by)]))
print("missing:", missing)

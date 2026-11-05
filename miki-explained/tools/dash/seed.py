#!/usr/bin/env python3
"""Fill/refresh the dashboard's episodes (and plan unposted ones) from the repo copy on the Air:
04_episodes/*/episode.md (title, lane, concept, caption), 03_ideas/experiments.md (the test stack), storage/posted.json and
storage/telegram-index.json (posted / has a final). Safe to re-run: it updates episodes and never touches metrics.
  python3 tools/dash/seed.py [--plan]     # --plan: give every ready episode without a TikTok slot the next free slot
"""
import json, re, sys, datetime
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent)); import db

ME = Path(__file__).resolve().parents[2]                          # miki-explained/
SLOTS = ["12:30", "18:00", "21:00"]                               # rotated, so post time is an experiment


def field(doc, name):
    m = re.search(rf"^{name}:\s*(.+)$", doc, re.M); return re.sub(r"\*\*|`", "", m.group(1)).strip() if m else None


def block(doc, label):
    m = re.search(rf"\*\*{label}:\*\*\s*```\n(.*?)```", doc, re.S); return m.group(1).strip() if m else None


def stacks():
    """experiments.md § Running: episode id → {group: option}."""
    p = ME / "03_ideas" / "experiments.md"
    if not p.exists(): return {}
    lines = [l for l in p.read_text().splitlines() if l.startswith("| ")]
    head = next((l for l in lines if "| Day | Episode |" in l), None)
    if not head: return {}
    cols = [c.strip() for c in head.strip("|").split("|")]
    out = {}
    for l in lines:
        cells = [c.strip() for c in l.strip("|").split("|")]
        m = re.search(r"\b(EX\d+V?\d*)\b", l)
        if not m or len(cells) < 4: continue
        row = dict(zip(cols, cells)); ep = m.group(1)
        st = {k: v for k, v in row.items() if k not in ("Day", "Episode", "Verdict") and v and v != "_"}
        for g in ("Scr length", "Bridge"):                         # some rows keep these inside the Episode cell
            if g not in st:
                mm = re.search(r"\b(L[123])\b", row.get("Episode", "")) if g == "Scr length" else re.search(r"Bridge (on|off)", row.get("Episode", ""))
                if mm: st[g] = mm.group(0)
        out[ep] = st
    return out


def main():
    posted = json.loads((ME / "storage" / "posted.json").read_text()) if (ME / "storage" / "posted.json").exists() else {}
    ix = json.loads((ME / "storage" / "telegram-index.json").read_text()) if (ME / "storage" / "telegram-index.json").exists() else {}
    finals = {v["episode"] for k, v in ix.items() if isinstance(v, dict) and v.get("role") == "final"}
    st = stacks()
    seen = set()
    with db.conn() as c:
        for d in sorted((ME / "04_episodes").glob("EX*")):
            f = next((d / n for n in ("episode.md", "README.md") if (d / n).exists()), None)
            if not f or d.name.split("_")[0] in seen: continue      # EX19_gym before EX19_miles_dropped: the first folder wins
            doc = f.read_text(); ep = d.name.split("_")[0]; seen.add(ep)
            t = re.search(r'^#\s*EX\S*\s*(?:[—:-]\s*)?[“"]?(.+?)[”"]?(?:\s+[—(].*)?$', doc, re.M)
            dur = re.search(r"\(([\d.]+) s", field(doc, "Status") or "")
            status = "posted" if ep in posted else "retired" if "RETIRED" in (field(doc, "Status") or "") else "ready" if ep in finals else "draft"
            c.execute("""insert into episodes(id, title, lane, setting, concept, stack, duration, status, caption, pinned, added)
                         values(?,?,?,?,?,?,?,?,?,?,?) on conflict(id) do update set title=excluded.title, lane=excluded.lane,
                         setting=excluded.setting, concept=excluded.concept, stack=excluded.stack, duration=excluded.duration,
                         status=case when episodes.status='posted' then 'posted' else excluded.status end,
                         caption=excluded.caption, pinned=excluded.pinned""",
                      (ep, t.group(1).strip() if t else ep, field(doc, "Lane"), field(doc, "Setting"), field(doc, "Named concept"),
                       json.dumps(st.get(ep, {})), float(dur.group(1)) if dur else None, status,
                       block(doc, "Caption"), block(doc, "Pinned comment"), db.now()))
            if ep in posted:                                       # earlier posts: TikTok, on the logged date
                day = posted[ep] if re.match(r"\d{4}-\d\d-\d\d", str(posted[ep])) else None
                c.execute("insert into posts(episode, platform, posted_at) values(?, 'tiktok', ?) on conflict(episode, platform) do nothing",
                          (ep, day))
        if "--plan" in sys.argv:                                  # one post a day, slots rotated, from tomorrow
            taken = {r[0] for r in c.execute("select substr(planned_at,1,10) from posts where planned_at is not null and posted_at is null")}
            day, k = datetime.date.today() + datetime.timedelta(days=1), 0
            for r in c.execute("select id from episodes where status='ready' and id not in (select episode from posts where platform='tiktok') order by id").fetchall():
                while day.isoformat() in taken: day += datetime.timedelta(days=1)
                c.execute("insert into posts(episode, platform, planned_at) values(?, 'tiktok', ?)", (r[0], f"{day.isoformat()}T{SLOTS[k % 3]}"))
                taken.add(day.isoformat()); k += 1
    with db.conn() as c:
        for r in c.execute("select id, status, title from episodes order by id"): print(r["id"], r["status"], r["title"])
        for r in c.execute("select episode, platform, planned_at, posted_at from posts order by coalesce(posted_at, planned_at)"): print(" ", dict(r))


if __name__ == "__main__":
    main()

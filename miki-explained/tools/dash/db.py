"""Miki dashboard database (SQLite on the Air: ~/miki-ops/data/miki.db). Shared by the dashboard server and the bot.

episodes  one row per Miki Explained episode: title, lane, concept, test stack (JSON), caption, status, notes
posts     one row per episode per platform: planned slot, when it went out, link, reminder sent
metrics   one row per post per checkpoint (24h / 72h / 7d): views, watch, engagement, follows
inbox     analytics screenshots (from the bot or uploaded in the dashboard) with the numbers read off them (suggest)
nudges    stats reminders the bot has sent (post, checkpoint)
settings  slots, cadence, reminder lead, quiet hours
"""
import os, sqlite3, datetime, json

DB = os.path.expanduser(os.environ.get("MIKI_DB", "~/miki-ops/data/miki.db"))
SCHEMA = """
create table if not exists episodes(
  id text primary key, title text, lane text, setting text, concept text, stack text, words int, duration real,
  status text default 'draft', caption text, pinned text, added text, notes text);
create table if not exists posts(
  id integer primary key autoincrement, episode text not null, platform text not null default 'tiktok',
  planned_at text, posted_at text, content_type text default 'video', url text, note text, reminded int default 0,
  unique(episode, platform));
create table if not exists metrics(
  id integer primary key autoincrement, post_id integer not null, checkpoint text not null,
  views int, avg_watch real, full_pct real, likes int, comments int, shares int, saves int, follows int, fyp_pct real,
  source text, recorded_at text, unique(post_id, checkpoint));
create table if not exists inbox(
  id integer primary key autoincrement, episode text, checkpoint text, path text, received_at text, processed int default 0,
  suggest text, origin text);
create table if not exists nudges(post_id integer, checkpoint text, sent_at text, primary key(post_id, checkpoint));
create table if not exists settings(key text primary key, value text);
"""
MIGRATE = [("episodes", "notes", "text"), ("posts", "reminded", "int default 0"), ("inbox", "suggest", "text"), ("inbox", "origin", "text"),
           ("posts", "scheduled_at", "text")]
CHECKPOINTS = ("24h", "72h", "7d")
HOURS = {"24h": 24, "72h": 72, "7d": 168}
PLATFORMS = ("tiktok", "instagram", "threads")
DEFAULTS = {"slots": ["12:30", "18:00", "21:00"], "per_day": 1, "lead_min": 30, "quiet": ["22:30", "08:30"]}


def now():
    return datetime.datetime.now().isoformat(timespec="minutes")


def conn():
    os.makedirs(os.path.dirname(DB), exist_ok=True)
    c = sqlite3.connect(DB, timeout=10); c.row_factory = sqlite3.Row; c.executescript(SCHEMA)
    for t, col, typ in MIGRATE:
        if col not in [r[1] for r in c.execute(f"pragma table_info({t})")]: c.execute(f"alter table {t} add column {col} {typ}")
    return c


def settings(c=None):
    own = c is None; c = c or conn()
    s = dict(DEFAULTS); s.update({r["key"]: json.loads(r["value"]) for r in c.execute("select key, value from settings")})
    if own: c.close()
    return s


def set_settings(d):
    with conn() as c:
        for k, v in d.items():
            if k in DEFAULTS: c.execute("insert into settings values(?, ?) on conflict(key) do update set value=excluded.value", (k, json.dumps(v)))


def record_post(ep, platform="tiktok", when=None):
    """Mark ep posted on a platform at `when` (ISO, default now); creates the post row if it was never planned."""
    with conn() as c:
        c.execute("insert into posts(episode, platform) values(?, ?) on conflict(episode, platform) do nothing", (ep, platform))
        c.execute("update posts set posted_at = ? where episode = ? and platform = ?", (when or now(), ep, platform))
        if platform == "tiktok": c.execute("update episodes set status = 'posted' where id = ?", (ep,))
    return when or now()


def schedule(ep, when, platform="tiktok"):
    """Scheduled in TikTok Studio (or another app's scheduler) for `when`: it goes live by itself then (see auto_post)."""
    with conn() as c:
        c.execute("insert into posts(episode, platform, planned_at, scheduled_at) values(?, ?, ?, ?) on conflict(episode, platform) "
                  "do update set scheduled_at=excluded.scheduled_at, planned_at=excluded.planned_at, reminded=1", (ep, platform, when, when))
    return when


def unschedule(ep, platform="tiktok"):
    with conn() as c:
        c.execute("update posts set scheduled_at = null, reminded = 0 where episode = ? and platform = ? and posted_at is null", (ep, platform))


def auto_post(c):
    """Scheduled posts whose time has passed went live on their own: mark them posted at their scheduled time."""
    t = now()
    for r in c.execute("select id, episode, platform, scheduled_at from posts where scheduled_at is not null and posted_at is null and scheduled_at <= ?", (t,)).fetchall():
        c.execute("update posts set posted_at = scheduled_at where id = ?", (r["id"],))
        if r["platform"] == "tiktok": c.execute("update episodes set status = 'posted' where id = ?", (r["episode"],))


def unpost(ep, platform="tiktok"):
    with conn() as c:
        c.execute("update posts set posted_at = null, scheduled_at = null where episode = ? and platform = ?", (ep, platform))
        if platform == "tiktok": c.execute("update episodes set status = 'ready' where id = ? and status = 'posted'", (ep,))


def add_inbox(ep, checkpoint, path, suggest=None, origin="bot"):
    with conn() as c:
        cur = c.execute("insert into inbox(episode, checkpoint, path, received_at, suggest, origin) values(?, ?, ?, ?, ?, ?)",
                        (ep, checkpoint, path, now(), json.dumps(suggest) if suggest else None, origin))
        return cur.lastrowid


def due(c=None):
    """Stats checkpoints that have come due for posted posts: [{post_id, episode, platform, checkpoint, due_at, state}]
    state: done (numbers in), sent (screenshot waiting in the inbox), due (now), upcoming."""
    own = c is None; c = c or conn(); out = []; t = datetime.datetime.now(); auto_post(c)
    have = {(r[0], r[1]) for r in c.execute("select post_id, checkpoint from metrics where views is not null")}
    sent = {(r[0], r[1]) for r in c.execute("select episode, checkpoint from inbox where processed = 0")}
    for p in c.execute("select id, episode, platform, posted_at from posts where posted_at is not null and length(posted_at) > 10"):
        at = datetime.datetime.fromisoformat(p["posted_at"])
        for cp in CHECKPOINTS:
            d = at + datetime.timedelta(hours=HOURS[cp])
            st = "done" if (p["id"], cp) in have else "sent" if (p["episode"], cp) in sent else "due" if d <= t else "upcoming"
            out.append({"post_id": p["id"], "episode": p["episode"], "platform": p["platform"], "checkpoint": cp,
                        "due_at": d.isoformat(timespec="minutes"), "state": st})
    if own: c.close()
    return out


def replan(start=None):
    """Give every ready episode without a TikTok post a slot: from `start` (default tomorrow), per_day posts a day, the
    slots rotated, skipping days and times already taken. Returns [(episode, planned_at)]."""
    with conn() as c:
        s = settings(c); slots, per = s["slots"], max(1, int(s["per_day"]))
        c.execute("update posts set planned_at = null where platform='tiktok' and posted_at is null")
        taken = {r[0] for r in c.execute("select planned_at from posts where planned_at is not null")}
        day = start or (datetime.date.today() + datetime.timedelta(days=1)); k, out = 0, []
        eps = [r[0] for r in c.execute("select id from episodes where status='ready' and id not in "
                                       "(select episode from posts where platform='tiktok' and posted_at is not null) order by id")]
        while eps:
            for j in range(per):
                if not eps: break
                when = f"{day.isoformat()}T{slots[(k + j) % len(slots)]}"
                if when in taken: continue
                ep = eps.pop(0)
                c.execute("insert into posts(episode, platform, planned_at) values(?, 'tiktok', ?) on conflict(episode, platform) "
                          "do update set planned_at=excluded.planned_at, reminded=0", (ep, when)); out.append((ep, when))
            k += per; day += datetime.timedelta(days=1)
        return out

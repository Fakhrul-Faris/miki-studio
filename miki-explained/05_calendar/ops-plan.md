# Ops plan (posting, tracking, cross-posting)

Logged 2026-11-01. The flow: the Pro makes episodes → Telegram storage (via the Air) → the dashboard queue on the Air →
the user schedules each in TikTok Studio by hand → marks it posted and sends analytics screenshots → Claude syncs the
numbers → experiments get verdicts.

## Done
- [x] MacBook Air as the always-on server (Tailscale, SSH key from the Pro, OrbStack 3 GB, no sleep with the lid closed)
- [x] Local Telegram Bot API server + the bot moved to the Air; `tools/air.sh` on the Pro
- [x] Dashboard v1 on the Air (Tabler, SQLite, Tailscale-only): queue with rotated slots, posts, experiments, inbox
- [x] Bot: `/posted ex13 tiktok 18:00`, `/stats ex13 72h` + screenshot, `/dash`

## Next (in order)
1. Dashboard v2 (in progress): dark UI, Today screen, video download, upload screenshots + OCR prefill, reminders, library,
   calendar, analytics heatmap, settings, home-screen app.
2. Postiz on the Air (OrbStack, trimmed; stays on the Pro if 8 GB can't cope): Meta developer app in development mode →
   Instagram Reels (Creator/Business account linked to a Facebook Page) + Threads; their stats into the dashboard.
3. Threads research → a Threads playbook (format per episode: hook post, mechanism + numbers, the video, a reply-starter).
4. Cross-post rule: an episode goes to Instagram + Threads once it beats the TikTok median at 72 h.
5. TikTok developer app audit submission (so Postiz can post TikTok later).
6. Optional: `tailscale serve` (HTTPS) on the Air, run once at the Air.

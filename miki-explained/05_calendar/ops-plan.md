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
1. ~~Dashboard v2~~ done 2026-11-01 (Today, Calendar, Library, Analytics, Inbox + OCR, Settings, scheduled-in-Studio, reminders).
2. **Meta: ON HOLD (user, 2026-11-01).** Postiz on the Air + Instagram/Threads. Where it stopped:
   - Done: Postiz installed on the Air, slimmed (no Elasticsearch; ~1.6 GB), `~/Private/postiz` (compose, gate.conf, .env with
     generated secrets, meta.env template). Stack **stopped** while on hold: `cd ~/Private/postiz && docker compose up -d` to resume.
     OrbStack memory cap raised to 3.5 GB. The old Postiz on the Pro (`~/Private/postiz`, ~2.6 GB) is still running, unused.
   - Design (no cost, no card; user rejected Cloudflare R2): Tailscale **serve** :8443 → Postiz UI (private);
     Tailscale **funnel** :443 → nginx gate (127.0.0.1:4010) exposing only `/uploads/`, `/integrations/social/`, `/_next/`;
     everything else 302 → :8443. Meta fetches media from the public `/uploads/`. FRONTEND_URL = https://macs-macbook-air.tail59f296.ts.net,
     NEXT_PUBLIC_BACKEND_URL = …:8443/api. Untested: Postiz cookies across :443/:8443 and the OAuth return through the gate.
   - User's Meta app: **meikigo-ige** (business-managed by Meikigo; currently only "Facebook Login for Business").
   - Next steps for the user: Use cases → Add "Manage messaging & content on Instagram" → Instagram login setup (app id/secret,
     add @meikigo as Creator, redirect `…/integrations/social/instagram-standalone`; perms instagram_business_basic,
     _content_publish, _manage_insights); "Access the Threads API" (maybe its own app) with redirect `…/integrations/social/threads`,
     perms threads_basic, _content_publish, _manage_insights; Instagram/Threads testers + accept invites; at the Air run
     `tailscale serve --bg --https=8443 http://127.0.0.1:4007` and `tailscale funnel --bg --https=443 http://127.0.0.1:4010`;
     fill `~/Private/postiz/meta.env` on the Air. Then Claude: restart, user creates the Postiz login, DISABLE_REGISTRATION=true,
     connect channels, private test posts, stop the Pro's Postiz, pull IG/Threads stats into the dashboard.
3. Threads research → a Threads playbook (format per episode: hook post, mechanism + numbers, the video, a reply-starter).
4. Cross-post rule: an episode goes to Instagram + Threads once it beats the TikTok median at 72 h.
5. TikTok developer app audit submission (so Postiz can post TikTok later).
6. Optional: `tailscale serve` (HTTPS) on the Air, run once at the Air.

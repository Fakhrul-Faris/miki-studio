# Overlays, subtitles, export

Everything added on top of the stills in the edit. Same look every episode.

| Element | Spec |
|---------|------|
| **Phone notifications** | **Stock lock-screen notifications only** — real iOS or Android, no custom cards, no floating oversized UI. Make them for real: rename a contact (e.g. "Babe ❤️"), message that phone, trigger the app notification, then screenshot the lock screen. Composite the screenshot onto the blank phone screen in the frame (corner-pin / screen replace), matching the phone's angle. Pick one OS for the whole series and stay with it. |
| **Readability** | Notifications are read in the phone close-up insert, where the screen fills most of the frame — not by enlarging the UI. In wider shots the lock screen is just visible on the phone. |
| **Appearing** | A new notification slides in as it does on a real lock screen (stock animation or a 6-frame slide-down), with the notification SFX. |
| **End card** | Every episode ends on it. Made and added in post by the producer, after the last shot. |
| **Subtitles** | Burned-in from the caption column of `3_voice.md`. Bold sans, ~64px, centre, y ≈ 70%. Miki = cream `#F2EDE4` with black stroke; others = white with black stroke. One line at a time. Notification text is never subtitled. |

**Safe zones:** keep the right 15% and bottom 20% free of key overlays — TikTok's buttons and caption cover them.

## Export

1080×1920 · H.264 · 30fps · ~16 Mbps · AAC 48kHz · dialogue peaks around −6 dB, room tone ~−30 dB.
Also export a clean version with no subtitles (`export/<EP>_clean.mp4`) for Reels/Shorts later.

# Comedy autopsy — collect → transcribe → autopsy

## One-time setup

From `comedy-autopsy/`:

```bash
python3.12 -m venv .venv
.venv/bin/pip install faster-whisper 'yt-dlp[default]' curl_cffi
chmod +x download_clip.sh extract_frames.sh
```

Needs **Python 3.10+** (3.12 recommended). First Whisper run downloads the model (~150MB for `base`).

---

## 1. Download a clip

```bash
cd comedy-autopsy
./download_clip.sh 'PASTE_URL_HERE' vid_002
```

**Platform reliability**
- YouTube Shorts → most reliable
- TikTok → often blocked by anti-bot; impersonation is enabled in the script. If it still fails, save manually (below)
- Instagram → flaky; manual save is usually faster

**If TikTok fails** (`Unable to extract webpage video data`):
1. Open the video in your browser
2. Save / share → download the file (or use the in-app save)
3. Move it into `raw/vid_002.mp4`

Or try updating yt-dlp, then retry:

```bash
.venv/bin/pip install -U yt-dlp curl_cffi
./download_clip.sh 'URL' vid_002
```

Manual drop always works — transcription does not care how the file got there.

Then log it in `clips_catalog.md`.

---

## 2. Transcribe

One clip:

```bash
.venv/bin/python transcribe_batch.py vid_002
```

All clips in `raw/` that don’t have a transcript yet:

```bash
.venv/bin/python transcribe_batch.py
```

Overwrite / better quality:

```bash
.venv/bin/python transcribe_batch.py vid_002 --force --model small
```

Output: `transcripts/vid_002.txt` (timestamped lines + plain text at the bottom).

---

## 3. Frames (optional, for deep batch)

```bash
./extract_frames.sh raw/vid_002.mp4 vid_002
# or with beat times in seconds:
./extract_frames.sh raw/vid_002.mp4 vid_002 0.5 2.0 4.5 6.0 7.2 8.0
```

---

## Daily loop

1. Collect URL → `./download_clip.sh URL vid_NNN`
2. Fill catalog entry (why saved)
3. `.venv/bin/python transcribe_batch.py vid_NNN`
4. Later: ask Cursor to write `autopsies/vid_NNN_autopsy.md`

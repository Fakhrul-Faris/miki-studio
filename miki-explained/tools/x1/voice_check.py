#!/usr/bin/env python3
"""X1 voice check: the user's ears in numbers, before anyone hears the film.

  .../comedy-autopsy/.venv/bin/python tools/x1/voice_check.py 04_episodes/EX45_howto-duitnow-qr [--table "Bahasa Melayu"] [--lang ms] [--raw]

Added 2026-11-16 after EX45: every user note on that episode was about the voice (muffled, metallic, words cut off, a
missing last sentence) and the X1 critic, which only measured loudness, caught none of them.
Reads the script lines from the first markdown table under a heading containing --table (column 2 = caption text) and
the processed takes audio/L01.wav … (falls back to audio/raw/L01.mp3). Per line:
  MISSING  the take is missing words of the script (Whisper word match < 0.6, or the last script words never heard:
           EX45 L11 dropped "Masih tunai sahaja?")
  CUT      speech energy right at the file's first/last 15 ms, or a pause cut that lands inside a word
           (EX45 v2: a second, Whisper-timed trim cut words)
  DULL     share of energy above 3 kHz under 22 % (EX45 L10 16 %: "a bit muffled")
  HARSH    energy 6–10 kHz over 1.6x the episode median: a metallic/denoise shimmer suspect (EX45: FFT denoise)
Exit 1 when any line flags. It does not replace listening: play the whole voice once before the preview.
"""
import difflib, glob, re, subprocess, sys
import numpy as np
from pathlib import Path

args = [a for a in sys.argv[1:]]
def opt(name, default):
    if name in args: i = args.index(name); v = args[i + 1]; del args[i:i + 2]; return v
    return default
TABLE, LANG = opt("--table", "Voice text"), opt("--lang", "ms")
RAW = "--raw" in args; args = [a for a in args if a != "--raw"]   # --raw: check the takes as recorded (audio/raw/*.mp3)
ep = Path(args[0]); SR = 48000

def lines(md, head):
    out, seen = {}, False
    for row in md.splitlines():
        if not seen: seen = row.startswith("#") and head.lower() in row.lower(); continue
        if re.match(r"\| L\d+ ", row): c = [x.strip() for x in row.strip("|").split("|")]; out[c[0]] = c[1]
        elif out and not row.startswith("|"): break
    return out

def load(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(p), "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768

norm = lambda w: re.sub(r"[^a-z0-9]", "", w.lower())
script = lines((ep / "episode.md").read_text(), TABLE)
if not script: sys.exit(f"no table under a heading containing {TABLE!r}")
from faster_whisper import WhisperModel
m = WhisperModel("small", compute_type="int8")
rows, hi = [], []
for L, text in script.items():
    f = ep / "audio" / f"{L}.wav"
    if RAW or not f.exists(): f = ep / "audio" / "raw" / f"{L}.mp3"
    if not f.exists(): rows.append((L, ["no audio file"], 0)); continue
    x = load(f)
    segs, _ = m.transcribe(x[::3], word_timestamps=True, language=LANG)          # Whisper wants 16 kHz
    # compare letters, not words: Whisper splits and misspells Malay ("korang" → "kurang", "caj" → "charge")
    heard = norm("".join(w.word for s in segs for w in s.words)); want = norm(re.sub(r"\[.*?\]", "", text))
    ratio = difflib.SequenceMatcher(None, want, heard, autojunk=False).ratio()
    tail = want[-12:]; tail_ok = difflib.SequenceMatcher(None, tail, heard[-24:], autojunk=False).find_longest_match(0, len(tail), 0, len(heard[-24:])).size
    flags = []
    if ratio < 0.7 or tail_ok < 5: flags.append(f"MISSING: letter match {ratio:.2f}; script ends '…{tail}', take ends '…{heard[-16:]}'")
    e = lambda a, b: float(np.sqrt(np.mean(x[a:b] ** 2)) + 1e-9)
    body = e(0, len(x)); n15 = int(SR * 0.015)
    n100 = int(SR * 0.1)     # speech still running into the edge (a breath or room-tone tail is quieter than that)
    if (e(0, n15) > 0.6 * body and e(0, n100) > 0.75 * body) or (e(len(x) - n15, len(x)) > 0.6 * body and e(len(x) - n100, len(x)) > 0.75 * body):
        flags.append("CUT: a word runs into the file edge (re-take, or check the trim)")
    S = np.abs(np.fft.rfft(x)); fr = np.fft.rfftfreq(len(x), 1 / SR)
    share = S[fr > 3000].sum() / S.sum()
    if share < 0.22: flags.append(f"DULL: {share:.0%} of energy above 3 kHz (want ≥ 22 %)")
    hi.append(S[(fr > 6000) & (fr < 10000)].sum() / S.sum())
    rows.append((L, flags, hi[-1]))
med = float(np.median(hi)) if hi else 0
bad = 0
for L, flags, h in rows:
    if med and h > 1.6 * med: flags.append(f"HARSH: 6–10 kHz energy {h / med:.1f}x the episode median (metallic/denoise suspect)")
    print(f"{L}  {'OK' if not flags else ''}")
    for fl in flags: print(f"     {fl}")
    bad += bool(flags)
print(f"\n{len(rows)} lines, {bad} flagged. Listen to the whole voice once anyway.")
sys.exit(1 if bad else 0)

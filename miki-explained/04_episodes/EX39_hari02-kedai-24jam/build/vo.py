#!/usr/bin/env python3
"""EX38 voice: Nathan profile in VoiceStudio (local API 127.0.0.1:3900), one WAV per line, then word timings.
Usage: build/vo.py [L03 L08 ...]   (no args = all lines)   · run from the episode folder with the faster-whisper venv"""
import json, subprocess, sys, wave
from pathlib import Path
SPEED, SEED, PROFILE = "1.2", "7", "a000dca6"
LINES = {
 "L01": "Eco-Shop sells almost everything for two ringgit sixty, and it has never made more money per item.",
 "L02": "Its gross margin just hit a record thirty-three percent, up from under twenty percent, just four years ago.",
 "L03": "Imagine one bottle on that shelf. You pay two sixty. On average, about eighty-seven sen of that stays with Eco-Shop, before rent and wages.",
 "L04": "How? Look at the label. It isn't a brand you know. It's Eco-Shop's own.",
 "L05": "House brands are now sixty percent of its sales, and they earn Eco-Shop more than the names you know.",
 "L06": "More than sixty-five percent of its products come from China, bought for four hundred and sixty-two stores at once.",
 "L07": "But here's the part the sign doesn't say. Fixed doesn't mean forever.",
 "L08": "Until April last year, it was two forty.",
 "L09": "Now minimum wage is rising to two thousand ringgit, the Chinese yuan is getting stronger, and analysts expect the price to move again within twelve months. One has pencilled in twenty sen.",
 "L10": "So the price was never really the product. The promise is. One number, on every shelf, that you never have to check.",
 "L11": "And the day that number changes, four hundred and sixty-two stores change with it.",
}
A = Path("audio"); A.mkdir(exist_ok=True)
todo = sys.argv[1:] or list(LINES)
seeds = dict(a.split("=") for a in todo if "=" in a); todo = [a.split("=")[0] for a in todo]
for L in todo:
    subprocess.run(["curl", "-s", "-m", "600", "-X", "POST", "http://127.0.0.1:3900/generate", "-F", f"text={LINES[L]}", "-F", f"profile_id={PROFILE}",
                    "-F", f"seed={seeds.get(L, SEED)}", "-F", f"speed={SPEED}", "-F", "language=English", "-o", str(A / f"{L}.wav")], check=True)
from faster_whisper import WhisperModel
m = WhisperModel("small", compute_type="int8")
words = json.loads((A / "words.json").read_text()) if (A / "words.json").exists() else {}
for L in todo:
    segs, _ = m.transcribe(str(A / f"{L}.wav"), word_timestamps=True, language="en")
    ws = [(w.word.strip(), round(w.start, 2), round(w.end, 2)) for s in segs for w in s.words]
    words[L] = ws
    with wave.open(str(A / f"{L}.wav")) as w: dur = w.getnframes() / w.getframerate()
    print(f"{L} {dur:.2f}s {len(LINES[L].split())}w | heard: {' '.join(x[0] for x in ws)}")
(A / "words.json").write_text(json.dumps(words, indent=1))

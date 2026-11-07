#!/usr/bin/env python3
"""A provisional audio/vo_timeline.json from the episode.md script table (about 2.8 words a second, 0.35 s between
lines), so a raea build can be laid out before the voice exists. tools/vo_tighten.py overwrites it with the real one.
   python3 tools/raea/est_timeline.py EPISODE_DIR"""
import json, os, re, sys
ep = sys.argv[1]; md = open(os.path.join(ep, "episode.md")).read()
rows = re.findall(r"^\| (L0\d) \| [^|]+ \| ([^|]+) \|", md, re.M)
t, words, ends = 0.2, {}, {}
for line, text in rows:
    ws = text.strip().split()
    words[line] = []
    for w in ws:
        words[line].append([w, round(t, 3)]); t += 0.36 + 0.02 * max(0, len(w) - 6)
    ends[line] = round(t, 3); t += 0.35
os.makedirs(os.path.join(ep, "audio"), exist_ok=True)
json.dump({"segs": [], "words": words, "lineEnd": ends, "end": round(t + 0.6, 3), "estimated": True},
          open(os.path.join(ep, "audio", "vo_timeline.json"), "w"), indent=1)
print(ep, "estimated", round(t + 0.6, 1), "s,", sum(len(v) for v in words.values()), "words")

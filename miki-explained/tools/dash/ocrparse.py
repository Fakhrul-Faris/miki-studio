"""Read a TikTok Studio (or Instagram) analytics screenshot into dashboard numbers, on the Air: macOS Vision OCR
(~/miki-ops/bin/ocr, built from ocr/ocr.swift) → label/value pairs. Always a *suggestion*: the user confirms in the dashboard.
"""
import json, os, re, subprocess

OCR = os.path.expanduser("~/miki-ops/bin/ocr")
LABELS = [  # (field, label pattern); first match wins, so the specific ones come first
    ("avg_watch", r"average (watch|play) ?time"), ("full_pct", r"watched (the )?full (video)?|completion rate|finish rate"),
    ("follows", r"(new )?followers?( gained)?$|^follows$"), ("views", r"^(video |total |post )?(views|plays)$"),
    ("likes", r"^likes$"), ("comments", r"^comments$"), ("shares", r"^shares$"), ("saves", r"^(saves|favou?rites|bookmarks)$")]
NUM = re.compile(r"^[\d.,]+\s*[kKmM]?$|^\d+(\.\d+)?\s*%$|^(\d+\s*[hms]\s*)+$|^\d+(\.\d+)?s$")


def number(s):
    s = s.strip().replace(",", "")
    m = re.fullmatch(r"([\d.]+)\s*([kKmM]?)", s)
    if m: return round(float(m.group(1)) * {"": 1, "k": 1e3, "m": 1e6}[m.group(2).lower()])
    m = re.fullmatch(r"([\d.]+)\s*%", s)
    if m: return float(m.group(1))
    secs = 0.0
    for v, u in re.findall(r"([\d.]+)\s*([hms])", s): secs += float(v) * {"h": 3600, "m": 60, "s": 1}[u]
    return round(secs, 1) if secs else None


def read(path):
    """→ {field: value} found in the screenshot (views, avg_watch s, full_pct %, likes, comments, shares, saves, follows, fyp_pct)."""
    try:
        lines = [l["text"].strip() for l in json.loads(subprocess.run([OCR, path], capture_output=True, text=True, timeout=60).stdout or "[]")]
    except (OSError, subprocess.SubprocessError, ValueError):
        return {}
    out = {}
    for i, t in enumerate(lines):
        low = t.lower()
        m = re.search(r"for you\D*([\d.]+)\s*%", low)
        if m and "fyp_pct" not in out: out["fyp_pct"] = float(m.group(1)); continue
        for field, pat in LABELS:
            if field in out: continue
            lab = re.sub(r"\s*[\d.,]+\s*[kKmM%s]?$", "", low).strip()
            if re.search(pat, lab):
                tail = t[len(lab):].strip() if len(t) > len(lab) else ""
                cand = [tail] if tail and NUM.match(tail) else [x for x in lines[i + 1:i + 3] if NUM.match(x.strip())][:1]
                if cand and (v := number(cand[0])) is not None: out[field] = v
                break
    return out


if __name__ == "__main__":
    import sys; print(read(sys.argv[1]))

#!/usr/bin/env python3
"""Free-licence real footage for Miki Explained: find it, fetch it (with its licence logged for the credits), and print it
into the house palette (ink #111111 → ochre #C98A2B → cream #EFE8DC, optional halftone dots, grain).

  python3 miki-explained/tools/footage.py search "people waiting in line" [-n 15]       # Wikimedia Commons videos
  python3 miki-explained/tools/footage.py fetch "File:Queue 2 - ….webm" <episode_dir> [--name queue] [--from 12 --to 20]
  python3 miki-explained/tools/footage.py print <in.mp4> <out.mp4> [--size 1080x1920] [--dots 7] [--grain 8] [--fps 24] [--bw] [--twos] [--gamma 0.7]
      --bw    plain black and white (no palette, no dots): the footage stays readable
      --twos  drop the film's duplicate frames and play every real frame held 2 (12 fps steps, even cadence; old 18 fps
              film runs a little slower)
      --gamma below 1 darkens the mid-tones (for washed-out clips)
  python3 miki-explained/tools/footage.py credits <episode_dir>                         # the credit lines for the caption

Sources stay free: Wikimedia Commons (public domain, CC0, CC BY, CC BY-SA). CC BY / BY-SA need the credit line in the post
(credits writes it). Fetched clips land in <episode_dir>/footage/ with footage/credits.json.
"""
import json, subprocess, sys, urllib.parse, urllib.request
from pathlib import Path

UA = {"User-Agent": "miki-studio-footage/1.0 (Meikigo; contact via repo owner)"}
API = "https://commons.wikimedia.org/w/api.php?"
INK, OCHRE, CREAM = (0x11, 0x11, 0x11), (0xC9, 0x8A, 0x2B), (0xEF, 0xE8, 0xDC)
FREE = ("public domain", "cc0", "cc by", "cc-by", "fal", "pd")


def api(params):
    return json.load(urllib.request.urlopen(urllib.request.Request(API + urllib.parse.urlencode({"format": "json", **params}), headers=UA), timeout=60))


def info(titles, n=20):
    d = api({"action": "query", "titles": titles, "prop": "imageinfo", "iiprop": "url|size|extmetadata",
             "iiextmetadatafilter": "LicenseShortName|Artist|LicenseUrl"}) if titles else None
    return d


def cmd_search(a):
    term = a[0]; n = int(a[a.index("-n") + 1]) if "-n" in a else 15
    d = api({"action": "query", "generator": "search", "gsrsearch": f"{term} filetype:video", "gsrnamespace": 6, "gsrlimit": n,
             "prop": "imageinfo", "iiprop": "url|size|extmetadata", "iiextmetadatafilter": "LicenseShortName"})
    for p in sorted((d.get("query", {}).get("pages", {}) or {}).values(), key=lambda p: -p["imageinfo"][0].get("width", 0)):
        ii = p["imageinfo"][0]; lic = ii.get("extmetadata", {}).get("LicenseShortName", {}).get("value", "?")
        ok = "✓" if any(f in lic.lower() for f in FREE) else "✗"
        print(f"{ok} {ii.get('width')}x{ii.get('height')} {ii.get('size', 0) / 1e6:5.0f} MB  {lic:16}  {p['title']}")


def cmd_fetch(a):
    title, ep = a[0], Path(a[1]); name = a[a.index("--name") + 1] if "--name" in a else None
    t0 = a[a.index("--from") + 1] if "--from" in a else None; t1 = a[a.index("--to") + 1] if "--to" in a else None
    p = next(iter(api({"action": "query", "titles": title, "prop": "imageinfo", "iiprop": "url|size|extmetadata",
                       "iiextmetadatafilter": "LicenseShortName|Artist|LicenseUrl"})["query"]["pages"].values()))
    ii = p["imageinfo"][0]; md = ii.get("extmetadata", {})
    lic = md.get("LicenseShortName", {}).get("value", "?")
    if not any(f in lic.lower() for f in FREE): sys.exit(f"not a free licence: {lic}")
    out = ep / "footage"; out.mkdir(parents=True, exist_ok=True)
    stem = name or Path(title.split(":", 1)[1]).stem.replace(" ", "_")[:40]
    raw = out / f"{stem}_src{Path(urllib.parse.urlsplit(ii['url']).path).suffix}"
    if not raw.exists():
        with urllib.request.urlopen(urllib.request.Request(ii["url"], headers=UA), timeout=600) as r, open(raw, "wb") as f:
            while chunk := r.read(1 << 20): f.write(chunk)
    clip = out / f"{stem}.mp4"; cut = (["-ss", t0] if t0 else []) + (["-to", t1] if t1 else [])
    subprocess.run(["ffmpeg", "-v", "error", "-y", *cut[:2], "-i", str(raw), *cut[2:], "-an", "-c:v", "libx264", "-crf", "16", "-pix_fmt", "yuv420p", str(clip)], check=True)
    import re
    artist = re.sub(r"<[^>]+>", "", md.get("Artist", {}).get("value", "")).strip() or "unknown"
    half = len(artist) // 2
    if len(artist) % 2 == 0 and artist[:half] == artist[half:]: artist = artist[:half]      # Commons sometimes repeats the name
    cr = out / "credits.json"; c = json.loads(cr.read_text()) if cr.exists() else {}
    c[clip.name] = {"title": title, "artist": artist, "license": lic, "license_url": md.get("LicenseUrl", {}).get("value", ""),
                    "page": "https://commons.wikimedia.org/wiki/" + urllib.parse.quote(title.replace(" ", "_")), "from": t0, "to": t1}
    cr.write_text(json.dumps(c, indent=1))
    print(f"{clip}  ({lic}, {artist})")


def cmd_print(a):
    """Three-tone print in the palette, cropped to fill the size; --dots N adds an N-px halftone screen (45°);
    --bw keeps it plain black and white; --twos removes duplicate frames and steps the rest evenly on twos."""
    src, dst = a[0], a[1]
    W, H = (int(x) for x in (a[a.index("--size") + 1] if "--size" in a else "1080x1920").split("x"))
    dots = int(a[a.index("--dots") + 1]) if "--dots" in a else 0; grain = int(a[a.index("--grain") + 1]) if "--grain" in a else 8
    fps = a[a.index("--fps") + 1] if "--fps" in a else "24"
    # luminance → 0..1 tone (contrast pushed), then ink → ochre → cream (ochre sits in the mid-tones)
    def ch(i):
        a_, b_, c_ = INK[i], OCHRE[i], CREAM[i]
        return f"if(lt(val,128), {a_}+({b_}-{a_})*val/128, {b_}+({c_}-{b_})*(val-128)/127)"
    gamma = a[a.index("--gamma") + 1] if "--gamma" in a else "1"
    twos = "mpdecimate=hi=64*40:lo=64*20:frac=0.33,setpts=N/(12*TB),fps=12," if "--twos" in a else ""
    tone = (twos + f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps={fps},format=gray,"
            f"eq=contrast=1.35:brightness=0.02:gamma={gamma},curves=all='0/0 0.25/0.12 0.75/0.9 1/1'")
    if dots:  # halftone: a pixel is cream when its tone beats the distance to the nearest dot centre (rotated 45°)
        tone += (f",format=yuv444p,geq=cb=128:cr=128:lum='if(gt(lum(X,Y)/255, 1 - hypot(mod((X+Y)/1.414,{dots})-{dots}/2, mod((X-Y)/1.414,{dots})-{dots}/2)/({dots}*0.62)), "
                 f"min(255, lum(X,Y)*1.25), lum(X,Y)*0.35)',format=gray")
    if "--bw" in a:
        vf = tone + (f",noise=alls={grain}:allf=t" if grain else "") + f",fps={fps},format=yuv420p"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-vf", vf, "-an", "-c:v", "libx264", "-crf", "17", dst], check=True)
        return print(dst)
    vf = tone + ",format=rgb24," + f"lutrgb=r='{ch(0)}':g='{ch(1)}':b='{ch(2)}'" + (f",noise=alls={grain}:allf=t" if grain else "") + f",fps={fps},format=yuv420p"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-vf", vf, "-an", "-c:v", "libx264", "-crf", "17", dst], check=True)
    print(dst)


def cmd_credits(a):
    cr = Path(a[0]) / "footage" / "credits.json"
    for k, v in (json.loads(cr.read_text()) if cr.exists() else {}).items():
        need = "" if any(x in v["license"].lower() for x in ("public domain", "cc0", "pd")) else " (credit required)"
        print(f"{v['artist']}, \"{v['title'].split(':', 1)[1]}\", {v['license']}, Wikimedia Commons{need}")


if __name__ == "__main__":
    cmds = {"search": cmd_search, "fetch": cmd_fetch, "print": cmd_print, "credits": cmd_credits}
    if len(sys.argv) < 2 or sys.argv[1] not in cmds: sys.exit(__doc__)
    cmds[sys.argv[1]](sys.argv[2:])

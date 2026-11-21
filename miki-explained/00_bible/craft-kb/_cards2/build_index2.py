"""Add set-2 topics to craft-kb/INDEX.md from _cards2/CLUSTERS2-*.md.

New buckets 06-09 become new sections; set-2 craft topics (01-05) are merged into the existing tables.
Topics marked [fold -> ...] are skipped (they live inside a set-1 card or master now).
Run from craft-kb/: python3 _cards2/build_index2.py
"""
import glob, os, re

NAMES = {
    "01_Animation_Motion": "Animation & motion",
    "02_Geometry_Nodes": "Geometry Nodes",
    "03_Modeling_Modifiers": "Modeling & modifiers",
    "04_Shading_Lighting": "Shading & lighting",
    "05_Camera_Raea_Pipeline": "Camera, composition & raea pipeline",
    "06_Art_Direction": "Art direction",
    "07_Script_Story": "Script & story",
    "08_Edit_Pacing": "Edit & pacing",
    "09_UI_Motion": "UI motion",
}


def flagged(paths):
    for p in paths:
        if os.path.exists(p):
            m = re.search(r"^style_fit:\s*(.+)$", open(p, errors="ignore").read(), re.M)
            if m and ("⚠" in m.group(1) or "conflict" in m.group(1).lower()):
                return True
    return False


def topics():
    out = {}
    for f in sorted(glob.glob("_cards2/CLUSTERS2-*.md")):
        bucket = None
        for blk in re.split(r"\n(?=## |### )", open(f).read()):
            h2 = re.match(r"## (\d\d_\w+)", blk)
            if h2:
                bucket = h2.group(1)
                continue
            h3 = re.match(r"### (\S+) — (.+)", blk)
            if not h3 or "[fold" in blk.split("\n")[0]:
                continue
            slug, name = h3.group(1), re.sub(r"\s*`?\[merge\]`?", "", h3.group(2)).strip()
            members = re.findall(r"^(cards/\S+\.md)", blk, re.M)
            uw = (re.search(r"^use-when:\s*(.+)$", blk, re.M) or [None, ""])[1].strip()
            master = glob.glob(f"masters/*/{slug}.md")
            if "[merge]" in blk.split("\n")[0] and master:
                link, kind = master[0], f"**M** ({len(members)})"
            else:
                link, kind = members[0], ""
            b = link.split("/")[1]
            row = f"| [{name}]({link}){' ⚠' if flagged([link] + members) else ''} | {uw} | {kind} |"
            out.setdefault(b, []).append((name.lower(), row))
    return out


def main():
    idx = open("INDEX.md").read()
    new = topics()
    for b, rows in new.items():
        title = NAMES[b]
        sec = re.search(rf"(## {re.escape(title)}\n\n)(\d+) topics\.\n\n(\| topic.*?\n\|---.*?\n)((?:\|.*\n)*)", idx)
        if sec:  # existing set-1 section: merge rows, re-sort, recount
            old = [(re.search(r"\[(.+?)\]", r).group(1).lower(), r) for r in sec.group(4).splitlines()]
            allrows = sorted(old + rows)
            body = "".join(r + "\n" for _, r in allrows)
            idx = idx[: sec.start()] + f"{sec.group(1)}{len(allrows)} topics.\n\n{sec.group(3)}{body}" + idx[sec.end():]
        else:  # new set-2 section
            body = "".join(r + "\n" for _, r in sorted(rows))
            idx = idx.rstrip("\n") + (
                f"\n\n## {title}\n\n{len(rows)} topics.\n\n| topic | use when | card |\n|---|---|---|\n{body}"
            )
    anchors = " · ".join(
        f"[{NAMES[b]}](#{re.sub(r'[^a-z0-9 -]', '', NAMES[b].lower()).replace(' ', '-')})" for b in sorted(NAMES)
    )
    idx = re.sub(r"^Contents: .*$", "Contents: " + anchors, idx, count=1, flags=re.M)
    open("INDEX.md", "w").write(idx)
    print({b: len(r) for b, r in new.items()})


if __name__ == "__main__":
    main()

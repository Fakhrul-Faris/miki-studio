# ex37.tsx = header + EX31's street (ex37_base.part.tsx) + the stall pieces + the film.  python3 build/assemble.py
import os
D = os.path.dirname(os.path.abspath(__file__)); r = lambda n: open(os.path.join(D, n)).read()
src = r("ex37.tsx"); hdr = src[:src.index("const S = (p: string) => staticFile(p);")]
open(os.path.join(D, "ex37.tsx"), "w").write(hdr + r("ex37_base.part.tsx") + "\n" + r("ex37_pieces.part.tsx") + "\n" + r("ex37_film.part.tsx"))
print("assembled ex37.tsx")

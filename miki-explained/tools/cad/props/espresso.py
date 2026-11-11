"""Two-group commercial espresso machine + on-demand grinder, true size (text-to-cad trial, 2026-11-11).

build123d in mm, exported as GLB in metres for raea (origin = floor contact, centre; +Z of the GLB = machine front).
Run: tools/cad/.venv/bin/python tools/cad/props/espresso.py  ->  tools/cad/out/espresso.glb, grinder.glb
Sizes from a typical 2-group machine (~710 W x 560 D x 530 H) and a ~200 x 300 x 600 mm grinder.
Colours are placeholders: raea can repaint per part (names below) to the episode's palette.
"""
from pathlib import Path
import build123d as bd
from build123d import Align, Axis, Location, Pos, Rot

OUT = Path(__file__).resolve().parent.parent / "out"
STEEL, DARK, BLACK, GLASS, ACCENT = "#c9ced4", "#2b2d33", "#141417", "#e8eef2", "#1e3a8a"
C = (Align.CENTER, Align.CENTER, Align.MIN)  # centred, sitting on z = 0


def soft(shape, r):
    """Fillet every edge if the kernel allows (soft real-world edges catch light); otherwise keep it sharp."""
    try:
        return bd.fillet(shape.edges(), r)
    except Exception:
        return shape


def part(shape, name, color):
    shape.label, shape.color = name, bd.Color(color)
    return shape


def espresso():
    W, D = 710, 480                       # body (the drip tray sticks out in front)
    P = []
    # feet + body + top cup-warmer tray with a rail
    for x in (-W / 2 + 50, W / 2 - 50):
        for y in (-D / 2 + 50, D / 2 - 50):
            P.append(part(Pos(x, y, 0) * bd.Cylinder(18, 40, align=C), "feet", BLACK))
    body = soft(Pos(0, 0, 40) * bd.Box(W, D, 380, align=C), 12)
    P.append(part(body, "body", STEEL))
    P.append(part(soft(Pos(0, 0, 420) * bd.Box(W - 30, D - 30, 16, align=C), 4), "cup_tray", DARK))
    rail = []
    for y in (-(D / 2 - 30), D / 2 - 30):
        rail.append(Pos(0, y, 470) * Rot(0, 90, 0) * bd.Cylinder(6, W - 60))
    for x in (-(W / 2 - 30), W / 2 - 30):
        rail.append(Pos(x, 0, 470) * Rot(90, 0, 0) * bd.Cylinder(6, D - 60))
        for y in (-(D / 2 - 30), D / 2 - 30):
            rail.append(Pos(x, y, 436) * bd.Cylinder(5, 34, align=C))
    P.append(part(bd.Compound(rail), "rail", STEEL))
    # front panel (dark band) with two gauges and a button pad per group
    fy = -D / 2                            # front face at y = -240
    P.append(part(Pos(0, fy - 2, 250) * bd.Box(W - 60, 4, 140, align=C), "front_panel", DARK))
    for gx in (-180, 180):
        P.append(part(Pos(gx, fy - 6, 330) * Rot(90, 0, 0) * bd.Cylinder(34, 8), "gauge_rim", STEEL))
        P.append(part(Pos(gx, fy - 11, 330) * Rot(90, 0, 0) * bd.Cylinder(28, 2), "gauge_face", GLASS))
        for i in range(4):
            P.append(part(Pos(gx - 54 + i * 36, fy - 6, 275) * bd.Box(26, 8, 18, align=C), "buttons", BLACK))
        # group head: collar + shower block under the panel, portafilter with spouts and an angled handle
        P.append(part(Pos(gx, fy - 45, 200) * bd.Cylinder(46, 60, align=C), "group_head", STEEL))
        P.append(part(Pos(gx, fy - 45, 168) * bd.Cylinder(40, 32, align=C), "portafilter", STEEL))
        for sx in (-12, 12):
            P.append(part(Pos(gx + sx, fy - 45, 150) * bd.Cylinder(5, 20, align=C), "spouts", STEEL))
        handle = Pos(gx, fy - 45, 172) * Rot(80, 0, 0) * Pos(0, 0, 40) * bd.Cylinder(13, 150, align=C)   # +80 about X points it out the front
        P.append(part(handle, "handles", BLACK))
    # steam wands: post on each side, bent tube down to the tray (articulated look), black grip
    for sx in (-1, 1):
        x = sx * (W / 2 - 55)
        P.append(part(Pos(x, fy - 25, 225) * bd.Cylinder(10, 80, align=C), "steam_wands", STEEL))
        wand = Pos(x, fy - 60, 110) * Rot(0, sx * 12, 0) * bd.Cylinder(9, 220, align=C)
        P.append(part(wand, "steam_wands", STEEL))
        P.append(part(Pos(x, fy - 25, 300) * bd.Sphere(15), "steam_knobs", BLACK))
    # drip tray in front: a tray with a slotted grille (slots cut, not painted)
    tray = Pos(0, fy - 70, 40) * bd.Box(W - 80, 160, 40, align=C)
    tray -= Pos(0, fy - 70, 70) * bd.Box(W - 100, 140, 20, align=C)
    P.append(part(tray, "drip_tray", STEEL))
    grille = Pos(0, fy - 70, 64) * bd.Box(W - 104, 136, 4, align=C)
    for i in range(22):
        grille -= Pos(-(W - 140) / 2 + i * (W - 140) / 21, fy - 70, 64) * bd.Box(8, 112, 4, align=C)
    P.append(part(grille, "drip_grille", DARK))
    # brand plate on the side (repaint / swap with the episode's logo texture in raea)
    P.append(part(Pos(W / 2 + 2, 0, 200) * bd.Box(4, 260, 90, align=C), "side_plate", ACCENT))
    return P


def grinder():
    P = []
    P.append(part(soft(bd.Box(200, 260, 30, align=C), 6), "base", BLACK))
    P.append(part(soft(Pos(0, 30, 30) * bd.Box(170, 190, 330, align=C), 18), "body", STEEL))
    P.append(part(Pos(0, -60, 200) * bd.Box(70, 40, 60, align=C), "chute", DARK))
    P.append(part(Pos(0, -70, 120) * Rot(90, 0, 0) * bd.Cylinder(40, 8), "fork", BLACK))
    P.append(part(Pos(0, -55, 280) * bd.Box(110, 6, 60, align=C), "screen", GLASS))
    hopper = Pos(0, 30, 360) * bd.Cone(55, 95, 220, align=C)
    hopper -= Pos(0, 30, 368) * bd.Cone(50, 90, 220, align=C)
    P.append(part(hopper, "hopper", GLASS))
    P.append(part(Pos(0, 30, 362) * bd.Cone(52, 75, 120, align=C), "beans", "#5a3a22"))
    P.append(part(Pos(0, 30, 580) * bd.Cylinder(98, 14, align=C), "lid", BLACK))
    return P


def export(parts, name):
    OUT.mkdir(exist_ok=True)
    # build123d is Z up with the front at -Y; OCCT's glTF writer converts to glTF's Y up, so the front lands on +Z.
    asm = bd.Compound(children=parts, label=name)
    f = OUT / f"{name}.glb"
    bd.export_gltf(asm, str(f), unit=bd.Unit.MM, binary=True, linear_deflection=0.3, angular_deflection=0.2)
    bb = asm.bounding_box()
    print(f"{f.name}: {len(parts)} parts, {bb.size.X:.0f} x {bb.size.Y:.0f} x {bb.size.Z:.0f} mm, {f.stat().st_size // 1024} KB")


if __name__ == "__main__":
    export(espresso(), "espresso")
    export(grinder(), "grinder")

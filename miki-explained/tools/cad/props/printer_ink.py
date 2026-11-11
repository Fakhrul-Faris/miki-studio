"""Home inkjet all-in-one + ink cartridge, true size (text-to-cad trial, 2026-11-11; EX32's hero props, reusable).

Sizes approximate a DeskJet 2300-class all-in-one (~425 W x 304 D x 149 H mm, tray closed) and a 682-class cartridge
(~45 x 20 x 60 mm body): close enough for film, not for a spec sheet. No brand marks are modelled: the real logo goes on
as a texture in the scene (house rule: official logo files only).
Run: tools/cad/.venv/bin/python tools/cad/props/printer_ink.py  ->  tools/cad/out/printer.glb, cartridge.glb
Axes: modelled Z up, front at -Y; the glTF writer turns it Y up, front +Z, origin on the floor/desk contact.
"""
from pathlib import Path
import build123d as bd
from build123d import Align, Pos, Rot

OUT = Path(__file__).resolve().parent.parent / "out"
SHELL, SHELL2, DARK, BLACK, GLASS, PAPER = "#f1f0ec", "#d9d8d3", "#3a3d44", "#17181b", "#2a3440", "#fbfaf6"
C = (Align.CENTER, Align.CENTER, Align.MIN)


def soft(shape, r):
    try:
        return bd.fillet(shape.edges(), r)
    except Exception:
        return shape


def part(shape, name, color):
    shape.label, shape.color = name, bd.Color(color)
    return shape


def printer(tray_open=True, door_open=False):
    W, D, H = 425, 304, 149
    fy = -D / 2
    P = []
    # lower body with the paper slot cut into the front, scanner bed on top, lid with a front lip
    body = soft(bd.Box(W, D, H - 22, align=C), 10)
    body -= Pos(0, fy, 34) * bd.Box(W - 120, 40, 26, align=C)              # output slot (a real recess)
    if door_open:                                                          # the bay behind the ink door
        body -= Pos(-60, fy + 50, 64) * bd.Box(216, 100, 52, align=C)
    P.append(part(body, "body", SHELL))
    P.append(part(Pos(0, 0, H - 22) * bd.Box(W - 20, D - 20, 4, align=C), "scanner_glass", GLASS))
    lid = soft(Pos(0, 4, H - 18) * bd.Box(W - 10, D - 8, 18, align=C), 6)
    lid -= Pos(0, fy + 6, H - 10) * bd.Box(80, 14, 10, align=C)            # finger lip to open it
    P.append(part(lid, "lid", SHELL))
    # control strip on the front right: a dark panel, buttons, a status light
    P.append(part(Pos(W / 2 - 75, fy - 2, H - 50) * bd.Box(110, 4, 22, align=C), "panel", DARK))
    for i in range(4):
        P.append(part(Pos(W / 2 - 115 + i * 26, fy - 5, H - 44) * bd.Cylinder(6, 4, rotation=(90, 0, 0)), "buttons", SHELL2))
    P.append(part(Pos(W / 2 - 22, fy - 5, H - 44) * bd.Box(8, 4, 4, align=C), "status_light", "#2fbf71"))
    # ink access door (front left); open = hinged down, showing the carriage and two cartridges
    if door_open:
        # door hinged on its bottom edge, swung down ~75 deg: hangs out and down from the bay's lower lip
        door = Pos(-60, fy, 64) * Rot(-75, 0, 0) * bd.Box(220, 3, 56, align=(Align.CENTER, Align.MAX, Align.MAX))
        P.append(part(door, "ink_door", SHELL2))
        P.append(part(Pos(-60, fy + 70, 64) * bd.Box(200, 40, 14, align=C), "carriage", DARK))
        for i, col in enumerate((BLACK, "#3fa7d6")):                       # black + tri-colour, upright in the carriage
            P.append(part(Pos(-90 + i * 60, fy + 62, 78) * bd.Box(45, 20, 34, align=C), "cartridges", col))
        P.append(part(Pos(-60, fy + 90, 70) * Rot(0, 90, 0) * bd.Cylinder(4, 200), "carriage_rail", "#9aa0a8"))
    else:
        P.append(part(Pos(-60, fy - 1, 66) * bd.Box(220, 3, 56, align=C), "ink_door", SHELL2))
    # input tray at the back, tilted up, with a sheet in it; output tray pulled out at the front with a page
    tray = Pos(0, D / 2 - 20, H - 40) * Rot(-28, 0, 0) * bd.Box(W - 140, 6, 200, align=(Align.CENTER, Align.CENTER, Align.MIN))
    P.append(part(tray, "input_tray", SHELL2))
    P.append(part(Pos(0, D / 2 - 14, H - 34) * Rot(-28, 0, 0) * bd.Box(210, 1, 190, align=(Align.CENTER, Align.CENTER, Align.MIN)), "paper_in", PAPER))
    if tray_open:
        P.append(part(Pos(0, fy - 90, 22) * bd.Box(W - 140, 180, 4, align=C), "output_tray", SHELL2))
        P.append(part(Pos(0, fy - 115, 26) * bd.Box(210, 160, 1, align=C), "page_out", PAPER))
    for x in (-W / 2 + 30, W / 2 - 30):
        for y in (fy + 30, -fy - 30):
            P.append(part(Pos(x, y, -3) * bd.Cylinder(9, 3, align=C), "feet", BLACK))
    return P


def cartridge(color=BLACK):
    """Ink cartridge: tapered body with a grip, label recess, print-head nozzle plate and gold contacts (sits on its base)."""
    P = []
    body = soft(bd.Box(45, 20, 60, align=C), 2.5)
    body -= Pos(0, -10, 22) * bd.Box(38, 2, 26, align=C)                   # label recess on the front face
    body -= Pos(0, 0, 60) * bd.Box(30, 22, 4, align=C)                     # grip step on top
    P.append(part(body, "body", color))
    P.append(part(Pos(0, -9.4, 23) * bd.Box(36, 0.6, 24, align=C), "label", PAPER))   # the 8.5 ml / price goes here
    P.append(part(Pos(-7, 0, -1.2) * bd.Box(22, 12, 1.2, align=C), "nozzle_plate", "#a07a3c"))
    for i in range(3):                                                    # contact pads on the back face
        for j in range(4):
            P.append(part(Pos(-5.4 + i * 3.6, 10.2, 6 + j * 3.6) * bd.Box(2.6, 0.5, 2.6, align=C), "contacts", "#c9a43a"))
    return P


def export(parts, name):
    OUT.mkdir(exist_ok=True)
    asm = bd.Compound(children=parts, label=name)
    f = OUT / f"{name}.glb"
    bd.export_gltf(asm, str(f), unit=bd.Unit.MM, binary=True, linear_deflection=0.2, angular_deflection=0.2)
    bb = asm.bounding_box()
    print(f"{f.name}: {len(parts)} parts, {bb.size.X:.0f} x {bb.size.Y:.0f} x {bb.size.Z:.0f} mm, {f.stat().st_size // 1024} KB")


if __name__ == "__main__":
    export(printer(), "printer")
    export(printer(tray_open=False, door_open=True), "printer_door_open")
    export(cartridge(), "cartridge")

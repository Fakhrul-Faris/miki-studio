# Style A test stills (BIBLE-A): white clay shophouse row, the Mr DIY shop is the only real-coloured subject.
#   blender -b -P scene.py -- A1|A2|A3 [preview]
import sys, os, math, bpy
sys.path.insert(0, "/Users/user/Private/miki-studio/miki-explained/tools/blender")
from lib3d import model
from camkit import engine
from isokit import hexc
argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else ["A1"]
SHOT = argv[0]; PREVIEW = "preview" in argv
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(os.path.dirname(HERE), "stills")
LOGOS = "/Users/user/Private/miki-studio/miki-explained/02_kit/brand/logos"
DUSK = SHOT == "A3"
for o in list(bpy.data.objects): bpy.data.objects.remove(o)
sc = bpy.context.scene
engine("eevee", samples=16 if PREVIEW else 96)
sc.render.resolution_x, sc.render.resolution_y = (540, 960) if PREVIEW else (1080, 1920)

# ---------- materials ----------
def M(name, hx, rough=0.65, emit=0.0, ecol=None, alpha=None):
    m = bpy.data.materials.new(name); m.use_nodes = True; b = m.node_tree.nodes["Principled BSDF"]
    c = hexc(hx); b.inputs["Base Color"].default_value = c; b.inputs["Roughness"].default_value = rough
    b.inputs["Specular IOR Level"].default_value = 0.2
    if emit: b.inputs["Emission Color"].default_value = hexc(ecol or hx); b.inputs["Emission Strength"].default_value = emit
    if alpha is not None: b.inputs["Alpha"].default_value = alpha; m.surface_render_method = "BLENDED"
    m.diffuse_color = c; return m
CLAY = M("clay", "#EDE9E3"); CLAY2 = M("clay_dim", "#DCD7CF"); ROAD = M("road", "#D3CFC8"); WIN = M("window", "#C9C4BC")
RED = M("diy_red", "#E3262B", 0.5); YEL = M("diy_yellow", "#FFE500", 0.5); CREAM = M("diy_wall", "#F3E6C4", 0.6)
GOLD = M("coin", "#E8B23A", 0.28); GOLD.node_tree.nodes["Principled BSDF"].inputs["Metallic"].default_value = 0.85
INSIDE = M("inside", "#F6EEDC", 0.6, emit=(0.6 if DUSK else 0.0), ecol="#FFD9A0")
LINE = M("route", "#FFE500", 0.5, emit=0.6)
GOODS = [M(f"g{i}", h, 0.55) for i, h in enumerate(["#2F6FD6", "#F2A31B", "#3BB273", "#E3262B", "#7B5CD6", "#F05A9A", "#FFFFFF"])]
GHOST = M("ghost", "#EDE9E3", 0.7, alpha=0.32)

def bevel(o, w=0.04):
    md = o.modifiers.new("b", "BEVEL"); md.width = w; md.segments = 3; md.limit_method = "ANGLE"
def box(name, x0, y0, z0, x1, y1, z1, m, bv=0.04):
    bpy.ops.mesh.primitive_cube_add(location=((x0+x1)/2, (y0+y1)/2, (z0+z1)/2)); o = bpy.context.object; o.name = name
    o.scale = ((x1-x0)/2, (y1-y0)/2, (z1-z0)/2); bpy.ops.object.transform_apply(scale=True)
    o.data.materials.append(m)
    if bv: bevel(o, bv)
    return o
def cyl(name, x, y, z, r, h, m, rot=None, verts=48):
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=h, location=(x, y, z + h/2)); o = bpy.context.object; o.name = name
    if rot: o.rotation_euler = rot
    o.data.materials.append(m); bevel(o, min(0.012, h/4)); return o
def image_plane(name, path, x, y, z, w, emit=0.0):
    img = bpy.data.images.load(path, check_existing=True); ar = img.size[1] / img.size[0]
    bpy.ops.mesh.primitive_plane_add(location=(x, y, z), rotation=(math.radians(90), 0, 0)); o = bpy.context.object; o.name = name
    o.scale = (w/2, w*ar/2, 1)
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; b = nt.nodes["Principled BSDF"]
    t = nt.nodes.new("ShaderNodeTexImage"); t.image = img
    nt.links.new(t.outputs["Color"], b.inputs["Base Color"]); nt.links.new(t.outputs["Alpha"], b.inputs["Alpha"])
    if emit: nt.links.new(t.outputs["Color"], b.inputs["Emission Color"]); b.inputs["Emission Strength"].default_value = emit
    b.inputs["Roughness"].default_value = 0.6; m.surface_render_method = "BLENDED"; o.data.materials.append(m); return o
def grey_logo(path):
    img = bpy.data.images.load(path, check_existing=True); px = list(img.pixels); out = []
    for i in range(0, len(px), 4):
        g = 0.299*px[i] + 0.587*px[i+1] + 0.114*px[i+2]; v = 0.55 + 0.3*g
        out += [v, v, v, px[i+3]]
    g = bpy.data.images.new("grey99", img.size[0], img.size[1], alpha=True); g.pixels = out
    p = os.path.join(HERE, "99_grey.png"); g.filepath_raw = p; g.file_format = "PNG"; g.save(); return p

# ---------- ground ----------
box("ground", -80, -60, -0.3, 80, 80, 0, CLAY, 0)
box("road", -80, -10, -0.02, 80, -1.6, 0.0, ROAD, 0)
box("kerb", -80, -1.6, 0, 80, 0, 0.18, CLAY, 0.03)
for i in range(-14, 15): box(f"lane{i}", i*5, -6.0, 0.0, i*5+2.5, -5.8, 0.012, CLAY, 0)

# ---------- shophouse row (unit width 6) ----------
W = 6.0; UNITS = range(-3, 4); DIY = 0; SPEED = 1
def shophouse(k):
    x0 = k*W - W/2; x1 = x0 + W; diy = k == DIY
    wall = CREAM if diy else CLAY
    box(f"u{k}_up", x0, 0, 4.2, x1, 11, 7.6, wall)                       # upper floor over the five-foot way
    box(f"u{k}_par", x0, 0, 7.6, x1, 0.5, 8.3 + (0.5 if k % 2 == 0 else 0), wall)
    box(f"u{k}_foot", x0, 0, 0.18, x1, 2.6, 0.32, CLAY2, 0.02)           # five-foot way floor
    for cx in (x0 + 0.35, x1 - 0.35): box(f"u{k}_col{cx:.1f}", cx-0.32, 0.05, 0.32, cx+0.32, 0.7, 4.2, YEL if diy else CLAY)
    for j in range(3):                                                    # upper windows (recessed)
        wx = x0 + 1.0 + j*1.6; box(f"u{k}_w{j}", wx, -0.05, 5.0, wx+1.15, 0.12, 6.9, WIN, 0.02)
    if diy:
        box("diy_floor", x0, 2.6, 0.18, x1, 11, 0.3, INSIDE, 0)
        box("diy_back", x0, 10.6, 0.3, x1, 11, 4.2, INSIDE, 0)
        box("diy_ceiling", x0, 2.6, 4.0, x1, 11, 4.2, INSIDE, 0)
        for side in (x0, x1 - 0.3): box(f"diy_side{side:.1f}", side, 2.6, 0.3, side+0.3, 11, 4.2, CREAM)
        for r in range(5):                                                # back wall shelving packed with goods
            box(f"bshelf{r}", x0+0.4, 10.0, 0.3+r*0.75, x1-0.4, 10.6, 0.38+r*0.75, CREAM, 0.01)
            for n in range(18):
                box(f"bg{r}{n}", x0+0.5+n*0.28, 10.05, 0.38+r*0.75, x0+0.72+n*0.28, 10.5, 0.38+r*0.75+0.45+0.12*((n*7+r)%3)/2, GOODS[(n*5+r*3) % 7], 0.01)
        for gx in (x0+1.6, x1-1.6):                                       # two gondola aisles
            box(f"gond{gx:.1f}", gx-0.45, 4.0, 0.3, gx+0.45, 9.0, 1.9, CREAM, 0.02)
            for lvl in range(3):
                for n in range(14):
                    for side in (-1, 1):
                        y = 4.15 + n*0.34; xx = gx + side*0.5
                        box(f"gg{gx:.1f}{lvl}{n}{side}", xx-0.1, y, 0.45+lvl*0.5, xx+0.1, y+0.26, 0.45+lvl*0.5+0.32, GOODS[(n+lvl*2+(side>0)*3) % 7], 0.008)
        for lt in range(3): box(f"tube{lt}", x0+1+lt*2, 4, 3.95, x0+1.2+lt*2, 9.5, 4.0, M(f"tube{lt}", "#FFFFFF", emit=6), 0)
        box("diy_sign", x0+0.05, -0.12, 3.15, x1-0.05, 0.1, 4.2, RED, 0.03)   # signboard on the arcade beam
        image_plane("diy_logo", f"{LOGOS}/mrdiy_logo.png", (x0+x1)/2, -0.14, 3.68, W*0.86, emit=(0.8 if DUSK else 0.15))
        box("diy_band", x0+0.05, -0.1, 3.0, x1-0.05, 0.08, 3.15, YEL, 0.01)
        for b in range(5): box(f"basket{b}", x0+0.9, 1.0, 0.32+b*0.12, x0+1.6, 1.6, 0.42+b*0.12, RED, 0.03)   # red baskets stack
        box("display", x1-2.0, 1.0, 0.32, x1-0.9, 2.0, 1.2, YEL, 0.03)
        for n in range(6): box(f"disp{n}", x1-1.95+(n%3)*0.35, 1.05+(n//3)*0.45, 1.2, x1-1.7+(n%3)*0.35, 1.4+(n//3)*0.45, 1.5, GOODS[n], 0.01)
    else:
        box(f"u{k}_front", x0, 2.6, 0.32, x1, 3.0, 4.2, CLAY)
        box(f"u{k}_door", x0+1.6, 2.5, 0.32, x1-1.6, 2.65, 3.2, WIN, 0.02)
        box(f"u{k}_sign", x0+0.05, -0.1, 3.15, x1-0.05, 0.1, 4.2, CLAY)
        if k == SPEED: image_plane("speed_logo", grey_logo(f"{LOGOS}/99speedmart_logo.png"), (x0+x1)/2, -0.12, 3.68, W*0.55)
for k in UNITS: shophouse(k)

# ---------- street life (library models, clay) ----------
def clayify(root, m=CLAY):
    for o in [root] + list(root.children_recursive):
        if o.type == "MESH": o.data.materials.clear(); o.data.materials.append(m)
clayify(model("tele_pole", height=9, at=(-10.5, -1.0, 0.18)))
clayify(model("street_light", height=6.5, at=(9, -1.0, 0.18), face=180))
clayify(model("car_b", length=4.2, at=(-12, -3.3, 0), face=90))
clayify(model("car_b", length=4.2, at=(15, -3.3, 0), face=90))
clayify(model("tree", height=7, at=(-21, -0.8, 0.18)))
for xa, xb in ((-24, -10.5), (-10.5, 24)):                                          # overhead wires
    bpy.ops.curve.primitive_bezier_curve_add(); w = bpy.context.object
    w.data.splines[0].bezier_points[0].co = (xa, -1.0, 8.6); w.data.splines[0].bezier_points[1].co = (xb, -1.0, 8.6)
    for p in w.data.splines[0].bezier_points: p.handle_left_type = p.handle_right_type = "AUTO"
    w.data.bevel_depth = 0.025; w.data.materials.append(CLAY2)

# ---------- the token: coins (11 sen vs 5 sen) ----------
GOLDGLOW = M("coin_glow", "#F2B53C", 0.3, emit=(0.12 if DUSK else 0.0), ecol="#FFB347")
def stack(name, x, y, n, m=GOLD):
    for i in range(n): cyl(f"{name}{i}", x, y, 0.18 + i*0.25, 0.8, 0.23, m)
stack("diy_coins", -1.7, -0.9, 11, GOLDGLOW); stack("sm_coins", W*SPEED, -0.9, 5)
if SHOT == "A1":
    cyl("rolling", -2.0, -4.5, 0.0, 0.8, 0.23, GOLD, rot=(math.radians(90), math.radians(18), math.radians(70)))
    bpy.data.objects["rolling"].location.z = 0.78
if SHOT == "A3":
    for name, x, txt in (("t_diy", -1.7, "11 SEN"), ("t_sm", W*SPEED, "5 SEN")):
        bpy.ops.object.text_add(location=(x, -1.9, 0.05)); t = bpy.context.object; t.data.body = txt; t.data.align_x = "CENTER"
        t.data.size = 0.62; t.data.extrude = 0.05; t.rotation_euler = (math.radians(90), 0, math.radians(-14)); t.data.materials.append(M("lbl"+name, "#FFE500" if name == "t_diy" else "#9A968F", emit=(1.5 if name == "t_diy" else 0.1)))
if SHOT == "A2":
    clayify(model("factory_b", length=18, at=(-50, -16, 0), face=90))
    clayify(model("store_dept", length=8, at=(-24, -16.5, 0), face=0), GHOST)           # the middleman, bypassed
    pts = [(-42, -9.0), (-36, -4.0), (-30, -4.0), (-12, -4.0), (-1.5, -4.0), (0.0, -1.0), (0.0, 1.5)]
    for i in range(len(pts)-1):
        (ax, ay), (bx, by) = pts[i], pts[i+1]; L = math.hypot(bx-ax, by-ay); n = int(L / 0.9)
        for j in range(n):
            u = j / n; box(f"dash{i}_{j}", ax+(bx-ax)*u-0.25, ay+(by-ay)*u-0.07, 0.0, ax+(bx-ax)*u+0.25, ay+(by-ay)*u+0.07, 0.03, LINE, 0)
    for c, cx in enumerate((-34, -27, -20, -13, -6)):
        box(f"carton{c}", cx-0.6, -4.6, 0.03, cx+0.6, -3.4, 1.0, M(f"cardboard{c}", "#E7D2A8"), 0.03)
        box(f"label{c}", cx-0.35, -4.62, 0.4, cx+0.35, -4.58, 0.75, RED, 0)

# ---------- light ----------
w = bpy.data.worlds.new("w"); sc.world = w; w.use_nodes = True; bg = w.node_tree.nodes["Background"]
bg.inputs[0].default_value = hexc("#2B3A5C" if DUSK else "#DCE6F2"); bg.inputs[1].default_value = 0.3 if DUSK else 0.42
bpy.ops.object.light_add(type="SUN", rotation=(math.radians(66), 0, math.radians(-78))); sun = bpy.context.object
sun.data.energy = 0.5 if DUSK else 4.6; sun.data.color = (1.0, 0.62, 0.38) if DUSK else (1.0, 0.9, 0.78); sun.data.angle = math.radians(3)
if DUSK:
    bpy.ops.object.light_add(type="AREA", location=(0, 2.0, 3.6), rotation=(math.radians(90), 0, 0)); a = bpy.context.object
    a.data.shape = "RECTANGLE"; a.data.size, a.data.size_y = 5.6, 3.4; a.data.energy = 900; a.data.color = (1.0, 0.8, 0.55)
    bpy.ops.object.light_add(type="POINT", location=(-1.7, -3.2, 2.2)); p = bpy.context.object; p.data.energy = 260; p.data.color = (1.0, 0.75, 0.45); p.data.shadow_soft_size = 0.6

# ---------- camera ----------
bpy.ops.object.camera_add(); cam = bpy.context.object; sc.camera = cam
if SHOT == "A2": cam.location = (17, -19, 31); target = (-20, -5, 1); cam.data.lens = 21
else: cam.location = (-5.5, -17, 6.2); target = (2.6, 3.5, 2.6); cam.data.lens = 32
d = (lambda a, b: (b[0]-a[0], b[1]-a[1], b[2]-a[2]))(cam.location, target)
cam.rotation_euler = (math.atan2(math.hypot(d[0], d[1]), -d[2]), 0, math.atan2(d[1], d[0]) - math.pi/2)
if SHOT == "A2":
    pass
cam.data.dof.use_dof = True; cam.data.dof.focus_distance = math.dist(cam.location, target); cam.data.dof.aperture_fstop = 5.6 if SHOT != "A2" else 11

os.makedirs(OUT, exist_ok=True)
sc.render.filepath = os.path.join(OUT, f"{SHOT}{'_preview' if PREVIEW else ''}.png"); bpy.ops.render.render(write_still=True)
if not PREVIEW and SHOT == "A1": bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, "check_A.blend"))

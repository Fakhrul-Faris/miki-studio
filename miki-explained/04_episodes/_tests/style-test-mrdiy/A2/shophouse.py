# Blender builds only: a detailed Straits-style shophouse unit, 3 façade variants, exported GLB for raea.
# Blender: x along the street, -y toward the street, z up. Upper façade front at y = -FW (over the five-foot way),
# shopfront wall at y = 0. glTF export (y-up) maps -y → +z, so in raea the street side is +z.
import bpy, bmesh, math, os
from mathutils import Vector
W, FW, H1, H2 = 4.6, 2.2, 3.6, 7.2        # width, five-foot way depth, ground floor top, upper floor top
OUT = os.path.join(os.getcwd(), "media/parts")
MAT = {}
def mat(n, c):
    if n not in MAT:
        m = bpy.data.materials.new(n); m.use_nodes = True; m.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = c; MAT[n] = m
    return MAT[n]
def clear():
    for o in list(bpy.data.objects): bpy.data.objects.remove(o)
    for m in list(bpy.data.materials): bpy.data.materials.remove(m)
    for me in list(bpy.data.meshes): bpy.data.meshes.remove(me)
def finish(o, m, bev):
    o.data.materials.append(mat(*m))
    if bev:
        b = o.modifiers.new("b", "BEVEL"); b.width = bev; b.segments = 2; b.limit_method = "ANGLE"
    return o
def box(n, x0, y0, z0, x1, y1, z1, m, bev=0.012):
    bpy.ops.mesh.primitive_cube_add(location=((x0+x1)/2, (y0+y1)/2, (z0+z1)/2)); o = bpy.context.object; o.name = n
    o.scale = ((x1-x0)/2, (y1-y0)/2, (z1-z0)/2); bpy.ops.object.transform_apply(scale=True); return finish(o, m, bev)
def cyl(n, x, y, z, r, h, m, axis="Z", verts=24, bev=0.0):
    rot = {"Z": (0, 0, 0), "X": (0, math.pi/2, 0), "Y": (math.pi/2, 0, 0)}[axis]
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=h, location=(x, y, z), rotation=rot); o = bpy.context.object; o.name = n
    return finish(o, m, bev)
def cut(o, cutter):
    md = o.modifiers.new("cut", "BOOLEAN"); md.object = cutter; md.operation = "DIFFERENCE"
    bpy.context.view_layer.objects.active = o; bpy.ops.object.modifier_apply(modifier="cut"); bpy.data.objects.remove(cutter)

WALL, TRIM, SHUT, TILE, DARK, FLOOR = ("wall", (0.9, 0.9, 0.88, 1)), ("trim", (0.95, 0.95, 0.93, 1)), ("shutter", (0.6, 0.62, 0.6, 1)), ("tile", (0.8, 0.8, 0.78, 1)), ("dark", (0.05, 0.05, 0.06, 1)), ("floor", (0.8, 0.78, 0.74, 1))

def column(x, y):
    box("col_base", x-0.27, y-0.27, 0.15, x+0.27, y+0.27, 0.5, TRIM)
    box("col_plinth", x-0.23, y-0.23, 0.5, x+0.23, y+0.23, 0.62, TRIM)
    box("col_shaft", x-0.19, y-0.19, 0.62, x+0.19, y+0.19, 2.85, WALL, 0.02)
    for k, (z, r) in enumerate([(2.85, 0.22), (2.95, 0.25), (3.05, 0.29)]): box(f"col_cap{k}", x-r, y-r, z, x+r, y+r, z+0.1, TRIM)
    for z in (1.2, 2.2): box("col_ring", x-0.205, y-0.205, z, x+0.205, y+0.205, z+0.05, TRIM)

def window(cx, z0, w, h, arched, louvre=True):
    y = -FW
    box("win_recess", cx-w/2, y+0.02, z0, cx+w/2, y+0.12, z0+h, DARK, 0)
    for side in (-1, 1): box("win_jamb", cx+side*(w/2+0.04)-0.06, y-0.06, z0, cx+side*(w/2+0.04)+0.06, y+0.04, z0+h, TRIM)
    box("win_sill", cx-w/2-0.16, y-0.14, z0-0.1, cx+w/2+0.16, y+0.04, z0, TRIM)
    box("win_sill2", cx-w/2-0.1, y-0.08, z0-0.18, cx+w/2+0.1, y+0.04, z0-0.1, TRIM)
    if arched:
        a = cyl("win_arch", cx, y-0.01, z0+h, w/2+0.12, 0.14, TRIM, "Y", 32); inner = cyl("c", cx, y-0.01, z0+h, w/2-0.02, 0.4, TRIM, "Y", 32); cut(a, inner)
        lo = box("c2", cx-w, y-0.3, z0+h-w, cx+w, y+0.3, z0+h, TRIM, 0); cut(a, lo)
        f = cyl("fanlight", cx, y+0.06, z0+h, w/2-0.02, 0.06, DARK, "Y", 32); lo = box("c3", cx-w, y-0.3, z0+h-w, cx+w, y+0.3, z0+h, DARK, 0); cut(f, lo)
        box("keystone", cx-0.09, y-0.1, z0+h+w/2-0.05, cx+0.09, y+0.02, z0+h+w/2+0.22, TRIM)
    else:
        box("win_hood", cx-w/2-0.2, y-0.16, z0+h, cx+w/2+0.2, y+0.04, z0+h+0.12, TRIM)
        box("win_hood2", cx-w/2-0.12, y-0.1, z0+h+0.12, cx+w/2+0.12, y+0.04, z0+h+0.2, TRIM)
    if louvre:
        n = int(h / 0.13)
        for side in (-1, 1):
            lx = cx + side * w/4
            box("leaf_frame_l", lx-w/4+0.01, y-0.02, z0+0.02, lx-w/4+0.05, y+0.04, z0+h-0.02, SHUT, 0)
            box("leaf_frame_r", lx+w/4-0.05, y-0.02, z0+0.02, lx+w/4-0.01, y+0.04, z0+h-0.02, SHUT, 0)
            box("leaf_rail", lx-w/4+0.01, y-0.02, z0+h*0.48, lx+w/4-0.01, y+0.04, z0+h*0.52, SHUT, 0)
            for k in range(n):
                bpy.ops.mesh.primitive_cube_add(location=(lx, y+0.0, z0+0.1+k*(h-0.2)/n)); o = bpy.context.object
                o.scale = (w/4-0.05, 0.035, 0.012); o.rotation_euler = (math.radians(-35), 0, 0); bpy.ops.object.transform_apply(scale=True); finish(o, SHUT, 0)

def build(var, open_shop=False):
    clear(); MAT.clear()
    x0, x1 = -W/2, W/2
    # ground floor: shopfront wall with an opening (jambs + lintel), floor of the five-foot way, deep body behind
    box("shopfront_l", x0, 0, 0.15, x0+0.45, 0.35, H1, WALL)
    box("shopfront_r", x1-0.45, 0, 0.15, x1, 0.35, H1, WALL)
    box("lintel", x0, 0, 2.95, x1, 0.35, H1, WALL)
    box("lintel_band", x0+0.4, -0.05, 2.9, x1-0.4, 0.0, 3.0, TRIM, 0.005)
    if open_shop:   # a hollow shop: side walls, back wall at 4.3, ceiling; the rest of the body behind it
        box("in_l", x0, 0.35, 0, x0 + 0.2, 4.3, H1, WALL, 0); box("in_r", x1 - 0.2, 0.35, 0, x1, 4.3, H1, WALL, 0)
        box("in_back", x0, 4.3, 0, x1, 4.5, H1, WALL, 0); box("body_ground", x0, 4.5, 0, x1, 13, H1, WALL, 0)
        box("in_floor", x0, 0.35, 0, x1, 4.3, 0.15, FLOOR, 0)
        box("lintel2", x0, 0.35, 2.95, x1, 0.55, H1, WALL, 0)
    else:
        box("body_ground", x0, 0.35, 0, x1, 13, H1, WALL, 0)
    box("fivefoot", x0, -FW, 0, x1, 0.35, 0.15, FLOOR, 0.004)
    box("kerb", x0, -FW-0.3, 0, x1, -FW, 0.15, TRIM, 0.01)
    box("arcade_ceiling", x0, -FW, H1-0.05, x1, 0.35, H1, WALL, 0)
    # arcade: column at the left edge, segmental arch with keystone between columns
    column(x0, -FW+0.25)
    a = box("arch", x0, -FW, H1-0.75, x1, -FW+0.42, H1, WALL, 0)
    c = cyl("c", 0, -FW+0.2, H1-2.85, 2.5, 1.0, WALL, "Y", 48); cut(a, c)
    box("keystone_g", -0.13, -FW-0.06, H1-0.48, 0.13, -FW+0.05, H1, TRIM)
    # upper floor: façade slab, string course, pilasters, windows, cornice, parapet, gable
    box("body_upper", x0, -FW+0.1, H1, x1, 13, H2, WALL, 0)
    box("facade", x0, -FW, H1, x1, -FW+0.12, H2, WALL, 0)
    box("string1", x0, -FW-0.16, H1, x1, -FW+0.05, H1+0.16, TRIM)
    box("string2", x0, -FW-0.1, H1+0.16, x1, -FW+0.05, H1+0.26, TRIM)
    nwin = 2 if var == "B" else 3
    pil = [x0 + 0.15 + i * (W - 0.3) / nwin for i in range(nwin + 1)]
    for px in pil:
        box("pilaster", px-0.13, -FW-0.08, H1+0.26, px+0.13, -FW+0.05, H2-0.1, WALL, 0.01)
        box("pil_cap", px-0.17, -FW-0.13, H2-0.32, px+0.17, -FW+0.05, H2-0.1, TRIM)
        box("pil_base", px-0.17, -FW-0.12, H1+0.26, px+0.17, -FW+0.05, H1+0.5, TRIM)
    for i in range(nwin):
        cx = (pil[i] + pil[i+1]) / 2; w = (W - 0.3) / nwin - 0.55
        window(cx, H1 + 0.75, w, 1.85 if var != "C" else 1.65, arched=(var == "A"), louvre=True)
    for k, (dz, pr) in enumerate([(0.0, 0.12), (0.1, 0.22), (0.2, 0.32), (0.3, 0.2)]):
        box(f"cornice{k}", x0, -FW-pr, H2+dz, x1, -FW+0.1, H2+dz+0.1, TRIM, 0.006)
    py0 = H2 + 0.4
    box("parapet_base", x0, -FW-0.04, py0, x1, -FW+0.25, py0+0.12, TRIM)
    box("parapet_top", x0, -FW-0.08, py0+0.78, x1, -FW+0.25, py0+0.92, TRIM)
    for px in (x0+0.12, 0, x1-0.12): box("parapet_post", px-0.14, -FW-0.05, py0+0.12, px+0.14, -FW+0.25, py0+0.78, WALL)
    if var == "A":            # turned balusters
        for side in (-1, 1):
            for k in range(6):
                bx = side * (0.3 + k * 0.3)
                cyl("bal", bx, -FW+0.08, py0+0.45, 0.06, 0.66, TRIM, verts=12); cyl("bal_b", bx, -FW+0.08, py0+0.3, 0.09, 0.14, TRIM, verts=12)
    elif var == "B":          # pierced ventilation panel: grid of square holes
        p = box("vent", x0+0.26, -FW+0.02, py0+0.12, x1-0.26, -FW+0.22, py0+0.78, WALL, 0)
        for i in range(12):
            for j in range(2):
                hx = x0 + 0.45 + i * (W - 0.9) / 11; hz = py0 + 0.3 + j * 0.28
                cut(p, box("h", hx-0.07, -FW-0.1, hz-0.08, hx+0.07, -FW+0.4, hz+0.08, WALL, 0))
    else:                     # solid panel with a raised plaque
        box("panel", x0+0.26, -FW+0.02, py0+0.12, x1-0.26, -FW+0.22, py0+0.78, WALL, 0)
        box("plaque", -0.9, -FW-0.04, py0+0.24, 0.9, -FW+0.03, py0+0.66, TRIM)
    # gable over the parapet
    gz = py0 + 0.92
    if var == "A":
        g = cyl("gable", 0, -FW+0.1, gz, 1.0, 0.24, WALL, "Y", 40); cut(g, box("c", -2, -3, gz-2, 2, 1, gz, WALL, 0))
        t = bpy.ops.mesh.primitive_torus_add(major_radius=0.32, minor_radius=0.05, location=(0, -FW-0.04, gz+0.42), rotation=(math.pi/2, 0, 0)); finish(bpy.context.object, TRIM, 0)
    elif var == "B":
        box("gable1", -1.2, -FW-0.02, gz, 1.2, -FW+0.22, gz+0.4, WALL); box("gable2", -0.7, -FW-0.02, gz+0.4, 0.7, -FW+0.22, gz+0.8, WALL)
        box("gable_cap", -0.8, -FW-0.08, gz+0.8, 0.8, -FW+0.25, gz+0.9, TRIM)
    else:
        bm = bmesh.new(); vs = [bm.verts.new(v) for v in [(-1.3, -FW, gz), (1.3, -FW, gz), (0, -FW, gz+0.9), (-1.3, -FW+0.22, gz), (1.3, -FW+0.22, gz), (0, -FW+0.22, gz+0.9)]]
        bm.faces.new([vs[0], vs[1], vs[2]]); bm.faces.new([vs[5], vs[4], vs[3]]); bm.faces.new([vs[0], vs[3], vs[4], vs[1]]); bm.faces.new([vs[1], vs[4], vs[5], vs[2]]); bm.faces.new([vs[2], vs[5], vs[3], vs[0]])
        me = bpy.data.meshes.new("pediment"); bm.to_mesh(me); o = bpy.data.objects.new("pediment", me); bpy.context.collection.objects.link(o); finish(o, WALL, 0)
        bpy.ops.mesh.primitive_torus_add(major_radius=0.22, minor_radius=0.04, location=(0, -FW-0.03, gz+0.35), rotation=(math.pi/2, 0, 0)); finish(bpy.context.object, TRIM, 0)
    # roof: two slopes of barrel tiles, each built flat at the origin then turned and placed
    for side in ("f", "b"):
        ya = -FW + 0.2 if side == "f" else 13.0
        run = abs(5.4 - ya); L = math.hypot(run, 1.6); ang = math.atan2(1.6, run)
        parts = [box(f"roofbase_{side}", x0, 0, -0.06, x1, L, 0.0, TILE, 0)]
        for i in range(int(W / 0.24)):
            parts.append(cyl(f"tile_{side}{i}", x0 + 0.12 + i * 0.24, L / 2, 0.0, 0.105, L, TILE, "Y", 10))
        for k in range(int(L / 0.42)):
            parts.append(box(f"course_{side}{k}", x0, 0.2 + k * 0.42, 0.0, x1, 0.24 + k * 0.42, 0.14, TILE, 0))
        for o in parts:
            for md in list(o.modifiers):
                bpy.context.view_layer.objects.active = o; bpy.ops.object.modifier_apply(modifier=md.name)
        bpy.ops.object.select_all(action="DESELECT")
        for o in parts: o.select_set(True)
        bpy.context.view_layer.objects.active = parts[0]; bpy.ops.object.join(); r = bpy.context.object
        r.rotation_euler = (ang, 0, 0 if side == "f" else math.pi); r.location = (0, ya, H2 + 0.15)
    cyl("ridge", 0, 5.4, H2 + 1.85, 0.14, W, TILE, "X", 12)
    box("party_l", x0 - 0.06, -FW + 0.2, H2, x0 + 0.06, 13, H2 + 1.9, ("party", (0.2, 0.2, 0.22, 1)), 0)
    # UVs and export
    for o in bpy.data.objects:
        if o.type == "MESH":
            bpy.context.view_layer.objects.active = o; o.select_set(True)
            for md in list(o.modifiers):
                try: bpy.ops.object.modifier_apply(modifier=md.name)
                except Exception: pass
    bpy.ops.object.select_all(action="SELECT"); bpy.context.view_layer.objects.active = [o for o in bpy.data.objects if o.type == "MESH"][0]
    bpy.ops.object.mode_set(mode="EDIT"); bpy.ops.mesh.select_all(action="SELECT"); bpy.ops.uv.cube_project(cube_size=1.0); bpy.ops.object.mode_set(mode="OBJECT")
    bpy.ops.object.join()
    bpy.ops.export_scene.gltf(filepath=f"{OUT}/shophouse_{var}{'_open' if open_shop else ''}.glb", export_format="GLB", export_yup=True)
    print("SHOPHOUSE", var, len(bpy.context.object.data.polygons))
for v in "ABC": build(v)
build("A", open_shop=True)

import sys, bpy, math
sys.path.insert(0, "/Users/user/Private/miki-studio/miki-explained/tools/blender")
from lib3d import model
for o in list(bpy.data.objects): bpy.data.objects.remove(o)
names = ["shop", "shop_g", "store_bldg", "retail_stores", "store_dept", "factory_a", "factory_b", "shelf_tall"]
for i, n in enumerate(names):
    r = model(n, length=8, at=((i % 4) * 12, (i // 4) * -14, 0), face=0)
    print(n, [round(v, 2) for v in r["dims"]])
sc = bpy.context.scene; sc.render.engine = "BLENDER_EEVEE"; sc.render.resolution_x, sc.render.resolution_y = 1600, 900
bpy.ops.object.light_add(type="SUN", rotation=(math.radians(45), 0, math.radians(30))); bpy.context.object.data.energy = 3
w = bpy.data.worlds.new("w"); sc.world = w; w.use_nodes = True; w.node_tree.nodes["Background"].inputs[0].default_value = (0.6, 0.6, 0.65, 1)
bpy.ops.object.camera_add(location=(18, -45, 30), rotation=(math.radians(60), 0, 0)); c = bpy.context.object; sc.camera = c
c.data.type = "ORTHO"; c.data.ortho_scale = 52
sc.render.filepath = "/Users/user/Private/miki-studio/miki-explained/04_episodes/_tests/style-test-mrdiy/A/build/peek.png"; bpy.ops.render.render(write_still=True)

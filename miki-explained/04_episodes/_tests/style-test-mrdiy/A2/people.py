# Blender builds only: standing MPFB people from 02_kit/people, poses applied, one charcoal clay material, exported GLB for raea.
import bpy, sys, os
sys.path.insert(0, "/Users/user/Private/miki-studio/miki-explained/tools/blender")
import crowd
OUT = os.path.join(os.getcwd(), "media/people"); os.makedirs(OUT, exist_ok=True)
for name in ["s_m30", "s_f25", "s_m50", "s_f35"]:
    for o in list(bpy.data.objects): bpy.data.objects.remove(o)
    col, rig, hip = crowd.load_person(name, link=True)
    m = bpy.data.materials.new("clay"); m.use_nodes = True
    m.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (0.08, 0.085, 0.1, 1)
    m.node_tree.nodes["Principled BSDF"].inputs["Roughness"].default_value = 0.7
    for o in list(col.objects):
        if o.type == "MESH":
            bpy.context.view_layer.objects.active = o
            if o.data.shape_keys:
                bpy.ops.object.select_all(action="DESELECT"); o.select_set(True)
                bpy.ops.object.shape_key_remove(all=True, apply_mix=True)
            for md in list(o.modifiers):
                try: bpy.ops.object.modifier_apply(modifier=md.name)        # bake the held pose into the mesh
                except Exception as e: print("mod", e)
            o.parent = None; o.data.materials.clear(); o.data.materials.append(m)
    for o in list(bpy.data.objects):
        if o.type != "MESH": bpy.data.objects.remove(o)
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.export_scene.gltf(filepath=f"{OUT}/{name}.glb", export_format="GLB", export_animations=False, export_skins=False, use_selection=True)
    print("PERSON", name)

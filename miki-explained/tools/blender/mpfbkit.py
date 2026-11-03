# mpfbkit — real-proportion people for look v4 (user, 2026-11-04: "go with B, MPFB"; test EX00V10_people).
# Uses the MPFB people already built into 02_kit/people/ by crowd.py (free MakeHuman bodies, CC0 clothes/hair).
#   from mpfbkit import Person
#   p = Person("s_m50", skin=MAT, suit=MAT); p.place(f, (x, y), facing_deg)   # facing 0 = toward -y
#   p.walk(f, phase, amp)  |  p.act(f, "mop", phase)  |  p.act(f, "pump")  |  p.act(f, "carry")
# Faceless: matte skin, no eye meshes (the kit has none); the face is a plain sculpt.
import math, bpy
from mathutils import Vector
import crowd

LEGS = ("upperleg01.L", "upperleg01.R", "lowerleg01.L", "lowerleg01.R")
ARMS = ("upperarm01.L", "upperarm01.R", "lowerarm01.L", "lowerarm01.R")
# arm targets in rig space (x = the figure's left, -y = forward, z = up): (upper arm, forearm) per side
DOWN = {"L": ((0.08, 0.02, -1), (0.06, -0.12, -1)), "R": ((-0.08, 0.02, -1), (-0.06, -0.12, -1))}
ACTS = {
    "mop":   {"L": ((0.1, -0.75, -0.65), (-0.35, -0.85, -0.2)), "R": ((-0.12, -0.6, -0.8), (0.25, -0.9, -0.15))},   # both hands on the handle, out front
    "pump":  {"L": ((0.08, 0.02, -1), (0.06, -0.12, -1)), "R": ((-0.15, -0.75, -0.65), (-0.05, -0.95, -0.25))},
    "carry": {"L": ((0.12, -0.3, -0.95), (-0.35, -0.9, 0.1)), "R": ((-0.12, -0.3, -0.95), (0.35, -0.9, 0.1))},
}


class Person:
    def __init__(self, kit_name, skin, suit, shoe=None, hair=None, name=None):
        self.col, self.rig, self.hip = crowd.load_person(kit_name, link=True)
        if name: self.col.name = name
        for o in self.col.objects:
            if o.type != "MESH": continue
            low = o.name.lower()
            m = skin if low.startswith("body") else suit if "suit" in low else (shoe or suit) if "shoe" in low else (hair or suit)
            o.data.materials.clear(); o.data.materials.append(m)          # names: "body …", "Human.<suit|shoes|hair>"
        for bn in LEGS + ("spine03", "spine02", "neck01"):
            self.rig.pose.bones[bn].rotation_mode = "XYZ"
        self.base = {bn: self.rig.pose.bones[bn].rotation_euler.copy() for bn in LEGS + ("spine03", "spine02", "neck01")}
        self.arms("DOWN")

    def objects(self):
        return list(self.col.objects)

    def place(self, f, xy, facing_deg, z=0.0):
        r = self.rig; r.location = (xy[0], xy[1], z); r.rotation_euler = (0, 0, math.radians(facing_deg))
        r.keyframe_insert("location", frame=f); r.keyframe_insert("rotation_euler", frame=f)

    def arms(self, which, f=None, wobble=0.0):
        """aim both arms at a preset (DOWN or an ACTS key); wobble swings the forearm targets (mopping strokes)."""
        T = DOWN if which == "DOWN" else ACTS[which]
        for side in ("L", "R"):
            up, low = T[side]
            if wobble:
                up = (up[0], up[1] - 0.18 * wobble, up[2]); low = (low[0], low[1] - 0.3 * wobble, low[2] + 0.15 * wobble)
            crowd.aim(self.rig, "upperarm01." + side, up); crowd.aim(self.rig, "lowerarm01." + side, low)
            if f is not None:
                for bn in ("upperarm01." + side, "lowerarm01." + side):
                    self.rig.pose.bones[bn].keyframe_insert("rotation_quaternion", frame=f)

    def walk(self, f, phase, amp=1.0, arms=True):
        """legs swing from the hip, knees bend on the back swing; arms counter-swing (unless an action holds them)."""
        P = self.rig.pose.bones
        for side, sgn in (("L", 1), ("R", -1)):
            a_up = math.radians(26) * amp * math.sin(phase) * sgn
            a_low = math.radians(38) * amp * max(0.0, math.sin(phase + (0 if sgn > 0 else math.pi) - 1.2))
            b = self.base["upperleg01." + side]; P["upperleg01." + side].rotation_euler = (b.x - a_up, b.y, b.z)
            b = self.base["lowerleg01." + side]; P["lowerleg01." + side].rotation_euler = (b.x + a_low, b.y, b.z)
            for bn in ("upperleg01." + side, "lowerleg01." + side): P[bn].keyframe_insert("rotation_euler", frame=f)
        if arms:
            s = math.sin(phase) * amp
            for side, sgn in (("L", -1), ("R", 1)):
                up = (DOWN[side][0][0], DOWN[side][0][1] - 0.35 * s * sgn, -1); low = (DOWN[side][1][0], DOWN[side][1][1] - 0.45 * s * sgn - 0.1, -1)
                crowd.aim(self.rig, "upperarm01." + side, up); crowd.aim(self.rig, "lowerarm01." + side, low)
                for bn in ("upperarm01." + side, "lowerarm01." + side): P[bn].keyframe_insert("rotation_quaternion", frame=f)

    def stand(self, f):
        P = self.rig.pose.bones
        for bn in LEGS:
            P[bn].rotation_euler = self.base[bn]; P[bn].keyframe_insert("rotation_euler", frame=f)

    def act(self, f, which, phase=0.0):
        """hold an action pose; mopping strokes back and forth with the phase, with a slight forward lean."""
        P = self.rig.pose.bones
        lean = math.radians(14 if which == "mop" else 8 if which == "pump" else 4)
        b = self.base["spine03"]; P["spine03"].rotation_euler = (b.x + lean, b.y, b.z); P["spine03"].keyframe_insert("rotation_euler", frame=f)
        self.arms(which, f, wobble=math.sin(phase) if which == "mop" else 0.0)

    def hand(self, side="R"):
        """world position of a hand (to hang a mop, a nozzle or branches on)."""
        bpy.context.view_layer.update(); return self.rig.matrix_world @ self.rig.pose.bones["wrist." + side].tail

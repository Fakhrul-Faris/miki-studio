// clay — the clay maquette world built natively in raea (user, 2026-11-07: "i also thought we're using clay maquette").
// ClayStage = the approved V4 look (EX00V15: AgX + contrast, soft spot key + panels, AO, ground falloff, dark gradient
// backdrop) with the V4 light set placed per set like isokit's lightset(); materials; relief maps from kit/geo.
// Real things on stage, interface only on real screens (<Screen>), real logos as files (02_kit/brand/logos).
import { AmbientOcclusion, Bloom, Canvas3D, Grade, ToneMapping, manifold, type Solid } from "raea/3d";
import { Cuboid, Cylinder, Mesh3d } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { AmbientLight, RectLight, Shadows, SpotLight } from "raea/light";
import { Quat, Transform } from "raea/transform";
import { Camera3d } from "raea/camera";
import { LinearRgba, Srgba } from "raea/color";
import { LOOK } from "./BlendShot";

export type V3 = [number, number, number];
export const CLAY = "#959AA1", PALE = "#BFC2C7", INKC = "#2A2D33", GLASS = "#0E1014", GREEN = "#57D100", RED = "#E5484D", BLUE = "#59A8FF";
export const glow = (hex: string, k: number) => LinearRgba.from(Srgba.hex(hex)).mul(k);
export const lerp3 = (a: V3, b: V3, t: number): V3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

/** a clay material: matte, a little sheen like the EEVEE clay (roughness 0.66) */
export function Clay({ color = CLAY, rough = 0.66, emissive }: { color?: string; rough?: number; emissive?: any }) {
  return <StandardMaterial base_color={color} perceptual_roughness={rough} emissive={emissive} />;
}

/** the V4 studio light set for one set (isokit lightset: key / rim / fill at a 17 m set, scaled by s), Y-up */
function lightsFor(c: V3, s: number) {
  const q = s / 17, k = q * q;
  const at = (o: V3): V3 => [c[0] + o[0] * q, c[1] + o[1] * q, c[2] + o[2] * q];
  return {
    key: { p: at([-8, 13, 7]), watts: 9000 * k, size: 10 * q, color: "#EDF4FF" },
    fills: [{ p: at([10, 6, -10]), watts: 2000 * k, size: 6 * q, color: "#CCE0FF" }, { p: at([9, 4, 9]), watts: 1600 * k, size: 12 * q, color: "#D9E6FF" }],
  };
}

/** the stage: camera, look, lights aimed at the set centre `c` (set size `s` m), ground, backdrop; children = the set */
export function ClayStage({ cam, c, s = 6, children }: { cam: { p: V3; t: V3; fov?: number }; c: V3; s?: number; children?: any }) {
  const L = lightsFor(c, s);
  return (
    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, ${LOOK.skyTop} 0%, ${LOOK.skyHorizon} 55%, ${LOOK.skyHorizon} 100%)` }}>
      <Canvas3D layered>
        <Camera3d transform={Transform.fromXyz(...cam.p).lookingAt(cam.t)} projection={{ Perspective: { fov: cam.fov ?? 0.75 } }} />
        <Shadows distance={Math.max(30, s * 6)} firstCascade={Math.max(4, s)} mapSize={4096} bias={0.2} />
        <ToneMapping mode="agx" exposure={LOOK.exposure} />
        <Grade midtones={{ contrast: LOOK.contrast }} />
        <AmbientOcclusion quality="high" />
        <Bloom intensity={0.45} threshold={0.85} />
        <AmbientLight brightness={LOOK.ambient} />
        <SpotLight transform={Transform.fromXyz(...L.key.p).lookingAt(c)} intensity={L.key.watts * LOOK.keyGain} color={L.key.color}
          range={400} outer_angle={1.1} inner_angle={0.2} radius={L.key.size / 2} soft_shadows_enabled shadow_maps_enabled />
        <RectLight transform={Transform.fromXyz(...L.key.p).lookingAt(c)} intensity={L.key.watts * LOOK.keyPanelGain} width={L.key.size} height={L.key.size} color={L.key.color} range={400} />
        {L.fills.map((l, i) => <RectLight key={i} transform={Transform.fromXyz(...l.p).lookingAt(c)} intensity={l.watts * LOOK.fillGain} width={l.size} height={l.size} color={l.color} range={400} />)}
        <Mesh3d transform={Transform.fromXyz(c[0], -0.05, c[2])}>
          <Cuboid half_size={[200, 0.05, 200]} />
          <StandardMaterial base_color={LOOK.ground} perceptual_roughness={LOOK.groundRough} />
        </Mesh3d>
        {children}
      </Canvas3D>
    </div>
  );
}

/** a camera that keeps moving through the shot (never eases to a stop): linear from a to b over [f0, f1] */
export function drift(f: number, f0: number, f1: number, a: { p: V3; t: V3 }, b: { p: V3; t: V3 }, fov = 0.75) {
  const t = Math.max(0, Math.min(1, (f - f0) / Math.max(1, f1 - f0)));
  return { p: lerp3(a.p, b.p, t), t: lerp3(a.t, b.t, t), fov };
}

// ---------- relief maps (kit/geo) ----------
const cache: Record<string, Solid> = {};
export const PPM = 200;          // geo px per metre: a 900 px country is a 4.5 m slab (fits a vertical frame)
/** a country as a clay slab: its outline extruded `h` m, PPM geo px = 1 m, centred, lying flat (Y up) */
export function reliefSolid(geo: any, h = 0.18): Solid {
  const key = geo.name + h;
  if (cache[key]) return cache[key];
  const polys = geo.rings.map((r: number[][]) => {
    const pts = r.map(([x, y]) => [(x - geo.w / 2) / PPM, -(y - geo.h / 2) / PPM] as [number, number]);
    let a = 0; for (let i = 0; i < pts.length; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % pts.length]; a += x1 * y2 - x2 * y1; }
    return a < 0 ? pts.reverse() : pts;                        // counter-clockwise = solid
  });
  return (cache[key] = manifold.extrude(polys, h).rotate(-90, 0, 0));
}
/** a geo point (px) → world, on top of a relief map centred at c */
export const geoAt = (geo: any, x: number, y: number, c: V3, h = 0.18): V3 => [c[0] + (x - geo.w / 2) / PPM, c[1] + h, c[2] + (y - geo.h / 2) / PPM];

/** a store pin: rises out of the map at `at`, green or red */
export function Pin({ p, t, red, name }: { p: V3; t: number; red?: boolean; name: string }) {
  if (t <= 0) return null;
  const h = 0.14 * t;
  return <Mesh3d name={name} transform={Transform.fromXyz(p[0], p[1] + h / 2, p[2])}>
    <Cylinder radius={0.028} half_height={h / 2} />
    <Clay color={red ? RED : GREEN} rough={0.5} emissive={glow(red ? RED : GREEN, 0.6)} />
  </Mesh3d>;
}

export const rot = (x: number, y: number, z: number) => Quat.fromEuler("XYZ", x, y, z);

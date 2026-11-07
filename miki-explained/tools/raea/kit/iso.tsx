// iso — smooth isometric v2 in raea (user 2026-11-07: "stick to what performed … smooth isometric … go way and beyond").
// EX14's language (near-black ground, flat bevelled greys, one green accent, Isotype pictograms, one orthographic camera
// that never stops) plus: AO + a soft key for depth, the green as a soft glow, denser sets, infographic labels pinned to
// world points through the camera's own projection, real logos on in-world screens.
import { AmbientOcclusion, Bloom, Canvas3D, Grade, ToneMapping, manifold, type Solid } from "raea/3d";
import { Cuboid, Mesh3d } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { AmbientLight, DirectionalLight, Shadows } from "raea/light";
import { Quat, Transform } from "raea/transform";
import { Camera3d } from "raea/camera";
import { LinearRgba, Srgba } from "raea/color";

export type V3 = [number, number, number];
export const G = { ground: "#0E0E10", floor: "#1B1B1F", wall: "#2C2C33", body: "#3A3A42", top: "#4C4C55", light: "#5E5E68", person: "#8C8C96",   // EX16 (isokit) greys
  green: "#57D100", ink: "#EDE7DC", dim: "#8C8C96", W: 1080, H: 1920 };
export const glowG = (k: number) => LinearRgba.from(Srgba.hex(G.green)).mul(k);

// ---------- the camera: orthographic, iso by default; a top-down → iso swoop for frame 0 ----------
export type Cam = { t: V3; yaw: number; pitch: number; height: number };   // look-at, yaw (rad), pitch (rad down), viewport height (m)
export const ISO: Omit<Cam, "t" | "height"> = { yaw: Math.PI / 4, pitch: 0.615 };         // true isometric (35.26°)
export function camPose(c: Cam): { p: V3; right: V3; up: V3 } {
  const d = 60, cp = Math.cos(c.pitch), sp = Math.sin(c.pitch);
  const fwd: V3 = [-Math.sin(c.yaw) * cp, -sp, -Math.cos(c.yaw) * cp];
  const p: V3 = [c.t[0] - fwd[0] * d, c.t[1] - fwd[1] * d, c.t[2] - fwd[2] * d];
  const right: V3 = [Math.cos(c.yaw), 0, -Math.sin(c.yaw)];
  const up: V3 = [right[1] * fwd[2] - right[2] * fwd[1], right[2] * fwd[0] - right[0] * fwd[2], right[0] * fwd[1] - right[1] * fwd[0]];   // right × forward
  return { p, right, up };
}
/** world point → frame pixels for this camera (orthographic, 1080x1920) */
export function project(c: Cam, q: V3): [number, number] {
  const { right, up } = camPose(c), r: V3 = [q[0] - c.t[0], q[1] - c.t[1], q[2] - c.t[2]];
  const vw = c.height * G.W / G.H;
  const x = r[0] * right[0] + r[1] * right[1] + r[2] * right[2], y = r[0] * up[0] + r[1] * up[1] + r[2] * up[2];
  return [G.W / 2 + (x / vw) * G.W, G.H / 2 - (y / c.height) * G.H];
}

export function IsoStage({ cam, children }: { cam: Cam; children?: any }) {
  const { p } = camPose(cam);
  return (
    <div style={{ position: "absolute", inset: 0, background: G.ground }}>
      <Canvas3D layered>
        <Camera3d transform={Transform.fromXyz(...p).lookingAt(cam.t)} projection={{ Orthographic: { scaling_mode: { FixedVertical: { viewport_height: cam.height } } } }} />
        <ToneMapping mode="agx" exposure={-0.1} />
        <Grade midtones={{ contrast: 1.2 }} vignette={0.25} />
        <AmbientOcclusion quality="high" />
        <Bloom intensity={0.35} threshold={0.8} />
        <AmbientLight brightness={150} color="#D6D6E0" />
        <DirectionalLight transform={Transform.fromXyz(-20, 40, 14).lookingAt([0, 0, 0])} illuminance={4200} color="#FFF8F0" soft_shadow_size={2.4} shadow_maps_enabled />
        <Shadows distance={90} firstCascade={50} mapSize={4096} bias={0.15} />
        <Mesh3d name="ground" transform={Transform.fromXyz(cam.t[0], -0.06, cam.t[2])}><Cuboid half_size={[300, 0.05, 300]} />
          <StandardMaterial base_color={G.ground} perceptual_roughness={0.9} /></Mesh3d>
        {children}
      </Canvas3D>
    </div>
  );
}

// ---------- parts ----------
const cache: Record<string, Solid> = {};
// clay: soft rounded edges (r 0.1)
export const rbox = (w: number, h: number, d: number, r = 0.1) => (cache[`b${w}|${h}|${d}|${r}`] ??= manifold.roundedBox(w, h, d, Math.min(r, w / 2.2, h / 2.2, d / 2.2)));
/** a bevelled box standing on y0 at (x, z) */
export function Box({ name, x, z, w, h, d, y0 = 0, col = G.body, ry = 0, glow, rough = 0.9 }:
  { name: string; x: number; z: number; w: number; h: number; d: number; y0?: number; col?: string; ry?: number; glow?: number; rough?: number }) {
  return <Mesh3d name={name} transform={Transform.fromXyz(x, y0 + h / 2, z).withRotation(Quat.fromEuler("XYZ", 0, ry, 0))} shape={rbox(w, h, d)}>
    <StandardMaterial base_color={col} perceptual_roughness={rough} emissive={glow ? glowG(glow) : undefined} />
  </Mesh3d>;
}
let personSolid: Solid | null = null;
const personShape = () => (personSolid ??= manifold.cone(0.2, 0.13, 0.56).rotate(-90, 0, 0).union(manifold.sphere(0.15, 24).move(0, 0.72, 0)));
/** an Isotype pictogram (EX14's), 1.0 = 0.87 m tall; scale it to read */
export function Person({ name, x, z, col = G.person, s = 1.6, glow }: { name: string; x: number; z: number; col?: string; s?: number; glow?: number }) {
  return <Mesh3d name={name} transform={Transform.fromXyz(x, 0, z).withScale([s, s, s])} shape={personShape()}>
    <StandardMaterial base_color={col} perceptual_roughness={0.6} emissive={glow ? glowG(glow) : undefined} />
  </Mesh3d>;
}
/** a flat ribbon through points (x, z), drawn from 0 to `drawn` (0..1) of its length; EX14's path */
export function Ribbon({ name, pts, drawn = 1, w = 0.22, y = 0.03, glow = 1.2 }: { name: string; pts: [number, number][]; drawn?: number; w?: number; y?: number; glow?: number }) {
  const segs: any[] = []; let total = 0;
  const L = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])); const len = L.reduce((a, b) => a + b, 0);
  pts.slice(1).forEach((b, i) => {
    const a = pts[i], l = L[i], show = Math.max(0, Math.min(l, drawn * len - total)); total += l;
    if (show <= 0.001) return;
    const t = show / l, ex = a[0] + (b[0] - a[0]) * t, ez = a[1] + (b[1] - a[1]) * t;
    // a unit segment stretched by scale (a part's shape is fixed from its first frame; its scale animates)
    segs.push(<Mesh3d key={i} name={`${name}${i}`} transform={Transform.fromXyz((a[0] + ex) / 2, y, (a[1] + ez) / 2)
      .withRotation(Quat.fromEuler("XYZ", 0, Math.atan2(b[0] - a[0], b[1] - a[1]), 0)).withScale([w, 0.04, show + w])}>
      <Cuboid half_size={[0.5, 0.5, 0.5]} /><StandardMaterial base_color={G.green} perceptual_roughness={0.5} emissive={glowG(glow)} /></Mesh3d>);
  });
  return <>{segs}</>;
}

/** an infographic label pinned to a world point: a leader line up from the point, a dot, the text (2D, over the 3D) */
export function Pin({ cam, at, dx = 0, dy = -160, title, sub, icon, t = 1, align = "left" }:
  { cam: Cam; at: V3; dx?: number; dy?: number; title: string; sub?: string; icon?: any; t?: number; align?: "left" | "right" }) {
  if (t <= 0) return null;
  const [x, y] = project(cam, at);
  const wGuess = 120 + Math.max(title.length * 22, (sub ?? "").length * 17);       // the card's width, roughly (Inter 40 / Plex 28)
  const lxRaw = x + dx * t, ly = Math.max(470, Math.min(1300, y + dy * t));
  const lx = align === "right" ? Math.max(60 + wGuess, Math.min(940, lxRaw)) : Math.max(60, Math.min(940 - wGuess, lxRaw));   // TikTok safe area
  return <div style={{ position: "absolute", inset: 0, opacity: Math.min(1, t * 1.4) }}>
    <svg width={G.W} height={G.H} style={{ position: "absolute", left: 0, top: 0 }}>
      <circle cx={x} cy={y} r={9} fill={G.green} /><circle cx={x} cy={y} r={20 + 10 * t} fill="none" stroke={G.green} strokeWidth={3} opacity={0.5 * (1 - t) + 0.25} />
      <line x1={x} y1={y} x2={lx} y2={ly} stroke={G.green} strokeWidth={3} />
    </svg>
    <div style={{ position: "absolute", left: align === "left" ? lx + 14 : undefined, right: align === "right" ? G.W - lx + 14 : undefined, top: ly - 40,
      display: "flex", gap: 16, alignItems: "center", padding: "16px 22px", borderRadius: 22, background: "rgba(14,14,16,0.86)", border: "2px solid rgba(255,255,255,0.08)" }}>
      {icon}
      <div><div style={{ fontFamily: "Inter Display", fontWeight: 700, fontSize: 40, color: G.ink, whiteSpace: "nowrap" }}>{title}</div>
        {sub && <div style={{ fontFamily: "IBM Plex Mono", fontSize: 28, color: G.green, marginTop: 2, whiteSpace: "nowrap" }}>{sub}</div>}</div>
    </div>
  </div>;
}

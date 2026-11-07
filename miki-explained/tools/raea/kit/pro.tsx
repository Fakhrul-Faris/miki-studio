// pro — the professional UI look (user, 2026-11-07: "revert back to the ui design … make it professional"). Interface
// designed to a system (8 pt grid, one radius, sentence case, hairline surfaces) on real slabs floating in a dark
// studio: each card has thickness, catches a soft key light and casts a soft shadow on the backdrop; the camera moves
// between them with depth of field. Real logos, real photos (02_kit/brand), Lucide icons (kit/icons). No emoji.
import { AmbientOcclusion, Bloom, Canvas3D, DepthOfField, Grade, Screen, ToneMapping, manifold, type Solid } from "raea/3d";
import { Cuboid, Mesh3d } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { AmbientLight, Shadows, SpotLight } from "raea/light";
import { Quat, Transform } from "raea/transform";
import { Camera3d } from "raea/camera";

export type V3 = [number, number, number];
// tokens
export const T = {
  bg0: "#050608", bg1: "#0D0F14", surface: "#14161C", surface2: "#1B1E26", line: "rgba(255,255,255,0.08)", hi: "rgba(255,255,255,0.14)",
  ink: "#F2EEE7", ink2: "#A3A7B1", ink3: "#6B707C", green: "#57D100", red: "#FF5A4E", blue: "#5BB4FF", amber: "#FFB23F",
  r: 28, sans: "Inter Display", mono: "IBM Plex Mono",
};
export const PX = 600;              // page px per metre on a card
/** a card surface (inside a Screen page): gradient fill, hairline border, the radius */
export const surface = (extra: any = {}) => ({ position: "absolute" as const, inset: 0, borderRadius: T.r, overflow: "hidden" as const,
  background: `linear-gradient(160deg, ${T.surface2} 0%, ${T.surface} 60%)`, border: `2px solid ${T.line}`, boxShadow: `inset 0 2px 0 ${T.hi}`, ...extra });

let slabs: Record<string, Solid> = {};
const slab = (w: number, h: number) => (slabs[`${w}x${h}`] ??= manifold.roundedBox(w, h, 0.035, Math.min(0.045, w / 12, h / 12)));

/** a floating card: a slab with its page on the face. w, h in metres; page resolution = w*PX x h*PX */
export function Card3D({ name, p, w, h, ry = 0, rx = 0, children }: { name: string; p: V3; w: number; h: number; ry?: number; rx?: number; children?: any }) {
  const q = Quat.fromEuler("XYZ", rx, ry, 0);
  const n: V3 = [Math.sin(ry) * Math.cos(rx), -Math.sin(rx), Math.cos(ry) * Math.cos(rx)];         // the face's normal
  const face: V3 = [p[0] + n[0] * 0.019, p[1] + n[1] * 0.019, p[2] + n[2] * 0.019];
  return <>
    <Mesh3d name={`${name}-slab`} transform={Transform.fromXyz(...p).withRotation(q)} shape={slab(w, h)}>
      <StandardMaterial base_color="#0B0C10" perceptual_roughness={0.45} metallic={0.2} />
    </Mesh3d>
    <Screen name={name} crt={false} background="#00000000" resolution={[Math.round(w * PX), Math.round(h * PX)]} size={[w]} position={face} rotation={[rx, ry, 0]}>{children}</Screen>
  </>;
}

/** the studio: a dark backdrop that catches the cards' soft shadows, one soft key, a dim cool fill, depth of field */
export function ProStage({ cam, focus, aperture = 2.2, children, keyAt = [-3, 5, 6] as V3 }: { cam: { p: V3; t: V3; fov?: number }; focus: number; aperture?: number; children?: any; keyAt?: V3 }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 80% at 30% 20%, ${T.bg1} 0%, ${T.bg0} 70%)` }}>
      <Canvas3D layered>
        <Camera3d transform={Transform.fromXyz(...cam.p).lookingAt(cam.t)} projection={{ Perspective: { fov: cam.fov ?? 0.6 } }}>
          <DepthOfField focal_distance={focus} aperture_f_stops={aperture} mode="bokeh" />
        </Camera3d>
        <ToneMapping mode="tony" />
        <Grade midtones={{ contrast: 1.04 }} vignette={0.18} />
        <AmbientOcclusion quality="medium" />
        <Bloom intensity={0.18} threshold={0.9} />
        <AmbientLight brightness={60} color="#9FB2D9" />
        <SpotLight transform={Transform.fromXyz(...keyAt).lookingAt([0, 0, -1])} intensity={9e6} range={60} outer_angle={0.8} inner_angle={0.15}
          radius={3.2} color="#FFF4E8" soft_shadows_enabled shadow_maps_enabled />
        <Shadows distance={20} firstCascade={6} mapSize={4096} bias={0.1} />
        <Mesh3d name="backdrop" transform={Transform.fromXyz(0, 0, -4.5)}>
          <Cuboid half_size={[30, 30, 0.05]} />
          <StandardMaterial base_color="#101217" perceptual_roughness={0.95} />
        </Mesh3d>
        {children}
      </Canvas3D>
    </div>
  );
}

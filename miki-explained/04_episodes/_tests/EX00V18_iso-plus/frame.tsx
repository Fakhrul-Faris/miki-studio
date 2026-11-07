// EX00V18 — smooth isometric v2 style frame (EX24's hook): a McDonald's cut away on the dark ground, EX14's language
// pushed: denser set, AO + soft key, green glow on the one subject (the soft-serve machine mid heat-treat), a pinned
// label, real logo on the sign and the kiosks, Isotype customers, a top-down → iso swoop from frame 0.
import { AbsoluteFill, Composition, Easing, interpolate, registerRoot, staticFile, useCurrentFrame } from "raea";
import { Screen } from "raea/3d";
import { Cylinder, Mesh3d, Torus } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { Quat, Transform } from "raea/transform";
import { Box, G, ISO, IsoStage, Person, Pin, Ribbon, glowG, type Cam } from "../../../tools/raea/kit/iso";
import { Icon } from "../../../tools/raea/kit/icons";

const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const io = Easing.bezier(0.65, 0, 0.35, 1), out = Easing.bezier(0.16, 1, 0.3, 1);

function Kiosk({ f }: { f: number }) {
  return <div style={{ position: "absolute", inset: 0, background: "#F6F3EE", fontFamily: "Inter Display" }}>
    <div style={{ height: 70, background: "#DA291C", display: "flex", alignItems: "center", gap: 10, padding: "0 16px" }}>
      <img src={staticFile("mcdonalds_arches.svg")} style={{ width: 44, height: 38 }} /><span style={{ color: "#fff", fontSize: 26, fontWeight: 700 }}>Order here</span></div>
    {[0, 1, 2].map((i) => <div key={i} style={{ margin: "14px 14px 0", height: 70, borderRadius: 12, background: "#fff" }} />)}
  </div>;
}

function Store({ f }: { f: number }) {
  const parts: any[] = [];
  // floor + low cut-away walls (EX14: the plan, walls lowered)
  parts.push(<Box key="floor" name="floor" x={0} z={0} w={16} h={0.12} d={12} col={G.floor} />);
  for (const [n, x, z, w, d] of [["wN", 0, -6, 16, 0.25], ["wW", -8, 0, 0.25, 12], ["wE", 8, -1.5, 0.25, 9]] as [string, number, number, number, number][])
    parts.push(<Box key={n} name={n} x={x} z={z} w={w} h={1.1} d={d} col={G.wall} />);
  // front: glass line + the sign with the real arches
  parts.push(<Box key="glass" name="glass" x={-1} z={6} w={14} h={0.5} d={0.12} col={G.top} />);
  // counter (L), registers, menu boards
  parts.push(<Box key="ctr" name="ctr" x={-2.5} z={-3.2} w={7.5} h={1.05} d={1.0} col={G.body} />);
  parts.push(<Box key="ctr2" name="ctr2" x={-6.2} z={-1.2} w={1.0} h={1.05} d={3.0} col={G.body} />);
  [-5, -3, -1].forEach((x, i) => parts.push(<Box key={`reg${i}`} name={`reg${i}`} x={x} z={-3.1} w={0.5} h={0.35} d={0.4} y0={1.05} col={G.light} />));
  [-5, -3, -1].forEach((x, i) => parts.push(<Box key={`mb${i}`} name={`mb${i}`} x={x} z={-5.7} w={1.6} h={0.9} d={0.08} y0={2.0} col={G.top} />));
  // the kitchen behind: fryers, grill, fridges
  [-6, -4.5, -3].forEach((x, i) => parts.push(<Box key={`kit${i}`} name={`kit${i}`} x={x} z={-5.0} w={1.2} h={1.0} d={0.9} col={G.wall} />));
  // dessert station (right of the counter): THE machine, mid heat-treat
  const pulse = 0.9 + 0.35 * Math.sin(f / 6);
  parts.push(<Box key="dst" name="dst" x={2.4} z={-3.2} w={2.4} h={1.05} d={1.0} col={G.body} />);
  parts.push(<Box key="mach" name="mach" x={2.4} z={-3.25} w={0.95} h={1.15} d={0.75} y0={1.05} col={G.top} glow={0.12 * pulse} />);
  parts.push(<Box key="hop" name="hop" x={2.4} z={-3.3} w={0.8} h={0.2} d={0.6} y0={2.2} col={G.light} />);
  [2.2, 2.6].forEach((x, i) => parts.push(<Mesh3d key={`sp${i}`} name={`sp${i}`} transform={Transform.fromXyz(x, 1.3, -2.85)}><Cylinder radius={0.06} half_height={0.1} /><StandardMaterial base_color={G.light} /></Mesh3d>));
  parts.push(<Mesh3d key="ring" name="ring" transform={Transform.fromXyz(2.4, 1.08, -3.2).withRotation(Quat.fromEuler("XYZ", Math.PI / 2, 0, f * 0.05))}>
    <Torus major_radius={0.85} minor_radius={0.035} /><StandardMaterial base_color={G.green} emissive={glowG(2.2 * pulse)} /></Mesh3d>);
  // three kiosks with live screens (the real logo)
  [[-1.5, 2.2], [0.3, 2.2], [2.1, 2.2]].forEach(([x, z], i) => {
    parts.push(<Box key={`k${i}`} name={`k${i}`} x={x} z={z} w={0.7} h={1.7} d={0.25} col={G.body} />);
    parts.push(<Screen key={`ks${i}`} name={`ks${i}`} crt={false} resolution={[200, 300]} size={[0.56]} position={[x, 1.2, z + 0.135]}><Kiosk f={f} /></Screen>);
  });
  // dining: tables with stools
  [[4.5, 0.5], [6.4, 0.5], [4.5, 3.4], [6.4, 3.4], [-5.5, 3.6], [-3.6, 4.3]].forEach(([x, z], i) => {
    parts.push(<Box key={`t${i}`} name={`t${i}`} x={x} z={z} w={1.2} h={0.75} d={1.2} col={G.body} />);
    [[-0.85, 0], [0.85, 0], [0, -0.85], [0, 0.85]].forEach(([a, b], j) => parts.push(<Box key={`s${i}${j}`} name={`s${i}${j}`} x={x + a} z={z + b} w={0.42} h={0.45} d={0.42} col={G.wall} />));
  });
  // plants and bins
  [[-7.3, 5.3], [7.3, 5.3]].forEach(([x, z], i) => parts.push(<Box key={`bin${i}`} name={`bin${i}`} x={x} z={z} w={0.6} h={0.9} d={0.6} col={G.top} />));
  // people: queue at the kiosks, one at the dessert station (the "you", green), diners
  [[-1.5, 3.3], [0.3, 3.4], [0.3, 4.4], [2.1, 3.3], [4.5, 1.4], [6.4, -0.4], [-5.5, 4.5], [-3.6, 5.2]].forEach(([x, z], i) =>
    parts.push(<Person key={`p${i}`} name={`p${i}`} x={x} z={z} />));
  parts.push(<Person key="you" name="you" x={2.4} z={-2.0} col={G.green} glow={0.25} />);
  // the path the customer took to the machine (EX14's ribbon), drawing on
  parts.push(<Ribbon key="path" name="path" pts={[[0.3, 5.6], [0.3, 0.6], [2.4, 0.6], [2.4, -1.6]]} drawn={interpolate(f, [10, 70], [0, 1], { ...CL, easing: io })} y={0.15} />);
  return <>{parts}</>;
}

function Hook() {
  const f = useCurrentFrame();
  // frame 0 is mid-swoop: top-down plan turning into iso, pulling in
  const s = interpolate(f, [-12, 46], [0, 1], { ...CL, easing: io });
  const cam: Cam = { t: [0.6, 0.6, -0.4], yaw: ISO.yaw * (0.55 + 0.45 * s), pitch: 1.35 + (ISO.pitch - 1.35) * s, height: 26 - 6 * s - f * 0.012 };
  const tag = interpolate(f, [46, 62], [0, 1], { ...CL, easing: out });
  const left = Math.max(0, 3 * 3600 + 12 * 60 - Math.max(0, f - 46) * 31);
  return (
    <AbsoluteFill style={{ background: G.ground }}>
      <IsoStage cam={cam}><Store f={f} /></IsoStage>
      <Pin cam={cam} at={[2.4, 2.3, -3.25]} dx={-60} dy={-300} t={tag} title="Heat-treat cycle"
        sub={`${Math.floor(left / 3600)}h ${String(Math.floor((left % 3600) / 60)).padStart(2, "0")}m left`}
        icon={<Icon name="refresh-cw" size={44} color={G.green} style={{ transform: `rotate(${f * 6}deg)` }} />} align="right" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 520, background: "linear-gradient(to bottom, rgba(14,14,16,0.9), rgba(14,14,16,0))" }} />
      <div style={{ position: "absolute", left: 72, right: 140, top: 200, fontFamily: "Inter Display", fontWeight: 800, fontSize: 88, lineHeight: "98px", letterSpacing: -2, color: G.ink,
        opacity: interpolate(f, [-6, 8], [0, 1], CL) }}>Not broken. <span style={{ color: G.green }}>Cleaning.</span></div>
    </AbsoluteFill>
  );
}
registerRoot(() => <Composition id="hook" component={Hook} width={1080} height={1920} fps={60} durationInFrames={120} />);

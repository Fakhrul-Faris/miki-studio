// ---------------------------------------------------------------------------------------------------------------------
// the film (stills first): L01 the block, the stall the only warm thing · L02–L03 the level and the boards · L06 the town
const CAPS60 = CAPS as CapBlock[];
const ENDT = (VO as any).end as number;
function camAt(T: number): { cam: [number, number, number]; look: [number, number, number]; fov: number } {
  const io = Easing.inOut(Easing.cubic);
  const K0 = { cam: [SX + 5.5, 10.5, 20.5], look: [SX + 0.4, 1.6, 2.0], fov: 0.7 };      // L01 frame 0: the block, high three-quarter
  const K1 = { cam: [SX + 2.0, 2.4, SZ + 3.2], look: [SX + 0.6, 1.3, SZ], fov: 0.55 };    // down to the counter and the board
  const K2 = { cam: [SX + 3.6, 6.4, 22.5], look: [SX + 2.6, 4.4, 2.2], fov: 0.72 };       // L02–L03: the level and both boards
  const K4 = { cam: [SX + 0.4, 1.85, 2.35], look: [SX + 0.4, 1.8, -0.9], fov: 0.82 };   // L04: from the five-foot way into the open shutter: pot, flame, tub, the label above      // L04: from the five-foot way, beside the stall, into the open shutter       // L04: through the rolled-up shutter into the kitchen
  const K5 = { cam: [CX5 + 1.6, 2.3, CZ5 + 3.6], look: [CX5 + 0.3, 0.7, CZ5], fov: 0.6 }; // L05: the coconut crates across the street
  const K6 = { cam: [SX + 12, 30, 44], look: [SX, 3, -2], fov: 0.55 };                     // L06: the whole town from high
  const K7 = { cam: [SX + 3.0, 8.6, 19.5], look: [SX + 1.4, 4.9, 1.6], fov: 0.6 };        // L06 settle: the row on the line, your board above it, readable
  const seg = (a: any, b: any, u: number) => ({ cam: L3(a.cam, b.cam, u), look: L3(a.look, b.look, u), fov: lerp(a.fov, b.fov, u) });
  const u = (a: number, b: number) => k(T, a, b, io);
  if (T < TT.infl - 0.3) return seg(K0, K1, u(TT.now - 0.6, TT.p368 + 0.4)) as any;
  if (T < TT.its - 0.4) return seg(K1, K2, u(TT.infl - 0.3, TT.infl + 1.0)) as any;
  if (T < TT.in5 - 0.4) return seg(K2, K4, u(TT.its - 0.4, TT.its + 0.6)) as any;
  if (T < TT.inf6 - 0.3) return seg(K4, K5, u(TT.in5 - 0.4, TT.in5 + 0.6)) as any;
  if (T < TT.yours - 0.5) return seg(K5, K6, u(TT.inf6 - 0.3, TT.avg + 0.2)) as any;
  if (T < TT.still - 0.3) return seg(K6, K7, u(TT.yours - 0.5, TT.yours + 0.8)) as any;
  return seg(K7, K1, u(TT.still - 0.3, TT.still + 0.7)) as any;
}
function EndCard({ t }: { t: number }) {   // the Meikigo end card (silent; house rule)
  const u = k(t, TT.more + 0.55, TT.more + 1.05, Easing.out(Easing.cubic));
  if (u <= 0) return null;
  return <div style={{ position: "absolute", inset: 0, background: "#14161c", opacity: u, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    <Img src={S("meikigo-logo.png")} style={{ height: 420, transform: `scale(${0.92 + 0.08 * u})` }} />
    <div style={{ marginTop: 40, fontFamily: "Inter Display", fontWeight: 700, fontSize: 76, color: "#eef0f4", letterSpacing: -1 }}>Meikigo</div>
  </div>;
}
function Film() {
  const F = useCurrentFrame(), T = F / FPS;
  const { cam, look, fov } = camAt(T);
  const focus = Math.hypot(cam[0] - look[0], cam[1] - look[1], cam[2] - look[2]);
  const nowU = T >= TT.p368 - 0.15 ? 1 : 0;
  const stallY = lerp(Y0, lvl(81), k(T, TT.p81 - 0.35, TT.p81 + 0.35, Easing.out(Easing.cubic)));
  const mamU = k(T, TT.roti - 0.3, TT.roti + 0.3) * (1 - k(T, TT.avg - 0.8, TT.avg)), mamY = lerp(Y0, lvl(71), k(T, TT.p71 - 0.35, TT.p71 + 0.35, Easing.out(Easing.cubic)) * (1 - k(T, TT.avg - 0.8, TT.avg)));   // the mamak settles back for the payoff
  SHUT0.v = 2.8 * (1 - k(T, TT.its - 0.3, TT.its + 0.5)) + 2.8 * k(T, TT.in5 - 0.4, TT.in5 + 0.2);   // rolls up for L04, back down after
  const kit = T > TT.its - 0.4 && T < TT.in5 + 0.4 ? 1 : 0;
  return (
    <AbsoluteFill style={{ background: "#14161c" }}>
      <Camera3d transform={Transform.fromXyz(...cam).lookingAt(look)} projection={{ Perspective: { fov } }}>
        <DepthOfField focal_distance={focus} aperture_f_stops={8} />
      </Camera3d>
      <Environment src={S("sky.hdr")} intensity={0.14} rotation={2.6} />
      <AmbientLight brightness={22} color="#8ea4dc" />
      <DirectionalLight color="#a7bdff" transform={Transform.fromXyz(-22, 18, 6).lookingAt([0, 0, 0])} illuminance={3600} shadow_maps_enabled soft_shadow_size={0.5} />
      <Shadows distance={60} firstCascade={14} mapSize={8192} bias={0.04} normalBias={1.5} />
      {/* the stall is the warm light: the bulb, plus an even key on the counter so what's on it reads (user, 11 Nov) */}
      <PointLight name="sb" transform={Transform.fromXyz(SX, 2.0, SZ)} intensity={900000} color={WARM} range={9} shadow_maps_enabled />
      <SpotLight name="sk" transform={Transform.fromXyz(SX + 1.6, 3.6, SZ + 3.0).lookingAt([SX, 0.95, SZ])} intensity={700000} outer_angle={0.6} inner_angle={0.45} color="#ffe6c2" range={10} />
      <PointLight name="mm" transform={Transform.fromXyz(1 * W + W / 2, 2.2, 1.2)} intensity={500000 * mamU} color="#ffb867" range={8} />
      <Fog color="#14161c" near={T > 26 ? 40 : 60} far={T > 26 ? 120 : 150} />
      <Bloom intensity={0.6} threshold={0.9} />
      <AmbientOcclusion quality="high" />
      <ToneMapping mode="agx" exposure={0.65} />
      <Grade temperature={0.0} vignette={0.28} midtones={{ saturation: 1.05, contrast: 1.12, gamma: 1, gain: 1, lift: 0 }} />
      <Street />
      {UNITS.map((i) => <Unit key={i} i={i} t={T} />)}
      <Stall t={T} />
      <Kitchen t={T} />
      <Coconuts t={T} />
      <Board id="sb" x={SX + 1.7} z={SZ + 0.6} y={stallY} c="#f6efe0" glowK={0.6}
        lines={[["NASI LEMAK", 0.17, "#1b1d22", 0], ["RM2.03", 0.24, "#1b1d22", 1, 1 - nowU], ["RM3.68", 0.24, RED, 1, nowU], ["2011", 0.12, "#5a5d66", 2, 1 - nowU], ["2024", 0.12, "#5a5d66", 2, nowU]]}
        tag={T > TT.p81 - 0.2 ? ["+81%", RED] : undefined} />
      <Board id="mb" x={1 * W + W / 2 - 0.6} z={2.9} y={lerp(-1.6, mamY, Math.min(1, mamU * 3))} c={mamU > 0.5 ? "#f6efe0" : "#3b3d44"} glowK={0.6 * mamU}
        lines={[["ROTI CANAI", 0.15, "#1b1d22", 0, mamU], ["MAMAK", 0.12, "#5a5d66", 1, mamU]]}
        tag={T > TT.p71 - 0.2 && mamU > 0.5 ? ["+71%", "#e8892b"] : undefined} />
      <Level t={T} y={lvl(29)} />
      {/* L06: the town's average, one cool plane over every roof; your stall's board stands above it */}
      <PointLight name="kl" transform={Transform.fromXyz(SX, 2.4, -0.6)} intensity={600000 * kit} color={WARM} range={6} />
      <SpotLight name="cl" transform={Transform.fromXyz(CX5 + 2, 4, CZ5 + 3).lookingAt([CX5, 0.6, CZ5])} intensity={900000 * k(T, TT.in5 - 0.6, TT.in5)} outer_angle={0.5} inner_angle={0.35} color="#e8ecff" range={10} />
      <Captions blocks={CAPS60} frame={F} fps={FPS} />
      <EndCard t={T} />
    </AbsoluteFill>
  );
}
registerRoot(() => <Composition id="ex37" component={Film} width={1080} height={1920} fps={FPS} durationInFrames={2239} />);

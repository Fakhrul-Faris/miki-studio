function Probe() {
  return (
    <AbsoluteFill style={{ background: BG }}>
      <Camera3d transform={Transform.fromXyz(0.15, 0.42, 1.05).lookingAt([0.15, 0.12, 0])} projection={{ Perspective: { fov: (34 * Math.PI) / 180 } }} />
      <ToneMapping mode="aces" exposure={0.3} />
      <AmbientLight brightness={90} color="#b4bccb" />
      <RectLight transform={Transform.fromXyz(0.2, 1.1, 0.5).lookingAt([0.1, 0, 0])} intensity={60000} width={1.4} height={0.9} color="#fff3e2" range={4} />
      <SpotLight transform={Transform.fromXyz(0.7, 1.0, 0.8).lookingAt([0.1, 0.1, 0])} intensity={22000} outer_angle={0.6} inner_angle={0.1} shadow_maps_enabled range={4} />
      <Mesh3d transform={Transform.fromXyz(0, -0.01, 0)}><Cuboid half_size={[3, 0.01, 2]} /><StandardMaterial base_color="#1c1e22" perceptual_roughness={0.42} /></Mesh3d>
      <Bottle p={[-0.28, 0, 0]} ry={0.4} />
      <Sliced p={[-0.12, 0, 0]} />
      <Sign p={[0.12, 0, 0.1]} />
      <Coins p={[0.3, 0, 0.1]} n={33} k="c" hot={8} />
      <Coins p={[0.34, 0, 0.1]} n={20} k="d" />
      <Product id="bleach_bottle" p={[0.46, 0, 0]} k="p1" />
      <Product id="wicker_basket_01" p={[0.62, 0, -0.1]} k="p2" tone={2} />
      <Bag p={[0.1, 0, -0.5]} xray />
      <Card p={[0.5, 0.06, 0.2]} size={[0.09, 0.06]} tex="tag" k="tg" rx={-0.3} />
    </AbsoluteFill>
  );
}
registerRoot(() => <Composition id="probe" component={Probe} width={1280} height={720} fps={30} durationInFrames={1} />);

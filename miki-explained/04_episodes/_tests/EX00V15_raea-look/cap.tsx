// EX23 shot 1 + EX15 captions in raea, against the EffectCraft master (export/EX23.mp4).
import { AbsoluteFill, Composition, registerRoot, useCurrentFrame } from "raea";
import { BlendShot } from "../../../tools/raea/kit/BlendShot";
import { Captions } from "../../../tools/raea/kit/Captions";
import s01 from "./s01.json";
import caps from "./captions.json";
function Cap() {
  const f = useCurrentFrame();
  return <AbsoluteFill><BlendShot data={s01 as any} frame={f} /><Captions blocks={caps as any} frame={f} /></AbsoluteFill>;
}
registerRoot(() => <Composition id="cap" component={Cap} width={1080} height={1920} fps={30} durationInFrames={151} />);

// EX23 shots 1, 7, 11 through BlendShot, to match the EEVEE stills in ref/ (frames 40, 672, 1090).
import { AbsoluteFill, Composition, registerRoot, useCurrentFrame } from "raea";
import { BlendShot } from "../../../tools/raea/kit/BlendShot";
import s01 from "./s01.json";
import s07 from "./s07.json";
import s11 from "./s11.json";

const SHOTS = [s01, s07, s11] as any[];
function Look() {
  const f = useCurrentFrame();                       // the episode frame
  const s = SHOTS.find((d) => f >= d.f0 && f <= d.f1) ?? s01;
  return <AbsoluteFill><BlendShot data={s} frame={f} /></AbsoluteFill>;
}
registerRoot(() => <Composition id="look" component={Look} width={1080} height={1920} fps={30} durationInFrames={1133} />);

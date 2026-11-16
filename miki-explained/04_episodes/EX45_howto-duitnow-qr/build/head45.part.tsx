// EX45 — Terima QR di gerai (S16 How to, Bahasa Melayu, X1 test #1). Night-market stall + phone interfaces, DuitNow pink the one accent.
// Style D motion (RECIPE-D). Assembled: head45 + film45 + cammap → film45.tsx (assemble.sh)
import { AbsoluteFill, Composition, Easing, Img, interpolate, registerRoot, staticFile, useCurrentFrame } from "raea";
import { AmbientOcclusion, Entity, Fog, Grade, ImagePlane, Look, Model, Text3D, type Solid } from "raea/3d";
import { Capsule3d, Cuboid, Cylinder, Sphere, Mesh3d, manifold, crossSection } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { AmbientLight, DirectionalLight, Environment, PointLight, RectLight, Shadows, SpotLight } from "raea/light";
import { Quat, Transform } from "raea/transform";
import { Camera3d } from "raea/camera";
import { Bloom, DepthOfField, MotionBlur, ToneMapping } from "raea/post_process";
import { Affine2 } from "raea/math";
import { LinearRgba, Srgba } from "raea/color";
import TL from "./tl.json";
import PHYS from "./media/phys45.json";
const S = (p: string) => staticFile(p);

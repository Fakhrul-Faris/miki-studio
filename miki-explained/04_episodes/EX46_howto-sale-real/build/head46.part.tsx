// EX46 — Sale ni betul ke tipu? (S16 How to, Bahasa Melayu). Shop aisle, phone, counter, fine, tag wall; sale red the one accent.
// Style D motion (RECIPE-D). Assembled: head46 + film46 + cammap → film46.tsx (assemble.sh)
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
const S = (p: string) => staticFile(p);

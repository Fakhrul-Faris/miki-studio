// EX40 — Ramly Burger doesn't sell burgers. Style A world (EX37/EX31 street, the stall the one real-coloured light) with
// Style D motion (RECIPE-D Part 2). Assembled: head40 + base40 (EX37's street, renamed) + film40 + cammap → film40.tsx
import { AbsoluteFill, Composition, Easing, Img, interpolate, registerRoot, staticFile, useCurrentFrame } from "raea";
import { AmbientOcclusion, Entity, Fog, Grade, ImagePlane, Model, Text3D, type Solid } from "raea/3d";
import { Cuboid, Cylinder, Sphere, Mesh3d, manifold, crossSection } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { AmbientLight, DirectionalLight, Environment, PointLight, RectLight, Shadows, SpotLight } from "raea/light";
import { Quat, Transform } from "raea/transform";
import { Camera3d } from "raea/camera";
import { Bloom, DepthOfField, MotionBlur, ToneMapping } from "raea/post_process";
import { Affine2 } from "raea/math";
import { LinearRgba, Srgba } from "raea/color";
import MAP from "./map39.json";
import TL from "./tl.json";
const S = (p: string) => staticFile(p);

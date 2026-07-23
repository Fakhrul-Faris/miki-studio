# Miki — Blender cutout puppet

**Pipeline:** one character → armature → keyframe in Blender → render.  
Not image-sequence / slideshow.

## Files

| Path | Role |
|------|------|
| `miki_cutout/*_alpha.png` | Layered cutout pieces (chroma-keyed) |
| `miki_puppet.blend` | Reusable rigged character asset |
| Episode uses | `02_EPISODES/EP001_StayStrong/EP001_animation.blend` → collection `MIKI_PUPPET` |

## Rig bones

`root` → `torso` → `head`  
     ↳ `arm_L` / `arm_R`

| Mesh | Bone |
|------|------|
| `Miki_Body` | torso |
| `Miki_Head` | head |
| `Miki_Arm_L` | arm_L |
| `Miki_Arm_R` | arm_R |

## How to animate (you or agent)

1. Select **`Miki_Rig`** → Pose Mode  
2. Rotate bones (arm wipe, head twitch)  
3. Insert keyframes  
4. Scrub / render from **`CAM_PUPPET`**

## Face swap planes (parented to `head`)

| Object | Use |
|--------|-----|
| `Miki_EyesClosed` | Blink — show 2–4 frames |
| `Miki_MouthOpen` | Talking |
| `Miki_MouthSmile` | Soft smile / “Stay strong” hold |
| `Miki_MouthGrin` | Manic service smile |

Default: all hidden (head has baked neutral face). Toggle `hide_viewport` / `hide_render` with keyframes.

## Proof timeline (in episode file)

| Marker | Frame | Action |
|--------|-------|--------|
| wipe | 1–72 | `arm_R` / `arm_L` bone rotation |
| blink | 36–39 | `Miki_EyesClosed` visible |
| talk | 56–68 | `Miki_MouthOpen` |
| smile | 69–96 | `Miki_MouthSmile` hold |

Scrub 1 → 96 in camera view (`CAM_PUPPET`).

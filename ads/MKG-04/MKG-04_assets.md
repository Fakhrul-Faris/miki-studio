# MKG-04 Gate 7: Assets

Derived only from the locked script (scenes 5, 6, 7 are the b-roll; everything else is motion built in post).
Image technique: documentary realism (`references/documentary-realism.md`). One subject per image, no sheets.

## Shared look block (paste into every asset and keyframe prompt)

```
LOOK: a real photographed studio, not a render. Soft large window-style key light from camera-left and slightly above, neutral 5600K, gentle falloff to camera-right, faint natural vignette, fine sensor grain, true-to-life skin and material texture, slight incidental imperfection (faint dust, tiny reflections). Backdrop is a real light neutral grey seamless paper sweep with a soft natural falloff and soft contact shadows. No stylised grade, no glossy hero lighting.
```

Note: device assets (@phone, @tablet, @laptop) and the hand are shot on neutral white or light grey seamless per the asset template. Only the location plates (@studio A and @studio B) carry the light grey backdrop.

## Asset library


| Handle    | Images                                   | How                                                                                                                                                                |
| --------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| @hand     | 3 (back of hand, palm, open and waiting) | User generates. One right hand and forearm, reused in all three b-roll clips. The open pose is the start frame for the phone and tablet float-ins (scenes 5a, 6b). |
| @hand L   | 1 (back of hand)                         | Left hand and forearm, same skin tone, nails and sleeve as the right hand. For the two-handed tablet grip (scene 6b).                                              |
| @phone    | 2 (front, three-quarter)                 | Isolated prop, flat green screen                                                                                                                                   |
| @tablet   | 2 (front, three-quarter)                 | Isolated prop, flat green screen                                                                                                                                   |
| @laptop   | 2 (front open, three-quarter)            | Isolated prop, flat green screen                                                                                                                                   |
| @studio A | 1                                        | Empty seamless backdrop, for scenes 5 and 6                                                                                                                        |
| @studio B | 1                                        | Same backdrop with a matte desk surface, for scene 7                                                                                                               |


Total 12 images here, plus 7 for scenes 1 to 4 (see "Added assets") = 19 (updated for v4.1: light grey backdrop, a left hand for the two-handed tablet grip). Motion beats (scenes 1-4 and 8), logo, UI, type, macro dives and rotate-and-morphs are built in post, so they need no generated assets beyond these.

Updated for v4 (camera and motion direction): the three float-in clips (phone, tablet, laptop settle) will use start, mid and end keyframes, 9 stills in total, built from these assets at gate 9.

## Prompts



### @hand (back of hand)

```
[IMAGE TYPE] Character hand reference
[SUBJECT] One right hand and forearm, adult, about 30 years old.
[DESIGN] Medium warm brown skin with real pores, fine creases at the knuckles and a few faint veins. Short, clean, natural nails, no polish. No rings, no watch, no tattoos, no scars. Plain charcoal long-sleeve cotton shirt, sleeve pushed to mid-forearm, slight natural fabric creasing.
[POSE] Forearm angled slightly up, back of the hand facing the camera, fingers relaxed and slightly curled, thumb resting along the index finger.
[ENVIRONMENT] Very light grey seamless studio background.
[LIGHT] Neutral soft even wrap-around, 5600K, no colour cast.
[CAMERA] Front view, 85mm lens, f/5.6, sharp on the knuckles.
[EXCLUSIONS] No device, no props, no text, no logos, no second hand, no jewellery.
[SEEDANCE ROLE] @hand back - shots 5, 6, 7 - controls skin tone, hand shape, nails and sleeve only - do not use the background.
```



### @hand (palm)

```
Same as @hand (back of hand), except:
[POSE] Forearm angled slightly up, palm facing the camera, fingers relaxed and slightly curled, thumb relaxed to the side.
[SEEDANCE ROLE] @hand palm - shots 5, 6 - controls the palm, finger pads and thumb only - do not use the background.
```



### @hand (open, waiting)

```
Same as @hand (back of hand), except:
[POSE] Forearm raised and angled slightly toward the camera, palm facing the camera and tilted a little upward, fingers relaxed and gently curled, slightly spread, thumb out to the side, ready to receive a device that will glide into the palm and grip from behind.
[SEEDANCE ROLE] @hand open - shots 5a, 6b - controls the waiting hand pose only (start frame of the float-ins) - do not use the background.
```



### @hand L (left hand, back of hand)

```
Same as @hand (back of hand), except:
[SUBJECT] One left hand and forearm of the same person (same skin tone, nails, sleeve and cuff as the right hand).
[POSE] Forearm angled slightly up, back of the hand facing the camera, fingers relaxed and slightly curled.
[SEEDANCE ROLE] @hand L - shot 6b, 6c - controls the left hand only (two-handed tablet grip) - do not use the background.
```



### @phone (front)

```
[IMAGE TYPE] Isolated production asset
[SUBJECT] One modern slab smartphone, screen on.
[DESIGN] Matte graphite aluminium frame, thin even bezels, rounded corners, a small pill-shaped camera cutout at the top of the screen, plain back with no logo. The screen is a perfectly flat, even, matte chroma-key green (#00B140) filling the display, with no UI, no text, no glare, no reflections.
[POSE] Standing upright on an invisible support, screen facing the camera.
[ENVIRONMENT] Very light grey seamless studio background.
[LIGHT] Neutral soft even wrap-around, 5600K, no colour cast.
[CAMERA] Full front view, flat-on, 85mm lens, f/8, sharp commercial product photography.
[EXCLUSIONS] No hands, no visible stand, no UI, no logos, no text, no second device.
[SEEDANCE ROLE] @phone - shot 5 - controls body shape and flat green screen - do not use the background.
```

Second image (@phone three-quarter): change POSE and CAMERA to a three-quarter view tilted 30 degrees toward camera, same everything else.

### @tablet (front)

```
[IMAGE TYPE] Isolated production asset
[SUBJECT] One 11-inch tablet in a slim charcoal rubberised case, screen on.
[DESIGN] Squared corners, thin even bezels, a tiny camera dot on the top bezel, plain back with no logo. The screen is a perfectly flat, even, matte chroma-key green (#00B140) filling the display, with no UI, no text, no glare, no reflections.
[POSE] Standing upright on an invisible support, screen facing the camera.
[ENVIRONMENT] Very light grey seamless studio background.
[LIGHT] Neutral soft even wrap-around, 5600K, no colour cast.
[CAMERA] Full front view, flat-on, 85mm lens, f/8, sharp commercial product photography.
[EXCLUSIONS] No hands, no visible stand, no UI, no logos, no text, no second device.
[SEEDANCE ROLE] @tablet - shot 6 - controls case shape and flat green screen - do not use the background.
```

Second image (@tablet three-quarter): tilted 30 degrees toward camera.

### @laptop (front, open)

```
[IMAGE TYPE] Isolated production asset
[SUBJECT] One 14-inch laptop, open at about 110 degrees, screen on.
[DESIGN] Matte silver aluminium body, thin even screen bezels, a small camera dot on the top bezel, plain lid with no logo, a dark keyboard deck with keys that have no legends or letters, a simple trackpad. The screen is a perfectly flat, even, matte chroma-key green (#00B140) filling the display, with no UI, no text, no glare, no reflections.
[POSE] Sitting on an invisible flat surface, screen facing the camera.
[ENVIRONMENT] Very light grey seamless studio background.
[LIGHT] Neutral soft even wrap-around, 5600K, no colour cast.
[CAMERA] Front view, flat-on, 50mm lens, f/8, sharp commercial product photography.
[EXCLUSIONS] No hands, no visible surface texture, no UI, no logos, no text, no key legends, no second device.
[SEEDANCE ROLE] @laptop - shot 7 - controls body shape and flat green screen - do not use the background.
```

Second image (@laptop three-quarter): rotated 30 degrees toward camera, same everything else.

### @studio A (backdrop for scenes 5 and 6)

```
[IMAGE TYPE] Location plate
[SUBJECT] Empty photo-studio backdrop, no people, no objects.
[DESIGN] A real light neutral grey seamless paper sweep with a soft natural falloff. Faint paper texture and one or two soft natural creases, slight dust in the light, no hard horizon line.
[POSE] N/A (location plate)
[ENVIRONMENT] Straight-on view of the backdrop filling the frame, the centre third left empty, a little headroom above the centre for the device and hand.
[LIGHT] Soft large window-style key from camera-left and slightly above, 5600K, gentle falloff toward camera-right, faint natural vignette.
[CAMERA] 50mm lens, eye level, shallow depth of field, fine sensor grain.
[EXCLUSIONS] No people, no text, no logos, no objects, no props, no floor line.
[REFERENCE ANCHOR] @image1 - reference-library/apple/shots/shot06_mid_00-00-07_344.jpg - ATTACH THIS FILE AS AN IMAGE INPUT, do not cite it in prose only - controls framing and composition only (subject centred, generous empty space above) - do not use its colours, hand, phone, brand or background gradient.
[SEEDANCE ROLE] @studio A - shots 5, 6 - controls the space and light only - do not use any people in it.
```



### @studio B (desk plate for scene 7)

```
Same as @studio A, except:
[SUBJECT] Empty photo-studio backdrop with a plain desk surface, no people, no objects.
[DESIGN] Same light grey paper backdrop. In the lower third, a clean matte pale-oak desk surface recedes slightly, with real wood grain, a soft contact shadow on the backdrop and a few tiny wear marks. Nothing on the desk.
[ENVIRONMENT] Straight-on view, the desk edge running across the lower third, the centre third empty.
[SEEDANCE ROLE] @studio B - shot 7 - controls the space and desk surface only - do not use any people in it.
```



## Added assets for scenes 1 to 4 (notebook, bubbles, booking sheet, pen)

These were missing from the first list. They are isolated photographic stills on the light grey seamless. Post animates them (page turn, pop-in, scribble, crumple and roll) as 2.5D motion, so nothing here goes to Seedance. All objects stay blank: the scribbles, list text and chat content are drawn in post, never generated.


| Handle    | Images                            | How                                                                                                       |
| --------- | --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| @notebook | 2 (open flat, page mid-turn)      | Open spiral-free notebook, blank pages; the mid-turn image is the look reference for the page-turn effect |
| @bubble   | 2 (plain, with three typing dots) | One glossy rounded chat bubble; duplicated and tinted in post to stack four                               |
| @sheet    | 2 (flat, crumpled ball)           | A paper booking sheet with a blank ruled grid, flat and crumpled                                          |
| @pen      | 1                                 | A plain ballpoint pen, used by the post scribble in scenes 1 and 3                                        |


7 images, so the library is 19 images.

### @notebook (open flat)

```
[IMAGE TYPE] Isolated production asset
[SUBJECT] One hardcover notebook lying open, blank pages.
[DESIGN] Charcoal cloth cover, cream paper with faint ruled lines, a plain ribbon bookmark lying in the gutter, slight natural page curve toward the spine, soft paper texture, tiny edge wear. No writing, no printing, no logo.
[POSE] Open flat, seen from directly above, the spine running vertically at the centre.
[ENVIRONMENT] Very light grey seamless studio background.
[LIGHT] Neutral soft even wrap-around, 5600K, no colour cast, soft contact shadow.
[CAMERA] Straight top-down, 50mm lens, f/8, sharp across both pages.
[EXCLUSIONS] No text, no logos, no pen, no hands, no second object.
[SEEDANCE ROLE] @notebook - scene 1 (post only) - controls cover, paper colour and ruling only - do not use the background.
```

@notebook (page mid-turn): same, except [POSE] the right page lifted and curling up about 45 degrees at its outer edge, caught mid-turn, the page edge slightly translucent against the light, soft shadow under the curl.

### @bubble (plain)

```
[IMAGE TYPE] Isolated production asset
[SUBJECT] One glossy 3D chat bubble.
[DESIGN] A rounded rectangle with a small tail at the lower left, smooth glossy plastic in pale cool grey with a soft highlight along the top edge and a subtle inner glow, no text, no icon, no logo.
[POSE] Floating upright, seen from the front with a slight three-quarter turn, tail at the lower left.
[ENVIRONMENT] Very light grey seamless studio background.
[LIGHT] Neutral soft even wrap-around, 5600K, no colour cast, soft contact shadow.
[CAMERA] Front three-quarter view, 85mm lens, f/8, sharp commercial product photography.
[EXCLUSIONS] No text, no logos, no brand colours, no second bubble, no hands.
[SEEDANCE ROLE] @bubble - scene 2 (post only) - controls bubble shape and gloss only - do not use the background.
```

@bubble (typing dots): same, except three small round dots in a row inside the bubble.

### @sheet (flat)

```
[IMAGE TYPE] Isolated production asset
[SUBJECT] One A4 paper booking sheet.
[DESIGN] Off-white paper with a plain printed grid of empty rows and columns and a thicker rule under the first row, no letters or numbers anywhere, a slightly soft crease from being folded once, tiny edge wear, a faint coffee ring stain near one corner.
[POSE] Lying flat, seen from directly above, upright orientation.
[ENVIRONMENT] Very light grey seamless studio background.
[LIGHT] Neutral soft even wrap-around, 5600K, no colour cast, soft contact shadow.
[CAMERA] Straight top-down, 50mm lens, f/8, sharp.
[EXCLUSIONS] No text, no logos, no numbers, no pen, no hands, no second object.
[SEEDANCE ROLE] @sheet - scene 3 (post only) - controls paper colour, grid and wear only - do not use the background.
```

@sheet (crumpled ball): same sheet, except [POSE] crumpled into one tight loose ball about the size of a fist, creases catching the light, sitting on the seamless.

### @pen

```
[IMAGE TYPE] Isolated production asset
[SUBJECT] One plain ballpoint pen.
[DESIGN] Slim matte-black barrel with a metal clip and a small brushed-metal tip, no logo and no text, a tiny scuff near the clip.
[POSE] Lying at a 30 degree angle across the frame, tip pointing to the lower left.
[ENVIRONMENT] Very light grey seamless studio background.
[LIGHT] Neutral soft even wrap-around, 5600K, no colour cast, soft contact shadow.
[CAMERA] Three-quarter top view, 85mm lens, f/8, sharp.
[EXCLUSIONS] No text, no logos, no hand, no ink marks, no second object.
[SEEDANCE ROLE] @pen - scenes 1 and 3 (post only) - controls pen shape only - do not use the background.
```



## Storyboard previews (for human review only)

Do not feed these into the video model. Image generators cannot render text, so these use colour and arrows.

### SB-1: motion beats (scenes 1-4 and 8), one strip of five panels

```
Storyboard strip, a hand-drawn schematic sketch of five 16:9 film panels side by side, black ink line drawing with loose pencil construction lines and flat marker-style colour blocking on off-white paper, thin black frame border around each panel. Panel 1: flat cream background with a large simple notebook icon open at the centre, scribble lines filling its pages, a short curved arrow showing the page flipping. Panel 2: flat cream background with a stack of four chat-bubble icons piling upward, small arrows showing them popping in. Panel 3: flat cream background with a single crumpled paper scrap icon at the centre with scribbled lines on it. Panel 4: flat cream background with a simple round logo mark at the centre, small radiating lines showing it settling. Panel 5: flat teal background, a clean wide empty area for text at the centre, a small circular logo placeholder at the bottom centre. Subjects centered, nothing important in the outer thirds. Limited palette: cream, teal, black, warm yellow. No text, no labels, no numbers, no speech bubbles.
```



### SB-2: scene 5 (phone)

```
Storyboard frame, a hand-drawn schematic sketch of a single 16:9 film shot, black ink line drawing with loose pencil construction lines and flat marker-style colour blocking on off-white paper, thin black frame border. Medium-close eye-level shot. A hand with a charcoal sleeve holds a slab smartphone upright at the centre, screen facing the camera and coloured flat green, thumb resting on the side edge. Backdrop graded from cream at the top-left to teal at the bottom-right, empty on both sides. Subjects centered, nothing important in the outer thirds. A thick red dashed rectangle overlays the central vertical 9:16 crop, and a small red arrow at the bottom center points up into the frame for the slow push-in. Soft key light shown with pale yellow shadows on the right. Limited palette: cream, teal, charcoal, green screen, skin brown. No text, no labels, no numbers, no speech bubbles.
```



### SB-3: scene 6 (tablet)

```
Same as SB-2, except: the hand holds an 11-inch tablet upright in its case at the same centre position and size, screen flat green. Small red arrow at the left edge pointing right, showing the tablet sliding in from the left over the previous phone shape drawn as a pale outline behind it.
```



### SB-4: scene 7 (laptop)

```
Storyboard frame, a hand-drawn schematic sketch of a single 16:9 film shot, black ink line drawing with loose pencil construction lines and flat marker-style colour blocking on off-white paper, thin black frame border. Medium shot at eye level. An open 14-inch laptop with a flat green screen stands at the centre on a pale oak desk that fills the lower third, one charcoal-sleeved hand resting on the laptop's right edge, fingers relaxed, no typing. Backdrop graded from cream at the top-left to teal at the bottom-right. Subjects centered, nothing important in the outer thirds. A thick red dashed rectangle overlays the central vertical 9:16 crop, and a small red arrow at the bottom center points up into the frame for the slow push-in. A small red arrow at the left edge points right, showing the laptop sliding in over a pale outline of the previous tablet. Soft key light shown with pale yellow shadows on the right. Limited palette: cream, teal, pale oak, charcoal, green screen. No text, no labels, no numbers, no speech bubbles.
```



## Next

Gate 8 (segment plan) follows once these assets are approved.
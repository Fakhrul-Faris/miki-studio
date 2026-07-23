# ST03 — Visual still prompts (AI)

Source of truth for humor: `ST03_not_possessed_board.md`.  
These prompts only visualize framing / props / status — they do not invent jokes.

## Style lock (prepend to every panel)

```text
Vertical 9:16 storyboard still, flat 2D indie cartoon / Blender Grease Pencil look,
clean ink lines, limited cel shading, soft daylight apartment, beige walls, simple shapes.
NOT photoreal, NOT 3D render, NOT purple neon, NOT cinematic volume fog.
Cast lock — keep identical every panel:
MIKI: East Asian young man, short black hair, grey hoodie, flat deadpan face;
JAY: tall roommate, messy brown hair, olive green t-shirt, intense true-believer expression;
SAM: friend, short curly hair, mustard yellow shirt, big expressive face.
Location: small living room, grey couch, low coffee table. No demon glow, smoke, souls, or VFX.
```

## File naming

Save into `storyboards/ST03_not_possessed/`:

| # | File | Panel |
|---|------|-------|
| 00 | `00_cast_lock.png` | cast + props |
| 01 | `01_hook.png` | P01 |
| 02 | `02_tribunal.png` | P02 |
| 03 | `03_confession.png` | P03 |
| 04 | `04_yesterday_today.png` | P04 |
| 05 | `05_thirst_souls.png` | P05 |
| 06 | `06_headache.png` | P06 |
| 07 | `07_turn_nod.png` | P07 |
| 08 | `08_pupils.png` | P08 |
| 09 | `09_kit_dinner.png` | P09 |
| 10 | `10_restraints.png` | P10 |
| 11 | `11_holy_salt.png` | P11 |
| 12 | `12_sneeze.png` | P12 |
| 13 | `13_pepper.png` | P13 |
| 14 | `14_safe_now.png` | P14 |
| 15 | `15_preferred_demon.png` | P15 |

Optional: `00_cast_lock.png` — three characters + prop kit for reference.

## Panel prompts (append after style lock)

### 00 — Cast lock
Three-character turnaround on blank beige: Miki seated holding water glass; Jay standing pointing; Sam gasping. Bottom row props: water glass, energy drink can, phone flashlight, charger cable, grocery bag, garlic bread, ramen seasoning packet. Labels under each character.

### 01 — Hook
Extreme close-up of a clear water glass in a grey-hoodie hand. Bold simple on-screen caption at top: "He drank water". No other characters. Prop owns the frame.

### 02 — Tribunal
Wide shot, slight high angle: Jay and Sam stand over Miki on the couch. Jay’s palm out “stop”. Sam behind Jay. Miki small on couch with water glass. Normal apartment light. Exorcism blocking without horror lighting.

### 03 — Confession
Medium two-shot: Miki lifts water glass a little, deadpan; Jay’s eyes widen in breakthrough. Coffee table visible.

### 04 — Yesterday vs today
Jay counts on fingers toward Sam; Sam nods like a juror. Soft background: three empty energy-drink cans in a trash corner (small, readable, not centered). Miki on couch edge of frame.

### 05 — Thirst for souls
Split energy: Sam mid-gasp, hands to chest, huge reaction; opposite beat Miki flat face saying nothing visual — deadpan correction vibe. Living room background.

### 06 — Headache
Three-shot: Jay lecturing priest-confident; Miki rubs temple; Sam soft-horror solemn nod. Water glass still near Miki.

### 07 — Turn nod
Close on Jay’s face after a single decisive nod — case closed, soft certainty. Tiny bit of Miki’s deadpan face at frame edge. No dialogue graphics.

### 08 — Pupils
Phone flashlight beam into Miki’s eyes (insert feel); Jay recoils as if “too normal” is terrifying. No demonic eye effects — ordinary pupils.

### 09 — Kit dinner
Grocery bag dumped on coffee table/couch: garlic bread, USB cable, instant ramen packets. Miki points at the food. Jay and Sam stand proud over the “ritual components.”

### 10 — Restraints
Phone charger cable looped loosely around Miki’s wrists — clearly useless. Miki sits still out of spite. Jay and Sam look victorious. Silent staging gag.

### 11 — Holy salt
Close-up Jay’s hands tearing open an instant ramen seasoning packet, sprinkling powder on Miki’s head like a chef/priest. Packet text readable as seasoning. No magical glow.

### 12 — Sneeze
MCU Miki mid-sneeze, eyes shut, seasoning flecks in hair. No smoke or demon exit effects.

### 13 — Pepper / demon would say
Three-beat comic strip energy in one tall frame OR single moment: Sam triumphant pointing; Miki wiping face deadpan; Jay soft gentle certain smile. Prefer single clear moment: Jay soft-certain MCU after the sneeze, seasoning still in Miki’s hair in foreground.

### 14 — Safe now
Jay gently takes water glass away and places a bright energy-drink can in Miki’s hand, pats shoulder like a nurse. Sam approving in background.

### 15 — Preferred the demon
MCU Miki looking straight into camera, seasoning still in hair, energy drink in hand, flat sincere expression. Empty space for end hold. No wink.

## Generation notes
- Prefer generating `00_cast_lock.png` first, then use it as a style/character reference for panels 01–15.
- If a panel drifts cast design, regenerate that panel with the cast lock as reference — do not “fix” by adding new props.
- Must-hold panels for taste viz: **01, 07, 09, 10, 12, 13, 15**.

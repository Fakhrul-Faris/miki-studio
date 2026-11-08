# EX27 — art direction v2 (pilot of the editorial-illustration overhaul)

User, 2026-11-08: "we need to do overhaul on the art direction because it's so generic … Act as a Senior Motion Designer at
a high-end design studio (like Buck or Ordinary Folk) … minimalist, high-contrast … a signature visual motif … describe the
composition of each frame, the focal point, and the visual hierarchy. I then will generate image and supply it to you."
References: 7 editorial illustrations (hands fanning banknotes on orange; a person hiding under a keyboard key; tiny people on
giant leaves; people on floating blocks; a man lit red by a laptop in a dark navy room; a man reading holographic panels; a
chess player moving orange currency pieces in a grey city).

## What the references have in common (the rules we take)

1. **One idea per frame, told by a metaphor**, not a diagram: money is held in hands, risk hides under a key, finance is a
   chess move. The subject is a thing you could touch.
2. **Scale play**: giant objects, tiny people (leaves, blocks), or extreme close crops (hands, a face). Never a medium,
   evenly-weighted view.
3. **Bold crops**: subjects enter from the frame edge; nothing floats centred with margin all round.
4. **A flat, saturated ground + 2–3 colours + one accent**. Shadows are large graphic shapes in the darkest colour (the navy
   arm-shadow on orange), not soft gradients.
5. **Light as drama**: one coloured light source carves the subject (red laptop glow in a navy room).
6. **Grain**: fine noise over flat fills (leaves, chess). Hand-made, not vector-clean.
7. **Negative space**: 40–60% of the frame is ground colour. That emptiness is what makes it read "premium".

## Signature motif: the Ring

A thin cream hairline circle (3 px at 1080 wide, `#F6EAD7`), present in every frame. It is the series' signature, the way
EX14 had the path. It always **contains the focal point**, and its role changes with the story:
lens → price disc → calendar dial → measuring circle → seal → phone glow → end card. Transitions **pass through the Ring**:
it holds its place while the contents swap inside it (an iris match-cut), so the video feels like one continuous thought.

## Palette (EX27)

| Role | Colour | Use |
|---|---|---|
| Ground | `#E8692A` burnt orange | the field, 40–60% of every frame |
| Shadow / deep | `#1B2A4E` navy | big graphic shadows, sleeves, the night room |
| Light | `#F6EAD7` cream | the Ring, cuffs, highlights, type |
| Secondary | `#9C8CF0` lilac | banknotes, vouchers, the price tag |
| Alarm (one use) | `#FF3B30` red | only the RM40 that is too much, and the night screen glow |

Grain: monochrome noise, 6% opacity, over everything except the type. Type: Inter Display Bold (headline) and EX15 captions.

## Frames — composition, focal point, hierarchy

Times are from the recorded voice (`audio/vo_timeline.json`). F = frame to generate; every frame is 9:16, 1080 × 1920.
"Top band" = the top 520 px kept for the kinetic headline: keep it ground colour in every image.

### F1 · Hook (0.0–8.4 s) "Shopee's 11.11 Big Sale has 11 million ringgit in vouchers. But some sellers' 10% off costs more…"
- **Composition:** extreme close crop, low three-quarter view. Two hands (navy sleeves, cream cuffs) enter from the bottom
  edge and hold a phone tilted 20° left, lower-centre. A huge navy shadow of the hands falls diagonally to the bottom
  right (reference 1). The Ring sits in the upper-middle (centre y ≈ 760, Ø 560 px) over empty orange.
- **Focal point:** inside the Ring (motion layer, not in the image): the real Shopee logo for 1 s, then a lilac price tag
  "10% OFF" that flips to reveal a red "RM600".
- **Hierarchy:** 1) the Ring + tag, 2) hands + phone, 3) the shadow shape, 4) ground.
- **Motion:** lilac vouchers (motion layer) fan out of the phone like the banknotes in reference 1, then slide into the Ring.

### F2 · Mechanism (8.4–12.3 s) "A vacuum usually sells for 500 ringgit."
- **Composition:** scale play. A giant upright vacuum cleaner stands like a monument on a plain cream pedestal, centre-left,
  its top cropped by the top band. One tiny person (shopper, navy) at the pedestal's foot, bottom-right, looking up. Long
  navy shadow from the vacuum to the right.
- **Focal point:** the Ring now a price disc on the pedestal face: "RM500" (motion layer).
- **Hierarchy:** 1) RM500 in the Ring, 2) the vacuum, 3) the tiny shopper (scale cue), 4) shadow.

### F3 · Mechanism (12.3–16.8 s) "Right before 11.11, the seller lifts it to 600."
- **Composition:** same set as F2, camera lower. A giant hand (seller, cream cuff, navy sleeve) enters from the top-right
  edge and sets one extra cream block on top of the pedestal, raising the vacuum. The tiny shopper takes a step back.
- **Focal point:** the Ring becomes a calendar dial at the upper left that clicks to "11.11"; the price disc rolls to
  "RM600" (motion layers).
- **Hierarchy:** 1) the hand + block (the act), 2) RM600, 3) the 11.11 dial, 4) shopper.

### F4 · Twist (16.8–22.0 s) "Then 10% off. You pay 540, and it still feels like a deal."  — the signature frame
- **Composition:** side elevation, flat and graphic. Two cream pedestals side by side on the orange: left a dashed cream
  outline (the real RM500, a ghost), right the solid "deal" pedestal. The right one is taller; its top slice — the part
  above the ghost's height — is **red**, the only red in the video so far. The vacuum stands on the right pedestal. A thin
  cream line runs across at the ghost's height (a measuring line).
- **Focal point:** the red slice, sitting exactly inside the Ring (the Ring becomes a measuring circle centred on it).
- **Hierarchy:** 1) red slice + "RM40 more" (motion), 2) "RM540" on the right pedestal, 3) the ghost RM500, 4) the vacuum.

### F5 · Stakes (22.0–29.1 s) "In Malaysia, that's illegal under the Consumer Protection Act. And Shopee suspends listings…"
- **Composition:** top-down. A large official rubber stamp (navy handle, cream face) descends from the top edge toward a
  product listing card (cream, lilac price) lying on the orange. Its shadow is a hard navy circle that grows as it falls.
- **Focal point:** the stamp's face meeting the card inside the Ring; the Ring becomes the seal's outline
  ("CPA 1999 · s.12", motion layer), then the card desaturates ("Listing suspended").
- **Hierarchy:** 1) seal impact, 2) the card, 3) the stamp body, 4) shadow.

### F6 · End (29.1–36.0 s) "So before you use your vouchers, check last week's price. Seen a fake deal? Drop it below."
- **Composition:** reference 5 lighting. A dark navy room, night. A person seated at a desk, three-quarter from the left,
  face and hands lit by a warm orange phone glow (not red here: red stays the "too much" signal). A tall window on the left
  edge with cool blue light. The phone glow throws a cone of light up the wall.
- **Focal point:** the phone; the Ring is its glow halo, and inside it a price line draws (flat at 500, spike to 600, "deal"
  at 540) as a motion layer.
- **Hierarchy:** 1) the price line in the Ring, 2) the lit face/hands, 3) window light, 4) dark room.
- **Out:** the Ring closes around the Meikigo logo for the end card (silent).

## How to generate (so each frame can be animated)

For every frame, please make:
1. **The composite** (the full frame as described) — my reference for layout and light.
2. **Layer plates**, each on a flat solid background colour that does not appear in the art (pure `#00FF00`) so I can cut
   them out cleanly:
   - the ground/background with nothing on it (and the shadow shape alone, if it's a big separate shape),
   - each subject on its own (hands + phone; vacuum; pedestal; block; giant hand; stamp; card; person + desk; window),
   - same angle, same light, same size as in the composite.
3. **No text, numbers or logos inside any image** — prices, the Ring, the logo, headlines and captions are all added in motion,
   so they stay sharp and correct.
4. Consistent style across all six: flat editorial vector shapes, large graphic navy shadows, fine grain, the EX27 palette
   above, no gradients except the light cones in F6.

## Motion system (applies to the whole video)

- **Transitions:** 0.5 s, `cubic-bezier(0.65, 0, 0.35, 1)` (ease-in-out). Every transition passes through the Ring.
- **Entrances:** springs (stiffness 170, damping 26, mass 1: damping ratio ≈ 1.0, so they arrive with weight and settle
  without bouncing — the house rule against bouncy motion still holds).
- **Overlapping action:** in any group move, elements start 80–120 ms apart; parts that hang off a mover (cuffs, the tag's
  string, voucher edges) follow 100 ms late and settle after it.
- **No linear motion anywhere** except the grain.
- **Camera:** a slow organic drift built from layer parallax: each layer moves by 2 offset sines (periods 7.3 s and 11.9 s),
  ≤ 14 px and ≤ 0.4°, plus a 1.00 → 1.03 push over each frame; deeper layers move less.
- **Kinetic type:** the headline builds word by word on the spoken word — each word rises out of a mask (0.5 s ease-in-out),
  tracking tightens from +4% to 0; the key number in each frame counts, then scales 1.08 → 1.00 into the Ring. Captions stay
  EX15 (centred panel).

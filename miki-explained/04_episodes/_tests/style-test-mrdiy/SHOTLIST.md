# Style test v2 — shot list (approve before anything is built)

**Why v2:** v1 used the bibles' rules on placeholder shapes and my old pipelines (a camera pushed over still plates,
an amber flash). v2 is designed from the bibles' motion rules. Every shot names the rule it uses and **what moves inside
the frame**. A camera move over a still does not count as animation.

**Story (EX29 lines, 10 s):** Mr DIY is cheap, but keeps twice the margin of 99 Speedmart → it buys straight from
factories and sells its own brand → it keeps 11 sen of every ringgit, 99 Speedmart keeps 5.

**Through-line (bible A-C4 / B7):** one **ringgit coin** travels through every shot and carries every handover.

| # | Time | Line | What we see and what moves | Bible rule | Handover to next |
|---|---|---|---|---|---|
| S1 | 0.0–3.4 | "Mr DIY is cheap. But it keeps twice the margin of 99 Speedmart." | **Frame 1 already moving:** a coin rolls along the tiled five-foot way at dusk, past 99 Speedmart (its sign dim, shutter half down), toward Mr DIY. On "cheap", Mr DIY's roller shutter rolls up and its lights switch on, row by row; the sign glows. The coin wobbles to a stop at the door. Camera low, tracking with the coin. | Token travels (A-C4); light is the animation (C1/C2); warm only where life is (B5); real logo frame 1 (sign in the top third from 0 s) | The coin rolls through the open door (object-led) |
| S2 | 3.4–6.6 | "It buys straight from factories… about half is its own brand." | Inside, the camera follows the coin down the aisle (real tools on steel shelves). At the back, the rear shutter is up: a container truck at the door, a carton slides off the hand truck onto the shelf. A stamp drops an **own-brand** label on it: the only change in a locked frame. The coin rolls past. | Lock the frame, change one thing (A-C5); words on objects (B4); detail is attention (A-C2) | The coin drops off the shelf edge into the open till drawer below (object-led, downward) |
| S3 | 6.6–10 | "It keeps about 11 sen of every ringgit. 99 Speedmart keeps five." | Top-down on the till drawer: the ringgit lands, splits into change. **11 sen** stacks up in Mr DIY's drawer, lit warm from inside. Beside it, a second drawer slides in, cool and dim, labelled 99 Speedmart: **5 sen** stacks. Hold. The numbers are printed on the drawer labels, not floated on top. | One among many / comparison by light (C4); words on objects (B4); lock and change one thing | End (the series goes on to the outro) |

## How each style makes the same three shots
- **A (raea, rendered and animated; Blender only to model the shophouse façade):** white clay world with real
  models from Poly Haven (roller shutters, aircon units, plastic crates and monobloc chairs, steel shelves, real
  tools, cash register, hand truck, fluorescent tubes, street lamps, plants). Mr DIY is the one real-material shop
  (painted plaster, ceramic tiles, steel shutter, real logo). Lighting: dusk sky, low raking sun, the shop's own
  practical lights, fog, bloom, depth of field. Figures hold poses.
- **B (HyperFrames, flat):** the same shots drawn at reference level (Patterson/Favre). Arched shophouse fronts,
  shutters with slats, wires, tiles and grain inside the shapes, hard light shapes. The coin rolls, the shutter rolls
  up, the light patch spreads, and the drawers slide in.
- **C (Seedance image-to-video, then my overlays):** you generate a **start frame and an end frame per shot** from my
  prompts (with the coin in them); Seedance animates between them; I add the logo, numbers and captions, and match
  the handovers so the coin carries the cuts. The motion is real, not a camera over a still.

## Order
1. You approve this list (or change it).
2. A: model the shophouse façade + fetch Poly Haven models → build S1 in raea → a **still at final quality** for you to judge → then all three shots.
3. B: S1 at reference-level drawing → still → then animate.
4. C: I write 6 keyframe prompts (start/end × 3 shots) → you generate → Seedance prompts → you generate → I assemble.

# Storyboards

Humor-precise boards that turn `scripts/ST##_*.md` into Grease Pencil animatics.

## Pipeline

```text
scripts/ST##_slug.md
  → storyboards/ST##_slug_board.md     ← timing + gag source of truth
  → storyboards/ST##_slug/prompts.md   ← AI still prompts (style lock + panels)
  → storyboards/ST##_slug/*.png        ← visual stills (9:16)
  → SERIES_NAME/.../EP###_animatic.blend
```

## File naming

| Artifact | Path |
|----------|------|
| Board (markdown) | `storyboards/ST##_slug_board.md` |
| Prompt pack | `storyboards/ST##_slug/prompts.md` |
| Cast lock | `storyboards/ST##_slug/00_cast_lock.png` |
| Panel stills | `storyboards/ST##_slug/01_*.png` … |

Match the script slug: `ST03_not_possessed.md` → `ST03_not_possessed_board.md`.

## How to generate (Cursor)

1. Open the script + its inspiration autopsy (header cites `vid_NNN`).
2. Ask: *“Storyboard ST03 from the script — humor-precise panels, protect the button.”*
3. Cursor follows `.cursorrules` (Storyboards section).
4. Taste-pass: read aloud against the timing rollup; trim panels that only restate dialogue.

## Visual stills (AI — approach 1)

Fastest way to see the board before Grease Pencil:

1. Write `ST##_slug/prompts.md` (style lock + one prompt per panel).
2. Generate `00_cast_lock.png` first.
3. Generate each panel 9:16 using the cast lock as reference.
4. Must-holds first if batching: hook, turn, kit, restraints, sneeze, soft kill line, end button.

Ask: *“Generate visual stills for ST03 from the board + prompts.”*

## Panel checklist (taste pass)

- [ ] Hook readable in first ~2s without hearing audio?
- [ ] One named turn?
- [ ] Reaction / punch has its own hold?
- [ ] Button is visual-first (dialogue doesn’t explain it)?
- [ ] No new props that steal focus from the button prop?
- [ ] Duration sum ≈ script target?

## Boards in this folder

| Board | Script | Panels | Stills | Length |
|-------|--------|--------|--------|--------|
| `PROOF_01_pack_it_up_board.md` | `PROOF_01` KEEP | 5 | — | ~17–20s |
| `PROOF_02_i_am_the_charity_board.md` | `PROOF_02` KEEP | 5 | — | ~14–15s |
| `PROOF_03_stay_strong_board.md` | `PROOF_03` KEEP | 6 | `PROOF_03_stay_strong/` (7 png) | ~21–25s |
| `ST03_not_possessed_board.md` | `ST03` (fossil) | 15 | yes | ~38.5s |

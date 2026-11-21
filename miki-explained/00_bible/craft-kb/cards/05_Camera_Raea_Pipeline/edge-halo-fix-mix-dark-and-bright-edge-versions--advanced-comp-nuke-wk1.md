---
title: Fix key edge halos — background-aware edges, a dissolve between a too-dark and a too-bright edge, then a masked colour smear
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "2:54:15–3:04:44; 4:30:10–4:41:59"
blender_version_source: n/a (Nuke, IBKGizmo / ColorSmear / AddMix)
tool_target: principle-only
tier: principle
style_fit: Only for keyed live-action inserts. Transferable idea: when two fixes err in opposite directions, blend them instead of hunting a perfect single setting.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | principle-only

## CREATIVE_INTENT
Principle: a bright screen behind dark subjects leaves halos and eats into edges; despilling edges then often makes them too dark. Idea: build one edge version that errs dark and one that errs bright, dissolve between them, and treat leftovers locally — never blanket-apply an edge fix or edge blur.

## STE_PROCEDURE
1. If a bright background eats into the subject, merge the key with a non-linear additive mix instead of over.
2. Adjust the non-linear curve slightly; large moves damage edges.
3. Feed the new background into the edge keyer and use its luminance and chroma to colour edges.
4. Try a blacks-match on premultiplied input, sampling under the subject, to lift too-dark edges.
5. Or duplicate the edge keyer with screen subtraction off: this version errs bright.
6. Despill the bright version; dissolve between dark and bright versions (~0.6).
7. Remove remaining 1 px halos with a colour smear: blur ~3, pre-choke 1, smear ~1 px.
8. Mask the smear out of areas where it flattens real detail (feather ~200 or ~10 px for tight areas).
9. Where edges still darken on turns, keymix in the bright version through an animated roto.
10. Optionally raise screen-subtraction weights on a third version to recover brightness.
11. Use edge blur only in tiny amounts, masked, never across the whole key.
12. Keep only one expensive clean-plate generator and branch from it.

## AGENT_EXECUTION
### Source tool (Nuke)
`AddMix` (premultiplied ✓, non-linear ✓, curve tweak) replaces `Merge`; `IBKGizmo` (bg input, use bg luminance ✓, use bg chroma ✓); `BlacksMatch` (premultiplied input ✓, roll-off up); second `IBKGizmo` (screen subtraction off) → `bm_Despill` → `Dissolve` (0.6); `ColorSmear` (blur 3/3, pre-choke 1, blur mask 2, sharpness up) masked by `Roto`; `EdgeBlur` minimal.
### Blender / raea translation
- raea: no equivalent (no keyer). Keyed inserts are prepared outside raea.

## NOTES
- Visual gaps: the AddMix curve shape and BlacksMatch roll-off value are shown, not spoken.
- Rule conflicts: none.

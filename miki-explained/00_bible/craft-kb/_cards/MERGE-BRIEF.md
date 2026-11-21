# Merge brief — master cards for duplicate topics

Read `BRIEF.md` (card format, our pipeline, house rules) first. `CLUSTERS.md` lists topics; those marked `[merge]` hold
2+ cards (from different videos) that teach the same technique.

For each `[merge]` topic assigned to you, read every member card and write ONE master card:
`../masters/<bucket of the topic>/<topic-slug>.md`. Member cards stay where they are (provenance); never edit or delete them.

Master card format — same four sections as BRIEF.md, plus:

```markdown
---
title: <Topic name>
bucket: <bucket>
type: master
members:
  - cards/…/<member1>.md
  - cards/…/<member2>.md
sources: ["<video 1>", "<video 2>"]
use_when: "<from CLUSTERS.md>"
style_fit: <one line for Style D / our rules; strictest member's conflict note wins>
---
## METADATA
## CREATIVE_INTENT        — the shared why, plus what each source adds (one line each)
## STE_PROCEDURE          — one consolidated procedure; the best-ordered steps from all members
## VALUES BY SOURCE       — table: parameter | source A | source B | … | recommended for Style D (+ why)
## AGENT_EXECUTION        — one consolidated bpy / node / raea block (best member version, merged)
## NOTES                  — deprecations, visual gaps, rule conflicts (union of members, deduplicated)
```

Rules:
- Never average away values: when sources disagree, keep both in VALUES BY SOURCE and pick one for Style D with a reason.
- Never drop a socket link, modifier value or step that only one member has — fold it in, or list it as a variant.
- Code must target Blender 5.x (the studio runs 5.3): `Action.fcurves` is gone → use
  `bpy_extras.anim_utils.action_get_channelbag_for_slot(action, slot).fcurves` (with `ob.animation_data.action_slot`);
  `scene.node_tree` → `scene.compositing_node_group`; `sequence_editor.sequences` → `.strips`; EEVEE Legacy props
  (`use_gtao`, `use_bloom`, `use_ssr`) are gone; Sky `NISHITA` → `MULTIPLE_SCATTERING`; Images-as-Planes is core
  `bpy.ops.image.import_as_mesh_planes`. If `../_cards/BPY-CHECK.md` exists, read it for more confirmed fixes.
- raea: only props that exist in `~/.claude/skills/raea-bevy/` docs. No invented props.
- Write `../_cards/merge-<yourname>.done.md`: topic → master path → member count. Final reply: "done" + count.

---
title: Judge brightness on a phone before finalising
bucket: 05_Camera_Raea_Pipeline
source: "How to Make DARK Environments in Blender.txt"
source_time: "28:29–29:18"
blender_version_source: 4.x
tool_target: principle-only
tier: full
style_fit: Strong fit — our audience watches on phones (TikTok/IG 9:16); a dark shot that reads on a monitor can be mud on a phone.
---

## METADATA
05_Camera_Raea_Pipeline | any | principle-only

## CREATIVE_INTENT
Moving a finished render to a phone switches context like taking a long break, and shows how bright or dark the image really is. For vertical social video it is also the real viewing device.

## STE_PROCEDURE
1. Before signing off a look still or preview, render the frame at final resolution.
2. Send it to your phone.
3. View it at normal phone brightness, away from the edit screen.
4. Adjust exposure/fill if the shadows read as solid black or the image looks washed.

## AGENT_EXECUTION
raea:
```bash
raea render EDIT.tsx --frame 120 -o check_120.png
python3 miki-explained/tools/tgstore.py push check_120.png --episode EX46   # our Telegram store (meikigoBot DM)
```
Blender: `bpy.ops.render.render(write_still=True)` with `scene.render.filepath` set, then the same push.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none; pairs with "preview before render" — ask the user to judge previews on the phone.

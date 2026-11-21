---
title: Balance exposure to the brightest thing you can't control; keep levels low
bucket: 04_Shading_Lighting
source: "Backlight Everything - A Cinematographer's Hammer.txt"
source_time: "07:38–08:44, 09:45–10:44, 12:41–13:36, 18:35–19:05"
blender_version_source: n/a (live-action cinematography)
tool_target: principle-only
tier: principle
style_fit: Fits Style D — dark-room look: set exposure by the brightest element (emissive accent, sky, screen), then light the hero up to it.
---

## METADATA
04_Shading_Lighting | n/a (live-action) | principle → Blender bpy + raea

## CREATIVE_INTENT
Principle: identify the element you can't control (the sky) and balance everything to it. To get a dark, moody image on a bright day you need a lot of light on the subject so the exposure can come down to hold the sky. Choose the darkness first (the stop that makes the sky and background as dark as you want), then add light to the subject until it sits where you want it. The reference stays very low on the scopes — whites nowhere near clipping, mid-tones very low, sky dark and warm. With the sun in frame no balancing works. Ideas: in raea, set exposure by the brightest emissive (screen, neon accent) first, then raise the hero's key until it reads.

## STE_PROCEDURE
Method:
1. Identify the brightest element you can't change (sky, practical, screen).
2. Set exposure so that element sits where the mood wants it (darker for drama).
3. Raise the subject's light until the subject reaches its target level at that exposure.
4. Keep the overall levels low; peak whites well under clipping.
5. Keep the hard source out of frame; a source in frame can't be balanced.
How-to:
6. On set: roll the iris to find the darkness you want (e.g., T11), open back up, and add that many stops of light on the subject.
7. Check with scopes: in the source, most of the frame sits very low (≈ under 40 % on the waveform, as heard "38").

## AGENT_EXECUTION
### Source tool (live-action set)
- Set iris for the sky (e.g., T11), shoot wide open, make up the stops on the face with bounce; check waveform/false colour.
### Blender / raea translation
- Blender: Color Management `view_transform='AgX'`, set `scene.view_settings.exposure` by the brightest element, then raise key energy; check with the Image Editor scopes (waveform).
- raea: `<ToneMapping mode="agx" exposure={-1} />` (stops) set by the brightest emissive/sky; raise the hero key (`SpotLight intensity`) until it reads; keep emissive `LinearRgba.from(Srgba.hex(c)).mul(k)` at a level that blooms without clipping the whole frame. Check a still's levels (e.g., ffmpeg `signalstats` / a waveform of the PNG).

## NOTES
- The "38" value is STT-heard and refers to a waveform reading on screen; treat as `~`.
- Rule conflicts: none; balance against the phone-screen brightness check (phone-screen-brightness-check--dark-environments).

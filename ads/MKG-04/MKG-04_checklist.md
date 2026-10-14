# MKG-04 production checklist

Status key: [x] done, [ ] to do, [~] parked.
Plan change recorded here (not yet written into the script): the notebook, the booking sheet, the two rotate-and-morphs and the three macro dives are now **video-generated** to keep real lighting and realism. The chat bubble, the logo and all UI are made by the user in Figma.

## PAUSED: Seedance backlog (resume later)

Remaining generations: D2 (tablet dive), D3 (laptop dive), N1 (notebook and handwriting), N2A (commission sheet).
Remaining stills: N1-KF-START, N1-KF-END, N2-KF-A1 (edit of the locked A2), N2-KF-A2 (fix pen tip and salary alignment, then lock).
Parked: S3A.
Focus now: After Effects build and scripting.

## 1. Script and planning

- [x] Script locked (MKG-04.md, v4.3), voice-over copy written, tagline and CTA confirmed
- [x] Asset prompts, keyframe prompts, segment specs, UI spec, storyboard prompt written
- [x] Script, keyframes and segment specs rewritten for the new generated pieces (v4.4)

## 2. Seedance clips (device scenes)

- [x] S1 phone (float-in and hold), passed
- [x] S2 tablet (float-in, arc, hold), rendered
- [x] S3B laptop (finger pull, then trackpad), passed
- [~] S3A laptop float and turn: parked after two failed takes. Fallback in use: the morph ends with the laptop already landed, then S3B plays. Revisit with S3-KF-TURN (FLOAT to TURN, then TURN to LAND)

## 3. Seedance work (see the tracker in `MKG-04_segment-specs.md`)

New stills to generate (5): N1-KF-START, N1-KF-END, N2-KF-A1, N2-KF-A2, MACRO-STILL.
Existing stills reused: S1-KF-START and END, S2-KF-START and END, S3-KF-LAND, S3-KF-END, S3-KF-FLOAT.

- [ ] N1 notebook and pen (scene 1)
- [ ] N2A barber commission sheet (scene 3a): the hand writes the last salary entry
- [x] N2B pen set down and the fist closing on the sheet (scene 3b), trimmed to about 0.8 s and cut on the crush; no ball shown
- [ ] R1 tablet reveal (scene 6a): generate a push-in from S2-KF-START to MACRO-STILL, cut at 1.0 s, reverse in post; replaces the M1 morph
- [ ] R3 laptop reveal (scene 7a): generate a push-in from S3-KF-LAND to MACRO-STILL, cut at 1.2 s, reverse in post; replaces the failed M2 morph
- [x] D1 phone macro dive (scene 5c): accepted with a post fix. The push-in is too slow and never fills the frame, so retime it to about 1 s, digitally zoom the last bit to fill, and build the glide as the Figma UI over a glare plate from MACRO-STILL; crop the corner badge
- [ ] D2 tablet macro dive (scene 6c): one take only, same post fix as D1
- [ ] D3 laptop macro dive (scene 7c): one take only, same post fix as D1
- [ ] Probe order: render M1 and D1 first as test takes before committing to the rest
- Tracking decision: no markers by default. The generated dive clip provides the real glass and glare, and the Figma UI plays under it. Add a faint grid of small black crosses to MACRO-STILL only if the UI and glare drift apart in a test.

Cost: 7 new generations and 6 new stills. The morphs are the riskiest (both morphs were replaced by screen-led pull-backs, R1 and R3). The fallback for any failed morph or dive is the post-built version (a 2D morph and a virtual camera over the UI).

## 4. Figma work (by the user)

- [ ] Chat bubble animation for scene 2 (a stack of four, the last with typing dots)
- [ ] Logo reveal for scene 4
- [ ] 12 UI keyframe stills (UI-P1 to P4, UI-T1 to T4, UI-L1 to L4), per the UI spec
- [ ] UI hold animations on the three screens
- [ ] UI macro-dive animations (the full-frame layers that go over the generated dive clips)
- [ ] End card (tagline, CTA, logo, then the website URL)

## 5. Post production

- [ ] Track and corner-pin the UI onto the S1, S2 and S3B clips
- [ ] Key the green screens, despill the hands and sleeves, add glass glare and a screen glow on the hands
- [ ] Composite the full-frame UI under the glass reflections of the three macro-dive clips (key the green, put the glare over the UI)
- [ ] Assemble scenes 1 to 4 (notebook clip, bubble animation, sheet clip, logo)
- [ ] Assemble scenes 5 to 7 with the morphs and the dives
- [ ] Add the end card, matching the colour flood from the last dive
- [ ] Colour and grain match across all generated clips (the same grey backdrop and lighting)
- [ ] Voice-over: record the woman's voice, one take per line (48 words, copy in `MKG-04.md`)
- [ ] SFX from the cue lists in the UI spec, and music with ducking under the voice
- [ ] 9:16 reframe, with a tighter pass for the landscape tablet in scene 6
- [ ] 15 s cutdown (scene 1 hook, phone, tablet, laptop, end card)

## 6. Final checks

- [ ] "5 minutes" and "free" claims confirmed with the product team (confirmed by the user in the brief)
- [ ] Website URL added
- [ ] No text, logos or watermarks left on any generated clip (the lid-logo and corner-badge problems seen in tests)
- [ ] Legibility check: every on-screen line reads at phone size
- [ ] Export: 16:9 master, 9:16, 15 s cutdown

Note: scenes 2 (bubbles) and 4 (logo) are back to 2.0 s each, because scene 3 is back to 2.0 s (N2A 1.2 + N2B 0.8).

## Docs added for the After Effects phase
- `MKG-04.md` rewritten clean as v4.5 (master timeline, scenes, VO windows, 15 s and 9:16 notes); old version in `MKG-04_v4.4-archive.md`
- `MKG-04_ae-build-guide.md`: comps, tracking, keying, dives, reveals, expressions, audio, output, QA
- `MKG-04_ui-animation-spec.md`: tokens, the 12 UI states, three dive plates
- Open: confirm the brand accent colour (stand-in #0E9F7E) and the placeholder shop name

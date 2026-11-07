# EX00V12 — clay brought closer to Main Edit.mp4 (2026-11-06)

User: "tweak clay style close to its original reference video." Measured against 12 reference frames (median luma 99,
26% bright, 18% near-black):

| Variant | Settings (TUNE) | median | bright | near-black |
|---|---|---|---|---|
| EX20/EX21 episodes (as shipped) | sun-lit sets, dark floor | 25–30 | 3–5% | 50–59% |
| V0 (EX00V11, approved earlier) | area key 9000, dark floor #1C1F26 | 106 | 20% | 36% |
| V1 | lighter clay, mid-grey floor #5E626A | 137 | 45% | 3% |
| **V4 (recommended)** | V0 clay + key, floor #3E424A, backdrop #4A4F58 → #101216, fill 1600, ambient 0.9 | **114** | **23%** | **23%** |
| Reference | — | 99 | 26% | 18% |

Finding: the episodes came out much darker than the approved look test because their sets were lit by low suns, not the
test's area key. V4 = the test's lighting, a slightly lighter ground, a lifted fill; it sits closest to the reference.
`compare.png`: V0 / V1 / V4 for shots A and B, the reference on the right.

    TUNE='{"floor":"#3E424A","btop":"#4A4F58","bbot":"#101216","fill":1600,"amb":0.9}' blender -b --python test.py -- out/V4 A still 75 half

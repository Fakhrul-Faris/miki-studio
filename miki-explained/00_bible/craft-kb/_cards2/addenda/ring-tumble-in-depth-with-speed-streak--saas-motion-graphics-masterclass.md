# Addendum → cards/09_UI_Motion/ring-tumble-in-depth-with-speed-streak--apple-style-ui-face-id.md
Source: "Motion Feel, Easing & Camera Choreography/SaaS Motion Graphics Masterclass Techniques.txt" — 49:04–49:53

## Variant: Echo effect gives trailing duplicate rings, faded in by keying the echo count (not present from frame 0)
Rather than one blurred streak copy, this source adds an **Echo** effect to the glowing ring/orb shape, with echo
time set to −3 (trailing, not leading) and the echo count kept low (3, optionally up to 5) — "we'll add this really
cool effect where the lines are duplicated." Echo renders from every frame by default, including before the shape
should have any trail; the fix is to key the **number of echoes** itself, starting at 0 (no trail) and animating up
to the final count so the trailing copies fade in rather than being present instantly.

## VALUES BY SOURCE row
| parameter | SaaS Motion Graphics Masterclass (AE) | recommended for Style D |
|---|---|---|
| echo time | −3 (trailing) | n/a (raea has no echo plugin) |
| echo count | 3–5, keyed 0 → final so the trail fades in | 3–4 trailing copies, opacity-staggered, same cap as the existing card's single streak (subtle, ≤ ~130°/s equivalent motion) |
| raea equivalent | — | render N offset-frame copies of the ring (`f - i*2` each, i = 0..3) at falling opacity (1, 0.5, 0.25, 0.1), keyed in via an overall `trailT` 0→1 so they're absent at the ring's own entrance |

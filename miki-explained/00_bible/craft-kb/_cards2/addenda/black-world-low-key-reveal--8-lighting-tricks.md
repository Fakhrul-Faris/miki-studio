# Addendum → masters/04_Shading_Lighting/black-world-low-key-reveal.md
Source: "Studio Lighting, Silhouettes & Color Theory/8 Lighting Tricks I Wish I Knew Earlier (Blender Product Lighting Tutorial).txt" — 04:57–05:37.

## New VALUES BY SOURCE row
| parameter | 8-lighting-tricks |
|---|---|
| Recipe name | "teaser" lighting — when you don't want to show the entire product yet |
| Setup | backlight(s) ONLY, no key at all; light placed behind the product |
| Symmetry step | duplicate the single backlight (Shift+D), rotate the copy to the opposite side, keep it "more or less symmetric" |
| Floor control | light-link the backlight(s) to exclude the floor (New light-linking collection, drag floor in, disable the check mark) so only the product silhouette/edges light up, not the ground |
| Power | weaker than the full three-point key (source: "do five" vs. "25" for the full key — i.e. roughly 1/5 the full key's power) |

## Extra step
Add a named variant to the master's STE_PROCEDURE: for a "teaser" reveal (showing only silhouette/edges, withholding the
full object), skip the key light entirely and use only a symmetric pair of backlights (one duplicated and rotated to the
opposite side), each light-linked to exclude the floor so no light spills onto the ground plane. This is a stricter,
simpler version of the master's existing edge-light-only reveal: no key, no single rim — a matched PAIR of backlights for
an even silhouette from both sides.

## raea
```tsx
{/* teaser variant: no key at all, symmetric backlight pair, product only (no floor lit) */}
<RectLight name="back-L" color="#ffffff" transform={Transform.fromXyz(-0.6, 0.3, -0.5).lookingAt([0, 0.15, 0])}
  intensity={40_000} width={0.3} height={0.3} />
<RectLight name="back-R" color="#ffffff" transform={Transform.fromXyz(0.6, 0.3, -0.5).lookingAt([0, 0.15, 0])}
  intensity={40_000} width={0.3} height={0.3} />
{/* floor stays unlit by these: raea has no light-linking — keep both lights' range short and aimed at the hero only,
    or place the floor far enough outside their narrow throw (see light-linking.md raea fallback) */}
```

## Notes
- No numeric light positions given beyond relative power ("five" vs "25", i.e. a ratio, not absolute units); raea
  intensities above are illustrative placeholders tuned on a still.

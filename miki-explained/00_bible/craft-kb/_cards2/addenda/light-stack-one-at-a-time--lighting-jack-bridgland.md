# Addendum → masters/04_Shading_Lighting/light-stack-one-at-a-time.md
Source: "Studio Lighting, Silhouettes & Color Theory/How to Light Like JACK BRIDGLAND – Layered Studio Lighting Techniques Explained.txt" — 03:21–03:45 (rim solo from top), 05:05–05:32 (rim + background only, no front light).

## New VALUES BY SOURCE row
| parameter | lighting-jack-bridgland |
|---|---|
| audition method | isolate the LAST two layers only (rim + background), with the front/key fully off, and judge the resulting silhouette — not just solo one light at a time |
| what it checks | whether rim and background alone already give "a really strong silhouette" with the right balance, before the key is added back |
| viewing angle | the source also solos from a top-down view to see all light positions relative to each other before judging the render |

## Extra step
Add to STE_PROCEDURE after step 9 ("Solo each collection to check..."): before combining every layer, specifically solo
the two layers furthest from the key (rim + background) together, with the key off, and check the silhouette they
produce alone reads as intended — a correct rim/background balance should already look like a usable (if moody)
image before the key restores the front detail.

## raea
```tsx
const SOLO = { key: false, rim: true, background: true };  // silhouette-only check — render a still, compare to the full stack
```

## Notes
- No new numeric values (source gives no light positions/powers); the technique addition is the audition order (rim+background
  together, not just one light at a time) as an extra check before final combination.

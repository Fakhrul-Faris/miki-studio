# Directive Voice: Full Example

## Portuguese Fisherman Kitchen — Complete Before and After

This is a real scene: a kitchen in a working fishing village, used daily for sixty years, one window facing the harbor.

### Prompt Voice (Forbidden)

```
A cinematic shot of a rustic Portuguese fishing village kitchen. Warm, cozy, 
ultra-detailed, hyperrealistic, 8k resolution. Dramatic golden hour lighting 
through an old window. Award-winning composition. Kodak film grain, shallow 
depth of field, masterpiece quality. Emotional, atmospheric, moody. Shot on 
ARRI Alexa with 35mm anamorphic lens. Trending on ArtStation. Cinematic 
masterpiece with volumetric lighting.
```

**Why this fails:**
- Zero subject. No one is in the frame; nothing is happening.
- Adjectives with nothing to attach to (cinematic, dramatic, masterpiece).
- Specs listed as incantation (Alexa, anamorphic, shallow DOF) with no intention.
- No refusals. Every gap filled by the model's training average.
- The model generates: plastic clean countertop, perfect symmetry, oversaturated golden hour, no story, generic Portuguese kitchen that could be anywhere.
- Result: High-res AI look.

### Directive Voice (Required)

```
SHOT
Wide. The kitchen stretches left to right. The window owns the frame left, dirty glass, 
light comes through anyway. A woman, hands deep in a basin, fills frame right. She is 
closer than comfort.

CHARACTER
ROSA. Seventies. No makeup. Hands rope from sixty years of salt water and fish scale. 
The sweater is wool, not matching, darned at the elbow twice. Her forearms are scarred 
from bone knife work. Not a professional. A survivor.

LOCATION
A kitchen in a working fishing village. Linoleum worn to white at the sink. Dishes don't 
match — some enamel from the 1950s, some plastic from the 1980s, one chipped plate from 
a restaurant that closed. The window frame is painted blue, the paint cracking. One shelf 
holds water bottles, rope, a broken radio. A calendar from 2019 still hangs by the door.

LIGHT
One practical. The window. Midday, no clouds, hard light, one direction. Her hands are 
lit. Her face is half-black. The right side of the room falls into shadow. No fill. No 
bounce. Not a photoshoot.

CAMERA
35mm anamorphic, wide open. We are inside her head. The room stretches. The window 
distorts. The street outside is soft, we don't care about it.

GRADE
Kodak Portra 400 logic. Skin protected. The blacks are crushed. One accent color only 
— the blue of the window frame, muted, not vibrant. Visible grain. No HDR. No 
saturation boost. The image reads as film from the 1980s, not a 2026 render.

MOTION
Push in. Slow. Stop when we see her eyes.

REFUSAL
Not a photoshoot. Not symmetrical. Not beauty lighting. Not clean. Not a restaurant 
or museum piece. Not aspirational. Not slow-motion poetry. Her age shows. Her hands 
show. The room shows its use.
```

**Why this works:**
- Clear subject (Rosa, her hands).
- Clear verb (push in, watch her).
- Every field a decision.
- One refusal that protects the specificity.
- The model has explicit constraints. It cannot fill gaps with average.
- Result: A still that reads as memory, as witness, as real.

## Field Mapping Explained

### Asset / Character
State the person as you would to a casting director: age range, body condition, hands, grooming, what they wear and the state of what they wear. This forces specificity. "Beautiful woman, 25" generates the median of attractive. "ROSA. Seventies. No makeup. Hands rope from sixty years of salt water" generates Rosa.

### Location
Describe the place as an archaeologist would: materials, wear, what's broken, what doesn't match, evidence of time. "Rustic kitchen" is generic. "Linoleum worn to white at the sink. Dishes don't match — enamel from the 1950s, plastic from the 1980s" is Rosa's kitchen, not anyone's kitchen.

### Keyframe / Still
Shot size (wide, medium, close), angle (slightly high, level, from below), subject placement (frame left, centered, frame right), what dominates the composition, and why. Never describe lighting here; describe framing. "Wide. The kitchen stretches left to right. The window owns the frame left, dirty glass. A woman fills frame right." That is a shot. "Cinematic wide shot with dramatic lighting" is not.

### Motion
One named move. Dolly in, dolly out, push in, crane up, track left, orbit around, whip pan, static. State where it ends. "Push in. Slow. Stop when we see her eyes." Not "smooth cinematic push in." The word "smooth" tells the model to drift aimlessly.

### Camera / Lens
Lens (35, 50, 85, anamorphic), aperture (wide open, stopped down), and the intention. "35mm anamorphic, wide open. We are inside her head" tells you why that choice. "35mm anamorphic, shallow depth of field" is a spec with no reason.

### Grade / Post
Reference a film stock, a color grade, or both. "Kodak Portra 400 logic" tells the model what palette and contrast feel right. "Crush the blacks" is a specific post move. "Protect skin" is a refusal against over-saturation. "No HDR" is explicit. "Visible grain" is a decision. "Cinematic color grade" is a mood.

## Common Mistakes to Avoid

**Stacking adjectives without a noun:**
- ❌ "Dramatic, cinematic, moody lighting"
- ✅ "One practical. Hard. Midday. Half her face black."

**Specs as incantation:**
- ❌ "Shot on ARRI Alexa, 35mm anamorphic, shallow depth of field, 24fps"
- ✅ "35mm anamorphic, wide open, we are inside her head"

**Mood instead of action:**
- ❌ "Capture the sadness of a life at sea"
- ✅ "Her hands are lit. Her face is half-black. No fill. The room is dark."

**No refusals:**
- ❌ A brief with zero refusals is a brief with zero specificity.
- ✅ Always include at least one. "Not a photoshoot. Not beauty lighting. Not clean."

**Describing the average:**
- ❌ "A cozy kitchen with warm lighting"
- ✅ "Linoleum worn to white at the sink. Dishes don't match. Calendar from 2019."

---

**Use this example as a template for every brief you write.** The structure is the same; the details change. The level of specificity should match this. If your brief is shorter or vaguer, rewrite it.

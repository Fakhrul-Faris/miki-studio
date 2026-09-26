---
name: animation-direction
description: Plans animation by identifying keyframes from the script, assigning a motivated camera move to each keyframe, and sequencing them with specific speed and endpoint. Teaches movement families, camera presets, and the "How to Direct" template for animation briefs. Required after hero-frame-production, before brand-profiles. Triggers on camera movement, dolly, crane, orbit, tracking, Snorricam, push in, pull out, dolly zoom, handheld, Steadicam, camera preset, cinematic camera, keyframe animation, motion planning.
---

# Animation Direction

## Core Principle

The camera must have intention. One named, motivated move per shot. Static frame is surveillance. Aimless drift is morphing. Animation is storytelling through motion: the camera reveals, follows, flees, or confronts. State where the move ends.

All animation direction text is written in Directive Voice.

## Workflow

1. Take the locked hero frame from hero-frame-production.
2. Identify keyframes from the script (the moments of visual intensity, emotional weight, or action change).
3. For each keyframe, specify:
   - Shot size and composition (maintain consistency with hero frame).
   - The action or revelation happening at this keyframe.
   - One named camera move, its speed, and where it ends.
   - Lens, aperture, lighting (usually inherited from hero frame, unless motivated change).
4. Sequence keyframes with clear transitions (cut, dissolve, fade, hold).
5. Generate each keyframe and the animation between them.
6. Check for consistency (camera position, character scale, lighting direction).
7. Run the quality gate.

## Movement Families

These are the primary camera move categories. Each has a name, a visual effect, a story purpose, and a prompt phrase.

### Dolly Moves

**Dolly In**
- Effect: Camera physically moves toward the subject. Parallax is preserved; depth is maintained. The world doesn't flatten.
- Story Purpose: Intimate revelation. Drawing closer to the subject. Entrance into their space.
- When to Use: Character moments, discovery, focus narrowing.
- When NOT to Use: Action sequences where you need to see the environment; wide establishing shots where retreat is the point.
- Speed: Slow (introspective), medium (narrative progress), fast (threat).

**Dolly Out**
- Effect: Camera physically moves away from the subject. The world expands. Context is revealed.
- Story Purpose: Retreat. Isolation. Revelation of scale.
- When to Use: End of a scene, realization of powerlessness, context expanding.
- When NOT to Use: Moments of increasing intensity; intimate character work where retreat is wrong.

**Dolly Zoom (Hitchcock Move)**
- Effect: Camera moves toward subject while zoom retracts (or vice versa). Subject stays same size; background distorts. Vertigo effect.
- Story Purpose: Disorientation. Psychological shock. Reality destabilizing.
- When to Use: Realization moments, dread, disorientation, perception shift.
- When NOT to Use: Subtle character work; anything that asks for realism; comedy that needs stability.

### Crane Moves

**Crane Up**
- Effect: Camera rises vertically. Perspective reveals context. Monumentality increases.
- Story Purpose: Reveal, transcendence, scale expansion, escape.
- When to Use: Environmental reveals, emotional transcendence, scale of a problem becoming clear.

**Crane Down**
- Effect: Camera descends vertically. Subject becomes smaller. Isolation increases.
- Story Purpose: Diminishment, isolation, insignificance, entrapment.

### Tracking & Following

**Tracking (Lateral)**
- Effect: Camera moves horizontally across the space while maintaining subject in frame.
- Story Purpose: Parallel journey, comparison, revelation of relationships in space.

**Follow (Handheld or Steadicam)**
- Effect: Camera follows the character's movement. The camera is a companion observer.
- Story Purpose: Intimacy, witness, real-time accompaniment.

**Snorricam**
- Effect: Camera is mounted to the actor. The actor moves through a static background.
- Story Purpose: Psychological isolation, disconnection from space, dislocation.

### Orbit

**Orbit (360 Around Subject)**
- Effect: Camera moves around the subject while keeping them centered.
- Story Purpose: Inspection, revelation of surroundings, disorientation.
- Speed: Slow (revelation), fast (dread).

### Static

**Static (No Move)**
- Effect: Camera does not move.
- Story Purpose: Witnessing, surveillance, waiting, compositional control.
- When to Use: Reaction shots, moments of waiting, moments where stillness is power.

### Specialty Moves

**Handheld**
- Effect: Unsteady camera with human operator imperfection.
- Story Purpose: Realism, documentary feel, urgency, human presence.
- Not "shaky" (that is intentional chaos). Unsteady means the operator is present, breathing, reacting.

**Steadicam**
- Effect: Smooth, gliding motion without gimbal technology. Stable but alive.
- Story Purpose: Professional precision, elevated realism, grace.
- Earn it. Use once per sequence, not as default.

**Whip Pan**
- Effect: Fast horizontal pan from one subject to another.
- Story Purpose: Reaction, surprise, attention shift, energy spike.

**Push In / Pull Out**
- Effect: Combination of dolly and zoom balanced to feel like smooth glide.
- Story Purpose: Gentle approach or retreat.
- Caveat: AI models often confuse this with pure zoom. Specify "parallax preserved" to force actual camera motion.

## The Dolly vs Zoom Distinction

**Critical for AI video:** AI models default to zoom (focal length change) when you ask for "push in" or "move closer." This flattens depth and breaks parallax. Force actual camera movement.

**Dolly (Real Camera Motion)**
- Camera moves in 3D space
- Parallax is preserved (foreground and background move at different speeds relative to each other)
- Subject size increases naturally
- Depth is maintained
- Feels like physical presence

**Zoom (Focal Length Change)**
- Camera does not move
- No parallax (everything moves at the same relative speed)
- Subject size increases by lens expansion (flattens perspective)
- Depth appears to compress
- Feels like video surveillance camera

**When to Specify Dolly:**
- Any time you want the camera to physically move toward or away from the subject.
- Write: "Dolly in. Parallax preserved. Push until we see her eyes."
- NOT: "Zoom in" or "Camera moves closer."

**When Zoom is Correct:**
- Narrow depth of field work where isolation is the point.
- Extreme close-ups where parallax is irrelevant.
- Documentary-style observation from fixed position.
- But be explicit: "Focal length changes from 35mm to 50mm. Subject size increases. No parallax."

## How to Direct: The Template

Every animation brief follows this structure. Use it for every keyframe.

```
KEYFRAME [N]: [Keyframe Name]

ACTION
[What is happening in this moment. The story beat.]

COMPOSITION
Shot size. Angle. Subject placement. What owns the frame. Why.

CAMERA MOVE
[Named move.] [Speed.] [Start position.] → [End position.] 
[Parallax preserved / No parallax / Static.]

SPEED
[Slow / Medium / Fast.] [Tempo in seconds if specified.]

ENDPOINT
[Where does the move end? What do we see at the end?]

LENS
[Focal length.] [Aperture.] [Intention.]

LIGHT
[Source. Direction. Quality. Inherited from hero frame or motivated change.]

ATMOSPHERE
[Haze, smoke, dust, rain, steam. Or deliberately absent.]

FORMAT
[Camera body / film format.]

GRADE
[Palette, grain, contrast logic. Inherited from hero frame unless change motivated.]

REFUSAL
[One refusal. What is NOT happening in this keyframe.]
```

## Example Animation Brief

**KEYFRAME 1: ENTRANCE**

ACTION
Rosa pushes the door open. The wind from outside fills the frame. The kitchen, which she expects warm, is cold.

COMPOSITION
Wide. She enters frame right. The kitchen recedes left. The window is bright, a harsh rectangle of light, slightly out of focus. She is silhouetted.

CAMERA MOVE
Static. The frame waits for her entrance.

SPEED
N/A (static).

ENDPOINT
N/A.

LENS
35mm anamorphic, wide open (T1.3).

LIGHT
One practical: the window. Hard light. Midday. No fill. She enters the lit area of frame. The kitchen falls to shadow.

ATMOSPHERE
Wind. Deliberately absent after she closes the door.

FORMAT
ARRI Alexa.

GRADE
Kodak Portra 400 logic (inherited from hero frame).

REFUSAL
Not a beauty shot. Not soft focus. Not slow-motion. Not sentimental.

---

**KEYFRAME 2: RECOGNITION**

ACTION
She closes the door. In the silence, she sees the harbor through the window. Her eyes change. She understands something old and heavy.

COMPOSITION
Close on her face. The window behind her, out of focus, the boat a soft shape of light. She is in darkness. Her eyes own the frame.

CAMERA MOVE
Dolly in. Slow. Start at medium close (nose visible, some room for shoulders). Stop when we see only her eyes and the bridge of her nose. Parallax preserved. The window stays out of focus.

SPEED
Slow. 4 seconds for a 2-second push (slow-motion perception of emotion).

ENDPOINT
Extreme close on her eyes. The world is gone. Only her realization.

LENS
35mm anamorphic, wide open (T1.3).

LIGHT
Hard light from the window, now only grazing her face. The far side of her face is shadow.

ATMOSPHERE
Silence. Wind is gone.

FORMAT
ARRI Alexa.

GRADE
Kodak Portra logic. Crush blacks. Protect her skin tone. One accent (the window light, soft warm).

REFUSAL
Not slow-motion beauty. Not a tear. Not sentimentality. Her realization is visible in her eyes, not in expression.

---

## Camera Presets Table

See `references/camera-presets.md` for a comprehensive table with Move | Effect | When to Use | Prompt Phrase | Speed Baseline.

Use this as a reference. Each preset is mapped to its most common use and includes language that AI models respond to clearly.

## Quality Gate

- [ ] One named move per keyframe.
- [ ] Move is motivated by story or emotion.
- [ ] Speed specified (slow / medium / fast), baseline tempo given if needed.
- [ ] Endpoint stated explicitly ("stop when we see her eyes" not "move closer").
- [ ] Lens and aperture specified with reason.
- [ ] Parallax is preserved in dolly moves (not confused with zoom).
- [ ] No aimless drift or floating.
- [ ] No conflicting moves (dolly in + zoom out unintentionally).
- [ ] Camera position is consistent across keyframes.
- [ ] Lighting direction is consistent (unless motivated by time or scene change).
- [ ] Character scale is consistent across keyframes.
- [ ] No morphing or shifting of composition between keyframes.

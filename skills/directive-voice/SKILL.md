---
name: directive-voice
description: Foundational communication style for all AI video generation work. Teaches how to write director's briefs in imperative, decided language with explicit refusals instead of AI prompt tag soup. Required for every other skill. Triggers on prompt writing, prompt voice, tag soup, director's brief, directive voice, how to write prompts, AI look, prompt engineering for video.
---

# Directive Voice

## Core Doctrine

Every word in a film brief must be a decision, not a wish. AI video generators default to the visual mean because prompt language (tag soup, stacked adjectives, incantations) has no subject, no verb, no refusals. This creates the "AI look."

A director's brief has:
- **Subject.** Who or what owns this shot.
- **Verb.** What is happening, not how it feels.
- **Refusal.** One explicit statement of what is NOT happening.
- **Intention.** Why this choice, not another.

## Field Mapping

Write every brief using these fields. Each field states a decision.

**Asset / Character**
- Cast the actor. Age, condition, hands, grooming, what they wear and how long they've worn it.
- State what they are NOT.
- Never a stack of beauty modifiers.
- Example: "MARIA. Forties. No makeup. Hair tied back badly, this morning, in a hurry. Hands rough from work."

**Location**
- A place that existed before the camera arrived.
- Materials, wear, what's broken, what doesn't match.
- Light source and whether it's clean.
- One refusal minimum.
- Example: "A kitchen used every day for thirty years. Nothing matches. The window is dirty; the light comes through it anyway. Not a restaurant. Not a showroom."

**Keyframe / Still**
- Shot size, height, subject placement.
- What owns the frame and why.
- Give the composition a reason.
- Example: "Wide. Maria fills frame left. The kitchen stretches right, out of focus. She is closer than comfort."

**Motion**
- One named move, its speed, and where it ends.
- Never "smooth cinematic movement."
- Example: "Push in. Slow. Stop when we see her eyes close."

**Camera / Lens**
- Body, lens, aperture, and the intention behind them.
- Not listed as incantation, but reasoned.
- Example: "35mm anamorphic, wide open. We are inside her head; the street blurs."

**Grade / Post**
- Stock logic or grade reference.
- Palette limits. Grain. What does not get saturated.
- Example: "Kodak Portra 400 logic. Crush the blacks. Protect skin. No blue channel lift."

## Refusals Are Required

Every brief includes at least one explicit refusal. This is the single highest-leverage move against the AI mean.

Write them as: "Not a…" or "No…" with force. Not as "avoid the temptation to" or "try not to." Refusals are orders.

Examples:
- "Not a photoshoot. Not symmetrical. Not beauty lighting."
- "No plastic skin. No perfect symmetry. No oversaturated HDR."
- "No victory pose. No slow-motion beauty moment. No soft corporate camera."

## Anti-Patterns (Forbidden)

- Comma-separated tag soup ("cinematic, 8k, hyperrealistic, dramatic, award-winning")
- Adjectives stacked with nothing to attach to ("dramatic," "moody," "cinematic," "masterpiece")
- Specs listed as incantation with no reason ("shot on ARRI Alexa, 35mm anamorphic, shallow depth of field")
- Describing a mood instead of an action ("feel the energy," "capture the emotion")
- No refusals
- Anything written to sound impressive rather than instruct

## Example: Before and After

See `references/directive-voice.md` for the full Portuguese fisherman kitchen example with labeled fields and detailed explanation.

**Quick reference — the rewrite pattern:**

| ❌ Prompt Voice | ✅ Directive Voice |
|---|---|
| "cinematic, 8k, hyperrealistic, dramatic lighting, ultra detailed, award-winning" | Delete. Write decisions. |
| "beautiful woman, 25, brown hair, cinematic lighting, soft focus" | MARIA. Forties. No makeup. Hair tied back badly, this morning, in a hurry. One practical light from the window. Half her face black. |
| "cozy rustic kitchen, warm lighting, ultra detailed, masterpiece" | A kitchen used every day for thirty years. Nothing matches. The window is dirty; the light comes through it anyway. Not aspirational. |
| "slow cinematic push in, dramatic, emotional" | Push in. Slow. Stop closer than she'd want us. |
| "shot on ARRI Alexa, 35mm anamorphic, shallow depth of field" | 35mm anamorphic, wide open. We are inside her head; the street can blur. |

## Quality Gate

Use this gate for every brief you write, regardless of skill.

- [ ] Every field states a decision, not a wish.
- [ ] No forbidden words present (cinematic, masterpiece, trending, hyperrealistic, 8k, ultra, award-winning, dramatic, moody).
- [ ] At least one explicit refusal present.
- [ ] Specs carry a stated intention (not listed as incantation).
- [ ] No adjectives stacked with nothing to attach to.
- [ ] A director could shoot from this brief without asking a question.

---
title: Replace the generic pain word with the one recurring moment (the AI-draft fix)
bucket: 07_Script_Story
source: "Explainer Visual Metaphors & Art Direction Critiques/What Makes a Great Motion Design Script.md"
source_time: "none (blog article, 'What to Do When AI Writes the First Draft')"
tool_target: script
tier: full
use_when: "reviewing any draft the agent itself generated (script v1), before showing it to the user"
style_fit: Fits plain-language + visualise-the-line rules; directly targets our own failure mode (we are the AI drafter).
---

## METADATA
07_Script_Story | Dan Neale, Motion Story (blog) | script v1 self-review

## CREATIVE_INTENT
AI scripts are "grammatically correct, structurally adequate, and completely generic" because "they contain no specific
insight". The customer's real frustration "isn't 'inefficiency.' It's that they spend every Monday morning re-entering
data from a weekend batch process." The differentiator "isn't 'advanced analytics.' It's that it shows the one metric
that predicts churn two weeks before it happens." AI helps with a structural outline, getting past a blank page and
alternative phrasings; it fails at specific customer insight, metaphors that map to this product, the editorial cut, and
knowing what this audience already knows.

## STE_PROCEDURE
1. Underline every abstract pain or benefit noun in the draft ("kos tinggi", "tak efisien", "untung lebih").
2. For each, write the recurring moment it stands for: who, when, which object, how much.
3. Replace the noun with that moment in the line.
4. If you cannot name the moment from the claim ledger, research it or cut the line.
5. Mark outline and phrasing as the only parts kept unchanged from the first draft.
6. Before showing the user, list in `episode.md` which specific insight the script rests on (1 sentence).

## AGENT_EXECUTION
Run on script v1 after the line-novelty cut. Every replacement moment must trace to a claim-ledger row (verified or
marked illustrative). The specific moment usually becomes the hero object's state change in the shot list.
### Worked example
Topic: a home baker selling on WhatsApp (illustrative).
BEFORE: "Ramai peniaga online hadapi masalah pengurusan pesanan yang tak efisien."
AFTER: "Setiap malam pukul 11, dia scroll 40 mesej WhatsApp… cari siapa dah bayar."
Insight on file: "the pain is matching payments to chats at night, not 'order management'."
### Check
- Are there zero abstract pain/benefit nouns left without a moment?
- Does each moment name a time, an object or a count?
- Is the one-sentence insight written in `episode.md`?
- Does each moment trace to a claim-ledger row?

## NOTES
- Visual gaps: none.
- Source's point "understanding what your audience already knows" is handled by
  `low-context-high-intelligence--johnny-harris-writes.md` (+ its curse-of-knowledge addendum).

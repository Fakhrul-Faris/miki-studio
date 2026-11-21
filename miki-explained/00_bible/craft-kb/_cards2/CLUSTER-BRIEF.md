# Cluster + merge brief, set 2

Read `BRIEF.md` (card format, house rules, our artefacts) first. Set 1's `../_cards/CLUSTERS.md` and `../INDEX.md`
show the target format. `MANIFEST2.tsv` lists every set-2 card: path · title · use_when · source.

## Phase A — cluster (one agent per bucket group)
For your bucket(s), read the title + use_when of every card in MANIFEST2.tsv (open a card when the title is unclear).
Write `CLUSTERS2-<group>.md` in set 1's format:

```
## 07_Script_Story
### <topic-slug> — <Topic name>
cards/07_Script_Story/<card>.md
cards/06_Art_Direction/<card>.md
use-when: <one line: the episode moment>
```
- One topic = one technique an explainer-maker would look up. Every card belongs to exactly one topic.
- `[merge]` after the topic name when ≥ 2 cards from **different videos** teach the same technique. Related but
  different techniques stay apart (e.g. "hook word count" ≠ "hook visual").
- A topic sits under the bucket of its first card; member paths keep their own bucket.
- **Craft group only (01–05):** for each set-2 craft card, check set 1's CLUSTERS.md. If it teaches a set-1 topic, mark
  `[fold → <set-1 master or card path>]` instead of `[merge]`.

## Phase B — masters (one agent per ~15 merge topics)
For each `[merge]` topic assigned to you, write ONE master: `../masters/<bucket>/<topic-slug>.md`, using set 1's master
format (`../_cards/MERGE-BRIEF.md`: front matter with `type: master`, `members`, `sources`, `use_when`, `style_fit`;
sections METADATA · CREATIVE_INTENT · STE_PROCEDURE · VALUES BY SOURCE · AGENT_EXECUTION · NOTES), plus set 2's
`### Worked example` (pick the best member example or write a better one — RECIPE-D §3, true mechanisms only) and
`### Check` (union of members' checks, deduplicated, ≤ 6). Never average away disagreeing values: keep both, pick one
for Style D with a reason. Member cards stay untouched.

## Phase C — fold addenda and [fold] cards
For each file in `addenda/` (its first line names the target) and each `[fold → …]` card:
- Target is a **master**: add the source to `sources`/`members`, add its rows to VALUES BY SOURCE, fold new steps into
  STE_PROCEDURE (mark them "(from <source>)"), add conflicts to NOTES. Keep the master's Style D pick unless the new
  source gives a reason to change it — then say so in NOTES.
- Target is a **single card**: append at the end `## ADDENDUM — <source title>` with the addendum's new values/steps.
  Don't rewrite the card's own sections.
- Values that break a house rule stay flagged ⚠ and never become the Style D pick.
Log every fold in `fold-<agent>.done.md`: addendum → target → what was added.

## Rules
- Don't invent techniques, values or raea props. Don't delete or rename any card.
- Final reply: "done" + counts (topics / merge topics / masters / folds).

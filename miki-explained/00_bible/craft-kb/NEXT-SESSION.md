# Next session — Craft KB loose ends (set 2 finished 2026-11-21, commit 8c98013)

Read first: `00_bible/WORKING-RULES.md`, `LESSONS.md`, `craft-kb/README.md` (set 2 section). The set-2 prompt that
used to live here is in git history (commit 8c98013^).

Budget rule (memory `agent-fanout-budget`): no subagents for these; do them directly.

## Tasks
1. **raea stills (2 items)** — render one still each and update the card's NOTES with the result (works / doesn't +
   the fallback):
   - gradient-filled text: the gradient-sweep text card from list ccrf (`grep -rl "gradient" cards/01_Animation_Motion
     cards/09_UI_Motion | xargs grep -l "verify"`).
   - image element in the shame-cut animatic card from list c07L1 (`grep -rl "shame" cards/`).
   Load the `raea-bevy` skill first; renders go to the scratchpad.
2. **11 cards without `## NOTES`** — add a NOTES section (visual gaps / conflicts / "none"). List them with:
   `for f in $(cut -f1 _cards2/MANIFEST2.tsv); do grep -q '^## NOTES' $f || echo $f; done`
3. **Ask the user**: remove `CLAUDE_CODE_EXPERIMENTAL_CODE_MODE` from `~/.claude/settings.json` (v2.1.281 ignores it)?
   Push branch `miki-explained-series` to the `org` remote too?
4. Commit the fixes (ask before pushing).

## Not now
The checklist proof (drafts without vs with `00_bible/checks/SCRIPT-CHECK.md` + `SHOT-FRAME-CHECK.md`) runs at the
next episode, not here.

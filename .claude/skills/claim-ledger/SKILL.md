---
name: claim-ledger
description: Fact discipline for a Miki Explained script — every number, name, cause and visual encoding gets a row with status verified / inferred / conceptual and the source actually opened; plus the "Not claimed" list and the before-posting ⚠ list. Use when drafting or revising any script, choosing the frame-0 angle, putting a number or quote on screen, writing the post caption's sources, or when the user asks "is this true", "source?" or "fact-check".
---

# Claim ledger

Template: `miki-explained/00_bible/experiments/X1-oss-upgrade/claim-ledger.md`. RECIPE-D § 2 is binding underneath it.

1. **Read at source.** Every number or quote comes from a page you opened and read (WebFetch the article, not the
   search summary). If the page won't load (EX45: maybank2u timed out every time), the row stays ⚠ and goes on the
   before-posting list for the user; say so plainly in the reply.
2. **Pick the angle from the facts, not the other way round.** If the angle needs a number nobody published (EX45: "cash
   is costing you" had no per-stall figure), stop, tell the user, and propose an angle the sources carry.
3. Copy the table into `episode.md` as `## X1 claim ledger` before the shot list:
   `| # | Claim (as said / shown) | Kind | Status | Source (primary first) | On screen as |`
   - Kinds: number · name · cause · sequence · geometry · visual encoding.
   - Status: **verified** (say it plainly) · **inferred** (qualify: "about", "likely") · **conceptual** (draw as an
     example; "ilustrasi"/"illustration" on the frame).
   - Calculations written out ("1.61 ÷ 0.35 = 4.60 → about RM4.60").
4. **Not claimed:** list what the sources do not support so the script can't drift into it (EX45: RHB's rates, "every bank",
   the RM30 bonus).
5. **Quotes:** quote marks only round words you verified, in the language they were said; a translation is not a quote.
6. **Invented UI / documents / places:** marked illustrative on screen; no real company logo you haven't sourced and
   credited (`02_kit/brand/logos/CREDITS.md`).
7. **Before posting (⚠):** keep a short list in `episode.md` status (facts to re-check on the day, licences such as music)
   and repeat it in the final hand-off message.
8. Run `tools/x1/copy_check.py` on the script table; the post caption's "Sumber/Sources" line is built from this ledger.

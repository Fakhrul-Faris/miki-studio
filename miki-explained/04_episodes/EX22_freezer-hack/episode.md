# EX22 — The Freezer Password

Status: story ✓ → script v2 ✓ → voice ✓ (31.0 s) → gates 1–3 ✓ → full render ✓ → final ✓ (export/EX22.mp4, 31.0 s, 60 fps, −18.3 LUFS, 2026-11-06; Telegram msg 380) → posted
Voice: Nathan, narrator, `v4k7NzxipnuJNJtrKxob`

Format: **short (under 30 s)** · story type **news explainer** (new; user 2026-11-05) · look **EX14 smooth isometric**
(user's choice for this one: a dark isometric world, greys + one green accent, Isotype pictogram people, one continuous
camera, 60 fps; EX15 captions — the format they were born in). Figures pose only. Global.

**Angle:** the scariest part isn't the attack, it's how easy it was. Hundreds of supermarkets ran their freezers on
controllers left reachable from the internet, with a hidden login whose password was the date.

## Sources

- **What happened (France, night of 11 Oct 2026):** attackers took remote control of refrigeration in hundreds of French
  supermarkets and warmed fridges and freezers, up to **50 °C**, spoiling food and starting fires at several stores.
  Counts differ: AFP reported 300+ Intermarché and Netto stores, Reuters about 150; Carrefour 80, Coopérative U 80 of its
  2,000 stores, Monoprix about 30. Les Mousquetaires' head expected losses of **tens of millions of euros** —
  [Al Jazeera](https://www.aljazeera.com/news/2026/10/13/unprecedented-cyberattack-hits-french-supermarkets-causing-food-losses),
  [TIME](https://time.com/article/2026/10/13/france-cyber-attack-cybersecurity-refrigeration-supermarket-food-security/),
  [The Register](https://www.theregister.com/security/2026/10/13/cyberattacks-crank-french-supermarket-refrigeration-systems-up-to-50c/5302784).
  The script says **"hundreds"**, not a number.
- **How:** Danfoss refrigeration controllers (AK-SM800 / AK-SC355) with web interfaces exposed to the internet; a hidden
  login: "The username is admin and the password changes every day automatically to.. the current date" (Kevin Beaumont,
  security researcher); "a zero-skill thing to pull off"; "easily scriptable". The AK-SM800 reached end of life in May
  2021; Danfoss shipped a fix (4.3.1) for the AK-SM800A in Aug 2025, unpatched sites stayed exposed —
  [The Register](https://www.theregister.com/security/2026/10/13/cyberattacks-crank-french-supermarket-refrigeration-systems-up-to-50c/5302784),
  [Beaumont on Mastodon](https://cyberplace.social/@GossiTheDog/117429502412235079), [Wikipedia summary](https://en.wikipedia.org/wiki/2026_French_supermarket_refrigerator_hack).
- **Second wave (2 Nov 2026):** refrigeration hit in supermarkets across Europe: Belgium (Delhaize, Carrefour, Spar),
  Luxembourg, the Netherlands, Sweden (Coop, ICA), Estonia, Ireland, Portugal (7 Intermarché stores), later Finland and
  others — [Help Net Security](https://www.helpnetsecurity.com/2026/11/02/european-supermarkets-refrigeration-units-cyberattacks/),
  [The Hacker News](https://thehackernews.com/2026/11/second-wave-of-cyberattacks-hits.html).
- **Who:** unknown. Analysts range from "kids messing around" (Ken Munro) to state actors; the script names no one.
- ⚠ Live story: re-check the counts and any attribution the day before posting.

## Script v2 (short; ~85 words / ~30 s; user 2026-11-05: lead with the business loss; L05 "imagine this happened to…")

| Line | Beat | Voice |
|---|---|---|
| L01 | Hook (the loss first) | One night. Tens of millions of euros in losses. Hackers turned hundreds of French supermarket freezers into ovens. |
| L02 | Stakes | Fifty degrees Celsius. Food thrown out. Fires in some stores. |
| L03 | Mechanism | And it took no genius. The freezer controls were online, with a hidden login. The password was just the date. Change the day, change the password, and anyone who knew the trick could get in. |
| L04 | Twist | On November second, it spread across Europe. |
| L05 | End (imagine it's you) | Now imagine it's your shop. No break-in. Nothing stolen. Just a box you plugged in, and forgot. |
| L06 | Follow | Follow Meikigo for more. (reuse) |

Checks: the money first (a business page) ✓ — "tens of millions of euros" is the expected loss for one chain's group
(Les Mousquetaires' head, via Al Jazeera/TIME), said as "losses", not a total for all stores · the absurd image in the
same line ✓ · the password detail held to L03 ✓ · the viewer turn at the end ✓ · sound-off hook text:
"TENS OF MILLIONS LOST IN ONE NIGHT."

## Voice

Nathan L01–L05, L06 reused. Tightened for a short (`--fps 60 --gap 0.2`; pauses over 0.45 s cut to 0.3 s): **31.0 s**
including the follow line (the story ends at 29.3 s), 1,858 frames at 60 fps.

## Motion language

| Property | Choice |
|---|---|
| Look | EX14 smooth isometric: near-black world, greys, warm off-white type, **one green** = the hack (its signal, its lines, the login) |
| Camera | orthographic isometric, **one continuous camera** (EX14's grammar), glides and swoops eased in-out; no cuts |
| Figures | Isotype pictograms, posed only |
| Base unit | 0.4 s; objects slide or grow in, never pop |
| Wow | one: the login screen — the password field fills with a date, a calendar page flips, the field changes with it |
| Sound | sfxsynth: a soft tick on each number, a hum as the freezers warm, a typing burst on the login, one low hit on "across Europe", nothing on the follow card |
| Captions | EX15 `capBlock`, 60 fps |

## Shot list v1 (one continuous isometric camera, 60 fps, 31.0 s)

| # | Words (s) | What happens | Camera |
|---|---|---|---|
| 1 | "One night" 0.2 · "tens of millions" 0.9 · "losses" 2.4 | frame 1 already moving: one supermarket at night, its lights on; a loss counter beside it rolls up "− €10,000,000 … tens of millions" in off-white; hook text "TENS OF MILLIONS LOST IN ONE NIGHT." | top-down swooping into iso |
| 2 | "Hackers" 3.1 · "freezers" 5.2 · "ovens" 6.0 | the roof slides off: the freezer aisle; a thin green signal line arrives from off-screen and touches each freezer; their frost turns to heat haze, a thermometer climbs | push into the aisle |
| 3 | "50 degrees" 6.9 · "thrown out" 8.6 · "fires" 9.1 | the thermometer reads 50 °C; boxes of food slide into a skip; pull back: the store is one of a grid of hundreds across a flat map of France, a few with small flame icons | long pull-out |
| 4 | "no genius" 11.4 · "online" 13.1 · "hidden login" 13.9 | glide to one freezer's controller box on the wall; a cable runs from it up to a globe: online; a login panel opens above it, USERNAME: admin | glide and rise |
| 5 | "just the date" 16.1 | **the wow:** the password field fills with a date (shape only: DD·MM·YYYY, no real digits); a desk calendar beside it | hold, slight push |
| 6 | "Change the day" 16.7 · "anyone" 18.8 · "get in" 20.5 | the calendar page flips and the field changes with it; then a row of pictogram people at laptops, each with a green line to a different store | track along the row |
| 7 | "November second" 21.3 · "across Europe" 22.9 | rise high: the map widens from France to Europe; green lines run out to Belgium, Luxembourg, the Netherlands, Sweden, Estonia, Ireland, Portugal | rise and widen |
| 8 | "your shop" 24.9 · "No break-in" 25.7 · "Nothing stolen" 26.5 · "a box you plugged in" 27.6 · "forgot" 28.8 | swoop down to one small corner shop: the front door locked (a padlock), the till full and untouched; then the back room: a small box on a shelf, its green light blinking, one cable to the wall; dust settles on it | swoop down, then push into the back room |
| 9 | "Follow" 29.6 | the follow card over the held frame | hold |

Camera ideas beyond the brief: frame 1 already in motion (EX14 opener); a scale arc of one store → France → Europe →
your shop, so the ending lands back at human size; the login panel built into the world rather than a flat overlay.

## Experiments

Short · news explainer (1st) · EX14 smooth isometric (revisit) · END-reframe · 60 fps

## Post

Live story: re-check counts and attribution the day before posting. No blame on any vendor or country.

**Caption:**
```
One night. Tens of millions of euros in losses. 🧊🔥

Hackers turned hundreds of French supermarket freezers into ovens — up to 50 °C. Food thrown out. Fires in some stores.

It took no genius: the freezer controls were online, with a hidden login whose password was just the date.

On November 2nd it spread across Europe.

Now imagine it's your shop. No break-in. Nothing stolen. Just a box you plugged in, and forgot.

#business #cybersecurity #smallbusiness #retail #news
```

**Pinned comment:**
```
Is there a box in your shop you haven't updated in years? 👀
Sources: Al Jazeera & TIME (13 Oct 2026: hundreds of French stores, up to 50 °C, losses of tens of millions for one group); The Register & security researcher Kevin Beaumont (exposed refrigeration controllers, a hidden date-based login); Help Net Security & The Hacker News (2 Nov wave across Europe). The password shown is illustrative.
3D models (CC-BY 3.0, via Poly Pizza): Supermarket Freezer by Dave Edwards; Calendar by Tomáš Bayer; Cash register by Poly by Google.
```

- Turn on the AI-generated content label (synthetic voice, code-built 3D).
- Posted: _date_ · Link: _

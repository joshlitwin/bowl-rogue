# Room brief: rethink the bowling construct (round 2, 21 November 2026)

You are one designer in a room of five. You work blind: do not read anything else in `docs/pitches/round-2/` except this brief.

## Read first
- `CLAUDE.md` (rules Josh has set; they bind every pitch).
- `docs/IDEATION.md` sections 1 to 4: where the game is, why the loop collapses (six failures), Josh's own notes, seed directions. The seeds are starting points, not a menu. You may take one, mix them, or ignore them.
- Optional: `docs/STATE.md` (history of every lab and what Josh said), `docs/pitches/*.md` (four earlier blind pitches), `docs/playtest/2026-11-21-ten-pin-lab.csv` (his last run), the sim in `labs/ten-pin/index.html` between `//SIM-START` and `//SIM-END`, and `/tmp/shots/ten-pin.png` (how the lab looks now on a 390x700 phone).

## Fixed
- The throw stays: drag the ball's start, bend handle and aim ring, READY, stop the needle in the green. Same feel, same camera looking down the lane, same speed. No outline that shows the result before the throw.
- Portrait phone, no scrolling, minimal text, show don't tell, no text explaining misses.
- The hall looks (Rec Room, After Close, Computer, Arrival), the win card, the shop's separate trays and the small / big / boss level structure are liked and can stay.
- No cute or chibi art, no effect clutter. Original designs only: nothing that copies a known game's characters or sprites.

## The bar
Break at least two of the six failures in IDEATION section 2, and say which and how. Josh's test for any lab: did the best throw change between balls; did purchases change the play; was there a decision he had to think about.

## Deliver two files
1. `docs/pitches/round-2/<slug>.md`, one page (under about 700 words), in this order:
   - **Name** (descriptive, says what it does) and a one-sentence idea.
   - **The decision before each ball**: what the player weighs.
   - **Worked example with numbers**: one concrete board, two or three candidate throws, what each pays now and what it sets up.
   - **What you buy**: 6 to 10 example pieces, each one line. Say which ones change what the best throw is (not just multiply it).
   - **How a boss works**: one or two bosses, how you see them coming, and what you would buy to prepare.
   - **What it looks like**: the lane, the pieces in the shop, how it changes over a run.
   - **Failures broken**: which of the six, one line each.
   - **Smallest lab**: one mechanic, one game or one level long, built on `labs/ten-pin/` or `labs/five-pin-bosses/`, throw unchanged. What the lab logs and what result would kill the idea.
   - **The risk**: the assumption most likely to be wrong.
2. `docs/pitches/round-2/<slug>.svg`: one picture of the moment of decision on the lane, as the player would see it. `viewBox="0 0 180 300"`, flat shapes, no text except at most two short labels, palette close to the Rec Room look (warm wood lane `#c8843e`/`#a8652a`, dark surround `#2a1a12`, cream pins `#f2e6cf` with red neck `#c23a2a`) unless your idea changes the look. Keep it under 8 KB.

Reply with the two file paths and your one-sentence idea.

# State of the design

Last updated 21 November 2026.

## What exists
- **Five-Pin Run** (`game/`): six games of three frames, three balls a frame. The rack of five pins is the build: each spot holds a pin type with a trigger effect, and a ball scores (points of pins that fell) × Mult. A shop after each won game sells pins and gear. The hall changes a little every game and goes "After Close" at game 4.
- **Throw Lab**, **Big Rack Lab**, **Ball Bag Lab**, **Changing Field Lab**, **Combined Lab**, **Five-Pin Rules Lab**, **Five-Pin Variety Lab** (`labs/`).
- Everything is playable from https://joshlitwin.github.io/bowl-rogue/ (GitHub Pages, `main` at the root, switched on 21 November).
- **Four blind pitches** (`docs/pitches/`): Stacked Spots, The Bag, The House Lays the Lane, The Scoresheet.

## Decided
- Five-pin bowling, pins worth 5, 3, 3, 2, 2 by spot.
- The throw: drag ball, bend handle and aim ring (only the touched one moves), press READY, stop the needle. Green zone in milliseconds. No text explaining misses. A faint line shows the previous ball's real path.
- Camera looks down the lane; a top-down view is on a toggle.
- Look: Rec Room '74 as the base, After Close from game 4, then stranger (the scoring computer takes over, something arrives above the hall). The game-4 transformation is a highlight and stays.
- No bowler on screen.
- Modelled on Ultrapool: the bowling is "a bit of skill", the upgrades are the game.
- UI: no scrolling, minimal text, the shop shows buy-then-place through layout.

## The problem found on 20 November
In Five-Pin Run, Josh found one strike line and threw it 40 times out of 42. Strikes are always the best outcome and compound, so nothing during play is a decision, and shop choices all push toward more strikes. In his words, the game does not escalate, does not force trade-offs, and never makes you adjust a build.

Root cause: the rack resets every time it is cleared, so there is never a board to manage.

## What the three labs showed (21 November)
- **Big Rack Lab:** "Not that fun, but ten-pin seems more interesting than five-pin. Pins feel a bit too close." Half the balls were single-pin mop-up of the stone corner pins. The order payoffs never came into play: he bowled for most pins and Mult stayed at 1.
- **Ball Bag Lab:** "More interesting but still a tad clunky." Clunky meant picking from nine balls and working out what each does. The conditional balls (Dart, Spare, Reset) all misfired.
- **Changing Field Lab:** "Kind of interesting." Every new field made him stop and think (about 18 seconds on a first ball, against 2 in the main game). Oil surfaces broke the bend handle: the aim ring no longer marked where the ball goes.
- **Across all three:** the pins that fell matched what the drawn line predicted on nearly every ball, and he could pick off single pins on demand. So aiming at a chosen partial result is feasible.

## Direction Josh set after the labs
- Keep balls and pins with conditions you have to read, **provided the throw's result is easier to predict** and the pieces are **bought and chosen one at a time**, not handed over all at once as in Big Rack Lab. Complexity is fine if it is introduced iteratively.
- More pins than five is worth pursuing, spaced wider.
- Different rack shapes and obstacles are worth pursuing.

## Combined Lab: rejected (21 November)
Josh played it: "unplayable and way too big plus not fun". The size and feel were off; the outline took away finding the right shot; the balls behaved super weirdly; no spark of fun. Five-Pin Run is the base to build on. Traps to avoid from here: changing size, camera or feel; showing the result before the throw; balls that behave strangely.

### What Combined Lab was
`labs/combined/`, merged to `main` and live at https://joshlitwin.github.io/bowl-rogue/labs/combined/. One game of five frames, three balls a frame, no shop.
- **Racks:** ten shapes, two each of 6, 7, 8, 9 and 10 pins; a game deals one of each count in a random order. Three have posts (Ring Round a Post, Gate Posts, Ten Behind a Post), two have a rail and come left- or right-handed. Pins stand at least 77 lane units apart (Big Rack: 68). Pins are worth 2, 3 or 5. The camera is pulled in: a short wall strip and a flatter view, so the deck gets more of the screen. The aim ring sits just in front of the front row (`G.EY` = 285).
- **Hand:** the bag starts with two each of Wide, Heavy, Dart, Burst and Ghost. Three are dealt each frame; pick one per throw. Heavy is now big as well as heavy (radius 13, weight 9; in Ball Bag it was radius 10, weight 7), and Burst's reach is 100: the bot found that was needed for every rack to have a first-ball clear. Dart no longer triples its pin, and Heavy no longer bends half as far (the throw is unchanged).
- **Outline:** while aiming, the pins the drawn line takes with the selected ball and a perfect release are outlined, and the info strip shows what that ball would score. It runs the same sim on a copy of the rack.
- **Between frames:** three pieces offered (at least one pin and one ball when available), take one or nothing. Pins: Lone (×3 if it falls alone), Domino (+6 if a pin knocks it), Wallflower (+1 Mult while it stands), Closer (×2 on the clearing ball), Anchor (+8 on the frame's last ball). Each takes a set spot in every later rack; the offer shows the next rack with the pin in its spot. Balls: Sweep (×3 if it clears), Pick (×4 if exactly one pin), Chain (+1 Mult per pin knocked by a pin); a taken ball is first in the next hand, then joins the bag.
- **Scoring:** points of pins that fell × Mult. No strike bonus. A cleared rack is set again for the frame's remaining balls.

What the bots found (`npm run combined-bot`, `npm run combined-flow`):
- Every rack layout has a first-ball clear, but only with Heavy (or a conditional ball, which rolls like the house ball). Wide, Dart, Burst and Ghost never clear a full rack. A hand has a Heavy about half the time. Gate Posts is the hardest: 2 clearing lines out of about 8,900 tried.
- No single line clears more than 2 of the 12 rack layouts.
- Outline against pinfall: with the needle in the green, 180 of 180 bot balls fell exactly as outlined. With a 100 ms timing spread, about two thirds matched (64% and 66% over two runs); every mismatch was a release outside the green.

## Five-Pin Rules Lab (built 21 November, not yet played by Josh)
`labs/five-pin-rules/`, a copy of Five-Pin Run with one rule change and new targets. Throw, camera, balls, pins, shop and hall are untouched.
- **A clear ends the frame** (as in real five-pin): a strike is the whole frame, a spare ends it on ball two. The rack no longer resets mid-frame.
- **No Mult for strikes or clears** (was +1 and +0.5). Lane bell now reads "Strikes get +1 Mult"; Crown is unchanged.
- **Targets** 35, 60, 100, 160, 250, 400 (were 50 to 650), set from `npm run rules-bot` medians at a 100 ms timing spread.
- No outline, no new balls, no new pins.

What the bot found (`npm run rules-bot`: perfect release over 1,071 lines, standing pins put back on their spots between balls):
- Plain rack: every way of clearing a frame scores 15, so striking is no longer better, only quicker.
- Builds now pull different ways. Wallflower, Buddy and Sweeper want the pins spread over two or three balls (Wallflower L1 on a corner: 28 a frame against 15 for a strike; gold head, two Wallflowers and a Buddy: 70 against 20). Leader, Picket, Crown and Bell still want strikes.
- Late on, a strike build with grown Trophies runs away (leader 2, gold 2, crown 2, two Trophies at +20, Bell: about 488 a frame against 197 for a matching picking build). Trophy's unlimited growth is the cause; not changed yet.
- A whole game can now be as short as three balls.

### Josh's verdict (21 November)
One run, lost at game 5 (log in `docs/playtest/`): "Didn't feel all that different." He bought only strike pins (Leader, Crown, Tip jar, Wing, Trophy), so the rule never bit; 13 of 21 balls were strikes on one line. He asked about buying different balls, more pins and changing the pin layout, all at once.

## Five-Pin Variety Lab (built 21 November, not yet played by Josh)
`labs/five-pin-variety/`, a copy of Five-Pin Run (its rules and targets, not the Rules Lab's) with three changes. Throw, camera, ball roll and pin spacing are untouched; each change can be switched off from the landing page (`?layout=0`, `?balls=0`, `?spots=0`).
- **Moving rack.** Game 1 is the standard rack; from game 2 each game picks a different layout: Shifted left, Shifted right (whole rack 16 px), Headpin forward (30 px), Headpin left, Headpin right (22 px across, 20 forward). No pins are ever closer than in the standard rack (61 px). Staggered, Wide and Leaning layouts were tried and dropped: Josh's own strike lines still struck on them.
- **Balls.** From the shop after game 2, one card offers the Big ball (wider) or Heavy ball (heavier), $6; it replaces your ball and shows in the rack sheet's corner. Big ball left the gear list.
- **Extra pins.** From the shop after game 3, one card offers a sixth pin, back centre (between the corners, worth 3), then a seventh, left flank (headpin row, in line with the left corner, worth 3), $5 each. A deep-centre spot was tried and dropped: three pins in a column hide each other on the lane camera.
- **Log** adds `layout` and `shop_before_game` (every offer set seen, rerolls included, and what was bought).

What the bot found (`npm run variety-bot`, perfect release over 7,371 lines):
- Josh's strike lines from the logs strike on 0 or 1 of 9 on Shifted left/right and Headpin left/right, 3 of 9 on Headpin forward.
- Every layout keeps plenty of strike lines (5 pins, house ball: 463 to 803 against 790 standard), but few of the standard ones (9 to 29 on four layouts; 403 on Headpin forward).
- Big ball strikes on more lines than the house ball everywhere; Heavy on fewer (668 against 790 standard). Heavy is the weaker strike ball; not tuned.
- Seven pins cut strike lines to about a quarter on the standard layout (191 against 790).

### Josh's first run (21 November, log in `docs/playtest/`)
Lost game 5. Game 1: 9 strikes on one line. Each new layout took one to three balls to find a new strike line, then he kept it (Shifted right: 7 strikes in a row from the other side of the lane). Game 4 (Headpin forward): his old line struck at once. Game 5 (Headpin left, seven pins, a newly bought Big ball): no strike in 12 balls. Feedback: THROW sits too low and he hits the iPhone home bar; sell balls, pins and gear separately so spending is a choice; let him buy the next rack layout.

### Shop split (21 November, built on `lab/variety-shop`)
- Pins: three, random, the only thing Reroll changes.
- Balls: two on the shelf at $10; they stay until bought; a bought one is replaced next shop. Pool: Big, Heavy, Light (lighter), Small (narrower); physics only. Strike lines on the standard rack: Big 994, Light 846, house 790, Heavy 668, Small 625; none of Josh's own lines strike with any of them.
- Gear: one per shop, new each shop, not refilled.
- Next rack: one layout drawn free, two others at $3; the rack map previews the chosen one.
- Extra pins: an empty dashed spot on the rack map, $6 then $8.
- Cards show name, picture and price; tapping shows what it does in the strip, with Buy for balls, gear and spots (pins still go to a spot).
- THROW and the sheets' bottom buttons sit at least 22 px above the screen edge (more if the phone reports a safe area). Not yet in `game/`.

## Next
Josh plays Five-Pin Variety Lab and pastes the log. Questions: does re-finding the line each game feel like play or a chore; does a different ball or a bigger rack change what he does; if it's not fun, which of the three to switch off.

## Earlier next (Rules Lab)
Josh plays Five-Pin Rules Lab and pastes the log. Questions: does choosing between striking and picking pins off feel like a decision; do games feel too short when you strike; are the targets right.

## The plan the Combined Lab came from
- Each frame is a new rack: a different shape and pin count (six to ten), sometimes posts or a rail.
- A hand of three balls dealt from a small bag.
- While dragging, the pins the line will take are outlined for the selected ball, so choices are between visible outcomes.
- Start with plain pieces; add conditional pins and balls one purchase at a time.
- No stone pins, no "refill only when empty", no surfaces that change the hook, no strike bonus that compounds.

If that is fun, the shop comes back on top of it.

## Open
- How many pins, and how wide a rack fits the lane on a phone.
- Whether the shop sells pins, balls, or both.
- Target curve. With strikes on nearly every ball the last run scored 86, 313, 855, 1179, 2538, 2952 against targets of 50, 100, 180, 300, 450, 650.
- Which ideas to take from the pitches: stacks of pins per spot, pins that break after falling four times, lane tiles the route triggers, a scoresheet of patterns.
- Known rough edges in Five-Pin Run: Trophy pin scales without limit; Sweeper, Wallflower and Buddy are dead weight when strikes are reliable; the gear icons are rough.

## Not tested anywhere
Real touch input is only ever tested by Josh playing on his phone. Animations are checked at fixed moments in headless Chrome, not watched running.

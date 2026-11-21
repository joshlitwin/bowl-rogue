# State of the design

Last updated 21 November 2026.

## What exists
- **Five-Pin Run** (`game/`): six games of three frames, three balls a frame. The rack of five pins is the build: each spot holds a pin type with a trigger effect, and a ball scores (points of pins that fell) × Mult. A shop after each won game sells pins and gear. The hall changes a little every game and goes "After Close" at game 4.
- **Throw Lab**, **Big Rack Lab**, **Ball Bag Lab**, **Changing Field Lab**, **Combined Lab**, **Five-Pin Rules Lab** (`labs/`).
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

## Next
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

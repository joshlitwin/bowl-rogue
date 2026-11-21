# State of the design

Last updated 21 November 2026.

## What exists
- **Five-Pin Run** (`game/`): six games of three frames, three balls a frame. The rack of five pins is the build: each spot holds a pin type with a trigger effect, and a ball scores (points of pins that fell) × Mult. A shop after each won game sells pins and gear. The hall changes a little every game and goes "After Close" at game 4.
- **Throw Lab**, **Big Rack Lab**, **Ball Bag Lab**, **Changing Field Lab** (`labs/`).
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

## Next: one combined lab
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

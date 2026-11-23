# Reading pins in play, and rules a new player can follow (22 November 2026, branch `ui/readable-pins`)

From Josh's runs that evening: "Still a bit tough to remember which pins does what… so hard to execute a meaningful strategy in the round", and some descriptions don't read clearly. UI and text only. Rules, numbers, the throw and the save are unchanged.

## Why remembering fails
Knocked-down pins return in new columns every ball, so "the 9 pin" is never in the same place twice. During a game the band colour is the only thing that identifies a pin. In run 6 the build was one power on each of six pins, so there were six colours to keep in your head.

## Read a pin on the lane
- While aiming, a **still tap** on a standing pin opens a bubble beside it: the pin's type, its slots, what it's worth now, and each power's full rule. A white ring marks the pin. The bubble sits below the pin, or above it when there's no room below.
- **Spark** also says whether it would trigger this ball: "Spark is live: knock it down this ball" or "Spark is spent until it's knocked down and returns".
- A drag from the same spot aims exactly as before: a touch only counts as a tap if it moves under 3 lane pixels within 0.45 s. The next touch, or the throw, closes the bubble.
- The first-time "powers on the lane" tip now says "Tap a pin to see what it does." (It has already fired for Josh; **Tips again** in Your rack replays it.)
- Checked by `node tools/peek-test.js` (real mouse events in headless Chrome at both sizes). Touch on a phone is untested.

## Every readout lists full rules
A pin's readout (lane bubble, shop rack, Your rack, run-over rack) now gives each power its full rule on its own line, not the short label ("+1 × fresh" and the like). Offers read their text from the current rules, so a shop restored from a save shows the new wording. In Your rack, while a pin is being read, the power counts row is hidden so the rules have room.

## Text pass
Rewritten so nothing depends on a word the game never defines:
- No "fresh". Spark is now "Knock it down on its first ball up: that ball scores ×2 (a strike ×3)."
- No bare "1 more ×". Lane bell is "Strikes are ×3, not ×2"; Crown is "A strike is ×3, not ×2, if it stood on the front two rows"; Full front is "A strike's ×2 goes up 1 for each front-row pin it takes, up to ×6".
- "Comes back" becomes "returns", always tied to being knocked down (Head start, Shield).
- No "pin spacing". Bomb reaches "the pins next to it", then "up to 1½ spaces away" and "2 spaces away".
- Lines saying what more of a power does now read "Twice on a pin: ×4. Three times: ×5." instead of "Again: ×4, ×5".
- Timing gear says what it does to the bar or needle, without milliseconds or fractions.
- Bolted rack: "Only the ball knocks pins down. A pin hit by another pin stays up." Rising tentacle: "A tentacle rises at the back and advances a row each ball. It stops the ball."

## Shots
`peek-*` (lane bubble: front pin, back pin, a pin with three powers), `shop-rack-three-*`, `rack-three-*`, `rack-three-back-*`, `build-*`, at 390x700 and 360x600, from `tools/ui2-shots.js`. No scroll or clipping at either size, including every shop offer bubble with the longer texts.

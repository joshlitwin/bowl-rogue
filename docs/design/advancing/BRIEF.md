# Team brief: pieces for the Advancing Ten-Pin run (22 November 2026)

You are one of four design teams. You work blind: do not read anything else in `docs/design/advancing/` except this brief.

## The mechanism (built, playable at `labs/advancing-rack/`)
Read `docs/STATE.md` sections "Round-2 pitches" and "Advancing Rack Lab" first. In short:
- Ten pins, one board per game, ten balls a game. The throw is unchanged (start, bend, aim ring, needle; read `CLAUDE.md`).
- After each ball, pins still standing step one row (60 lane units) toward the bowler and **double** in value (1, 2, 4, 8, 16). Pins that fell come back worth 1 at the back row, as far back as they fit, in random columns (columns are half a pin spacing apart, -3..3; rows 0 at the back to 4 at the front). So the board's shape changes every ball.
- A pin that would step past the red line (in front of row 4) **breaks through**: it costs its value and comes back at the back.
- A strike (every pin on the board down) scores ×2.
- Bot result: with doubling, a patient player (takes the ripe front pins, leaves others to grow) beats a striker by about 25% in normal games, with more risk. Linear growth made every style score the same.
- Aiming (measured in the sim, `docs/pitches/round-2/critic.md`): a player can aim at a side, or at keeping one pin standing (windows of 7 to 10 units). They cannot aim at an exact set of pins (about 1 unit) or at where a knocked pin ends up (dice).

## The run Josh wants
"Our version of the ten-pin approach with this mechanism": the Ten-Pin Lab's run (`labs/ten-pin/`: four levels of small, big, boss; a shop after each won game with separate trays for pins (3 random, reroll), balls (2 on a shelf, $10, stay until bought) and gear (1 per shop); pay $5/$6/$8 per win plus up to $4 for going over; hall looks Rec Room, After Close, Computer, Arrival) rebuilt on the advancing board. Josh's own rules for it:
- Strikes stay possible, but building around them is a choice that trades off letting pins mature to higher points.
- Keep the Balatro structure with bosses, "so any single method build can get killed on a particular antagonistic boss for that strategy".
- He liked the invaders pitch (Hold the Lane: walkers, sentries, tentacles, cracks) and the ripening pitch (Holdover Rack: a bag of pins you build).

Old Ten-Pin pieces, for reference only (most were spot-based and several never fired): pins Gold, Wing, Domino, Twin, Trophy, Leader, Wallflower, Sweeper, Crown, Bomb, Tip jar, Picket, Buddy; balls Big, Heavy, Light, Small (physics only); gear Steady hands, Slow breath, Strong wrist, Lane bell, Third ball. Pins no longer sit on fixed spots: they move and return, so a bought pin is a pin in your set of ten that comes back at the back each time it falls.

## Rules every piece must respect
- `CLAUDE.md`: throw feel unchanged, no scrolling, minimal text, show don't tell, descriptive names, no cute art, no effect clutter.
- Pieces must be readable on a 180x300 pixel lane: a pin type is told apart by its body colour and neck, nothing more.
- Buildable in the sim between `//SIM-START` and `//SIM-END` in `labs/advancing-rack/index.html`: say how (a constant, a field on a pin, a rule in `advance()` or `scoreAdv()`).
- Prefer pieces that **change which throw is best** or which pins you leave, over pieces that only multiply. Mark any pure multiplier as such. Every piece must have a build it belongs to: strike, ripen, or a named third build.
- Never ask for an exact set of pins or a pin to land somewhere.

## Deliver
`docs/design/advancing/<slug>.md` (under about 800 words):
1. Your best 8 to 12 pieces in a table: name | what it does (one line, numbers) | build (strike / ripen / other) | changes the best throw? (yes / no, multiplier) | how it looks | how to build it in the sim | price.
2. Three combinations that make a build, one line each, and one anti-synergy.
3. The two pieces you would ship first and why.
4. Anything in the base numbers you'd change for your pieces to work (growth, line, strike ×2, ten balls).

Reply with the file path and a five-line summary.

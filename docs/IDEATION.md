# Ideation: where bowl-rogue goes next

Written 21 November 2026, after Josh's first full Ten-Pin Lab run. This is the brief for the next session. Read it with `docs/STATE.md`; nothing here has been built.

## 1. Where we are

Josh, after winning all 12 games of the Ten-Pin Lab (log: `playtest/2026-11-21-ten-pin-lab.csv`; shop screenshots: `playtest/2026-11-21-ten-pin-shop/`):

> Aesthetics are really cool, game is really easy and monotonous. Builds seem linear, choices are not relevant or hard or risky, throws are the same each time with no impetus to adjust to an evolving board, bosses aren't particularly challenging nor is there a reasonable way to build for them, ball choices seem like downgrades with no meaningful tradeoff upside, and I cruised through without ever really thinking about the points. As long as I kept hitting strikes, who cares?
>
> We might have to really play with the bowling construct itself.

What the run shows:
- 54 strikes on 60 first balls. Median setup 1.9 seconds a ball. One line (start 0, aim +13, bend −90) thrown 11 times, two near copies 10 more.
- Scores ran 2× to 4.6× the target from game 4 on (3,960 against 1,150 in the last boss).
- Pieces that fired: Wing 75 times, Leader 55, Domino 53, Picket 44, Tip jar 42, Gold 35. Never fired: Buddy, Wallflower, Sweeper, Twin, Crown.

The same pattern runs through every lab since 20 November (Five-Pin Run, Rules, Variety, Boss, Ten-Pin): find one strike line, repeat it, buy whatever multiplies strikes. Each fix so far (no strike Mult, moving racks, bosses, bigger layouts, ten pins) bent the curve without changing the loop. In Josh's words, strikes are a sure thing once found, and nothing on the board asks you to change.

## 2. Why the loop collapses (diagnosis)

1. **The throw is deterministic.** The same line and a release in the green zone give the same result every time. Once found, a strike line is a solved problem.
2. **The board resets to the same state.** Every frame starts from the same rack, so the best ball never changes within a game.
3. **Scoring rewards one outcome.** A strike is worth several times anything else, and most pieces add to strikes. There is no reason to aim for anything but the strike.
4. **Builds multiply instead of change.** Pieces add points or Mult to what you already do. Few change what the best throw is, so the build doesn't change the play.
5. **Bosses are obstacles, not problems.** You can't see or prepare for them in a way that changes purchases, and once you find the line around them they are a normal game.
6. **Balls are alternatives, not trade-offs.** Each bought ball moves the strike line and offers nothing in exchange.

Any direction worth building should break at least two of these.

## 3. Josh's notes to carry forward

Directions he raised:
- **Spares as the real challenge.** Frames that start from common "second shot" leaves (pick-up situations), where converting the spare is the skill.
- **Strikes less of a sure thing.**
- **Go crazy with the construct.** His example: level 1 starts as bowling and becomes a battle against invaders. Instead of pins: sentries, tentacles coming through the floor, things that interact with each other differently from pins.
- Assemble "a super team of thinkers, artists, game designers" to work the problem.

Concrete problems to fix whatever the direction:
- **Dead pieces.** Several pieces never matter, and some were ported from five-pin and can't work in ten-pin (Buddy pays when a ball drops 2 or 3 pins, which almost never happens with ten pins).
- **Shop pin art is too small** and their state (level, what they do) is hard to read. Draw them big, illustrated and dynamic. No need for the overhead rack view.
- **Upgrade versus swap is unclear.** Placing a pin on a spot can level up a matching pin or replace a different one, and the shop doesn't make the difference visible before you tap.
- **Balls** need an upside, not just a different strike line.
- **Bosses** need to be something you can see coming and build for.

What already works and should be kept: the hall looks (Rec Room, After Close, Computer, Arrival), the throw's feel, the win card, the shop's separate trays, levels of small / big / boss.

## 4. Seed directions (to start the room, not to choose from)

These are starting points for the team, each named by what it does. They are not recommendations.

- **Spare Room.** Most frames start from a leave (7-10, 4-6-7-10, bucket, washout) dealt from a deck; strikes are rare or impossible by design. Pieces change how leaves are dealt or what converting them pays.
- **Living Rack.** Pins aren't static. Between balls they step, swap, respawn or brace each other, so the board you face on ball 2 is a consequence of ball 1. This is where Josh's invaders fit: sentries that block, tentacles that rise through the floor, a formation that advances each frame.
- **Uncertain Strike.** The release or the lane adds controlled variance you can read and pay to reduce: oil that breaks down along your line, pins that wobble, a ball that wears. The best throw drifts, so you adjust.
- **Called Shots.** Before each ball you name a target (a pin, a count, a leave) and the build pays for hitting what you called, so aiming for less than a strike can be worth more.
- **The Board Fights Back.** Bosses as opponents with a turn: after your ball, the boss acts (repairs pins, moves the headpin, closes a board). Preparing for a boss means buying counters, which makes the shop matter.
- **Something else entirely.** Bowling as the verb in a different game: defending a lane, a puzzle, a tactics board, a dungeon crawl with balls as attacks. Bring one that doesn't sound like bowling at all.

Earlier blind pitches are in `docs/pitches/` (Stacked Spots, The Bag, The House Lays the Lane, The Scoresheet). Reread them; parts may fit a direction above.

## 5. Plan for the next session

**Goal:** leave the session with two or three directions Josh has played, not described ("settle feel questions by building something he can play").

1. **Read in** (5 minutes). `CLAUDE.md`, `docs/STATE.md`, this file, the Ten-Pin log, `docs/pitches/`. Play the Ten-Pin Lab in headless Chrome for a few balls to know the current feel.
2. **Run the room** (the "super team"). Spawn blind, parallel agents with distinct lenses, each given section 1 to 4 of this file and the rules in `CLAUDE.md`, each returning a one-page pitch in the same format as `docs/pitches/` (the idea; the decision before each ball; a worked example with numbers; what you buy; how a boss works; what it looks like; the risk):
   - **Systems designer**: roguelike economy and build variety (Balatro, Slay the Spire, Ultrapool).
   - **Bowling designer**: real bowling's craft (leaves, spares, oil patterns, ball choice) turned into decisions.
   - **Physics-toy designer**: what the existing sim can do that pins never did (chains, pins with weight, moving targets).
   - **Art director and worldbuilder**: what the hall becomes as the run goes on, Josh's invaders idea, how pieces and enemies look in the shop and on the lane.
   - **Wildcard**: bowling as the verb in a game that isn't bowling.
   - **Critic** (after the others): scores every pitch against the six failures in section 2 and Josh's notes in section 3.
3. **Show Josh the pitches** as a short side-by-side (one artifact page, a picture per pitch). He picks two or three, or mixes parts.
4. **Build each pick as a small lab** on the current base (`labs/ten-pin/` or `labs/five-pin-bosses/`), one mechanic each, one game or one level long, with a Results log. Keep the throw. Verify with bots and screenshots at 390x700 and 360x600 as usual.
5. **Josh plays them** and pastes logs. Analyse against section 2: did the best throw change between balls; did purchases change the play; was there a decision he had to think about.

**Fix list, alongside or right after** (small, worth doing whatever direction wins):
- Big illustrated pins in the shop, with level and state readable at a glance.
- Make "level up" versus "replace" visible before placing (for example, the target spot shows an up-arrow and a level pip for a match, and the outgoing pin fades with a swap mark for a replace).
- Cut or rewrite dead pieces for ten-pin (Buddy, Wallflower, Sweeper, Twin, Crown in the current tuning); re-check every piece fires at least sometimes in bot runs.

## 6. Handoff prompt (paste to start the next session)

> Picking up bowl-rogue (joshlitwin/bowl-rogue). Read CLAUDE.md, docs/STATE.md and docs/IDEATION.md. The game looks great but plays easy and monotonous: find one strike line, repeat it, buy strike multipliers. I want to rethink the bowling construct itself. Run the plan in docs/IDEATION.md section 5: assemble the team of blind agents, get pitches, show them to me side by side, then build my picks as small labs I can play. Ask before merging to main.

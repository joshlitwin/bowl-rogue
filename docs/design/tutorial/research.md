# How roguelikes teach their systems: research for Advancing Ten-Pin (22 November 2026)

Why this exists: after his first runs Josh said he didn't understand what the bosses did, and he finds it hard to remember what he bought and what each power does. He has also said complexity is fine if it's "explained iteratively". His rules apply here too: minimal text, show don't tell, no scrolling, no cute art, no opaque labels.

Everything below is paraphrased from the linked sources. Where a source didn't confirm a detail, this doc says so rather than filling it in from memory. The plan built from this is in [plan.md](plan.md).

## Balatro
What it does:
- **A tutorial that's a light layer over a real run.** Jimbo (the plain joker) guides the first few antes of a normal run with a few speech bubbles. LocalThunk calls the game's overall teaching an "extended low-calorie tutorial": you learn by playing, not by reading ([Game Developer](https://gamedeveloper.com/design/balatro-creator-unveils-a-few-slick-signposting-strategies); [Steam thread](https://steamcommunity.com/app/2379780/discussions/0/4346606879508753453)).
- **The tutorial plays once and can't be replayed.** Each profile shows it once. Players who quit it early can't get it back, and the thread asks for a replay option in settings ([Steam thread](https://steamcommunity.com/app/2379780/discussions/0/4346606879508753453)). Lesson: one-time moments need a way to replay them.
- **The boss is shown before the ante starts.** The blind select screen shows the ante's Boss Blind on the right with its restriction under its symbol, as one line (e.g. "Start with 0 discards"). That turns the small and big blinds into preparation for it ([Pro Game Guides](https://progameguides.com/balatro/balatro-tips-and-tricks/); [game-mechanics notes](https://saschb2b.github.io/game-mechanics/games/balatro/blinds-and-bosses)). The second source puts it this way: a boss you can see is a planning puzzle; a hidden one would feel arbitrary.
- **The first boss pool is milder.** Only eight gentler boss blinds can appear in ante 1 ([TV Tropes](https://www.tvtropes.org/pmwiki/pmwiki.php/VideoGame/Balatro)).
- **The first shop is fixed to teach one thing.** Since 1.0.1 the first shop always has a Buffoon Pack, so every player meets jokers in the first shop. Jokers whose conditions you can't meet yet don't appear ([TV Tropes](https://www.tvtropes.org/pmwiki/pmwiki.php/VideoGame/Balatro)).
- **A Run Info button.** It sits at the lower left during a run and has three tabs: poker hands (each hand's level, base chips and mult, times played), the current ante's blinds, and the vouchers you've bought ([Pro Game Guides](https://progameguides.com/balatro/balatro-tips-and-tricks/)). It's the "what have I got" screen.
- **Early items chosen as lessons.** In the demo, Four Fingers was the joker where people "really understood Balatro's hook". Amber Acorn was placed early to teach that card order matters. The demo deck was stacked to push players into an unfamiliar mechanic ([Game Developer](https://gamedeveloper.com/design/balatro-creator-unveils-a-few-slick-signposting-strategies)).
- **Unlocks widen the pool over many runs.** New jokers, decks and vouchers unlock at milestones even on failed runs. The Collection shows undiscovered items greyed out ([game-mechanics notes](https://saschb2b.github.io/game-mechanics/games/balatro/)).
- **The rules lean on something familiar.** Poker hands are already known, so the first minutes ask almost nothing ([game-mechanics notes](https://saschb2b.github.io/game-mechanics/games/balatro/)). Bowling works the same way for us: aim, knock pins down, strike.

Borrow:
- At the start of each level, show the boss as a card with its picture and one line. The boss pip in the top bar can be tapped at any time to show that card again.
- Level 1 already uses only the two gentler bosses (Short line or Bolted rack); keep that.
- Fix the first shops to teach one thing at a time: the first shop has only Powers, drawn from a short set that's easy to read.
- Add a build view, our version of Run Info: every power you own, with counts; tap one to see which pins carry it.
- Let a new piece show up a few times before the full pool opens.
- Every first-time moment can be replayed.

## Slay the Spire (1 and 2)
What it does:
- **Intents.** Each enemy shows an icon for its next move above its head. An attack is a red weapon icon with a damage number, and 3x4 means three hits of four. There are distinct icons for buff, debuff, block, heal, summon, flee and sleep, and a "???" for a deliberate surprise ([Untapped STS2 guide](https://sts2.untapped.gg/guides/how-to-read-enemy-intent)). Each turn becomes a puzzle you can read in full ([game-mechanics notes](https://saschb2b.github.io/game-mechanics/games/slay-the-spire/)).
- **Keywords on hover.** Keywords are underlined in card text, and hovering one shows its tooltip ([Metabot glossary FAQ](https://metabot.gg/en/slay-the-spire-2/guides/keywords-terms-glossary)). The definition lives with the word, not in a manual.
- **"Act 1 teaches, Act 2 tests."** The first act is the lesson and the difficulty jump comes after it ([game-mechanics notes](https://saschb2b.github.io/game-mechanics/games/slay-the-spire/design-tensions)).
- **Counters that stay on screen.** STS2 shows the turn number on the End Turn button, so turn-based relic effects can be tracked without a display that vanishes after two seconds. Potions got distinct icons so they're easier to tell apart ([PCGamesN](https://www.pcgamesn.com/slay-the-spire-2/slay-the-spire-2-makes-keeping-track-of-its-new-relics-and-potions-much-easier)).
- **Enemies built to push against strategies.** The enemies were designed to challenge different strategies, so no single approach dominates ([Game Developer, Road to the IGF](https://www.gamedeveloper.com/disciplines/road-to-the-igf-mega-crit-games-i-slay-the-spire-i-)). Our bosses already do this: two hit ripen builds, two hit strike builds.

Borrow:
- Give each boss an intent on the lane. Before a ball the boss changes, the player sees what it will do next ball, on the board, where it'll happen.
- Powers are our keywords. The power's colour band is the word, and tapping a band anywhere (shop, rack, build view) shows what that power does.
- Show the Sweep bar's countdown on the lane, not only as a mark on the frame cells.

## Into the Breach (the reference for bosses)
What it does:
- **Every enemy attack is telegraphed.** Ma: when every attack is telegraphed and your own attacks have no random chance, the game "starts to feel like a puzzle". The aim is that every death feels like your own fault and it's clear why you lost ([Game Developer, Road to the IGF](https://gamedeveloper.com/game-platforms/road-to-the-igf-subset-games-i-into-the-breach-i-)).
- **Clarity over cool ideas.** The team would "sacrifice cool ideas for the sake of clarity" every time. They cut weapons and firing patterns that playtesters couldn't follow ([Game Developer](https://gamedeveloper.com/design/-i-into-the-breach-i-dev-on-ui-design-sacrifice-cool-ideas-for-the-sake-of-clarity-every-time-)).
- **Show who causes each threat.** Damage markers alone weren't enough; playtesters needed to see which unit each threat came from (same source).
- **Animated tooltips instead of text.** A weapon's tooltip plays a short animation of it in use. Playtesters still didn't understand after three sentences of text, and the animations worked far better (same source).
- **Less reading.** Into the Breach shows everything enemies can do, so players spend their attention on decisions rather than on spotting threats ([Game Developer, "Reading in strategy games"](https://gamedeveloper.com/design/reading-in-strategy-games)).

Borrow:
- A boss's effect is shown on the real lane before it acts:
  - Short line: the red line slides to its new row.
  - Sweep bar: the bar hangs lower each ball until its sweep ball.
  - Bolted rack: bolts glint on every pin.
  - Rising tentacle: a ghost of the post one row ahead.
- Our dotted path already stops at the tentacle. That's the same kind of telegraph and should stay.
- A power's tooltip is a two-second loop on one pin (1 → 3 → 9 for Quick growth), not a sentence.
- Every time a boss changes a ball, the cause is drawn on the board: the bar sweeping, a bolt flashing on a pin that didn't fall, the post the ball thudded into. Then a loss to a boss is legible.

## Luck be a Landlord
What it does:
- **A small, plain start.** You begin with low rent and a few basic symbols that don't combine, each paying a few coins a spin ([Pocket Gamer](https://www.pocketgamer.com/luck-be-a-landlord/review)).
- **One small choice at a time.** After each spin you pick one of three symbols. Many symbols depend on where they land next to others (same source).
- **A threat you can see coming.** The landlord sends rent demands every few rounds, and rent climbs over the run (same source). The countdown is always in view.
- What I couldn't confirm: the review doesn't describe tooltips or a tutorial. It says the learning comes from figuring out what symbols do as rent rises.

Borrow:
- The first shop is one choice of one kind: three powers.
- The target and the balls left are our rent. They already sit in the goal bar, so keep them in view.
- The boss is the next rent hike, shown a level ahead.

## Peglin
What it does:
- **A shot preview.** An aim indicator shows the shot's path, and some relics change it ([TV Tropes](https://tvtropes.org/pmwiki/pmwiki.php/VideoGame/Peglin)).
- **A simple start.** You begin with a few stones and one knife. Early foes are slimes, bats and spitting plants that are mostly harmless (same source).
- **Bosses that show their threat early.** One wall boss swallows a knight on its first turn, which warns of its lethal attack. The dragon follows a readable cycle: inhale, breathe fire, swat (same source).
- **Some things are left to discover.** A red bomb's self-damage isn't spelled out (same source). That's a deliberate choice with a cost.

Borrow:
- The boss's first ball is its demonstration: in the boss game, ball 1 shows the effect plainly before it costs much.
- Keep the dotted path as the main teacher of the throw.
- Don't leave harm undiscovered. Breaking through costs points, so its first time gets a preview.

## Hades
What it does:
- Systems and story unlock across runs, and progress doesn't depend on winning. Each return to the House brings new dialogue, weapons and upgrades ([GameSpot](https://gamespot.com/articles/hades-changes-what-it-means-to-be-a-roguelike/1100-6483420/)).

Borrow:
- Spread new things across runs as well as across shops. Count shops across all runs, so a second run after an early loss picks up where the first left off and doesn't start the lessons over.

## Dicey Dungeons and the "no tutorial" approach
What it does:
- Dicey Dungeons keeps each dungeon small, so there are fewer options to weigh. It teaches deckbuilding through dice and synergy through skill picks, without a "lazy lecture or frustrating tests" ([itch.io blog](https://itch.io/blog/95000/dicey-dungeons-is-a-brilliant-introduction-to-roguelikes-and-deckbuilders)).
- A jam devlog on teaching without a tutorial ([The Eclipse devlog](https://itch.io/devlog/516887/teaching-mechanics-without-a-tutorial.amp)) suggests:
  - put the lesson on the player's path;
  - make the starting conditions do the teaching (start hurt, so the first heal matters);
  - reward the action with clear feedback.

Borrow:
- The board sets up the lesson. Before the first break-through preview fires, a pin has to be on the front row, so the warning lands when the danger is real, not in the abstract.

## Not covered
I looked at Vampire Survivors and Ball x Pit but found no source on how they teach; the pages I reached only list recipes. Nothing is claimed for them.

## The patterns, and where each goes in the plan
| Pattern | Seen in | In the plan |
|---|---|---|
| Introduce a thing just before it's needed | Balatro, Slay the Spire, the jam devlog | First advance, first break-through, first shop and first power are each shown at the moment they first happen |
| Show a threat on the board before it acts | Into the Breach, Slay the Spire intents, Peglin bosses | Boss previews and per-ball boss tells drawn on the lane |
| Show a boss one level ahead | Balatro blind select | Boss card at the start of each level, and a tappable boss pip |
| Animated tooltip in place of text | Into the Breach | A two-second loop for each power in the info strip |
| Definition on tap, where the word is | Slay the Spire keywords | Tap a power band or chip to see it |
| Limited shop pool on the first run | Balatro (first shop, milder ante-1 bosses) | Trays and powers open one at a time across the first shops |
| A Run Info or build screen | Balatro | A powers legend in the Rack sheet |
| One-time hints that can be replayed | Balatro (where replay is missing) | `advten-tips` flags, a "Tips again" button, and tap-to-replay on every card |
| Counters that stay on screen | Slay the Spire 2 | Sweep bar countdown and target and balls kept in view |

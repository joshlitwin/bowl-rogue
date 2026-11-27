# Balatro: why players love its depth, and what it means for Temperance Lanes

Researched 26 November 2026. Sources are linked inline and listed at the end.

## How this was gathered, and its limits

- Reddit could not be read: the fetch tool is blocked from reddit.com. Reddit views here come second-hand, through articles that quote or describe Reddit threads. Steam discussions, Steam reviews, Hacker News and the Straight Dope forum stand in for them.
- Steam reviews were sampled through Steam's public review feed on the day of writing: 36 negative reviews and about 80 positive ones, the ones Steam returned first. Counts from that sample are rough, and the feed's sort order is not documented, so treat them as signals rather than percentages.
- Forum threads skew towards experienced players and arguments. A "count" from a thread means the number of posters who took that view in the visible posts.
- Facts about how Balatro works that come from general knowledge of the game rather than a cited source are marked *(game knowledge)*.

## 1. What players say they love

### Building a machine and watching it go off (strongest, most frequent)
This is the most common reason given, by players and by the designer. LocalThunk refuses to add a score preview because he thinks the fun is in setting up "your Rube Goldberg machine" and watching it resolve ([GMTK](https://gmtk.substack.com/p/balatros-cursed-design-problem)). Positive Steam reviews keep returning to joker synergies and to scores so large that players "stop thinking about the actual value" (about 7 of 80 each for synergies and for big numbers) ([Steam reviews, positive](https://store.steampowered.com/appreviews/2379780?json=1&filter=all&review_type=positive&language=english&num_per_page=100&purchase_type=all&day_range=365)). A Steam "what is the appeal?" thread gave the same answer most often: winning comes from combining jokers, not from playing the best poker hand ([Steam: appeal thread](https://steamcommunity.com/app/2379780/discussions/0/596265234378817791)).

### Feeling smart: depth that reveals itself over time (strong, frequent)
Players describe it as easy to learn and slow to master, and say they win more as they learn. Positive reviews put this second after "one more run" (about 8 of 80; "Balatro makes you feel smart"). A Steam thread from a player losing 95% of runs drew replies from players who said it took them 10 to 48 hours to start winning, and that it "will click eventually" ([Steam: White Stake thread](https://steamcommunity.com/app/2379780/discussions/0/596263462238188660)). Critics place the depth in one simple system explored thoroughly rather than many shallow ones ([GamesHub](https://www.gameshub.com/news/features/balatro-roguelike-deckbuilder-2637397); [Game-Wisdom](https://game-wisdom.com/analysis/balatro)).

### Odd, counter-intuitive runs (moderate, frequent among experienced players)
Players enjoy runs where the normal rules flip: face cards worthless while Fibonacci ranks pay out, or nearly every hand a flush ([Aftermath](https://aftermath.site/the-nerve-of-balatro-for-being-this-good)). The designer says the game became more emergent than he expected and that he enjoys seeing players find combos he never thought of ([Game Informer](https://www.gameinformer.com/interview/2024/03/21/balatro-was-almost-called-joker-poker-and-other-details-from-its-creator); [Rogueliker](https://rogueliker.com/balatro-interview/)).

### Breaking the game (moderate in reviews, strong among dedicated players)
Only about 5 of 80 positive reviews mention overpowered setups directly, but the most dedicated players treat it as the long-term goal. Forum regulars swap routes to an infinite score and celebrate scores in scientific notation at ante 15 to 17 ([Straight Dope](https://boards.straightdope.com/t/wait-no-balatro/1009916?page=2); [Hacker News](https://hn.svelte.dev/item/43195516)). A streamer's run to ante 39, where the score overflows, was widely watched ([PC Gamer](https://www.pcgamer.com/games/roguelike/turns-out-that-balatro-like-tetris-before-it-can-only-be-finished-by-scoring-so-high-it-crashes-the-game)).

### Tension from variance you can manage (moderate, contested)
Some players like "strategizing around the variance" and the relief of drawing the one card they needed ([Frank Lantz comments](https://franklantz.substack.com/p/playing-balatro/comments)). The designer frames the high-level game as risk reduction: building something hard to counter that still wins ([Rogueliker](https://rogueliker.com/balatro-interview/)). This is also the biggest source of complaints (section 4).

### Feedback and feel (moderate, often credited for the hook)
The rising chime as multipliers land, the screen shake and the flames when a hand beats the target are named as part of why scoring feels good ([AV Club](https://www.avclub.com/balatro-hones-the-art-of-making-numbers-go-up); [GamesRadar on the flame effect](https://www.gamesradar.com/games/roguelike/after-winning-big-at-the-game-awards-and-taking-hours-of-our-time-in-2024-balatro-creator-reveals-their-most-productive-night-resulted-in-one-of-the-games-most-satisfying-features)). The designer calls the flames the feature he is proudest of.

### Short runs, "one more run" (strongest by count, least informative)
Addictiveness was the most common point in positive reviews (about 20 of 80, many jokes). Runs are long enough for decisions to compound and short enough for one sitting ([AV Club](https://www.avclub.com/balatro-hones-the-art-of-making-numbers-go-up)).

## 2. The mechanics behind those feelings

### Chips, +Mult and xMult, in a visible order
A hand scores chips times mult. Jokers add chips, add mult, or multiply mult. Jokers trigger left to right, so players learn to put +Mult before xMult ([witchphd](https://witchphd.substack.com/p/balala); [Steam: Flint thread](https://steamcommunity.com/app/2379780/discussions/0/4346606879521074222)). One Hacker News commenter calls it a "CMX" order: chips, then mult, then xMult. Three things follow:
- **xMult is the engine.** Players agree that late antes need multiplicative jokers; one analysis calls xMult "insanely valuable" ([witchphd](https://witchphd.substack.com/p/balala)). Advice to new players centres on finding scaling or xMult jokers ([Steam: White Stake thread](https://steamcommunity.com/app/2379780/discussions/0/596263462238188660)).
- **Ordering is a free decision.** Dragging jokers into order costs nothing and rewards understanding. A long Steam reply lists joker order next to discards and shop buys as one of the game's real choices ([Steam: appeal thread](https://steamcommunity.com/app/2379780/discussions/0/596265234378817791)).
- **The math is calculable but not previewed.** The rules are shown and the deck can be inspected, but the total is not predicted. That leaves room for the "will it be enough?" moment. The cost: strategy-minded players use calculators and overlays, which the designer regrets ([GMTK](https://gmtk.substack.com/p/balatros-cursed-design-problem)). He added a deck view only after testers started tracking their decks by hand.

### Joker slots as the scarce resource
Five slots *(game knowledge)* force trade-offs: an economy joker now versus a scoring joker later, or a flat joker versus a scaling one. Experienced players criticise builds that carry a "dead" joker into a late boss ([Steam: Violet Vessel thread](https://steamcommunity.com/app/2379780/discussions/0/596266515199698431)). One regular gives a rule of thumb: one scoring joker per ante, minus one, and fill the rest with money makers ([Straight Dope](https://boards.straightdope.com/t/wait-no-balatro/1009916?page=2)).

### Scaling jokers that reward commitment
Many jokers grow as you repeat a behaviour, such as playing a hand type, discarding, or skipping. Players single out "slow reliable scaling" as satisfying ([witchphd](https://witchphd.substack.com/p/balala)). Some push the other way: Obelisk grows only when you *avoid* your most-played hand, which forces ongoing planning ([GamesHub](https://www.gameshub.com/news/features/balatro-roguelike-deckbuilder-2637397)). A Steam poster argues that scaling jokers work against flat ones and discourage saving money ([Steam: Violet Vessel thread](https://steamcommunity.com/app/2379780/discussions/0/596266515199698431)). Commitment has a cost, and that cost is part of the decision.

### Economy and interest
Unspent money earns interest up to a cap. The community rule is to bank to $25 before opening packs, and top players' money management is described as "ridiculous" ([Straight Dope](https://boards.straightdope.com/t/wait-no-balatro/1009916?page=2)). New players are told never to drop below about $5 to $10 ([Steam: White Stake thread](https://steamcommunity.com/app/2379780/discussions/0/596263462238188660)). Every shop becomes a choice between spending now and investing for later, separate from what is on offer.

### Building the deck: thinning, upgrading, steering
Cards can be removed, copied, changed and upgraded, and planets level up hand types. Analysts describe a point where the deck matters more than poker ([Game-Wisdom](https://game-wisdom.com/analysis/balatro)). One player's verdict on winning was to "break the game even more" through deck manipulation ([tipa16384](https://tipa16384.github.io/wkblog/2025/06/the-dishonesty-of-balatro/)). Players say "predictability is power", and the deck that starts with fewer cards is valued for it ([witchphd](https://witchphd.substack.com/p/balala)).

### Skipping blinds for tags
Small and big blinds can be skipped for a tag, such as a free joker or a pack, at the cost of that round's money and shop. Players treat this as a real choice that shapes a run ([Aftermath](https://aftermath.site/the-nerve-of-balatro-for-being-this-good)). Opinions on when to skip disagree: one analyst rarely skips because the extra round earns more interest, while others skip the first small blind to fish for a joker tag ([witchphd](https://witchphd.substack.com/p/balala); [Steam: White Stake thread](https://steamcommunity.com/app/2379780/discussions/0/596263462238188660)). That disagreement is a sign the choice is live.

### Boss blinds: counters you can see coming
The boss is shown at the start of each ante and can be rerolled with a voucher or tag *(game knowledge)*. Each boss attacks a style: halving base chips and mult hits planet-levelled builds, and debuffing face cards hits face builds. Players argue over whether the hard ones are fair. In the Flint thread, three or four posters called it hard but fair and one replied "that would be the point" to the complaint that bosses break strategies ([Steam: Flint thread](https://steamcommunity.com/app/2379780/discussions/0/4346606879521074222)). Named counters (flat-mult jokers, a boss-reroll tag, jokers that shrink boss targets) are what make losses feel like planning failures rather than fate.

### Stakes and decks as layered difficulty
Stakes add restrictions one at a time, including perishable and rental jokers added in the first balance patch ([PC Gamer, patch](https://pcgamer.com/games/card-games/balatros-first-big-balance-patch-fiddles-with-fibonacci-and-makes-a-mod-to-odd-todd)). Decks change the starting conditions, and the order in which a player takes on decks is itself a choice ([witchphd](https://witchphd.substack.com/p/balala)). Stakes are also where much of the frustration sits (section 4).

### Readable pieces
Joker text is capped at four lines and 20 words ([Game Informer](https://www.gameinformer.com/interview/2024/03/21/balatro-was-almost-called-joker-poker-and-other-details-from-its-creator)). Chips are blue, mult is red, and stacking effects show their current value in grey ([GamesHub](https://www.gameshub.com/news/features/balatro-roguelike-deckbuilder-2637397)).

## 3. Breaking the game

### What players do
- **Push into endless mode.** After ante 8 the targets keep climbing, and dedicated players chase ante 12, 15, 19 and beyond ([Steam: endless thread](https://steamcommunity.com/app/2379780/discussions/0/7252559149668486410); [Straight Dope](https://boards.straightdope.com/t/wait-no-balatro/1009916?page=2)).
- **Chase "naneinf."** Past about 1.8e308 the number overflows and shows as nan. Ante 39's target is beyond that, so the run effectively ends there ([PC Gamer](https://www.pcgamer.com/games/roguelike/turns-out-that-balatro-like-tetris-before-it-can-only-be-finished-by-scoring-so-high-it-crashes-the-game); [Set Side B](https://setsideb.com/?p=9384)). Forum players name specific routes. One says one joker pairing is "90% of it"; others use particular bosses with very large hand sizes ([Straight Dope](https://boards.straightdope.com/t/wait-no-balatro/1009916?page=2)).
- **Copy and retrigger.** Copy jokers duplicate the best joker, and retriggers multiply each card's effect. These combos are traded as "popular and easy" routes to big numbers (same source).
- **Mod past the limit.** Some players install mods to remove the number ceiling ([Hacker News](https://hn.svelte.dev/item/43195516)).

### Why the design allows it
- The designer finds overpowered strategies fun, except when one is "the path of least resistance" that shuts players out of the rest of the game ([Game Informer](https://www.gameinformer.com/interview/2024/03/21/balatro-was-almost-called-joker-poker-and-other-details-from-its-creator)). He objects to dominance, not to power.
- Analysts tie this to Binding of Isaac: many ways to break the game make it rewarding when a run comes together ([Game-Wisdom](https://game-wisdom.com/analysis/balatro)).
- One view is that no single item usually decides a run, so a win feels less certain than in games built around one dominant build ([TechRaptor](https://Techraptor.net/gaming/features/high-stakes-how-balatro-confronts-addiction-and-roguelikes)). That cuts against the "joker pairing does 90% of it" claim. It probably holds for ordinary wins and fails for record runs (uncertain).

### How it stays fun rather than ruining the game
- **Breaking comes after the win.** The main run ends at ante 8, so the extreme builds live in endless mode, where nothing is at stake except bragging rights.
- **Targets outrun most builds.** In the endless thread, players note each ante past 12 is more than 100 times the last, and the jump from millions to hundreds of millions is "meant to end most runs" ([Steam: endless thread](https://steamcommunity.com/app/2379780/discussions/0/7252559149668486410)). Breaking the game is a race against a curve that eventually wins.
- **Infinite builds are rare.** Slay the Spire's co-creator declined an endless mode for Slay the Spire 2 because infinite strategies come up more often there, which makes long runs dull. He says Balatro's scaling "feels more natural" ([GamesRadar](https://www.gamesradar.com/games/roguelike/slay-the-spire-2-wont-get-an-endless-mode-like-balatro-because-it-limits-infinite-strategies-but-creator-says-maybe-a-modder-will-think-of-a-way-to-make-it-work/)).
- **Balance through price and rarity, not bans.** LocalThunk says most fixes are numbers: cost, rarity, bonus size ([Rogueliker](https://rogueliker.com/balatro-interview/)). The first patch raised Fibonacci's price by a dollar rather than gutting it ([PC Gamer, patch](https://pcgamer.com/games/card-games/balatros-first-big-balance-patch-fiddles-with-fibonacci-and-makes-a-mod-to-odd-todd)). The strong piece stays in the game; it just costs more to get.
- **The presentation celebrates it.** Flames, shake and rising tones scale with the score, so an absurd hand looks absurd ([AV Club](https://www.avclub.com/balatro-hones-the-art-of-making-numbers-go-up)).

## 4. Criticisms: what players say does not work

1. **Luck decides too much at high stakes (the most common complaint).** It was the largest theme in the negative-review sample (about 12 of 36; "at the mercy of RNG") ([Steam reviews, negative](https://store.steampowered.com/appreviews/2379780?json=1&filter=all&review_type=negative&language=english&num_per_page=100&purchase_type=all)). In a "downswing" thread, seven or eight of fifteen visible posters said high-stakes difficulty is too luck-dependent; one said higher stakes "limit options rather than test mastery" (paraphrase) ([Steam: downswing thread](https://steamcommunity.com/app/2379780/discussions/0/4308327178402177376)). The designer agrees there may be too much randomness and planned a balance pass to reduce luck at high stakes ([Rogueliker](https://rogueliker.com/balatro-interview/); [PC Gamer](https://www.pcgamer.com/games/card-games/balatro-is-the-first-deckbuilder-i-ever-played-says-developer-who-singlehandedly-made-balatro)).
2. **Bosses that erase a build.** About 5 of 36 negative reviews say bosses seem chosen to invalidate the build. The Violet Vessel thread ("Great run, great build, sorry you lose") split: about 3 posters blamed RNG, about 6 blamed a weak build ([Steam: Violet Vessel thread](https://steamcommunity.com/app/2379780/discussions/0/596266515199698431)). Bosses that disable a whole category, such as face cards, end strong runs ([Straight Dope](https://boards.straightdope.com/t/wait-no-balatro/1009916?page=2)).
3. **Agency that is really joker selection.** Some players feel the game "pretends to give you agency" (negative reviews, about 6 of 36). A blogger argues it advertises poker but is won by choosing the best jokers, and by the end even a royal flush was a downgrade from his pair build ([tipa16384](https://tipa16384.github.io/wkblog/2025/06/the-dishonesty-of-balatro/)). A critic in the Frank Lantz comments says choices are either obvious or undecidable, so you may as well do whatever feels fun.
4. **A dominant hand type.** Some players say only flush matters, so nobody builds around full houses ([Steam: endless thread](https://steamcommunity.com/app/2379780/discussions/0/7252559149668486410)). In other threads players disagree on whether two pair or flush is stronger, so this is contested.
5. **A diluted pool as unlocks open.** "The more you play, the harder it gets to actually build a winning deck" (negative reviews, about 4 of 36 on weak or non-synergistic jokers). Unlocking more jokers lowers the chance of seeing the ones a build needs.
6. **Outside tools.** Optimal play pushes some players to calculators, and the designer calls the missing preview a design flaw he chose to live with ([GMTK](https://gmtk.substack.com/p/balatros-cursed-design-problem); [Kill Screen](https://www.killscreen.com/balatro-and-the-expected-value-of-wonder/)).
7. **Pieces that punish normal play.** Jokers that expire before you can use them, jokers that shrink when you spend resources, and cards that risk destroying themselves are disliked ([witchphd](https://witchphd.substack.com/p/balala)).
8. **Gambling feel and compulsion.** This comes up in about 5 of 36 negative reviews and in Hacker News and Steam threads. Others counter that the game has no money at stake, no timers and no microtransactions ([Hacker News](https://hn.svelte.dev/item/43195516)).
9. **Hard to explain, slow to click.** The game is "terrifyingly confusing when explained in the abstract" ([Aftermath](https://aftermath.site/the-nerve-of-balatro-for-being-this-good)). Newcomers find tutorials impenetrable ([Straight Dope](https://boards.straightdope.com/t/wait-no-balatro/1009916?page=2)).

## 5. Implications for Temperance Lanes

The current issues, named for reference below:
- **Engine-or-die at game 7:** a run needs one engine (multiplier or grow-and-harvest) or it loses when the target jumps.
- **Repeatable opener:** players find one opening line and repeat it each game.
- **Say over the board:** more strategic choice without full control.
- **Knock or wait:** plans should lean towards knocking pins or towards waiting and harvesting.

In priority order:

### 1. Accept that an engine is needed; offer more routes to one
*Finding:* Balatro players take for granted that late antes need xMult or scaling, and nobody calls that a flaw. The complaints are about not finding the pieces (luck, a diluted pool) and about a dominant route (flush).
*For Temperance Lanes:* Do not try to make engine-free runs viable at game 7. Make sure four or more distinct engines can reach multiplier-tier output by level 2, each from a different plan. At least one should come from knocking (strike and spare streaks) and one from waiting (pins ripened past a size). Today there seem to be two engine families, multiplier and grow-and-harvest. Two Rent-on-Anchor builds winning every simulated run is the "flush" problem in miniature.
*Addresses:* engine-or-die at game 7; knock or wait.

### 2. Show the next boss early and give every boss an answer in the shop
*Finding:* Balatro reveals the boss when the ante starts and sells rerolls and counters. Players accept losses they could have planned for and hate ones that feel like fate (Violet Vessel, face-card bans). Temperance Lanes playtests already found Flat rate and Cold lane locking whole builds out.
*For Temperance Lanes:* Show the level's boss when the level starts, if that does not already happen. Make sure each boss has at least one named counter piece, plus a costly boss reroll. That turns the shop before a boss into counter-planning, which is strategic choice without control over the throw.
*Addresses:* say over the board; engine-or-die at game 7, since the jump becomes something to prepare for.

### 3. Interest on banked cash, and skippable small and big games
*Finding:* Banking to the interest cap and deciding when to skip blinds are two of the most discussed decisions in Balatro, and experienced players disagree about both. That disagreement is a sign the choices are real. Both are decisions about tempo, separate from what the shop offers.
*For Temperance Lanes:* Pay a small interest on cash carried between games, capped. Let the player skip a small or big game for a tag (a free power, a Brake ball, a shop reroll), giving up that game's cash and shop. A strong build can speed up, and a weak one can save towards game 7. Because the board never resets, skipping could also be priced in board terms: skipped games still advance the pins, or not (open question, worth a lab).
*Addresses:* engine-or-die at game 7, by letting players prepare for the jump; repeatable opener, since a skipped game has no opener.

### 4. Powers that grow from how you play, including ones that punish repeating yourself
*Finding:* Balatro's scaling jokers reward a committed behaviour, and players like "slow reliable scaling". The counter-scalers (Obelisk, and bosses that ban repeating a hand type) are Balatro's tool against a single repeated line.
*For Temperance Lanes:*
- Add scalers tied to each plan: one that grows per strike this run, one that grows per pin harvested at or above a value.
- Add at least one piece or boss that rewards varying the first ball. For example, it pays only when the first pin hit differs from last game's, or it bolts the pin hit first last game.

Keep the opening rack fixed, as Josh chose. Vary what the opener is worth rather than where the pins stand.
*Addresses:* repeatable opener; knock or wait.

### 5. Make power slot order matter, cheaply
*Finding:* Joker order costs nothing to change, rewards understanding, and is named as a real decision. Left to right, +Mult then xMult, is a rule players learn and enjoy applying.
*For Temperance Lanes:* Resolve a pin's three power slots in order, and show it: additive effects (Rent) before multiplicative ones (Spark, Crown). Let the player reorder slots in the rack sheet. This adds a decision without touching the throw.
*Addresses:* say over the board.

### 6. Show the tally in sequence; do not preview it
*Finding:* The fun is watching the machine resolve. Showing the rules, the deck and each step, but not the total, keeps the "will it be enough?" moment while the result can still be read and explained. The rising tone and flames are credited with much of the hook.
*For Temperance Lanes:* After a ball, count up each pin's contribution in turn, with each multiplier landing as its own beat and a tone that climbs. That stays within the "show, do not tell" rule. Skip a projected-score readout before the throw. This is a design judgement drawn from Balatro, not something tested for Temperance Lanes.
*Addresses:* say over the board, since players can see which part of the plan carried the ball.

### 7. Put breaking the game after the win: an endless run past level 4
*Finding:* Balatro keeps absurd builds fun by placing them after the run is won, against targets that grow so fast they end almost every run. Slay the Spire's designers declined an endless mode because infinite builds come up there often enough to make long runs dull.
*For Temperance Lanes:* After a full-run win, offer to keep going against steeply rising targets. Consider lifting caps such as the 32 cap and Rent's +8 only there, so overpowered builds get a stage without breaking the main run. Check first whether any infinite loop exists on the advancing board; the earlier Toll ball gutter loop was one. If one does, endless will find it.
*Addresses:* none of the four issues directly. It answers the wish for the feeling of finding something overpowered, and it would show which engines are strongest.

### 8. Prefer price and rarity to hard caps for strong but fun pieces
*Finding:* LocalThunk balances mostly through cost, rarity and size, and keeps strong pieces in the game. He objects only to the path of least resistance.
*For Temperance Lanes:* Where a capped piece is fun (the Crowd and Rent caps), consider making it rarer or dearer, or letting a second copy cost more, instead of flattening it. Keep caps where a piece was a loop rather than strong.
*Addresses:* engine-or-die at game 7, indirectly, because a strong piece that stays strong is what carries a run past the jump.

### 9. Watch the pool as pieces unlock
*Finding:* Balatro players complain that opening more jokers makes the needed ones rarer.
*For Temperance Lanes:* With 29 pieces opening over about 15 runs, check whether late-unlock players see their engine pieces less often. If they do, weight the shop towards the plan already in the rack. That gives say without control.
*Addresses:* engine-or-die at game 7, for experienced players.

### Uncertain or untested
- Whether interest and skipping work on a board that never resets. Skipping might strand grown pins or cheapen harvesting. This needs a lab.
- Whether slot order is readable on a 180x300 canvas at phone sizes.
- Whether players resent a counter-scaler aimed at their opener the way some Balatro players resent Obelisk ("a real pain to use", per one analyst).

## Sources

1. Mark Brown, GMTK, "Balatro's 'Cursed' Design Problem": https://gmtk.substack.com/p/balatros-cursed-design-problem
2. Game Informer interview with LocalThunk: https://www.gameinformer.com/interview/2024/03/21/balatro-was-almost-called-joker-poker-and-other-details-from-its-creator
3. Rogueliker interview with LocalThunk: https://rogueliker.com/balatro-interview/
4. PC Gamer, "Balatro is the first deckbuilder I ever played": https://www.pcgamer.com/games/card-games/balatro-is-the-first-deckbuilder-i-ever-played-says-developer-who-singlehandedly-made-balatro
5. GamesRadar, on Balatro's hype and creator: https://www.gamesradar.com/exploring-balatros-hype-its-ingenious-twists-on-poker-and-its-mysterious-creator
6. GamesRadar, on the flame effect: https://www.gamesradar.com/games/roguelike/after-winning-big-at-the-game-awards-and-taking-hours-of-our-time-in-2024-balatro-creator-reveals-their-most-productive-night-resulted-in-one-of-the-games-most-satisfying-features
7. GamesRadar, Slay the Spire 2 and endless mode: https://www.gamesradar.com/games/roguelike/slay-the-spire-2-wont-get-an-endless-mode-like-balatro-because-it-limits-infinite-strategies-but-creator-says-maybe-a-modder-will-think-of-a-way-to-make-it-work/
8. PC Gamer, ante 39 and the overflow: https://www.pcgamer.com/games/roguelike/turns-out-that-balatro-like-tetris-before-it-can-only-be-finished-by-scoring-so-high-it-crashes-the-game
9. Set Side B, Balatro University on naneinf: https://setsideb.com/?p=9384
10. PC Gamer, first balance patch: https://pcgamer.com/games/card-games/balatros-first-big-balance-patch-fiddles-with-fibonacci-and-makes-a-mod-to-odd-todd
11. Game-Wisdom analysis: https://game-wisdom.com/analysis/balatro
12. GamesHub feature: https://www.gameshub.com/news/features/balatro-roguelike-deckbuilder-2637397
13. witchphd, design notes: https://witchphd.substack.com/p/balala
14. tipa16384, "The dishonesty of Balatro": https://tipa16384.github.io/wkblog/2025/06/the-dishonesty-of-balatro/
15. Aftermath, "The nerve of Balatro for being this good": https://aftermath.site/the-nerve-of-balatro-for-being-this-good
16. AV Club, "Balatro hones the art of making numbers go up": https://www.avclub.com/balatro-hones-the-art-of-making-numbers-go-up
17. Kill Screen, "Balatro and the expected value of wonder": https://www.killscreen.com/balatro-and-the-expected-value-of-wonder/
18. TechRaptor, "High stakes": https://Techraptor.net/gaming/features/high-stakes-how-balatro-confronts-addiction-and-roguelikes
19. Frank Lantz, "Playing Balatro", reader comments: https://franklantz.substack.com/p/playing-balatro/comments
20. Steam reviews, negative sample: https://store.steampowered.com/appreviews/2379780?json=1&filter=all&review_type=negative&language=english&num_per_page=100&purchase_type=all
21. Steam reviews, positive sample: https://store.steampowered.com/appreviews/2379780?json=1&filter=all&review_type=positive&language=english&num_per_page=100&purchase_type=all&day_range=365
22. Steam discussion, "What is the appeal of this game?": https://steamcommunity.com/app/2379780/discussions/0/596265234378817791
23. Steam discussion, downswing and luck: https://steamcommunity.com/app/2379780/discussions/0/4308327178402177376
24. Steam discussion, "White Stakes too hard": https://steamcommunity.com/app/2379780/discussions/0/596263462238188660
25. Steam discussion, The Flint: https://steamcommunity.com/app/2379780/discussions/0/4346606879521074222
26. Steam discussion, "Great run, great build, sorry you lose" (Violet Vessel): https://steamcommunity.com/app/2379780/discussions/0/596266515199698431
27. Steam discussion, a "proper" endless mode: https://steamcommunity.com/app/2379780/discussions/0/7252559149668486410
28. Straight Dope forum, Balatro thread (page 2): https://boards.straightdope.com/t/wait-no-balatro/1009916?page=2
29. Hacker News thread (mirror): https://hn.svelte.dev/item/43195516

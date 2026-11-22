# Hold the Lane: the rack becomes an invasion that stays on the boards

**Idea:** ten-pin turns into a defence of the lane on a board that never resets, where a pin left standing can be worth more than one knocked down.

## The decision before each ball
What to kill, what to leave standing, what moves next.
- **Pin** (1 pt): standing on a **crack**, holds it shut.
- **Walker** (2): steps one row toward you after each ball. Past the arrows it **breaches**: you lose your next ball.
- **Sentry** (3): falls only to the ball. After each ball it stands its tethered pins back up.
- **Tentacle** (4): rises from an open crack. Stops a ball dead; retracts when a *pin* hits it.
- Points × Mult; Mult +1 per held crack at frame end. Each frame a new rank (top-left strip) enters at the back.

## Worked example (designed board, not simulated)
Mult 2. Head pin on a crack; pins 3, 5, 6, 9; sentry on 10 tethered to 6 and 9; tentacle on 8; a walker one step short of the arrows.
- **Old pocket line:** 9 × 2 = **18**, but the walker breaches (ball 2 lost), a tentacle rises on the head spot, no Mult.
- **Walker, then the back door** (the picture): 4, then the 5 into the tentacle and on into the sentry, 16. **20**, crack held, Mult 3 after.
- **Through the walker into the pocket:** about **24**, but Mult stays 2 and a tentacle blocks the centre. Over two more frames the back door wins by about 30.

## What you buy
1. **Lead-foot pin**: falls, but keeps its crack shut. *Changes the throw.*
2. **Lure pin**: walkers step toward it. *Changes the throw.*
3. **Kindling pin**: whatever it touches falls, sentries and tentacles too. *Changes the throw.*
4. **Grapple ball**: tears out a tentacle (4) instead of stopping; pins carry less. *Changes the throw.*
5. **Iron ball**: pins it drives fell sentries; cracks it crosses open. *Changes the throw.*
6. **Floor nails** (gear): tap one crack to nail it for the game. *Changes the throw.*
7. **Pit lamp** (gear): two ranks ahead, cracks a ball early. Planning.
8. **Sandbag**: held cracks give +2 Mult. Multiplier only.

## How a boss works
- **The Root** (game 3). In games 1 and 2 a dark grain line grows down one board, so you know its side. In game 3 a tentacle rises one row nearer along it each ball; a pin into the first kills it. Buy Kindling, Grapple, Lead-foot, Lures.
- **The Underside** (game 12), after the ceiling cracks in game 10. Its shadow on the far lane (next ball's drawn faintly) lifts whatever stands in it, for nothing. Three cords fall only to pins. Buy Pit lamp, Lure, Kindling.

## What it looks like
- **Silhouette first.** Sentry: a pin gone dark iron, bolted foot, one lit slit, dotted tethers. Walker: a plate on three thin legs. Crack: a dark split, cold light inside. Tentacle: tall, banded, no face.
- **Over the run.** Game 1 plain ten-pin; game 2 the pinsetter sets sentries; game 3 the boards split. After Close: lights out, invaders lit by their own slits and cracks. Computer: the scoring computer takes your side, drawing walker steps as phosphor ghosts; what it can't parse flickers violet. Arrival: chartreuse is the enemy's alone.
- **Shop.** Each piece big on its own card, level as neck bands, drawn with what it acts on.

## Failures broken
- **2, board resets:** it persists and moves.
- **3, one outcome:** clearing opens cracks and loses Mult; plugs pay.
- **4, builds multiply:** Lure, Kindling, Lead-foot and Nails move the best line.
- **5, bosses:** they show two games ahead; the shop sells counters.
- **6, balls:** Grapple and Iron trade one kind of piece against another.

## Smallest lab
`labs/ten-pin/`, one five-frame game, throw unchanged, cracks and tentacles only. Open cracks raise tentacles (the boss post's stop; retract to a pin, 4 pts); held cracks +1 Mult; each frame adds three back pins and a crack. **Logs:** line, release, setup time, pieces down by kind, cracks held, distance from last line, score. **Kill it if** first balls mostly repeat one line, clearing tops the score nearly every frame, or tentacle hits feel like luck.

## The risk
That a pin can be aimed. If sim scatter is too chaotic, "drive the 5 into the tentacle" is dice, not skill.

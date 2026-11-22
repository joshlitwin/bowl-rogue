# Pocket Deck: pins are the cue balls

**Idea:** the back pit becomes five cups under a moving lamp, and knocked pins that miss the cups stay on the deck. You score by sinking pins in the lit cup, so every ball is a billiards shot on the board your last ball left.

Rules: a knocked pin pays 1. A sunk pin pays 1, or 5 in the lit cup. The lamp steps one cup after each ball, and the next cup glows dim. A frame is always two balls. A new rack stands pins only on clear spots. Strikes give no Mult.

## The decision before each ball
Which pins can reach the lit cup now, and what this ball leaves for the next lamp.

## Worked example (measured)
Measured in the Ten-Pin sim with cups added: 3,381 lines, perfect release. Lines are start / aim / bend. Full rack, lamp on cup 1, cup 2 next.
- **Strike line** (0 / +10 / −90, Josh's usual): strike, 2 pins in the lit cup, **24**. Leaves 4 loose pins, and the best ball 2 makes **10**. Frame **34**.
- **Right-side hook** (+100 / +10 / +60): 8 down, 3 pins in the lit cup, **25**. Leaves pins 3 and 10 standing and 3 loose. Ball 2 (−100 / 0 / −90) sinks 2 in cup 2, **14**. Frame **39**.
- **Rake** (−100 / −20 / −30): a strike that sinks only 3, **17**. Leaves 7 loose pins, and ball 2 sinks 3 in cup 2, **16**. Frame **33**.

The non-strike wins, and ball 2's best line is different after each ball 1.

## What you buy
Mostly fixtures for the deck. Posts already exist in the sim; pin mass and wall bounce are constants.
1. **Bumper post**: pins bank off it, and it stops the ball dead. *Changes the line.*
2. **Kick rail**: one wall returns pins at full speed. *Changes the line.*
3. **Lead pin** (3× mass): ploughs through loose pins. *Changes the line.*
4. **Cork pin** (half mass): flies far, easy to sink. *Changes the line.*
5. **Funnel cup**: pulls in pins sliding nearby. *Changes the line.*
6. **Second lamp**: runs the opposite way. *Changes the line.*
7. **Lamp holder**: the lamp stays put after 2 or more pins land in it. *Changes the plan.*
8. **Rake**: loose pins slide 40 units toward the cups between frames. *Changes the plan.*
9. **Chalk**: a pin sunk off another loose pin pays double. *Mostly multiplies.*
10. **Two-ball bag**: Heavy breaks racks, Light caroms. You choose one each ball.

## How a boss works
The level card shows the boss's deck one level ahead.
- **Shuttered cups**: the middle three cups are closed. Counter with a kick rail, cork pins, or an outside funnel.
- **Tilted deck**: pins drift left, and loose pins creep left between balls. Counter with a low-side post, lead pins, or a rake.

## What it looks like
Same lane and camera. The back cushion becomes five dark cups, each with a brass lamp: one lit, the next dim. Loose pins lie where they stopped. Fixtures are brass and rubber, as on a bar-billiards table. The shop draws them big. The lead pin is dark grey and the cork pin tan, both with the red neck. Over a run your fixtures fill the deck.

## Failures broken
- **2, the board resets:** loose pins stay, racks fill only clear spots, and the lamp moves.
- **3, one outcome:** pins pay by where they go, and a non-strike can win.
- **4, builds multiply:** fixtures and pin weights change the geometry.
- **5, bosses:** you see the deck a level ahead and buy counters.
- **6, balls:** Heavy against Light is a choice made each ball.
- **Not broken: 1.** The release is still exact, but a repeated line meets a different board.

## Smallest lab
`labs/pocket-deck/`, copied from `labs/ten-pin/` with the throw unchanged. One game of 5 frames: cups, lamp and loose pins, no shop.
- **Log:** line, lamp cup, sinks per cup, pins left, setup seconds, and the distance from the previous line.
- **Kill it if** one line takes more than 3 of 10 balls, median setup stays under 3 s, strike-line frames score best, or sinking feels like luck.

## The risk
Players may not be able to read where a loose pin will go from this camera without a preview. A ±1 change in aim moved ball 2 from 14 to 10. If cause and effect can't be felt, the lamp is a slot machine.

*Picture: ball 2 after the right-side hook, with a post and kick rail added to show fixtures. The numbers were measured without them.*

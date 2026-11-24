# How you play Temperance Lanes (a phone bowling roguelike) from the command line

You play through one tool. Every call reopens the game where you left it and prints a screenshot path. LOOK at every screenshot with the Read tool before deciding anything: the screenshot is your eyes.

    node /home/claude/bowl-rogue/tools/play.js <YOUR_NAME> new                 # start (only once, at the very beginning)
    node /home/claude/bowl-rogue/tools/play.js <YOUR_NAME> look                # screenshot of the current screen
    node /home/claude/bowl-rogue/tools/play.js <YOUR_NAME> tap X Y [X Y ...]   # tap points on screen, in order, then screenshot
    node /home/claude/bowl-rogue/tools/play.js <YOUR_NAME> aim START AIM BEND  # preview a throw line (no throw)
    node /home/claude/bowl-rogue/tools/play.js <YOUR_NAME> throw START AIM BEND # throw it

- The phone screen is 390 wide x 700 tall. Screenshots are saved at double size (780 x 1400), so a point at pixel (x, y) in the image is tapped as `tap x/2 y/2`.
- Taps are real taps on the real interface: buttons, shop cards, pins, the RACK button, the win card's buttons, the bubbles. A tap that opens something (a card picked in the shop, a bubble) is forgotten when the call ends, so do follow-up taps in the SAME call (e.g. `tap 195 290 195 575` = tap a shop card, then a pin on the rack). Tap one thing at a time first if you want to see what it shows, then repeat it with the follow-up.
- On the lane, the screenshot carries a yellow ruler at two rows: "start" (where the ball starts, at the bottom) and "aim" (the row the line is aimed at, near the front of the pins). Numbers are lane px from the centre; the lane edges are -120 and +120. START = where the ball starts, AIM = where the line crosses the aim row, BEND = how much the middle of the path bows (-90..+90, + bows right). Use `aim` to see the drawn line before you commit.
- You don't control the release timing: each throw's timing is drawn from a real player's throws (usually within ~80 ms, sometimes way off), so a throw can drift off your line. The tool prints what happened ("ball: ...").
- On the lane you can tap a standing pin (without throwing) to read what it is; the same goes for pins in the shop's rack and in RACK.
- Work in /tmp/playtests/<YOUR_NAME>/ for any notes. Do not modify anything under /home/claude/bowl-rogue.

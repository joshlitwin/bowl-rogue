# Knock style: 10 candidates

Physics numbers are multipliers on whatever the sim uses now. I have not seen the sim's constants, so none of the figures below claim to be current values. "Pin-pin threshold" means the impact speed a pin needs from another pin to fall. "Ball threshold" is the same for a hit from the ball. Nothing here touches the handles, the timing bar, release speed or bend.

## Strike leaning (more carry, more spread)

### 1. Ironwood pin (pin type, $6)
- **Text:** Heavy. Takes a hard knock, then ploughs through.
- **Rule:** mass x3. Pin-pin threshold x2; ball threshold unchanged. Once it falls, its sliding damping is x0.5, so it keeps travelling through the rack. It is drawn darker with visible grain. Board tag `Iro`.
- **Plan:** strike. Put it at spot 1 (head pin) or in the pocket and the best play becomes "hit the Ironwood flush": it works as a second ball. The cost: being heavy, it deflects the ball off line on a glancing hit. If you miss it, other pins bounce off it like a wall, so a missed Ironwood usually means no strike.
- **Too strong / useless:** at too much mass, any head-on hit is a guaranteed strike. At too little, or with too much damping, it stops after one pin. **Tune:** mass (2 to 4) and slide damping (0.4 to 0.7).
- **Bot:** strike rate with Ironwood at spot 1 against a house pin over the same grid of aims. Also pins felled by the Ironwood per ball, and ball deflection angle on contact.

### 2. Kickback (power, $4, letter `x`)
- **Text:** Flies off hard when it falls.
- **Rule:** when this pin falls (from the ball or a pin), its outgoing speed is x1.6, capped at the ball's speed. Pins it hits use 0.8 of their pin-pin threshold. A second copy takes it to x2.0, a third to x2.3 (diminishing).
- **Plan:** strike. Load it on front and pocket pins so one hit sets off a chain. It costs a slot that could hold Quick growth or Rent, and it topples the neighbours you were growing before they are worth cashing.
- **Too strong / useless:** three copies on the head pin could make strikes near-automatic. **Tune:** speed multiplier and the stacking curve.
- **Bot:** chain falls per ball (pins felled by pins, not the ball), with and without it. Strike rate.

### 3. Live wood (gear, $7)
- **Text:** Pins hit each other harder.
- **Rule:** pin-pin restitution x1.5 (cap 0.9), pin-pin threshold x0.7. Ball-pin contact unchanged. Can't be owned alongside Dead wood: buying one replaces the other.
- **Plan:** strike. The strike window widens from "exact pocket" to "anywhere near the front of the pile". The cost is run-wide: stray pins topple your grown pins, Anchor/Rent holds fall apart, Glass pins die every ball, and the same aim gives more varied results.
- **Too strong / useless:** with Big ball plus Lane bell or Strike chain, strikes may become routine. **Tune:** pin-pin threshold multiplier (0.6 to 0.85).
- **Bot:** width of the strike window in px of aim, i.e. the share of an aim grid that strikes. Standard deviation of pins knocked at a fixed aim with timing jitter. Mean standing value at game end, which should drop.

### 4. Reactive ball (ball, $6)
- **Text:** Pins it hits fly out wide.
- **Rule:** on ball-pin contact, turn the pin's outgoing direction 25 degrees further away from the ball's line, toward the side it was hit on. Speed is unchanged. The ball's own deflection is x1.3. Release, speed and bend are exactly the house ball's.
- **Plan:** strike. Pins spray sideways into the neighbouring columns, so off-centre hits carry across the rack. The cost: the ball is knocked off line sooner and misses deep pins on its own line. A pick-off throws the target pin into its neighbours, which is bad for harvest.
- **Too strong / useless:** below about 15 degrees nobody will notice it; above about 35 the pins leave the rack sideways and hit nothing. **Tune:** the angle and the ball's deflection.
- **Bot:** lateral spread of where fallen pins come to rest. Pins per ball, strike rate, and variance at the same aim.

### 5. Wide wood (gear, $5)
- **Text:** Every pin stands a little wider.
- **Rule:** all pin radii x1.15, capped so pins at rest in neighbouring spots still don't touch. Rendered wider.
- **Plan:** strike. Gaps shrink, so the ball touches more pins and pins reach each other more often. The cost: threading a gap to pick off one pin becomes close to impossible, and the ball slows sooner because it hits more.
- **Too strong / useless:** weak if the radius cap leaves only a few px of change. **Tune:** the radius multiplier (1.1 to 1.25, set by the cap).
- **Bot:** gap-thread success (aims drawn through a gap that pass untouched), strike rate, pins per ball.

## Harvest leaning (pins stay put, you pick them off)

### 6. Pegged pin (pin type, $5)
- **Text:** Only the ball knocks it down.
- **Rule:** while standing, it never falls from pin contact and is immovable to pins (infinite mass against pins, restitution 0.3, so pins bounce off it softly). It reacts to the ball like a normal pin. After it falls it behaves normally. A peg ring is drawn at its base. Board tag `Peg`.
- **Plan:** harvest. It is a wall that stops chains, protecting the pins behind and beside it, so stand it in front of an Anchor or next to Rent pins. The cost: no strike unless the ball itself touches it, and it blocks your own carry. It differs from Bolted rack, which hits every pin and still falls to a very hard hit, and from Shield, which absorbs one hit from anything.
- **Too strong / useless:** if chains rarely reach it, it adds nothing. If the ball can always reach it, the strike cost disappears. **Tune:** restitution against pins, and whether a very hard pin hit (threshold x3) can still fell it.
- **Bot:** share of balls where it stands while its neighbours fall. Value cashed later from the pins it sheltered. Strike rate cost.

### 7. Felt base (power, $4, letter `f`)
- **Text:** Pins that hit it stop dead.
- **Rule:** against pins only: mass x4, restitution 0, pin-pin threshold x2. A second copy makes the threshold x3. Ball hits are unchanged. A green base is drawn on the pin.
- **Plan:** harvest. It deadens chains around a pin you are growing; put it on the big pin or the pin in front of it. Unlike Shield, it never protects against the ball and never runs out. The cost is the slot (competing with Quick growth and Lantern), plus a hole in your own strike carry.
- **Too strong / useless:** at x3 with two copies, a pin effectively only falls to the ball, which is a cheaper Pegged pin. **Tune:** the threshold multiplier per copy.
- **Bot:** how often the Felt pin falls to pin hits per ball, average value when cashed, and strike rate cost.

### 8. Dead wood (gear, $6)
- **Text:** Pins barely knock each other.
- **Rule:** pin-pin restitution x0.4, pin-pin threshold x1.6, fallen-pin sliding damping x2. Ball-pin contact unchanged. Exclusive with Live wood.
- **Plan:** harvest. The best play becomes "take the biggest pin or two with a narrow line each ball". It pairs with Small ball. The cost: strikes need the ball to touch nearly every pin, strike gear goes dead, and Pin quota (3 pins a ball) gets harder. It is a milder, player-chosen relative of Bolted rack; cap the combined threshold when both are active, or Bolted rack becomes nothing.
- **Too strong / useless:** too high and the game feels like full control, too low and nobody notices. **Tune:** the pin-pin threshold (1.3 to 2.0).
- **Bot:** pick-off accuracy (aim at one pin; did only that pin fall?) and variance at a fixed aim. Variance should fall clearly but not reach zero, since timing drift still moves the ball. Also strike rate.

### 9. Drop ball (ball, $7)
- **Text:** Pins it hits drop where they stand.
- **Rule:** a pin the ball touches falls at once with velocity 0 and leaves the collision world, so ball hits start no chains. Bomb still fires. The ball loses 25% of its speed per pin it fells and stops after the 4th. Release is identical to the house ball's.
- **Plan:** harvest and precision. The result is exactly the pins on the ball's swept path, plus the drift from timing, so grown pins can be cashed cleanly. It differs from Plastic, which stops on a full hit and still scatters what it hits, and from Small, which is narrower but still causes chains. The cost: no carry at all, and a strike is out of reach once more than 4 pins stand.
- **Too strong / useless:** with Steady hands and Strong wrist, this is close to full control. **Tune:** pins before it stops (3 to 5) and speed loss per pin.
- **Bot:** share of throws where the felled set equals the set on the drawn line, measured with and without timing jitter. Mean value cashed per ball.

### 10. Gap pin (pin type, $4)
- **Text:** Fallen pins come back with gaps between them.
- **Rule:** while it stands, returning pins skip every other back spot, so no two returned pins are diagonal neighbours. They fill twice as many rows. If Huddle and Gap both stand, the one further back decides. Board tag `Gap`. It is the mirror of Huddle.
- **Plan:** harvest. Isolated pins can be picked off one at a time, and a stray hit can't spread far. The cost: returns spill further forward, closer to the red line, so break-throughs come sooner and new pins get fewer rows to grow.
- **Too strong / useless:** useless when the board is full and little returns. **Tune:** gap size (one spot or two).
- **Bot:** mean count of pins within contact range of each pin, break-throughs per game, pick-off accuracy.

## Top 4

1. **Dead wood.** It answers both asks at once: it makes the harvest plan real and adds the precision Josh wants, while timing drift keeps it short of full control. It has one number to tune and a cost you feel (strikes dry up).
2. **Live wood.** It is the mirror of Dead wood, and because the two are exclusive, picking one sets the run's knock style. It is one number again, and the cost lands on harvest pieces, so the choice has weight.
3. **Pegged pin.** It is a harvest piece you can see on the lane (the peg ring) and place deliberately. It works with the existing Anchor/Rent holds, and its strike cost is visible rather than explained.
4. **Ironwood pin.** It turns strike chasing from luck into aim (hit the heavy pin flush), which is precision on the strike side. Missing it costs you, which you can watch happen.

Next in line: Drop ball, if bot runs show Dead wood doesn't add enough precision. Test it last, because it is the closest of these to full control.

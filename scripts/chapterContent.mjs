/**
 * Curated chapter content for all 34 FFVIII chapters.
 * Each entry is an array of paragraph strings.
 * Boss entries use {{BOSS:Name}} placeholders — resolved at build time from the
 * AS walkthrough parser.  SI-only chapters embed boss data inline.
 * No ASCII art. Professional wiki voice. Exhaustive fact capture.
 */
export const CHAPTER_CONTENT = {

  // ───────────────────────────────────────────────────────── DISC 1 ──────────

  'd1-preparing-for-the-exam': [
    `After the opening cinematic, Squall wakes in the Garden infirmary. Dr. Kadowaki asks a question - answer freely, because the choice only changes dialogue. Name Squall when prompted, watch the classroom scenes, then take control at Squall's desk.`,

    `Squall begins at **Lv 7** with the Revolver gunblade. Starting inventory: **5,000 Gil** · **6× Potion** · **4× Phoenix Down** · **2× Remedy** · **5× Tent**.`,

    `{{CALLOUT:perfect|Perfect Game Alert #1}} Decide before moving whether this save is aiming for a perfect-game file. FFVIII tracks character KOs and escaped battles; a perfect file keeps every character at **0 KOs** and finishes with exactly **one escaped battle**, because a later battle forces an escape. Keep levels low when practical until stronger level-management tools arrive, but do not paralyze the route - learning early GF abilities matters more than avoiding every point of EXP. Missable-item alerts also apply to perfect files.`,

    `Once back in the classroom, **examine the desk in front of Squall** and choose "Turn on the power and...", then open **Tutorial**. This awards **Quezacotl** (GF 1/16) and **Shiva** (GF 2/16). Leave the tutorial/computer, open the menu, and immediately set GF learning: **Quezacotl -> Card** first, and **Shiva -> I Mag-RF** first. The default learning order wastes early AP.`,

    `Speak with Quistis to advance, then walk down the second-floor hallway. A late student bumps into Squall; agreeing to the tour is useful for orientation and has no penalty beyond tiny later dialogue changes. In the elevator hallway, **talk to the seated student near the elevator** to receive the starter card set: **Geezard**, **Funguar**, **Red Bat**, **Gayla**, **Gesper**, **Fastitacalon-F**, and **Caterchipillar**. Take the elevator down to 1F.`,

    `{{CALLOUT:point|Balamb Garden orientation}} Balamb Garden is arranged like a wheel: the **Lobby Hall** circles the elevator, and spokes lead to the **Cafeteria** (northwest), **Dormitory** (north), **Parking Lot** (northeast), **Training Center** (east), **Library** (southeast), **Front Gate** (south), **Infirmary** (southwest), and **Quad** (west). The directory near the entrance can warp Squall directly to a facility once the option is available.`,

    `{{CALLOUT:relationship|Zell Love Quest #1}} Before leaving Garden, visit the **Library** and speak to the **Library Girl with the pigtail**. The scene is understated, but it affects the ending path of Zell's Library sidequest. In the same Library screen, examine the second bookshelf, nearest the aisle, to collect **Occult Fan I** (1/4).`,

    `Save near the directory, then head to the **Front Gate**. Quistis gives the junction tutorial and joins the party. Junction **Quezacotl** to Squall and **Shiva** to Quistis, then equip both characters with **Draw**, **GF**, and **Item** commands. If desired, return to the Library after junctioning to use the **Esuna draw point**. The Cafeteria and card work are better handled after Ifrit, when the Ifrit Card and the All trade rule make the games much easier.`,

    `{{ENCOUNTERS:0}}`,
    `Before the Fire Cavern, save on the world map. The stone road is encounter-free, but the nearby forests can produce a **T-Rexaur**. If one appears, normal files can escape; perfect-game files should reset from the save or try to survive with GF summons. Draw small stocks of early magic from Bite Bugs, Glacial Eyes, and Caterchipillars if you want better junction filler, then head east to the Fire Cavern. Use Squall's gunblade trigger action on attack impact for the 50% damage bonus; the exact input depends on platform.`,

    `{{ENCOUNTERS:2}}`,

    `Enter the Fire Cavern. Quistis explains magic junctioning and gunblade settings on the approach. Choose the **10-minute** limit; it is enough, and finishing close to zero improves the later Judgment score. All regular Fire Cavern enemies are fixed **Lv 5**, regardless of party level. Use physical attacks for Buel and Red Bat, consider Shiva only for multiple Bombs, and do not spend timer time drawing. Ignore the Fire draw point on the way in - the timer disappears after Ifrit, and the backtrack is the better time to draw.`,

    `{{BOSS:Ifrit}}`,

    `Strategy: Ifrit is fixed at Lv 6 and does not scale with the party. He casts Fire on one character or uses Jump Punch for roughly 100 damage. Have Quistis summon **Shiva** while Squall attacks physically; use Limit Breaks if they appear. If either character falls below 100 HP, draw **Cure** from Ifrit and cast it immediately. Ifrit also carries **Scan** if you want the spell recorded early. **G-Returner revives a KO'd GF**, so the drop is useful even though this fight is simple. Do not reset for a larger G-Returner drop - the minimum three is already enough, and the Ifrit Card is guaranteed.`,

    `{{CALLOUT:mechanics|SeeD Rank timer tip}} When Ifrit's naming screen appears, aim to leave the cavern with the timer as close to zero as possible. On original PSX, idling at the naming screen can let the hidden timer reach zero safely. On Steam/Remaster, track the time yourself and leave the naming screen between **0:00 and 0:03**; the original idle trick does not behave the same way.`,

    `After Ifrit joins, junction him to Squall and put your best Strength-junction magic on Squall. If earlier abilities are learned, set the next targets now: **Quezacotl -> Card Mod** after Card, **Shiva -> Str-J** after I Mag-RF, and **Ifrit -> F Mag-RF**. On the way out, draw from the Fire draw point and from any enemies you feel like stocking, because the timer is gone. Return to Balamb Garden; Quistis gives the GF ability/HP tutorial and leaves the party.`,

    `{{ENCOUNTERS:1}}`,

    `{{CALLOUT:card|Pre-exam card setup - Queen of Cards and All}} Before returning to Garden for serious card wins, detour to **Balamb Town** and find the Queen of Cards by the train station. Challenge her only to check the trade rule. If it is not **All**, quit and retry until All appears. Once All appears, stop challenging her for now; you do not need to play her, and another challenge can shift the trade rule away from All. If the trade rule degrades from **All** to **One**, keep challenging and quitting against local players until **All** cycles back. If the Queen has already moved away from Balamb, this recovery no longer works for Balamb's trade rule, so set All before sending her elsewhere. The Balamb item shop is available, but it has no special stock beyond standard supplies.`,

    `{{CALLOUT:mechanics|Balamb Beach AP farming}} The beach south of Balamb Town is the best early AP farm because **Fastitocalon-F** commonly appear in pairs for **3 AP each** (6 AP per pair) and drop **Fish Fins**. Junction Thunder to Elem-Atk if available. If keeping EXP low matters, use Quezacotl's **Card** command to finish enemies without EXP, though this slows the grind. Aim to learn the elemental refinement abilities and especially **Card Mod**; do not sit here solely for **Mid Mag-RF** or **Ammo-RF**.`,

    `{{CALLOUT:mechanics|GF learning order through the exam}} **Quezacotl**: Card -> Card Mod -> T Mag-RF -> Mid Mag-RF -> Boost -> Vit-J -> Elem-Def-J -> Elem-Defx2 -> remaining junctions -> everything else. **Shiva**: I Mag-RF -> Str-J -> Boost -> Elem-Atk-J -> Spr+20% to unlock Elem-Def-J -> Elem-Def-J -> Elem-Defx2 -> Vit-J -> everything else. **Ifrit**: F Mag-RF -> Ammo-RF once Ifrit reaches Lv 10 -> Boost -> Str+% abilities to unlock Str Bonus -> Str Bonus -> junctions -> everything else.`,

    `Fish Fins refine via **I Mag-RF** into **20× Water** each. Do not waste turns trying to draw Water from Fastitocalon-F here - at this level they do not carry it. Water is excellent early junction filler, especially before stronger card-mod magic is ready.`,

    `{{CALLOUT:card|Rare cards available now}} With the Ifrit Card and the All trade rule, build a real deck. Win the **Quistis Card** from the Trepe Groupies in the 2F classroom or Cafeteria; this should be the first rare-card target because it is powerful in play. Win the **MiniMog Card** from the boy running laps around the lower-level Garden hallway. MiniMog is weak as a playing card, but do **not** mod it - it is needed for a later Queen of Cards step. Do not mod the **Ifrit Card** either; it is both a strong playing card and required for a later rare-card trade.`,

    `{{CALLOUT:refinement|Early Card Mod priorities}} Keep a playable hand and do not mod every useful card. These are the strongest early card-mod targets if you choose to power up before the exam: **Gesper Card -> Black Hole -> Degenerator**; **4× Malboro Card -> Malboro Tentacle -> Bad Breath**; **10× Ruby Dragon Card -> Inferno Fang -> Fire Breath** or **20× Flare** via F Mag-RF; **10× Behemoth Card -> Barrier -> Mighty Guard**; **SAM08G Card -> Running Fire -> Gatling Gun**; **Fastitocalon Card -> Water Crystal -> Aqua Breath** or **50× Water**; **5× Fastitacalon-F Card -> Water Crystal -> 50× Water**; **Creeps Card -> Coral Fragment -> Electrocute** or **20× Thundara**; **Gayla Card -> Mystery Fluid -> Acid**; **Tri-Face Card -> Curse Spike -> L?Death**; **Caterchipillar Card -> Spider Web -> Ultra Waves**. **Elastoid Card -> Steel Pipe** is a useful side pickup: Steel Pipes teach **SumMag+10%** and unlock **SumMag+20%** on a GF, and spare Steel Pipes have later weapon and GF-quest uses. Do not grind Elastoid Cards at the expense of the exam route, but keep and mod any extras that fall into your hand. Degenerator is the standout because it ejects almost every regular non-boss enemy for the whole game.`,

    `{{CALLOUT:refinement|Early magic refinement targets}} The best Strength spike is **Abyss Worm Card -> Windmill -> 20× Tornado** with T Mag-RF. Other useful options: **Snow Lion Card -> North Wind -> 20× Blizzaga**; **Blitz Card -> Dynamo Stone -> 20× Thundaga**; **3× Hexadragon Card -> Red Fang -> 20× Firaga**; **Thrustaevis Card -> Shear Feather -> 20× Aero**; **Bomb Card -> Bomb Fragment -> 20× Fira**; **Glacial Eye Card -> Arctic Wind -> 20× Blizzara**; **Fastitacalon Card** or **5× Fastitacalon-F Card -> Water Crystal -> 50× Water** for early Water junction stock. If Mid Mag-RF is learned, it can upgrade low-level Fire/Blizzard/Thunder/Cure stocks, but Card Mod routes are usually more efficient.`,

    `{{CALLOUT:card|Who to play for common cards}} Level 1 cards: all Garden players except the boy sitting in the Library and Trepe Groupie #1. Level 2: all Garden players except random hallway students, Trepe Groupie #2, the girl and black student in the Library hallway, and the girl in the 2F hallway. Level 3: most Garden players; **Trepe Groupie #2** is the easiest Level 3 source. Level 4: Trepe Groupie #3, Cafeteria Lady, all Library-area students except the **Girl in Pigtails behind the desk**, Dormitory hallway girls, and the girl in the 2F hallway; the random student in the hallway toward the Library is a strong Level 4 farming target. Level 5: all Trepe Groupies, the Gatekeeper, Cafeteria Lady, male student in blue in the Library, and the girl in the Library reading room; **Trepe Groupie #1** is the best Level 5 target. The girl in the Library reading room can play Levels 1-5 except **PuPu**, which no one plays normally. No currently accessible Garden player uses Level 6 or Level 7 cards.`,

    `{{CALLOUT:sidequest|Novice SeeD Candidates quest}} 5-part missable sidequest. Three students in the Balamb Garden Cafeteria are trying to pass the SeeD exam. Speak to them now, before the SeeD Exam, at the cafeteria tables. Later windows: after the exam before departing for Timber; after the D-District Prison escape before Fisherman's Horizon; Disc 2 after the Garden Festival at Fisherman's Horizon; and Disc 3 before the Trabia Canyon dream sequence. Completing all five windows rewards a unique graduation scene. Miss any window and the quest cannot be completed.`,

    `In the Cafeteria, talk to the **Cafeteria Lady** until she stops giving new dialogue; this minor dialogue chain appears to close later. Then return to the Library.`,

    `{{CALLOUT:relationship|Zell Love Quest #2}} Speak to the **Conceited SeeD** in the Library. He can fail to appear; if he is missing, do not reset the route just for him, because later opportunities exist.`,

    `{{CALLOUT:perfect|Perfect Game Alert #2}} Before moving on, perfect-game files should get **100× Tornado** (or **100× Flare**, if you are willing to grind the cards) and junction it to Squall's **Strength**. Other magic stocks are flexible here; this Strength benchmark is the important preparation for an upcoming score-sensitive task.`,
  ],

  'd1-the-seed-exam': [
    `Return to Balamb Garden and change into the SeeD uniform in the **Dormitory**. In the main hall, meet Zell — a martial-arts fighter with a tribal tattoo. Receive the mission briefing from Headmaster Cid. **Do not let Seifer land any kills** during the exam; his kill count should remain at zero for a perfect record. Also go to **Config → Cursor → Memory** so the last battle command is remembered between turns — this significantly speeds up drawing in battles. **Seifer's limit break note**: Seifer's Fire Cross Limit Break triggers when his HP falls below 84% of his maximum — a far higher threshold than the 32% that applies to all other characters. This makes it easy to trigger during the exam battles. Make use of it against the Anacondaur.`,

    `Drive the car to Balamb Harbor. Board the vessel and go directly outside — do not speak to Quistis on board. Obey Seifer's order to head out; a cutscene plays on the beach.`,

    `{{ENCOUNTERS:0}}`,

    `On the beach, **junction a GF to every party member** before engaging anyone. Head upstairs to fight two weak Galbadian Soldiers. Continue through the streets of Dollet, defeating soldiers in the town square and at the checkpoint north. Speak to Seifer twice, then follow him. An Anacondaur ambushes the party on the way to the communications tower — it is noticeably tougher than the soldiers. Do not use the Triangle escape option from the map; each use costs one SeeD rank point.`,

    `At the communications tower, **junction all party members fully** before ascending the elevator. Seifer leaves the party permanently after the upcoming scene; Selphie takes his place.`,
    `At the top of the tower, the battle opens against Biggs and Wedge before Elvoret interrupts. **Biggs** holds **Fire, Thunder, Blizzard, and Esuna** — prioritize drawing Esuna for early status-defense junctions. **Wedge** holds **Cure**. Mug over drop: **Mug Biggs** for 3× Elixir (his drop is only 2× Elixir); **Mug Wedge** for 3× Cottage (his drop is only 2× Cottage). Also check for an invisible **Blind draw point** at the base of the tower before ascending — stock Blind here, as it is extremely useful for Elvoret and later bosses. **Lore note**: A unique one-time scene plays between Biggs and Wedge mid-fight if Biggs is still alive when the battle goes on long enough — finishing Biggs immediately skips this permanently. The Mug strategy naturally prolongs the fight enough to trigger it, so follow the mug order above before delivering the killing blow.`,

    `{{BOSS:Biggs}}`,

    `{{BOSS:Wedge}}`,

    `{{BOSS:Elvoret}}`,

    `Strategy: Elvoret has no elemental weakness but its offense is genuinely dangerous — **Storm Breath** hits all three party members for heavy non-elemental damage, and its physical strike hits hard as well. Its magic (Fire and Thunder) is less threatening than the physical attacks. If drawing multiple spells before finishing the fight, inflict **Darkness** on Elvoret first — this dramatically reduces its physical accuracy and takes the pressure off the party while drawing. Elvoret is susceptible to Slow (90%) and Confuse (90%) as well, which can be used to create additional safe drawing windows. Priority draw: Siren first, then Double, then Thunder for junction stock.`,

    `{{CALLOUT:missable|Missable — Draw Siren from Elvoret}} Draw **Siren** from Elvoret before finishing the fight. Elvoret also holds **Double**, which is an excellent early junction. Elvoret has a **100% chance** to drop **Weapons Monthly March Issue** (1/7) — it is always in the loot. After Elvoret falls, a **30-minute countdown** begins. Do NOT speak to Biggs; exit the elevator immediately and junction Siren to a character. **Elvoret Card refine chain**: Elvoret Cards (won by using the Card command on Elvoret, or later from card players) → Card Mod → **Death Stone** → L Mag-RF → **10× Death** per card. Death is an excellent St.Atk-J spell and early access to it is very useful for status-build farming. **Death Stone battle use note**: When used directly in battle, a Death Stone inflicts instant-death on one enemy — however it has **no effect on undead or Zombie-status targets** (unlike the Death spell, which instantly kills undead enemies). Use Holy Water or Fire/Cure to kill undead instead. **Healing Water refine chain**: Jelleye enemies (encountered in the Dollet exam area and surrounding forests) can be stolen from for **Healing Water**. Via Tool-RF → **2× Tent** per Healing Water; or via Recov Med-RF → **2× Hi-Potion** per Healing Water. The Tent refine is generally more efficient — Tents restore all party members' HP in the field and remove **Poison, Petrify, Darkness, Silence, Zombie, and KO** — but do NOT cure Berserk, Sleep, Slow, Stop, Curse, Confuse, Vit 0, or Doom. Cottage works identically for status removal but also restores all GF HP. For full status removal including Slow/Stop/Doom, use Remedy+ or the Treatment command instead.`,

    `Outside the tower, X-ATM092 — a massive robotic spider — is released. Fighting it repeatedly is the fastest AP source available; each fight awards 50 AP. **The bridge sequence has a hard cap of 12 encounters** — after 12 defeats X-ATM092 stops respawning, so a complete farming session yields ~600 AP maximum. Alternatively, it can be dodged entirely, which preserves a higher SeeD rank. For a standard playthrough, farm it for AP to accelerate GF abilities.`,

    `{{BOSS:X-ATM092}}`,

    `Strategy: X-ATM092 is **weak to Lightning (×1.5)**. Its attacks are Clash (physical hit to all party members), Arm Crush (single heavy physical), and Ray-Bomb (heavy non-elemental damage to all). All three attacks are halved by **Protect** status — **Protect is in its draw list**, so drawing it and casting it immediately is the most effective way to reduce incoming damage. After losing approximately 20% of its max HP, X-ATM092 falls to the ground and becomes temporarily inactive, then repairs itself back to full HP. The first battle is scripted: no matter what, X-ATM092 cannot be destroyed and the mandatory escape prompt fires. In subsequent encounters, defeating it requires knocking it down and letting it self-repair twice (depleting its HP to the repair threshold twice), then a final kill before it repairs a third time. For AP farming, the fastest method is to knock it down on each encounter without landing the killing blow, then escape — it repairs and is ready for the next fight.`,

    `{{CALLOUT:point|Dodging route}} Use the D-pad (not the analog stick) at Selphie's Cliff to avoid getting stuck on rocks. On the cracked-road screen, hold Triangle to walk — otherwise X-ATM092's ground slam knocks Squall down. On the bridge, let X-ATM092 leap over, then run left, let it leap again, then run right to the town square. **Do not enter the café** in the town square (SeeD deduction). **Do not jump off the cliff** when given the option (SeeD deduction). Head straight to the beach.`,

    `One of four items drops when X-ATM092 is finally destroyed: **Orihalcon**, **Power Wrist**, **Hypno Crown**, or **Force Armlet** — each teaches a GF a +40% stat ability. After the escape scene on the beach, the SeeD Exam concludes.`,

    `{{CALLOUT:mechanics|SeeD salary by rank}} Gil awarded every 24,575 steps. Rank 1: 500 · Rank 2: 1,000 · Rank 3: 1,500 · Rank 4: 2,000 · Rank 5: 3,000 · Rank 6: 4,000 · Rank 7: 5,000 · Rank 8: 6,000 · Rank 9: 7,000 · Rank 10: 8,000 · Rank 11: 9,000 · Rank 12: 10,000 · Rank 13: 11,000 · Rank 14: 12,000 · Rank 15: 12,500 · Rank 16: 13,000 · Rank 17: 13,500 · Rank 18: 14,000 · Rank 19: 14,500 · Rank 20: 15,000 · Rank 21: 15,500 · Rank 22: 16,000 · Rank 23: 16,500 · Rank 24: 17,000 · Rank 25: 17,500 · Rank 26: 18,000 · Rank 27: 18,500 · Rank 28: 19,000 · Rank 29: 19,500 · Rank 30: 20,000 · Rank A: 30,000. **SeeD test unlock rule**: Tests are only available up to the number equal to Squall's current level — e.g., at Lv 10 only Tests 1–10 are accessible. All questions are Yes/No. **Test answers (Y=Yes, N=No)**: Test 01: Y-N-Y-Y-Y-N-N-Y-N-N · Test 02: Y-N-Y-Y-Y-N-Y-Y-N-N · Test 03: N-N-Y-N-Y-Y-Y-N-Y-N · Test 04: N-Y-Y-Y-N-N-Y-Y-N-N · Test 05: N-N-N-Y-Y-N-N-Y-Y-Y · Test 06: Y-N-Y-Y-N-N-Y-Y-N-Y · Test 07: Y-Y-Y-Y-Y-Y-N-Y-Y-N · Test 08: N-Y-N-N-Y-Y-N-N-Y-N · Test 09: N-Y-N-N-N-N-N-N-Y-Y · Test 10: Y-N-N-N-N-N-N-N-Y-N · Test 11: Y-Y-N-Y-Y-N-Y-N-N-Y · Test 12: N-Y-N-N-Y-N-Y-N-Y-N · Test 13: Y-N-N-N-Y-N-N-N-N-N · Test 14: Y-Y-Y-Y-N-Y-Y-N-Y-N · Test 15: Y-Y-N-N-N-N-N-Y-N-Y · Test 16: Y-N-N-Y-N-Y-N-N-Y-N · Test 17: Y-N-N-N-Y-N-N-Y-N-N · Test 18: Y-N-N-N-Y-N-N-N-N-N · Test 19: Y-N-N-Y-N-N-N-N-N-Y · Test 20: Y-Y-N-Y-N-Y-Y-Y-N-N · Test 21: Y-Y-Y-Y-N-N-Y-Y-Y-N · Test 22: N-N-N-Y-N-N-N-Y-Y-N · Test 23: Y-N-N-N-N-Y-Y-Y-Y-Y · Test 24: Y-Y-N-N-Y-Y-N-N-N-Y · Test 25: Y-N-Y-Y-Y-N-N-Y-N-N · Test 26: Y-Y-N-Y-N-Y-N-Y-N-N · Test 27: N-Y-N-N-N-N-Y-N-Y-N · Test 28: Y-N-N-Y-Y-Y-N-Y-N-N · Test 29: N-N-N-Y-Y-N-N-N-Y-N · Test 30: N-Y-N-N-N-N-Y-N-N-N.`,
  ],

  'd1-after-the-exam': [
    `Back in **Balamb Town**, enter the **Hotel** and check the table in the upstairs room to find a copy of **Timber Maniacs** (1/12). Note: a copy also sits at the train station — only one of the two can be collected; whichever is picked up first causes the other to disappear. Head to Zell's house — it is on the screen with the Thunder draw point — and challenge **Ma Dincht** for a card game to win the **Zell Card**. **Note**: Zell must be in the active party for his mother to play the Zell Card — she will not put it in her deck if Zell is absent.`,
    `Return to Balamb Garden. In the main hall, speak to Xu, Quistis, and Cid in sequence. Head toward the library for a brief scene with Seifer, then try to exit to trigger the announcement to assemble on the second floor.`,

    `{{CALLOUT:missable|Missable — Battle Meter}} This is a missable item. Talk to Raijin, Fujin, Zell, and a background student on the 2nd-floor hallway. When dismissed to the Headmaster's Office, **speak to Cid to receive the Battle Meter**. If not collected now, there is exactly one more chance: revisit Cid's office on the 3rd floor after receiving the Magical Lamp later in this chapter. After the Timber Mission departs, the Battle Meter is gone forever.`,

    `After the ceremony, go to the classroom where the SeeD score is revealed. Change into regular clothes and speak to Selphie to attend the graduation party. At the party, answer "Yeah, I guess so." to Selphie. After the scenes, change back and head to the Training Center with Quistis, who delivers the Status Junction Tutorial.

{{CALLOUT:achievement|Achievement: First Salary}} earned automatically the first time Squall receives a SeeD salary payment. This triggers on its own while walking through Balamb Garden after the Training Center events (salary is paid every 24,575 steps). No action is required; simply continue playing.`,
    `{{ENCOUNTERS:0}}`,

    `Inside the Training Center, take either the left or right path and proceed north to the exit. Save at the save point nearby. Before leaving, check junctions on both Squall and Quistis. A distress call leads to a boss encounter near the exit.`,

    `{{BOSS:Granaldo}}`,

    `{{BOSS:Raldo}}`,

    `Strategy: Three Raldos accompany Granaldo. Draw **Shell** and **Protect** from the Raldos (at high levels they also hold **Fire** and **Thunder**), then eliminate them physically — this removes Granaldo's most powerful attacks. Granaldo holds **Sleep** and **Blind** (and **Shell** at higher levels). Put Granaldo to Sleep and pummel it. **Mug Granaldo for 8× Wizard Stone** — his standard drop is only 4× Wizard Stone, making Mug strictly better.`,

    `After the battle, a girl is taken away by two figures in white. Return to the dormitory — Squall now has a new private room. The next morning, collect the **Weapons Monthly April Issue** from the desk.`,

    `Head to the Front Gate. Before leaving, go to the 3rd floor and speak to **Cid** to receive the **Magical Lamp** — it summons the GF Diablos. This is also the last chance to collect the **Battle Meter** from Cid here. **After the Timber Mission begins, neither item can be obtained.** Also challenge Cid to a card game to win the **Seifer Card** — one of the best rare cards available and a prerequisite for the Queen of Cards quest. **Magical Lamp failure condition**: Cid is only available on the 3rd floor at this exact moment. If Squall tries to walk further *inside* Garden without first going to the 3rd floor to talk to Cid, he disappears and neither the Magical Lamp nor the Battle Meter can be obtained for the rest of the game. The Magical Lamp is unique — there is no second copy. Always visit Cid on the 3rd floor before doing anything else after the graduation ceremony.`,

    `Use the Magical Lamp carefully — junction well before activating it.`,

    `{{BOSS:Diablos}}`,

    `Strategy: Open immediately with Blind on Diablos — this neutralizes its physical attack almost entirely. Its signature moves, Demi and Gravija, deal percentage-based HP damage and cannot kill outright. **Demi** reduces the target's current HP by 25% and has a hard cap of **9,999 damage** — on enemies with very high HP (above roughly 40,000 current HP), this cap means Demi's effective percentage drops below 25%, so its proportional advantage disappears on extremely healthy targets. Below the cap it always deals exactly 25% of current HP regardless of Vit or Spr. **Diablos's summon attack (Dark Messenger) calculates damage from the enemy's MAX HP**, not current HP — at Lv 10 it deals 10% of max HP, scaling 1% per level up to 100% of max HP at Lv 100. Because it references max HP, it is equally effective regardless of how much the enemy has already been worn down. Draw **Cura** and **Demi** to stock up. At **Lv 30+** Diablos also holds **Holy** and **Flare** — extremely valuable junction spells. Finish with Limit Breaks (Squall and Quistis should be in low HP from Gravija).`,

    `Diablos's most important abilities to learn first: **Mug**, **Enc-Half**, **Enc-None**, **Time Mag-RF**, and **ST Mag-RF**. Enc-None is invaluable for managing encounters. **Enc-Half** (30 AP) reduces random encounter frequency by exactly 50% — useful when Draw or Mug farming is complete and fewer battles are desired without eliminating them entirely. **Siren GF ability priority**: **ST Mag-RF** → **Tool-RF** → **L Mag-RF** → **Supt Mag-RF** → **Move-Find** → **High Mag-RF** → **GFAbl Med-RF**. **Move-Find** (40 AP) makes previously invisible save points and draw points visible on the field — it reveals hidden saves in the Dollet Pub, the Deep Sea Research Center (the concealed save point just before Ultima Weapon), and other locations throughout the game. Unlock Move-Find soon after obtaining Siren so no hidden draw points are missed during exploration.`,
  ],

  'd1-the-timber-mission': [
    `{{CALLOUT:relationship|Zell's Love Quest (Step 2)}} After hearing the Timber mission briefing from Cid, return to the Library and talk to the Library Girl again — she and Zell discuss "Good-bye Pururun." This step must be completed before boarding the train. **Novice SeeD Candidates (Window 2)**: Before boarding the train for Timber, visit the **Cafeteria** and speak to the three novice students again — this is the second of five dialogue windows for their quest. Miss this and the quest cannot be completed.`,

    `Before departing for Timber, complete the **Queen of Cards** setup: in Balamb, **lose the MiniMog Card to the Queen of Cards** near the train station. **Achievement: Loser** — earned by intentionally losing a rare card in a Triple Triad match (the losing player must have selected a rare card to use and the opponent takes it). This first deliberate loss to the Queen counts. If the opportunity is somehow missed here, any future intentional loss of a rare card in any Triple Triad game will also trigger it. After the loss, speak to her — if she announces she is moving to Dollet, perfect. If she says Galbadia (Deling City), reset and try again; she must go to Dollet for the quest to proceed optimally. **Queen of Cards complete movement table**: Balamb → Dollet (37.5%) or Deling City (62.5%). Dollet → Balamb (37.5%) or Deling City (62.5%). Deling City → Balamb (12.5%), Dollet (12.5%), Winhill (12.5%), or FH (62.5%). Winhill → Deling City (37.5%), Dollet (37.5%), or FH (25%). FH → Dollet (12.5%), Winhill (25%), or Esthar (62.5%). Esthar → Dollet (12.5%), Shumi Village (25%), FH (12.5%), or Lunar Gate (50%). Shumi Village → Balamb (25%), Dollet (50%), or Lunar Gate (25%). Lunar Gate → any area (random, no clue given). To locate her in each city: Balamb = in front of Balamb Town Station; Dollet = upstairs in the Dollet Pub; Galbadia = the hotel in Deling City; Centra = the hotel in Winhill; FH = train tracks (with Save Point); Esthar = Presidential Palace screen with the elevator; Shumi Village = the hotel in Shumi Village; Lunar Gate = Lunar Gate hallway in the background. Losing cards to her triggers new rare cards: MiniMog → Kiros Card (man in black, Deling City shopping arcade); Sacred → Irvine Card (Flo at FH Mayor's house); Chicobo → Chubby Chocobo Card (bench student, Balamb Garden main hall); Alexander → Doomtrain Card (Timber Pub owner); Doomtrain → Phoenix Card (Presidential Aide in blue, Esthar Presidential Palace). All cards lost to the Queen can be recovered from her son in Dollet.`,

    `Board the train from Balamb. In the passenger cabin, examine the luggage compartment to find **Pet Pals Vol. 1**. Respond "Not too much" when prompted for information about Timber. The party then falls into a dream sequence.`,

    `{{ENCOUNTERS:0}}`,

    `In the dream, Squall, Zell, and Selphie become **Laguna, Kiros, and Ward** respectively — their junctions carry over. Navigate the linear forest path, board the vehicle, and arrive in Deling City. Follow the linear path and enter the Galbadia Hotel. Downstairs, choose "Let's get a load off" to advance. Speak with Julia, the pianist, then return upstairs and ask the receptionist for Julia's room number.`,

    `Back in control as Squall in Timber, answer "But the Owls are still around" to the Forest Owls. Follow the guide to the train. Inside, **challenge Watts to a card game** — aim to spread the **Open** rule; however, be careful during any rule-mixing proposals: do **not** accidentally abolish **Same** from Galbadia's card region. The Same rule is an essential part of Galbadia's card environment and abolishing it would make later card-play significantly harder there. If Watts proposes to abolish Same, decline or reset. Then win the **Angelo Card** from him. Card Modding the Angelo Card yields **100× Elixir**, one of the best early returns in the game.`,

    `{{CALLOUT:mechanics|Forest Owls Train Mission}} Save before talking to Watts to start the mission. The mission has seven phases and a strict 5-minute time limit (running out = Game Over). (1) Climb onto the roof of the 2nd escort car when prompted. (2) Sneak across the roof: the red soldier's sensor has a one-window range to each side — move only while the red soldier is scanning below, and stop when the blue soldier scans. When the blinds are closed, neither guard is scanning. (3) Cross the roof of the President's car. (4) Use the rope to descend the side and enter codes to uncouple the 1st escort car. Button mapping: Circle=1, X=2, Square=3, Triangle=4. Check L1 before starting each 4-digit code sequence — once you begin, you cannot return to the roof. You have 5 seconds per code; a wrong input or timeout clears all previously entered codes (does not count as being caught). Three correct code sequences complete this phase. (5) Watch the dummy and base cars move into position. (6) Descend again and enter codes to uncouple the 2nd escort car (use R1 to check for guards). Five correct code sequences required. (7) Escape. If caught, you may retry (but it counts as a catch and reduces your SeeD rank); declining the retry is a Game Over. **SeeD rank impact**: 0 catches = +1 SeeD rank; 1–9 catches = no change; 10+ catches = −1 SeeD rank. Reload your save if caught to preserve the rank bonus.`,

    `Collect **Pet Pals Vol. 2** from the bed in the cabin where Rinoa was found. Return to the front of the train and speak to Rinoa when ready. **Critical: After the first Laguna dream sequence ends and control returns to Squall in Timber, open the junction menu immediately and re-assign all GFs to your party members** — the dream sequence uses a separate party (Laguna, Kiros, Ward) and can clear or shuffle GF assignments from Squall's group. Always verify that every junction is intact after each dream segment.`,

    `{{ENCOUNTERS:1}}`,

    `In **Timber town**, visit the **Pet Shop** to purchase **Pet Pals Vol. 3** and **Pet Pals Vol. 4** — these teach Angelo additional Limit Break moves. The Timber Pet Shop also sells four GF command scrolls for **5,000 Gil each**: **Magic Scroll** (teaches Magic command to a GF), **GF Scroll** (teaches GF command), **Draw Scroll** (teaches Draw command), and **Item Scroll** (teaches Item command). These are the cheapest way to add those commands to any GF that lacks them — particularly useful for equipping Magic or Draw to Brothers or Diablos early. With Tonberry's **Familiar** ability unlocked, the Timber Pet Shop also stocks five junction-ability scrolls for **10,000 Gil each** — **HP-J Scroll**, **Str-J Scroll**, **Vit-J Scroll**, **Mag-J Scroll**, and **Spr-J Scroll** — each teaching the respective junction ability to any GF that lacks it. These are the only place to buy these scrolls before Esthar's Pet Shop opens (which has the same five scrolls but also sells them without Familiar); if a GF is missing a critical junction and Familiar is already learned, picking up the relevant scroll here is worthwhile rather than waiting. Be aware that Vol. 5 and Vol. 6 (available later in Esthar) teach Angelo Search, one of the most powerful passive farming abilities in the game; buying all six volumes is recommended in the long run.

{{CALLOUT:missable|Missable — Angelo Recover / Reverse}} Do NOT teach Rinoa **Angelo Recover** or **Angelo Reverse** until Angelo Search (Pet Pals Vol. 5, purchased in Esthar on Disc 3) is fully mastered and all desired items have been farmed. Both Recover and Reverse trigger automatically during battles, interrupting the idle Angelo Search session before it can produce rare items. Teaching either skill prematurely locks out the longest and most efficient farming window in the game. Read Pet Pals Vol. 5 first, complete all overnight Angelo Search farming, then — and only then — teach Recover and Reverse. **Angelo Rush** is Rinoa's baseline passive counterattack — it requires no Pet Pals volume and is available from the moment Rinoa joins the party. It triggers automatically after Rinoa is hit by a certain number of single-target attacks (not a random chance per turn), dealing physical damage at 1.5× Strength. Players may notice it firing more frequently when Rinoa is being targeted repeatedly — this is the hit-counter trigger, not random RNG. **Rinoa's Combine skills and mastery requirements**: Reading each Pet Pals volume only begins the learning process — Rinoa must then walk a set number of steps before the skill is fully mastered. Vol. 1 (found in train luggage compartment on Disc 1): Angelo Strike (800 steps to master). Vol. 2 (found in the train cabin): Angelo Recover (200 steps — skip until Angelo Search is complete; when it triggers, it restores **62.5% of a KO'd or wounded ally's max HP** automatically). Vol. 3 (Timber Pet Shop): Invincible Moon (920 steps — grants full Invincible status to all allies, making them immune to all damage and status effects for the duration). Vol. 4 (Timber Pet Shop): Angelo Reverse (260 steps — skip until Angelo Search is complete; when it triggers, it revives a KO'd ally and restores **12.5% of their max HP**). Vol. 5 (Esthar Pet Shop): Angelo Search (400 steps to master — the passive item-recovery skill). Vol. 6 (Esthar Pet Shop): Wishing Star (1,060 steps — 8-hit physical to all enemies). Invincible Moon at CL3 is the most reliably triggered high-tier Combine outside of Wishing Star, making Vol. 3 worth mastering soon. **Controlling which Combine fires**: Which skill Rinoa uses depends on her Crisis Level — CL1: Angelo Cannon, CL2: Angelo Strike, CL3: Invincible Moon, CL4: Wishing Star. If a skill has not yet been learned, the system jumps to the next learned skill on the list. This means if you deliberately skip learning Wishing Star, Rinoa will always use Invincible Moon at CL4, making it far more reliable to trigger. For players who do not need Wishing Star's 8-hit all-enemy damage, this is a valid and powerful strategy for the endgame. In the **Timber Maniacs building** at the square, check the back of the right magazine pile to find **Timber Maniacs** (2/12). Also check the building for a **Blizzaga draw point**.

{{CALLOUT:missable|Missable — Girl Next Door Magazine}} Pick up the **"Girl Next Door" magazine** from the Timber Maniacs building now. It is needed on the White SeeD Ship (Disc 3) to obtain the Shiva Card from Zone. If it is not collected before Disc 4, it is permanently gone. In the building on the left side of the square, the **old man's house** offers either a **free party heal** OR **500 Gil** — these are mutually exclusive. Talking to the old man first triggers the free heal. Examining the cupboards first locks out the heal and gives 500 Gil instead. If you need the party healed here, speak to the old man before touching anything else. In the **Pub**, challenge the soldiers at the square table to win a **Buel Card**; speak to the drunk at the counter — a dialogue choice determines which card he offers: select **"Buy him a drink"** to receive a **Forbidden Card**, or **"Tell him about the card"** to receive a **Tonberry Card**. The Forbidden Card is generally more useful for refinement. The **"Girl Next Door" magazine** is available in the Timber Maniacs building — pick it up now. It is needed later on the White SeeD Ship and becomes permanently unavailable once Disc 3 ends.`,

    `Ensure at least one character has the Item command equipped before the upcoming boss fight.`,

    `{{BOSS:Fake President}}`,

    `{{BOSS:Gerogero}}`,

    `Strategy: The Fake President goes down instantly — focus entirely on Gerogero. As an **Undead enemy**, a single **Elixir** (or Phoenix Down, Curaga, X-Potion, or the Recover command) kills it outright for 9,999 damage. Before finishing, draw **Esuna**, **Double**, **Berserk**, and **Zombie** from Gerogero — all are useful junctions or utility spells. **Mug 2× Phoenix Down** before delivering the killing blow. The item drop is **Zombie Powder** (useful for inflicting Zombie status). Note: Gerogero cards can be obtained via Card command or using the Card ability — 10× Gerogero Card → Card Mod → **Circlet** (teaches any GF **Mag+20%**); alternatively, Circlets can be used directly on party members as accessories for the same effect via the Mag+20% GF ability.\n\n{{CALLOUT:enemy|Gerogero combat notes}} Physical attacks deal halved damage against it — rely on magic or healing items for the kill. It is ×3 weak to **Fire**, **Earth**, and **Holy**, so a single Fire or Fira while it is at low HP can nearly one-shot it without wasting an Elixir. Its **Brrawghh!** attack inflicts **Curse**, **Darkness**, and **Slow** simultaneously — if it lands, cure Curse immediately as it blocks Limit Breaks, and Darkness significantly reduces physical accuracy. **Edea's Disc 1 bonus**: During this fight on Disc 1, if the entire party is defeated, Edea uses Carbuncle as a backup caster — the party does NOT receive a Game Over. Each use of Carbuncle by Edea wastes exactly three turns. This safety net does not carry over past Disc 1 and Edea cannot be controlled to use it deliberately.`,

    `After the scenes, the party finds itself back in Timber. Speak to Watts to advance. **Zone's supply gift**: after speaking with Zone following the TV station broadcast, he gives the party a free supply package including **Potion × several, Phoenix Down, Soft, Antidote, and Remedy** — accept it; these are free items and Remedy is useful for status cure chaining early in the game. **Timber Journalist (two-part missable sidequest)**: Before leaving Timber on Disc 1, return to the town square (where the Timber Maniacs building is) and speak to a man there; choose the option that encourages him to pursue journalism — he vows to become a journalist. Then, on **Disc 2**, return to Timber and speak to him again (he will be standing in the same town square area) to collect a **Pet Nametag** as thanks. The Pet Nametag is one of only two fixed-location copies in the game (the other is in D-District Prison) — additional copies can come from Chocobo World in Remastered, but these two are the reliable sources for any run. Do not skip either half of this quest. The Disc 1 trigger must happen before the party permanently departs Timber.`,
  ],

  'd1-dollet-exploration': [
    `With the optional period in Timber and Dollet now open, several rewarding stops are available before advancing the story.`,

    `{{ENCOUNTERS:0}}`,

    `In **Dollet**, enter the pub on the main street. The **Pub Owner** plays cards; his private back room (accessible after beating him once) contains stacks of magazines and free card gifts. **Talk to the Pub Owner inside the private room** to receive: **5× Geezard Card, 4× Red Bat Card, 3× Buel Card, 2× Anacondaur Card, and 1× Cactuar Card** — all useful for AP/card collection. The **pile near the exit** (max 3 items per room visit) yields: **Occult Fan II** (2/4) (3.125% — one time only), Geezard Card (3.125%), Potion (6.25%), Antidote (6.25%), Soft (6.25%), Phoenix Down (6.25%), three discount coupon items (6.25% each), or nothing (50%). The pile **refreshes every time you exit the private room and re-enter** — walk back through the door and examine it again for up to 3 more items. Keep exiting and re-entering until **Occult Fan II** (2/4) appears; each visit gives up to 3 random rolls from the table. Win the **Siren Card** from the Pub Owner on a subsequent challenge; it can be Card Modded into 3× Status Atk-J scroll (teaches any GF Status Attack Junction). Also check the **Dollet Hotel** for **Timber Maniacs** (3/12), and the **Dollet Pub private room** for **Timber Maniacs** (4/12) (the table on the upper floor in the Dollet Pub private room). The Queen of Cards' son is in Dollet — after losing the MiniMog Card to the Queen, win it back from him here. He holds all cards currently lost to the Queen; over the full quest he will eventually hold: **MiniMog, Sacred, Chicobo, Alexander, and Doomtrain** cards. Win each back before she loses the next card, or they accumulate. **Vampire Fang refine chain**: Red Bats (encountered here and throughout Disc 1) can be mugged for **Vampire Fang** items. Via Supt Mag-RF (requires Siren's support ability), each Vampire Fang refines into **20× Drain** — an excellent early junction spell for HP-J and Str-J once higher tiers are scarce.`,

    `{{ENCOUNTERS:1}}`,

    `{{CALLOUT:point|Timber}} The town has a **Timber Maniacs** building with a copy of the magazine (already noted) and a **Blizzaga draw point** inside. The **Timber Hotel** also holds a **Timber Maniacs** (5/12). Visit the **Timber Pub** — speak to the drunk soldier for a Tonberry or Forbidden card. Challenge soldiers in the pub's square table area for the **Buel Card**. **Belhelmel Card refine chain**: Belhelmel enemies (wolf-like creatures, found in forests between Dollet and Galbadia) drop the **Belhelmel Card**. Accumulate 5× and use Card Mod → **Saw Blade**. Each Saw Blade refines two ways: via L Mag-RF → **10× Death** (excellent St-Atk-J), or via Supt Mag-RF → **20× Dispel** (useful for removing buffs and Reflect from bosses). Both chains are available as soon as Siren is obtained.`,

    `{{CALLOUT:card|Balamb Town docks — "Student skipping class" No-Rules exploit}} One specific card player at the Balamb Town docks — a student found randomly near the docks area who is skipping class — uses his own custom rule set with **no play rules at all**. Challenging him (even without finishing the game) will propose a rule mix between his empty set and Balamb's current rules. Through several challenges and declines, this can trigger the abolishment of any rule currently active in Balamb — including Open. This is the cleanest method to clear Balamb of all unwanted play rules that may have spread from other regions. Separately, the **fisherman/dock worker** in Balamb Town also abolishes all current play rules from Balamb with a single game — but unlike the student, the fisherman also removes Open. If Open needs to be preserved in Balamb, use the student instead. If a full reset of Balamb's rule pool is the goal, the fisherman (docks area) accomplishes this in one game.`,

    `{{CALLOUT:card|Abolishing Random and Elemental from Dollet}} Requires the Queen of Cards to be in Dollet and Galbadian rules carried from Timber's gate guard. **Original/PSX method** — Save in the Dollet Hotel, do a hard console reset (power cycle, not soft reset), then walk outside to the town square and immediately back inside the hotel. Challenge the hotel girl twice but decline both times. On the third challenge, accept and immediately quit. If Open had not yet spread to Dollet, it spreads now. If Open was already active, Random is abolished. To abolish Elemental next: beat the pub owner to access his private room, carry Galbadian rules again (challenge Timber's left gate guard until he stops asking to mix), save in the Dollet Pub (requires Siren's Move-Find ability — the save point is hidden), hard reset, load the pub save, enter the private room, examine the magazine stack near the exit exactly **twice**, then challenge the pub owner and accept then immediately quit the game. This abolishes Elemental. If the Queen is not in Dollet, examine the hotel girl or magazine stack **one extra time** in the respective method. **Remastered/PC method** — In the Remastered version, the card-rule RNG seed is determined by the number of screen transitions that have occurred since the last save-load, rather than by console resets. Hard resets are unnecessary and ineffective. Instead: save outside Dollet and reload. Count screen transitions precisely — entering Dollet counts as one, crossing into the fountain square as another, walking up to the next area as another, and returning back down as another. After accumulating roughly **6 screen transitions** since loading (the exact count that works has been confirmed by community testing, though results can vary slightly between saves and whether the Queen is present), enter the Dollet Hotel and challenge the girl. Accept the game, then immediately exit the Triple Triad screen without playing a card. This has a strong chance of abolishing Random. If it does not work, reload and try varying the screen-transition count by one or two — some saves respond best at 4–7 transitions. To abolish Elemental via the pub: use the same save-load approach, count transitions to reach the pub back room, examine the magazine stack the appropriate number of times, then quit the game screen. Once both rules are gone, only Open and Same/Diff remain in Dollet, making card play far more manageable. **Balamb all-rules abolisher**: There is a man at the **Balamb Town docks** who, when challenged to a card game, will abolish ALL active rules in the Balamb region — including Open. This is unique to Balamb only. If Balamb's card rules have become cluttered with spread rules, visit him to clean the slate. Be aware this also removes Open from Balamb, which then must be re-spread if needed.`,

    `{{CALLOUT:sidequest|The Bone Quest}} starts in Dollet's pub, ask the Queen of Cards about her artist father. Head further down the main street and find a dog and boy. Talk to the boy and enter the house — examine the painting. Go back outside; Squall notes the dog used to be here. Talk to the dog at the town square and check under the bone for a **Potion** (on Disc 3, the reward upgrades to an **X-Potion**). Return to the house, check the painting again, talk to the boy. Go to the dog near the pub entrance and check under the bone for a **Phoenix Down** (Disc 3: **Mega-Potion**). Return and check the painting a final time. Talk to the dog one more time for a **Soft** (Disc 3: **Elixir**). The quest can be done on Disc 1 or Disc 3 depending on which reward tier is preferred.`,

    `{{CALLOUT:missable|Missable — Pet Nametag (Timber)}} Speak to the man at **Timber Square** (near the Timber Maniacs building) and choose **"No way"** when he talks about giving up journalism. This conversation must happen **before finishing Disc 1**; after Disc 2 starts, the trigger closes permanently. On Disc 2, after the Missile Base mission is complete, find him again near the Timber Maniacs building entrance — he gives Squall a **Pet Nametag** as thanks for the encouragement. This is the second of only two Pet Nametags in the game; the other is in D-District Prison Floor 2. If this Disc 1 exchange is skipped, the Pet Nametag is permanently unobtainable.`,

    `{{CALLOUT:sidequest|Obel Lake and UFO quests — early steps available now}} Both quests can be initiated this disc but require Ragnarok (Disc 3) to finish. To start **Obel Lake** (rewards Three Stars + Luck-J Scroll): the lake sits on the eastern shore near Timber — stand at the edge and hum repeatedly until a creature responds, then talk until it asks you to find "Mr. Monkey" in the forest northeast of Dollet. Throw rocks at Mr. Monkey repeatedly until he responds. These steps can be completed now; the remaining clue-gathering and treasure-finding stages must wait until Disc 3. For the **UFO sightings** (leads to the PuPu Card quest): four locations must be visited on foot to trigger flyovers. **Mandy Beach** (the long coastal stretch east of Timber) is accessible now — run around there until the UFO passes. The other three sighting spots (Kashkabald Desert, Winhill Bluffs, Trabia Heath Peninsula) can also be knocked out whenever the world map is open. Full completion details and rewards are in the Disc 3 Ragnarok chapter.`,

    `When ready, return to the world map and follow the road east until a small circular forest comes into view.`,
  ],

  'd1-journey-to-galbadia-garden': [
    `Before entering the circular forest, do a **Junction Exchange** so that Quistis and Selphie inherit the junctions of any party members who will be swapped out. Enter the forest; after the scene, Squall, Quistis, and Selphie fall asleep and become Laguna, Kiros, and Ward.`,

    `{{ENCOUNTERS:0}}`,

    `{{ENCOUNTERS:1}}`,

    `**Laguna's actions in this dream have lasting consequences** for later visits to the Lunatic Pandora on Disc 3. Perform all of the following to unlock all secrets:\n- Pick up the **Old Key** near the Confuse draw point (near the barrels) → unlocks a doorway hiding an Ultima draw point.\n- Draw **Sleep** from the draw point deeper in the ruins — Sleep is a useful status junction and relatively rare at this stage.\n- Remove the lever from the **middle hatch** → reveals a Silence draw point.\n- Fiddle with the **left hatch lever** and press the red switch → reveals a Phoenix Pinion.\n- Fiddle with the **right hatch lever** and press the blue switch → reveals a **Power Generator** (rare item).\n- Pick up the **Old Key at the first intersection** → reveals a LuvLuvG behind a door.\n- Press the **detonator** (activate both red and blue switches) → boulders fall, clearing paths to Combat King 005 and other secrets.\n- Push a rock from a left tunnel wall → reveals a Spd-J Scroll.`,

    `Navigate through the Lunatic Pandora following the path above. The sequences are mandatory. Depending on how many hidden triggers were activated, between one and five Cyborg Esthar Soldier battles occur at the exit. The final Cyborg uses Soul Crush on Kiros and Ward — heal Quistis and Selphie in the real world immediately after waking. While fighting through the ruins, **Elastoids** appear as the primary random encounter. Draw **Meltdown** from them (best Vit-J spell in the game); also draw **Dispel** (available at all levels) and **Stop** (available at mid-to-high levels) — both are excellent junction spells that are hard to stock in quantity before Disc 3. Lv30+ Elastoids can be stolen from for a **Laser Cannon** — use it on Quistis to teach **Homing Laser** Blue Magic (launches a barrage of lasers at one enemy), or refine each Laser Cannon via Ifrit's **Ammo-RF** into **5× Pulse Ammo** — the rarest Lionheart crafting ingredient. **This is one of the last easy opportunities to mug Laser Cannons in bulk** — the Disc 3 Lunatic Pandora has Elastoids again but under more time pressure.`,

    `{{ENCOUNTERS:2}}`,

    `In the forest on the way to Galbadia Garden, watch out for **Gespers** — they can use Degenerator, an instant-kill attack. Keep HP high or junction Death protection. The forest also contains **Grendels** at lower levels (Lv 1–29) that drop **Dragon Fangs** — collect at least **4× Dragon Fangs** now, as they are needed to craft Squall's ultimate weapon (Lionheart) later. **Important**: Grendels only appear when running **while touching the cliff walls** in the forest — if enemies seem to be only Gespers, move closer to the cliff edges. Additionally, **do NOT Mug Grendels**: their mug item is Dragon Fin (not Dragon Fang), and successfully mugging one replaces the Dragon Fang drop with Dragon Fin for that battle — you lose the item you actually need. Let them die normally to guarantee the Dragon Fang drop. **Universal Mug rule**: a successful Mug always cancels the enemy's post-battle item drop — you get the mugged item but no drop. Only mug when the mug result is more valuable than the drop, or when drops aren't needed.`,
    `Back in the real world, Galbadia Garden is a short distance away. Enter; Quistis handles the front gate. Proceed north to the 2nd-floor reception room. Speak to Zell, then Quistis, then Rinoa, then Zell again, and finally Selphie — in that exact order — to trigger Squall exiting. Head back down to the main hall — a scene with Fujin and Raijin plays. Speak to Quistis at the front gate, then to Rinoa at the exit. **Irvine Kinneas joins the party.** Speak to him, then to Zell. After the tutorial, the party reaches the world map.`,
    `In Galbadia Garden's main hall, there is an **invisible Haste draw point in the dead center of the main hall floor** — move to the exact center of the hall and draw from it to stock Haste early. A **girl in the classroom off the east hall** holds all Level 6 Boss Cards — she is the best source for those cards at this stage. While here, consider manipulating the Trabia card region rules to save effort later: from the classroom, exit to the hall, save at the main hall, then enter the other door on the left — proceed past the ice hockey field to the locker room and challenge the **Trabia exchange student** (agree to mix, then quit). This typically spreads Open to Trabia. Then decline the card-mix offer with the Level 6 cards girl until she stops asking, re-save, return to the Trabia student and agree again; aim to abolish Random or Plus (not Open, not Same — reset if either spreads). Repeat to abolish the second unwanted rule. Removing Random and Plus from Trabia now prevents them from infecting other regions later. **Remaster note**: RNG-based rule manipulation works differently in the PC/Steam/Remaster version — there are no known reliable methods to abolish Trabia rules on Discs 1–3 in the Remaster. This exchange student interaction is the best (and possibly only) opportunity to set Trabia region rules correctly before Disc 4. Do not skip this if playing the Remaster and aiming for a complete card collection. Pay the **3,000 Gil** train fare from the Galbadia Garden station to depart for Deling City. **Refinement priority at Galbadia Garden** (with Irvine now in party and Ammo-RF available): Several card chains become available:\n- **Krysta Card** × 1 → Card Mod → **10× Holy Stone** → L Mag-RF → **10× Holy** (excellent Spr-J) — **Holy Stone battle bonus**: when used directly as an item in battle, a Holy Stone deals Holy-elemental damage that is **doubled against undead enemies**, identical to the Holy spell's undead interaction; keep a small stock for areas with undead (Abadon, Zombie-inflicted enemies) for a cost-free damage boost\n- **X-ATM092 Card** × 2 → Card Mod → **Turtle Shell** → Supt Mag-RF → **30× Protect**\n- **Shumi Tribe Card** × 5 → Card Mod → **1× Gambler Spirit** (teaches GF Luck-J)\n- **Gerogero Card** × 10 → Card Mod → **1× Circlet** → use to teach any GF **Mag+20%**\n- **Tonberry Card** × 1 → Card Mod → **1× Chef's Knife** → Ammo-RF → **20× AP Ammo**\n- **Cactuar Card** × 1 → Card Mod → **1× Cactus Thorn** → Ammo-RF → **40× Demolition Ammo**\n- **Elnoyle Card** × 10 → Card Mod → **1× Energy Crystal** → Ammo-RF → **10× Pulse Ammo** (Lionheart ingredient)`,
  ],

  'd1-galbadia-garden': [
    `Arriving in Deling City, exit the station and speak to a party member to continue. The story destination is **General Caraway's Mansion**, reachable by boarding the city bus with the conductor.`,

    `{{ENCOUNTERS:1}}`,

    `Before proceeding to the mansion, two notable stops exist. The **hotel** to the right contains a **Timber Maniacs** (6/12) between the beds in one of the rooms. Further down the main road, a man in black holds the **Kiros Card** — win it to obtain one of the most powerful cards in the game. Card Modding the Kiros Card yields **3× Accelerator**, an item that teaches any GF **Auto-Haste**. **Card rules tip — Deling City woman uses FH rules**: A woman card player near the hotel area uses **Fisherman's Horizon (FH) rules** (Elemental + Sudden Death) rather than Galbadia rules. This can be exploited to pre-manipulate the FH card region's rules before the party ever arrives there — challenge her to a card mix to selectively spread or abolish rules you want in place for the FH segment, without having to wait until the Garden Festival chapter.`,

    `At **Caraway's Mansion**, speak to the guard on the right. He requires a student ID number from the **Tomb of the Unknown King** to the northeast. Exit the city and head northeast on the world map. At the tomb entrance, a **Float draw point** is on the left — stock up on Float, it is essential for the upcoming boss. There is also a **Protect draw point** just outside the tomb entrance on the right side — stock Protect here before entering. A **save point** is on the right. Inside, the map can be viewed by holding SELECT.`,

    `{{ENCOUNTERS:0}}`,

    `{{CALLOUT:sidequest|To obtain the GF Brothers}} From the sword screen, navigate Right → Up → Right → Up → Right → Up to encounter **Sacred** (it flees quickly). Pull the lever on the right to release the waterflow. Navigate to the machine on the left to lower the bridge. Return to the entrance and proceed all the way up to fight both bosses.`,

    `{{BOSS:Sacred}}`,

    `{{BOSS:Minotaur}}`,

    `Strategy: Immediately cast **Float** on both Sacred and Minotaur — this prevents their Earth Shake from regenerating their HP. Both are weak to **Poison (×2) and Wind (×2)** — junction Tornado to El.Att-J for significantly increased damage. Sacred holds **Shell**, **Protect**, **Berserk**, and **Life** — draw Life first (excellent Spr-J magic). Minotaur holds **Shell**, **Protect**, and **Double**. **Mad Cow Special** (AoE Earth damage) is only used when both Sacred and Minotaur are alive simultaneously — focusing down Sacred first eliminates this attack. Follow Float with Meltdown to eliminate their defenses, then attack freely. Defeat them to receive the **GF Brothers** and the **Minotaur Card** (Card Mods into **10× Adamantine** — an ingredient for Squall's Lionheart weapon). After winning, **lose the Sacred Card to the Queen of Cards** and confirm she moves toward Balamb (not Deling City) — this advances the Queen of Cards quest. **Life Ring refine chain**: Torama enemies (encountered inside the Tomb) can be mugged for **Life Ring** items. Each Life Ring refines via L Mag-RF → **20× Life** — a fast way to stock Life for Spr-J. The Torama Card (5× Card Mod → **Regen Ring** → L Mag-RF → **20× Full-Life**) extends this chain into Full-Life for endgame Spr-J. **Torama combat warning**: Toramas can open with **Lv 5 Death** — this instantly kills any party member whose level is a multiple of 5 (Lv 5, 10, 15, 20 ... 100 are all multiples). At Lv 100 this affects the entire party and cannot be survived without Death resistance on St.Def-J. Keep Death junctioned to status defense whenever farming in areas with Toramas. **Righty rare steal**: The Righty enemy (inside the Tomb as part of the Gargantua encounter near the elevator area) can be stolen from at Lv30+ for a **Rune Armlet** — use it on any GF to teach **Spr+20%**, an otherwise expensive ability to learn.`,

    `{{CALLOUT:enemy|Blobra}} encountered in the Tomb of the Unknown King alongside Sacred and Minotaur. Blobra has a **random elemental weakness** that changes each time one appears — at Lv 1–19 it can be weak to Fire, Ice, or Lightning; at Lv 20–29 any element except Water and Holy; at Lv 30+ any of the eight elements, and the weakness can be as severe as ×7 damage. The weakness is not visible from the field — use the Scan command or just rotate through elements to find it. Blobra also has extremely high Vit (240 at Lv 1, capped near 245 at Lv 100), meaning physical attacks deal minimal damage regardless of Meltdown — exploit its random elemental weakness instead. Its **Sticky Icky** physical attack inflicts Slow; junction Slow to St.Def-J when farming. Critically, **Blobra Cards** (Lv 1 card, won by defeating Blobra) can be Card Modded in groups of 4 into **1× Rune Armlet** each — Rune Armlet teaches any GF **Spr+20%**, an otherwise costly ability to acquire. This is also how the Granaldo rare card is accessed (Blobra's rare Card Drop is the Granaldo Card). Draw list at Lv 30+: Shell, Reflect, Blind, Confuse — Reflect is useful here as one of the earlier non-boss sources.`,

    `{{CALLOUT:mechanics|Brothers GF ability priority}} Level Brothers by battling with them junctioned. Priority abilities: **HP+80%** (massive HP boost), **High HP Bonus** (gains more ability points toward HP when it levels), **Earth** (learn the summon attack — required), **Spr+20%**, and **Vit+20%**. Brothers has the best HP-boosting abilities in the game — junction it to whoever needs the most HP.`,

    `Squall can now craft his ultimate weapon **Lionheart** at this point, provided you have: 1× Adamantine (from Minotaur Card), 4× Dragon Fang (from Grendels in the forest), 12× Pulse Ammo (refine 2× Energy Crystal from 20× Elnoyle Cards via Ammo-RF), and Squall's **Punishment** gunblade (built through the full upgrade chain — see Squall's chain in the list below). Take all ingredients to any **Junk Shop** (the closest accessible one is in Timber). This is entirely optional but is one of the strongest weapons in the game. **Selphie's Strange Vision** (also craftable now): requires 1× Adamantine, 3× Star Fragment (Card Mod 9× Iron Giant Cards), and 2× Curse Spike (Card Mod 2× Tri-Face Cards). The Strange Vision has 255% Hit rate (never misses), making it Selphie's strongest weapon — worth building if those materials are available. **Complete final-tier weapon reference** (all requiring Weapons Monthly 1st Issue): Zell's **Ehrgeiz** — 1× Adamantine, 4× Dragon Skin, 1× Fury Fragment (+25 Str, 5% Hit); Irvine's **Exeter** — 2× Dino Bone, 1× Moon Stone, 2× Star Fragment, 18× Screw (+25 Str, 10% Hit); Quistis's **Save the Queen** — 2× Malboro Tentacle, 4× Sharp Spike, 4× Energy Crystal (+25 Str, 4% Hit); Rinoa's **Shooting Star** — 2× Windmill, 1× Regen Ring, 1× Force Armlet, 2× Energy Crystal (+28 Str, 8% Hit). Weapons Monthly 1st Issue appears in the Esthar Shop. **Note**: weapons unlock in the Junk Shop menu automatically once the required items are in inventory — the Weapons Monthly magazines only reveal the ingredients on screen; the weapon can be crafted even without reading the relevant issue. **All weapon upgrade chains** (each tier requires the previous tier — all worth building for the Str bonus and to expand Renzokuken finisher options for Squall):\n- **Squall (Gunblade)**: Revolver (start, +11 Str, Weapons Monthly March) → Shear Trigger (1× Steel Pipe + 4× Screw, +14 Str, April — unlocks Fated Circle) → Cutting Trigger (1× Mesmerize Blade + 8× Screw, +18 Str, May) → Flame Saber (1× Betrayal Sword + 1× Turtle Shell + 4× Screw, +20 Str, June) → Twin Lance (1× Dino Bone + 2× Red Fang + 12× Screw, +22 Str, July) → Punishment (1× Chef's Knife + 2× Star Fragment + 1× Turtle Shell + 8× Screw, +24 Str, August — unlocks Blasting Zone) → Lion Heart (1× Adamantine + 4× Dragon Fang + 12× Pulse Ammo, +30 Str, 1st Issue). **Key sources**: Mesmerize Blade — mugged from Mesmerizes (plains near Balamb/Timber); Betrayal Sword — mugged from Forbiddens; Red Fang — mugged from Red Dragons or 9× T-Rexaur Cards Card Mod; Dino Bone — dropped by Grendels Lv1–29 (hug cliff walls in the forest near Galbadia Garden); Chef's Knife — mugged from Tonberries at Centra Ruins; Star Fragment — mugged from Iron Giants or 9× Iron Giant Cards Card Mod.\n- **Zell (Gloves)**: Metal Knuckle (1× Fish Fin + 4× M-Stone Piece, +12 Str, March) → Maverick (1× Dragon Fin + 1× Spider Web, +15 Str, April) → Gauntlet (1× Dragon Skin + 1× Fury Fragment, +20 Str, June) → Ehrgeiz (1× Adamantine + 4× Dragon Skin + 1× Fury Fragment, +25 Str, August)\n- **Irvine (Guns)**: Valiant (1× Steel Pipe + 4× Screw, +12 Str, April) → Ulysses (1× Steel Pipe + 1× Bomb Fragment + 2× Screw, +15 Str, May) → Bismarck (2× Steel Pipe + 4× Dynamo Stone + 8× Screw, +20 Str, July) → Exeter (2× Dino Bone + 1× Moon Stone + 2× Star Fragment + 18× Screw, +25 Str, 1st Issue)\n- **Quistis (Whips)**: Chain Whip (2× M-Stone Piece + 1× Spider Web, +12 Str, March) → Slaying Tail (2× Magic Stone + 1× Sharp Spike, +15 Str, May) → Red Scorpion (2× Ochu Tentacle + 2× Dragon Skin, +20 Str, June) → Save the Queen (2× Malboro Tentacle + 4× Sharp Spike + 4× Energy Crystal, +25 Str, August)\n- **Rinoa (Pinwheels)**: Pinwheel (3× M-Stone Piece, +11 Str, April) → Valkyrie (1× Shear Feather + 1× Magic Stone, +14 Str, May) → Rising Sun (1× Saw Blade + 8× Screw, +18 Str, July) → Cardinal (1× Cockatrice Pinion + 1× Mesmerize Blade + 1× Sharp Spike, +24 Str, August) → Shooting Star (2× Windmill + 1× Regen Ring + 1× Force Armlet + 2× Energy Crystal, +28 Str, 1st Issue)\n- **Selphie (Nunchaku)**: Flail (2× M-Stone Piece + 1× Bomb Fragment, +12 Str, March) → Morning Star (2× Steel Orb + 2× Sharp Spike, +15 Str, June) → Crescent Wish (1× Inferno Fang + 1× Life Ring + 4× Sharp Spike, +20 Str, July) → Strange Vision (1× Adamantine + 3× Star Fragment + 2× Curse Spike, +25 Str, 255% Hit, 1st Issue)`,

    `{{CALLOUT:missable|Missable — Location Displayer}} Before handing the student ID to the guard, speak to him and choose to **purchase the Location Displayer for 5,000 Gil**. Once the ID is given, this item is permanently gone. The Location Displayer upgrades the Battle Meter with area-tracking functionality.`,

    `Take the ID number back to Caraway's Mansion, give it to the guard, and enter. Inside, listen to General Caraway's debriefing, then return after the scenes. Control shifts to Quistis; attempt to exit, then follow Rinoa and continue to the sewer access point. **Rinoa Card setup**: General Caraway plays cards. To obtain the **Rinoa Card** from him, you must first **lose the Ifrit Card** to Caraway intentionally — he will only put the Rinoa Card into play once he has the Ifrit Card. Challenge him here during the Disc 1 mansion visit or on Disc 2 when Deling City is accessible after the Missile Base mission. The Ifrit Card can be re-obtained from **Martine** at Fisherman's Horizon later (on the screen to the right of the Mayor's house). The Rinoa Card mods into **3× Magic Armlet** (teaches any GF **Spr+60%**).

{{CALLOUT:missable|Missable — Rinoa Card}} The Rinoa Card is permanently unavailable if Caraway's window closes — he only plays it after receiving the Ifrit Card, and the window is open during Disc 1 (this visit) and again briefly on Disc 2 after the Missile Base mission. After that, the card is gone forever.`,
  ],

  'd1-deling-city': [
    `{{ENCOUNTERS:0}}`,

    `In the **sewers beneath Deling City**, control passes to Rinoa. Navigate west three screens to find **Weapons Monthly May Issue** (2/7 of weapon magazines), then climb back up and return to the starting point. Climb the crates with X, proceed left, then ascend the ladder to reach the parade route.`,

    `Control returns to Quistis and the others, who are now locked inside the mansion. Solve the rotating glass puzzle — place a glass from the shelf into the stone statue's hands in the upper-left corner to reveal a hidden entrance. Proceed through the sewers to rejoin the parade route.`,

    `As Squall, climb the building following Rinoa's route. At the top, take the stairs and enter the interior — **check junctions before this next fight**, particularly Rinoa's and Irvine's. Two Iguions appear as Rinoa's task fails. Important mechanics: both Iguions start with **Reflect** status, which bounces magic back at the caster — this is lifted automatically once **Carbuncle** is drawn from one of them. Draw **Carbuncle** from either Iguion immediately. **Carbuncle's summon attack (Ruby Light) casts Reflect on all party members** — unlike other GFs it deals no damage; its entire use is as a free group-Reflect buffer. **Reflect bypass exceptions**: the following spells are NOT reflected and always hit their target regardless of Reflect status — Tornado, Dispel, Drain, Quake, Meteor, Ultima, Scan, and Apocalypse. Any other magic (Fire, Blizzard, Holy, Silence, etc.) will bounce off Reflect back at the caster. Reflected magic cannot itself be reflected again. This is already in effect during the Edea fight below and remains one of Carbuncle's primary battle applications throughout the game. The **Resonance** attack (combines both Iguions' power for massive damage) only triggers while both Iguions are alive — if dangerous, weaken one quickly to stop Resonance. **Magma Breath** (single-target Fire damage) also inflicts **Petrifying** status — if a character starts petrifying, cure it immediately with Soft or Esuna before it becomes full Petrify, which locks the character out of the rest of the fight. **Mug 4× G-Returner** from the Iguions (each uses it on Rinoa to teach her the Combine command Angelo Reverse). **Iguion Card refine chain**: Iguion Cards → Card Mod → **Cockatrice Pinion** → via Siren **ST Mag-RF** → **Break** (single-target petrify magic — excellent St.Atk-J). Cockatrice Pinions also appear as components in Rinoa's Cardinal weapon upgrade, so don't mod all of them if that weapon is being built. Seifer appears first, followed immediately by Edea.\n\n{{CALLOUT:mechanics|Carbuncle GF ability priority}} **Recov Med-RF** (Lv2 — refines recovery items, enables Gil farming loop and Mega-Potion production) → **Vit+20%** (learn immediately after obtaining by feeding it **Turtle Shells** — each Turtle Shell teaches Vit+20%; obtain Turtle Shells via Card Mod of the X-ATM092 Card which was available earlier) → **HP-J** → **Vit-J** → **Mag-J** → **Spr-J** → **GFRecov Med-RF** → **Barrier** (teaches Mighty Guard Blue Magic to Quistis — the item Barrier used on Quistis, but Carbuncle's GF ability Barrier is separate and teaches a different thing). Priority is Recov Med-RF then the stat bonuses, since Carbuncle is small and levels quickly.`,

    `{{BOSS:Seifer (Disc 1)}}`,

    `{{BOSS:Edea (Disc 1)}}`,

    `Strategy: He has low HP and only uses Fira and his gunblade. **Mug a Hero** from Seifer. Finish him quickly.\nEdea: At the start, summon **Carbuncle** to cast Reflect on the entire party — Edea wastes several turns Dispelling it, buying time. Keep re-summoning Carbuncle as needed. Draw **Cura**, **Dispel**, **Life**, and **Double** from Edea — excellent spells for junctions. **Mug an Elixir** from her. Finish with GF attacks, Aura, and Limit Breaks.`,
    `After the cutscene, the disc ends. The group finds themselves in captivity to start Disc 2.`,
  ],

  // ───────────────────────────────────────────────────────── DISC 2 ──────────

  'd2-winhill': [
    `Disc 2 opens with a Laguna dream sequence set in **Winhill**, a quiet village. After the opening scene, check the hidden **Curaga draw point** near the upper-left closet in the room, then go downstairs. Speak to Ellone, then visit the house directly below. Meet Kiros and choose all dialogue options before saying "Let's talk later." — in particular, **"Tell me about Julia"** unlocks the 'Eyes On Me' tutorial entry; this is the **only opportunity** to do so in the entire game.

{{CALLOUT:missable|Missable — Eyes On Me (Winhill)}} The "Tell me about Julia" dialogue option with Kiros at the Winhill hotel is the singular window to unlock the Eyes On Me lore entry. If you advance past this scene without selecting that option, the journal entry is gone for the rest of the playthrough. The option is available during the Kiros conversation — choose it before saying "Let's talk later."`,

    `Laguna has **3,000 Gil** to spend — any items bought carry forward, but unspent Gil does not transfer. Visit the item shop on the left and buy supplies, spending all 3,000 Gil on useful items. The Winhill shop carries the same standard inventory as all general item shops (Potion, Hi-Potion, Phoenix Down, status-cure items, Remedy, Tent, Fuel, Normal Ammo, Shotgun Ammo, G-Potion, G-Returner). Recommended purchases with Laguna's 3,000 Gil: prioritize **Remedy** (1,000 Gil — useful for status cures in upcoming battles), one **Tent** (1,000 Gil — full party heal), and top up on Hi-Potions with the remainder. **Before heading south**: check the **Dispel draw point near the river** (reachable from the southern edge of the town square area). Then head south from the town square for the patrol. At the fork, take the **lower path** — it has a hidden **Reflect draw point near a truck**. Continue south until Laguna declares the patrol finished.`,

    `Return to the town square and watch the scenes along the way. Go into Raine's house and upstairs. After speaking to Raine, return to Laguna's house and rest on the bed to exit the dream.`,

    `{{ENCOUNTERS:0}}`,
  ],

  'd2-the-escape': [
    `{{ENCOUNTERS:0}}`,

    `Back in D-District Prison, the party is split up. As Zell, talk to Rinoa twice, then watch the shift to Squall. During Squall's scenes, choose "I'll stop him" and "…Just let me die." When back in control as Zell, climb the stairs, defeat the soldiers, and recover the party's weapons. **Immediately check junctions** before the next mandatory fight.`,

    `{{BOSS:Biggs (2nd)}}`,

    `{{BOSS:Wedge (2nd)}}`,

    `Strategy: Biggs knows **Cure, Haste, Slow, and Regen** — draw all of them. Wedge holds **Fire, Shell, Protect, and Reflect**. **Reflect is rare at this stage of the game — this is only the second opportunity to draw it (the first was from Iguion's two Carbuncle draws).** Stock as much Reflect as possible from Wedge before finishing him; it is hard to come by until Disc 3. Cast **Silence and Blind** on both to trivialize the encounter. Mug the **Strength Love** from Wedge and the **Regen Ring** from Biggs — these items are more valuable than their drops (Biggs drops 3× Elixir; Wedge drops 8× Remedy — both inferior to the mug results). When Wedge's HP falls low he gets a stat boost, so finish him fast after that triggers. GIM52A robots appear during the escape — **Mug a Missile** from one to teach Quistis the **Micro Missiles** Blue Magic. If you want to farm GIM52As before they disappear after the escape, fight them on Floor 8 while running from pursuers; at Lv 30+ they also drop Dispel.`,

    `The prison spans 15 floors. Key items and points of interest:\n- **Floor 1, right cell**: Combat King 001 (missable — collect before leaving the prison)\n- **Floor 2, left cell (missable)**: **Pet Nametag** — one of only two in the entire game. The cell is found on Floor 2 left side; it is permanently gone once the party escapes the prison.\n- **Floor 2, right cell**: Str Up\n- **Floor 3, right cell**: Pet House\n- **Floor 4, left cell**: Tent\n- **Floor 5 card player**: 500 Gil per game — rare prizes include **Luck Up** (1/64 chance, one-time only)\n- **Floor 8, no barrier, left side**: **Man from Garden Shop** — same inventory as the Garden's own shop; useful for restocking items mid-escape\n- **Floor 9, right cell**: **Berserk draw point**\n- **Floor 10 card player**: 300 Gil per game — rare prizes include **HP Up** and **Rosetta Stone**; also awards **Character Report** (missable — permanently gone after leaving the prison) — this Battle Meter upgrade requires the Battle Meter to have been obtained from Cid on Disc 1; the upgrade card is won only here and is permanently unavailable after leaving the prison.\n- **Floor 10**: save point on the left side\n- **Floor 11 card player**: 200 Gil per game — rare prizes include **Rosetta Stone** and **HP Up**; **best source of early Rosetta Stones**\n- **Floor 11, right cell**: hidden **Thundaga draw point**`,
    `The **Rosetta Stone method** (Floor 11 card player): Save in the left cell on Floor 10, then do a hard reset. Navigate to Floor 11 using a precise directional sequence: exit the Floor 10 cell holding LEFT, cross Hall part 1 floor 11 holding LEFT until hitting the outer wall then switching to UP+LEFT, and enter the Floor 11 card player's cell. Challenge the player exactly **54 times** declining each time (if the Queen of Cards is in Deling City instead of Balamb/Dollet, challenge **140 times**), then play and win to receive a guaranteed Rosetta Stone. Save, hard-reset, and repeat. An **HP Up** can also be guaranteed using this method — challenge exactly **62 times** instead. Only one HP Up total can be won from this player. Rosetta Stones refine into Shaman Stones via Siren Tool-RF, or Shaman Stones refine into LuvLuvG (each gives +20 GF compatibility to all GFs for one character). Each Rosetta Stone can also teach a GF **4× Ability** — one of the most valuable GF abilities in the game.`,

    `Talk to the three Moombas on Floor 13 to create shortcuts by removing floor barricades. Locate Squall; after the scenes, choose a party member and head to the elevator. As Irvine, descend to Floor 3. Back as Squall, talk to the left Moomba for a **Cottage** and the right one for a **Rename Card**. Reach Floor 14, save, then exit right for the mandatory fight.`,

    `{{BOSS:Elite Soldier}}`,

    `{{BOSS:GIM52A}}`,

    `Strategy: Eliminate the Elite Soldier first — it buffs the GIM52As with Aura and casts healing spells. The machines are weak to **Lightning, Earth, and Water** (×1.5 multiplier each) and have high Spirit, so magic hits especially hard. Beware their Micro Missiles (cuts current HP by 50% at CL1 — as Quistis's Blue Magic it scales with Crisis Level: CL1=50%, CL2=75%, CL3=87.5%, CL4=93.75% of current HP; halved by Protect, nullified by Defend). GIM52As also fire **Ray Bomb** (area-of-effect non-elemental magic) very rarely. Draw **Haste** and **Slow** from GIM52As at any level; at Lv 30+ they also hold **Esuna** and **Dispel**. Mug a **Missile** from either machine for Quistis's Blue Magic if not done earlier. If both GIM52As get Aura status from the Elite Soldier, Dispel them immediately.`,

    `After the escape scene, hold **RIGHT** on the D-pad during the bridge scene or it is game over. Talk to Selphie twice, form parties, put **Zell with Squall**, and board the westbound train.`,
  ],

  'd2-missile-base': [
    `{{ENCOUNTERS:0}}`,

    `Control shifts to **Selphie's team**. The Missile Base lies west on the world map. At the Missile Base, speak to the guards in stolen uniforms. Follow the linear path and navigate through multiple rooms via dialogue choices — choose "Walk by quietly," "Play it cool," and "Help out" when prompted to blend in without triggering extra fights. This grants access to the missile launcher room where the targeting panel can be sabotaged. **Invisible Full-Life draw point**: In the missile launcher room — just in front of the missile launcher array on the left side of the screen — there is an invisible **Full-Life draw point**. Stock up before proceeding.`,

    `{{CALLOUT:mechanics|Sabotage sequence}} After messaging the three sets of soldiers back and forth, push the missile launcher as far right as possible. At the targeting panel outside the launcher room, set the **Error Ratio** to maximum (full right), upload the data, then exit. This causes the missiles to miss their targets. The self-destruct is then set in the control room — choose **10 or 20 minutes** to unlock a nearby shortcut door; choosing 30 or 40 minutes forces a longer route to the exit. **Weapons Monthly June Issue** (3/7) is a fixed drop from defeating BGH251F2 outside.`,

    `Before the exit fight, the **Base Leader and 2× Base Soldiers** guard the stairs. Silence the Base Leader immediately to stop him using Confuse and Cura on the soldiers. Junction **Confuse** to St.Def.J before this fight if available. The enemies waste many turns using Remedies when inflicted with status ailments — use Sleep or Blind to capitalize on this. Base Soldiers can be mugged for **8× Hi-Potion** each.`,

    `{{BOSS:BGH251F2 (1st)}}`,

    `Strategy: BGH251F2 is weak to **Lightning, Earth, and Water** (×1.5). Blind it immediately — this makes the Chaingun fire miss consistently, leaving only the telegraphed Beam Cannon to worry about. The warning message ("Stand by for beam cannon!") precedes the attack by one turn — use Defend to halve the damage; Shell does not reduce Beam Cannon. Draw **Shell**, **Protect**, and **Stop** from BGH251F2. After defeating it, a second wave of Elite Soldier and 2× G-Soldiers arrives — eliminate them quickly. The **Weapons Monthly June Issue** is a guaranteed drop from the BGH251F2 fight here.`,

    `After the escape, Selphie's team ends up on the world map. **Early Gil trick**: If Carbuncle's **Recov Med-RF** has been learned, visit the Deling City item shop and buy Tents, then refine them into Mega-Potions via Recov Med-RF (**4 Tents → 1 Mega-Potion**; Cottages are even better at 2 Cottages → 1 Mega-Potion, but cost more upfront). Sell the Mega-Potions at 5,000 Gil each for a modest profit over the purchase price — this loop can be repeated indefinitely for steady Gil income before the faster Leviathan method becomes available on Disc 3. **Rinoa Card**: Return to Deling City after this mission and visit **General Caraway's Mansion** — he will now play cards and holds the **Rinoa Card**. To advance the Queen of Cards quest, lose the **Ifrit Card** to Caraway intentionally, then win back both cards in subsequent games. The Ifrit Card can be re-obtained from Martine at FH later. This is a missable opportunity — the Rinoa Card cannot be obtained any other way if this window is missed.`,

    `Meanwhile, Squall's team must reach Balamb Garden before the missiles hit.`,
  ],

  'd2-return-to-balamb-garden': [
    `{{ENCOUNTERS:0}}`,

    `Race to Balamb Garden with Squall's team. After the tense scenes, the Garden is now a mobile vessel. **Novice SeeD Candidates (Window 3)**: Before the Garden Festival / before reaching Fisherman's Horizon, revisit the Cafeteria and speak to the three novice students — this is the third of five dialogue windows. As the garden is liberated floor by floor, collect free items from NPCs: **Mega-Potion** from the gate guard, **Elixir** from Dr. Kadowaki (infirmary), **X-Potion** from the Quad, **Gysahl Greens** from the Cafeteria counter, **Tent** from the Parking Lot, **Remedy** from the Training Center, and **Mega-Phoenix** and **Remedy** from the Library. A **Full-Life draw point** is in the basement level. Each room has a Garden Faculty to fight — the event battles yield useful AP and some surprise encounters: the Cafeteria Faculty fight spawns a **Bomb** enemy (at Lv 30+ it can be mugged for a **Bomb Spirit**, which teaches any GF the **Kamikaze** ability — damage equals caster's max HP × 5, potentially 50,000+ damage). The Training Center Faculty fight spawns a **Granaldo** — at Lv 30+ it holds **Pain** magic, one of the best status-junction spells.`,

    `Head to the basement via the elevator. The path down leads through an encounter with two Oilboyles blocking the door. Before descending, fight any **Tri-Face** encounters on the MD Level stairs area — these yield **Curse Spikes** (used to teach Quistis **LV? Death** or refined into Pain via ST Mag-RF) and at high levels the enemies can be drawn from for **Flare** magic.`,

    `{{BOSS:Oilboyle}}`,

    `Strategy: Two Oilboyles fight simultaneously. Junction **Fire** to Elemental Attack for significantly increased damage — Oilboyles are Fire × 2 (double damage) but Water immune. They can inflict **Darkness** via Oil Shot and **Curse** via Sonic Wave — Curse blocks Limit Breaks, so keep Esuna or Treatment ready. Draw **Esuna** and (at Lv 30+) **Curaga** and **Dispel** directly from an Oilboyle if needed. At Lv 30+ they can also be mugged for **Orihalcon** (2 per mug), which teaches any GF **Vit+60%** when used directly. Once an Oilboyle drops below one-third HP it may counter with **Oil Blast** (62.5% of current HP reduction) — finish it with a single powerful attack at that point rather than chipping. After defeating them, check the panels to proceed.`,

    `Descend to face NORG in his pod. The fight has three phases: the Pod, the Left and Right Orbs, then NORG directly.`,

    `{{BOSS:NORG POD}}`,

    `{{BOSS:Left Orb}}`,

    `{{BOSS:Right Orb}}`,

    `{{BOSS:NORG}}`,

    `Strategy: Attack the Pod until it opens — it has a fixed 2,000 HP and does nothing. The orbs cannot be destroyed. The Left Orb (yellow mode) boosts NORG's defense and attacks with Fira, Thundara, Bio, and Tornado — draw **Thunder**, **Life**, and **Bio** from it; **Mug up to 4× Mag Up** per attempt. The Right Orb (red mode) charges NORG's offense and uses Slow, Silence, and Dispel — draw **Dispel**, **Confuse**, and **Slow** from it; **Mug up to 4× Spr Up** per attempt. Mug both orbs before engaging NORG directly. NORG himself is weak to **Wind** (×2) and uses Blizzara, Slow, Silence, Protect, Shell, and Psycho Blast. **Draw Leviathan from NORG immediately** — once drawn, NORG can no longer use Water magic. This is the last missable opportunity to draw Leviathan before Disc 3 (it can also be drawn from the Trauma boss in Ultimecia's Castle on Disc 4 as a backup). **Achievement: Leviathan** — unlocks upon obtaining the GF. **Mug a Circlet** from NORG (teaches any GF **Mag+60%** when used directly). Cast Meltdown, then finish with Limit Breaks. Junction Wind-class magic (Aero, Tornado) to El.Att.J for bonus damage.`,

    `After defeating NORG, the Garden operates properly. **Before leaving the NORG area**: there is a hidden **Bio draw point** alongside NORG's remains — draw from it before heading upstairs. Head to the main hall and speak to Cid. Check the infirmary for Dr. Kadowaki and scenes. **Leviathan GF ability priority**: Learn **Spr-J** first (third Spr junction slot — highly valuable), then **Spr+20%**, **Spr+40%**, **Spr Bonus**, **Supt Mag-RF** (refines support items into magic), **Recover** (restores one GF to full HP mid-battle — critical for long fights), **El.Att.J**, **Auto-Potion** (automatically consumes recovery items from stock when the junctioned character takes damage that drops them below 50% max HP; items used are: Potion, Potion+, Hi-Potion, Hi-Potion+ and Elixir — it does NOT use Mega-Potion, X-Potion, or Megalixir; **priority order is lowest tier first**: Potion is consumed before Potion+, Potion+ before Hi-Potion, Hi-Potion before Hi-Potion+, and Hi-Potion+ before Elixir — stock lower-tier potions as "buffer" items if you want to preserve Hi-Potions and Elixirs), **GFRecov Med-RF**. **Zell's Love Quest (Step 3)**: With **Zell in the party**, visit the Library and speak to the Library Girl — she gives Zell a **Mega-Phoenix** (or a Remedy to Squall if Zell is absent). **Zell's Love Quest (Step 4, Part 1)**: Also speak to **Ellone** in the second library room **before** the NORG fight (this step should have been done earlier — it must be done before the missile attack events). **Zell's Love Quest (Step 4, Part 2)**: After the missile attack situation resolves, go to the Library while Squall has no party members — a Committee Member teases the Library Girl about her feelings.`,

    `{{CALLOUT:card|CC Group quest}} steps 1–4, begin here. After the NORG fight, card players from the CC Group challenge Squall around Balamb Garden:\n- **Jack** (main hall, roams near the FH entrance or around the Garden): **Prerequisite — Jack will only challenge Squall if at least 15 card games have been won inside Balamb Garden. Library, Cafeteria, and Classroom matches do NOT count toward this total — all other areas within the Garden do count.** Speak to enough NPCs in the hallways, training center, etc. to reach 15 wins before Jack appears.\n- **Club** on the screen with paths to the cafeteria, dormitory, and garage (look for the silent NPC who says "…" — that is Club)\n- **Diamond** — two girls who stop at the Garden directory in the lobby area; wait for them to stop moving, then challenge them\n- **Joker** in the Training Center, near the pier — win the **Leviathan Card** from him; also triggers the **GF Report** upgrade for the Battle Meter. **Leviathan Card rarity**: Joker plays the Leviathan Card in roughly **1 in 16 games** — it appears in his hand infrequently, so budget several matches rather than expecting it in one or two sessions\nDefeat all four to continue the chain later. The CC Group eventually leads to the **Gilgamesh Card** which mods into **10× Holy War** (full party invincibility for one battle). **Achievement: Cards Club Master** — awarded upon defeating all seven CC Group members (Jack, Joker, Club, Diamond, Spade, Heart, and King). The chain spans Discs 2–3; King is accessible after defeating Xu on the bridge and sleeping in the dormitory. Do not miss any member — the quest cannot loop back.`,

    `Now take the Garden to **Fisherman's Horizon**.`,
  ],

  'd2-fishermans-horizon': [
    `{{ENCOUNTERS:0}}`,

    `Balamb Garden docks at **Fisherman's Horizon (FH)**, a peaceful city built on the open ocean. Enter the city and head through the main gate. After defeating the Galbadian patrol, head toward the Mayor's house.`,

    `Exploration notes before the story events:\n- On the right side of the city exterior, pay close attention to the background of the catwalk — there is a **nearly invisible ladder on the wall**. Climb down, then take two small ladders to find the **Master Fisherman**. Talk to him and choose "I'm sorry... It's our fault" to receive **Occult Fan III** (3/4). Do not miss this; it is extremely easy to overlook. **Challenge the Master Fisherman to a card game** while he is still at the crane — this is a **one-time-only** card opportunity; once he relocates to the hotel later in the FH story, he can no longer be challenged for Triple Triad.\n- After receiving the Occult Fan, **talk to the Master Fisherman a second time** — he asks Squall to speak with his pupil at the docks. Follow up on this: talk to the kid at the docks four times over the course of the FH visit, then return to the Garden and come back to trigger the Master Fisherman going to the hotel. Accompany him to receive a **Megalixir** from the hotel shopkeeper scene.\n- Near the **Save Point** in the central area, there is a reusable **Regen draw point** — stock up; Regen is one of the best HP-J spells available at this stage.\n- In the central area, find **Martine** (on the screen to the right of the Mayor's house) and challenge him for a card game — win back the **Ifrit Card** if it was previously lost to the Queen of Cards quest.\n- In the **Mayor's room**, there is an **Ultima draw point** — this is a **one-time-only** draw point that **never recharges**. Draw 100× Ultima from it before leaving the room.\n- The **Grease Monkey's house** (northern area): a **Timber Maniacs** (8/12) lies on the ground to the southwest of where the Grease Monkey stands — collect it. On this **first visit** (as Squall and Irvine), speaking to the Grease Monkey yields a **Mega Phoenix**. On a **second visit** (when Irvine is choosing instruments for the Garden Festival), speak to him again for a **Phoenix Down**. Additionally, **check the Galbadian soldier** standing in the Grease Monkey's area — examining him provides **15× Fast Ammo, 10× AP Ammo, and 5× Pulse Ammo** for free. These ammo types are critical for Irvine's Limit Break and are some of the most potent available.\n- The **FH Hotel** (enter the house next to the drunkard in the residential area, go upstairs): examine the closet next to the bed for **Timber Maniacs** (7/12).
- **Disc 3 bonus**: After completing the **Shumi Village stone quest** and then visiting Shumi Village on Disc 3 to see the follow-up workshop scene, a **Full-Life draw point** appears at the spot where the Master Fisherman used to sit (the lower catwalk of the FH exterior). This is one of the few refillable Full-Life draw points in the game — return to FH on Disc 3 to collect it.`,

    `A Galbadian patrol corners locals at the city center; a BGH251F2 must be defeated.`,

    `{{BOSS:BGH251F2}}`,

    `Strategy: This BGH251F2 is weaker than the Missile Base version and its Beam Cannon no longer ignores Shell — blind it first to neuter the Chaingun, then attack freely. **Mug an Adamantine** from BGH251F2; Adamantine is an ingredient for multiple ultimate weapons (Squall's Lionheart requires 1× Adamantine, and 20× Adamantine refines into a Steel Curtain via Tool-RF, teaching any GF Auto-Protect). The machine is still weak to Lightning (×1.5) and now also to Water (×2) and Earth (×1.5). Its drop is **8× Running Fire** — use one on Quistis to teach **Gatling Gun** Blue Magic (single-target physical damage); keep any remaining for Ammo-RF into Demolition Ammo.`,

    `After the battle, the **Garden Festival** begins — Squall must organize the performance. Speak to Selphie in the Events room to pick instruments. **Instrument combinations for the full music experience**: "Eyes on Me" arrangement — Saxophone, Electric Guitar, Piano, and Bass Guitar. "Irish Jig" arrangement — Guitar, Violin, Flute, and Tap. Either combination triggers the victory fanfare and advances the story. As Irvine during rehearsal, go to the Grease Monkey's house: talk to the officer inside, step outside and back in, then talk to the Grease Monkey to receive a **Phoenix Down**. Then inspect the downed officer to collect **15× Fast Ammo**, **10× AP Ammo**, and **5× Pulse Ammo**. The **Quezacotl Card** is available from Mayor Dobe (speak to him after the Galbadian patrol battle). The **Irvine Card** from Flo (the Mayor's wife) is only in her deck **after losing the Sacred Card to the Queen of Cards** — if Sacred has not been given to the Queen yet, Flo will not play the Irvine Card at this FH visit. Return after the Sacred Card exchange to claim it.`,

    `After the festival concludes, return to Balamb Garden and speak to Selphie in the Quad to advance the story. The bridge scene follows, and Nida confirms the Garden is mobile — heading for Balamb is the next objective. **Balamb Garden Navigation Controls**: D-Pad or Left Analog = Steering, Right Analog = Forward/Backward, Square = Forward, Triangle = Backward, Circle = Go to cockpit, R2 = Change view.`,
  ],

  'd2-the-garden-festival': [
    `With Balamb Garden now mobile and Tonberry's Call Shop accessible, this is the most open exploration window of Disc 2. Two priorities: the **Centra Ruins** GFs and the **CC Group** quest continuation. **Man From Garden mobile shop**: A merchant NPC on Balamb Garden's second floor deck runs a standard shop with the same inventory as any town: Potion (100 Gil), Hi-Potion (500 Gil), Phoenix Down (500 Gil), Antidote/Eye Drops/Soft/Echo Screen (100 Gil each), Remedy (1,000 Gil), Tent (1,000 Gil), Fuel (3,000 Gil), Normal Ammo (20 Gil), Shotgun Ammo (40 Gil), G-Potion (200 Gil), G-Returner (500 Gil). With Familiar active, G-Hi-Potion (600 Gil) is also available. This is the most convenient stock resupply while Garden is at sea. **Novice SeeD Candidates (Window 4)**: Visit the Cafeteria and speak to the three novice students — this is the fourth of five dialogue windows for their quest. Do this before the story advances to Disc 3.`,

    `{{ENCOUNTERS:2}}`,
    `{{ENCOUNTERS:0}}`,

    `At the **Centra Ruins** (southern Centra continent), two GFs reside: **Odin** (optional, timed fight) and **Tonberry King**. Get **Tonberry King first** — Odin can randomly appear in regular battles and interfere with farming. Fight Tonberries until the Tonberry King appears — this typically occurs between **18 and 24 kills, most often around 20**; the trigger is random within that range, not a fixed number. **Save after the 19th kill**: use the internal save point in the ruins after defeating 19 Tonberries — the Tonberry King can now appear at any encounter, and saving here ensures you don't need to redo those kills if the party is wiped out before he appears.`,

    `{{BOSS:Tonberry King}}`,

    `Strategy: His **It's Sharp!** attack ignores Vitality and deals damage equal to (enemies killed by that character × 30) — at fewer than 334 kills with 9,999 HP this is survivable. His **Junk** counterattack triggers every 5th action against him and hits all party members. Have one character use **Defend** throughout (Quistis works well) to nullify all physical damage — when a party member is KO'd, have the Defend character draw and cast **Full-Life**, then go back to Defend. Draw **Death** (at any level), **Curaga**, and **Full-Life** (at Lv 30+) from Tonberry King. Tonberry King's drop is a **Royal Crown** at all levels — this teaches any GF **Mag+60%** when used. Open with Meltdown and use physical Limit Breaks from the two attackers. Escape is possible if the fight goes badly. Reward: **GF Tonberry** — **Achievement: Tonberry** unlocks upon obtaining the GF. Prioritize: **Call Shop** → **Haggle** → **Sell-High** → **Familiar** → **Initiative** → **LV Down/Up**. Also learn **Forbid Mag-RF** (30 AP) — Tonberry's refinement ability for Meteor and Ultima magic: notably, **1× Dark Matter → 100× Ultima** (the fastest route to stock Ultima for all three party members; far more efficient than drawing). Also: 1× Energy Crystal → 3× Ultima; 5× Pulse Ammo → 1× Ultima; 1× Ultima Stone → 1× Ultima; 1× Star Fragment → 5× Meteor. Dark Matter is made from 100× Curse Spike via Siren Tool-RF (Siren must be Lv100); Curse Spikes drop from Tri-Faces at the Deep Sea Research Center fixed encounters.`,,

    `**Odin** (timed boss, also in Centra Ruins): Odin does not attack during the fight. Use the time to draw **Stop**, **Death**, **Double**, and **Triple** from him — all excellent junction spells. **Triple is available from Odin at any level (Lv1+)**, making this one of the earliest places to stock Triple before later sources like Cerberus (Lv20+ required) or refinement chains become available. **Mug a Luck-J Scroll** from Odin (teaches any GF Luck Junction). **Odin ruins timer — two distinct outcomes**: If the 20-minute timer reaches zero **while the party is exploring the ruins** (outside of battle), the party is simply ejected to the world map without a Game Over — the ruins can be re-entered. **Resetting the timer**: exiting the Centra Ruins to the world map and re-entering resets the 20-minute countdown to full — this means the timer is not permanent; if time is running low during the Tonberry grind, simply leave and come back before fighting Odin. However, if the timer expires **during a battle inside the ruins**, it is an immediate Game Over. The timer continues counting during battles, so avoid prolonged fights if low on time. **Odin/Gilgamesh immunity**: Zantetsuken has no effect on the following enemies — they are completely immune: Tonberry, Grat, Cactuar, Vysage, Left Arm (Sphinxaur's arm), Righty (Sphinxaur's arm), PuPu, UFO (all four sightings and the final battle), and Esthar Soldier. These enemies can never be one-shotted by Odin or Gilgamesh. **Odin consideration**: Odin randomly interrupts battles with Zantetsuken and instantly kills all non-boss, non-immune enemies — this disrupts farming (Ruby Dragons for Meteor, Cactuars for AP, etc.) and his 20-minute ruins timer can feel stressful while clearing Tonberries. For a perfect completion run, the recommended order is: fight Tonberry King first (no timer pressure), then tackle Odin after. Odin upgrades to **Gilgamesh** late in Disc 3 when Seifer kills him — Gilgamesh has the same random-interrupt mechanic but four different attacks: **Excalipoor** always deals exactly **1 damage** regardless of junctions; **Excalibur** deals significant magical damage (scales from ~1,000 at Lv1 to ~7,187 at Lv100); **Masamune** deals massive magical damage (caps at 9,999 from around Lv60 onward, starts at ~2,625 at Lv1); **Zantetsuken** kills all non-immune enemies outright. Because Masamune and Excalibur are magical rather than physical, they bypass Vit-based defenses — Shell is the relevant mitigation. Since Odin inevitably becomes Gilgamesh and cannot be avoided once obtained, getting Odin is worthwhile — just do so after Tonberry King.`,

    `{{CALLOUT:card|CC Group steps 5–7}} continuing from Garden liberation. \n- **Spade**: Found on the **2nd-floor hallway/balcony area after the NORG fight** (accessible once Garden becomes mobile) — beat Spade to unlock the higher-rank members\n- **Heart (Xu)**: She is the **Queen** of the CC Group — challenge her on the Bridge after the Garden festival. Win the **Carbuncle Card** from her\n- **King**: First visit **Dr. Kadowaki** in the infirmary — she hints at the King's identity. Then go to Squall's dormitory room and stand next to the bed, choosing any two of the upper dialogue options. Wait with the screen going dark; eventually the King appears. Defeat the King, who then relocates to the Garden Cockpit for rematches — keep challenging to win the **Gilgamesh Card**, which mods into **10× Holy War** (full party invincibility items).\nBeat all CC members to unlock the full chain that continues to Disc 3's Ragnarok.`,

    `{{CALLOUT:relationship|Zell's Love Quest (Steps 5–8)}} Step 5 — While controlling Irvine during Garden Festival preparations, go to the Library and speak to the girl. Step 6 — With **Zell in the party but without Rinoa**, visit the Library; she asks Zell about a book request. Step 7 — Return to the Library again with Zell to face a questionnaire from the Committee Members. Your answers determine a spell reward delivered later: Fish + Pink = **Ultima**, Fish + Blue = **Holy**, Fish + Red = **Triple**, Beef + Blue = **Scan**, Beef + Pink = **Demi**, Beef + Red = **Meteor**, Hot Dogs + Blue = **Full-Life**, Hot Dogs + Pink = **Zombie**, Hot Dogs + Red = **Shell**. Aim for Fish + Pink (Ultima) or Fish + Blue (Holy) for maximum junction value. Step 8 — After the Trabia Garden events, return to the Balamb Garden Library with Zell to receive the questionnaire result spell.`,

    `**Priority card mod chains** for this open window (do these as soon as the relevant cards are in hand):\n- **Kiros Card** → Card Mod → **3× Accelerator** → each Accelerator teaches a GF **Auto-Haste**; use on Quezacotl, Shiva, and Ifrit\n- **Irvine Card** → Card Mod → **3× Rocket Engine** → each teaches a GF **Spd+40%**; use on the same three GFs\n- **Selphie Card** → Card Mod → **3× Element Guard** → each teaches a GF **El.Def.Jx4**; use on Quezacotl, Shiva, and Ifrit to unlock four-slot elemental defense junction\n- **Pandemona Card** → Card Mod → **100× Windmill** → Windmill refines into **Tornado** via T Mag-RF (Quezacotl) — Tornado is one of the best Eva-J spells\n- **Carbuncle Card** → Card Mod → **3× Glow Curtain** → each teaches a GF **Auto-Reflect**. **Warning**: characters with Auto-Reflect cannot be revived by the Life or Full-Life spells — the revival magic bounces off their own Reflect barrier. Use Phoenix Down or the Revive command instead when Auto-Reflect is active on a fallen party member. **Auto-status persistence rule** (applies to all four Auto-statuses — Auto-Reflect, Auto-Shell, Auto-Protect, and Auto-Haste): these statuses cannot be removed by Dispel, do not wear off over time, and re-apply automatically if the character is KO'd and then revived. Enemy Dispel attacks will strip regular Shell/Protect/Haste but leave Auto-granted versions intact. **Additional Auto-Haste benefit**: a character with the Auto-Haste GF ability is immune to both Slow and Stop status infliction — enemies cannot Slow or Stop a character whose Haste is permanent\n- **Gilgamesh Card** → Card Mod → **10× Holy War** (full-party invincibility — do not mod all of these; keep a supply for boss fights)\n- **Angelo Card** → Card Mod → **100× Elixir** (excellent utility stock)\n- **Rinoa Card** → Card Mod → **3× Magic Armlet** → each teaches a GF **Spr+60%**\n- **Cerberus Card** → Card Mod → **100× Lightweight** → each Lightweight teaches a GF **Spd+20%** (or refines to Spd Up) — great for spreading early Speed bonuses before Irvine Cards are available\n- **Leviathan Card** → Card Mod → **3× Doc's Code** → each teaches a GF **Med Data** (doubles the HP restored by items in battle — this applies to ALL recovery and revival items including Potion, Hi-Potion, Mega-Potion, X-Potion, Elixir, Megalixir, Phoenix Down, and Mega Phoenix; revival item healing is also doubled). **Doc's Code additional use**: each Doc's Code can also be refined via Recov Med-RF → **1× Megalixir** — a high-value alternative if Med Data is already learned and Megalixirs are needed\n\nFor **Str+60%**: Card Mod the **Zell Card** into **3× Hyper Wrist** → each teaches a GF Str+60%. For **Vit+60%**: Defeat Adamantoises (Long Horn Island beaches or Dollet continent beaches — do NOT mug them, as mugging prevents the Adamantine drop) to collect **Adamantine** items; each Adamantine teaches a GF Vit+60%. Aim for at least 10× Adamantine total for ultimate weapon ingredients.`,

    `{{CALLOUT:mechanics|Fury Fragment farming}} Blue Dragons (encountered in forests on the Esthar continent and around Centra) can be mugged for **Fury Fragment** items. Alternatively, accumulate 4× Blue Dragon Cards → Card Mod → 1× Fury Fragment. Each Fury Fragment refines via Supt Mag-RF → **5× Aura** — the best Str-J and Crisis Level booster available, and an excellent junction spell pre-Ultima. Stock at least 100× Aura for endgame junctions. **Limit Break mechanics note**: **Return Damage** (GF ability, taught by **Hundred Needles** — obtained by refining 100× Cactus Thorn via Siren Tool-RF; note that Hundred Needles also refines directly into 1× Spd Up via Forbid Med-RF, so choose whether to teach the GF ability or use it for Speed) triggers automatically when the party takes damage from any AoE attack — it deals counter-damage equal to **25% of the damage received** back to all enemies simultaneously. **Counter** (a separate character ability, taught by **Monk's Code** via Card Mod the **Zell Card** → 3× Hyper Wrist → each teaches Str+60%; Monk's Code itself is from Card Mod 10× Gayla Cards → 1× Whisper → Forbid Med-RF → 1× Monk's Code) triggers automatically after the character is hit by a single-target physical attack — they immediately strike back with a standard physical attack. Counter activates even on enemies that one-shotted the counter character, provided the character survived the hit (HP reaches at least 1). The counterattack inherits all current junction bonuses but does not trigger another limit break. Neither Return Damage nor Counter procs when the character is KO'd or under Berserk.`,

    `{{ENCOUNTERS:1}}`,

    `{{CALLOUT:sidequest|Cactuar Island}} small island east of the Centra Kashkabald Desert. Encounters here reward **20 AP per fight** with minimal EXP — the best AP-per-time ratio available at this stage. Use a character with high Str-J and junction **Water** to El.Att.J for one-hit kills (Cactuars have very high Evasion but cannot escape against 255% Hit rate via Diablos's Hit-J + Double). Also, the **UFO** makes its first sighting near Cactuar Island; if it appears during a trip here, simply fly over the island and continue — it will be encountered four more times later for the PuPu sidequest.`,

    `{{CALLOUT:sidequest|Shumi Village}} north of Esthar continent, accessible by submarine or Ragnarok later, but can visit now. The stone quest has two phases. **Phase 1 — find 6 stones**: report each one to the Sculptor and then to the Elder for a **Phoenix Pinion**. Stone locations:\n1. **Blue Stone** — examine the ground to the left of the Laguna statue in the central area\n2. **Wind Stone** — examine the stone on the ground near the hotel (next to the elevator entrance)\n3. **Life Stone** — check the roots at the right side of the Mayor's House\n4. **Shadow Stone** — return to the screen with the Ultima draw point and examine the shadows on the right side\n5. **Fake Water Stone** — check inside the well with the frog (this is not the real one)\n6. **Real Water Stone** — inside the Artisan's House, examine the left part of the kitchen floor\n**Phase 2 — Moomba Doll sub-quest** (required for **Status Guard**, which teaches any GF **ST-Def-Jx4**): After Phase 1, the exact visit order is: (1) talk to the workshop **Attendant**, (2) report to the **Elder**, (3) go outside and talk to the **Moomba** in the village, (4) return to the workshop **Attendant**, (5) report to the **Elder** again, (6) return to the workshop **Attendant** a third time, (7) visit the **Artisan's House**, (8) report to the **Elder**. You are then directed to the **Grease Monkey at Fisherman's Horizon** for the Moomba Doll; return it to the Artisan's House in Shumi Village, then report to the Elder to receive the **Status Guard**. Multiple round-trips to the same NPCs are required — "a series of visits" understates how many steps are involved. After completing both phases, also collect **Timber Maniacs** (9/12) in the Artisan's house and visit the **Ultima draw point** (refillable, costs 5,000 Gil each time). **Timing warning**: Do NOT read the Shumi Village Timber Maniacs magazine before completing the Trabia Canyon dream sequence — reading it early removes Ward from that dream and causes you to miss his interactions.`,

    `{{CALLOUT:sidequest|Chocobo Forests}} Six forests are scattered across the world map. Solving each one rewards items dug up by mama chocobo. Per-forest stone rewards:\n- **The Beginner's Forest** (Trabia, Winter Island near Shumi Village): **Aura Stone**\n- **The Basics Forest** (Trabia, Sorbald Snowfield): **Flare Stone**\n- **Forest of Solitude** (Centra, Nectar Peninsula): **Protect Stone + Meteor Stone** — note: the ChocoBoy stands on the dig spot; challenge him to cards, decline, and he moves\n- **The Roaming Forest** (Trabia, Bika Snowfield near Trabia Garden): **Shell Stone + Holy Stone**\n- **Forest of Fun** (Centra, Lenown Plains near Edea's House): **Meteor Stone + Flare Stone + Ultima Stone**\n- **The Enclosed Forest** (Esthar, Talle Mountains): **Meteor Stone + Holy Stone + Ultima Stone**\n**Achievement: Chocobo** — earned the first time a Chocobo is successfully caught and ridden in any Chocobo Forest. The Beginner's Forest near Shumi Village is the earliest and simplest one; buy a ChocoWhis from ChocoBoy for 1,000 Gil, use the ChocoSonar to find a spot where only one Chicobo appears, call it with the ChocoZiner, then interact with the Chicobo to summon Mama Chocobo and ride her. After completing all six forests, ride a Chocobo from the Roaming Forest north through the shallow waters to reach the **Chocobo Sanctuary** (Grandidi Forest, Esthar) to receive the **Chicobo Card**. The Chicobo Card is needed for the Queen of Cards quest — lose it to the Queen and send her to Dollet. **ChocoBoy shop prices** (available in every forest): **ChocoWhis** 1,000 Gil (first purchase) or 700 Gil (replacement if lost); **Hints** 100 Gil; **Gysahl Greens** 600 Gil each; **Question** 10 Gil; **Help Me** (auto-solve the current forest's puzzle) 1,200 Gil. Buying "Help Me" is a valid option for difficult forests like Forest of Solitude and Forest of Fun, though it costs more than hints. **Bulk Gysahl Greens**: the later forests (Forest of Solitude and The Roaming Forest) sell Gysahl Greens in bundles of **5× for 3,000 Gil**; the final two forests (Forest of Fun and The Enclosed Forest) sell them in bundles of **10× for 6,000 Gil** — single-unit purchase is not available in these four forests; the Beginner's Forest and Basics Forest sell them individually at 600 Gil each. **Chocobo GF attack progression** (requires raising Chicobo via Chocobo World): the Chocobo GF's summon attack upgrades based on Boko's level — **ChocoFire** at Lv1, **ChocoFlare** at **Lv50**, **ChocoMeteor** at **Lv63**, and **ChocoBocle** at **Lv76**. **Chocobo World is fully built into FF8 Remastered** on all platforms — access it from the main menu. In the original Western PS1 release it required a PocketStation accessory (Japan-only hardware) and was unavailable; the Remastered version makes it universally accessible for the first time.`,

    `{{CALLOUT:sidequest|Winhill Vase Quest}} Return to Winhill with Irvine or Quistis in the active party and find the four vase fragments scattered around town. Specific locations: (1) In the **mansion**, examine the suit of armor with Quistis or Irvine in the party, then start to walk away — the fragment is found. (2) In **Raine's house**, speak to the woman upstairs until she mentions flowers, then examine the flowers on the lower-right table, then speak to the woman behind the bar, then examine the cat. (3) In the **flower shop**, examine the flowers in the lower-right corner twice. (4) At the spot where the music changes and a Chicobo crosses the road, kick the Chicobo to get the final fragment; kick it two more times to receive **Gysahl Greens** and a **Phoenix Pinion** (the in-game text mistakenly calls it Phoenix Down). **Easter egg**: continuing to kick Chicobos beyond the third kick eventually causes a Chocobo to launch Squall flying off the screen — this is a harmless cosmetic gag with no gameplay consequence. Reward for all four fragments: **Holy Stone**. (The Phoenix Pinion comes from kicking the Chicobo in step 4, not from the quest reward itself.)`,
  ],

  'd2-exploring-the-world': [
    `With the Ragnarok-equivalent of mobile Garden travel and Tonberry's Call Shop active, several important tasks remain before advancing to Trabia Garden.`,

    `{{ENCOUNTERS:1}}`,

    `{{ENCOUNTERS:2}}`,

    `{{CALLOUT:point|Balamb under Galbadian occupation}} Zell must be in the party. Speak to the hotel owner and a woman near the entrance for clues. Talk to the guard, walk away, and re-approach. Head to **Zell's House** and enter the room on the right. The **Pandemona Card** can be won from a neighbor girl before liberating the town.`,

    `To liberate Balamb: Speak to the Big Bad Rascal twice in Zell's house, then his mother. Go to the hotel and talk to the guards, then go to the north area. Keep the talking window open long enough for the NPC to move to the hotel. When the town is free, the **Pandemona Card** can also be won from the hotel owner's daughter directly. **After liberating the town**, return to the Dincht house and check **Zell's bed** — a **Spd Up** item is waiting there. This is one of the few Spd Up items in the game and is easily missed.`,

    `{{ENCOUNTERS:0}}`,

    `{{CALLOUT:missable|Timber revisit (Disc 2 — Pet Nametag pickup)}} If the Timber Journalist sidequest was started on Disc 1 (talking to the man at the town square and encouraging him), return to Timber now and speak to him again — he is now a journalist and rewards the party with a **Pet Nametag**. This is one of two fixed-location Pet Nametags (the other is in D-District Prison); Chocobo World can yield additional copies in Remastered. It remains available in early Disc 3 as well (there is a reminder in the Disc 3 Aftermath chapter), but collect it now to avoid the risk of missing the window entirely. While in Timber, the **Timber Hotel** has a **Timber Maniacs** (5/12) if not already collected.`,

    `{{CALLOUT:card|Chubby Chocobo Card (Queen of Cards prerequisite)}} Before heading to Trabia Garden, lose the **Chicobo Card** to the Queen of Cards and confirm she travels to Dollet — this triggers the artist there to paint the Chubby Chocobo Card. Once the artist has finished, the card becomes available from a person sitting on a bench in front of the Balamb Garden library. Win it there; it mods into **100× LuvLuvG** (raises all GF compatibility to maximum). Return to Dollet afterward to win the Chicobo Card back from the Queen's son. When all sidequests for this exploration window are complete, advance the story by heading to Trabia Garden (covered in the next chapter).`,
  ],

  'd2-return-to-balamb': [
    `{{ENCOUNTERS:0}}`,

    `Return to Balamb Town to deal with the Galbadian occupation. Zell must be in the party. After following the steps to expose the captain's location, head to the harbor. **Selphie scene**: If **Selphie is in the active party** when visiting Zell's house during the occupation, bring her to **Zell's room** (the first room inside the house) — a short unique scene plays between Selphie and Zell's mother that adds character depth. This scene is only available during the occupation segment and is permanently lost once Balamb is liberated.`,

    `{{BOSS:Raijin (1st)}}`,

    `Strategy: Two G-Soldiers assist Raijin. Defeat or Silence the soldiers first to prevent nuisance. Raijin **absorbs Lightning** — do not junction Thunder/Thundara/Thundaga to Elemental Attack for this fight. He is weak to **Poison** (×1.5). Cast Meltdown to nullify his Vitality. **Mug 2× Str Up** from Raijin — mugging is strictly better than his 1× Str Up drop. Draw **Protect** and **Shell** from Raijin for junctions. **Passive note**: Raijin will not use his physical attack against lone female characters — if only female characters remain standing, he becomes passive. This can be used deliberately to draw safely.`,

    `Raijin appears again immediately after, this time alongside Fujin.`,

    `{{BOSS:Raijin (2nd)}}`,

    `{{BOSS:Fujin (1st)}}`,

    `Strategy (Raijin + Fujin): Raijin's second appearance is level-capped at Lv 29 and his fixed drop is **Combat King 002** (2/5) — this is a guaranteed item drop, not a mug. **Mug 2× Str Up** from Raijin again, but note that if he uses **Raijin Special** (100% critical, 100% hit rate) when low on HP, it can hurt badly — finish him fast at that point. Fujin **absorbs Wind** — do not junction Wind magic to Elemental Attack. She opens with **Tornado** (area Wind magic) until Pandemona is drawn, then switches to physical attacks. **Draw Pandemona from Fujin before her HP drops low** — her **Sai** attack (ignores Vit, reduces any character's HP to exactly 1, never misses) starts appearing when she is seriously wounded. To safely draw Pandemona: whittle her HP to a very low amount while she is still using Aero, then Draw Pandemona as the finishing action before killing her. Fujin can use **Remedy** to cleanse statuses; put her to Sleep to prevent this. **Mug 1× Megalixir** from Fujin (hero/Holy War are also possible mug results). Junction Drain to St.Att.J to passively heal while attacking — combine with Darkside for triple physical damage output.`,

    `{{CALLOUT:mechanics|SeeD rank boost}} Before triggering the harbor confrontation, follow the dog in Balamb. The dog runs from the harbor to the train station to the town square — following it and interacting at the right moment grants **+1 SeeD rank**.`,

    `{{CALLOUT:card|Queen of Cards quest step}} After Balamb is liberated, take the Pandemona Card that was just drawn and also have the **Sacred Card** and **MiniMog Card** in hand. Go to Balamb's train station and challenge the Queen of Cards — lose intentionally with both Sacred and MiniMog in the playing hand. She will take both cards and announce her next destination; confirm she moves to **Dollet** (reset if she goes elsewhere). Losing Sacred creates the **Irvine Card** (held by Flo at FH Mayor's house); losing MiniMog creates the **Kiros Card** (held by a man in black in Deling City's shopping arcade). The Balamb Hotel owner now also holds the **Pandemona Card** — challenge him to win it.`,
  ],

  'd2-trabia-garden': [
    `The combined forces need to confront Galbadia Garden. Before the battle, Squall's team discusses the orphanage revelation at Trabia Garden. The emotional scenes here are extensive — speak to all NPCs.`,

    `{{ENCOUNTERS:0}}`,

    `In the **Trabia Garden ruins**, collect these items systematically:\n- **Weapons Monthly August Issue** (5/7): from the **Thundaga draw point** (at the fountain in the main interior area), walk approximately **5 steps south** and search the ground\n- In the **cemetery area** (one screen right of the fountain), find **Timber Maniacs** (10/12) to the left of the draw point\n- The **Thundaga draw point** is at the fountain in the main interior area — stock up before heading elsewhere\n- The **Selphie Card** is won from Selphie's friend near the gargoyle statue (Selphie must be in the active party)\n- Check the classroom for background information on Selphie via the console\n\nAfter the basketball court scene, challenge Selphie's friend to win the Selphie Card before leaving. The **Selphie Card** mods into **3× Element Guard** via Card Mod → teaches any GF **El.Def.Jx4** (if not already done).`,

    `Prepare thoroughly before triggering the next battle — ensure all party members have top-tier junctions, as a sequence of major boss fights follows. Head back to Balamb Garden and speak to Cid to trigger the **Battle of the Gardens**.`,
  ],

  'd2-battle-of-the-gardens': [
    `The Battle of the Gardens begins with Galbadian Garden ramming Balamb Garden. The party boards the enemy garden to locate and deal with its leadership.`,

    `The battle opens with a **one-on-one paratrooper skirmish** mini-game. Kicks are fast but deal modest damage; punches are slower but hit harder; Deathblow becomes available after blocking several of the enemy's attacks and delivers the highest damage. Optimal approach: block each incoming punch (not kick) to build toward Deathblow access, then counter with a kick to stun, follow up with a punch, and use Deathblow when the option appears. The outcome has no effect on the story but a decisive win nets a better reward.`,

    `During the exterior battle sequence, an **Aura draw point** is accessible just before entering Galbadia Garden — draw from it while it is available.`,

    `{{ENCOUNTERS:0}}`,

    `While fighting through Galbadian soldiers, **Tri-Face** enemies appear as fixed encounters in some hallways of Galbadia Garden. There is a specific fixed encounter on the **stairs near the main hall where Cerberus waits** — even after Cerberus is defeated, Tri-Faces still spawn on those stairs. Farm as many as possible; this is the best Curse Spike source available. Each Curse Spike can be used on Quistis to teach **LV? Death** Blue Magic (kills all enemies whose level is divisible by a chosen number — the divisor changes with Crisis Level: CL1 kills multiples of 4, CL2 kills multiples of 3, CL3 kills multiples of 2 i.e. all even-level enemies, CL4 kills every enemy; at CL4 it is effectively a free-cast Death on all enemies in range), or refined to 10× Pain via ST Mag-RF. 100× Curse Spikes → 1× Dark Matter via Siren's Tool-RF (Siren must be **Lv 100** for Tool-RF to access the Dark Matter recipe) → use 1 Dark Matter on Quistis to teach **Shockwave Pulsar** (the most powerful Blue Magic in the game, capable of exceeding the 9,999 damage cap). Tri-Faces at Lv 30+ also hold **Flare** magic — draw from them if Flare stocks are low.`,

    `**Cerberus** must be fought in the main hall. Defeating it earns the GF. Save before engaging.`,

    `{{BOSS:Cerberus}}`,

    `Strategy: Cerberus **absorbs Lightning** and is **immune to Wind** — remove any Lightning or Wind junctions from Elemental Attack before this fight. Under Triple, Cerberus gains access to Thundaga, Silence, and Blind — use Dispel the moment it casts Triple on itself. When not under Triple it uses Berserk, Quake, and Tornado. Junction **Quake and Tornado** to El.Def.J to absorb those elements. Put **Berserk** on St.Def.J. Cerberus opens with a **Triple** cast on the entire party — immediately use it. **Cerberus's summon attack (Counter Rockets) casts Double and Triple on all party members** — summoning Cerberus in any battle is often more efficient than spending two turns casting them manually, and it costs no magic stock. **Level note**: Cerberus only has Triple in its draw list at **Lv 20+**. At levels 1–19, only Quake and Double are available — if the party is under Lv 20, draw Quake and Double instead and proceed without Triple-enhanced Limit Breaks. Cast Meltdown and unleash Triple-cast Limit Breaks. **Mug a Spd-J Scroll** from Cerberus — this teaches any GF the Speed Junction ability. Cerberus also **drops 8× G-Returner** (teaches Rinoa the Angelo Reverse Combine — however, see the Disc 1 Angelo Search warning). **Cerberus GF ability priority**: **Spr-J** → **Spd-J** → **St.Def.J** → **St.Def.Jx2** → **St.Def.Jx4** → **Mag-J** → **St.Att.J** → **Spd+20%** → **Spd+40%** → **Auto-Haste** → **Alert** (prevents back attacks).`,

    `Seifer confronts Squall twice in the corridors of Galbadia Garden. After the first Seifer fight, save before approaching the auditorium.`,

    `{{BOSS:Seifer (2nd)}}`,

    `Strategy (2nd encounter): Seifer can use Demon Slice (strong single-target physical), Fira/Firaga, and Hi-Potion when low on HP. Junction Fire class magic to El.Def.J. **Mug 8× Mega-Phoenix** from Seifer. His drop is 8× Mega-Potion. Draw **Haste** and **Dispel** from him.`,

    `{{BOSS:Seifer (3rd)}}`,

    `Strategy (3rd encounter): This Seifer has much lower HP than the previous version and only uses Fira and a sword swipe. **Mug Hero or Holy War** from this Seifer — at any level his mug table yields Hero or Holy War. His drop table also yields Hero or Holy War. After defeating him, Edea confronts the party.`,

    `{{BOSS:Edea}}`,

    `Strategy (2nd time): Draw **Blizzard** (scaling to Blizzara/Blizzaga at higher levels), **Demi**, **Esuna**, and most critically **Alexander** from Edea — **Draw Alexander from Edea here** — this is the primary opportunity. If missed, Alexander can still be drawn from Catoblepas in Ultimecia's Castle as a last resort, but do not rely on that as a plan. **Mug a Royal Crown** from Edea at all levels (teaches any GF **Mag+60%**); her drop is **Force Armlet** (teaches any GF **Spr+40%**). Edea's **Maelstrom** opens the battle — junction **Aura or Pain** to St.Def.J to prevent the **Curse** status it inflicts (Curse blocks Limit Breaks). **Aura is particularly efficient for Curse immunity**: junctioning just **50× Aura** to St.Def-J provides 100% Curse resistance — the highest Curse-blocking value of any single spell, and you don't need a full 100 stack. Maelstrom cannot reduce HP below 1. Edea uses Death magic — junction **Death to St.Def.J**. Her other spells (Blizzaga, Thundara, Fira, Silence, Slow, Reflect, Dispel) are all manageable through correct elemental and status junctions. Edea is vulnerable to Sleep — use it to create safe windows for drawing. After Edea's defeat, the truth about Ultimecia's possession is revealed. Disc 2 ends.\n\n{{CALLOUT:mechanics|Alexander GF ability priority}} **Revive** (full-party HP restore — learn this first), **High Mag-RF** (refines high-level magic — critical utility; key chain: **10× Double → 1× Triple** via High Mag-RF, and **5× Fira → 1× Firaga**, **5× Blizzara → 1× Blizzaga**, etc. — useful for converting partial mid-tier stocks into tier-3 junction spells), **Med Data** (doubles item healing), **Med LV Up** (refines Remedy → Remedy+, needed for Doomtrain), **Spr-J**, **El.Att.J**, **El.Def.Jx4**.`,
  ],

  // ───────────────────────────────────────────────────────── DISC 3 ──────────

  'd3-the-aftermath': [
    `Disc 3 opens at **Edea's House** on the Centra continent. Squall wanders the beach while Rinoa lies unconscious. Head right from the house and walk up the chain to the world map.`,

    `{{ENCOUNTERS:1}}`,

    `The path north leads through the Great Salt Lake to reach Esthar.`,

    `{{ENCOUNTERS:0}}`,

    `In the **Great Salt Lake**, navigate carefully — the area looks deserted but has multiple screen transitions. The path goes: north, north, north, east, north, west, then attempt to go north to trigger an ambush.`,

    `A **Meteor draw point** and a **Thundaga draw point** are both accessible in the Great Salt Lake area — stock up on both before proceeding.`,

    `{{BOSS:Abadon}}`,

    `Strategy: Abadon is **Undead** — Fire and Holy deal double damage. The simplest method: cast an **Elixir, X-Potion, or Mega-Potion** directly on Abadon for 9,999 damage; repeat twice. The Recover command also deals 9,999. Draw **Curaga** (or Cura at lower levels), **Esuna**, **Dispel**, and (at Lv 30+) **Flare** from Abadon. You can also draw Curaga and cast it directly on Abadon to deal heavy magic damage — a useful trick when sitting-down Vit is manageable. **Mug a Power Wrist** from Abadon (all levels). Abadon drops **10× Flare Stones** — useful for refining. When Abadon stands up, its Vit and Spr become extremely high — avoid attacking during that phase. Abadon follows a fixed pattern: a few turns of physical attacks → Stand Up (magic phase: Silence, Blind, Confuse, Dispel) → Sit Down → repeat. Confuse on St.Def-J protects against its most dangerous status attack.`,

    `After escorting Rinoa through the Great Salt Lake passage, proceed northeast to find the mystery building. Navigate north through its interior to reach the world map and eventually the **White SeeD ship** (approached from Balamb Garden — more on this below).`,

    `{{CALLOUT:missable|Missable — Journal Entries}} At **Edea's House**, talk to **Edea** repeatedly until her dialogue mentions Adel's name in yellow text — this unlocks the "Esthar (1)" and "Esthar (2)" journal entries. Then speak to **Cid** repeatedly until he has no new dialogue — this unlocks the "Time Compression" and "The Great Hyne" entries. Both conversations must happen here; these lore entries cannot be obtained elsewhere.`,

    `{{CALLOUT:warning|Before proceeding to the White SeeD ship}} At **Edea's House bedroom**, check the ground to collect **Timber Maniacs** (11/12) — do not miss it before leaving. Return to Balamb Garden's Training Center and take the left path at the cross to find **Weapons Monthly July Issue** (6/7) on the ground near some logs. Also challenge **Edea** at Edea's House to a card game to win the **Edea Card** (essential rare card). **Critical — Centra card rules apply at Edea's House**: The house is on the Centra continent, which defaults to **Same + Plus + Random** rules. Random is particularly disruptive — soft-reset or manipulate rules before playing Edea to avoid an unwinnable hand. Also challenge **Cid** at Edea's House for the **Seifer Card** — if the Seifer Card was not won from Cid at Balamb Garden before the Timber mission, this is the next opportunity. The same Centra rule warning applies. If the journalist in Timber Square was kept from quitting on Disc 1, talk to him at the Timber Square entrance for the **Pet Nametag**. The **Occult Fan III** from the FH Master Fisherman should also be in inventory if not already collected. **Zell's Love Quest (Step 9 — Final Step)**: After the Battle of the Gardens, speak to the Library Committee Girls at Balamb Garden's library with **Zell in the party** — they inform Zell that the Library Girl is looking for him. Then travel to **Balamb Town**: a girl near the town entrance (train station or town gate, depending on how you arrived) tells Zell the Library Girl wants to meet. Enter the **Balamb Hotel**, speak to the Library Girl, and spend the night. Check downstairs the following morning to receive **Combat King 003** (3/5) and see the final scene of the sidequest. This is the primary trigger for Combat King 003; if this window is missed, Combat King 003 can be purchased as a backup from Karen's Book Store in Esthar for 1,000 Gil (no Familiar required). Note: the Abyss missables guide places this quest step immediately after the Battle of the Gardens and before further Disc 3 content — do it as early as possible to avoid forgetting.`,

    `Find the **White SeeD ship** by navigating Balamb Garden into the sea north of Edea's House and scouring the Centra continent inlets. Once alongside the ship, board it.`,

    `On the White SeeD ship, speak to Zone on the main deck. After the scene, follow Zone upstairs to the **bridge** — examine the book resting on the bridge floor to receive **Timber Maniacs** (12/12) — the final issue.

{{CALLOUT:missable|Missable — Timber Maniacs 12/12}} This is the only copy of Timber Maniacs 12/12. The White SeeD ship is only accessible during this brief Disc 3 window; once Squall leaves and the story advances, the ship is gone. Collect the magazine before doing anything else on deck. Speak to Zone three times in total, then **give the "Girl Next Door" magazine to Zone for free** (do NOT sell it for 25,500 Gil unless absolutely desperate — giving it free earns the **Shiva Card** and a **Rename Card**). The Shiva Card is an important rare card. Enter the ship's interior and speak to the leader twice.`,

    `In the **leader's cabin**, there is a **Holy draw point** — stock up on Holy magic here, as it is invaluable for junctions.`,
  ],

  'd3-trabia-canyon': [
    `{{ENCOUNTERS:0}}`,

    `The search for Ellone leads through the Trabia Canyon region. Another Laguna dream sequence triggers as the party ventures further north. **Novice SeeD Candidates (Window 5 — Final)**: Before entering Trabia Canyon, make sure to visit the Cafeteria one last time and speak to the three novice students — this is the fifth and final dialogue window. Completing all five windows triggers a bonus graduation scene. After this window closes, the quest cannot be completed.`,

    `In the dream, **Laguna, Kiros, and Ward** are on a film set — Laguna has become an actor. The Trabia Canyon combat sequence uses a directional combat system: press Square to defend, Triangle to attack. When the enemy's recovery animation is faster than usual, defend. It takes ten successful strikes to defeat the opponent. When given the option, choose "H-Hold on a sec..." to return to the previous screen and check junctions before committing. Note: If the **Shumi Village Timber Maniacs** was read, Ward will not be present in this dream. **Missable draw opportunity**: The film-set battle involves Ruby Dragon enemies in the real-world encounters outside the Trabia Canyon entrance. If the party is at a low level, use LV Up (Tonberry ability) to raise Ruby Dragons to **Lv 45+** before the canyon, then draw **Flare and Meteor** from them — this is one of the few low-effort opportunities to stock these junction spells before reaching Esthar. Ruby Dragons at Lv30–44 only hold Flare; at Lv45+ they also carry Meteor.`,

    `After the dream ends, Balamb Garden heads to Edea's House where Edea provides the White SeeD ship's location: "somewhere near an inlet on the Centra continent." She also gives the **Sorceress' Letter** — needed on the White SeeD ship. If the letter is ever accidentally sold or lost, return to Edea at her house and she will provide a replacement copy.`,
  ],

  'd3-picking-up-the-trail': [
    `Following the White SeeD's information about Ellone and the Esthar connection, the trail leads toward Esthar. After the White SeeD ship scenes, Balamb Garden heads toward the Esthar coast.`,

    `{{ENCOUNTERS:0}}`,

    `Talk to Edea at the Horizon Bridge area — choose "Yeah, I remember." Edea joins the party temporarily as a Lv 26 sorceress. Head east along the Horizon Bridge to the Seaside Station, then north to enter the **Great Salt Lake** if not already navigated. **Perfect game note**: For full completion, **do not allow Edea to land the killing blow on any enemy** while she is in the party. Her kill count must remain at zero throughout this segment. Use the others to deal finishing blows; have Edea Draw or cast support magic only.`,

    `From the landing zone, proceed on foot across the Centra continent toward Esthar's hidden entrance. The **Esthar roads** are invisible but navigable — the glowing pathways appear underfoot as Squall walks on them. Head northeast following the lit roads. The route passes near **Tear's Point** — the giant statue area. Continue northeast to reach Esthar City.`,
  ],

  'd3-journey-to-the-silent-country': [
    `Crossing the Esthar continent requires following the glowing hidden roads. From the entry point, head northeast, following the clearly delineated pathway.`,

    `{{ENCOUNTERS:0}}`,

    `At **Tear's Point**, examine the ground near the feet of the giant statue to collect the **Solomon's Ring** — the item needed to summon GF Doomtrain. Continue northeast toward Esthar City.`,

    `Upon entering Esthar City, the **fifth and final Laguna dream** triggers automatically. Laguna, Kiros, and Ward are navigating Dr. Odine's laboratory in Esthar. During this dream, after the scene where Laguna escapes outside and then returns to the lab, check the **lower-left corner of the floor** to pick up **Weapons Monthly 1st Issue** (7/7) — the final weapons magazine needed to unlock all ultimate weapons. This is missable if overlooked during the dream. The 1st Issue unlocks the Lionheart (Squall), Ehrgeiz (Zell), Exeter (Irvine), Save the Queen (Quistis), Shooting Star (Rinoa), and Strange Vision (Selphie) at any Junk Shop.`,

    `Esthar City is vast. From the city entrance: go right, up, up, right, up to reach the **Presidential Palace** area. The shopping arcade (exit east from the palace, then east, east, southeast, east) features several shops with free gifts on first visits. **IMPORTANT — Call Shop prerequisite**: You must physically visit each Esthar shop at least once before it appears in Tonberry's Call Shop inventory. If any Esthar shop (Cloud's, Johnny's, Karen's Book Store, Pet Shop, Don Juan's) is never entered, it will be permanently unavailable via Call Shop — making those items unattainable on Disc 4 when shops are physically inaccessible. Visit every shop this trip.\n- **Cheryl's Shop**: Try entering repeatedly — on roughly the 4th–8th attempt, receive a **Rosetta Stone** for free.\n- **Cloud's Shop** (labeled "Esthar Shop" in-game): Receive a free **Hi-Potion**, then **X-Potion** on repeat visits.\n- **Johnny's Shop** (labeled "Esthar Shop!!!" in-game): Receive a free **Hi-Potion**, then **Mega-Potion**. With Familiar active, the full inventory is: **X-Potion** (5,000 Gil), **Mega-Potion** (10,000 Gil), **Mega Phoenix** (10,000 Gil), **Elixir** (50,000 Gil), and **Cottage** (1,800 Gil). Buy **5× Elixir** here for the PuPu sidequest. The Cottages here are the most convenient bulk source for the Tent+Cottage gil-farming cycle. **G-Potion note**: G-Potion costs **100 Gil** at this shop — half the standard 200 Gil price everywhere else, making it the cheapest G-Potion source in the game. **G-Returner is NOT stocked here** — buy G-Returner at any general item shop or from the Balamb Garden mobile shop instead.\n- **Karen's Shop** (the Esthar Book Store): Receive a free **Hi-Potion**, then **Mega-Phoenix** on repeat visits. Stocks **Occult Fan I** and **Occult Fan II** for sale (35,000 Gil each, Familiar required) — these are the fallback source if either was missed earlier. Also stocks **Weapons Mon Mar** through **Aug** (six monthly issues at **1,000 Gil each**, no Familiar required) — if any weapon upgrade magazine from March through August was missed anywhere in the walkthrough, they can all be purchased here without gating. Also stocks **Combat King 001** (1,000 Gil), **Combat King 002** (1,000 Gil), **Combat King 003** (1,000 Gil), **Combat King 004** (1,000 Gil, Familiar required), and **Combat King 005** (30,000 Gil, Familiar required — fallback if missed during the Lunatic Pandora sequence). **Weapons Mon 1st** (50,000 Gil, Familiar required) is exclusively sold here — if the Disc 3 Laguna dream pickup was missed, this is the only remaining source for the final weapons magazine. **Combat King 004** note: if the timed Lunatic Pandora sequence was rushed, buying it here with Familiar is the backup.\n- **Pet Shop**: Buy **Pet Pals Vol. 5** (5/6) and **Pet Pals Vol. 6** (6/6) — Vol. 5 teaches Rinoa **Angelo Search**, one of the most powerful passive abilities in the game. Angelo Search triggers automatically during idle time and recovers rare items from the item table.`,

    `{{CALLOUT:shop|Esthar Ammo Shop}} The standard **Esthar Shop** (not "Esthar Shop!!!") sells **Dark Ammo** (300 Gil each) and **Fire Ammo** (500 Gil each) without needing the Familiar ability. This is the first point in the game where these ammo types are reliably buyable — unlocking **Dark Shot** (inflicts Poison, Darkness, Silence, Sleep, Slow) and **Flame Shot** (fire-elemental AoE) for Irvine. The shop also stocks all standard items (Hi-Potion, Phoenix Down, Eye Drops, Remedy, etc.) without Familiar — though the **Demolition Ammo** and **Fast Ammo** do require Familiar to appear. If Irvine is in the active party and these Shot types have not yet been unlocked, purchasing at least one of each from the Esthar Shop is a worthwhile stop.

At the **Presidential Palace**, speak to Dr. Odine for the Ward Card opportunity. Challenge **Dr. Odine** to a card game to win the **Ward Card** — do not allow Centra rules to spread from his card pool to other regions.

{{CALLOUT:missable|Missable — Occult Fan IV}} To obtain **Occult Fan IV** (4/4), the correct sequence is: (1) speak to the **Presidential Aide in blue** standing near the Airstation at the edge of Esthar City before entering the Presidential Palace, (2) then speak to the same aide again inside the Presidential Palace, (3) then examine the book stack on the ground after the Secretary steps away. Skipping the first conversation with the aide blocks the Occult Fan IV from appearing. The fourth Occult Fan completes the set; it cannot be found at any other time if this is missed (though it is not needed if Doomtrain is obtained via direct ingredient collection rather than the magazine chain).`,

    `For **Combat King 004**: first find an E-Soldier on the road (exit west, west, east, east from city entrance — talk to the stationary E-Soldier on the upper blue road and get the response "Oh yeah. That's right." — this is a mandatory prerequisite conversation). The Combat King 004 itself is retrieved during the Lunatic Pandora timed sequence.`,

    `When fully prepared, head to the **Lunar Gate** structure on the Esthar continent, enter the capsule, and blast off. Trust Zell at the capsule; choose a companion and confirm. As Zell, exit the gate and return to Esthar City for the next set of events.`,
  ],

  'd3-the-resistance': [
    `Inside Esthar City, the Lunatic Pandora is coming. Speak to Odine at his laboratory for the mission briefing. Take the couch-elevator, exit north, talk to Odine in the lab, and prepare for the timed mission.`,

    `{{ENCOUNTERS:0}}`,

    `{{CALLOUT:sidequest|Doomtrain preparation}} complete before the Lunatic Pandora timer begins. \n- Solomon Ring is already in inventory from Tear's Point.\n- **6× Steel Pipe**: Fastest method — Card Mod **Elastoid Cards** (1 Elastoid Card → 1 Steel Pipe via Diablos Card Mod). Alternatively, mug from **Wendigo** enemies in the forest near Dollet/Galbadia, mug from Iron Giants (Esthar roads), or obtain via Tonberry's Angelo Search. **Surplus Steel Pipes** (beyond the 6 needed) refine via **ST Mag-RF → 20× Berserk** each — a solid St.Atk-J spell that also doubles as a junction for status-based builds.\n- **6× Remedy+**: Alexander's **Med LV Up** ability refines 10× Remedy into 1× Remedy+. Buy Remedies from shops and refine them.\n- **6× Malboro Tentacle**: Card Mod 4× Malboro Cards (Diablos's Card Mod ability), or Mug from Malboros (extremely dangerous — equip Silence to ST-Atk to prevent Bad Breath; Malboros also use **Dissolving Acid**, a physical single-target attack that deals 37.5% of the target's current HP and inflicts Vit 0 — junction Protect or keep Invincible active to mitigate it).\nUse the Solomon Ring once all six of each ingredient are in inventory to summon **GF Doomtrain** (13/16) — **Achievement: Doomtrain** unlocks upon obtaining the GF. Doomtrain's priority abilities: **St.Def-Jx4**, **El.Def-Jx4**, **Forbid Med-RF**, **Auto-Shell**, **Darkside**. **Darkside self-damage warning**: Darkside deals triple physical damage to an enemy but reduces the user's HP by 10% of their max HP each use — this self-damage is NOT blocked by Invincible status (from Hero, Holy War, or Invincible Moon). Do not use Darkside on an already low-HP character even while Invincible. **Doomtrain's summon attack (Runaway Train)** inflicts 11 status ailments simultaneously: Blind, Berserk, Confuse, Curse, Doom, Silence, Sleep, Slow, Stop, and Vit 0, plus damage — making it a powerful status-delivery tool against groups that aren't immune. **Important GF ability warning**: any ability that a GF learns uniquely (i.e., cannot be re-taught via any item) is **permanently lost if that GF unlearns it**. There is no way to restore a forgotten unique ability. Always confirm an ability is expendable before overwriting it.`,

    `When ready, exit Odine's lab to start the 20-minute timer as the Lunatic Pandora approaches Esthar. The Combat King 004 pickup and boarding sequence begins immediately.`,
  ],

  'd3-esthar': [
    `With Esthar now accessible and before the push to the Lunar Gate, this is the primary free-roaming window for Disc 3 optional content.`,

    `{{ENCOUNTERS:0}}`,

    `{{CALLOUT:mechanics|Gil farming}} best method in the game. Use Carbuncle's **Recov Med-RF** ability. With Tonberry's **Haggle**, **Sell-High**, and **Call Shop**:\n1. Call Shop and buy 100× Tent (75,000 Gil with Haggle) and 100× Cottage (135,000 Gil with Haggle) — total 210,000 Gil spent.\n2. Refine all 200 items into 75× Mega-Potion using Recov Med-RF.\n3. Sell all 75× Mega-Potion with Sell-High for 7,500 Gil each = 562,500 Gil total.\nNet profit with Sell-High: **~352,000 Gil per cycle**. This is the standard method for financing ultimate weapon crafting.`,

    `**Occult Fan IV** from the Presidential Palace Secretary (if not already collected) — note: the Secretary must first be spoken to and given a bit of time to move before examining the book stack; also, speaking to the **Presidential Aide in blue** may be required as a prerequisite step before the Occult Fan IV becomes accessible. Win the **Ward Card** from Dr. Odine as well. Visit the **Esthar Pet Shop** (Familiar required): it sells **Pet Pals Vol. 5 and Vol. 6** (for Angelo Search and Wishing Star), plus **4 specialty accessories for 20,000 Gil each** — **Giant's Ring** (teaches HP+40% to a GF), **Power Wrist** (teaches Str+40%), **Force Armlet** (teaches Spr+40%), and **Hypno Crown** (teaches Mag+40%). **Familiar gating at the Pet Shop**: the five junction scrolls (HP-J, Str-J, Vit-J, Mag-J, Spr-J) and Pet Pals Vol. 5–6 are available without Familiar. The four 20,000 Gil specialty accessories (Giant's Ring, Power Wrist, Force Armlet, Hypno Crown) require Familiar to appear in stock. Also buy **Amnesia Greens** and any junction scrolls needed. These scrolls allow teaching junction abilities to GFs that don't natively have them — the SI guide recommends using them to redistribute junction slots across GFs so each party member's full GF loadout provides all needed junctions from a single GF. The **Rosetta Stone** from Cheryl's Shop (enter ~4–8 times) gives one GF the Ability×4 character ability (four simultaneous character ability slots instead of three). **Action required immediately upon obtaining it**: junction that GF to the character who will level the most, then equip **HP Bonus + Str Bonus + Mag Bonus + Spr Bonus** (or swap one for Vit Bonus) as that character's four abilities. Every level gained from this point adds +30 max HP and +1 to three stats permanently. Do not level any character before this configuration is in place — every level without these active is permanently lost potential. **Important warning about the Rare Item party ability**: The Rare Item ability (learned by any GF for 250 AP) changes mug and drop probabilities — it improves chances for Slot A, B, and C items but makes Slot D items (the absolute rarest) completely unobtainable at 0/256. If any enemy has a critical ingredient only in Slot D, equipping Rare Item will prevent ever getting it. Always check what each enemy's Slot D item is before equipping Rare Item on a farming run. For reference, Adamantoise Slot D is Whisper (needed for White Wind Blue Magic), and some other enemies have rare ingredient items in Slot D only.`,
    `{{CALLOUT:enemy|Abyss Worm combat mechanic}} When first encountered, Abyss Worm is in its burrowed form — it uses **Protect** and **Reflect** on itself, then **Sandshake** (Earth-elemental AoE physical) as a counter after taking physical hits. After being attacked **4 or more times**, it transitions to **Lift Head** form: it can no longer use Protect, Reflect, or Sandshake, but gains access to **Head Swing** (physical AoE), **Aero** (single-target Wind), and **Saliva** (single-target, inflicts **Curse**). Curse blocks Limit Breaks, so cure it immediately with Esuna or Remedy. When planning to Mug it for Windmills (Lv 20+: 2× Windmill guaranteed at all slots), use the Mug command within the first 3 attacks before the form change, or wait until after it fully transitions — the Reflect it casts in burrowed form will bounce any magic used during that phase back at the caster. At Lv 30+ it draws Aero, Tornado, and Quake — Tornado and Quake are excellent Eva-J and Spd-J junction sources.`,

    `{{CALLOUT:refinement|Shaman Stone refine chains}} alternative Holy War source. Shaman Stone is a versatile resource used for several high-value chains. Sources: Angelo Search retrieves them at 0.35%, or from Tool-RF on Mog's Amulet (1 amulet → 1 Shaman Stone), Hungry Cookpot (1 → 1 Shaman Stone), or Dark Matter (1 → 1 Shaman Stone). Shaman Stone refines via Forbid Med-RF (**Doomtrain must be Lv100** for this recipe to appear) → **Hero-trial**; then via Med LV Up → the chain progresses upward through Hi-Potion → Mega-Potion → X-Potion → Mega-Phoenix → Elixir → Megalixir → **Holy War** (at high enough Med LV Up tier). This is the alternative Holy War chain if Gilgamesh Card is unavailable or being held. **Important note on "trial" versions**: Hero-trial and Holy War-trial are the intermediate forms in this chain — when *used in battle*, they only have a **50% chance** of successfully granting Invincible status. Full Hero and Holy War items are 100% reliable. For the Omega Weapon fight and other critical encounters, use the full versions rather than the trials. **Rosetta Stone ↔ Shaman Stone**: A Rosetta Stone can be converted into a Shaman Stone via Tool-RF (1:1), and a Shaman Stone can be converted into a Rosetta Stone via GFAbl Med-RF (1:1). This bidirectional conversion means holding extras of either is flexible — use whichever form is needed at the moment.

{{CALLOUT:refinement|Complete refinement reference — missing recipes not listed elsewhere in the guide}} **F Mag-RF** (Ifrit) — notable item inputs: 1× **Bomb Spirit** → **100× Firaga** (high-yield Firaga route; Bomb Spirit mugged from Bomb enemies at Lv30+). Also: 1× **Phoenix Pinion** → **100× Firaga** and 1× **Phoenix Spirit** → **100× Firaga** — useful when these items have accumulated and Firaga stocking is a priority. 1× **Flare Stone** → **1× Flare**; 1× **Inferno Fang** → **20× Flare** (early Flare source before drawing from Ruby Dragons).

**L Mag-RF** (Siren) — notable item inputs: 1× **Phoenix Spirit** → **100× Full-Life** (single-item Full-Life production; the primary reason to hold Phoenix Spirits rather than using them all for the Revive command); 1× **Regen Ring** → **20× Full-Life** (from Torama Card chain). Also highly efficient Curaga sources: 1× **Tent** → **10× Curaga** and 1× **Cottage** → **20× Curaga** — buying 100 Cottages from any shop (1,800 Gil each at Esthar Shop!!!) and refining via L Mag-RF yields 2,000× Curaga, making this one of the cheapest Spr-J farming loops in the game (far more Gil-efficient per Curaga than the Whisper mug route).

**Recov Med-RF** (Carbuncle) — additional inputs not shown in main chains: 1× **Mesmerize Blade** → 2× Mega-Potion; 1× **Healing Ring** → 20× Mega-Potion; 1× **Life Ring** → 2× Phoenix Down; 1× **Regen Ring** → 8× Phoenix Down.

**ST Med-RF** (Siren) — key status-item production chains: 1× **Curse Spike** → 1× Remedy; 1× **Malboro Tentacle** → 2× Remedy; 1× **Poison Powder** → 3× Antidote; 1× **Silence Powder** → 3× Echo Screen; 1× **Zombie Powder** → 3× Holy Water. These are the most efficient sources for those consumables.

**GFRecov Med-RF** (Leviathan) — refines items into GF recovery items. Full recipe set: 1× **Healing Water** → 2× G-Hi-Potion; 1× **Whisper** → 4× G-Hi-Potion; 1× **Healing Ring** → 20× G-Mega-Potion; 1× **Regen Ring** → 6× G-Returner; 1× **Phoenix Spirit** → 40× G-Returner; 1× **Healing Mail** → 1× Pet House; 1× **Silver Mail** → 2× Pet House; 1× **Gold Armor** → 4× Pet House; 1× **Diamond Armor** → 16× Pet House. Pet House items revive a KO'd GF to full HP — the Diamond Armor chain is the most efficient large-batch production route.

Head to **Tear's Point** on the Esthar continent and witness the scenes (if the Solomon Ring was not collected yet, do so now). Then proceed to the **Lunar Gate** when preparation is complete. Trust Zell at the capsule and choose a party member.`,
  ],

  'd3-siege-of-esthar': [
    `The **Lunatic Pandora** is ramping through Esthar, and the party must board it before it reaches Tear's Point — approximately **20 minutes** to make contact.`,

    `{{ENCOUNTERS:0}}`,

    `Three contact points exist for boarding:\n- **CP1**: Center of the city, while the timer shows 12–15 minutes remaining. Exit east from Odine's lab, then follow the route to the central skyway junction.\n- **CP2**: Where the skyways cross (lower blue pathway), timer 5–10 minutes remaining.\n- **CP3**: North of the shopping mall, timer under 3 minutes.`,

    `Immediately upon starting the timer: exit Odine's lab east, exit west, north, north, east, east to reach the highest blue road. Talk to the **stationary E-Soldier** here twice to receive **Combat King 005** (5/5) — the final issue. Then proceed east to reach CP1.`,

    `{{CALLOUT:enemy|Enemy Levels — Lunatic Pandora}} All non-Galbadian enemies encountered here (Esthar Soldiers, Soldiers, etc.) are fixed at **Level 1** — even on a high-level save. This makes the Pandora an unusually safe farming ground for AP with essentially zero EXP gain. Consider removing Enc-None temporarily to build AP on these encounters.

Once inside the Lunatic Pandora, collect everything Laguna's dream unlocked:\n- At the **base of elevator 3** (before ascending), check for a **Confuse draw point** — stock up here\n- Exit north, take **elevator 3**, exit southeast (down hard-to-see stairs), climb the ladder, check the **east dead-end** for **LuvLuvG** (+20 GF compatibility with all GFs)\n- Right door: **Power Generator** (teaches GF a powerful ability)\n- Middle door: **Silence draw point** (stock up)\n- Left door: **Phoenix Pinion** (teaches Phoenix to a GF — see GF notes below)\n- Check ground near right wall: **Combat King 005** (5/5) if not already obtained\n- While walking north from the elevator, examine the **hole in the left wall** to find the **Spd-J Scroll** (teaches any GF Speed Junction)\n- **Ultima draw point** (accessible only if the Old Key was picked up during the Laguna Pandora dream): unlocked by the key inserted during Disc 1. This Ultima draw point is **one-time only** and does not recharge — stock the full 100 on the first visit. The location is through the doorway unlocked by the Old Key found near the Confuse draw point during the first dream.\n- **Meteor draw point**: accessible at the main entrance of the Pandora on first contact — stock before going deeper.`,

    `{{CALLOUT:warning|GF Phoenix}} Phoenix Pinion teaches the Phoenix GF to any GF that can learn it. More importantly, after Phoenix has been summoned in battle at least once (via using a Phoenix Pinion as an item), a **12.5% chance** activates each time the **entire party is wiped out** — Phoenix may appear automatically to revive all three characters (each restored to **12.5% of their max HP**) and deal fire damage to all enemies, preventing a Game Over. This 12.5% auto-rescue only activates after the first manual Phoenix summon; using up Phoenix Pinions without ever summoning in battle means the auto-trigger is never armed. The fire damage component is resisted/negated by fire-immune enemies, but the revival still occurs. **Do not equip Auto-Phoenix on a character used for Angelo Search overnight sessions** — Phoenix's automatic trigger can end the idle battle state unexpectedly. **Phoenix Pinion sources**: this Pandora left-door pickup; Shumi Village Phase 1 quest completion; Winhill Chicobo kick (second and third kicks). Also craftable via Siren's **Tool-RF**: **3× Mega-Phoenix → 1× Phoenix Pinion** — useful if excess Mega-Phoenixes have accumulated from shops or Seifer mugs.`,

    `Exit the Lunatic Pandora after collecting everything. The party then separates — some go to the Lunar Gate for the space mission while others remain on the ground.`,
  ],

  'd3-lunar-base': [
    `Aboard the **Lunar Base**, Squall and the chosen party member must find Rinoa and Ellone. Speak to Piet in the main hub, then find Rinoa in her containment room — take the green door, exit south, exit east, and proceed north twice to reach the Control Room.`,

    `In the **Control Room**, challenge **Piet** to a card game and win the **Alexander Card** — do not Card Mod it yet; it is needed for the Queen of Cards quest. **Important — Lunar Base uses all 7 card rules simultaneously** (as noted in the regional rules reference: Open, Same, Same Wall, Plus, Random, Sudden Death, and Elemental are all active). Before challenging Piet, soft-reset and re-enter the Control Room until undesirable rules — especially **Random** (randomizes which cards players must use) — are temporarily absent or reduced. Eliminating Random before the game makes winning the Alexander Card significantly easier. Exit south and go upstairs (hold down on the analog stick), then exit south to the Residential Zone.`,

    `Challenge **Ellone** to a card game and win the **Laguna Card** — it mods into **100× Hero** (grants invincibility for one battle per use). The Laguna Card can also be won from a CC Group member on Disc 4, so skip it here if time is short.`,

    `Speak to Ellone, then walk toward the medical room — events turn catastrophic. Squall ends up floating in space outside the base in a suit. Align Rinoa into the center of the screen while floating; hold Triangle for faster movement.`,

    `{{ENCOUNTERS:0}}`,

    `{{BOSS:Propagator}}`,

    `Strategy: Eight Propagators patrol the Ragnarok in four color-coded pairs. They must be defeated in matched pairs — defeating one of a pair, then immediately defeating its partner, permanently eliminates both. If a different-color Propagator is defeated between partners, the first one revives. The pairs are:\n- **Purple pair**: Hangar + Entrance\n- **Red pair**: Aisle (N from Hangar) + Aisle (with sealed door)\n- **Green pair**: Hangar with save point + Aisle with elevator to cockpit\n- **Yellow pair**: Air Room lower + Passenger Seat\n\nProper defeat order: clear Purple first (Hangar then Entrance), then Red, then Green, then Yellow. Use status effects freely — Propagators are highly vulnerable to Sleep, Blind, Death, Slow, and Stop. **Mug Wizard Stones** (50% chance) from each Propagator — this is the primary source. Drops are various elemental/status stones (Shell Stone, Death Stone, Flare Stone, Aura Stone, Protect Stone, Holy Stone, Meteor Stone, Ultima Stone depending on the slot). Once all eight are gone, take the elevator in the center up to the cockpit. **Propagator Card refine chain**: Propagator Card (win by using the Card command on a Propagator) → Card Mod → **1× G-Mega-Potion** per card — a convenient GF recovery item chain if Propagator Cards accumulate.`,

    `With all Propagators cleared, the party gains control of the **Ragnarok** — a futuristic airship with global travel capability. Scenes conclude the main Disc 3 mission, opening the Ragnarok free-exploration period. **Achievement: Ragnarok** — awarded upon securing control of the ship.`,
  ],

  'd3-ragnarok': [
    `With the **Ragnarok** as the party's new base, an extended optional period begins. The priority is rescuing Rinoa from the Sorceress Memorial in Esthar — fly there directly and proceed inside. The rescue is straightforward.`,

    `Head to **Edea's House** afterward and follow Angelo to the left for a promise scene that ties back to the game's opening. After the scenes, return to the world map.`,

    `Fly to **Esthar Airstation** and autopilot to Esthar City. In the Presidential Palace, head left until Laguna is found — the twist is revealed. Ask Laguna about everything, ending with the mission briefing. Afterward, challenge Laguna to a card game and win the **Squall Card** — Card Mod it into **3× Three Stars**. Each Three Stars teaches a GF the **Expend x3-1** ability: while under Triple status, each magic cast consumes only 1 unit instead of 3, effectively making stocked spells last three times as long. This is one of the most powerful endgame optimizations and the Squall Card is its primary source. Do not Card Mod the Squall Card into Three Stars until you have confirmed the CC Group on Disc 4 as a backup source. **Secondary use for surplus Three Stars**: Any Three Stars beyond the three needed for Expend×3-1 (one per character's GF) can be refined into **100× Triple each** via **Time Mag-RF** — the single highest-yield Triple source in the game per item. A single extra Three Stars grants 100 Triple, enough to max-stock one character.`,
    `{{CALLOUT:mechanics|Angelo Search setup for overnight farming}} Once Angelo Search is mastered (400 steps after reading Pet Pals Vol. 5), Angelo randomly retrieves items during any idle moment in battle. To create a stable idle state, find a **Turtapod** on the Esthar continent roads, eliminate any companion enemies, then cast **Confuse** on the Turtapod — a confused Turtapod curls into its shell and stops acting, creating a perpetual standby state. Angelo will then search at intervals for as long as the battle continues. Full drop table (288 draws per cycle): **Common** — Potion 16.7%, Mega-Phoenix 11.1%, Cottage 7.29%, Potion+/Hi-Potion+/X-Potion/Phoenix Down each 5.56%, G-Potion 4.86%, Tent/Cactus Thorn each 2.78%, G-Hi-Potion/G-Mega-Potion/G-Returner each 2.43%. **Uncommon (1.39% each)** — Protect Stone, Holy Stone, Jet Engine, Sleep Powder, Curse Spike, North Wind, Steel Orb, Dragon Fin, Occult Fan II, Combat King 004. **Rare (0.69% each)** — Elixir, Antidote, Hero-trial, Hero, Shell Stone, Energy Crystal, Gold Armor, Adamantine, Rune Armlet, Force Armlet, Circlet, Moon Curtain. **Very rare (0.35% each)** — Pet House, Aegis Amulet (2× → 1× Spd Up), Status Guard, Magic Scroll, GF Scroll, Draw Scroll, Healing Ring, Hungry Cookpot (→ Rosetta Stone via Shaman Stone). **Hungry Cookpot is exclusively obtainable via Angelo Search** — it has no other source in the game, so the only way to accumulate multiples is through this idle farming session. A specific 0.35% item averages roughly 48 hours of continuous searching at ~6 searches/hour. Do not have Gilgamesh obtained — he can randomly appear and end the battle. Do not have Angelo Recover or Angelo Reverse taught — they trigger automatically and can disrupt the session.`,

    `The following optional content is available before approaching the Lunatic Pandora for the final time. All of it should be completed now, as towns will be inaccessible on Disc 4.`,

    `{{ENCOUNTERS:0}}`,

    `{{CALLOUT:enemy|Jumbo Cactuar}} Cactuar Island, small desert island east of the Centra Kashkabald Desert. Find the island east of the Centra Kashkabald Desert and run until the encounter triggers.`,

    `{{BOSS:Jumbo Cactuar}}`,

    `Strategy: Junction **Water** to Elemental Attack for approximately ×3 damage. **Remove the Mug ability** before this fight — his drop (Gaea's Ring) is more valuable than the mug (Cactus Thorn). Apply Slow, then cast Meltdown for maximum damage. Assign one party member with the Revive command — after every 5th hit dealt to Jumbo Cactuar it counterattacks with **10,000 Needles** (exact 10,000 damage, no mitigation). The attacker drops to 0 HP; Revive immediately, then cast Aura again and continue. When the message "Jumbo Cactuar is hesitating" appears (≤5% HP), deal the finishing blow with a single multi-hit Limit Break — if it escapes at ≤2% HP, it recovers to full HP and must be refought. Reward: **GF Cactuar** — **Achievement: Cactuar** unlocks upon obtaining the GF. Cactuar ability order: **Eva-J** → **Luck-J** → **Initiative** → **Defend** → **Kamikaze** → **Eva+30%** → **Luck+50%**.`,

    `{{ENCOUNTERS:1}}`,

    `{{CALLOUT:enemy|Bahamut}} Deep Sea Research Center, lower-left corner of world map. Navigate to the flashing core — only move when the core is not shining, or a battle triggers. Approach the core from the south. Answer "It's not our will to fight" (event battle vs Ruby Dragon) → "Never" (event battle vs Ruby Dragon with back attack) → select the hidden third option: **(It's our nature…)**. Then fight Bahamut.`,

    `{{BOSS:Bahamut}}`,

    `Strategy: Blind Bahamut and Slow it immediately upon entering. Shell on all party members halves Mega Flare damage. Apply Meltdown and use Doomtrain (if available) for stacking status ailments, then finish with Aura + Limit Breaks. Draw **Flare**, **Curaga**, **Full-Life**, and **Dispel** from Bahamut. **Mug a Hyper Wrist** from Bahamut — it teaches any GF **Str+40%**. Reward: **GF Bahamut** — **Achievement: Bahamut** unlocks upon obtaining the GF. Bahamut Card (mods into **100× Megalixir**). Bahamut's priority abilities: **Mug** and **Auto-Protect**.`,

    `{{CALLOUT:enemy|Deep Sea Research Center fixed encounters}} Use 4 Steam Units at the first terminal, then 1 Steam Unit at each subsequent terminal (levels 2–5). With Zell in the party and 13 or fewer Steam Units remaining, he punches the door open for free. **Alternate Steam Room path**: At the first terminal, spending **4 extra units** (total 8 instead of 4) unlocks a side Steam Room path. This path restores **7 Steam Units** and yields encounters with **Oilboyle** and **Blue Dragon** enemies — both hold Fire Ammo (Oilboyle Card Mod → 30× Fire Ammo) and valuable drop items. If the steam budget allows, this alternate path is worth the extra cost for the unit return and enemy encounters. The fixed encounters yield Curse Spikes (Tri-Face), Dragon Fangs (Grendel), and rare crafting materials. **Do NOT defeat Ultima Weapon** — it would permanently eliminate these encounters and the GF Eden can be drawn from Tiamat in Ultimecia's Castle on Disc 4 instead. Fixed encounter floors: Tri-Face (1st screen), Grendel + Imp (2nd), Behemoth (3rd), Ruby Dragon (4th), 2× Iron Giant (5th). **Behemoth combat warnings**: once Behemoth's HP drops to 50%, it casts Mighty Guard on itself (and any allies present), applying Protect and Shell — Dispel it immediately or use Degenerator for an instant KO that bypasses this threshold entirely. Behemoth also counters any physical attack with **Meteor** (area non-elemental damage) — use magic attacks only to avoid triggering this counter. When Behemoth's HP is completely depleted it fires both Meteor (area) and Flare (single-target) as desperation attacks; Degenerator avoids all of these. **Ruby Dragon Breath prevention**: Ruby Dragon uses **Breath** (massive fire/wind damage) only when all three party members are conscious. If one character is KO'd intentionally before the Ruby Dragon acts, it will not use Breath that turn. For Meteor-farming sessions at the 4th floor, keep one character at low HP or strategically KO'd to prevent Breath from wiping the party.\n\n{{CALLOUT:drawing|DSRC draw points and hidden save point}} The **Alternate Steam Room path** (unlocked by spending 8 Steam Units at the first terminal instead of 4) contains an **Esuna draw point** — this is the only draw point in the facility outside the main path and is missed if the alternate path is not taken. On **Screen 3** (Behemoth floor), there is a **Triple draw point** — stock up before the Behemoth fight. On **Screen 5** (Iron Giant floor), a hidden **Ultima draw point** is present — use the Move-Find ability (learned by Siren) to locate it. Deeper in the facility, just before the Ultima Weapon chamber, there is a **hidden save point** that requires Move-Find to reveal — this is the last save opportunity before Ultima Weapon and is easy to miss without the ability active.`,

    `{{CALLOUT:sidequest|PuPu Sidequest}} 5 total encounters — 4 sightings + 1 battle. The UFO sightings bypass Enc-None — **you do not need to remove Enc-None** to trigger these events. Run around on foot at each of these four locations: (1) **Mandy Beach** (east coast near Timber — run along the beach), (2) **Kashkabald Desert** (east Centra — run in the desert area), (3) **Winhill Bluffs** (Galbadia continent, mountainous area north of Winhill), (4) **Trabia Heath Peninsula** (small isolated island east of the main Trabia continent — fly to it). After all four sightings, fly to the top of **Grandidi Forest** canyon (Esthar continent) and run around until the fifth encounter triggers — this is the actual UFO battle. Defeat the UFO to receive an **Aegis Amulet**. Then return to the **Balamb Garden crash site crater** on the world map (the crater left after Garden launched on Disc 2) with at least **5× Elixir** and the Item command active. Run around until PuPu appears; give it all 5 Elixirs to receive the **PuPu Card** — the only copy in the game. Never mod or lose this card. **Achievement: UFO** — awarded upon completing the PuPu quest by feeding it 5 Elixirs. **Alternate path**: Choosing to fight PuPu instead of feeding it yields an **Accelerator** item (teaches any GF Auto-Haste) and allows Devour for **Speed +1** — but permanently forfeits both the PuPu Card and the UFO achievement. Only take this path if Auto-Haste is critically needed and the card can be sacrificed.`,

    `{{CALLOUT:sidequest|Obel Lake Quest}} Three Stars + Luck-J Scroll. \n1. **Hum at Obel Lake** (near Timber, east side): talk to the lake until it reacts.\n2. **Find Mr. Monkey** (forest near Dollet, northeast of town): throw rocks at him **many many times** (the game literally says this — keep throwing until he speaks after each response; do not stop after just 2–3 throws). Then hum at Mr. Monkey to get the response "I'm the best." This signals the quest is advancing. Throw more rocks until he gives clues.\n3. **Collect four stone clues**: Mandy Beach (east coast near Timber, examine the beach); Balamb Beach (examine the shore west of Balamb); a cliff in a Galbadia canyon (defeat 2× Thrustaevis first); and the forest with Mr. Monkey. Each clue is one line of a combined message.\n4. **Read the combined message** (it says "Mordred Plains has treasure"). Travel to Mordred Plains (north of Esthar, accessible by Ragnarok). Follow the direction pointed by red rocks in the opposite direction until a red rock says "The treasure's not here" — examine that spot again to find **Three Stars** (teaches any GF the Expendx3-1 ability — reduces triple-cast magic cost to one spell per cast instead of three).\n5. **Eldbeak Peninsula** (narrow strip on the Trabia coast north of Trabia Garden): visit and hum here — the lake speaks again, giving the final clue.\n6. **Minde Isle** (small island southwest of Esthar, reached by Ragnarok): examine the ground toward the interior center of the island (not the edges) to find the **Luck-J Scroll**. Use it on a GF to grant Luck Junction.\n\nTotal rewards: **Three Stars** + **Luck-J Scroll**. Both are unique and cannot be obtained elsewhere. Use the Luck-J Scroll on Cerberus (which lacks Luck-J natively) for maximum flexibility. **Luck-J Scroll ↔ Luck Up bidirectional conversion**: a Luck-J Scroll can be converted into a **Luck Up** stat item via Forbid Med-RF (Doomtrain ability), and a Luck Up converts back into a Luck-J Scroll via GFAbl Med-RF (Eden ability) — both conversions are exactly **1:1**, so these two items are fully interchangeable once both refinement commands are available.

{{CALLOUT:missable|Missable — Obel Lake Quest}} This quest cannot be completed on Disc 4 — the shadow at Obel Lake stops responding after Time Compression begins. Complete all steps including the Mordred Plains treasure and Minde Isle finale before entering Ultimecia's Castle. **Achievement: Obel Lake Secret** — awarded upon collecting the Luck-J Scroll at Minde Isle.`,

    `{{CALLOUT:enemy|Fixed Elnoyle encounter}} Esthar, near Presidential Palace. An Elnoyle spawns at a specific screen intersection. Defeat it, exit the screen, re-enter to respawn. Junction **100× Death** to ST-Atk for efficient farming. Drop: Energy Crystal. Energy Crystals refine into Ultima magic or Pulse Ammo (for weapons). This encounter is **not available on Disc 4** — farm a sufficient stock now.`,

    `{{CALLOUT:card|Crash Site backup}} southeast tip of Esthar Continent. If the **Alexander Card** was not won from Piet on the Lunar Base, it can still be obtained by visiting Piet here — he moved to the escape pod crash site after the Lunar Base event. The location is invisible on the world map; walk around the rocky southeast coastal area until it appears. Challenging Piet at the Crash Site is the last opportunity to get the Alexander Card before Disc 4. On Disc 4, the Queen of Cards takes Piet's place at the same location. **Critical warning**: on Disc 4 at the crash site, the Queen presents each rare card **only once** — if you lose the card game while she plays a specific rare card, that card is gone permanently. Do not lose; save beforehand and soft-reset if needed.`,

    `{{CALLOUT:sidequest|Shumi Village Disc 3 follow-up}} if the stone quest was completed on Disc 2. Return to Shumi Village and visit the **Artisan's Workshop** to trigger a follow-up scene that completes the statue quest. This activates a **Full-Life draw point** at Fisherman's Horizon (at the spot where the Master Fisherman used to sit on the lower catwalk exterior) — one of the few refillable Full-Life draw points in the game. If the stone quest itself was not yet completed, this is also your last practical opportunity to do it: collect all six stones (see Disc 2 open-world section for exact locations) and turn them in. Completing the stone quest also grants +50 SeeD experience. The Ultima draw point in Shumi Village (refillable, 5,000 Gil per draw) can be used here as well. (If the Shumi Village Timber Maniacs magazine was read before the Trabia Canyon dream sequence, Ward will have been absent from that dream — that window is now past, so there is no further concern here.)`,

    `**Position the Queen of Cards in the Lunar region before Disc 4** to maximize common card farming efficiency on the Ragnarok. The Ragnarok sits in the Lunar region, so whoever the CC Group King challenges you with will use the trade rule active in that region. The goal is to have **All** as the Lunar region's active trade rule — All means the winner takes all five of the opponent's played cards per game, making it the fastest possible route to accumulating 100 copies of each common card. Route: move the Queen progressively from her current location toward **Lunar Gate** via Galbadia → FH → Esthar → Lunar Gate (she has a 50% chance of moving from Esthar to Lunar Gate each time you challenge and lose to her). Once she is in the Lunar region, keep challenging her until she uses **All** as the trade rule for that game. When she does, stop playing — do not challenge her again, as additional games can change the active rule. Afterward, the CC Group King on Disc 4 Ragnarok will use All, yielding 5 cards per win instead of just 1–2.`,

    `{{CALLOUT:card|Queen of Cards quest completion}} if Alexander and Chicobo cards have been lost to her as required. After losing the Alexander Card to the Queen, her artist father creates the **Doomtrain Card**, which then appears in the Timber Pub owner's card deck — he will NOT have it until Alexander is given to the Queen first. Win the Doomtrain Card from the Timber Pub owner (**rarity warning**: the Timber Pub owner tends not to present the Doomtrain Card every game — he uses it infrequently, so plan for multiple attempts; save beforehand and be patient), then lose it to the Queen to trigger the final **Phoenix Card** creation. The Phoenix Card is held by the **Presidential Aide** in blue at Esthar's Presidential Palace — only available after Doomtrain is given to the Queen. The Queen's son in Dollet holds all cards lost to her for recovery. **Irvine Card note**: The Irvine Card is held by Flo at FH Mayor's house — she only plays it after the Sacred Card has been lost to the Queen. Visit her after Sacred is given to trigger the Irvine Card appearing in her deck.`,

    `{{ENCOUNTERS:2}}`,

    `{{CALLOUT:drawing|Island Closest to Hell}} westernmost island. All enemies here are fixed Level 100 — great for farming with Bonus abilities. Invisible draw points contain Ultima, Triple, Meteor, Full-Life, and Flare — equip Enc-None and stock them all. This island has **31 draw points** — the highest concentration anywhere in the game, making it the most efficient location to grind the **Magic Miner** Steam achievement (draw from 100 draw points total).`,

    `{{ENCOUNTERS:3}}`,

    `{{CALLOUT:drawing|Island Closest to Heaven}} northeastern island. Also fixed Level 100. Invisible draw points here contain Ultima, Triple, Meteor, Full-Life, and Flare — equip Enc-None and stock them before leveling sessions.`,

    `{{CALLOUT:mechanics|Gil farming loop for stat-maxing}} requires Tonberry Haggle + Sell-High + Familiar + Call Shop, and at least one physical visit to Esthar Shop!!! to register it. Place **Tent**, **Cottage**, and **Mega-Potion** in the first three inventory slots (or blank slots if any are missing). Open Call Shop → Esthar Shop!!!, sell all Mega-Potions, then buy 100× Tent and 100× Cottage. Open Recov Med-RF (Carbuncle): refine all Tents and Cottages into Mega-Potions (100× Tent → 25× Mega-Potion; 100× Cottage → 50× Mega-Potion). **Note**: Cottage has a second refine output — via Recov Med-RF each Cottage also refines into **1× Curaga** (for Spr-J stacking) rather than 2 Mega-Potions; this trade-off sacrifices Gil farming efficiency but provides one of the easiest Curaga sources. Return to Call Shop and repeat. With Haggle and Sell-High active and items in the first three inventory slots, each full 100-Tent + 100-Cottage cycle takes roughly 30 seconds and yields approximately **352,500 Gil net profit**. Run this until the Gil cap is reached. This loop is the intended funding method for the large purchases required to max HP (1.5 mil Gil for Giant's Rings), Magic (Hypno Crowns), and Spirit (Force Armlets). **Esthar Shop!!! registration note**: This shop ("Johnny's Shop" in the Esthar mall) is usually closed — keep entering until it lets you in at least once, after which Call Shop can reach it at any time.`,
    `{{CALLOUT:mechanics|Move-HP Up ability}} 200 AP. While walking on the world map, the junctioned character passively recovers HP at a rate of approximately 10–15 HP per second. This is a minor convenience in normal play but is particularly useful when deliberately exploring the world map without access to Tents or Cottages. It does not work during random encounters, inside buildings, or on the Ragnarok deck.`,

    `{{CALLOUT:mechanics|Stat-maxing reference}} for endgame preparation — fastest methods per stat at Lv 100. - **HP**: Buy 100× Giant's Ring (1.5 mil Gil) → refine to Gaea's Ring → refine to HP Up (fastest). Alternatively, Card Mod Ward Card → 3× Gaea's Ring → HP Up. Or Devour Lv45+ Ruby Dragon. **Achievement: Maximum HP** — awarded upon any character reaching 9,999 max HP. Stack HP+80% (Brothers or Diablos), HP+40%, and HP+20% GF abilities together with HP-J spells (Ultima or Full-Life) and HP Bonus level-up gains — any combination that pushes a single character to 9,999 will trigger it.
- **Strength**: Card Mod Eden Card → 3× Monk's Code → 3× Str Up (fastest). The Eden Card can be won back from the **CC Diamond girl (left) on the Ragnarok** after modding — repeat the cycle for unlimited Monk's Code/Str Up. Or Devour Lv30+ T-Rexaur.
- **Vitality**: Card Mod Minotaur Card → 10× Adamantine → 2× Vit Up (fastest). The Minotaur Card can also be won back from the **CC Diamond girl (left) on the Ragnarok** after Card Modding — repeat the cycle for unlimited Adamantine and Vit Up without needing multiple cards. Alternative: Card Mod Gilgamesh Card → 10× Holy War → 2× Knight's Code → 2× Vit Up (viable if the Gilgamesh Card is available; note the standard guide recommends keeping Odin over Gilgamesh). Or Devour Lv30+ Adamantoise.
- **Magic**: Buy 100× Hypno Crown → refine to Royal Crown → Mag Up (fastest). Or Devour Lv40+ Behemoth. Or Card Mod Edea Card × 10.
- **Spirit**: Buy 100× Force Armlet → refine to Magic Armlet → Spr Up (fastest). Or Devour Lv30+ Malboro.
- **Speed**: Card Mod Irvine Card → 3× Rocket Engine each; accumulate 5× Rocket Engine → Forbid Med-RF → 1× Spd Up (fastest). The Irvine Card can be won back from the **CC Diamond girl (left) on the Ragnarok** after each mod — repeat for unlimited Rocket Engines/Spd Up. Or collect 100× Cactus Thorn → refine to Hundred Needles → Spd Up. Or Angelo Search for Aegis Amulets (2 per Spd Up). **ATB fill reference** (time to fill one ATB gauge, no Haste): Spd 20 ≈ 4.0s · Spd 40 ≈ 2.9s · Spd 60 ≈ 2.2s · Spd 80 ≈ 1.8s · Spd 100 ≈ 1.6s. Haste roughly halves these values. Junction Stop to Spd-J for the highest Spd bonus before Haste availability.
- **Luck**: Collect 100× Curse Spike (mug Tri-Faces at Deep Sea Research Center fixed encounters) → refine to 1× Dark Matter via Siren Tool-RF (Siren must be Lv100) → convert to 1× Luck-J Scroll via Eden's **GFAbl Med-RF** (1 Dark Matter → 1 Luck-J Scroll; this is the standard route — GFAbl Med-RF is Eden's refinement ability specifically for crafting GF junction ability scrolls) → Luck Up. The Deep Sea Research Center fixed encounters are the only reliable Tri-Face farm and are permanently lost if Ultima Weapon is defeated — **do not kill Ultima Weapon**. **Luck crit formula**: Critical Hit Rate % = (Luck + 1) ÷ 256 × 100. At Luck 100: ~39.5% crit rate; at Luck 255: ~99.6% (near-guaranteed). Luck also affects Mug success rate and Rare Item Slot A/B/C chances.
- **Stat bonus ability stacking**: HP+20%, HP+40%, and HP+80% equipped simultaneously provide **+140% total** — all tiers compound additively, not just the highest tier. The same applies to Str, Vit, Mag, Spr, and Spd bonus tiers. Always equip all available tiers rather than just the highest. Running four bonus abilities simultaneously requires **Ability x4** (from a Rosetta Stone) — without it only three character abilities can be active at once. Getting Rosetta Stone early and leveling with all four Bonus abilities (HP Bonus + Str Bonus + Mag Bonus + Spr Bonus, or another preferred set) is the most impactful early-game long-term optimization. **HP Bonus vs other Bonus abilities**: the **HP Bonus** GF ability grants **+30 max HP per level gained** (not +1 like the other five Bonus abilities). All characters start near level 10, so up to ~90 levels of Bonus are available — yielding up to +2,700 HP, +90 Str, +90 Vit, +90 Mag, or +90 Spr from leveling alone depending on which four are selected. Since HP also has the % multiplier from HP+80%, HP Bonus stacks especially efficiently with those abilities. The three methods for raising base stats permanently are: (1) Bonus abilities at level-up (easiest and most efficient over a full playthrough, but limited by levels available); (2) refining and using stat-up items (the only way to raise Speed and Luck beyond junction values); (3) Devour command (generally slow unless fixed encounters are available). Combining all three yields the highest possible stats.
- **Expend x3-1 ability**: Taught by **Three Stars** (Card Mod Squall Card → 3× Three Stars; also an Omega Weapon drop). While a character is under Triple, each magic cast consumes only 1 unit from stock instead of 3 — effectively tripling magic endurance in any Triple-active fight. This is one of the most powerful endgame optimizations and is completely absent from the game without this ability.
- **Eva% note**: Eva% is Speed-dependent, not purely from the Eva-J junction. Speed provides a base Eva% (e.g., Speed 100 ≈ 9–10% base), and Eva-J adds to this formula — the junction value does not simply replace the base. The **maximum achievable Eva% is 48%**, requiring both 255 Speed *and* 100× Ultima junctioned to Eva-J simultaneously. Neither alone reaches the cap. Haste (50), Triple (40), and Tornado (32) are the best Eva-J spells for most builds.`,

    `{{CALLOUT:refinement|Permanent stat-up refinement chains}} per stat, all require the GF abilities listed above. - **HP Up**: Buy 100× Giant's Ring from Esthar Pet Shop → GF Abl Med-RF (Eden) → 10× Gaea's Ring → Forbid Med-RF (Doomtrain) → 10× HP Up. Costs roughly 1.5 million Gil for a full 100× run; use the Tent/Cottage/Mega-Potion loop first.
- **Str Up**: Card Mod the Eden Card → 3× Monk's Code → Forbid Med-RF → 3× Str Up. Win the Eden Card back from CC Left Diamond girl on Ragnarok; repeat each cycle for more Str Up.
- **Vit Up**: Card Mod the Minotaur Card → 10× Adamantine → Forbid Med-RF → 2× Vit Up. Win the Minotaur Card back from CC Left Diamond girl and repeat.
- **Mag Up**: Buy 100× Hypno Crown from Esthar Pet Shop → GF Abl Med-RF → 10× Royal Crown → Forbid Med-RF → Mag Up.
- **Spr Up**: Buy 100× Force Armlet from Esthar Pet Shop → GF Abl Med-RF → 10× Magic Armlet → Forbid Med-RF → Spr Up.
- **Spd Up**: Card Mod the Irvine Card → 3× Rocket Engine → Forbid Med-RF (5× Rocket Engine per 1× Spd Up). Win the Irvine Card back from CC Left Diamond girl after each mod; 5 Irvine Cards total = 3× Spd Up. This is the only practical source of Spd Up beyond Devour.
- **Luck Up**: In the Deep Sea Research Center (Ultima Weapon must remain alive), encounter a fixed Tri-Face and Mug it for 6–8× Curse Spike per attempt. Accumulate 100× Curse Spike → Tool-RF (Siren must be Lv 100) → 1× Dark Matter → GF Abl Med-RF → 1× Luck-J Scroll → Forbid Med-RF → 1× Luck Up. Each Luck Up requires 100× Curse Spike, making this extremely time-intensive; most players skip Luck maxing.`,
  ],

  'd3-back-on-earth': [
    `With all major optional content completed, a short window remains before committing to the Lunatic Pandora assault. The most important stop is **Tear's Point** on the Galbadia coast — the site of the Lunar Cry — where the Solomon's Ring can be collected before it is no longer accessible.`,

    `{{ENCOUNTERS:0}}`,

    `{{CALLOUT:sidequest|Solomon's Ring}} Tear's Point, Galbadia continent. Fly to the flat, barren coastal terrain on the southeastern Galbadia landmass, roughly east of the Deling City region. The Solomon's Ring is lying on the ground at this location. To use it and acquire the **Doomtrain GF**, collect **6× Steel Pipe** (dropped by Wendigo near Timber; mugged from Mobile Type 8 during the Lunatic Pandora assault), **6× Malboro Tentacle** (dropped by or mugged from Malboro), and **6× Remedy+** (available in various shops with Familiar, or mugged from Tri-Face). Once all three sets of six are in inventory, use Solomon's Ring from the Items menu.`,

    `When preparations are finalized, fly the Ragnarok directly into the **Lunatic Pandora**, which is now at its final position above Tear's Point. Entering the LP begins the final sequence of Disc 3 and eventually triggers the disc transition — after which towns are permanently inaccessible and the world enters Time Compression.`,
  ],
  'd3-the-final-mission': [
    `The **Lunatic Pandora** has reached its final position over Tear's Point. Fly the Ragnarok directly into it to begin the final assault. After the scene, go down the elevator and take the right door.`,

    `{{ENCOUNTERS:0}}`,

    `Raijin and Fujin make their final stand.`,

    `**Boss: Raijin** (Lv 1-43) — HP: 5,400-22,200 | AP: 12
- Draw: Lv 1-19: Thunder, Protect, Shell | Lv 20-29: Thunder, Thundara, Protect, Shell | Lv 30+: Thundara, Thundaga, Protect, Shell
- Weakness: Poison ×1.5`,

    `**Boss: Fujin** (Lv 1-43) — HP: 5,300-17,900 | AP: 8
- Draw: Lv 1-19: Aero, Cure, Life | Lv 20-29: Aero, Cura, Life | Lv 30+: Aero, Curaga, Full-life, Tornado
- Weakness: Poison ×1.5`,

    `Strategy: Fujin's arsenal has expanded significantly — Pain (Darkness+Silence+Poison), Confuse, Slow, Regen, Haste, Metsu (AoE critical physical), and Meteor (used once, triggered by dialogue). Raijin can cast Aura on himself, doubling his Strength for Raijin Special. Both are highly vulnerable to **Sleep** — use this liberally. Apply Meltdown on both when Limit Break is available. Assign one member as a dedicated healer; if Fujin uses Sai (reduces HP to 1), that healer must respond immediately. Pain on St.Def-J blocks Fujin's most dangerous status combo. **Do not Mug Raijin** — his drop is 3–6× Str Up, which is more valuable than the Power Wrist mug. Mug Fujin for **2× Megalixir** (she drops only 1× Megalixir without Mug). Cast Reflect on Raijin before he casts Aura to redirect his Raijin Special away from the party. Raijin draws Thunder/Protect/Shell; Fujin draws Aero/Curaga/Full-life (at Lv30+)/Tornado.`,

    `After the fight, Biggs and Wedge appear — they have had enough. Go into the left tube.`,

    `**All enemies inside the Lunatic Pandora are Level 1** during this assault. Use Tonberry's LV Up if level-scaled draws are needed.`,

    `Take the main elevator (Elevator 2) down, then go north and north to the intersection. Save your game, then proceed north for the next boss.`,

    `**Boss: Mobile Type 8** (Lv 1-41) — HP: 30,300-42,300 | AP: 40
- Draw: Lv 1-19: Fire, Blizzard, Thunder, Flare | Lv 20-29: Fira, Blizzara, Thundara, Flare | Lv 30+: Firaga, Blizzaga, Thundaga, Flare
- Weakness: Thunder ×2`,

    `Strategy: Mobile Type 8 has two forms. **Form 1** (shoulders attached): attacking the torso triggers **Twin Homing Laser** as a counter — attack the probe shoulders instead. **Mug the shoulders for Vit Up and Str Up** (1/8 chance per Mug — keep trying). Form 2 triggers when the shoulders detach: the first attack is always **Corona** (reduces all party HP to exactly 1). Heal everyone immediately, because the very next attack is **Megido Flame** (fixed 2,000 damage ignoring Spirit to all three party members). After healing from Corona, use Limit Breaks freely — Gravija in form 2 only deals 75% of current HP. Draw **Fire/Blizzard/Thunder/Flare** (scaling with level) from Mobile Type 8. After Mugging the shoulders, finish with Aura + Limit Breaks.`,

    `This is the **last point** to decide between Odin and Gilgamesh: to get Gilgamesh, Odin must be in the party now (Gilgamesh replaces Odin after a memorable battle). To keep Odin, do not have him equipped. Gilgamesh interferes with Angelo Search overnight sessions.`,

    `After the fight, it's time to swap discs. When back in control, give the junction exchange from Rinoa (if she was in the party) to the 3rd party member, then head right and climb the ladder. Progress through the halls to reach the disc transition.`,

    `**Boss: Seifer** (Lv 1-45) — HP: 3,700-34,500 | AP: 40
- Draw: Lv 1-19: Fire, Thunder, Blizzard | Lv 20-29: Fira, Thundara, Blizzara | Lv 30+: Firaga, Thundaga, Blizzaga, Aura
- Weakness: Poison ×1.5`,

    `Strategy (4th encounter): **CRITICAL DRAW OPPORTUNITY** — Seifer at Lv30+ draws **Aura**, and this is the **only enemy in the entire game** from whom Aura can be drawn. Stock 100× Aura for each party member before finishing the fight. If Odin is equipped, Gilgamesh will appear mid-fight and end it before you can draw — so either skip Odin or draw Aura quickly at the start. Seifer also draws Fire/Thunder/Blizzard (-ga at Lv30+). His attacks include Firaga, Flare, and Bloodfest (AoE physical, used more frequently at low HP) — Fire class magic on El.Def-J handles Firaga. He mugs/drops **Hero or Holy War** at **any level (Lv1+)** — the full mug and drop table is Hero/Hero/Holy War/Holy War across all level ranges, so there is no need to level-manage for this reward. **Poison deals ×1.5 damage** to this Seifer — Bio or Poison-element junctions on El.Atk-J are effective if available. If Odin is present, Gilgamesh will appear mid-fight and end the encounter with a spectacular cutscene — from then on, Gilgamesh replaces Odin and can use Zantetsuken, Masamune, Excalibur, or Excalipoor during any battle.`,

    `Before Adel, re-check junctions: a solid Spirit junction (for Ultima), Auto-Shell if available, and Regen ready to cast on Rinoa. Junction Earth and Wind to Elemental Defense if possible.`,

    `**Boss: Adel** (Lv 1-46) — HP: 6,000 - 51,000 | AP: 0
- Draw: Lv 1-19: Fire, Thunder, Blizzard | Lv 20-29: Fira, Thundara, Blizzara | Lv 30+: Firaga, Thundaga, Blizzaga
- Weakness: Wind ×1.5`,

    `Strategy: Rinoa is junctioned onto Adel and her HP drains continuously — if Rinoa reaches 0 HP, it's Game Over. **Cast Shell on the whole party first** (Auto-Shell is even better — use Moon Curtain on a GF beforehand). Draw Regen from Rinoa and cast it back on her immediately; every time Adel drains Rinoa, Regen kicks in. Also cast Shell on Rinoa to halve Adel's drain damage. Every time Adel successfully drains Rinoa, Adel uses one attack: **Meteor** is always first; then Quake (Quake on El.Def-J nullifies it), Flare (Shell + Reflect caution — do not Reflect or Flare may bounce to Rinoa), Energy Bomber (physical, crit), and eventually Ultima (after a "Magical powers are concentrated on Adel!" warning). Cast Meltdown on Adel. **Mug Rinoa for 8× Megalixir**; **Mug Adel for Samantha Soul** (all levels — refines into Auto-Triple for a GF). **Do not use Squall's Fated Circle or Blasting Zone** — they are AoE and will hit Rinoa. Use Irvine's Armor Shot or Zell's Punch Rush/Booya only. Wind is Adel's weakness (×1.5). **Holy is absorbed by Adel** (×−1 multiplier — Holy magic heals her rather than dealing damage), so never junction Holy to El.Att-J for this fight.`,

    `After Adel falls, Rinoa is freed. Walk into the **save point** and save — then attempt to leave the chamber. A series of Sorceresses will engage the party in the hallway. The first several are straightforward, but the **final Sorceress** has up to roughly 32,500 HP and begins counting down toward Ultima. Apply Meltdown and finish her quickly with Aura and Limit Breaks before the Ultima countdown completes. After all Sorceresses are defeated, Time Compression begins.`,
  ],
  'd4-the-awakening': [
    `Time Compression has begun. The party finds itself in a surreal, timeless void. Edea's House on the Centra coast serves as the first landmark and save point — the Ragnarok must be located before entering Ultimecia's Castle.`,

    `{{CALLOUT:point|Navigating to the Ragnarok}} From Edea's House, head right along the cliff to reach the world map portal chain. Three portals are immediately visible; a fourth is activated by exploration:
- **N-most left portal**: Grandidi Forest (Esthar continent)
- **Middle left portal**: Centra continent (Serengetti Plains area)
- **S-most left portal**: Galbadia continent (Wilburn Hill area)
Take the **middle portal** to the Centra continent. Locate the nearby Chocobo Forest and get a Chocobo, then ride east past Centra Ruins, cross the shallow water, and continue east into the Kashkabald Desert region to find the **Ragnarok** grounded on the eastern coast.`,

    `Just northwest of the Ragnarok's landing position is a **fourth portal** — activating it creates a direct shortcut from the Edea's House chain to the Kashkabald Desert. Use this shortcut on subsequent trips to reach the Ragnarok or Ultimecia's Castle quickly.`,

    `Once aboard the Ragnarok, all available **CC Group** members can be challenged for rare card recovery. The **Left Diamond girl** holds any rare card previously sent away via the Queen of Cards quest (following the Shumi Village chain). Note: The PuPu Card is not played by any CC member. **Queen of Cards on Disc 4**: She is at the **Crash Site** (rubble southeast of Esthar) — accessible from the Ultimecia's Castle region. On Disc 4 she holds the Kiros, Irvine, Chubby Chocobo, Doomtrain, and Phoenix Cards; any not won from their original holders can be won here directly. **Accessible locations on Disc 4**: Ultimecia's Castle (four portals), Ragnarok, Deep Sea Research Center, Tomb of the Unknown King, Centra Ruins, Crash Site, all Chocobo Forests, Fire Cavern, Trabia Canyon, Tear's Point.`,

    `{{CALLOUT:warning|Steam achievement warning}} The keyboard boosters (F1/F2/F3) do NOT disable achievements. However, activating the **in-game Cheats option** (found in the Config/Game menu) permanently disables achievement tracking for the entire save file. Do not enable the in-game Cheats mode if you are pursuing Steam achievements.`,

    `Before entering the castle, confirm all six party members have their best possible junctions. The castle seals most abilities on entry — each of the eight sealed abilities is restored by defeating one of the nine guardian bosses inside.`,

    `The following abilities are **sealed** inside the castle: **Item**, **Magic**, **GF**, **Draw**, **Command Ability**, **Limit Break**, **Resurrection**, and **Save**. Recommended unlock order (aligned with the castle routing below):
1. **Draw** — first priority: allows drawing GFs from remaining castle bosses and accessing the Eden draw from Tiamat
2. **Magic** — enables Protect, Meltdown, and status spells immediately
3. **GF** — restore GF access before the mid-castle bosses (Red Giant, Krysta, Gargantua)
4. **Limit Break** — the primary damage tool; Renzokuken remains the fastest kill
5. **Item** — restore Megalixir and Phoenix Down access
6. **Command Ability** — restores Mug and Defend
7. **Resurrection** — emergency recovery for any KO'd members
8. **Save** — unlock last (the final in-castle save point is near the end anyway)`,

    `{{CALLOUT:hint|Eden shortcut}} If Draw has been unlocked and Eden was not obtained from Ultima Weapon, the fastest route to Tiamat (who holds Eden) is to go directly from the Draw Guardian room to the Art Gallery, then the Clock Tower — skipping the other guardian puzzles entirely. The only requirement is that Draw is restored. This avoids spending time on the other six guardians before securing Eden.`,
  ],
  'd4-commencement-room': [
    `From the portal area near Edea's House, recover the **Ragnarok** via the middle portal and Chocobo. Once the Ragnarok is obtained, the fourth portal northwest of the ship's landing zone leads directly to the Kashkabald Desert area, and from there a portal just north opens into **Ultimecia's Castle**.`,

    `Green circles inside the castle allow switching between two teams of three at any time. Head to the castle entrance and **save the game outside** — this is the last external save point before the final dungeon.`,

    `Divide the six party members into **two teams of three**. The primary team handles all main boss fights; the secondary team navigates environmental puzzles and unlocks abilities. Both teams must be fully junctioned for their respective challenges.`,

    `{{CALLOUT:hint|Recommended primary team}} **Squall** (mandatory anchor — highest sustained physical damage via Renzokuken/Lion Heart; R1 timing bonus makes him consistent at all HP levels), **Zell** (highest potential damage output from Duel input combos; Burning Rave into Follow-Slap chains can exceed Lion Heart under optimal conditions; at CL4 with practice, Zell is the fastest kill tool in the game), and **Rinoa** (Wishing Star delivers 8 physical hits to all enemies — excellent for multi-enemy stages; Invincible Moon grants full party immunity at CL3, a safety net for Ultimecia's hardest forms; Angel Wing + Meteor is a reliable alternative when Invincible Moon is not needed). **Quistis** is the strongest alternative to Rinoa: Degenerator instantly kills most non-boss enemies and bypasses status immunity, while Mighty Guard (from Adamantoise Disc 3 mug or Bite Bug at CL3) grants Protect + Shell + Regen to the full party. **Irvine** works well as a physical attacker if supplied with ample Demolition or AP Ammo (the highest-damage shot types). **Selphie** is high-variance — The End can instantly kill any non-immune boss, but Slots is unpredictable; she is better in the secondary team unless relying on luck-based cheese.`,

    `{{CALLOUT:warning|Quistis Restriction}} The CC Group King is in the Air Room aboard the Ragnarok — he only initiates a game if **Quistis is in the active party**. Switch her in specifically to challenge him.`,

    `Joker of the CC Group is aboard the Ragnarok in the elevator room — he offers a general shop and junk shop regardless of whether the CC quest was completed.`,

    `{{CALLOUT:card|CC Group — Disc 4 per-member locations and card levels}} all aboard the Ragnarok. Jack (Storage Room, plays levels 3/4/6); Joker (Elevator Room, levels 1/2/3/6/7 + shop); Club (Upper Aisle, levels 3/5/6); Diamond (Hangar, levels 3/4/5/7); Spade (Lower Aisle, levels 1/2/3/6/7); Heart (Entrance, levels 3/5/6/7); King (Air Room — **Quistis must be in the active party** to initiate the game, plays all levels). **Left Diamond special rule**: Left Diamond ignores the shuffle mechanic entirely and always plays the first Rare Card missing from your collection — even cards that were never available from their original holders. She is the most reliable catch-up mechanism for any missed rare cards. The other CC members (Jack, Joker, Club, Right Diamond, Spade, Heart, King) have two restrictions not shared by Left Diamond: (1) they require a "shuffle" before a rare card can appear in their deck — if a rare card doesn't show up, play again after some battles have reset their deck; (2) they cannot play six specific rare cards under any circumstances: **Rinoa, Kiros, Irvine, Chubby Chocobo, Doomtrain, and Phoenix** — these can only be obtained from the Queen of Cards or Left Diamond.`,

    `{{CALLOUT:warning|Before entering the castle}} re-examine all 6 party members' junctions — every junction is applied to the character, not the GF, so switching party members requires full re-junction. The party that enters the castle is locked; characters left on Ragnarok can be swapped via green circles inside. Ensure both teams have healing sources and magic stocked.`,
  ],
  'd4-ultimecia-castle': [
    `Inside **Ultimecia's Castle**, eight sealed abilities must be recovered by defeating the castle's nine guardian bosses. Green circles allow party switching at any time. Head up the main stairs to begin.`,

    `{{ENCOUNTERS:0}}`,

    `{{CALLOUT:enemy|First guardian — Sphinxaur/Sphinxara}} Main Hall, top of stairs. `,

    `**Boss: Sphinxaur** (Lv 1-50) — HP: 10,000 | AP: 0
- Draw: Lv 1-19: Fire, Thunder, Blizzard, Cure | Lv 20-29: Fira, Thundara, Blizzara, Cura | Lv 30+: Firaga, Thundaga, Blizzaga, Curaga
- Weakness: Holy ×2`,

    `**Boss: Sphinxara** (Lv 1-50) — HP: 10,000 | AP: 30
- Draw: Lv 1-19: Fire, Thunder, Blizzard, Cure | Lv 20-29: Fira, Thundara, Blizzara, Cura | Lv 30+: Firaga, Thundaga, Blizzaga, Curaga
- Weakness: Holy ×2`,

    `Strategy: With most abilities sealed, attack directly. **Mug Elixir** from Sphinxaur. Sphinxara uses Doom (countdown kill), Slow, Sleep, Zombie, and summons Jelleye → Forbidden → Tri-Face in sequence. If everyone is under Zombie status, Sphinxara only uses Doom (which misses against Zombie targets). When Doom is on a character, Sphinxara may cast Zombie on that character — this removes the Doom countdown. Finish quickly with physical attacks. Holy junctioned to Elemental Attack deals double damage (Sphinxaur/Sphinxara have Holy ×2 weakness). After this fight, **unlock Draw** — this is the priority since it allows drawing Eden from Tiamat and recovering any missed GFs. Eden, Pandemona, Leviathan, Alexander (+ Doomtrain), Siren, Cerberus, and Carbuncle can all be drawn from castle bosses — these are the last opportunities. **Sphinxara Card refine chain**: Sphinxara Card (win by Card commanding Sphinxara) → Card Mod → **1× G-Mega-Potion** per card.`,

    `Proceed through the door behind Sphinxaur. The chandelier drops — inspect the floor hatch and descend. Junction **Thundaga to Elem-Def-J** for all three party members before going down.`,

    `**Boss: Tri-Point** (Lv 1-51) — HP: 2,400-22,400 | AP: 30
- Draw: Haste, Tornado, Blind, Siren
- Weakness: Fire ×4, Ice ×4`,

    `Strategy: Tri-Point counterattacks with **Mega Spark** (ignores Spr) whenever it is hit with the wrong element. With Thunder class magic on El.Def-J, Mega Spark heals the party. Tri-Point alternates between Fire and Ice weaknesses — attacking with the current weakness does NOT trigger a counter, and shifts the weakness to the other element. Exploit this: alternate members with Fire and Ice on El.Att-J. When Tri-Point uses **Scan** on a party member, immediately cast **Protect** on that character — the next attack is Onrush, which ignores Vit and will KO. Draw **Siren** here if it was missed. Tri-Point drops **Rocket Engine** — these refine into Spd Up (Forbid Med-RF) and eventually Spd-J Scrolls via GFAbl Med-RF. **Unlock Magic** after this fight.`,

    `{{CALLOUT:refinement|Tri-Point Card refine chain}} The Tri-Point Card (Lv 7 boss card, won from card players or the CC Group) mods into **40× Jet Engine** via Card Mod (requires 40 cards per batch — the most costly ratio in the game, but Jet Engines are unique). Each **Jet Engine** teaches a GF **Spd+40%** when used directly (via GFAbl Med-RF) — this is one of only two ways to grant Spd+40% to a GF, alongside the Irvine Card chain. Alternatively, Jet Engines refine via **Forbid Med-RF** (Doomtrain, Lv 100 required) into **Spd Up** stat items, the rarest method for permanently increasing base Speed. Since Jet Engines appear on the Angelo Search uncommon table (~1.39%), patient farming is a viable alternative to card modding. The Tri-Point Card itself is a strong Lv 7 playing card (8/8/5/2 + Thunder element) useful in high-rule regions.`,

    `**Unlock Draw** (if not already done) or **Magic** (if still sealed). Return to the main hall, go left down the hallway, then right to enter the Art Gallery. Examine all paintings. The clock reads VIII, VI, and IIII — find those numerals in the paintings and enter **VIVIDARIUM** · **INTERVIGILIUM** · **VIATOR** into the large left painting. Trauma appears from behind.`,

    `**Boss: Trauma** (Lv 1-56) — HP: 5,555-34,114 | AP: 30
- Draw: Meltdown, Leviathan
- Weakness: Wind ×2`,

    `**Boss: Droma** (Lv 1-56) — HP: 1,010 - 3,128 | AP: 0
- Draw: Esuna, Dispel
- Mug: Meteor Stone`,

    `Strategy: Open with **Meltdown** on Trauma — draw it directly from Trauma for a free cast. Trauma creates two Dromas at the start. Keep the Dromas alive — if both Dromas are killed, Trauma uses the devastating **Mega Pulse Cannon** (ignores Spr and Shell), then creates two new ones. Trauma will eventually Drain its own Dromas to recover HP. Simply keep attacking Trauma; let it consume the Dromas itself. Draw **Leviathan** if missed. **Mug 2× Meteor Stone** from each Droma. Trauma drops **Elem Atk** items (teach El.Att-J to a GF). **Unlock GF** after this fight — restoring GF access now means summoning is available for all remaining bosses (Red Giant, Krysta, Gargantua, Catoblepas, Tiamat).`,

    `**Unlock Limit Break.** From the Art Gallery, go north twice and down the stairs. Take the upper-left exit, grab the key in the prison cell, then fight Red Giant.`,

    `**Boss: Red Giant** (Lv 1-52) — HP: 30,000 | AP: 30
- Draw: Demi, Pandemona`,

    `Strategy: Red Giant has **no elemental weaknesses** (all elements ×1) — its defenses come from extremely high Vitality (255) and Spirit (255), not elemental resistance. Cast **Meltdown** immediately — Red Giant has fixed HP at 30,000 regardless of level. Cast Blind to reduce its physical attacks (80% Darkness success rate). **Gravity and Demi work against Red Giant** despite its imposing appearance — draw and cast Demi from Red Giant itself to deal 25% current HP per cast, making it a useful self-damaging strategy early in the fight when raw damage is limited. When its HP falls below 9,000 it loses its sword and switches to unarmed punches. Draw **Pandemona** if missed. Red Giant drops **Diamond Armor** — useful crafting material. **Unlock Limit Break** after this fight.`,

    `**Unlock Item.** Return to the Main Hall. Switch to the secondary party and move them left through the hall to the chandelier room — lower the lever. Switch back to the primary party and go upstairs through the doors, over the chandelier, to the balcony.`,

    `**Boss: Krysta** (Lv 1-55) — HP: 5,200-16,000 | AP: 30
- Draw: Holy, Carbuncle`,

    `Strategy: Krysta has extremely high Vitality — **Meltdown is mandatory**. Additionally, Krysta has **zero Spirit** — magic damage hits for full maximum value without any Spirit reduction, making magic attacks superior to physical hits if Meltdown has already been applied. **Elemental notes**: Krysta is **completely immune to Ice** and **Earth magic misses entirely** (not just reduced — Earth-element spells simply fail to connect). Krysta counters any attack with a (Counter rocket). Stay at high HP before the final blow — when Krysta is defeated, it uses **Ultima** as a desperate last strike. Draw **Carbuncle** if missed. Krysta drops **Elem Guard** items (teach El.Def-Jx4 to a GF — very valuable). **Unlock Item** after this fight.`,

    `**Unlock Command Ability.** Navigate through the Chapel (restoring Mug, Defend, and Draw is now the priority). Head upstairs, across the bridge — **walk, do not run** across this bridge or the Armory Key will be knocked off and fall into the water below. Hold Triangle to keep balance. If the key does fall, it flows downstream — find it on the right side. Use the Armory Key to unlock the door before the Flood Gate room. Fight Gargantua.`,

    `**Boss: Gargantua** (Lv 1-54) — HP: 10,100-15,400 | AP: 30
- Draw: Bio, Quake, Reflect, Cerberus`,

    `Strategy: Starts as Vysage, Lefty, and Righty — defeat them to trigger the true Gargantua. **Do not use physical attacks** against Gargantua — every physical hit triggers **Counter Twist**, which always deals critical damage. Use magic exclusively. Gargantua's **Evil-Eye** inflicts Slow and Curse on a single target — keep Esuna or Remedy+ on hand; junctioning Pain and Slow to St.Def-J blocks both. Quake targets all party members (Earth on El.Def-J to absorb). Cast Meltdown, then Aura on Squall and unleash Renzokuken — Gargantua falls in one Limit Break chain. **Zombie trick**: Gargantua is also weak to Zombie status — if Zombie can be inflicted, a single Elixir then kills it instantly (Elixir heals a Zombie-status target to 0 HP, bypassing its physical counter entirely). Draw **Cerberus** if missed (Cerberus can also be drawn from Gargantua). Also draw **Reflect** from Gargantua — this is one of the few available sources of Reflect magic at this point in the game. Gargantua always drops **Magic Armlet** items (teaches St.Def-Jx4 to a GF). **Unlock Command Ability** after this fight.`,

    `**Unlock Resurrection.** Head to the fountain area below and check the **left side of the fountain** for the **Treasure Vault Key**. Go back to the Main Hall, upstairs, west, down the stairs, and find the difficult-to-see door on the left. Open the puzzle — the goal is to have all four coffins open simultaneously. The simplest sequence: **touch the first, second, third, and fourth in order** (each touch toggles nearby coffins; this sequence leaves all four open). Alternative sequence: Open 2nd, Close 3rd, Open 1st, Open 4th.`,

    `**Boss: Catoblepas** (Lv 1-57) — HP: 10,500-38,500 | AP: 30
- Draw: Meteor, Alexander
- Weakness: Earth ×2, Water ×2`,

    `Strategy: Catoblepas is weak to **Earth (×2) and Water (×2)** — junction Quake or Water to El.Att-J. **Catoblepas absorbs Lightning** — it is healed by any Thunder-class magic, so remove Lightning from El.Att-J entirely for this fight. Catoblepas has low Vitality and low Spirit — both physical and magical damage land cleanly. Apply Blind to greatly reduce its claw and Deadly Horn physical attacks (60% Darkness success rate). Keep Thunder class magic on El.Def-J to handle Thundaga. Catoblepas uses **Thunder Summon** (area Thunder attack that ignores Spr) after it has used Thundaga three times — the damage is still mitigated by junctioning Thundaga/Blizzaga to El.Def-J. Before landing the killing blow, ensure Shell is active on all party members — Catoblepas uses **Meteor** as a final desperate strike. Draw **Alexander** if missed. Catoblepas always drops **Status Atk** items (teach St.Att-J to a GF). **Catoblepas Card refine chain**: Catoblepas Card → Card Mod → **1× Rename Card** — Rename Cards allow renaming any GF (the only in-game method to change a GF's name). **Unlock Resurrection** after this fight.`,

    `{{CALLOUT:point|Rosetta Stone}} optional puzzle. Go to the left elevator area and use the correct party combination to raise the chandelier platform (Quistis/Selphie/Irvine left side, Squall/Zell/Rinoa right side — or other valid combos). Obtain the **Floodgate Key**. Return to the Flood Gate area (near Red Giant/Gargantua), unlock the lever, and drain the water. In the Chapel, **press ALL organ buttons simultaneously** and hold for a few seconds. The key is that the note must **cut off cleanly** — release all buttons at exactly the same time so the chord ends sharply rather than trailing. If the spikes do not lower, the timing was off; retry until you hear the brief sound effect confirming success. Then go east in the waterways to find the **Rosetta Stone** chest.`,

    `Now continue to the clock tower. Go upstairs from the Chapel, cross the bridge, through the door, climb the clock tower stairs, and use the bell to jump from the left side to the right side. On the balcony, fight Tiamat.`,

    `**Boss: Tiamat** (Lv 1-58) — HP: 21,200-89,600 | AP: 30
- Draw: Flare, Eden`,

    `Strategy: Tiamat spends several turns counting down before unleashing **Dark Flare** — an area attack that ignores Spr and carries Fire, Ice, and Thunder elements simultaneously. Junction **Flare** and **Protect** to El.Def-J to completely nullify Dark Flare damage (both magic types together cover all three of its elements). Do not junction Fire, Thunder, or Wind class magic to El.Att-J — Tiamat resists both Fire and Thunder (×0.5 each) and is fully immune to Wind. **Draw GF Eden from Tiamat if it was not obtained from Ultima Weapon** — this is the absolute last opportunity in the game. Drawing Eden here triggers **Achievement: Eden** upon obtaining the GF. Cast Meltdown and use Aura + Renzokuken to end the fight quickly. Tiamat always drops **Status Guard** items (teach St.Def-Jx4 to a GF). **Unlock Save** after this fight — the internal save point is now accessible, allowing a full save before Omega Weapon and the final sequence.`,

    `{{CALLOUT:enemy|Omega Weapon}} optional, requires all abilities unlocked. Have the primary party stand at the fountain area (Party Switch Point). Switch to the secondary party, go to the chandelier room, then to the bell room before the Art Gallery — pull the rope inside. **Immediately switch back to the primary party** at the Party Switch Point. With the primary party, go north through the Chapel to encounter Omega Weapon. Total time: about 60 seconds.`,

    `**Boss: Omega Weapon** (Lv 1-100) — HP: 111,105-1,161,000 | AP: 250
- Draw: Flare, Holy, Meteor, Ultima`,

    `Strategy (Omega Weapon): Pre-battle requirements — (1) All three characters must have exactly **9,999 max HP** — use HP+??% abilities if needed. (2) Junction **Death** to St.Def-J on all characters — Lv5 Death kills instantly at multiples of Lv5. (3) Remove all elemental magic from El.Att-J — Omega absorbs ALL elements. (4) Stock at least 10 **Megalixirs** (Bahamut card → Card Mod → 100× Megalixir). (5) Have **100× Fast Ammo** + **50× AP Ammo** + **50× Pulse Ammo** for Irvine — Fast Ammo's Quick Shot cycles rapidly to fill Limit Break time windows, AP Ammo's Armor Shot ignores Vitality for consistent max damage, and Pulse Ammo's Hyper Shot delivers peak single-hit damage on turns with full time available. (6) Have Squall and Irvine with Str-J above 220. (7) Set battle speed to slowest. (8) Equip **Defend** command on at least two characters.`,

    `Omega absorbs all elements and cannot be Slowed, Mugged, or Blinded. It can be drawn from: **Flare, Holy, Meteor, Ultima** (all levels). No drops besides Three Stars and the Proof of Omega item.`,

    `Omega's attack pattern is strictly fixed (random physical swipes occur between any step):
1. **Lv5 Death** → Death on St.Def-J ignores this; cast Meltdown on Omega
2. **Meteor** → use Megalixir to restore full HP on all members
3. **Megido Flame** (fixed 9,998 to all — requires exactly 9,999 HP or someone dies) → all members at 1 HP; unleash Renzokuken + Irvine Armor Shot + Quistis Shockwave Pulsar
4. **Gravija** (75% current HP — at 1 HP deals zero damage) → Squall Renzokuken; two others use Defend
5. **Terra Break** (16 physical hits distributed randomly, each dealing 4,000+ damage — Defend absorbs all) → revive any KO'd, use Mega-Potion
6. **Ultima** → Renzokuken + Shockwave Pulsar + Armor Shot (Ultima deals at most ~1,200 with high Spr)
7. **Light Pillar** (9,999 to one character — unavoidable unless Invincible) → Revive the KO'd member; use Megalixir
8. **Repeat from Meteor**`,

    `Omega has over a million HP at high levels — this is a long fight. **Version note**: In the original **PlayStation** version, Omega is fixed at Level 100. In **PC/Steam/Remastered**, Omega scales to the party's level. In either case, its Lv5 Death cannot be avoided by choosing a level not divisible by 5 on PlayStation — and on PC/Remastered, if the party is at a level divisible by 5, Lv5 Death will target them. Death on St.Def-J is mandatory regardless of version.`,

    `{{CALLOUT:hint|Alternate Invincible strategy}} Use **Holy War** items (everyone gains Invincible status — grants full immunity to all damage and most status effects for several turns) or **Hero** items (single character Invincible). With Invincible active, the party can weather Megido Flame and Light Pillar without any HP management, transforming the fight from a timed survival exercise into a straightforward damage race. Collect Holy Wars from Card Modding the Gilgamesh Card (1 card → 10× Holy War), or buy Hero from shops. With three characters each under Holy War, the entire Omega pattern can be weathered through Gravija and Terra Break freely. **Aura Stone farming for Limit Break access**: If Aura magic is in short supply, **Power Wrists** bought from the Esthar Pet Shop can be refined into **Aura Stones** via Siren's **Tool-RF** (1 Power Wrist → 1 Aura Stone; 1 Aura Stone → 10× Aura via F Mag-RF). This converts a purchasable item directly into the Limit Break-enabling spell, bypassing the need to draw or refine Aura from enemies.`,

    `Drop: **Three Stars** — teaches any GF the **Expend×3-1** ability (while under Triple status, each spell cast draws from only 1 stock instead of 3; from a 100-stock supply that means 100 casts instead of 33, tripling magic endurance). Extra Three Stars beyond the three needed can also be refined into **100× Triple each** via Time Mag-RF. Defeating Omega also adds the **Proof of Omega** entry to the Tutorial. **Achievement: Omega Destroyed** — awarded upon defeating Omega Weapon.`,

    `From the Chapel, ascend the clock tower, cross the clock arrows, and proceed to the final save point. The save is available here — this is the absolute last save before the ending. Make all final preparation, junction every character optimally, and enter the final chamber.`,

    `{{CALLOUT:card|CC Group on the Ragnarok}} if any rare cards were missed. The Left Diamond girl plays rare cards that were modded (following the Queen of Cards chain to Shumi Village). Challenge her repeatedly to recover missed GF cards. The PuPu Card is never played by any CC member.`,
  ],
  'd4-final-preparations': [
    `{{CALLOUT:perfect|Perfect Game — six completion levels}} A "Perfect Game" means having achieved all requirements for a given level. Every level inherits the prior level's conditions.\n\n{{CALLOUT:perfect|Level 1}} Core perfect-file baseline:\n- Able to beat the main game, Ultima Weapon, and Omega Weapon without saving those superboss kills on the final perfect file\n- Best weapons for all six main playable characters and all Limit Breaks unlocked\n- All 16 junctionable GFs, at least one of every card, and all 32 magic slots filled for every character\n- All sidequests completed except permanently defeating Ultima Weapon and Omega Weapon\n- Battle Meter fully upgraded, all shops registered in Call Shop, SeeD Rank A, and either zero or all 30 written SeeD tests answered\n- X-ATM092 destroyed, **0 kills for Seifer and 0 kills for Edea**, **0 KOs for every character and GF**, and exactly **1 escape** from the mandatory X-ATM092 beach escape\n- Both superbosses still alive if you want the repeatable perfect-file state\n\n{{CALLOUT:perfect|Level 2}} Adds at least one of every item, all main characters and GFs at Level 100, max GF compatibility for every character, all treasures, max junctioned stats, all Tutorial entries, only the Open play rule and All trade rule active globally, and all GFs retaining their unique non-restorable abilities.\n\n{{CALLOUT:perfect|Level 3}} adds: 100 copies of every card except PuPu and the Lv8/9/10 rare cards, which are capped at exactly 1 each; base Str/Vit/Mag/Spr maxed for all characters without any junctions equipped; 100 of nearly every item (exceptions: stat-boosting items, elemental attack/guard, status attack/guard, Dark Matter, Shaman Stone, Hero Trial, and Pocketstation-exclusive items); all GFs at 9,999 HP.\n\n{{CALLOUT:perfect|Level 4}} adds: max Gil (999,999); max kill count (~65,535) for all 6 main characters; 100 of every item including stat-boosting items; max Speed for all characters.\n\n{{CALLOUT:perfect|Level 5}} adds: max Luck for all characters.\n\n{{CALLOUT:perfect|Level 6 (Pocketstation hardware required)}} adds: 100 of every Pocketstation-exclusive item (Ribbon, Mog's Amulet, Friendship, Chocobo's Tag, additional Pet Nametags); Boko the Chocobo GF powered up via the Chocobo World minigame to deal 9,999+ damage.\n\n{{CALLOUT:perfect|Why 0 kills for Seifer and Edea}} The game's kill counter caps at 65,535 per character. Reaching that count for a temporary character like Seifer alone would require over 300 hours of grinding — purely impractical. More meaningfully, keeping their counts at zero demonstrates that the main party never needed them, which is a point of pride rather than a concession. The zero is also cleaner than any partial number. Both characters must fight, but the permanent party members deliver every finishing blow.\n\n{{CALLOUT:card|Card collection target (Level 3)}} The PuPu Card is the only card that cannot be re-obtained once lost — never Card Mod it. All Lv8, Lv9, and Lv10 rare cards are limited to 1 copy each, but can be won back from the CC Group Left Diamond girl on the Ragnarok (Disc 4). For a Level 3+ run, hold all rare cards and target 100 copies of every common card via card games and AP grinding.`,

    `{{CALLOUT:mechanics|Stat-maxing on Disc 4 — prerequisite checklist}} For players pursuing maximum stats, the following must be true before arriving here or it may be too late. (1) **CC Group all defeated by end of Disc 3** — they need to be aboard the Ragnarok on Disc 4 for the Left Diamond girl to recover modded rare cards and for the Gilgamesh/Eden card sources. (2) **All Esthar shops physically visited** at least once during Disc 3 — each shop must be entered at least once before Call Shop lists it; if any shop (especially Esthar Pet Shop and Esthar Shop!!!) was skipped, it is permanently unavailable via Call Shop on Disc 4. (3) **Ultima Weapon still alive** in the Deep Sea Research Center — the Tri-Face fixed encounters are the only reliable Curse Spike source for Luck Up refinement; defeating Ultima Weapon permanently removes them. (4) **Siren at Lv 100** if Luck Up refinement is planned — the Dark Matter recipe (100× Curse Spike → 1 Dark Matter) requires Siren to be at level 100 for Tool-RF to access it. (5) Required GF abilities active: Quezacotl Card Mod, Siren Tool-RF, Carbuncle Recov Med-RF, Doomtrain Forbid Med-RF, Tonberry Haggle/Sell-High/Familiar/Call Shop, Eden GF Abl Med-RF. All of these must be learned before any items in the stat-up chains can be acquired efficiently.`,

    `With all nine castle guardians defeated and all sealed abilities restored, the party has full access to Items, Magic, GF, Draw, Command Abilities, Limit Breaks, and Resurrection.`,
    `**Auto-Shell** (from Moon Curtain items) on all three characters is especially important for the Ultimecia sequence — it halves all magic damage across all four phases. Card Mod 1× Alexander card to obtain 3× Moon Curtain; distribute one each to Siren, Cerberus, and Diablos (they learn Auto-Shell).`,

    `{{CALLOUT:warning|Magic stocks to confirm before entering}} 100× Aura on at least two characters; a full stock of Meltdown; 20+ Megalixirs (obtained from Bahamut Card Mod — one Bahamut card gives 100× Megalixir); 100× Death junctioned to St.Def-J (for Omega Weapon, if fighting it — fastest Death source: mug **Dead Spirit** from Forbidden enemies, then refine via **L Mag-RF → 20× Death** per Dead Spirit; alternatively, draw Death directly from Forbidden enemies or use Dead Spirit obtained by Card Modding the Odin Card). If any Aura was used during the castle, replenish by drawing from Seifer's gate area (no longer accessible) or from reserve stocks on other party members.`,
    `The clock tower and final ascent are accessed from the Chapel area — cross the clock arrow hands to reach the ladder, descend to the Master Room bridge, and save at the final save point. This is the last save before the ending — all preparations must be complete.`,

    `{{CALLOUT:enemy|Commencement Room — 11 Sorceress corridor fights}} After descending the clock tower and crossing to the Master Room, the party walks through a "Commencement Room" corridor lined with **11 Sorceresses** encountered in sequence. The first is the fake Save Point warning — do not use the glowing orb that looks like a save point; it is a battle trigger. The Sorceresses come in three types: **Type A** (enemies 1–6): each uses a different basic magic (Fire → Blizzard → Thunder → Aero, progressively escalating), drops Flare/Holy/Meteor/Ultima Stones; **Type B** (enemies 7–10): #7 casts Double+Thundaga, #8 casts Quake+Meltdown, #9 casts Meteor every turn (primary threat — use Shell), #10 casts Double+Flare spam; **Type C** (enemy 11): starts a countdown to casting Ultima combined with an auto-critical **Creepy Touch** counter triggered by any physical attack. All Sorceresses drop Flare/Holy/Meteor/Ultima Stones and can be mugged for Meteor Stone or Ultima Stone. Use physical attacks on Type A/B enemies and only magic against Type C to avoid Creepy Touch. Having Auto-Shell from Doomtrain active cuts most incoming magic by half.`,
  ],
  'd4-the-final-battle': [
    `Ultimecia's domain is reached at the top of the castle. The four-phase final battle runs without returning to a save point — all five boss forms must be defeated consecutively.`,

    `**Boss: Ultimecia** (Lv 1-65) — HP: 4,600-43,000 | AP: 0
- Draw: Lv 1-65: Haste, Slow, Reflect, Demi
- Weakness: Poison ×1.5`,

    `**Boss: Griever** (Lv 1-65) — HP: 16,752-126,512 | AP: 0
- Draw: Lv 1-65: Bio, Quake, Tornado
- Weakness: Wind ×2, Holy ×2.5`,

    `**Boss: Ultimecia/Griever** (Lv 1-65) — HP: 13,050-176,250 | AP: 0
- Draw: Lv 1-65: Firaga, Thundaga, Blizzaga
- Weakness: Thunder ×2, Water ×2`,

    `**Boss: Ultimecia (Final Form)** (Lv 1-65) — HP: 13,050-176,250 | AP: 0
- Draw: Lv 1-65: Flare, Holy`,

    `**Boss: Ultimecia (Lower Part)** (Lv 1-65) — HP: 2,300-21,500 | AP: 0
- Draw: Lv 1-65: Apocalypse`,

    `{{CALLOUT:spoiler|Final battle phase mechanics}} **Critical warnings**: (1) If a KO'd character is left down too long, Ultimecia uses **"absorbed into time"** to permanently remove that character from the battle — revive KO'd members immediately. (2) Both Griever and Ultimecia Final Form can **blow away randomly selected magic from any character's stock** — if junctioned magic is removed, that junction stat drops to its base value. Defeat each form quickly to limit this danger. (3) Do not summon GFs during the Ultimecia/Griever or Ultimecia Final Form phases — those forms use a **GF lethal strike** counter that can permanently KO summoned GFs.
Full sequence:
- **Ultimecia (Form 1)**: Maelstrom deals **62.5% of current HP** (gravity/status class) and inflicts Curse (blocks Limit Breaks); Shell halves the damage component. Junction Pain to St.Def-J to resist Curse; or cure with Esuna/Treatment. If she casts Meltdown on the party, cure with Esuna or Treatment — do not leave Vit 0 in place. Draw **Haste**, **Slow**, **Reflect**, **Demi**. If she casts Double on herself, Dispel it immediately.
- **Griever**: Wind ×2, Holy ×2.5 weakness. **Remove Poison/Bio from El.Att-J for this phase** — Griever absorbs Poison-element magic (it is healed by it), so any Poison junction from Phase 1 must be swapped out. Draw **Bio**, **Quake**, **Tornado**. Griever can also **draw magic from your characters and use it against them** — having no magic in stock is the only prevention, but in practice just defeat it fast. If Griever Triples itself, Dispel it. **Gravija** tears off 75% of current HP (gravity-class — Shell halves the damage component; Defend works too). **Visual cue**: the screen shakes visibly just before Griever uses **Shockwave Pulsar** — this is your warning to use Defend or a Megalixir to survive the hit. Shockwave Pulsar is also used as a Final Attack if Griever is defeated before it has a chance to use it mid-fight. **Griever's Doom status**: if Griever inflicts Doom on a character, standard Esuna will not remove it — only **Elixir**, **Megalixir**, **Treatment**, or **Remedy+** can cure Doom from this source. Keep at least one of these in stock before this fight.
- **Ultimecia/Griever**: Thunder ×2, Water ×2 weakness. Draw **Firaga**, **Thundaga**, **Blizzaga**. The two **Helix** support units draw from **Esuna** and **Dispel** — worth drawing from them before destroying. Ultimecia first summons one then two Helixes — once both Helixes are present she gains access to **Great Attractor** (ignores Vit, area physical) plus Ultima and Meteor. Cast Protect to halve Great Attractor damage. Once roughly 65% of total HP is depleted (approximately 35% remaining), the lower body falls off — Great Attractor and the Helixes disappear, replaced by Tornado and Quake. **Note**: after the lower body detaches, the Helixes can be re-summoned by Ultimecia — if they reappear, destroy them again quickly before Great Attractor returns. Do not summon GFs.
- **Ultimecia Final Form**: Draw **Flare**, **Holy**. She can blow away stocked magic from your junctions — finish quickly. **Hell's Judgement** reduces all party HP to 1 (unavoidable) — this is the signal to act: have two members unleash Limit Breaks while the third heals with Megalixir. Repeat this pattern each Hell's Judgement cycle. At roughly 70% HP lost, the **lower part** of Ultimecia becomes exposed. Destroy it before she can cast **Apocalypse** (a souped-up Ultima); or draw Apocalypse from the lower part first if desired. **Two-turn Apocalypse sequence**: Ultimecia Final Form uses a two-turn setup — on one turn she uses Draw Apocalypse to stock the spell internally, then on her next turn she fires it together with Hell's Judgment, simultaneously wiping all party members' HP to 1 and depleting their magic stocks. After any Hell's Judgment, act immediately with Limit Breaks before she completes the second turn.
- **Ultimecia Lower Part**: Draws only **Apocalypse** — no attacks. Destroy it quickly. Note: **Apocalypse cannot be assigned to any junction slot** — the game menu prevents it entirely, so it provides no junction benefit in practice. Drawing it to stock it is fine for casting, but no junction slot can be set to it.`,

    `Apply Meltdown to every form. Maintain Aura on Squall for Renzokuken chains. Auto-Shell on all party members halves all incoming magic damage across the entire sequence.`,

    `After defeating Ultimecia, the game's conclusion plays out through an extended cinematic sequence. The story of Squall, Rinoa, and their companions reaches its resolution. **Achievement: End of Game** — awarded upon clearing the final battle and watching the ending.`,

    `**Congratulations — Final Fantasy VIII Remastered is complete.**`,
  ],
}

export const CHAPTER_ENCOUNTERS = {
  'd1-preparing-for-the-exam': [
    {
      area: "Fields & Forest near Balamb Garden",
      enemies: [
        { id: "enemy-bite-bug", name: "Bite Bug", notes: "Draws Fire, Scan, Fira (Fira at Lv20+)" },
        { id: "enemy-glacial-eye", name: "Glacial Eye", notes: "Draws Blizzard, Cure, Blizzara/Cura at Lv20+; mug Arctic Wind" },
        { id: "enemy-caterchipillar", name: "Caterchipillar", notes: "Draws Thunder/Cure; Slow, Stop, Thundaga, Curaga at Lv20+; mug Spider Web" },
        { id: "enemy-grat", name: "Grat", notes: "Draws Sleep, Silence, Berserk, Confuse; mug Silence Powder" },
        { id: "enemy-t-rexaur", name: "T-Rexaur", notes: "Draws Fire/Thunder up to Quake/Firaga; mug Dino Bone; Lv20-30 for Dragon Fang weapon material" },
      ],
    },
    {
      area: "Balamb Beach (coast south of Balamb Town)",
      enemies: [
        { id: "enemy-fastitocalon-f", name: "Fastitocalon-F", notes: "Draws Blizzard + Sleep at Lv1-19, Blizzara + Sleep at Lv20-29, Water at Lv30+; 6 AP guaranteed per fight - best early AP farm; mug Fish Fin" },
      ],
    },
	    {
	      area: "Fire Cavern (all enemies fixed Lv5)",
	      mugAvailable: false,
	      enemies: [
	        { id: "enemy-bomb", name: "Bomb", notes: "Fixed Lv5 in Fire Cavern; only low-level Bomb draws are available in this exam route.", lvMin: 5, lvMax: 5, hp: 288 },
	        { id: "enemy-buel", name: "Buel", notes: "Fixed Lv5 in Fire Cavern; only low-level Buel draws are available in this exam route.", lvMin: 5, lvMax: 5, hp: 43 },
	        { id: "enemy-red-bat", name: "Red Bat", notes: "Fixed Lv5 in Fire Cavern; only low-level Red Bat draws are available in this exam route.", lvMin: 5, lvMax: 5, hp: 23 },
	      ],
	    },
  ],
  'd1-the-seed-exam': [
    {
      area: "Dollet Town & Communication Road",
      enemies: [
        { id: "enemy-g-soldier", name: "G-Soldier", notes: "Draws Fire/Thunder/Blizzard/Cure up to -ga tier; mug Potion/Phoenix Down" },
        { id: "enemy-anacondaur", name: "Anacondaur", notes: "Draws Bio (excellent St-Def-J poison source); mug Venom Fang; weak to Ice ×2; resistant to Fire and Poison ×0.5; Poison Mist and Dark Mist (inflict Poison and Darkness) only used when below 50% HP — safe to draw before that threshold" },
      ],
    },
  ],
  'd1-after-the-exam': [
    {
      area: "Balamb Garden Training Center",
      enemies: [
        { id: "enemy-t-rexaur", name: "T-Rexaur", notes: "Best source: draw Quake (Lv20+); mug Dino Bone; capped Lv11 in Training Center", lvMax: 11 },
        { id: "enemy-grat", name: "Grat", notes: "Draws Sleep, Silence, Berserk, Confuse; mug Silence Powder" },
        { id: "enemy-bite-bug", name: "Bite Bug", notes: "Draws Fire, Scan; mug M-Stone Piece" },
      ],
    },
  ],
  'd1-the-timber-mission': [
    {
      area: "Deling City Sewers (Laguna dream)",
      enemies: [
        { id: "enemy-red-bat", name: "Red Bat", notes: "Draws Drain — stock for St-Def-J; mug Vampire Fang" },
        { id: "enemy-creeps", name: "Creeps", notes: "Draws Life, Thunder — Life is excellent Spr-J magic; mug Coral Fragment → use on Quistis to teach Electrocute Blue Magic (Thunder-elemental damage to all enemies) OR refine to 20× Thundara via T Mag-RF" },
      ],
    },
    {
      area: "Timber Area World Map",
      enemies: [
        { id: "enemy-grendel", name: "Grendel", notes: "Draws Fire/Blizzard up to Firaga/Blizzaga; mug Dragon Fin (→ 20× Double via Time Mag-RF); drops Dragon Fang (4× needed for Lionheart); card → Dragon Fin" },
        { id: "enemy-gesper", name: "Gesper", notes: "Draws Shell, Protect, Float, Confuse; mug Black Hole → Degenerator Blue Magic for Quistis" },
        { id: "enemy-funguar", name: "Funguar", notes: "Draws Sleep, Silence, Confuse; mug Sleep Powder" },
        { id: "enemy-thrustaevis", name: "Thrustaevis", notes: "Draws Tornado at Lv30+; mug Shear Feather/Windmill" },
      ],
    },
  ],
  'd1-dollet-exploration': [
    {
      area: "Dollet Surroundings (world map)",
      enemies: [
        { id: "enemy-anacondaur", name: "Anacondaur", notes: "Draws Bio; mug Venom Fang" },
        { id: "enemy-adamantoise", name: "Adamantoise", notes: "Lv30+ draws Reflect — great Spr-J source; mug Whisper (→ White Wind Blue Magic for Quistis); drop Adamantine for weapon crafting; weak to Lightning and Earth ×2; **Sand Storm** (AoE physical) inflicts Darkness on all party members — junction Darkness resistance to St.Def-J when farming here; it also casts White Wind on itself to recover HP equal to (its max HP − current HP), meaning healing it from near-death restores a large chunk — only use White Wind if Quistis needs to heal the party, not while Adamantoise is at low HP" },
        { id: "enemy-hexadragon", name: "Hexadragon", notes: "Draws Firaga, Shell, Protect, Dispel; mug Red Fang (→ Flare magic)" },
        { id: "enemy-thrustaevis", name: "Thrustaevis", notes: "Draws Tornado at Lv30+; mug Windmill (→ Tornado via T Mag-RF)" },
      ],
    },
    {
      area: "Timber Area (near East Academy station)",
      enemies: [
        { id: "enemy-ochu", name: "Ochu", notes: "Draws Pain (Lv30+ — great St-Def-J); mug Ochu Tentacle (→ Quistis weapon upgrade)" },
        { id: "enemy-grendel", name: "Grendel", notes: "Draws Fire/Blizzard up to Firaga/Blizzaga; mug Dragon Fin (→ 20× Double via Time Mag-RF); drops Dragon Fang (4× needed for Lionheart weapon); card → Dragon Fin" },
        { id: "enemy-wendigo", name: "Wendigo", notes: "Draws Berserk, Protect; mug Steel Pipe (→ Aura Stones via Siren Tool-RF)" },
      ],
    },
  ],
  'd1-journey-to-galbadia-garden': [
    {
      area: "Forest between Timber and Galbadia Garden",
      enemies: [
        { id: "enemy-grendel", name: "Grendel", notes: "Draws Fire/Blizzard/Double at low levels, Firaga/Blizzaga at Lv30+; mug Dragon Fin (→ 20× Double via Time Mag-RF); drops Dragon Fang — collect 4× for Lionheart weapon" },
        { id: "enemy-gesper", name: "Gesper", notes: "Draws Confuse, Float; can use Degenerator (instant-kill) — keep HP high; mug Black Hole" },
        { id: "enemy-funguar", name: "Funguar", notes: "Draws Sleep, Silence; mug Sleep Powder" },
      ],
    },
    {
      area: "Centra Excavation Site (Laguna dream)",
      enemies: [
        { id: "enemy-elastoid", name: "Elastoid", notes: "Draws Dispel, Stop, Meltdown — Meltdown is the best Vit-J magic in the game; mug Dynamo Stone → 20× Thundaga via T Mag-RF; Lv30+ steal: Laser Cannon → teaches Quistis Homing Laser Blue Magic OR refines to 5× Pulse Ammo per cannon via Ammo-RF (Lionheart ingredient)" },
      ],
    },
    {
      area: "Galbadia Continent (world map)",
      enemies: [
        { id: "enemy-thrustaevis", name: "Thrustaevis", notes: "Draws Tornado (Lv30+); mug Windmill; excellent Eva-J filler" },
        { id: "enemy-wendigo", name: "Wendigo", notes: "Draws Berserk, Protect; mug Steel Pipe (→ Aura Stones)" },
        { id: "enemy-vysage", name: "Vysage", notes: "Draws Haste — great Spd-J magic; mug Lightweight → 20× Haste via Time Mag-RF" },
      ],
    },
  ],
  'd1-galbadia-garden': [
    {
      area: "Tomb of the Unknown King",
      enemies: [
        { id: "enemy-grand-mantis", name: "Grand Mantis", notes: "Draws Water, Esuna, Life; mug Sharp Spike" },
        { id: "enemy-death-claw", name: "Death Claw", notes: "Draws Aero, Dispel, Reflect; mug Shear Feather" },
      ],
    },
    {
      area: "Galbadia Continent (near Deling City / Lallapalloza Canyon)",
      enemies: [
        { id: "enemy-vysage", name: "Vysage", notes: "Draws Esuna, Haste, Bio; mug Lightweight → 20× Haste via Time Mag-RF (great Spd-J magic); rarely drops Regen Ring → 20× Full-life via L Mag-RF" },
        { id: "enemy-lefty", name: "Lefty", notes: "Draws Regen, Demi, Quake; mug Life Ring" },
        { id: "enemy-righty", name: "Righty", notes: "Draws Shell, Protect; mug Magic Stone" },
      ],
    },
  ],
  'd1-deling-city': [
    {
      area: "Deling City Sewers",
      enemies: [
        { id: "enemy-red-bat", name: "Red Bat", notes: "Draws Drain; mug Vampire Fang" },
        { id: "enemy-creeps", name: "Creeps", notes: "Draws Life, Thunder — Life is an excellent Spr-J magic source; mug Coral Fragment → use on Quistis to teach Electrocute Blue Magic (Thunder-elemental damage to all enemies)" },
      ],
    },
  ],
  'd2-winhill': [
    {
      area: "Winhill Bluffs (world map)",
      enemies: [
        { id: "enemy-ochu", name: "Ochu", notes: "Draws Pain (Lv30+); mug Ochu Tentacle" },
        { id: "enemy-mesmerize", name: "Mesmerize", notes: "Draws Curaga, Life, Dispel, Esuna; mug Mesmerize Blade (→ 20× Regen via L Mag-RF)" },
        { id: "enemy-vysage", name: "Vysage", notes: "Draws Haste, Bio; mug Lightweight" },
      ],
    },
  ],
  'd2-the-escape': [
    {
      area: "D-District Prison Floors",
      enemies: [
        { id: "enemy-g-soldier", name: "G-Soldier", notes: "Standard floors; draws Fire/Thunder/Blizzard up to -ga tier" },
        { id: "enemy-gim47n", name: "GIM47N", notes: "Prison-specific robot; draws Cure, Life; mug Steel Orb; card → GIM47N Card → Card Mod → 10× Fast Ammo (useful for Irvine Quick Shot unlock)" },
        { id: "enemy-blood-soul", name: "Blood Soul", notes: "Draws Zombie, Float, Silence, Dispel; mug Zombie Powder; holy element deals ×3 damage; useful early Zombie source for St.Def-J" },
      ],
    },
  ],
  'd2-missile-base': [
    {
      area: "Missile Base Exterior & Interior",
      enemies: [
        { id: "enemy-base-soldier", name: "Base Soldier", notes: "Draws Blizzard up to Blizzaga; mug Hi-Potion" },
        { id: "enemy-base-leader", name: "Base Leader", notes: "Draws Thunder up to Thundaga, Confuse, Slow, Reflect; mug Tent/Cottage" },
        { id: "enemy-sam08g", name: "SAM08G", notes: "Draws Shell, Protect, Life, Reflect; mug Running Fire" },
      ],
    },
  ],
  'd2-return-to-balamb-garden': [
    {
      area: "Balamb Garden Interior (Liberation)",
      enemies: [
        { id: "enemy-armadodo", name: "Armadodo", notes: "Draws Protect, Shell, Quake; mug Turtle Shell; **Roll Attack** is 100% Critical damage — unpredictable burst risk; after receiving a physical attack it may fall over (\"Armadodo fell over!\"), reducing its Vit and Spr by 50% for 4 turns (making it much easier to damage during that window), then it rises and stats return to normal; drop: Turtle Shell (50% base drop rate)" },
      ],
    },
  ],
  'd2-fishermans-horizon': [
    {
      area: "FH Surrounding Sea (world map)",
      enemies: [
        { id: "enemy-fastitocalon", name: "Fastitocalon", notes: "Draws Water, Blizzard up to Blizzaga; mug Water Crystal" },
        { id: "enemy-slapper", name: "Slapper", notes: "Draws Blizzard, Water up to Blizzaga; mug Hi-Potion" },
      ],
    },
  ],
  'd2-the-garden-festival': [
    {
      area: "Centra Ruins",
      enemies: [
        { id: "enemy-tonberry", name: "Tonberry", notes: "Draws Death; mug Chef's Knife (→ 100× Death via L Mag-RF); 18–24 Tonberry kills trigger King (most often ~20); Card command and Devour do NOT count toward the kill total; 10 AP per fight; **Everyone's Grudge** attack deals damage = 20 × (total enemies that character has killed) — keep party kill counts low before entering the ruins" },
        { id: "enemy-tonberry-king", name: "Tonberry King", notes: "GF reward; draws Death, Full-life; priority abilities: Call Shop, Haggle, Familiar, Sell-High; the **Tonberry King Card** is obtained by using the Card command on either a Fastitocalon or a Malboro (not on Tonberry King itself — there is no C-C entry for Tonberry King); once the card is won, Card Mod it: 1 Tonberry King Card → 1x Chef's Knife (boosts Tonberry GF compatibility, or refines via Ammo-RF into 20x AP Ammo)" },
      ],
    },
    {
      area: "Cactuar Island (small island east of Centra Kashkabald Desert)",
      enemies: [
        { id: "enemy-cactuar", name: "Cactuar", notes: "20 AP per fight — best AP rate on Disc 2; draws Haste; mug Cactus Thorn" },
      ],
    },
    {
      area: "Centra World Map",
      enemies: [
        { id: "enemy-malboro", name: "Malboro", notes: "DANGER: Bad Breath inflicts 8 statuses; draws Bio, Demi, Quake; mug Malboro Tentacle (6× needed for Doomtrain)" },
        { id: "enemy-ruby-dragon", name: "Ruby Dragon", notes: "Draws Flare/Meteor (Lv30+); mug Inferno Fang" },
        { id: "enemy-abyss-worm", name: "Abyss Worm", notes: "Draws Tornado, Quake, Aero; mug Windmill" },
      ],
    },
  ],
  'd2-exploring-the-world': [
    {
      area: "Trabia Continent (world map)",
      enemies: [
        { id: "enemy-snow-lion", name: "Snow Lion", notes: "Draws Blizzara/Blizzaga, Berserk; mug Healing Mail; rare drop: Silver Mail (Lv20+ — needed for GFAbl Med-RF upgrade chain to Diamond Armor)" },
        { id: "enemy-chimera", name: "Chimera", notes: "Draws Thundaga/Blizzaga (Lv30+), Water, Bio; mug Red Fang" },
        { id: "enemy-wendigo", name: "Wendigo", notes: "Draws Berserk, Protect; mug Steel Pipe (→ Aura Stones)" },
      ],
    },
    {
      area: "Galbadia Continent (world map)",
      enemies: [
        { id: "enemy-thrustaevis", name: "Thrustaevis", notes: "Draws Tornado (Lv30+); mug Windmill (→ Tornado)" },
        { id: "enemy-wendigo", name: "Wendigo", notes: "Mug Steel Pipe for Aura Stones" },
        { id: "enemy-vysage", name: "Vysage", notes: "Draws Esuna, Haste, Bio; mug Lightweight → 20× Haste via Time Mag-RF" },
      ],
    },
    {
      area: "Balamb Island (world map)",
      enemies: [
        { id: "enemy-bite-bug", name: "Bite Bug", notes: "Fire, Scan; mug M-Stone Piece" },
        { id: "enemy-glacial-eye", name: "Glacial Eye", notes: "Blizzara/Cura at Lv20+; mug Arctic Wind" },
        { id: "enemy-caterchipillar", name: "Caterchipillar", notes: "Slow, Stop, Thundaga, Curaga at Lv20+; mug Spider Web" },
        { id: "enemy-fastitocalon-f", name: "Fastitocalon-F", notes: "Water draw; 6 AP per fight on Balamb coast" },
      ],
    },
  ],
  'd2-return-to-balamb': [
    {
      area: "Balamb Island (world map)",
      enemies: [
        { id: "enemy-bite-bug", name: "Bite Bug", notes: "Fire, Scan; mug M-Stone Piece" },
        { id: "enemy-glacial-eye", name: "Glacial Eye", notes: "Blizzara/Cura (Lv20+); mug Arctic Wind" },
      ],
    },
  ],
  'd2-trabia-garden': [
    {
      area: "Trabia Continent (world map)",
      enemies: [
        { id: "enemy-snow-lion", name: "Snow Lion", notes: "Blizzara/Blizzaga; mug Healing Mail; rare drop Silver Mail (Lv20+)" },
        { id: "enemy-chimera", name: "Chimera", notes: "Thundaga/Blizzaga at Lv30+; mug Red Fang" },
      ],
    },
  ],
  'd2-battle-of-the-gardens': [
    {
      area: "Galbadia Garden Corridors",
      enemies: [
        { id: "enemy-tri-face", name: "Tri-Face", notes: "FARM: mug Curse Spike (Lv1–29: 6×; Lv30+: 6× at 89.5% or 8× at 10.5%) → teach Quistis LV? Death Blue Magic; OR refine to 10× Pain (ST Mag-RF); 100 Spikes → 1 Dark Matter (Tool-RF, Siren Lv100) → Shockwave Pulsar Blue Magic; draws Pain/Flare" },
        { id: "enemy-imp", name: "Imp", notes: "Draws Blind, Silence, Confuse, Break; mug Poison Powder" },
        { id: "enemy-g-soldier", name: "G-Soldier", notes: "Draws Fire/Thunder/Blizzard/Cure up to -ga tier" },
      ],
    },
  ],
  'd3-the-aftermath': [
    {
      area: "Great Salt Lake",
      enemies: [
        { id: "enemy-abyss-worm", name: "Abyss Worm", notes: "Draws Tornado, Quake; mug Windmill" },
        { id: "enemy-forbidden", name: "Forbidden", notes: "Draws Death, Zombie, Stop, Blind; mug Dead Spirit; powerful — keep HP high" },
        { id: "enemy-imp", name: "Imp", notes: "Draws Break, Blind, Silence; mug Poison Powder" },
      ],
    },
    {
      area: "Centra Continent (near Edea's House)",
      enemies: [
        { id: "enemy-malboro", name: "Malboro", notes: "DANGER: Bad Breath; draws Bio, Demi, Quake; mug Malboro Tentacle" },
        { id: "enemy-ruby-dragon", name: "Ruby Dragon", notes: "Draws Flare/Meteor (Lv30+); mug Inferno Fang" },
      ],
    },
  ],
  'd3-trabia-canyon': [
    {
      area: "Trabia Region (world map)",
      enemies: [
        { id: "enemy-malboro", name: "Malboro", notes: "DANGER: Bad Breath; draws Quake, Bio; mug Malboro Tentacle (needed for Doomtrain)" },
        { id: "enemy-ochu", name: "Ochu", notes: "Draws Pain (Lv30+); mug Ochu Tentacle (→ Quistis weapon)" },
      ],
    },
  ],
  'd3-picking-up-the-trail': [
    {
      area: "Centra / Esthar Approach",
      enemies: [
        { id: "enemy-ruby-dragon", name: "Ruby Dragon", notes: "Draws Flare, Meteor (Lv30+); mug Inferno Fang" },
        { id: "enemy-malboro", name: "Malboro", notes: "DANGER: Bad Breath; mug Malboro Tentacle" },
        { id: "enemy-abyss-worm", name: "Abyss Worm", notes: "Draws Tornado, Quake; mug Windmill" },
      ],
    },
  ],
  'd3-journey-to-the-silent-country': [
    {
      area: "Esthar Roads (invisible glowing path)",
      enemies: [
        { id: "enemy-elnoyle", name: "Elnoyle", notes: "Draws Pain, Double, Holy; drops Energy Crystal (→ Ultima magic / Pulse Ammo); FARM this enemy on Disc 3 — not available on Disc 4" },
        { id: "enemy-behemoth", name: "Behemoth", notes: "Draws Flare, Tornado, Regen; mug Barrier (→ Auto-Shell accessory)" },
        { id: "enemy-torama", name: "Torama", notes: "Draws Death, Demi, Life; mug Regen Ring (→ 20× Full-Life via L Mag-RF)" },
      ],
    },
  ],
  'd3-the-resistance': [
    {
      area: "Esthar City & Surroundings",
      enemies: [
        { id: "enemy-elnoyle", name: "Elnoyle", notes: "Fixed encounter near Presidential Palace; draw/drop Energy Crystal; best Holy source on Disc 3" },
        { id: "enemy-iron-giant", name: "Iron Giant", notes: "Draws Haste, Shell, Reflect, Quake; mug Star Fragment; 6× Steel Pipe needed for Doomtrain — mug here if needed" },
        { id: "enemy-malboro", name: "Malboro", notes: "DANGER: Bad Breath; mug Malboro Tentacle" },
        { id: "enemy-esthar-soldier", name: "Esthar Soldier", notes: "Draws full elemental tier up to -ga spells; mug Potion" },
      ],
    },
  ],
  'd3-esthar': [
    {
      area: "Esthar City & Continent",
      enemies: [
        { id: "enemy-elnoyle", name: "Elnoyle", notes: "PRIORITY FARM: Energy Crystal → Ultima; draw Holy; not available on Disc 4 — stock enough now; card the enemy to collect Elnoyle Cards → Card Mod 10 cards → 10× Energy Crystal (useful if drops are slow)" },
        { id: "enemy-behemoth", name: "Behemoth", notes: "Draws Flare/Regen/Tornado; mug Barrier" },
        { id: "enemy-iron-giant", name: "Iron Giant", notes: "Draws Haste, Quake; mug Star Fragment; also mug Steel Pipe if still need Doomtrain material" },
        { id: "enemy-torama", name: "Torama", notes: "Draws Life, Death, Demi; mug Regen Ring → Full-Life" },
        { id: "enemy-malboro", name: "Malboro", notes: "DANGER: Bad Breath; mug 2–6→ Malboro Tentacle if not yet at 6× for Doomtrain" },
      ],
    },
    {
      area: "Deep Sea Research Center (after Bahamut)",
      enemies: [
        { id: "enemy-tri-face", name: "Tri-Face", notes: "Fixed encounter floor 1; drops Curse Spike — FARM here; draws Pain/Flare" },
        { id: "enemy-grendel", name: "Grendel", notes: "Fixed encounter floor 2; mug Dragon Fin; draws Firaga/Blizzaga" },
        { id: "enemy-behemoth", name: "Behemoth", notes: "Fixed encounter floor 3; mug Barrier" },
        { id: "enemy-ruby-dragon", name: "Ruby Dragon", notes: "Fixed encounter floor 4; draws Flare/Meteor; mug Inferno Fang" },
        { id: "enemy-iron-giant", name: "Iron Giant", notes: "Fixed encounter floor 5 (× 2); draws Haste/Quake; mug Star Fragment" },
      ],
    },
  ],
  'd3-siege-of-esthar': [
    {
      area: "Lunatic Pandora Interior (all enemies Lv1 — use LV Up)",
      enemies: [
        { id: "enemy-forbidden", name: "Forbidden", notes: "Draws Death, Zombie, Stop, Blind; use LV Up to scale draw list; mug Dead Spirit", lvMin: 1, lvMax: 1 },
        { id: "enemy-esthar-soldier", name: "Esthar Soldier", notes: "Draws full elemental tier; mug Potion", lvMin: 1, lvMax: 1 },
      ],
    },
  ],
  'd3-lunar-base': [
    {
      area: "Ragnarok (Propagator encounters)",
      enemies: [
        { id: "enemy-malboro", name: "Propagator (Malboro proxy)", notes: "Color-coded pairs; must defeat matched color consecutively; Sleep/Blind/Death all work; mug Wizard Stone" },
      ],
    },
  ],
  'd3-ragnarok': [
    {
      area: "Cactuar Island",
      enemies: [
        { id: "enemy-cactuar", name: "Cactuar", notes: "20 AP per fight — best AP rate in game; draws Haste; mug Cactus Thorn; remove Mug before Jumbo Cactuar fight (Gaea's Ring drop > mug)" },
      ],
    },
    {
      area: "Deep Sea Research Center (fixed encounters)",
      enemies: [
        { id: "enemy-tri-face", name: "Tri-Face", notes: "Floor 1 fixed; Curse Spike farm — 100 Spikes = 1 Dark Matter; draws Pain/Flare" },
        { id: "enemy-grendel", name: "Grendel", notes: "Floor 2 fixed; Dragon Fin mug" },
        { id: "enemy-behemoth", name: "Behemoth", notes: "Floor 3 fixed; Barrier mug" },
        { id: "enemy-ruby-dragon", name: "Ruby Dragon", notes: "Floor 4 fixed; Flare/Meteor draws; Inferno Fang mug" },
        { id: "enemy-iron-giant", name: "Iron Giant", notes: "Floor 5 fixed (× 2); Haste draw; Star Fragment mug" },
      ],
    },
    {
      area: "Island Closest to Hell (fixed Lv100)",
      enemies: [
        { id: "enemy-behemoth", name: "Behemoth", notes: "Lv100; Flare/Tornado/Regen draws; Barrier mug", lvMin: 100, lvMax: 100 },
        { id: "enemy-ruby-dragon", name: "Ruby Dragon", notes: "Lv100; Meteor draws; Inferno Fang mug", lvMin: 100, lvMax: 100 },
        { id: "enemy-malboro", name: "Malboro", notes: "DANGER: Bad Breath; use Enc-None or junction Sleep to St-Def to prevent", lvMin: 100, lvMax: 100 },
        { id: "enemy-iron-giant", name: "Iron Giant", notes: "Lv100; Haste/Quake; Star Fragment mug", lvMin: 100, lvMax: 100 },
        { id: "enemy-blue-dragon", name: "Blue Dragon", notes: "Draws Death, Bio, Drain, Break; mug Fury Fragment (→ Aura magic → 50 via Fire Mag-RF)", lvMin: 100, lvMax: 100 },
      ],
    },
    {
      area: "Island Closest to Heaven (fixed Lv100)",
      enemies: [
        { id: "enemy-cactuar", name: "Cactuar", notes: "Lv100; 20 AP; Haste draw", lvMin: 100, lvMax: 100 },
        { id: "enemy-tri-face", name: "Tri-Face", notes: "Lv100; Pain/Flare; Curse Spike mug", lvMin: 100, lvMax: 100 },
        { id: "enemy-forbidden", name: "Forbidden", notes: "Lv100; Death/Ultima draws; Dead Spirit mug", lvMin: 100, lvMax: 100 },
      ],
    },
  ],
  'd3-back-on-earth': [
    {
      area: "Time Compression Void (limited world access)",
      enemies: [
        { id: "enemy-ruby-dragon", name: "Ruby Dragon", notes: "Centra portal area; Flare/Meteor; Inferno Fang mug" },
        { id: "enemy-malboro", name: "Malboro", notes: "DANGER: Bad Breath; mug Malboro Tentacle" },
      ],
    },
  ],
  'd3-the-final-mission': [
    {
      area: "Lunatic Pandora Final Assault (all enemies Lv1 — use Tonberry LV Up)",
      enemies: [
        { id: "enemy-forbidden", name: "Forbidden", notes: "Draws Death/Zombie/Stop; scale with LV Up for better draws; mug Dead Spirit", lvMin: 1, lvMax: 1 },
        { id: "enemy-esthar-soldier", name: "Esthar Soldier", notes: "Draws fire/ice/thunder/cure up to -ga tiers when leveled up", lvMin: 1, lvMax: 1 },
      ],
    },
  ],
  'd4-ultimecia-castle': [
    {
      area: "Ultimecia's Castle — Random Encounters",
      enemies: [
        { id: "enemy-forbidden", name: "Forbidden", notes: "Draws Death, Zombie, Stop, Blind; mug Dead Spirit" },
        { id: "enemy-armadodo", name: "Armadodo", notes: "Draws Protect, Shell, Quake; mug Turtle Shell; **Roll Attack** 100% Critical; can fall over after physical hit (Vit/Spr ×50% for 4 turns) then rise again — exploit the fallen phase with magic" },
        { id: "enemy-imp", name: "Imp", notes: "Draws Blind, Silence, Break, Confuse; mug Poison Powder" },
        { id: "enemy-behemoth", name: "Behemoth", notes: "Draws Flare, Tornado, Regen; mug Barrier" },
        { id: "enemy-tri-face", name: "Tri-Face", notes: "Draws Pain, Flare, Slow; mug Curse Spike — continue farming" },
        { id: "enemy-jelleye", name: "Jelleye", notes: "Draws all elemental tiers (Fire/Ice/Thunder/Wind up to -ga); mug Healing Water" },
        { id: "enemy-iron-giant", name: "Iron Giant", notes: "Draws Haste, Quake, Shell, Reflect; mug Star Fragment" },
        { id: "enemy-red-bat", name: "Red Bat", notes: "Draws Drain; mug Vampire Fang" },
        { id: "enemy-hexadragon", name: "Hexadragon", notes: "Grand Hall & Storage Room areas; draws Firaga/Dispel/Shell/Protect (Lv30+); absorbs Fire & Poison; weak to Water; mug Red Fang (8x at Lv30+)" },
        { id: "enemy-malboro", name: "Malboro", notes: "Wine Cellar area (7.5% chance); draws Bio/Demi/Quake (Lv30+); Bad Breath inflicts all statuses at once — have status protection ready; mug Malboro Tentacle" },
        { id: "enemy-tonberry", name: "Tonberry", notes: "Passageway area (Screen 17); draws Death; mug & drop Chef's Knife (Tonberry compatibility item for Tonberry GF)" },
        { id: "enemy-elnoyle", name: "Elnoyle", notes: "Prison Cell & Chapel areas; draws Pain/Double (all levels), Holy (Lv40+); mug Moon Stone; **drops Energy Crystal at Lv30+** — at Lv40+ all drop slots are Energy Crystal, making this the best Pulse Ammo source in Disc 4 (Leviathan's Ammo-RF: 2 Energy Crystal → 1 Pulse Ammo)" },
        { id: "enemy-adamantoise", name: "Adamantoise", notes: "Fountain Square area; draws Blizzaga/Shell/Protect/Reflect (Lv30+); mug Orihalcon (Lv30+); weak to Thunder & Earth; **drops Adamantine at Lv30+** (all 4 drop slots) — needed for Lion Heart and Ehrgeiz" },
        { id: "enemy-grand-mantis", name: "Grand Mantis", notes: "Multiple areas (Screens 16, 17, 25); draws Water/Esuna/Life (Life at Lv30+); weak to Ice & Thunder; mug Sharp Spike (8x at Lv30+) — efficient source for Save the Queen and Cardinal crafting" },
        { id: "enemy-blobra", name: "Blobra", notes: "Main Hall & Passageway areas; draws Shell (all levels), Reflect/Blind/Confuse (Lv30+); has random elemental weakness each encounter (up to ×7) — Scan or rotate elements to exploit it; mug Rune Armlet (5.8%+4.7% chance at Lv30+); 4× Blobra Cards → Card Mod → 1× Rune Armlet (teaches GF Spr+20%); **Sticky Icky** attack inflicts Slow — junction Slow resistance to St.Def-J" },
      ],
    },
  ],
}

// ─── Reference / User Manual chapters (disc: 0, shown above Disc 1) ──────────
// These chapters provide quick-reference data for game mechanics, status effects,
// junctions, SeeD ranks, Triple Triad rules, and GF system details.
export const REFERENCE_CHAPTERS = [
  {
    id: 'r0-about',
    title: 'About This Guide',
    disc: 0,
    content: `This is a full-game companion for **Final Fantasy VIII Remastered**, built around a single playthrough that captures every achievement, missable, rare card, and GF. Everything is cross-referenced — decisions in Disc 1 that matter in Disc 4 are flagged the moment they become relevant.

{{CALLOUT:note|How to navigate}} Use the **chapter list in the sidebar** (or the menu button on mobile) to move through the walkthrough. The guide is split into four discs plus this Reference section, which sits above Disc 1. Tabs across the top (or the bottom bar on mobile) switch between the main views.

{{CALLOUT:note|Guide}} The walkthrough itself. Each chapter contains step-by-step instructions, boss cards with stats and draw lists, encounter tables for each area, local visual aids, and inline callout cards for anything that benefits from special attention. Work through these in order.

{{CALLOUT:note|Checklist}} Every achievement and missable pulled out into a single scrollable list, grouped by disc. Useful for a quick scan of what is still outstanding mid-game or after finishing a chapter.

{{CALLOUT:note|Cards}} The full 110-card Triple Triad collection with acquisition notes. Cards you have checked off are shown as collected. The Queen of Cards quest and rare-card locations are covered in the walkthrough, but this view lets you see the whole picture at a glance.

{{CALLOUT:note|Guardian Forces}} All 16 GFs with their draw locations, ability lists, and recommended learn orders. Abilities with a junction value (like Spr-J or Spd-J) are noted so you can prioritise accordingly.

{{CALLOUT:note|Refine}} Every refinement recipe organised by GF ability. Use this when you have items you do not recognise or when you want to know what a material converts into.

{{CALLOUT:note|Items / Bestiary}} Item and weapon databases, and an enemy reference with HP ranges, elemental affinities, draw lists, mug items, and card drops.

{{CALLOUT:note|Story, Lore & Music}} Spoiler-gated plot recap, lore glossary, and soundtrack reference material live in the Reference section so optional context stays findable without interrupting the walkthrough.

{{CALLOUT:note|Callout cards}} Typed cards appear inline throughout the walkthrough. Missables, achievements, perfect-game requirements, sidequests, card-rule work, shops, controls, enemy intel, mechanics, draw points, points of interest, hints, warnings, and spoilers each receive their own visual treatment so the page can be scanned quickly without losing detail.

{{CALLOUT:note|Search}} Press **⌘K** (or **Ctrl+K** on Windows) from anywhere to search across chapters, enemies, cards, GFs, items, and refinement recipes. Selecting a result takes you straight to the relevant view.

{{CALLOUT:note|Progress}} Checkboxes on achievement and missable cards save to your browser. Clearing site data resets them. Nothing is sent anywhere — everything lives locally.

{{CALLOUT:note|Steam achievements — start tracking from the very beginning of the game}} Several cumulative achievements span the entire playthrough and are easy to neglect. **Achievement: 100 Kills** and **Achievement: 1,000 Kills** — defeat 100 and 1,000 enemies respectively with party-member attacks (GF summon kills do not count). Both come naturally for most players; if a shortfall remains after all other content is done, farm in the forest near Dollet where every encounter is three weak enemies. Track progress through Tutorial → Information → Battle Report (requires the Battle Meter item from Cid). **Achievement: Magician** — use the Draw command on enemies and choose "Stock" 100 times total. The "Use" option does not count; every draw must go to stock. Assign the Draw command junction to at least one party member from the start and draw on every new enemy encountered. **Achievement: Magic Miner** — draw from field draw points 100 times. Stock every visible and hidden draw point encountered; draw points recharge over time — the amount available at a depleted draw point scales with how long has passed since it was last drawn, so returning to an emptied draw point after more real-time (or more in-game events) yields more spells than revisiting immediately. If the count falls short late in the game, the Island Closest to Hell on Disc 3 holds 31 draw points and is the fastest cleanup spot. **Achievement: Top Rank** — reach SeeD Rank A by passing all 30 written SeeD tests (Tutorial → TEST, capped at Squall's current level). Full answer tables are in the SeeD Exam chapter. **Achievement: Card Player** — simply win one game of Triple Triad; will happen naturally at any point. **Achievement: Handyman** — upgrade any weapon at a Junk Shop once; happens naturally as soon as the first crafting materials are collected. **Remastered booster features**: FF8 Remastered includes three optional boosters that can be toggled at any time. On PC/Steam: **F1** = Battle Assist (HP/ATB always full, Limit Breaks always available), **F2** = No Encounters (random battles disabled), **F3** = Speed ×3. On consoles: access through the in-game booster button (varies by platform — check the in-game menu). **None of these disable Steam/console achievements**, so they are safe to use on a completion run. However, enabling the separate **in-game Cheats option** (Config/Game menu) permanently disables achievement tracking for that save file — do not activate it on any achievement-focused run. **Chocobo World** is also fully integrated into the Remastered version — accessible from the main menu — and was previously unavailable in Western releases of the original game.`,
  },
  {
    id: 'r0-controls-interface',
    title: 'Controls & Interface',
    disc: 0,
    content: `Controls below map the original PlayStation labels to modern controller, keyboard, and mobile layouts.

{{CALLOUT:controls|World Map Controls}}
| Original PSX Action | PlayStation | Xbox (One/Series X\\|S) | Nintendo Switch | PC Keyboard | Mobile (iOS/Android) |
|---|---|---|---|---|---|
| X: Examine / Confirm / Exit Vehicle | X | A | B | X | On-screen Action Icon |
| Circle: Enter Menu or Cockpit | Circle | B | A | V | Menu / Cockpit Icon |
| Square: Move Vehicle Forward | Square | X | Y | W / Up Arrow | Forward Arrow Icon |
| Triangle: Cancel | Triangle | Y | X | C | Cancel Icon |
| Start: Pause | Options | Menu | + (Plus) | A | Pause Button |
| Select: Toggle Map | Touchpad / Share | View | - (Minus) | J | Map Toggle Icon |
| D-Pad / Left Stick: Move / Steer | D-Pad / Left Stick | D-Pad / Left Stick | D-Pad / Left Stick | Arrow Keys | Virtual Joystick |
| L1 / R1: Rotate Camera | L1 / R1 | LB / RB | L / R | Q / E | Camera Rotation Arrows |
| L2 / R2: Change Camera Angle | L2 / R2 | LT / RT | ZL / ZR | Page Up / Down | Camera Angle Toggle |

{{CALLOUT:controls|Field Controls}}
| Original PSX Action | PlayStation | Xbox (One/Series X\\|S) | Nintendo Switch | PC Keyboard | Mobile (iOS/Android) |
|---|---|---|---|---|---|
| X: Talk / Examine / Confirm | X | A | B | X | Tap Character / Action Icon |
| Circle: Enter Menu | Circle | B | A | V | Menu Icon |
| Square: Card Challenge / Talk | Square | X | Y | S | Card Icon Overlay |
| Triangle: Cancel | Triangle | Y | X | C | Cancel Icon |
| Start: Pause | Options | Menu | + (Plus) | A | Pause Button |
| Select: No Function | No Function | No Function | No Function | No Function | No Function |
| D-Pad / Left Stick: Move Character | D-Pad / Left Stick | D-Pad / Left Stick | D-Pad / Left Stick | Arrow Keys | Virtual Joystick |
| L1 / R1: No Function | No Function | No Function | No Function | No Function | No Function |
| L2 / R2: No Function | No Function | No Function | No Function | No Function | No Function |

{{CALLOUT:controls|Battle Controls}}
| Original PSX Action [1] | PlayStation | Xbox (One/Series X\\|S) | Nintendo Switch | PC Keyboard | Mobile (iOS/Android) |
|---|---|---|---|---|---|
| X: Confirm Selected Command | X | A | B | X | Tap Command / Confirm Icon |
| Circle: Next Active Character | Circle | B | A | V | Next Character Toggle |
| Square: Target Status Details | Square | X | Y | S | Status Info Button |
| Triangle: Cancel | Triangle | Y | X | C | Cancel Action Button |
| Start: Pause | Options | Menu | + (Plus) | A | Pause Button |
| Select: Hide Battle Menu | Touchpad / Share | View | - (Minus) | J | Hide UI Button |
| D-Pad / Left Stick: Move Cursor | D-Pad / Left Stick | D-Pad / Left Stick | D-Pad / Left Stick | Arrow Keys | Tap Target or Virtual D-Pad |
| R1: Gunblade Trigger Timing | R1 | RB | R | G | On-Screen Trigger Button |
| L2 + R2: Escape Battle (Hold) | L2 + R2 | LT + RT | ZL + ZR | F + D | Escape Icon Button |

{{CALLOUT:controls|Remaster-Exclusive Booster Controls}}
| Booster Function | PlayStation | Xbox (One/Series X\\|S) | Nintendo Switch | PC Keyboard | Mobile (iOS/Android) |
|---|---|---|---|---|---|
| 3x Speed Mode | Click Left Stick (L3) | Click Left Stick (LS) | Click Left Stick | F1 | On-screen Speed Icon |
| Battle Assist | Click Right Stick (R3) | Click Right Stick (RS) | Click Right Stick | F2 | On-screen HP/ATB Icon |
| No Encounters | L3 + R3 (Both Sticks) | LS + RS (Both Sticks) | Both Sticks | F3 | On-screen Safe Icon |

{{CALLOUT:controls|Gunblade timing}} Squall and Seifer do not roll normal weapon critical hits. Press R1 during the attack impact window to add the gunblade trigger bonus. The same timing applies to each Renzokuken strike; automatic trigger timing can be enabled from Squall's status screen, but manual timing is more reliable once learned.

{{CALLOUT:controls|Triple Triad shortcut}} Square is the field prompt used to challenge eligible NPCs to cards. If Square instead talks or examines, the NPC or object is not currently accepting a card challenge from that position.

{{CALLOUT:controls|Menu and interface notes}} Junction changes, GF ability targets, Card Mod, refinement abilities, SeeD tests, Battle Report, Tutorial entries, and booster settings all live in the in-game menu. The app's search and checklist systems are separate local tools and do not modify the save file.`,
  },
  {
    id: 'r0-shop-reference',
    title: 'Shop Reference',
    disc: 0,
    content: `Shop inventories matter because several late-game conveniences depend on physically visiting shops before Disc 4 and because Tonberry's Familiar and Call Shop abilities change what can be bought.

{{CALLOUT:shop|General Item Shops}} Potion (100 Gil), Hi-Potion (500 Gil), Phoenix Down (500 Gil), Antidote (100 Gil), Eye Drops (100 Gil), Soft (100 Gil), Echo Screen (100 Gil), Holy Water (100 Gil), Remedy (1,000 Gil), Tent (1,000 Gil), Fuel (3,000 Gil), Normal Ammo (20 Gil), Shotgun Ammo (40 Gil), G-Potion (200 Gil), G-Returner (500 Gil), G-Hi-Potion (600 Gil; Familiar required)

{{CALLOUT:shop|General shop locations}} Balamb, Dollet, Timber, Deling City, Winhill, Fisherman's Horizon, Balamb Garden's mobile shop, and several temporary merchants share the standard stock. These shops are the core source for Remedy, Tents, Fuel, basic ammo, and GF recovery items.

{{CALLOUT:shop|Timber Pet Shop}} Pet Pals Vol. 3 (1,000 Gil), Pet Pals Vol. 4 (1,000 Gil), Magic Scroll (5,000 Gil), GF Scroll (5,000 Gil), Draw Scroll (5,000 Gil), Item Scroll (5,000 Gil), HP-J Scroll (10,000 Gil; Familiar required), Str-J Scroll (10,000 Gil; Familiar required), Vit-J Scroll (10,000 Gil; Familiar required), Mag-J Scroll (10,000 Gil; Familiar required), Spr-J Scroll (10,000 Gil; Familiar required)

{{CALLOUT:shop|Esthar Shop}} Standard recovery items plus Dark Ammo (300 Gil), Fire Ammo (500 Gil), G-Hi-Potion (600 Gil), Demolition Ammo (800 Gil; Familiar required), and Fast Ammo (100 Gil; Familiar required). Buy at least one Dark Ammo and one Fire Ammo here if Irvine has not unlocked those Shot types.

{{CALLOUT:shop|Esthar Shop!!!}} X-Potion (5,000 Gil), Mega-Potion (10,000 Gil), Mega Phoenix (10,000 Gil), Elixir (50,000 Gil), Cottage (1,800 Gil). With Familiar, this is the cleanest bulk source for Elixirs and Cottages; buy 5 Elixirs for PuPu and use Cottages for the Tent/Cottage/Mega-Potion Gil loop.

{{CALLOUT:shop|Esthar Book Store}} Weapons Monthly March (1,000 Gil), Weapons Monthly April (1,000 Gil), Weapons Monthly May (1,000 Gil), Weapons Monthly June (1,000 Gil), Weapons Monthly July (1,000 Gil), Weapons Monthly August (1,000 Gil), Weapons Monthly 1st (50,000 Gil; Familiar required), Combat King 001 (1,000 Gil), Combat King 002 (1,000 Gil), Combat King 003 (1,000 Gil), Combat King 004 (1,000 Gil; Familiar required), Combat King 005 (30,000 Gil; Familiar required), Occult Fan I (35,000 Gil; Familiar required), Occult Fan II (35,000 Gil; Familiar required)

{{CALLOUT:shop|Esthar Pet Shop}} Pet Pals Vol. 5 (1,000 Gil), Pet Pals Vol. 6 (1,000 Gil), Amnesia Greens (1,000 Gil), HP-J Scroll (10,000 Gil), Str-J Scroll (10,000 Gil), Vit-J Scroll (10,000 Gil), Mag-J Scroll (10,000 Gil), Spr-J Scroll (10,000 Gil), Giant's Ring (20,000 Gil; Familiar required), Power Wrist (20,000 Gil; Familiar required), Force Armlet (20,000 Gil; Familiar required), Hypno Crown (20,000 Gil; Familiar required)

{{CALLOUT:shop|Call Shop prerequisite}} Tonberry's Call Shop only reaches shops the party has physically entered. Visit every Esthar shop during Disc 3, including the normally stubborn Shop!!! and Cheryl's free-gift shop, before the route proceeds to Disc 4.

{{CALLOUT:shop|Junk Shops}} Weapon upgrades can be crafted at any Junk Shop as soon as the required materials are in inventory. Weapons Monthly magazines reveal recipes in-game but are not required for the shop to list the weapon. Use the Items view or weapon chains in the walkthrough for exact material requirements.`,
  },
  {
    id: 'r0-sidequest-index',
    title: 'Sidequest & Completion Index',
    disc: 0,
    content: `This index collects the optional and completion-critical routes that are otherwise woven into the chronological walkthrough. Use the walkthrough for exact timing; use this page to confirm nothing major has been overlooked.

{{CALLOUT:sidequest|Disc 1 sidequests}} - **MiniMog Card**: Challenge the running boy in Balamb Garden before leaving early-game Garden access.
- **Quistis Card**: Win from a Trepie fan in the Cafeteria.
- **Zell Love Quest**: Speak to the Library Girl with pigtails at each required window; final reward path leads to Combat King 003.
- **The Novice SeeD Candidates**: Speak to the three Cafeteria candidates across all five windows, keep talking until their dialogue repeats, then return after Trabia Canyon for the payoff scene.
- **Queen of Cards setup**: Lose MiniMog, Sacred, Chicobo, Alexander, and Doomtrain at the correct stages to unlock Kiros, Irvine, Chubby Chocobo, Doomtrain, and Phoenix cards.
- **Timber Journalist**: Encourage the journalist on Disc 1, then return on Disc 2 for the Pet Nametag.
- **Dollet Pub / Bone quest**: Complete Dollet's optional interactions and magazine/card-player rewards when the town opens.

{{CALLOUT:sidequest|Disc 2 sidequests}} - **D-District Prison prizes**: Collect floor items, Pet Nametag, Combat King 001, Character Report, and rare card-player rewards before escaping.
- **Master Fisherman**: Complete the FH fisherman route for SeeD Exp and unique scenes.
- **CC Group**: Defeat Jack, Joker, Club, Diamond, Spade, Heart, and King before the end of Disc 3 so they appear on the Ragnarok in Disc 4.
- **Centra Ruins**: Obtain Odin and Tonberry; decide whether Odin's random instant-kill risk fits the run before taking him.
- **Shumi Village**: Complete the sculptor/stone quest and revisit for later rewards.
- **Chocobo Forests**: Solve each forest and use the visual aids in the Disc 2 open-world chapter for exact Chicobo placements.
- **Winhill revisited**: Complete the vase-piece route and collect optional rewards.

{{CALLOUT:sidequest|Disc 3 sidequests}} - **Doomtrain**: Collect Solomon Ring, 6 Remedy+, 6 Steel Pipe, and 6 Malboro Tentacle, then use the ring.
- **Cactuar**: Defeat Jumbo Cactuar on Cactuar Island to obtain the GF.
- **Deep Sea Research Center**: Obtain Bahamut, then descend for Eden and Ultima Weapon; leave Ultima Weapon alive if using the fixed Tri-Face encounters for endgame Luck Up farming.
- **Obel Lake**: Complete the shadow/monkey/stone-inscription route and claim the Minde Isle reward.
- **PuPu**: Witness all UFO events, fight the UFO, then bring 5 Elixirs and the Item command to the Balamb crater encounter.
- **Esthar shops**: Enter every shop at least once before Disc 4 so Call Shop can reach them later.
- **Timber Maniacs**: Collect all 12 magazines before final access windows close.

{{CALLOUT:sidequest|Disc 4 completion checks}} - **Ultimecia's Castle**: Defeat all eight seal guardians, solve the treasure-vault and clock-gallery puzzles, and recover commands in an order that supports your party.
- **Omega Weapon**: Ring the chapel-side bell with the reserve party, switch to the primary party, and fight Omega before the timer expires.
- **Rare-card cleanup**: If the CC Group was completed, recover or farm rare cards from the Ragnarok group in Disc 4.
- **Perfect-game preparation**: Confirm all GFs, cards, magazines, shops, fixed treasures, missables, and stat-maxing prerequisites before the final save.`,
  },
  {
    id: 'r0-characters',
    title: 'Character Reference',
    disc: 0,
    content: `{{CALLOUT:character|Squall — character stat reference}} Squall begins at Lv 7 (the party's starting level). His stats grow evenly across Str, Vit, and Mag with modest Spr. Key milestones from the source data: Lv 7 — HP 486, Str 6, Vit 6, Mag 6, Spr 5, Spd 21, Luck 16 · Lv 20 — HP 1044, Str 15, Vit 14, Mag 15, Spr 13, Spd 24 · Lv 50 — HP 2281, Str 32, Vit 28, Mag 31, Spr 26, Spd 29 · Lv 100 — HP 4187, Str 47, Vit 41, Mag 45, Spr 36, Spd 37, Luck 22. Squall's Str and Mag both cap at similar values making him moderately flexible for hybrid junctions, though Str-J is his primary damage driver. His Spd grows steadily and hits 37 at Lv 100 — matching Selphie, ahead of Rinoa (36), Zell (35), and Quistis (34), but behind Irvine (39) at endgame. **Weapon note**: Squall's gunblades give 255% Hit accuracy, ensuring physical attacks never miss — this partially compensates for his inability to generate critical hits through normal means. Each tier of gunblade upgrade unlocks one additional Renzokuken finishing move: Revolver (Rough Divide only) → Shear/Cutting Trigger (adds Fated Circle) → Flame/Twin Lance/Punishment (adds Blasting Zone) → Lion Heart (adds Lion Heart finisher). Squall's **GF compatibility** starts at approximately 600 with each GF — standard for any party member. No compatibility bonuses or penalties unique to Squall are documented; his compatibility is managed through normal GF usage.

{{CALLOUT:character|Zell — character stat reference}} Zell starts at Lv 7 when he joins in the SeeD exam. His base stats at key levels: Lv 7 — HP 544, Str 7, Vit 5, Mag 6, Spr 4, Spd 21, Luck 15 · Lv 20 — HP 1035, Str 16, Vit 12, Mag 14, Spr 9, Spd 23 · Lv 50 — HP 2212, Str 32, Vit 25, Mag 29, Spr 20, Spd 28 · Lv 100 — HP 4018, Str 47, Vit 33, Mag 42, Spr 27, Spd 35, Luck 20. Zell's Str tops out at 47, equal to Squall, with high-tier HP. His Spr is notably low throughout the game — prioritize Spr-J spells on him to compensate. His Spd sits mid-range (35 at Lv 100) and benefits from Auto-Haste or Spd-J. **Weapon note**: Zell's Gloves can generate regular critical hits dealing 2× damage, based on Luck. **GF compatibility**: No character-specific compatibility modifiers; compatibility is managed through normal GF summoning habits. **Seifer — character stat reference** (temporary party member): Seifer joins briefly during the SeeD exam and uses the Hyperion gunblade. His Limit Break (Fire Cross / No Mercy) triggers at HP ≤84% — far higher than the 32% threshold for all other characters. Base stats at selected levels: Lv 10 — HP 821, Str 10, Vit 8, Mag 9, Spr 10, Spd 18, Luck 13 · Lv 30 — HP 1980, Str 23, Vit 19, Mag 21, Spr 20, Spd 24 · Lv 100 — HP 5823, Str 48, Vit 39, Mag 45, Spr 38, Spd 45, Luck 19. Seifer has the highest HP of any character in the game at equivalent levels by a significant margin. Like Squall, Seifer's gunblade cannot generate critical hits through normal means — only the R1 trigger bonus applies. His limit break attack (No Mercy) is an AoE physical at power 80.

{{CALLOUT:character|Zell's Duel Limit Break — overview}} When the Duel command appears, a timed input window opens during which players enter button sequences to land hits on the targeted enemy. The time window and starting move both depend on Zell's Crisis Level — at CL1 and CL2 he starts with Punch Rush (Circle, X) and has about 4.7 and 6.7 seconds respectively; at CL3 and CL4 he starts with Booya (Right, Left) and has 9.3 or 12 seconds. The four foundational inputs available from the start are Punch Rush (Circle, X) for 16 base power, Booya (Right, Left) for 18, Heel Drop (Up, Down) for 20, and Mach Kick (Left, Left, Circle) for 24. Dolphin Blow (L1, R1, L1, R1 — 28 base power, unlocked by Combat King 001 from D-District Prison) and the percentage-damage Meteor Strike (Down, Circle, Up, Circle — deals 25% of the enemy's current HP, capped at 9,999; unlocked by Combat King 002) extend the repertoire. Five finishing moves end the Duel immediately: Burning Rave (Down×4, Circle, 48 base power, AoE, available from the start), Meteor Barret (Up, X, Down, Triangle, Circle, 52 power, single-target, Combat King 003), Different Beat (Triangle, Square, X, Circle, Up, 72 power, Combat King 004), and My Final Heaven (Up, Right, Down, Left, Triangle, 50 power, AoE, Combat King 005). Reading a Combat King magazine only reveals the button inputs on-screen — the moves can be executed at any point regardless of whether the magazine has been read. For sustained damage, rapidly looping Punch Rush into Booya (or Booya into Heel Drop) throughout the full time window before closing with a finisher at the last moment deals more total damage than rushing to a finisher early. Full input details and finisher paths appear again in the D-District Prison chapter when Combat King 001 first becomes available.

{{CALLOUT:character|Quistis — character stat reference}} Quistis begins at Lv 8 (joined in the opening chapter). Key stats: Lv 8 — HP 501, Str 7, Vit 5, Mag 6, Spr 6, Spd 20, Luck 15 · Lv 20 — HP 980, Str 15, Vit 11, Mag 14, Spr 13, Spd 22 · Lv 50 — HP 2127, Str 31, Vit 23, Mag 29, Spr 26, Spd 27 · Lv 100 — HP 3883, Str 46, Vit 30, Mag 42, Spr 34, Spd 34, Luck 21. Quistis has the lowest HP growth of the main six characters and her Str caps at 46 — one point below Squall and Zell. Her Spr is stronger than Zell's and grows comparably to Squall's. Her Mag growth is competitive with Squall's and Zell's — she is not primarily a magic attacker in base stats, but Blue Magic scales from Crisis Level and not Mag, so her Blue Magic value is independent of her base Mag stat. Her Spd ties with Irvine at Lv 100. **Weapon note**: Quistis's Chain Whips generate normal critical hits (2× damage) based on Luck — unlike Squall's gunblade. **GF compatibility**: No unique modifiers. Prioritize learning Blue Magic items as soon as GF AP allows; Blue Magic is her primary unique contribution. **Quistis Blue Magic power reference (by Crisis Level)**: All Blue Magic except White Wind, LV?Death, Degenerator, Bad Breath, and Mighty Guard deal damage scaled by CL — higher CL = higher output. Power values: Laser Eye (single, magic) CL1 40/CL2 48/CL3 58/CL4 64 · Ultra Waves (AoE, magic) 27/33/40/48 · Electrocute (AoE, Thunder) 30/36/44/50 · Aqua Breath (AoE, Water) 50/70/80/100 · Micro Missiles (single, %HP: 50/75/87.5/93.75% of current HP, max 9,999) · Acid (single, magic) 30/38/44/52 plus status by CL · Gatling Gun (single, physical) 60/80/100/120 · Fire Breath (AoE, Fire) 70/90/100/120 · Homing Laser (single, magic) 100/150/200/250 · Ray Bomb (AoE, magic) 80/90/100/110 · Shockwave Pulsar (AoE, magic) 150/200/200/250 — can exceed the 9,999 damage cap. White Wind recovery = Quistis max HP minus current HP; keep Quistis near death for maximum healing. LV?Death divisor: CL1 kills enemies whose level ÷4 = 0, CL2 ÷3, CL3 ÷2 (all even-level), CL4 kills every enemy. **Quistis Blue Magic — how to teach each skill**: Use the listed item directly on Quistis from the Item menu outside of battle to unlock that ability. Laser Eye is available by default with no item required. Item sources are listed in priority order (most accessible first).
- **Laser Eye**: Default (no item needed)
- **Ultra Waves**: Spider Web — mug or win from Caterchipillar, or Card Mod Caterchipillar Card (1:1)
- **Electrocute**: Coral Fragment — mug from Creeps; win from Cockatrice, Creeps, or Blitz; Card Mod Creeps Card (1:1)
- **LV?Death**: Curse Spike — mug from Tri-Face; win from Malboro, Forbidden, Imp, Grand Mantis, Tri-Face; Card Mod Tri-Face Card (1:1)
- **Degenerator**: Black Hole — mug or win from Gesper; win from Wendigo; Card Mod Gesper Card (1:1) or Diablos Card (1:100)
- **Aqua Breath**: Water Crystal — mug from Fastitocalon; win from Fastitocalon-F, Chimera, or Grand Mantis; Card Mod Fastitocalon-F Card (5:1) or Fastitocalon Card (1:1)
- **Micro Missiles**: Missile — mug from GIM52A or Death Claw; win from GIM52A
- **Acid**: Mystery Fluid — mug or win from Gayla; Card Mod Gayla Card (1:1)
- **Gatling Gun**: Running Fire — mug from SAM08G; win from Iron Giant, BGH251F2, or SAM08G; Card Mod SAM08G Card (1:1)
- **Fire Breath**: Inferno Fang — mug from Ruby Dragon; win from Hexadragon or Ruby Dragon; Card Mod Ruby Dragon Card (10:1)
- **Bad Breath**: Malboro Tentacle — mug or win from Malboro; Card Mod Malboro Card (4:1)
- **White Wind**: Whisper — mug or win from Adamantoise
- **Homing Laser**: Laser Cannon — mug from Elastoid or Mobile Type 8; win from Belhelmel, Elastoid, or Mobile Type 8
- **Mighty Guard**: Barrier — mug or win from Behemoth; Card Mod Malboro Card (10:1)
- **Ray Bomb**: Power Generator — rare mug from Blitz only (use Mug repeatedly)
- **Shockwave Pulsar**: Dark Matter — refine 100× Curse Spike via Siren's Tool-RF (requires Siren at Lv 100)
**Selphie — character stat reference**: Selphie begins at Lv 8. Key stats: Lv 8 — HP 482, Str 6, Vit 5, Mag 10, Spr 7, Spd 17, Luck 19 · Lv 20 — HP 937, Str 14, Vit 10, Mag 17, Spr 13, Spd 20 · Lv 50 — HP 2024, Str 30, Vit 21, Mag 32, Spr 27, Spd 26 · Lv 100 — HP 3680, Str 45, Vit 28, Mag 49, Spr 38, Spd 37, Luck 26. Selphie has the lowest base Spd of any party member (17 at Lv 8, 37 at Lv 100 — same final value as Squall), the highest base Luck of the core six (19 → 26), and the second-highest Mag growth of the six at 49 (behind Rinoa who caps at 63). She has modest HP for a support character. Her strength is the Slots Limit Break's unique spells, not raw stat output. **Weapon note**: Selphie's Nunchaku generate normal critical hits based on Luck. With Luck at 26 she has the best critical-hit rate of the six main characters naturally.

{{CALLOUT:character|Selphie's Slots Limit Break — intro}} Selphie's Limit Break is unlike every other character's in that she does not execute a predetermined attack. When the Slots command appears, a random magic spell is displayed from a pool that includes all 49 junctionable spells plus four exclusive abilities unique to Selphie — Full-Cure (restores all allies to maximum HP and clears negative statuses, but instantly KOs any ally under Zombie status), Wall (applies Protect and Shell to the entire party), Rapture (removes all non-immune enemies from battle permanently, with the same immunity list as Degenerator), and The End (kills all non-Undead, non-immune enemies outright, including most bosses, by reducing the current form's HP to zero and immediately triggering the next form if one exists). Selphie can press a button to cycle to a new spell or accept the current one. The selection pool is weighted by Crisis Level — higher CL makes stronger spells like Ultima and The End appear more frequently. CL also controls how many times the selected spell fires: between one and three casts for normal magic (higher CL increases the frequency of both stronger spells and the three-cast outcome), always exactly one cast for the four unique moves. Apocalypse never appears in Slots regardless of CL or stock.

{{CALLOUT:character|Rinoa — character stat reference}} Rinoa joins at Lv 11 at the start of the Timber mission. Key stats: Lv 11 — HP 653, Str 11, Vit 5, Mag 15, Spr 9, Spd 22, Luck 17 · Lv 20 — HP 1038, Str 19, Vit 10, Mag 22, Spr 14, Spd 24 · Lv 50 — HP 2275, Str 42, Vit 21, Mag 41, Spr 28, Spd 28 · Lv 100 — HP 4181, Str 67, Vit 31, Mag 63, Spr 39, Spd 36, Luck 22. Rinoa has the **highest Str cap (67)** of any character in the game at Lv 100 — notably higher than Squall and Zell (both 47). She also has strong Mag growth (63 at Lv 100) making her the best hybrid physical/magic platform. Her Vit is the lowest in the game (caps at 31) — always prioritize Vit-J and Protect on her. Her HP is comparable to Squall's. **Weapon note**: Rinoa's Blaster Edges are long-range weapons that generate critical hits at 2× damage based on Luck. Being long-range, she takes no damage penalty in back-row positioning (not applicable since FFVIII has no row system, but her range means she can attack from any field position without penalty). **Unique mechanic**: Rinoa's Angelo Rush counterattack triggers automatically based on a hit-counter (not random per turn) — she strikes back after accumulating a set number of physical hits. Angelo Search (Pet Pals Vol. 5) is the highest-priority Combine to complete. Rinoa's Combine Limit Break selection is Crisis Level-gated: CL1 = **Angelo Cannon** (power 72, physical single-target — learned by default, no volume needed), CL2 = **Angelo Strike** (power 120, physical single-target — Pet Pals Vol.1, 800 steps), CL3 = **Invincible Moon** (grants full Invincible status to all allies — Pet Pals Vol.3, 920 steps), CL4 = **Wishing Star** (power 130 × 8 hits, physical AoE all enemies — Pet Pals Vol.6, 1,060 steps). **Angelo auto-abilities**: Angelo Rush (auto-counter, power 1.5× Rinoa's Str, triggers after a set number of single-target hits land on the party — no book needed, active by default); Angelo Recover (auto, restores 62.5% of the target ally's max HP — Pet Pals Vol.2, 200 steps); Angelo Reverse (auto, revives one KO'd ally to 12.5% of max HP — Pet Pals Vol.4, 260 steps); Angelo Search (auto item retrieval — Pet Pals Vol.5, 400 steps). If a Combine ability is not yet learned, the system falls to the next lower learned ability — this allows deliberate control over which Combine fires by strategically leaving certain volumes unread. **Angel Wing** (available late Disc 3): magic power ×5, stock not depleted, immune to Silence/Berserk/Confuse, persists through KO/revive for that battle. Stocking only Meteor before triggering Angel Wing forces Rinoa to cast Meteor repeatedly — this is called "Meteor Wing" and is one of the highest sustained damage outputs available. **GF compatibility**: No character-specific modifiers; standard compatibility management applies.

{{CALLOUT:character|Dream party Limit Breaks}} The three dream characters have fixed Limit Break moves with no unlock requirements. **Laguna's Desperado** (AP 140, physical AoE to all enemies) is available from the start and triggers at the standard ≤32% HP or Aura threshold. **Kiros's Blood Pain** (25 AP × 6 hits, physical single-target) deals six hits per use — at high Str junctions from the real-world party members it can outdamage Laguna's AoE in single-target situations. **Ward's Massive Anchor** (AP 140, physical AoE) is identical in power to Desperado but uses a harpoon animation. Since dream party stats inherit junctions from the real-world characters assigned to each dream slot, junctioning Str-boosting spells (Ultima, Meteor, Flare) on Squall, Quistis, and Selphie before entering the dream directly improves dream-party combat effectiveness. Crisis Level for dream characters works identically to regular characters — HP below 32% of max, Aura status, certain negative statuses, and KO'd allies all raise CL. **Dream character base stat highlights**: **Kiros** has the highest base Speed of any character in the game — starting at 30 at Lv1 and reaching 48 at Lv100, far above anyone else. When Kiros is the active dream character, the Speed junction from Quistis's slot makes his ATB fill even faster, making him ideal for rapid multi-action turns during Centra Excavation dream sequences. **Ward** has the highest natural Strength growth — starting at 2 and reaching 56 at Lv100 — making him the hardest physical hitter in the dream party when the correct Str-J spell is assigned from Selphie's slot. **Laguna** has Speed 22 at Lv1 rising to 37 at Lv100, making him mid-range but still notably faster than Squall or Zell. **Edea** (when she joins temporarily on Disc 3) begins with a Magic stat of 11 at Lv1 — the highest starting Magic of any party member — and reaches 55 at Lv100. Despite her low Vitality and Strength, her Magic growth makes her an efficient platform for high-Mag junctions during the Centra approach segment, provided the Mag-J spell stocked on her temporary slot is top-tier. **Critical hit note for dream characters**: Unlike **Squall** whose gunblade never generates critical hits (only the R1 trigger bonus applies), **Laguna, Kiros, and Ward** all have weapons that can produce normal critical hits — each dealing +100% extra damage for a total of 2× the base hit. This means Kiros's Blood Pain six-hit chain can produce critical-hit individual strikes, making his per-hit variance higher than Laguna's or Ward's single-hit Limit Breaks. The same applies to all other non-Squall playable characters: Zell, Selphie, Quistis, Irvine, and Rinoa all have weapons capable of critical hits based on Luck.

{{CALLOUT:character|Laguna, Kiros, and Ward — stat reference}} Stats at Lv 100 from source data. **Laguna** (Machine Gun): HP 4148, Str 48, Vit 41, Mag 46, Spr 36, Spd 37, Luck 21 — broadly mirrors Squall's stats; strong all-rounder. Desperado (AoE, power 140) fires automatically. **Kiros** (Katal blades): HP 3728, Str 43, Vit 31, Mag 50, Spr 41, Spd 48, Luck 23 — highest Spd of any character in the game (48); also leads the trio in Mag, Spr, and Luck. Weakest in HP and Str. Blood Pain hits one enemy 6 times at power 25 per strike — can score critical hits on individual strikes. **Ward** (Harpoon): HP 4768, Str 56, Vit 44, Mag 36, Spr 30, Spd 27, Luck 14 — highest HP and Str of the trio; lowest Spd and the lowest Luck in the game overall (14). Acts least frequently. Massive Anchor (AoE, power 140) matches Laguna's Desperado in power. All three generate normal critical hits. **Edea** (temporary Disc 3 member): HP 3777, Str 41, Vit 20, Mag 55, Spr 45, Spd 31, Luck 15 — highest Spr and competitive Mag; lowest Vit of any character in the game. Ice Strike (power 120, single-target, non-elemental magical) is her Limit Break. Junctions Protect and Vit-J spells to her during her party slot.

{{CALLOUT:character|Irvine's Shot Limit Break — ammo types and sources}} Irvine's Limit Break fires bullets as rapidly as R1 is pressed within a time limit (higher Crisis Level = more time). Each ammo type is a separate Limit Break that must be unlocked by having that ammo in inventory at least once. **Target switching during Shot**: pressing **left or right on the D-pad** during the Shot sequence changes the current target — this works for any Shot type that hits a single enemy. When a target's HP drops to zero mid-sequence, the damage display shows **0** — this is the signal to switch to the next target using the D-pad to keep dealing damage. Multi-enemy encounters benefit significantly from this mechanic since wasted shots on a dead enemy do no damage. Sources: **Normal Ammo** — sold at any general shop for 20 Gil; unlocks **Normal Shot** (basic single-target). **Shotgun Ammo** — sold at general shops for 40 Gil; unlocks **Scatter Shot** (hits all enemies). **Dark Ammo** — sold at Esthar Shop for 300 Gil, or mugged from G-Soldiers, or **Card Mod the Abadon Card → 30× Dark Ammo** (zero cost once the card is won from the Galbadia Garden girl); unlocks **Dark Shot** (inflicts Poison/Darkness/Silence/Sleep/Slow). **Fire Ammo** — sold at Esthar Shop for 500 Gil, or **Card Mod the Oilboyle Card → 30× Fire Ammo**; unlocks **Flame Shot** (fire-elemental AoE). **Demolition Ammo** — sold at Esthar Shop (Familiar required) for 800 Gil, or **Card Mod the Trauma Card → 30× Demolition Ammo**; unlocks **Canister Shot** (high-damage single-target). The Abadon, Oilboyle, and Trauma cards are all won from the girl at the Galbadia Garden card table — modding them is the fastest zero-cost way to unlock all three Shot types. **Fast Ammo** — sold at Esthar Shop (Familiar required) for 100 Gil, or collected from the FH Grease Monkey officer; unlocks **Quick Shot** (very rapid, low-damage single-target). **AP Ammo** — collected from the FH Grease Monkey officer (10 per visit), or purchased at Esthar Shop (Familiar required); unlocks **Armor Shot** (ignores Vitality — most consistent damage vs high-Vit foes like Omega Weapon). **Pulse Ammo** — the rarest type; collected from the FH Grease Monkey officer (5 per visit), refined from Laser Cannons via Ammo-RF (1 Laser Cannon → 5 Pulse Ammo), or refined from Energy Crystals (1 Energy Crystal → 2 Pulse Ammo via Ammo-RF); unlocks **Hyper Shot** (highest single-shot damage). Stock AP Ammo and Pulse Ammo as a priority.

{{CALLOUT:character|Irvine — character stat reference}} Irvine joins the party at Lv 13 in Galbadia Garden. He uses Guns (long-range weapons). Key stats: Lv 13 — HP 699, Str 10, Vit 8, Mag 10, Spr 7, Spd 22, Luck 14 · Lv 20 — HP 977, Str 14, Vit 12, Mag 14, Spr 11, Spd 23 · Lv 50 — HP 2124, Str 30, Vit 23, Mag 30, Spr 22, Spd 29 · Lv 100 — HP 3880, Str 45, Vit 31, Mag 42, Spr 28, Spd 39, Luck 21. Irvine's base stats are mid-tier across the board — his Str (45), Mag (42), and HP (3,880) are the lowest of the permanent main six characters at cap. His Vit (31) matches Zell's. His standout stat is **Spd (39 at Lv 100)** — the highest Speed of any permanent party member, ahead of Squall and Selphie (both 37), meaning he gets more ATB turns than any other member of the main six. His Luck (21) is average. **Weapon note**: Irvine's Guns generate normal critical hits (2× damage) based on Luck. Being long-range, standard physical attacks deal no range penalty. His Shot Limit Break scales with ammo type and Crisis Level (more time at higher CL to fire more shots). **Shot ammo quick reference** — ammo type: shot name, power per bullet, targets. Normal Ammo: Normal Shot, 17, single, 0.7s/shot · Shotgun Ammo: Scatter Shot, 14, all, 0.7s/shot · Dark Ammo: Dark Shot, 14, single, 0.7s/shot (may inflict Poison/Darkness/Silence/Sleep/Slow) · Fire Ammo: Flame Shot, 40, all (Fire elemental), 1.2s/shot · Demolition Ammo: Canister Shot, 60, single, 1.9s/shot · Fast Ammo: Quick Shot, 7, single, 0.2s/shot (fastest fire rate by far — ideal for filling short time windows) · AP Ammo: Armor Shot, 80, single, 1.8s/shot (ignores Vit) · Pulse Ammo: Hyper Shot, 120, single, 1.9s/shot (highest power). Higher Crisis Level grants more time to fire shots during the Shot window. Press R1 to fire; press left/right D-pad to switch targets for single-target shot types. **GF compatibility**: No character-specific modifiers. Prioritize getting AP, Demolition, and Pulse Ammo into stock as soon as possible to unlock the strongest Shot types.

{{CALLOUT:character|Edea's Limit Break — Ice Strike}} Edea's sole Limit Break is **Ice Strike** (magical, non-elemental despite the name, AP 120, single-target) — it activates at the standard ≤32% HP or Aura threshold. While controlled by Ultimecia, Edea's Limit Break works identically to any other character's, so keeping her HP low triggers it. Her Crisis Level follows the same formula as player characters. Edea cannot be given the Aura status by the player while she is an NPC boss, so it only triggers naturally from HP loss.

{{CALLOUT:character|Zell Duel — button combos and Combat King progression}} Zell's Limit Break is a timed input sequence. Crisis Level determines how long you have (CL1: ~4.7s starting with Punch Rush; CL2: ~6.7s starting with Punch Rush; CL3: ~9.3s starting with Booya; CL4: 12s starting with Booya). The base moves and their inputs: **Punch Rush** (Circle, X) · **Booya** (Right, Left) · **Heel Drop** (Up, Down) · **Mach Kick** (Left, Left, Circle) · **Dolphin Blow** (L1, R1, L1, R1 — unlocked by Combat King 001). Finisher moves that end the combo: **Burning Rave** (Down×4, Circle — no book needed) · **Meteor Barret** (Up, X, Down, Triangle, Circle — Combat King 003) · **Different Beat** (Triangle, Square, X, Circle, Up — Combat King 004) · **My Final Heaven** (Up, Right, Down, Left, Triangle — Combat King 005). **Important**: Reading a Combat King magazine only makes that finisher's inputs *visible* on the Duel screen — all moves can be performed at any time even without reading the magazine. Knowing the inputs in advance means every finisher is available from the start of the game. Finisher path chains: **Burning Rave** — Punch Rush → Mach Kick → Punch Rush → Heel Drop (or Meteor Strike) to reach it; alternatively Booya → Heel Drop → Meteor Strike → Booya. **Meteor Barret** — Punch Rush → Dolphin Blow; or Booya → Heel Drop → Mach Kick → Heel Drop → Booya → Punch Rush → Mach Kick. **Different Beat** — Punch Rush → Booya → Heel Drop → Mach Kick → Heel Drop → Booya. **My Final Heaven** — Punch Rush → Booya → Heel Drop → Mach Kick → Punch Rush. For maximum sustained damage at maxed Str, rapidly alternating **Booya → Heel Drop → Booya → Heel Drop** actually outperforms the Punch Rush + Booya loop — each Heel Drop deals slightly more damage than Punch Rush and the cycle is tighter. This Booya+Heel Drop loop is known informally among veteran players as **"Armageddon Fist"**; the Punch Rush+Booya sustained loop is called **"Grand Calamity Symphony"**. Chain either loop throughout the time window and only input a finisher right before time expires. Finishers at max Str are not always the highest-damage play; filling more non-finisher hits first is often better. Percent-damage move: **Meteor Strike** (Down, Circle, Up, Circle — Combat King 002) deals 25% of the enemy's current HP as physical damage, capped at 9,999.

{{CALLOUT:character|Selphie's Slots Limit Break mechanics}} Selphie's Limit Break randomly selects from any of the 49 junctionable magic spells plus her four unique spells. The four unique spells cannot be obtained any other way: **Full-Cure** (restores all allies to max HP and clears all negative statuses — KOs Zombie-status allies), **Wall** (grants Protect and Shell to all allies), **Rapture** (removes all non-immune enemies from battle — same immunity list as Degenerator), and **The End** (instantly kills all non-Undead enemies, including most bosses — it kills the current form but immediately triggers the next form if one exists; fails silently on immune targets with no visual effect). Higher Crisis Level makes better spells appear more frequently and also increases how many times the selected spell is cast (1–3 casts for normal magic; unique spells are always cast exactly once). At CL4, Ultima becomes common and The End has a meaningful chance of appearing. **The End immune bosses**: Omega Weapon, Ultimecia (all forms), and other specifically flagged superboss encounters are immune — The End appears to trigger but nothing happens. It works on most optional bosses including Bahamut, Ruby Dragon, Grendel, and most Disc 4 story encounters. To increase Crisis Level quickly: let HP fall below 32%, stack negative status effects, and have KO'd allies present. **Full Crisis Level contribution table**: Slow +6% · Poison +12% · Petrifying +12% · Darkness +12% · Silence +12% · Doom +18%; Zombie and Vit 0 contribute 0% despite being negative statuses. Each KO'd ally in the party adds +8% (2 KO'd = +16% total). Do not try to force The End on Ultimecia's final form — it does not instantly win the battle, it merely triggers the next phase immediately. **Important exclusion**: **Apocalypse never appears in Selphie's Slots** — it is excluded from the random spell pool entirely, so it cannot be cast via Slots even if stocked.

{{CALLOUT:character|Rinoa's Angel Wing Limit Break}} Rinoa automatically unlocks Angel Wing once the Ragnarok is obtained — no action is required. When Angel Wing is selected, Rinoa enters an uncontrolled casting state until the battle ends or she is incapacitated. During Angel Wing she is immune to Berserk, Confuse, and Silence. Magic she casts in this state does not consume her magic stock, and every cast hits for 5× its normal power. The spells she uses are drawn at random from her stocked magic — the best approach is to stock only Meteor in her magic slots and remove all other magic; this forces her to cast Meteor repeatedly for enormous non-elemental damage. Do not junction any magic you cannot afford to see cast randomly. **Fallback behavior**: if Rinoa has zero magic stocked when Angel Wing activates, she falls back to using regular physical attacks for the duration — this is wasteful and should be avoided. Always ensure at least one magic slot is stocked (ideally 100× Meteor) before activating Angel Wing.`,
  },
  {
    id: 'r0-combat-mechanics',
    title: 'Combat Mechanics',
    disc: 0,
    content: `FF8's damage system is built on a few core formulas that interact with the junction system. Understanding how Str, Vit, Mag, and Spr feed into damage calculations lets you optimize junctions rather than guess.

{{CALLOUT:mechanics|Physical Damage Formula}} Used by all physical attacks including Squall's gunblade strikes and physical-type GF summons.
- Step 1: tmp = Str² ÷ 16 + Str
- Step 2: tmp = tmp × (265 − target Vit) ÷ 256
- Step 3: Damage = tmp × Weapon Power ÷ 16
- Weapon Power ranges from 12 (Revolver) to 40 (Lion Heart). Raising Str and lowering target Vit (via Meltdown) both amplify damage dramatically.

{{CALLOUT:mechanics|Magical Damage Formula}} Applied to offensive magic spells and magic-type GF summons.
- Step 1: tmp = Mag + Spell Power
- Step 2: tmp = tmp × (265 − target Spr) ÷ 4
- Step 3: Damage = tmp × Spell Power ÷ 256
- Note: Spell Power appears twice (added in Step 1, then multiplied in Step 3), so high-power spells scale non-linearly with Mag
- Representative Spell Powers: Fire/Blizzard/Thunder ≈ 20, Fira/Blizzara/Thundara ≈ 45, Firaga/Blizzaga/Thundaga ≈ 80, Flare ≈ 140, Ultima ≈ 230
- Spirit serves as magical vitality — junction Ultima to Spr-J for the best magical defense

{{CALLOUT:mechanics|Crit Chance and Bonus Damage}} A critical hit doubles the final damage total.
- Base crit chance: (attacker Luck − target Luck) ÷ 4 + 1% minimum (floor at 1%, no upper hard cap from this formula alone)
- High Luck junctions (Aura, Death) on the attacker combined with low enemy Luck push crit rates well above 50%
- Certain Limit Break moves have independently high crit modifiers regardless of the Luck formula

{{CALLOUT:mechanics|ATB Fill Rate}} How quickly each character's Active Time Battle bar fills is governed by Speed (Spd stat).
- Spd 20 → roughly 7 seconds per full ATB bar | Spd 40 → ~4.5 s | Spd 60 → ~3 s | Spd 80 → ~2 s | Spd 100 → ~1.5 s
- Haste doubles the ATB fill rate; Slow halves it; Stop freezes it entirely
- Triple and Tornado are the strongest Spd-J options — junction either for the first speed tier

{{CALLOUT:mechanics|EXP and AP — how battle endings change rewards}} The method used to end a battle determines whether EXP, AP, and item drops are awarded.
- **Normal victory** (kill all enemies): full EXP, full AP, normal item drops apply
- **Card command** (use Card on an enemy): AP is awarded, but **zero EXP** and no drop from that enemy — the cleanest way to end battles without gaining levels
- **Devour command** (Tonberry ability): AP is awarded, **zero EXP**, no drop — same as Card for level control
- **Escape** (L2+R2): **no AP**, and you receive a fraction of EXP proportional to how much HP damage you dealt — e.g., if the enemy gives 200 EXP and you dealt 30% of its HP in damage, you earn 60 EXP regardless of the escape; this partial EXP gain is unavoidable when escaping
- **All enemies fully Petrified** (Petrify/Break ending): treated identically to escape — **no AP**, partial EXP proportional to HP dealt, no item drops; avoid accidental full-party Petrify when farming for drops
- **Petrify (shattered)**: if a physically petrified enemy is shattered with a physical hit, normal rewards apply; it is the slow-Petrify-then-shatter approach that avoids the "escape" calculation
- Key takeaway for low-level play: use **Card or Devour** to end battles with zero EXP, since both escaping and Petrify-ending still yield partial EXP

{{CALLOUT:mechanics|Enemy Level Scaling}} Enemy HP, Str, Vit, Mag, Spr, and Spd all scale to a range centered on the party's average level.
- General scaling window: roughly ±20% of base stats around the party average
- Deep Sea Research Center exception: enemies inside scale as though the party is 15 levels higher
- Islands Closest to Hell and Heaven (Lv100 zone): enemies drop and yield the rarest magic including Ultima, Meteor, Triple, and Flare — visit after obtaining the Ragnarok

{{CALLOUT:mechanics|Item Drop Probability}} At battle end, each enemy checks four independent drop slots in sequence.
- Slot 1 (Common A): 178 ÷ 256 chance (~69.5%)
- Slot 2 (Common B): 51 ÷ 256 chance (~19.9%)
- Slot 3 (Rare A): 15 ÷ 256 chance (~5.9%)
- Slot 4 (Rare B): 12 ÷ 256 chance (~4.7%)
- **Rare Item** GF ability (Bahamut, 250 AP): shifts the probabilities to Slot 1 = 128/256 (~50%), Slot 2 = 114/256 (~45%), Slot 3 = 14/256 (~5%), Slot 4 = **0/256 (impossible)**. It substantially increases Slot 2 drop frequency at the cost of making Slot 4 items completely unobtainable — never equip Rare Item when the target ingredient only appears in Slot 4
- Mug (Steal) bypasses the entire drop system and gives the item directly during battle

{{CALLOUT:mechanics|Crisis Level — how Limit Breaks trigger}} Every playable character's Limit Break command appears in the battle menu only when certain conditions are met. The primary condition is HP at or below 32% of that character's maximum — the lower HP falls within that range, the higher the resulting Crisis Level (CL). CL ranges from 1 (HP near 32% of max) through 4 (HP near 0). The four CLs have different effects depending on the character: for Squall, CL determines how many Renzokuken hits he delivers and how likely a finisher is to appear; for Zell, CL determines how much time he has during Duel; for Irvine, CL determines how long his Shot window stays open; for Selphie, CL determines how strong the spells in her Slots pool are and how many times the chosen spell fires; for Quistis, CL scales the attack power of most Blue Magic directly. Crisis Level can be raised further beyond the HP component by three additional factors. First, certain negative status conditions on the afflicted character each add a fixed percentage: Slow adds 6%, Poison adds 12%, Petrifying adds 12%, Darkness adds 12%, Silence adds 12%, and Doom adds 18% — notably, Zombie and Vit 0 add nothing despite being harmful statuses. Second, having one KO'd ally adds 8% and having two KO'd allies adds 16%. Third, the **Aura** status (from the Aura spell, the Aura Stone item, or a GF ability) bypasses the HP threshold entirely and makes the Limit Break command available regardless of current HP, while also pushing Crisis Level to its maximum. The Aura spell is among the most important pre-boss preparations in the game for this reason.

{{CALLOUT:mechanics|Draw Point refill mechanic}} Field draw points are step-based, not time-based — they recharge after approximately 10,000–20,000 walking steps on the field map. A draw point that appears depleted will refill if you spend enough time exploring. World map draw points follow the same step-based rule but are always invisible; use Move-Find (Siren ability) to reveal hidden field draw points. Most draw points are not worth revisiting for farming — stocking magic from enemies or refinement is far more efficient — but the step-refill property is useful to know if you revisit an area and find a previously depleted point.

{{CALLOUT:mechanics|Magic casting mechanics and interactions}} practical notes not covered elsewhere in junction tables. **Draw-and-cast in battle**: when the Draw menu lists a spell held by an enemy, the player can select "Use" instead of "Draw" to immediately cast the drawn spell without spending any stocked magic — this is useful for healing with Cure from an enemy when party HP is low, or for applying a support spell mid-fight without depleting stock. **Double and Triple with Draw**: under Double or Triple status, each Draw command still only draws one spell per action (the Double/Triple multiplier applies to the casting of magic, not to the draw action itself). **Meteor multi-target distribution**: when Meteor is cast against multiple enemies simultaneously, its 10 individual hits are distributed at random across all targets currently alive — focusing Meteor on a single enemy concentrates all 10 hits on that target, making it much more efficient against solo foes than multi-enemy encounters. **Quake misses flying targets**: Quake is an Earth-elemental AoE spell that is completely ineffective against enemies in the air or under Float status — if Quake deals zero damage, the target is either flying or Floating. Use Wind or non-elemental magic instead. Float can be used on the party to neutralize Quake from enemies; a single Float junction to El.Def-J provides 50% Earth resistance even without the Float status being active. **Gravity spells and the damage cap**: Demi removes exactly 25% of the target's current HP (not max HP) up to a hard cap of 9,999 — against enemies with under roughly 40,000 current HP, Demi always deals exactly 25%; against enemies with very high current HP, the cap kicks in and the effective rate drops below 25%. Demi is non-elemental (Gravity type), reflected by Reflect, and works on most enemies that are not immune to instant death or percentage damage. **Bio and Poison synergy**: Bio deals moderate Poison-element damage and applies Poison status — the damage from the initial cast is separate from the ongoing Poison tick damage. If an enemy absorbs Poison element, Bio will heal it rather than damage it, but the Poison status portion may or may not land depending on the enemy's status resistance. **Undead and Zombie interactions with healing**: Cure, Cura, Curaga, Regen, Phoenix Down, and Tent deal damage to undead enemies or Zombie-status targets equal to what they would normally heal. **Life and Full-Life are different** — they do not deal healing-equivalent damage; they deliver an **instant KO** to any undead or Zombie-status target regardless of remaining HP. This makes them the most reliable tools for killing undead and for removing Zombie from enemies (at the cost of killing them outright). Holy deals ×2 damage to undead targets in addition to its standard damage. **Life revive note**: when used on a KO'd ally, Life revives them to only **12.5% of their max HP** — always follow with healing. Full-Life revives to full max HP. Drain reverses against undead targets: the caster loses HP equal to the amount drained. When an ally has Zombie status, any healing item or spell used on them deals damage equal to what it would have healed — heal allies' Zombie first (Holy Water, Remedy, Esuna) before using party-wide recovery items.

{{CALLOUT:mechanics|Enemy level scaling formula}} Random encounter enemies appear at either the average party level +20% or −20% (rounding applied). For example, with an average party level of 10, enemies will be either Lv 8 or Lv 12. The single exception is the **Deep Sea Research Center**, where an additional **+15 levels** are added on top of the standard calculation — meaning DSRC enemies at an average party level of 10 will be either Lv 23 or Lv 27. Most boss enemies have a maximum level cap beyond which they cannot scale. Enemies in the **Fire Cavern** are all fixed at Lv 5; those in the **Lunatic Pandora** with Squall are all fixed at Lv 1; and enemies on the **Islands Closest to Heaven/Hell** are all fixed at Lv 100. Ultimecia's Castle is the sole exception where enemy levels are completely random (not tied to party average). Use Tonberry's **LV Up** or **LV Down** commands to adjust enemy levels within the ±20% range to hit draw-list or drop-list thresholds during farming sessions.

{{CALLOUT:mechanics|Mug and Drop item slot probabilities}} Every enemy has four possible mug items (Slots A–D) and four possible drop items (Slots A–D). The probability of landing each slot follows the same distribution for both Mug and Drop: **Slot A = 178/256 (~70%)**, **Slot B = 51/256 (~20%)**, **Slot C = 15/256 (~6%)**, **Slot D = 12/256 (~5%)**. A successful Mug or post-battle Drop yields exactly one item from these four slots. When the **Rare Item** party ability is equipped, the probabilities shift to: **Slot A = 128/256 (50%)**, **Slot B = 114/256 (45%)**, **Slot C = 14/256 (5%)**, **Slot D = 0/256 (0%)**. This means Rare Item increases Slot B results substantially but makes Slot D items completely unobtainable — never equip Rare Item when the target item is in Slot D. Additionally, the mugger's Speed stat adds to the Mug success chance (the base chance is listed per-enemy; final chance = base + Spd ÷ 2), which is why high-Speed characters are better muggers. Only one Mug attempt is allowed per enemy per battle, and a successful Mug prevents any post-battle item drop from that enemy.

{{CALLOUT:mechanics|ABSORB command}} The Absorb command drains HP directly from a target enemy and adds it to the user's current HP. It is physically typed (affected by Str and Vit, not Mag) and its damage follows the physical formula. Against undead or Zombie-status targets, Absorb reverses — the user loses HP instead. This makes Absorb dangerous to use against undead enemies such as Abadon or Zombie-inflicted enemies. Absorb is distinct from the Drain spell (which is magical and uses the magic damage formula); Absorb scales from Str while Drain scales from Mag and SpellPower. The **INITIATIVE** character ability (160 AP, no teach item — must be learned through AP by any GF that has it in its ability list, including Cactuar and Tonberry) causes the junctioned character's ATB gauge to always start at 100% at the beginning of battle, granting an immediate first action before any enemy acts. This is especially potent when combined with Meltdown or Demi on the first turn, or with a pre-emptive Aura cast, since no time is spent waiting for the ATB bar to fill. Initiative stacks with Auto-Haste — the bar starts full AND fills faster thereafter.\n\n{{CALLOUT:mechanics|Defend command mechanics}} Selecting Defend puts the character in a guarded stance until their next action input. While defending: physical attacks deal **zero damage** (completely blocked, not just reduced) and magic attacks deal **50% reduced damage**. This is the primary survival tool against Omega Weapon's Terra Break (16 random physical hits) and other high-physical-output bosses. Defend has 100 AP cost and is taught by Cactuar.\n\n{{CALLOUT:mechanics|GFHP+ ability tiers}} GF maximum HP can be raised by four stacking GF abilities — GFHP+10% (40 AP, taught by Healing Mail), GFHP+20% (70 AP, taught by Silver Mail), GFHP+30% (140 AP, taught by Gold Armor), and GFHP+40% (200 AP, taught by Diamond Armor). All four equipped simultaneously provide a cumulative +100% increase to that GF's maximum HP — effectively doubling it. Higher GF HP directly reduces the risk of a GF being KO'd mid-summon by enemy attacks. These items drop from or are Card Mod products of armored enemies (Gold Armor from Wendigo card chains, Diamond Armor from Red Giant drops). Since GFs rarely die during normal play, GFHP+ is lower priority than offensive and stat-boosting abilities, but it matters for the Omega Weapon fight where Eden's long summon animation makes it vulnerable.\n\n{{CALLOUT:mechanics|Boost damage multiplier table by GF}} Pressing and holding Select during a GF summon then tapping Square raises the damage multiplier from 75% to a maximum of 250%. The time window and achievable maximum differ by GF: **Quezacotl** — 13.3 seconds, up to 180%; **Shiva** — 12.9 seconds, up to 180%; **Ifrit** — 13.0 seconds, up to 180%; **Siren** — 17.6 seconds, up to 200%; **Brothers** — 19.3 seconds, up to 220%; **Leviathan** — 21.4 seconds, up to 230%; **Pandemona** — 22.8 seconds, up to 240%; **Alexander** — 22.1 seconds, up to 230%; **Doomtrain** — 22.9 seconds, up to 240%; **Bahamut** — 22.1 seconds, up to 230%; **Tonberry** — 14.0 seconds, up to 190%; **Eden** — 72.6 seconds, up to 250% (the only GF with enough time to reach the hard cap). The four GFs that cannot learn Boost — **Diablos, Carbuncle, Cerberus, and Cactuar** — are excluded from this table. Pressing Square when the cross marker appears drops the counter back to 75%, so watch the indicator carefully.

{{CALLOUT:mechanics|Devour command outcome guide}} Devour eliminates an enemy from battle and produces one of the following outcomes — the specific result depends on the enemy type and level. Positive outcomes (the message appears): "Delicious!" → restores the devouring character to full HP; "Refreshing!" → full HP restore + all status ailments cured; "Tastes okay..." → restores 50% max HP; "Gained strength" → full HP + cures statuses + Str+1; "Feel healthier" → full HP + cures statuses + Vit+1; "Clear head!" → full HP + cures statuses + Mag+1; "Increased morale" → full HP + cures statuses + Spr+1; "Light on my feet!" → full HP + cures statuses + Spd+1; "All systems go!" → full HP + cures statuses + max HP+10. Negative outcomes: "Tastes awful!!!" → 12.5% of max HP lost + Poison; "Can't see anything" → 6.25% max HP lost + Darkness; "It's rotten..." → 6.25% max HP lost + Zombie; "Barf...bwahhh!!!" → 50% max HP lost + Poison; "Tastes funny..." → inflicts Petrify; "Shouldn't have...eaten...it" → 75% max HP lost + Poison + Darkness + Silence + Sleep + Slow + Curse (this can be lethal at low HP — ensure the character is at full health before using Devour on unfamiliar enemies); "No good!" → nothing happens. The stat-up outcomes are the reason to use Devour for endgame stat-maxing; the enemy must be at the correct level range for the targeted stat boost. Full reference: **T-Rexaur at Lv30+** → Str+1 ("Gained strength"); **Adamantoise at Lv30+** → Vit+1 ("Feel healthier"); **Behemoth at Lv40+** → Mag+1 ("Clear head!"); **Malboro at Lv30+** → Spr+1 ("Increased morale"); **PuPu at Lv30+** → Spd+1 ("Light on my feet!"); **Ruby Dragon at Lv45+** → max HP+10 ("All systems go!"). Note on PuPu: devouring it is mutually exclusive with completing the UFO sidequest — feeding it 5 Elixirs earns the PuPu Card instead; choose based on whether you need Spd boosts more than the card. Most boss-class and humanoid enemies cannot be devoured ("Couldn't Devour!" message). **Devour success condition**: the attempt is more likely to succeed when the target's current HP is lower than the user's current HP — entering battle at full HP and weakening the enemy before devouring significantly improves success odds. Against enemies where the stat-up outcome is desired, reduce the enemy to low HP with magic, then attempt Devour. The Card command and Devour both end the encounter but do NOT award EXP, AP, or post-battle drops.

{{CALLOUT:mechanics|Ribbon ability}} The **Ribbon** character ability provides complete immunity to 16 harmful status effects — **Death, Poison, Petrify, Darkness, Silence, Zombie, Sleep, Berserk, Slow, Stop, Curse, Doom, Petrifying, Confuse, Vit 0, and Drain** — simultaneously from a single character ability slot. It is taught by using a **Ribbon** item on any GF (costs 0 AP — it is not a learned GF ability but a direct-use item that grants the character ability). Ribbon does NOT protect against **Zantetsuken** (Odin/Gilgamesh instant KO) or **Degenerator** (Quistis Blue Magic). Sources for the Ribbon item: found in the Ultimecia Castle treasure area (one is missable if the castle chest is not checked), or very rarely from Angelo Search. **Note**: a surplus Ribbon item can be converted into a **Status Guard** (teaches St-Def-Jx4 to any GF) via Eden's **GFAbl Med-RF** — the only practical use case for a Ribbon that won't be equipped. Since Ribbon items are so scarce this conversion is rarely worthwhile, but it is available. Equipping Ribbon on a single character — ideally Squall — effectively eliminates the need to junction any status defense spells on that character, freeing all four St.Def-J slots for other junctions (additional St.Atk-J, Eva-J, Hit-J, or Luck-J). This makes Ribbon one of the highest-value single-slot optimizations in the game.

{{CALLOUT:mechanics|Cover ability}} Taught by **Knight's Code** items (100 AP to learn). When a party member with Cover is at critical HP, their ally automatically steps in front to absorb single-target physical attacks — the Cover character takes the hit at 50% of normal damage. **Positional asymmetry**: the **middle position** character can Cover either ally; the **right position** character can only Cover the middle ally (not the left); the **left position** character cannot use Cover at all. This does not trigger against AoE attacks. Knight's Code is obtained via Eden's GFAbl Med-RF on a **MiniMog Card** (1 MiniMog Card → 1 Knight's Code). The MiniMog Card is won from Selphie or from the CC Group. Note: the **Gilgamesh Card** gives 10× Holy War via Card Mod — a separate item used for party invincibility, not Knight's Code. Cover is most effective on a character with high Vitality, high HP, and the auto-Protect ability; pairing it with **Mighty Guard** (which grants Protect) maximizes the damage reduction.`,
  },
  {
    id: 'r0-status-effects',
    title: 'Status Effects',
    disc: 0,
    content: `Status effects are split into harmful (inflicted by enemies, spells, or items against the party) and beneficial (granted by spells, Limit Breaks, or GF abilities). Junction magic to ST-Def-J or St.Def-J ×4 slots to build resistance or full immunity.

{{CALLOUT:status|Harmful: Poison}} Drains HP equal to 1/16 of maximum HP per tick, persisting between battles until cured. Not immediately lethal but compounds over long dungeons with no healing.
- Remove with: Antidote, Esuna, Remedy, Panacea
- Prevent via: Antidote or Esuna at ST-Def-J

{{CALLOUT:status|Harmful: Sleep}} Target is unable to act; ATB is frozen and Eva drops to 0%. Any incoming physical hit wakes the target immediately.
- Remove with: any physical damage, Esuna, Remedy
- Offensively useful via Sleep spell or Sleep Powder; immobilizes tough enemies while the party sets up

{{CALLOUT:status|Harmful: Silence}} Prevents magic casting, GF summons, and the Draw command; physical attacks are unaffected. A silenced character cannot draw spells from enemies.
- Remove with: Echo Screen, Esuna, Remedy
- Some enemies inflict silence as their opening move — junction Echo Screen or Esuna at ST-Def-J before those fights

{{CALLOUT:status|Harmful: Blind (Darkness)}} Reduces physical hit accuracy to near zero. Has no effect on magic accuracy.
- Remove with: Eye Drops, Esuna, Remedy
- Excellent to inflict on physical-heavy enemies via the Blind spell or Dark Eye item

{{CALLOUT:status|Harmful: Petrify (Countdown)}} A stone countdown (about 20 seconds) ticks down; if it reaches zero the target is fully petrified. Contact while fully petrified can shatter the target. **Petrified enemies yield zero EXP, AP, and drop no items** — avoid unintentionally petrifying enemies when farming.
- Interrupt countdown with: Soft, Stona, Esuna, Remedy (before zero)
- Once shattered the target cannot be revived with standard Phoenix Downs — use Esuna or Soft outside battle to restore fully petrified party members

{{CALLOUT:status|Harmful: Slow}} Halves the rate at which the target's ATB gauge fills, effectively cutting their turn frequency in half.
- Remove with: Haste, Esuna, Dispel, Remedy
- Pairing Slow with Doom is a reliable strategy against many bosses

{{CALLOUT:status|Harmful: Stop}} Completely freezes the target's ATB gauge; Eva drops to 0% and no actions can be taken until the effect ends. Unlike Slow, Stop also halts any active status duration timers on the target.
- Remove with: Haste, Esuna, Remedy, Slow
- Particularly strong in combination with other status effects; not all bosses are susceptible

{{CALLOUT:status|Harmful: Confuse}} Forces the target to take random actions, potentially attacking allies. Damage to the confused unit may clear the status.
- Remove with: any damage, Esuna, Remedy, Dispel
- More dangerous on party members than enemies — junction Confuse resistance before fights involving Imp or Seifer

{{CALLOUT:status|Harmful: Berserk}} Forces the target to use only physical attacks each turn, with attack power boosted by 50%, but completely out of the player's control. Does not persist after battle.
- Remove with: Esuna, Remedy, Elixir, Megalixir
- Some strategies deliberately self-inflict Berserk via spell junctions on strong physical attackers for raw throughput

{{CALLOUT:status|Harmful: Doom}} Starts a counter at **8** that counts down over **16 seconds** (at default Battle Speed). When it reaches zero the target is KO'd instantly regardless of HP. The counter is time-based, so faster Battle Speed settings reduce available response time. Casting Zombie on a Doomed target also cancels the countdown.
- Remove with: Remedy+, Elixir, Megalixir, or Quistis's Full-cure Limit Break; Treatment ability also cures it
- Note: standard Esuna and regular Remedy do NOT cure Doom — you need Remedy+ or Elixir
- No magic junctioned to ST-Def-J provides resistance to Doom — it cannot be prevented through normal status defense. Only Zombie status, Ribbon, or Invincible (Hero/Holy War) can block it from triggering
- **Battle Speed interaction**: The Config menu's Battle Speed slider affects how fast both Doom and Petrify counters tick — slower Battle Speed buys more time to apply a cure.

{{CALLOUT:status|Harmful: Curse}} Prevents Limit Breaks from triggering, even at Crisis Level 4, and blocks Aura from enabling them.
- Remove with: Holy Water, Esuna, Remedy
- Junction Curse resistance before entering Ultimecia's Castle — Forbidden enemies inflict it frequently
- **Pain spell interaction**: When an enemy casts Pain on a party member, it inflicts Poison, Darkness, and Silence simultaneously. Because Silence is one of the three effects, it prevents magic and GF use — pairing Pain resistance with Silence resistance (both covered by junctioning Pain at ST-Def-J) negates all three effects at once

{{CALLOUT:status|Harmful: Zombie}} Reverses healing: Cure spells deal damage, Full-Life kills instantly. **Holy deals double damage** to zombified/undead targets. Fire deals normal damage. Life and Full-Life instantly KO zombified enemies instead of reviving them.
- Remove with: Holy Water, Esuna (be careful — casting Full-Life on a zombified party member is an instant KO)
- Offensive use: inflict Zombie on an enemy then cast Curaga on it to deal massive HP-scaling damage

{{CALLOUT:status|Harmful: Vit 0 (Meltdown effect)}} Reduces both Vitality and Spirit to zero simultaneously — maximum damage from physical and magic attacks. Clears after battle. **No enemy in the game is immune to Vit 0**, making Meltdown universally applicable.
- Remove with: Esuna, Remedy (also clears automatically after battle)
- Meltdown + Renzokuken (Squall Limit) is the core high-damage loop in the late game

{{CALLOUT:status|Beneficial: Float}} Target hovers above ground — all earth-based attacks miss entirely. Dispel removes it. Auto-Float can be junctioned or granted by Mighty Guard. Self-inflict before Quake-heavy encounters.

{{CALLOUT:status|Harmful: KO (Death)}} Target collapses and cannot act; must be revived.
- Revive with: Phoenix Down (low HP), Full-Life (full HP), Revive GF ability (auto-triggers once per battle)
- The Revive GF ability (learned by certain GFs) automatically revives a KO'd character once per battle without consuming a turn

{{CALLOUT:status|Beneficial: Protect}} Halves all incoming physical damage. Stacks multiplicatively with Vit-J defensive bonuses.
- Sources: Protect spell (draw from Adamantoise, Propagator), Barrier item, Carbuncle GF reflects Protect onto all party members
- Highly effective against physical-heavy bosses; cast before the fight begins when possible

{{CALLOUT:status|Beneficial: Shell}} Halves all incoming magical damage. Stacks multiplicatively with Spr-J.
- Sources: Shell spell, Barrier item, Carbuncle GF
- Essential during Ultimecia's final forms, which rely on powerful magic attacks

{{CALLOUT:status|Beneficial: Reflect}} Bounces single-target magic back at the caster.
- Sources: Reflect spell, Carbuncle GF summon
- Key technique: cast Reflect on all party members → cast Curaga aimed at one of them → the reflected spell heals the target after bouncing. Does not work with AoE spells or self-targeting magic.
- **Spells that bypass Reflect entirely** (cannot be bounced under any circumstances): Dispel, Tornado, Quake, Drain, Meteor, Ultima, Scan, and Apocalypse — these always hit the intended target even through active Reflect status.

{{CALLOUT:status|Beneficial: Haste}} Doubles the ATB gauge fill rate — the single most impactful buff in the game.
- Sources: Haste spell, Cerberus GF (casts Triple Haste on the entire party)
- Junction Haste to ST-Atk-J on a fast character to spread it at the start of every battle

{{CALLOUT:status|Beneficial: Regen}} Restores approximately 5% of max HP per tick at regular intervals.
- Sources: Regen spell, Selphie's Full-Cure Limit (restores HP but does not grant Regen)
- Haste speeds up all active status timers (including Regen ticks and harmful countdowns); Slow extends them. This interaction makes Slow a useful defensive tool against Doom or Petrifying countdowns

{{CALLOUT:status|Beneficial: Aura}} Enables Limit Breaks to appear regardless of current HP (normally limited to low HP or Crisis Level). Lasts until battle ends or dispelled.
- Sources: Aura spell, Aura Stone item
- Junction Aura to ST-Atk-J to apply it on-hit; the foundation of the end-game Limit Break strategy

{{CALLOUT:status|Beneficial: Double}} Allows the target to cast any spell twice per action, consuming 2 stock per use.
- Sources: Double spell, Cerberus GF
- Double + Ultima is a high-efficiency offensive combo for magic builds

{{CALLOUT:status|Beneficial: Triple}} Allows the target to cast any spell three times per action, consuming 3 stock per use.
- Sources: Triple spell, Cerberus GF
- Triple + Ultima is the highest single-action magic damage in the game, but very stock-intensive; stock up before attempting

{{CALLOUT:status|Dispel — full removal list}} The Dispel spell (and enemy Dispel attacks) strips the following beneficial statuses from the target simultaneously: **Haste, Regen, Protect, Shell, Reflect, Aura, Float, Double, Triple**. Notably, Dispel does NOT remove Auto-status versions of these — Auto-Haste, Auto-Shell, Auto-Protect, and Auto-Reflect granted by GF abilities re-apply after being stripped by Dispel. Enemy Dispel attacks prioritize stripping Protect/Shell/Haste since those are the most common player buffs.

{{CALLOUT:status|Harmful: Gravity}} Damage is calculated as a percentage of the target's maximum HP rather than a flat value — useful against high-HP enemies where raw damage would cap out. Does not work on bosses that are immune to percentage-based damage (typically those immune to Demi).
- Inflicted by: Demi, Micro Missile, Meteor Strike
- No status cure; the effect is instantaneous damage, not a lasting condition

{{CALLOUT:status|Harmful: Blow Away}} The target is completely removed from battle — not KO'd, simply gone. No EXP, AP, or item drops are awarded.
- Inflicted by: Odin's Zantetsuken, Selphie's Rapture Limit, Quistis's Degenerator Blue Magic
- Certain enemies are immune: Tonberry, Grat, Cactuar, Vysage, Lefty, Righty, PuPu, UFO, and E-Soldier (cyborg variant)

{{CALLOUT:status|Harmful: The End}} A unique status from Selphie's Limit Break that peacefully removes any non-undead enemy from battle. Undead enemies and bosses are immune.
- Inflicted by: The End (Selphie Limit Break random selection)
- Removes the target with no damage dealt, no EXP or AP earned, and no item drops — use Degenerator for farming situations instead; reserve The End for boss fights where loot isn't a concern

{{CALLOUT:status|Beneficial: Defend}} Completely negates all incoming physical damage and halves magic damage for that turn. The status lasts only until the character's next action.
- Activated by: the Defend command (available via GF ability)
- Excellent for tanking high-damage AoE magic; does not prevent status ailments even while active

{{CALLOUT:status|Hero / Holy War — status-clearing bonus}} Using a Hero item on a character or Holy War on the entire party does more than grant Invincible — it also immediately **removes all current harmful statuses** on the affected character(s) at the moment of application. This makes Hero and Holy War usable as emergency full-status cures in addition to their primary invincibility role.

{{CALLOUT:status|Status interaction notes}} A character with Auto-Reflect cannot be revived with Life or Full-Life magic — use Phoenix Down or the GF Revive ability instead. When an attack carries multiple status effects (e.g., Berserk, Confuse, and Sleep simultaneously), **Confuse takes precedence over Berserk**, and **Sleep takes precedence over both** — the highest-priority status is the one that actually applies. Haste, Slow, and Stop cannot co-exist; the most recently applied one overwrites the others. Aura and Curse cannot co-exist — Aura removes Curse and vice versa. **Doom cannot be prevented via ST-Def-J** — unlike most harmful statuses, junctioning magic to the Status Defense slots does not grant resistance to Doom. Only Zombie status, Ribbon equipment, or Invincible status can prevent the Doom countdown from starting. **Darkside command danger under Invincible**: Darkside converts HP into damage (the command costs the user's own HP). This calculation still occurs even while Invincible — using Darkside on a low-HP character under Hero/Holy War can result in an unexpected KO the moment Invincible expires. Never use Darkside on critically low HP even when protected.`,
  },
  {
    id: 'r0-junction-reference',
    title: 'Junction Quick Reference',
    disc: 0,
    content: `Each magic spell stocked in a character's inventory can be junctioned to a stat slot, boosting that stat based on the spell's junction value and the quantity stocked (max 100 per spell). Only one spell occupies each junction slot; higher-quality spells give dramatically better bonuses than lower-tier ones. All values below are at 100 stock.

{{CALLOUT:mechanics|HP-J (Health Points)}} Raises maximum HP — the most critical survivability junction. Stack with HP+% GF abilities to reach the 9,999 cap.
- Best: Ultima (+6,000 HP), Full-Life (+4,800 HP), Meteor (+4,600 HP), Holy (+3,800 HP)
- Good: Aura (+3,400 HP), Flare (+3,200 HP), Tornado (+3,000 HP), Regen (+2,600 HP)

{{CALLOUT:mechanics|Str-J}} Increases physical attack power. Priority junction for Squall, Zell, and Irvine.
- Best: Ultima (+100 Str), Meteor (+75 Str), Aura (+70 Str), Flare (+56 Str)
- Good: Top-tier elemental spells (Firaga/Thundaga/Blizzaga) — replace with Meteor or better as soon as available

{{CALLOUT:mechanics|Vit-J}} Raises physical defense, reducing incoming physical damage.
- Best: Meltdown (+80 Vit), Full-Life (+80 Vit), Regen (+70 Vit), Curaga (+65 Vit)
- Note: Meltdown is both the best Vit-J spell AND the most powerful debuff (sets enemy Vit to 0) — stock separately for each use

{{CALLOUT:mechanics|Mag-J}} Increases offensive spell damage and healing spell potency.
- Best: Ultima (+100 Mag), Triple (+70 Mag), Meteor (+52 Mag), Flare (+44 Mag)
- Note: Triple is also in high demand for Spd-J — prioritize which character needs Spd more before assigning Triple here

{{CALLOUT:mechanics|Spr-J}} Raises magical defense, reducing damage from spells and GF summons.
- Best: Ultima (+95 Spr), Full-Life (+85 Spr), Reflect (+72 Spr), Curaga (+65 Spr)

{{CALLOUT:mechanics|Spd-J}} Increases ATB fill rate — the most impactful stat for turn frequency.
- Best: Triple (+70 Spd), Ultima (+60 Spd), Haste (+50 Spd), Stop (+48 Spd)
- Note: Triple is the highest Spd-J spell in the game (+70) and also provides top Eva (+40) and Hit (+150) values — most characters use Triple here; assign after evaluating which stat each character needs most

{{CALLOUT:mechanics|Eva-J}} Increases the chance to dodge physical attacks entirely.
- Best: Triple (+40 Eva), Tornado (+32 Eva)

{{CALLOUT:mechanics|Hit-J}} Increases physical attack accuracy and status-infliction success rate.
- Best: Triple (+150 Hit — far above all others), Ultima (+60 Hit), Aura (+50 Hit), Tornado (+38 Hit)
- Note: 100× Triple is the only way for Irvine, Rinoa, and Quistis to achieve the 255 Hit cap (perfect accuracy)

{{CALLOUT:mechanics|Luck-J}} Affects critical hit rate, item drop rates, card game outcomes, and certain random events.
- Best: Aura (+40 Luck), Pain (+40 Luck), Death (+38 Luck)
- Note: High Luck amplifies critical hit chance directly via the damage formula — valuable on a dedicated Limit Break character

{{CALLOUT:mechanics|ST-Atk-J (Status Attack)}} Gives every physical hit a chance to inflict the junctioned status on the target.
- Crowd control: Sleep, Blind, Slow — stall or neuter enemy turns
- Aggressive: Death (instant KO on contact — very powerful mid-game), Zombie (reverses enemy healing)
- Utility: Haste at ST-Atk-J spreads Haste to allies when striking the same target

{{CALLOUT:mechanics|ST-Def-J (Status Defense)}} Grants immunity or strong resistance to the junctioned status at 100 stock.
- Disc 2 priorities: Blind, Silence (common enemy inflictions)
- Disc 3 add: Petrify, Confuse, Stop
- Disc 4 add: Curse, Zombie (Forbidden, Malboro, Tri-Face inflict these in Ultimecia's Castle)
- Note: Holy at ST-Def-J provides ~40% resistance to 8 statuses simultaneously (Death, Poison, Berserk, Zombie, Sleep, Curse, Confuse, Drain) — the most efficient single-slot status defense available

{{CALLOUT:mechanics|Elem-Atk-J (Elemental Attack)}} Adds an elemental affinity to physical strikes, amplifying damage against enemies with a matching weakness.
- Match the enemy's elemental weakness — Fire vs. Ice-weak, Thunder vs. Water-weak, etc.
- Ultima has no element and provides no Elem-Atk benefit; always use a specific elemental spell here

{{CALLOUT:mechanics|Elem-Def-J (Elemental Defense)}} Reduces or nullifies damage from the junctioned element.
- Flare in one slot provides ~80% resistance to Fire, Ice, and Thunder simultaneously — the most efficient single-slot elemental defense in the game
- Tornado in one slot absorbs Wind (+200%); for Earth coverage use Quake (+200% Earth) or Meteor (+150% to both Earth and Wind simultaneously)
- Ultima in one slot provides +100% resistance to all 8 elements simultaneously — full immunity to every element from a single junction; best reserved for characters who have Ultima freed from HP-J or Str-J duty
- When the total Elem-Def value for an element exceeds 100%, damage converts to HP recovery (absorption)

{{CALLOUT:mechanics|Recommended junction build for Disc 3}} \n- HP-J: Ultima → +6,000 HP (best); Meteor → +4,600 HP; Holy → +3,800 HP\n- Str-J: Ultima → +100 Str (max); Meteor → +75 Str; Flare → +56 Str; Aura → +70 Str\n- Vit-J: Meltdown → +80 Vit; Full-Life → +80 Vit; Regen → +70 Vit; Curaga → +65 Vit\n- Mag-J: Ultima → +100 Mag; Triple → +70 Mag (second-best; note that Triple is also vital for Spd-J/HP-J — prioritize accordingly); Meteor → +52 Mag; Flare → +44 Mag\n- Spr-J: Ultima → +95 Spr; Full-Life → +85 Spr; Reflect → +72 Spr; Curaga → +65 Spr\n- Spd-J: Triple → +70 Spd (highest in game); Ultima → +60 Spd; Haste → +50 Spd; Stop → +48 Spd\n- Eva-J: Triple → +40 Eva (effectively +40 Speed for Eva formula); Tornado → +32 Eva\n- Luck-J: Aura → +40 Luck; Pain → +40 Luck; Death → +38 Luck\n- El.Def-Jx4: Flare (slot 1, +80% vs Fire/Ice/Thunder — **Flare uniquely covers all three attack elements simultaneously in one slot**; this non-obvious property makes it by far the most efficient early El.Def spell and worth junctioning as soon as it can be drawn or refined) + Life (slot 2, +30% all elements) + Shell (slot 3, +20% all elements) + Tornado (slot 4, absorbs Wind at +200%) — the Flare+Tornado combination is critical for the Ultimecia endgame. **El.Def absorption rule**: when the total El.Def value for an element exceeds 100%, the character absorbs that element (converts incoming damage to HP recovery). **Additional El.Def options by element**: Quake → +200% Earth (absorbs Earth with 100+ already applied, best single-element Earth shield); Meteor → +150% Earth AND +150% Wind in one slot (covers both Earth and Wind simultaneously, similar multi-element efficiency to Flare for Earth/Wind coverage); Float → +50% Earth (modest Earth shield that's easy to stock early); Tornado → +200% Wind (absorbs Wind — same as Flare covers Fire/Ice/Thunder, Tornado is the strongest Wind defense); Holy → +200% Holy (highest Holy defense). For Earth immunity specifically, the Quake junction alone provides absorption at 200%; pairing it with Tornado covers both Earth and Wind slots efficiently.\n- St.Def-Jx4: Pain (blocks Poison+Darkness+Silence+Curse) + Confuse + Berserk + Death (or Sleep vs Malboros). Note: Holy junctioned to St.Def grants 40% protection vs 8 statuses simultaneously (Death, Poison, Berserk, Zombie, Sleep, Curse, Confuse, Drain) — a strong single-slot choice if St.Def-Jx4 is not yet available

**Final junction checklist for the primary team:**
- **HP-J**: Meteor (+4,600 HP) or Holy (+3,800 HP) on characters without Ultima (→ 9,999 max HP target with HP+80% GF ability)
- **Str-J**: Ultima (maxes Str)
- **Vit-J**: Meltdown
- **Mag-J**: Tornado or Demi
- **Spr-J**: Reflect (high Spr cuts Meteor/Ultima damage dramatically)
- **Spd-J**: Triple (+70 Spd, highest in game); Ultima if Triple is used elsewhere
- **Eva-J**: Tornado (+32 Eva) or Slow (+20 Eva) when Triple is on Spd-J
- **Luck-J**: Aura
- **El.Att-J**: Poison class (Ultimecia Form 1 is weak to Poison ×1.5; no Holy — Ultimecia is immune/absorbed; no Fire/Thunder/Wind — bosses absorb or use these)
- **El.Def-J**: Flare (covers Ultimecia's Dark Flare and various elemental attacks)
- **St.Def-J**: Pain (blocks Poison, Darkness, Silence, and Curse simultaneously — 4 statuses from one slot), Sleep, Confuse, Berserk
- **Character abilities**: Auto-Haste + Str+60% + Auto-Shell + Spr+60% on all three`,
  },
  {
    id: 'r0-seed-system',
    title: 'SeeD Rank & Salary',
    disc: 0,
    content: `Squall holds a SeeD rank that determines the salary paid automatically at regular step intervals. Starting rank comes from the Fire Cavern and Dollet field exam, then later story choices, written tests, battles, and salary payouts move the hidden SeeD Exp value up or down.

{{CALLOUT:mechanics|SeeD Experience system}} SeeD Rank is based on hidden **SeeD Exp**: Rank = floor(SeeD Exp / 100). Rank A is the maximum and starts at 3,100 SeeD Exp. The hard cap is 3,110 SeeD Exp, so receiving salary at Rank A costs 10 SeeD Exp and drops you back to Rank 30 unless you earn at least 10 enemy kills before the next salary interval.

{{CALLOUT:mechanics|Routine SeeD Exp changes}}
| Event | SeeD Experience Change |
| --- | --- |
| Defeat an enemy with a party member | +1 |
| Receive SeeD salary | -10 |
| Pass a SeeD Test from the menu | Rounded up to the next 100 SeeD Exp |

GF kills and delayed-status kills do not count for the +1 enemy-kill gain. SeeD Tests do not add a flat 100; they raise the hidden value only to the next rank threshold. Tests are capped by Squall's current character level.

{{CALLOUT:mechanics|Salary payment interval}} Salary is paid every **24,575 internal steps**. One visible footstep usually counts as several internal steps. Chocobo movement and car movement count; moving Balamb Garden or the Ragnarok does not.

{{CALLOUT:mechanics|Initial SeeD Rank formula}} The starting rank is calculated from five exam categories. Add the category modifiers to 500, divide by 100, round down, then clamp to Rank 1-10. Destroying X-ATM092 adds 100 points before the final rank clamp; showing off the gunblade to the students on Balamb Garden 2F removes 100 points before the final rank clamp.

{{CALLOUT:hint|Player-facing route for a high starting rank}} Finish Dollet quickly, leave Ifrit's timer as close to zero as practical, fight enough enemies during the exam route if you are min-maxing, use only the mandatory escape from X-ATM092, avoid casual NPC chatter while in uniform, save the dog, do not hide in the pub, and destroy X-ATM092 if your route supports it.

{{CALLOUT:mechanics|Conduct: Dollet evacuation timer}}
| Time Remaining | In-Game Score | Experience Modifier |
| --- | --- | --- |
| 30:00 - 25:00 | 100 | +80 |
| 24:59 - 24:00 | 90 | +70 |
| 23:59 - 23:00 | 80 | +60 |
| 22:59 - 20:00 | 70 | +50 |
| 19:59 - 19:00 | 60 | +30 |
| 18:59 - 17:00 | 50 | +20 |
| 16:59 - 15:00 | 40 | +10 |
| 14:59 - 10:00 | 30 | 0 |
| 9:59 - 6:00 | 20 | -30 |
| 5:59 - 3:00 | 10 | -50 |
| 2:59 - 0:00 | 0 | -100 |

{{CALLOUT:mechanics|Judgment: Ifrit timer}}
| Time Remaining | In-Game Score | Experience Modifier |
| --- | --- | --- |
| 0:07 - 0:00 | 100 | +80 |
| 0:29 - 0:08 | 90 | +70 |
| 0:59 - 0:30 | 80 | +60 |
| 1:59 - 1:00 | 70 | +50 |
| 2:59 - 2:00 | 60 | +30 |
| 9:59 - 3:00 | 50 | 0 |
| 10:59 - 10:00 | 40 | -50 |
| 11:59 - 11:00 | 30 | -60 |
| 12:59 - 12:00 | 20 | -70 |
| 13:59 - 13:00 | 10 | -90 |
| 14:59 - 14:00 | 5 | -90 |
| 15:00+ | 0 | -100 |

{{CALLOUT:note|Ifrit timer caveat}} The old naming-screen idle trick is version-sensitive. On modern versions, manually manage the timer and leave the naming screen with only a few seconds remaining rather than relying on the original timer behavior.

{{CALLOUT:mechanics|Attack score: enemy kills during the exam}}
| Kills | In-Game Score | Experience Modifier |
| --- | --- | --- |
| 75+ | 100 | +100 |
| 50 - 74 | 80 | +75 |
| 25 - 49 | 80 | +50 |
| 20 - 24 | 50 | +50 |
| 15 - 19 | 30 | 0 |
| 10 - 14 | 20 | -50 |
| 0 - 9 | 0 | -100 |

{{CALLOUT:mechanics|Spirit score: escape count}}
| Escapes | In-Game Score | Experience Modifier |
| --- | --- | --- |
| 1 | 100 | +100 |
| 2 | 90 | +85 |
| 3 - 4 | 80 | +70 |
| 5 - 9 | 70 | +50 |
| 10+ | 60 | +30 |

The mandatory beach escape from X-ATM092 is the ideal single escape. Extra escapes lower the score band.

{{CALLOUT:mechanics|Attitude deductions}}
| Action | Deduction(s) |
| --- | --- |
| Talk to anyone except Seifer or Zell from the moment Squall wears the uniform until the exam dismissal, excluding forced progress conversations | 1 each |
| Disobey Seifer's order in the submarine | 1 |
| Try to move toward the Comm Tower before Seifer orders it | 1 each |
| Talk to Biggs after defeating him | 2 each |
| Jump off Selphie's cliff shortcut | 5 |
| Fail to save the dog before X-ATM092 reaches that screen | 10 |
| Hide in the pub while X-ATM092 passes | 20 |

Talking to Seifer or Zell while inside the submarine still counts as a deduction. Talking to Biggs after his fight uses the Biggs-specific deduction instead of the standard one.

{{CALLOUT:mechanics|Attitude score from deductions}}
| Deductions | In-Game Score | Experience Modifier |
| --- | --- | --- |
| 0 | 100 | +100 |
| 1 - 8 | 80 | +70 |
| 9 - 13 | 70 | +50 |
| 14 - 17 | 50 | +30 |
| 18 - 24 | 30 | 0 |
| 25 - 29 | 10 | -50 |
| 30 - 39 | 10 | -60 |
| 40 - 49 | 10 | -80 |
| 50+ | 10 | -100 |

{{CALLOUT:mechanics|Fixed SeeD Rank and SeeD Exp events}}
| Event | Change |
| --- | --- |
| Show Squall's gunblade to the students on Balamb Garden 2F before the field exam | -1 starting SeeD Rank |
| Try to sneak out of the graduation party at least three times | -1 SeeD Rank |
| Forest Owls train mission: caught 0 times | +1 SeeD Rank |
| Forest Owls train mission: caught 1-9 times | No change |
| Forest Owls train mission: caught 10+ times | -1 SeeD Rank |
| Escape Tomb of the Unknown King with the map option | -1 SeeD Rank |
| Missile Base mission begins | +200 SeeD Exp before deductions |
| After NORG, cast magic for the boy in Balamb Garden 2F hallway | -1 SeeD Rank |
| Complete Master Fisherman's quest | +20 SeeD Exp |
| Complete the Shumi Village stone phase | +50 SeeD Exp |
| Disc 2 Balamb: find the Captain by boarding the train | +65 SeeD Exp |
| Disc 2 Balamb: find the Captain by using the dog route | +100 SeeD Exp |
| Disc 2 Balamb: take too long until the Captain appears at the hotel | No change |
| Defeat Ultima Weapon | +1 SeeD Rank |

{{CALLOUT:mechanics|Missile Base deductions}}
| Action | Experience Deduction |
| --- | --- |
| Give incorrect information to inspectors or soldiers | -7 |
| Fight instead of talking your way out, excluding forced fights | -105 |
| Set the timer to 10 minutes | 0 |
| Set the timer to 20 minutes | -15 |
| Set the timer to 30 minutes | -45 |
| Set the timer to 40 minutes | -75 |
| Receive deductions in more than one category | Additional random -2 to -8 |

{{CALLOUT:mechanics|Disc 2 Balamb Selphie penalty}} If Selphie is in the party during the Balamb occupation scene in Zell's room, siding with Zell or saying Selphie is annoying costs **-1 SeeD Rank**. Keep the dialogue friendly if you care about rank.

{{CALLOUT:mechanics|Forest Owls train mission reference}} The train mission has seven phases and a strict five-minute timer; timeout is Game Over. During the roof section, move when the red soldier scans, stop when the blue soldier scans, and treat closed blinds as safe because neither guard is scanning. The first uncoupling requires three correct code sequences with five seconds per sequence; check before entering each code because starting a sequence commits you. The second uncoupling requires five correct sequences. A wrong input or timeout clears code progress but does not count as being caught; retrying after actual detection does count as caught.

{{CALLOUT:mechanics|SeeD salary table}}
| SeeD Rank | Salary |
| --- | --- |
| 1 | 500 Gil |
| 2 | 1,000 Gil |
| 3 | 1,500 Gil |
| 4 | 2,000 Gil |
| 5 | 3,000 Gil |
| 6 | 4,000 Gil |
| 7 | 5,000 Gil |
| 8 | 6,000 Gil |
| 9 | 7,000 Gil |
| 10 | 8,000 Gil |
| 11 | 9,000 Gil |
| 12 | 10,000 Gil |
| 13 | 11,000 Gil |
| 14 | 12,000 Gil |
| 15 | 12,500 Gil |
| 16 | 13,000 Gil |
| 17 | 13,500 Gil |
| 18 | 14,000 Gil |
| 19 | 14,500 Gil |
| 20 | 15,000 Gil |
| 21 | 15,500 Gil |
| 22 | 16,000 Gil |
| 23 | 16,500 Gil |
| 24 | 17,000 Gil |
| 25 | 17,500 Gil |
| 26 | 18,000 Gil |
| 27 | 18,500 Gil |
| 28 | 19,000 Gil |
| 29 | 19,500 Gil |
| 30 | 20,000 Gil |
| A | 30,000 Gil |

{{CALLOUT:note|SeeD Test Answers — Tests 01-05}}
- Test 01: Y, N, Y, Y, Y, N, N, Y, N, N
- Test 02: Y, N, Y, Y, Y, N, Y, Y, N, N
- Test 03: N, N, Y, N, Y, Y, Y, N, Y, N
- Test 04: N, Y, Y, Y, N, N, Y, Y, N, N
- Test 05: N, N, N, Y, Y, N, N, Y, Y, Y

{{CALLOUT:note|SeeD Test Answers — Tests 06-10}}
- Test 06: Y, N, Y, Y, N, N, Y, Y, N, Y
- Test 07: Y, Y, Y, Y, Y, Y, N, Y, Y, N
- Test 08: N, Y, N, N, Y, Y, N, N, Y, N
- Test 09: N, Y, N, N, N, N, N, N, Y, Y
- Test 10: Y, N, N, N, N, N, N, N, Y, N

{{CALLOUT:note|SeeD Test Answers — Tests 11-15}}
- Test 11: Y, Y, N, Y, Y, N, Y, N, N, Y
- Test 12: N, Y, N, N, Y, N, Y, N, Y, N
- Test 13: Y, N, N, N, Y, N, N, N, N, N
- Test 14: Y, Y, Y, Y, N, Y, Y, N, Y, N
- Test 15: Y, Y, N, N, N, N, N, Y, N, Y

{{CALLOUT:note|SeeD Test Answers — Tests 16-20}}
- Test 16: Y, N, N, Y, N, Y, N, N, Y, N
- Test 17: Y, N, N, N, Y, N, N, Y, N, N
- Test 18: Y, N, N, N, Y, N, N, N, N, N
- Test 19: Y, N, N, Y, N, N, N, N, N, Y
- Test 20: Y, Y, N, Y, N, Y, Y, Y, N, N

{{CALLOUT:note|SeeD Test Answers — Tests 21-25}}
- Test 21: Y, Y, Y, Y, N, N, Y, Y, Y, N
- Test 22: N, N, N, Y, N, N, N, Y, Y, N
- Test 23: Y, N, N, N, N, Y, Y, Y, Y, Y
- Test 24: Y, Y, N, N, Y, Y, N, N, N, Y
- Test 25: Y, N, Y, Y, Y, N, N, Y, N, N

{{CALLOUT:note|SeeD Test Answers — Tests 26-30}}
- Test 26: Y, Y, N, Y, N, Y, N, Y, N, N
- Test 27: N, Y, N, N, N, N, Y, N, Y, N
- Test 28: Y, N, N, Y, Y, Y, N, Y, N, N
- Test 29: N, N, N, Y, Y, N, N, N, Y, N
- Test 30: N, Y, N, N, N, N, Y, N, N, N`,
  },
  {
    id: 'r0-triple-triad-rules',
    title: 'Triple Triad Rules',
    disc: 0,
    content: `Triple Triad is played on a 3×3 grid with each player placing five cards. Cards have four numeric values (Top, Bottom, Left, Right; A represents 10). When you place a card adjacent to an opponent's card and your touching side exceeds theirs, you flip it to your color. The player controlling more cards when the grid is full wins.

{{CALLOUT:card|Play Rule: Open}} Both players can see all cards in each other's hand before placement begins. Eliminates guesswork entirely — play becomes a pure strategy game with full information.

{{CALLOUT:card|Play Rule: Same}} When the placed card's values match two or more sides touching adjacent opponent cards simultaneously, all matching opponent cards flip at once. Chains with Combo.
- Example: you place a card with Right=7 and Bottom=7 next to two opponents cards whose touching sides also show 7 each — both flip simultaneously

{{CALLOUT:card|Play Rule: Same Wall}} Treats the outer grid border as a value of A (10) for the purpose of the Same rule. Allows edge placements to trigger Same even without two adjacent opponent cards.

{{CALLOUT:card|Play Rule: Plus}} When the placed card's value plus the touching side of one opponent card equals the same sum as the placed card's value plus a second adjacent touching side, all involved opponent cards flip simultaneously.
- Example: your Right=5 touches opponent's Left=3 (sum 8) and your Bottom=6 touches opponent's Top=2 (sum 8) → both flip. More complex to set up than Same but catches experienced opponents off guard.

{{CALLOUT:card|Play Rule: Combo}} Cards that flip due to Same, Plus, or Same Wall then act as though freshly placed, potentially flipping additional adjacent opponent cards through normal value comparisons. Can cascade across the entire board in a single turn.

{{CALLOUT:card|Play Rule: Elemental}} Random elemental symbols are assigned to some grid squares before the game. A card placed on a matching element gains +1 to all four values; a mismatched element imposes −1 to all four. Elements correspond to the eight GF affinities (Fire, Ice, Thunder, Earth, Wind, Water, Holy, Poison).

{{CALLOUT:card|Play Rule: Sudden Death}} If the final score is tied at 5–5, both players keep only the cards currently showing their color, then replay with those cards. Continues until a winner emerges.
- Warning: avoid ties when playing for specific rare cards — if you don't own the card you want at the replay start, you cannot win it

{{CALLOUT:card|Play Rule: Random}} Instead of choosing five cards, both players have five cards dealt randomly from their entire deck.
- Mitigate by keeping your full deck stocked with high-value cards; low-value cards in the collection become a liability

{{CALLOUT:card|Trade Rule — One}} Winner takes one card from the loser's hand. The most common rule; standard for most NPC opponents.

{{CALLOUT:card|Trade Rule — Diff}} Winner takes a number of cards equal to the score difference. Winning 7–3 earns four cards; winning 8–2 earns six. Most rewarding for dominant victories.

{{CALLOUT:card|Trade Rule — Direct}} Each player claims only the cards that display their color at game end, regardless of which player originally played them. Your opponent can never take a card off your side of the board.

{{CALLOUT:card|Trade Rule — All}} Winner takes the opponent's entire five-card hand. High stakes for both sides — only play All against easy opponents when your own deck contains no irreplaceable cards.

{{CALLOUT:card|Regional Starting Rules}} - **Balamb**: Open only
- **Galbadia**: Same only (Timber, Galbadia Garden, Deling City, D-District Prison, East Train Station)
- **Dollet**: Random, Elemental
- **FH** (Fishermans Horizon): Elemental, Sudden Death
- **Trabia**: Random, Plus (T-Garden student in G-Garden locker room, Trabia Garden, Shumi Village)
- **Centra**: Same, Plus, Random (Winhill, Edea's House)
- **Esthar**: Elemental, Same Wall (Esthar City, Lunatic Pandora Laboratory)
- **Lunar**: Open, Same, Plus, Elemental, Same Wall, Random, Sudden Death (all rules active)
- Note: **Balamb Town harbor** has a "Student Skipping Class" NPC who plays with NO rules — challenging him clears all special rules from the Balamb region (does not affect trade rules)

{{CALLOUT:card|Rule Spreading Mechanics}} When you challenge someone in a different region from the last region you played in, the game may mix rules between them. One of three outcomes randomly occurs: a rule from your previous region may spread to the new region; a rule from the new region may be abolished; or nothing changes. This happens whether you win, lose, or quit.
- The most dangerous spread is **Random** reaching Balamb or any low-rule region — it makes card-farming unreliable since you cannot choose your own hand
- To limit spreading: repeatedly challenge NPCs in the same region without crossing into new areas
- The **Queen of Cards** NPC has her own personal trade rule and can influence the region she's in: every challenge in her region has a ~1/3 chance of adopting her personal trade rule. Challenge anyone in her region (not the Queen herself) to push the trade rule toward her personal rule

{{CALLOUT:card|Abolishing Rules}} To remove an unwanted rule from a region, challenge someone there with mixed rules (from a different region) and hope for abolition — save before attempting. Each attempt has a random chance of abolishing a rule, adding a rule, or no change.
- **Fastest method**: use the Student Skipping Class in Balamb Town to wipe all Balamb special rules at once
- Priority targets: remove Random from any region you plan to farm cards in; Random makes card selection impossible

{{CALLOUT:warning|RNG rule-change route caveats}} If you are following an exact RNG route for spreading or abolishing card rules, small deviations matter. Hard-reset before the attempt, take the shortest route from the save point to the card player, and follow the listed challenge/quit sequence exactly. Modern Remaster behavior changes several old tricks: magazine-stack manipulation is unreliable, soft-reset assumptions do not carry over cleanly, and 3x Speed can throw off timing-sensitive rule changes. The Queen of Cards also changes which procedure applies when she is physically in the region.

{{CALLOUT:card|Trade Rule Dominance System}} The game tracks a dominance counter (0–10) for trade rules. Playing a card game in the currently dominant region raises the counter by 1; playing in any other region lowers it by 1. When the counter reaches 0 and you play in a different region, that region becomes the new dominant region and the counter resets to 1. To reliably lock a region as dominant, play 11 consecutive games there to bring the counter to its maximum. Once dominant, that trade rule slowly spreads to other regions as you play there. The trade rule degrades through the chain One ← Diff ← Direct ← All (each step goes down one tier; One stays at One). Check the current dominant region and pattern by speaking to the Queen of Cards.

{{CALLOUT:card|Queen of Cards — Service and Movement}} The Queen of Cards offers two services: changing the local trade rule (free — just play a card game against her) and spreading a play rule to her current region for 30,000 gil. The 30,000 gil service cycles through play rules in this order: Open → Same → Plus → Random → Sudden Death → Same Wall → Elemental — she always offers the first rule in this sequence that the current region does not yet have. If you want a specific region to have a specific rule, bring the Queen there first (by losing to her) and use this service.

{{CALLOUT:card|Queen of Cards movement table}} To move her, lose a card game against her; she then travels to one of the following locations. The number in parentheses is the probability she moves to each destination.
- From **Balamb**: Dollet (37.5%), Deling City (62.5%)
- From **Dollet**: Balamb (37.5%), Deling City (62.5%)
- From **Deling City**: Balamb (12.5%), Dollet (12.5%), Winhill (12.5%), FH (62.5%)
- From **Winhill**: Deling City (37.5%), Dollet (37.5%), FH (25%)
- From **FH**: Dollet (12.5%), Winhill (25%), Esthar (62.5%)
- From **Esthar**: Dollet (12.5%), Shumi Village (25%), FH (12.5%), Lunar Gate (50%)
- From **Shumi Village**: Balamb (25%), Dollet (50%), Lunar Gate (25%)
- From **Lunar Gate**: Random — any area, with no hint given

Her actual location within the destination area: Balamb → Balamb Town Station; Dollet → Dollet Pub upstairs; Galbadia/Deling → Deling City Hotel; Shumi Village → Shumi Village Hotel; Centra/Winhill → Winhill Hotel; FH → FH train tracks (near save point); Esthar → Presidential Palace (elevator screen); Lunar Gate → Lunar Gate hallway background.

{{CALLOUT:card|Disc 4 card farming tip}} Before entering Disc 4, move the Queen of Cards to Shumi Village and set the Trabia region trade rule to Diff. On Disc 4 the CC-Group Left Diamond Girl (on the Ragnarok) plays under Trabia rules and deals the best rare cards. With the Queen at Shumi Village (which uses Trabia rules), you can play her there to adjust the trade rule for the Left Diamond Girl without ever leaving the Ragnarok region.`,
  },
  {
    id: 'r0-gf-mechanics',
    title: 'GF Mechanics',
    disc: 0,
    content: `Guardian Forces are summoned entities that provide passive stat junctions, command abilities, and an active summon attack. All 16 GFs can be collected and distributed across the party (multiple GFs per character allowed). Each GF has its own level and AP progression independent of the characters it is junctioned to.

{{CALLOUT:mechanics|Summoning}} Selecting the GF command begins a charge animation that fills a bar over several seconds. During the entire charging phase, the junctioning character absorbs incoming damage on the GF's behalf using the GF's own HP pool.
- If the GF's HP drops to zero mid-summon, the summon cancels and that character must try again next turn
- GF HP scales with GF level and is fully restored between battles — deliberately tanking hits with a GF is valid strategy
- Once the bar fills, the summon animation plays and damage is dealt

{{CALLOUT:mechanics|Boost}} While a GF is charging, pressing Square repeatedly increases the final damage multiplier.
- The counter starts at **75%** on the first press; each subsequent successful press adds **+1%** to summon damage
- The **maximum achievable value is 250%** (2.5× base damage) — only achievable with Eden's very long animation (72.6 seconds); most GFs cap out in the 180–240% range given their shorter animations (e.g., Quezacotl ~180% in 13.3 sec; Brothers ~220% in 19.3 sec; Eden is the only GF that can reach 250%)
- Missing a press (holding Square too long when the no-press window appears) resets the counter partially back toward 75%
- The GF must have the Boost ability unlocked via AP before the Boost prompt appears
- **Status attacks affect the summoner, not the GF**, during the summon animation — Silence, Berserk, or KO on the summoner cancels the charge; Petrify also interrupts. Healing items and recovery magic used on the summoner during charging restore the summoner's HP, not the GF's

{{CALLOUT:mechanics|GF Compatibility}} Each GF has a separate Compatibility value with every character, ranging from 0 to 1,000. Higher Compatibility reduces the summon charge time for that GF with that character.
- Compatibility rises when: the GF is summoned in battle, or the character uses a Compatibility-raising item
- Compatibility falls slightly when: a different GF is summoned in the same battle (rival penalty)
- Summon time benchmarks by Compatibility: **0** ≈ 16.8 sec · **500** ≈ 10.2 sec · **1,000** ≈ 2.8 sec — at max Compatibility the charge bar fills almost immediately, making GF summons viable even in fast-paced fights

{{CALLOUT:mechanics|Compatibility-Raising Items}} Using certain consumable items in the menu raises a GF's Compatibility with the current character. Most specific items give **+3.2** to the target GF but **−1.6** to every other junctioned GF. Half-value items (Arctic Wind, Bomb Fragment, Poison Powder, Shear Feather) give +1.6/−0.8 instead. Fish Fin is a further exception at +2/−1. **LuvLuv G** is the only item with no penalty — it raises every junctionable GF by +20 simultaneously and is the fastest single method to max all compatibilities. Values per use:
- Quezacotl: Dynamo Stone (+3.2) | Shiva: North Wind (+3.2), Arctic Wind (+1.6)
- Ifrit: Red Fang (+3.2), Bomb Fragment (+1.6) | Siren: Silence Powder (+3.2)
- Brothers: Dino Bone (+3.2) | Diablos: Steel Orb (+3.2)
- Carbuncle: Dragon Skin (+3.2) | Leviathan: Fish Fin (+2, special case — not the standard +3.2)
- Pandemona: Windmill (+3.2), Shear Feather (+1.6) | Cerberus: Dragon Fin (+3.2)
- Alexander: Moon Stone (+3.2) | Doomtrain: Venom Fang (+3.2), Poison Powder (+1.6)
- Bahamut: Shaman Stone (+3.2) | Cactuar: Cactus Thorn (+3.2)
- Tonberry: Chef's Knife (+3.2) | Eden: no item; summoning Eden gives +2 to Eden and +1 to every other junctioned GF
- LuvLuv G: +20 to all 16 junctionable GFs (no negative side-effect)

{{CALLOUT:mechanics|AP Spending Priorities}} Each GF unlocks abilities from a branching tree using battle-earned AP. Recommended early targets:
- **HP+20/40/80%** (any GF): passive HP expansion — unlock as early as possible
- **Card** (Quezacotl, 40 AP): enables card capture in battle — required for Triple Triad collection
- **T Mag-RF / I Mag-RF / F Mag-RF / L Mag-RF** (Quezacotl, Shiva, Ifrit, Siren): refine items into magic stocks
- **Enc-None** (Diablos, 60 AP): eliminates random battles — invaluable for exploration and farming efficiency
- **Move-Find** (Siren, 40 AP): reveals hidden field draw points and treasure spots on the overworld
- **Mug** (Diablos or Cactuar): steal items during battle — replaces the Attack command with a steal-and-strike
- **Auto-Haste** (Cerberus): character always starts battles with Haste — frees up ST-Atk-J for other uses

{{CALLOUT:mechanics|Rival Pairs (Compatibility Penalty)}} Summoning any GF gives that GF +20 Compatibility, costs all other junctioned GFs −1.6, and costs the opposed (rival) GF an additional −10. Complete rival pairs:
- Quezacotl ↔ Leviathan | Shiva ↔ Ifrit | Siren ↔ Carbuncle
- Brothers ↔ Pandemona | Alexander ↔ Doomtrain
- Diablos, Cerberus, Bahamut, Cactuar, Tonberry, and Eden have no rival
- Minimize penalties by assigning rival GFs to separate characters so their summons don't overlap

{{CALLOUT:mechanics|GF leveling — EXP per level}} Most GFs need **500 EXP** to gain a level. Three GFs level faster: **Siren**, **Carbuncle**, and **Cerberus** each require only **400 EXP per level**. **Eden** levels much slower, requiring **1,000 EXP per level**. All GFs gain EXP from battles as long as they are junctioned to a character who participated in the fight. All GFs cap at level 100.

{{CALLOUT:mechanics|Damage cap exceptions}} The standard battle damage cap of 9,999 has three exceptions involving GFs: **Eden's Eternal Breath** can reach **60,000 damage** at maximum Boost; **Lv100 Cactuar's 1000 Needles** deals exactly **10,000 damage** (ignores the 9,999 cap); and **Chocobo's ChocoBocle** attack (requires Chocobo World — built into FF8 Remastered) can also exceed 9,999.

{{CALLOUT:mechanics|Eden — Unique Properties}} Eden is the last GF available and has unique properties compared to the others.
- Eden's summon animation lasts approximately 72 seconds — the longest of any GF — which is why it can reach the full 250% Boost ceiling
- Summoning Eden gives +2 Compatibility to Eden itself AND +1 Compatibility to every other junctioned GF simultaneously — uniquely beneficial for boosting overall GF compatibility efficiently — the longest in the game; GF HP tanking is crucial during this window
- Deals non-elemental magic damage regardless of the target's elemental affinities
- Draw Eden from Ultima Weapon in the Deep Sea Research Center; final chance is drawing from Tiamat in Ultimecia's Castle

{{CALLOUT:mechanics|GF ability priority guide}} learn these first after the Fire Cavern:\n- **Quezacotl**: Card → Card Mod → T Mag-RF → I Mag-RF → Boost\n- **Shiva**: I Mag-RF → T Mag-RF → Card → Card Mod → Boost\n- **Ifrit**: Str+20% → Str+40% → Mad Rush → Str Bonus → Boost (**Mad Rush** is a command ability that simultaneously applies Protect, Berserk, and Haste to all party members — notably, it bypasses Berserk immunity even on characters with 100% Berserk resistance junctioned; use it only when losing character control is acceptable, such as when all three characters have high Strength and Attack-heavy loadouts)\n\nWith I Mag-RF (Shiva), Snow Lion Cards refine into **Blizzaga**, and Cockatrice Cards refine into **Thundaga**. With T Mag-RF (Quezacotl/Shiva), Ruby Dragon Cards refine into **Flare**, Blitz Cards refine into **Thundaga**, and Hexadragon Cards refine into **Firaga**. **Early ammo chain**: Once Card Mod is learned, 5× Geezard Card → Card Mod → **Screw** → Ammo-RF (Ifrit) → 8× Normal Ammo per Screw. Screws can also be upgraded to **Fast Ammo** via Ammo-RF — useful if Irvine is in the active party. Key command ability AP costs for reference: Card 40 AP, Card Mod 80 AP, T Mag-RF 30 AP, I Mag-RF 30 AP, F Mag-RF 30 AP, L Mag-RF 30 AP, Time Mag-RF 30 AP, ST Mag-RF 30 AP, Supt Mag-RF 30 AP (refines into Esuna/Dispel/Protect/Shell/Reflect/Drain/Aura), Mid Mag-RF 60 AP (upgrades low-tier spells to mid-tier), High Mag-RF 60 AP (upgrades mid-tier to high-tier), Boost 10 AP, Str+20% 60 AP, Str+40% 120 AP.\n\n{{CALLOUT:mechanics|Level-gated GF abilities}} some abilities only appear in a GF's ability list once it reaches a minimum level:\n- **Shiva**: learns **Doom** (teaches the Doom command to the junctioned character) at **Lv 10**. The Doom command adds a visible countdown timer to one enemy — when that counter reaches zero the target is KO'd. Some enemies are immune; it costs no resources but fails on bosses. Doom does not coexist with Zombie status (inflicting Zombie on a Doomed character cancels the Doom countdown).\n- **Ifrit**: learns **Ammo-RF** (refines items into ammo) at **Lv 10** — prioritize leveling Ifrit to Lv10 early for the ammo refinement chain\n- **Siren**: learns **Treatment** (cures abnormal statuses on a party member — full cure list: Poison, Petrify, Darkness, Silence, **Zombie**, Sleep, Berserk, Slow, Stop, Curse, Petrifying, Confuse, and **Vit 0**; notably Treatment cures **Zombie** and **Vit 0**, which Remedy does NOT cure — this makes Treatment strictly superior to Remedy for those two conditions) at **Lv 12**. **Treatment teach item**: the **Med Kit** item teaches Treatment to any GF (100 AP). Med Kit is crafted via Eden's **GFAbl Med-RF**: 100× Dragon Fang → 1× Med Kit. Dragon Fangs drop from Grendels (forest near Galbadia Garden, or DSRC fixed encounters). This allows placing Treatment on any GF beyond Siren — useful when Siren is occupied by another character or not yet at Lv 12\n- **Cerberus**: learns **Expend×2-1** (under Double status, magic costs only 1 stock instead of 2) at **Lv 30** — distinct from Expend×3-1 which only applies under Triple. Having both means a character under Double expends 1 stock per cast instead of 2, and under Triple expends 1 instead of 3. Both abilities must be equipped simultaneously to benefit from each effect. Expend×2-1 is only available from Cerberus; Expend×3-1 is taught by Three Stars items (Card Mod Squall Card or Omega Weapon drop)

{{CALLOUT:mechanics|Quistis Blue Magic complete teach-item reference}} Every Blue Magic except **Laser Eye** is unlocked by using a specific item on Quistis. **Laser Eye requires no item** — it is available from the moment Quistis joins the party and is her default starting Blue Magic. All teach-item Blue Magics are learned instantly when the item is used on Quistis from the Item menu outside of battle; one unit of the item is consumed and the skill is learned immediately without needing to be in a fight. Items already noted above cover Spider Web (Ultra Waves), Missile (Micro Missiles), and the Disc 1 set. Remaining items and when to collect them: **Running Fire** (mugged from SAM08G enemies in Galbadia, first available near the Communications Tower area) → teaches **Gatling Gun** (single-target physical damage); **Inferno Fang** (mugged from Ruby Dragons, Lv30+ encounters in Galbadia/Centra/Esthar) → teaches **Fire Breath** (fire-elemental magic to all enemies); **Water Crystal** (mugged from Fastitocalon enemies — the large non-F variants, found in coastal areas near Esthar) → teaches **Aqua Breath** (water-elemental magic to all enemies); **Whisper** (mugged from Adamantoise; also an excellent Spr-J source via L Mag-RF: **1× Whisper → L Mag-RF → 50× Curaga**, which is the highest single-item Curaga yield in the game) → teaches **White Wind** (heals all allies by the difference between Quistis's max and current HP — the lower her current HP, the more it heals, so use it when Quistis is near death for maximum effect; **critical warning**: White Wind will instantly KO any ally under Zombie status since it counts as a healing effect); **Barrier** (mugged from Behemoth enemies, available from Disc 2 onward) → teaches **Mighty Guard** (CL1: Protect+Shell; CL2+: adds Regen, Haste, Float; CL3+: also adds Aura — one of the most powerful support Blue Magics in the game; at CL3 it grants six buffs to all allies simultaneously); **Power Generator** (found in the Lunatic Pandora via the Disc 1 dream triggers, or the Disc 3 Lunatic Pandora) → teaches **Ray Bomb** (non-elemental magic to all enemies). The final Blue Magic, **Shockwave Pulsar**, requires a Dark Matter (100× Curse Spike → Siren Tool-RF at Lv100). Collecting all 16 Blue Magics is not mandatory but Mighty Guard, LV? Death, Shockwave Pulsar, and Bad Breath are particularly valuable.

{{CALLOUT:mechanics|Post-Diablos card refinements}} Diablos brings **Time Mag-RF**, **ST Mag-RF**, and **Card Mod** — use them immediately. A priority early refinement: **Elastoid Card** × 1 → Card Mod → **Steel Pipe** → use a Steel Pipe on any GF to teach **SumMag+10%** (increases GF damage by 10%). With Diablos's Card Mod this is available right now at very little cost, since Elastoids appear commonly in the Galbadia forests. Quistis Card (won from Trepie #1) → Card Mod → **3× Samantha Soul** → Time Mag-RF → **60× Triple** each; Triple is the single best junction spell for HP and Str. **Gayla Cards** → Card Mod → **Mystery Fluid** — use on Quistis to teach **Acid** Blue Magic, OR refine via Siren **ST Mag-RF** → **10× Meltdown** per card (Vit-zero spell — makes every physical hit deal maximum damage; absolutely essential). **Gesper Cards** → Card Mod → **Black Hole** → use on Quistis to teach **Degenerator** Blue Magic (instant KO on most random encounters). **Malboro Cards** → Card Mod → **Malboro Tentacle** → use on Quistis to teach **Bad Breath** Blue Magic (inflicts 8 status ailments simultaneously). **Caterchipillar Cards** → Card Mod → **Spider Web** — use on Quistis to teach **Ultra Waves** Blue Magic (Water-elemental damage to all enemies), OR refine via Siren **ST Mag-RF** → **20× Slow** per web. **Mesmerize Cards** → Card Mod → **Mesmerize Blade** → Siren **L Mag-RF** → **Regen**. These spells substantially improve junctions for the rest of Disc 1.

{{CALLOUT:mechanics|SumMag bonus tier items}} all four tiers stack cumulatively up to +100% total GF damage: **SumMag+10%** (40 AP) → teach item: **Steel Pipe** (Card Mod Elastoid Cards, or mug from Wendigo/Iron Giant). **SumMag+20%** (70 AP) → teach item: **Star Fragment** (mug from Iron Giant, or Card Mod 9× Iron Giant Cards for weapon use vs. GF use — prioritize weapons first). **SumMag+30%** (140 AP) → teach item: **Energy Crystal** (Card Mod 10× Elnoyle Cards, or mug from Elnoyle; **Behemoth** at Lv30+ also drops Energy Crystal — useful as an alternative source; also used for ultimate weapons and Pulse Ammo — plan supply accordingly). **SumMag+40%** (200 AP) → teach item: **Samantha Soul** (Card Mod Quistis Card into 3× Samantha Soul, or via Adel Mug in d3-the-final-mission; note that Time Mag-RF converts each Samantha Soul into 20× Triple — decide between junctions and GF damage before spending them). Equipping all four tiers on a primary GF summon character raises that GF's damage output to double its base. **Eden** benefits the most from stacked SumMag since its base Eternal Breath damage is already the highest in the game and can push total output well above the standard 9,999 cap.

{{CALLOUT:mechanics|Spell-casting compatibility effects}} Casting magic in battle also shifts GF Compatibility values, not just summoning GFs. Elemental spells build affinity with the corresponding elemental GF at the cost of its rival. Key relationships: **Fire/Fira/Firaga** → +Ifrit, −Shiva; **Blizzard/Blizzara/Blizzaga** → +Shiva, −Ifrit; **Thunder/Thundara/Thundaga** → +Quezacotl, −Leviathan slightly; **Water** → +Leviathan, −Quezacotl/Pandemona; **Quake** → +Brothers; **Aero/Tornado** → +Pandemona; **Bio/Zombie/Slow/Stop/Blind/Berserk/Sleep** → +Doomtrain, +Siren slightly; **Silence** → +Siren most (+1.6), +Doomtrain; **Dispel** → −Carbuncle (−1.2), −Siren (−0.8), +Cerberus slightly; **Esuna** → −Siren (−1.2), +Carbuncle and Cerberus; **Holy** → +Alexander (+2.0), +Carbuncle, +Leviathan; **Protect/Shell/Reflect/Aura/Haste/Double** → +Carbuncle, +Cerberus; **Triple** → +Cerberus most (+2.0), +Carbuncle (+1.0); **Demi** → +Diablos (+2.0). Casting Eden (as a summon, not a spell) gives +2 to Eden and +1 to all other junctionable GFs — no negative side-effect. Spells like Drain, Meltdown, and Scan have no compatibility effect. This means the spell a character habitually casts passively shapes which GFs charge fastest for that character over the course of a playthrough.

{{CALLOUT:mechanics|Non-junctionable GFs}} Six GFs cannot be equipped to the Junction screen but still appear in battle under specific circumstances. These are **Odin, Gilgamesh, Phoenix, Chocobo, MiniMog, and Moomba** — with the last three requiring PocketStation (Chocobo World), a Japan-only hardware device that is emulated in the FF8 Remastered version.

- **Odin**: Obtained by defeating Odin in Centra Ruins within a 20-minute countdown. If the timer runs out while fighting him, the battle immediately becomes a guaranteed Game Over. His summon **Zantetsuken** instantly defeats all enemies in the battle. Odin cannot appear in battles involving: Tonberry, Grat, Cactuar, Vysage, Lefty, Righty, PuPu, UFO, and E-Soldier (cyborg variant) — he simply does not show up for those encounters. A key risk: Odin can interrupt battles at random, which can ruin attempts to draw spells from specific enemies. Obtain him with this in mind. If Odin is collected before the end of Disc 3, he is permanently replaced by Gilgamesh after the Disc 3 final boss — the two are mutually exclusive and cannot be held simultaneously.

- **Gilgamesh**: Replaces Odin automatically after the Disc 3 finale if Odin was held before that point. Unlike Odin who appears at fixed random chance, Gilgamesh can appear multiple times in a single battle and uses one of four attacks selected at random: **Zantetsuken** (same instant-kill as Odin, same immunity list); **Masamune** (very high non-elemental magical damage to all enemies — at Lv60, power reaches the 9,999 cap and beyond); **Excalibur** (moderate non-elemental magical damage to all enemies); and **Excalipoor** (deals exactly 1 damage to all enemies regardless of stats or defenses — non-elemental). Because Gilgamesh's appearance and attack choice are random, he is unpredictable. One risk: he can appear during Angelo Search attempts and disrupt the timing-based item retrieval. Obtain at your own risk.

- **Phoenix**: Obtained by using a Phoenix Pinion item during battle, which summons Phoenix once and registers it. After that initial use, Phoenix has a **12.5% chance of appearing automatically** whenever all three active party members are simultaneously KO'd — it performs **Rebirth Flame** (fire-elemental damage to all enemies) and revives all KO'd allies to 12.5% of their maximum HP. Phoenix Pinion items can be used repeatedly to summon Phoenix intentionally. Attack power scales with level: Lv1 = 393; Lv50 = 5,062; Lv100 = 9,825. Note: Rebirth Flame **instantly KOs** any ally under Zombie status (healing revives as damage for Zombie targets) — be aware if any party member is zombified when relying on the auto-revive.

- **Chocobo**: Obtained by solving any Chocobo Forest puzzle. Use Gysahl Greens in battle to summon. Chocobo has four attacks that unlock progressively through Chocobo World leveling: **ChocoFire** (fire-elemental, single attack — unlocked at Lv1); **ChocoFlare** (non-elemental, all enemies — unlocks near Lv50); **ChocoMeteor** (non-elemental, all enemies — unlocks near Lv63); **ChocoBocle** (non-elemental, all enemies, **breaks the 9,999 damage cap** — unlocks near Lv76). Attack power grows linearly with Chocobo's level; at Lv100: ChocoFire = 5,700, ChocoFlare = 8,700, ChocoMeteor = 9,999, ChocoBocle = 15,000. Chocobo cannot be junctioned.

- **MiniMog**: Obtained via the Mog's Amulet item from PocketStation. Teaching Mog's Amulet to any junctionable GF adds the **MiniMog command** to that GF's ability list. In battle, the MiniMog command triggers **Moogle Dance**, which restores HP to all junctioned GFs currently in the battle. The Gil cost of one use is: **100 × average party level**. MiniMog cannot be junctioned directly.

- **Moomba**: Obtained via the Friendship item from PocketStation. Using the Friendship item in battle summons Moomba, who attempts to reduce the target enemy to exactly 1 HP via **MoombaMoomba** (non-elemental magic damage = target's current HP − 1, capped at 9,999). This is useful for setting up Card or Devour attempts on tough enemies without killing them. Moomba cannot be junctioned.`,
  },
  {
    id: 'r0-story-lore-music',
    title: 'Story, Lore & Music',
    disc: 0,
    content: `This reference collects non-mechanical context: a spoiler-controlled plot recap, a concise lore glossary, and the soundtrack list. It is meant for after-session review or for players who want context without digging through the walkthrough while they are actively playing.

{{CALLOUT:spoiler|Disc 1 plot recap}} Squall begins as a Balamb Garden cadet, earns SeeD status through the Fire Cavern and Dollet field exam, then joins the Timber mission with Zell and Selphie. The first disc introduces the resistance against Galbadia, Laguna's dream sequences, Rinoa's role with the Forest Owls, and the assassination plan in Deling City. The major reveal for active play is that Edea is not just a political figurehead; she is the sorceress driving Galbadia's escalation.

{{CALLOUT:spoiler|Disc 2 plot recap}} The party survives imprisonment, splits across the Missile Base and Balamb Garden crisis, resolves the Garden conflict, reaches Fisherman's Horizon, and sees Squall pushed into leadership. Optional open-world work becomes important after Garden is mobile. The disc builds toward Trabia's revelations and the battle between Balamb Garden and Galbadia Garden, ending with the confrontation against Edea and the first clear shift in Rinoa's condition.

{{CALLOUT:spoiler|Disc 3 plot recap}} Disc 3 explains the orphanage connection, Ellone's importance, Esthar's isolation, Laguna's past, Adel's imprisonment, the Lunar Cry, and the Ragnarok. Rinoa's sorceress status moves from mystery to central conflict. The party's goal changes from pursuing Edea to stopping Adel, Seifer, and the chain of events that makes time compression possible.

{{CALLOUT:spoiler|Disc 4 plot recap}} The final disc is the aftermath of time compression. The world is mostly locked, but the Ragnarok, portals, CC Group, and prepared sidequest state determine what can still be cleaned up. Ultimecia's Castle strips commands until bosses are defeated, then the final sequence resolves the sorceress cycle, Squall and Rinoa's promise, and Laguna's memories.

{{CALLOUT:note|World and institution glossary}}
| Term | Meaning | Safe context |
| --- | --- | --- |
| Balamb Garden | Mobile military academy that trains SeeD mercenaries. | Start |
| SeeD | Elite Garden mercenaries hired for missions, with Squall's salary tied to rank. | Start |
| Balamb | Island town near Garden; early card, shop, and Queen of Cards hub. | Disc 1 |
| Dollet | Coastal city used for the field exam and later optional town content. | Disc 1 |
| Timber | Occupied nation and home of the Forest Owls resistance group. | Disc 1 |
| Forest Owls | Small Timber resistance cell tied to Rinoa, Zone, and Watts. | Disc 1 |
| Galbadia | Militarized nation opposing Timber and later controlled through Deling City. | Disc 1 |
| Galbadia Garden | Rival Garden that temporarily hosts the party and later becomes hostile. | Disc 1 |
| Deling City | Galbadia's capital and the site of the parade assassination mission. | Disc 1 |
| D-District Prison | Galbadian desert prison visited after the Deling City failure. | Disc 2 |
| Fisherman's Horizon | Pacifist bridge town built around the transcontinental railroad. | Disc 2 |
| Trabia Garden | Selphie's home Garden, devastated by the missile attack. | Disc 2 |
| Centra | Ancient civilization and region tied to ruins, Odin, Tonberry, and the orphanage. | Disc 2 |
| Esthar | Hidden high-technology nation central to Adel, Odine, Lunar Gate, and Ragnarok. | Disc 3 |
| Lunar Base | Space facility used to observe Adel's seal and the moon. | Disc 3 |
| Ragnarok | Esthar's spacecraft; becomes the final airship and Disc 4 hub. | Disc 3 |
| White SeeD Ship | Mobile ship connected to Edea, Cid, and Ellone's protection. | Disc 3 |
| Lunatic Pandora | Esthar-built structure used to trigger and direct the Lunar Cry. | Disc 3 |
| Ultimecia's Castle | Time-compressed final dungeon where sealed commands are restored by boss victories. | Disc 4 |

{{CALLOUT:note|People and faction glossary}}
| Term | Meaning | Safe context |
| --- | --- | --- |
| Squall Leonhart | Protagonist, gunblade user, and reluctant SeeD leader. | Start |
| Rinoa Heartilly | Timber resistance member whose role grows into the central emotional and sorceress arc. | Disc 1 |
| Quistis Trepe | Balamb Garden instructor and Blue Magic user. | Start |
| Zell Dincht | Balamb martial artist with Library and Balamb sidequest ties. | Disc 1 |
| Selphie Tilmitt | Transfer student from Trabia Garden with Missile Base and Garden Festival focus. | Disc 1 |
| Irvine Kinneas | Galbadia Garden sharpshooter who joins for the Deling City mission. | Disc 1 |
| Seifer Almasy | Squall's rival; his choices drive several Galbadia and sorceress events. | Start |
| Laguna Loire | Dream-sequence protagonist whose past explains major Disc 3 events. | Disc 1 dreams |
| Kiros Seagill | Laguna's companion and rare-card reward target. | Disc 1 dreams |
| Ward Zabac | Laguna's heavy-weapon companion; loses speech after a later event. | Disc 1 dreams |
| Ellone | Woman connected to the dream sequences and Esthar's larger conflict. | Spoiler-sensitive |
| Cid Kramer | Balamb Garden headmaster and SeeD's founder. | Disc 1 |
| Edea Kramer | Sorceress figure tied to Galbadia, SeeD's origin, and the orphanage. | Spoiler-sensitive |
| NORG | Garden financier whose conflict explains Balamb Garden's hidden politics. | Disc 2 |
| Dr. Odine | Esthar scientist connected to para-magic, Ellone research, and sorceress containment. | Disc 3 |
| Adel | Esthar's former sorceress ruler, sealed in space before the main story. | Disc 3 |
| Ultimecia | Future sorceress attempting time compression. | Late game |
| Queen of Cards | Traveling card player who controls a multi-step rare-card sidequest. | Disc 1 |
| CC Group | Balamb Garden card club whose completion affects Disc 4 card recovery. | Disc 2 |

{{CALLOUT:spoiler|Late-game lore terms}}
| Term | Meaning | First useful point |
| --- | --- | --- |
| Guardian Force memory loss | Long-term GF use erodes memory, explaining the party's forgotten orphanage history. | Trabia Garden |
| Sorceress Power | Power passed between hosts; Rinoa, Edea, Adel, and Ultimecia are all part of the chain. | Disc 3 |
| Time Compression | Ultimecia's plan to collapse time so only she can exist and control reality. | Disc 4 |
| Lunar Cry | Catastrophic monster fall from the moon, directed through Lunatic Pandora in the present. | Disc 3 |
| Crystal Pillar | Core mechanism connected to Lunatic Pandora and Lunar Cry control. | Disc 3 |
| Griever | Ultimecia's summoned force based on the image Squall associates with ultimate strength. | Final battle |
| Orphanage | Edea and Cid's former home for the main party; key to the group's shared past. | Disc 2 |
| Sorceress Memorial | Esthar facility created to contain sorceress power. | Disc 3 |
| Moomba | Creature tied to Shumi transformation and Laguna recognition. | Disc 2/3 |
| Great Hyne | Mythic origin figure associated with sorceress lore. | Reference/lore |

{{CALLOUT:note|Soundtrack Disc 1}}
| # | Track | Common in-game context |
| --- | --- | --- |
| 1 | Liberi Fatali | Opening FMV |
| 2 | Balamb Garden | Garden campus |
| 3 | Blue Fields | World map |
| 4 | Don't Be Afraid | Standard battle |
| 5 | The Winner | Victory result |
| 6 | Find Your Way | Dungeon exploration |
| 7 | SeeD | SeeD and Garden scenes |
| 8 | The Landing | Dollet landing |
| 9 | Starting Up | Machinery and operation scenes |
| 10 | Force Your Way | Boss battle |
| 11 | The Loser | Game over |
| 12 | Never Look Back | X-ATM092 escape |
| 13 | Dead End | Danger and pursuit scenes |
| 14 | Breezy | Balamb Town |
| 15 | Shuffle or Boogie | Triple Triad |
| 16 | Waltz for the Moon | Graduation dance |
| 17 | Tell Me | Quiet character scenes |
| 18 | Fear | Suspense scenes |
| 19 | The Man with the Machine Gun | Laguna battle theme |
| 20 | Julia | Julia's piano motif |
| 21 | Roses and Wine | Laguna and Julia scenes |
| 22 | Junction | Menu and tutorial tone |
| 23 | Timber Owls | Timber resistance |

{{CALLOUT:note|Soundtrack Disc 2}}
| # | Track | Common in-game context |
| --- | --- | --- |
| 1 | My Mind | Reflective scenes |
| 2 | The Mission | Mission planning |
| 3 | Martial Law | Galbadian control |
| 4 | Cactus Jack (Galbadian Anthem) | Galbadia anthem |
| 5 | Only a Plank Between One and Perdition | Tense routes |
| 6 | SUCCESSION OF WITCHES | Sorceress theme |
| 7 | Galbadia Garden | Galbadia Garden |
| 8 | Unrest | Unease and transition |
| 9 | Under Her Control | Sorceress-controlled Galbadia |
| 10 | The Stage is Set | Parade setup |
| 11 | A Sacrifice | Assassination aftermath |
| 12 | FITHOS LUSEC WECOS VINOSEC | Parade and sorceress motif |
| 13 | Intruders | Infiltration |
| 14 | Premonition | Edea battle theme |
| 15 | Wounded | Aftermath scenes |
| 16 | Fragments of Memories | Memory scenes |
| 17 | Jailed | D-District Prison |
| 18 | Rivals | Seifer rivalry |

{{CALLOUT:note|Soundtrack Disc 3}}
| # | Track | Common in-game context |
| --- | --- | --- |
| 1 | Ami | Friendship and Garden scenes |
| 2 | The Spy | Espionage moments |
| 3 | Retaliation | Counterattack scenes |
| 4 | Movin' | Travel and Garden movement |
| 5 | Blue Sky | Open-air scenes |
| 6 | Drifting | Fisherman's Horizon arrival |
| 7 | Heresy | Reveals and tension |
| 8 | Fisherman's Horizon | FH town theme |
| 9 | ODEKA ke Chocobo | Chocobo scenes |
| 10 | Where I Belong | FH quiet scenes |
| 11 | The Oath | Squall's leadership moment |
| 12 | Slide Show Part 1 | Garden Festival performance |
| 13 | Slide Show Part 2 | Garden Festival performance |
| 14 | Love Grows | Squall and Rinoa scenes |
| 15 | The Salt Flats | Great Salt Lake |
| 16 | Trust Me | Esthar/Laguna context |
| 17 | Silence and Motion | Esthar City |
| 18 | Dance with the Balamb-fish | Balamb Garden interlude |
| 19 | Tears of the Moon | Lunar Cry |
| 20 | Residents | Esthar residents |
| 21 | Eyes on Me | Vocal theme and major romance cue |

{{CALLOUT:note|Soundtrack Disc 4}}
| # | Track | Common in-game context |
| --- | --- | --- |
| 1 | Mods de Chocobo (featuring N's Telecaster) | Chocobo variation |
| 2 | Ride On | Ragnarok flight |
| 3 | Truth | Late-game revelations |
| 4 | Lunatic Pandora | Lunatic Pandora |
| 5 | Compression of Time | Time compression |
| 6 | The Castle | Ultimecia's Castle |
| 7 | The Legendary Beast | Griever battle |
| 8 | Maybe I'm a Lion | Final boss phase |
| 9 | The Extreme | Final battle |
| 10 | The Successor | Ending revelation |
| 11 | Ending Theme | Ending sequence |
| 12 | Overture | Final credits motif |

{{CALLOUT:hint|Music notes that matter while playing}} The Garden Festival uses instrument assignments rather than a normal item reward. For the clean Eyes on Me arrangement, assign **Sax, Electric Guitar, Piano, and Bass**. For the lively Irish Jig arrangement, assign **Guitar, Violin, Flute, and Tap**. The walkthrough covers the moment itself, but this page keeps the music reference findable later.`,
  },
  {
    id: 'r0-magic-reference',
    title: 'Magic Quick Reference',
    disc: 0,
    content: `All 50 junctionable (and non-junctionable) magic spells with their primary obtain routes. Draw sources list the enemy name and minimum level; refine sources use the format **item × qty → spell × qty**. Spells marked **No refine** are draw-only.

**Elemental offensive spells (single-target unless noted)**

**Fire** (18 AP, Fire element, Reflectable) — Draw: Bite Bug lv1–19 · Refine: M-Stone Piece ×1 → 5
**Fira** (24 AP, Fire element, Reflectable) — Draw: Bite Bug lv20+ · Refine: Magic Stone ×1 → 5
**Firaga** (35 AP, Fire element, Reflectable) — Draw: Bomb lv30+ · Refine: Wizard Stone ×1 → 5; Bomb Spirit ×1 → 100
**Blizzard** (18 AP, Ice element, Reflectable) — Draw: Fastitocalon-F lv1–19 · Refine: M-Stone Piece ×1 → 5
**Blizzara** (24 AP, Ice element, Reflectable) — Draw: Fastitocalon-F lv20–29 · Refine: Magic Stone ×1 → 5
**Blizzaga** (35 AP, Ice element, Reflectable) — Draw: Fastitocalon-F lv30+ · Refine: Wizard Stone ×1 → 5
**Thunder** (18 AP, Thunder element, Reflectable) — Draw: Caterchipillar lv1–19 · Refine: M-Stone Piece ×1 → 5
**Thundara** (24 AP, Thunder element, Reflectable) — Draw: Caterchipillar lv20–29 · Refine: Magic Stone ×1 → 5
**Thundaga** (35 AP, Thunder element, Reflectable) — Draw: Caterchipillar lv30+ · Refine: Wizard Stone ×1 → 5
**Water** (26 AP, Water element, Reflectable) — Draw: Fastitocalon-F lv30+ · Refine: Fish Fin ×1 → 20; Water Crystal ×1 → 30
**Aero** (22 AP, Wind element, Reflectable) — Draw: Abyss Worm lv1+ · Refine: Shear Feather ×1 → 20
**Bio** (30 AP, Poison element, Reflectable, inflicts Poison status) — Draw: Anacondaur lv30+ · Refine: Wizard Stone ×1 → 5
**Demi** (25% of target's current HP, Gravity — not max HP; cap 9,999, Reflectable) — Draw: Lefty lv30+ · Refine: Black Hole ×1 → 30
**Holy** (48 AP, Holy element, Reflectable — deals double damage to undead/Zombie targets) — Draw: Elnoyle lv30+ · Refine: Moon Stone ×1 → 20
**Flare** (48 AP, Non-elemental, Reflectable) — Draw: Tri-Face lv30+ · Refine: Inferno Fang ×1 → 20

**Area-of-effect spells (all targets)**

**Quake** (40 AP, Earth element, Not reflectable — completely misses flying or Floating targets) — Draw: T-Rexaur lv30+ · Refine: Dino Bone ×1 → 20
**Tornado** (38 AP, Wind element, Not reflectable) — Draw: Thrustaevis lv30+ · Refine: Windmill ×1 → 20
**Meteor** (20 AP ×10 hits, Non-elemental, Not reflectable — hits distribute randomly across all living targets; focus on solo enemies for full 10-hit impact) — Draw: Ruby Dragon lv45+ · Refine: Star Fragment ×1 → 5
**Ultima** (80 AP, Non-elemental, Not reflectable) — Draw: Ultima Weapon lv1+, Omega Weapon lv1+ · Refine: Dark Matter ×1 → 100; Energy Crystal ×1 → 3; Pulse Ammo ×5 → 1; Ultima Stone ×1 → 1
**Apocalypse** (120 AP, Non-elemental, Not reflectable — **No refine source; draw-only from Ultimecia final form lower part at lv1–65**) — Draw: Ultimecia Final Form (lower) lv1–65 only

**Recovery spells**

**Cure** (healing power 18, Reflectable — deals equivalent damage to undead) — Draw: Caterchipillar lv1–19 · Refine: M-Stone Piece ×1 → 5
**Cura** (healing power 36, Reflectable — deals equivalent damage to undead) — Draw: Caterchipillar lv20–29 · Refine: Magic Stone ×1 → 5
**Curaga** (healing power 60, Reflectable — deals equivalent damage to undead) — Draw: Caterchipillar lv30+ · Refine: Wizard Stone ×1 → 5; Tent ×1 → 10; Cottage ×1 → 20; Whisper ×1 → 50; Healing Ring ×1 → 100
**Life** (revives KO'd ally to 12.5% max HP, Reflectable — instant KO on undead) — Draw: Creeps lv20+ · Refine: Life Ring ×1 → 20
**Full-Life** (revives KO'd ally to full HP, Reflectable — instant KO on undead) — Draw: Bahamut lv1+ · Refine: Regen Ring ×1 → 20; Phoenix Spirit ×1 → 100
**Regen** (restores 5% max HP per tick, Reflectable — deals 5% max HP damage per tick to undead) — Draw: Lefty lv30+ · Refine: Mesmerize Blade ×1 → 20

**Support and buff spells**

**Esuna** (removes: Poison, Petrify, Darkness, Silence, Zombie, Sleep, Berserk, Slow, Stop, Curse, Petrifying, Confuse, Vit0 — does **not** remove Doom) — Draw: Grand Mantis lv1+ · Refine: M-Stone Piece ×1 → 5
**Dispel** (removes beneficial statuses: Haste, Regen, Protect, Shell, Reflect, Aura, Float, Double, Triple — Not reflectable) — Draw: Blood Soul lv30+ · Refine: Magic Stone ×1 → 5
**Protect** (halves all incoming physical damage, Reflectable) — Draw: Armadodo lv1+ · Refine: Turtle Shell ×1 → 30
**Shell** (halves all incoming magic damage, Reflectable) — Draw: Armadodo lv20+ · Refine: Rune Armlet ×1 → 40
**Reflect** (bounces targeted spells back at caster — the following bypass Reflect entirely: Dispel, Tornado, Quake, Drain, Meteor, Ultima, Scan, Apocalypse) — Draw: Adamantoise lv30+ · Refine: Dragon Skin ×1 → 20
**Aura** (boosts Limit Break trigger rate to maximum; removes Curse status, Reflectable) — Draw: Seifer 4th encounter lv30+ · Refine: Fury Fragment ×1 → 5
**Double** (target casts any spell twice per turn, Reflectable) — Draw: Grendel lv1+ · Refine: Dragon Fin ×1 → 20
**Triple** (target casts any spell three times per turn, Reflectable) — Draw: Odin lv1+, Cerberus lv20+ · Refine: Samantha Soul ×1 → 60
**Haste** (speeds ATB fill rate; removes Slow or Stop, Reflectable) — Draw: Vysage lv1+ · Refine: Magic Stone ×1 → 5; Lightweight ×1 → 20; Accelerator ×1 → 100
**Float** (grants immunity to all Earth attacks, Reflectable — **No refine source**) — Draw: Blood Soul lv1+

**Status-inflicting offensive spells**

**Slow** (slows ATB rate; removes Haste or Stop, Reflectable) — Draw: Caterchipillar lv20+ · Refine: M-Stone Piece ×1 → 5; Spider Web ×1 → 20
**Stop** (freezes ATB entirely; removes Slow or Haste, Reflectable) — Draw: Caterchipillar lv30+ · Refine: Wizard Stone ×1 → 5
**Blind** (inflicts Darkness — sharply reduces physical accuracy, Reflectable) — Draw: Blobra lv20+ · Refine: Ochu Tentacle ×1 → 30
**Confuse** (target acts randomly including attacking allies; cleared by any physical hit, Reflectable) — Draw: Grat lv30+ · Refine: Betrayal Sword ×1 → 20
**Sleep** (freezes ATB and sets Eva to 0%; any physical hit wakes target, Reflectable) — Draw: Grat lv1+ · Refine: Sleep Powder ×1 → 20
**Silence** (blocks magic, Draw, and GF commands; physical attacks unaffected, Reflectable) — Draw: Grat lv1+ · Refine: M-Stone Piece ×1 → 5
**Break** (inflicts Petrify, Reflectable) — Draw: Cockatrice lv20+ · Refine: Cockatrice Pinion ×1 → 20
**Death** (instant KO; undead are completely immune, Reflectable) — Draw: Creeps lv30+ · Refine: Saw Blade ×1 → 10; Dead Spirit ×1 → 20; Chef's Knife ×1 → 30
**Pain** (inflicts Poison + Darkness + Silence simultaneously; when cast on an ally also inflicts Curse, Reflectable) — Draw: Ochu lv30+ · Refine: Curse Spike ×1 → 10
**Berserk** (forces physical-only attacks at +50% power; removes player control, Reflectable) — Draw: Grat lv20+ · Refine: Magic Stone ×1 → 5
**Zombie** (reverses healing into damage; Holy deals double; target immune to instant death, Reflectable) — Draw: Blood Soul lv1+ · Refine: Zombie Powder ×1 → 20
**Meltdown** (32 AP non-elemental damage + inflicts Vit0 — reduces both Vitality and Spirit to zero, Reflectable) — Draw: Gayla lv30+ · Refine: Mystery Fluid ×1 → 10

**Drain and utility**

**Drain** (26 AP non-elemental — absorbs damage dealt as HP; reverses against undead, Not reflectable) — Draw: Red Bat lv20+ · Refine: Vampire Fang ×1 → 20
**Scan** (reveals enemy level, elemental affinities, and stat bars — **No refine source**) — Draw: Bite Bug lv1+`,
  },

]

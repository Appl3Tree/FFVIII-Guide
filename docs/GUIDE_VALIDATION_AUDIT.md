# Guide Validation Audit

## Progress Summary

- **Audit status:** Complete for all logical Guide sections; final render check has two presentation-only failures
- **Last fully completed section:** Reference, Chapter 13 — Story, Lore & Music
- **Current section:** None — all logical Guide sections are fully audited
- **Next unaudited section:** None
- **Remaining sections:** 0 of 47
- **Total issues found so far:** 178
- **Incorrect claims corrected:** 102
- **Incomplete items improved:** 55
- **Source conflicts:** 2
- **Unverified claims:** 19

This is the durable checkpoint for the player-facing Guide audit. A section is marked complete only after its full prose, checkpoints, and encounter-specific data have been checked against the allowed sources and any resulting edits have been recorded here. Reference chapters are included because they are part of the player-facing Guide, even though the progression audit proceeds from Disc 1 through Disc 4.

## Final Global Validation Pass

The repository contains 47 logical Guide chapters, and every one is marked fully audited above. The final consistency checks passed: `audit:guide-quality` reported 47 chapters with 0 warnings, `audit:search` passed all 11 query suites, and the production build completed successfully. `git diff --check` also passed. The rendered-route audit reached all routes but reported two presentation-only failures: a mobile Magic Quick Reference tab overflow for the Rinoa button at the top viewport, and a desktop compact-navigation assertion whose expected menu count is 5 while the rendered menu contains 6 items. These are outside the factual chapter audit and were left unchanged. `npm run lint` could not start because the repository has no ESLint 9 flat-config file.

## Allowed Sources

- **GF78107:** GameFAQs, *Final Fantasy VIII — Guide and Walkthrough (PS4)*, FAQ 78107 — https://gamefaqs.gamespot.com/ps/197343-final-fantasy-viii/faqs/78107
- **GF50775:** GameFAQs, FAQ 50775 — https://gamefaqs.gamespot.com/ps/197343-final-fantasy-viii/faqs/50775
- **GF51741:** GameFAQs, FAQ 51741 — https://gamefaqs.gamespot.com/ps/197343-final-fantasy-viii/faqs/51741
- **GF37211:** GameFAQs, FAQ 37211 — https://gamefaqs.gamespot.com/ps/197343-final-fantasy-viii/faqs/37211
- **GF72431:** GameFAQs, FAQ 72431 — https://gamefaqs.gamespot.com/ps/197343-final-fantasy-viii/faqs/72431
- **Steam list:** Official Steam achievement list — https://steamcommunity.com/stats/1026680/achievements/
- **Steam guide:** Steam achievement guide 1853178178 — https://steamcommunity.com/sharedfiles/filedetails/?id=1853178178

No other source is admissible for factual decisions in this audit.

## Canonical Guide Structure

- Player-facing chapter prose, checkpoints, and encounter overrides: `src/data/ff8_master.json`
- Shared sidequest data rendered inside Guide chapters: `src/data/sidequests.ts`
- Canonical bestiary supplement used by encounter panels: `src/data/ff8_bestiary.json`
- Guide renderer and presentation-only parsing: `src/components/views/GuideView.tsx`
- Major-tab navigation and scroll containers: `src/App.tsx`
- `scripts/chapterContent.mjs` is not imported by the application or a package script; it is legacy source material, not the runtime canonical Guide.

## Reference Chapters

| # | Section | Status |
|---:|---|---|
| 1 | About This Guide | Fully audited |
| 2 | Controls & Interface | Fully audited |
| 3 | Shop Reference | Fully audited |
| 4 | Sidequest Index | Fully audited |
| 5 | Character Reference | Fully audited |
| 6 | Combat Mechanics | Fully audited |
| 7 | Status Effects | Fully audited |
| 8 | Junction Quick Reference | Fully audited |
| 9 | SeeD Rank & Salary | Fully audited |
| 10 | Triple Triad Rules | Fully audited |
| 11 | GF Mechanics | Fully audited |
| 12 | Magic Quick Reference | Fully audited |
| 13 | Story, Lore & Music | Fully audited |

### About This Guide

Status: **Fully audited.** The app-description claims and opening achievement advice were checked against the Steam list, Steam guide, GF50775, and GF72431.

| Existing claim or omission | Classification | Change | Support |
|---|---|---|---|
| The kill achievements were limited to party-member attacks and explicitly excluded GF kills, a restriction not stated by the permitted achievement sources. | Unverified | Removed the unsupported exclusion and retained the official “Kill 100/1000 enemies” wording. | Steam list and Steam guide. |
| Magic Miner cleanup claimed exactly 31 Draw Points and described a recharge mechanic the allowed sources did not establish. | Incorrect / Unverified | Replaced the exact count with the Steam guide's “more than 30 hidden Draw Points” guidance and removed the recharge assertion. | Steam list and Steam guide. |
| Top Rank said all 30 tests were required. | Incorrect | Clarified that tests raise the rank to successive thresholds, are level-capped, and only as many as needed must be passed. | GF51741; Steam list. |
| Card Player said the player had to win. | Incorrect | Corrected the requirement to playing Triple Triad. | Steam list (primary). |
| The page said Chocobo World was integrated into Remastered. | Incorrect | Removed the statement; the version-qualified legacy sidequest entry remains in the Sidequests data. | GF72431 distinguishes original PC, PocketStation PlayStation, and Remastered behavior. |

### Controls & Interface

Status: **Fully audited.** The original PlayStation controls were checked row-by-row against GF72431's Controls page; Steam booster keys were checked against the Steam guide.

| Existing claim or omission | Classification | Change | Support |
|---|---|---|---|
| The page supplied PlayStation, Xbox, Switch, keyboard, and mobile mappings, but only the original PlayStation controls and three Steam booster keys are documented by the allowed sources. | Unverified | Replaced the tables with the validated PSX action map and a warning to follow action names on remapped modern ports. | GF72431 Controls page. |
| The Steam booster keys were reversed: the Guide assigned F1 to speed and F3 to No Encounters. | Incorrect | Corrected to F1 Battle Assist, F2 No Random Encounters, F3 3× Speed. | Steam guide. |
| Automatic Renzokuken timing and several modern input assertions lacked support in the allowed sources. | Unverified | Removed those assertions; retained the validated R1 trigger behavior and 150% normal attack damage. | GF50775 and GF72431. |

### Shop Reference

Status: **Fully audited.** The rendered shop groups, prices, Familiar-gated inventory, Tonberry shop abilities, Call Shop registration advice, and Esthar Shop!!! registration were checked against GF50775 and GF72431. No correction or unresolved claim was required.

### Sidequest Index

Status: **Fully audited.** Every index entry was cross-checked against its already-audited chronological/shared sidequest route.

| Existing claim or omission | Classification | Change | Support |
|---|---|---|---|
| The Disc 2 list presented Chocobo World as ordinary optional work for this Remastered project. | Incorrect | Removed it from the Remastered progression index; the dedicated sidequest entry remains only as an explicit legacy-version note saying it is unavailable in Remastered. | GF72431's Chocobo Forests/Chocobo World version note. |

### Character Reference

Status: **Fully audited.** The eleven rendered character profiles, Limit Break tables, unlock items/magazines, temporary-character mappings, and Crisis Level notes were checked against GF50775's Character Analysis and Limit Break sections. No correction or unresolved claim was required.

### Combat Mechanics

Status: **Fully audited.** Battle openings, ATB/status timing, rewards, scaling exceptions, Draw/casting behavior, Mug/drop slots, Defend, Devour, and the surviving mechanics callouts were checked against GF50775 and GF51741.

| Existing claim or omission | Classification | Change | Support |
|---|---|---|---|
| The page presented exact physical, magical, critical-hit, and second-by-second ATB formulas that could not be reproduced from the allowed sources and conflicted with their character-specific exceptions. | Unverified | Removed the exact formula suite while preserving supported qualitative Str/Vit/Mag/Spr/Spd guidance. | GF50775 and GF51741 checked. |
| One scaling block described enemy stats as a ±20% window instead of enemy **levels** being selected at 4/5 or 6/5 of active-party average. | Incorrect | Removed the misleading duplicate and retained the correctly stated level formula and named fixed-level exceptions. | GF50775. |
| The Guide first said Devour awards AP, then later said it awards no AP. | Incorrect | Corrected the later callout: Devour gives AP, zero EXP, and no post-battle drop. | GF50775's EXP/AP foreword. |
| The Guide said only one Mug attempt was allowed per enemy. | Incorrect | Clarified that failures may be retried; a successful Mug exhausts the steal and prevents that enemy's drop. | GF50775's Mug mechanics. |
| The Draw Point callout gave an exact 10,000–20,000-step refill rule not established by the allowed sources. | Unverified | Removed the exact refill claim. | All five allowed GameFAQs guides checked. |
| Exact Absorb/Initiative, GFHP item-source, Boost-duration, and positional Cover callouts could not be fully supported; the Ribbon callout also falsely placed a Ribbon treasure in Ultimecia's Castle. | Unverified / Incorrect | Removed the unsupported blocks and the false castle acquisition claim; retained supported Defend, AP, scaling, magic-interaction, Devour, and Mug data. | GF50775 and GF72431. |

### Status Effects

Status: **Fully audited.** Every harmful and positive status entry was checked against GF50775's status charts.

| Existing claim or omission | Classification | Change | Support |
|---|---|---|---|
| Poison was listed as 5–7% maximum HP per action. | Incorrect | Corrected to the source's approximate 5–9% range. | GF50775. |
| Stop said Esuna did not work. | Incorrect | Added the source-supported removals: Haste, Slow, Esuna, Remedy+, and Treatment. | GF50775. |
| Zombie said it halves physical damage. | Incorrect | Removed that false effect and added the documented attack-power increase, retaining healing reversal, instant-KO immunity, and Holy weakness. | GF50775. |

### Junction Quick Reference

Status: **Fully audited.** The five rendered junction tables were checked against GF50775's Magic/status charts.

| Existing claim or omission | Classification | Change | Support |
|---|---|---|---|
| The Stat Junctions table displayed the placeholder “XXXX” beside HP-J under two identically named columns. | Incorrect | Replaced the headers with “Core stat junction” / “Additional stat junction” and left the unmatched HP-J cell blank. | GF50775 confirms the ten named stat-junction abilities; “XXXX” is not game data. |

### SeeD Rank & Salary

Status: **Fully audited.** Hidden SeeD Exp, salary interval/table, initial exam scoring, deductions, fixed later events, train mission, and all 30 test answers were checked against GF51741 and GF50775.

| Existing claim or omission | Classification | Change | Support |
|---|---|---|---|
| The two-escape Spirit score used a +85 modifier. | Incorrect | Corrected it to +80. | GF51741's Spirit table. |
| The page contradicted its own exception by saying talking to Seifer or Zell inside the submarine still caused a deduction. | Incorrect | Removed the contradiction; the source permits talking to Zell and Seifer. | GF51741's Attitude notes. |

### Triple Triad Rules

Status: **Fully audited.** Core play/trade rules, regional starts, Queen services/movement, rule mixing, and Disc 4 card recovery advice were checked against GF50775, GF51741, and GF72431.

| Existing claim or omission | Classification | Change | Support |
|---|---|---|---|
| The Diff example said an 8–2 result awards six cards even though the losing hand contains only five. | Incomplete | Added the five-card cap. | GF50775's trade-rule description and five-card hand rule. |
| Direct said the opponent could never take one of the player's cards. | Incorrect | Corrected it: each side keeps cards showing its color, so an originally owned card can change hands. | GF50775. |
| Four deterministic RNG-manipulation tables were written for a specific PlayStation state without a version-safe basis in the allowed sources. | Unverified | Removed the fixed refusal-count/draw-point procedures while retaining the source-supported save/reload, mixing, abolition, and Queen guidance. | GF50775, GF51741, and GF72431 checked. |

### GF Mechanics

Status: **Fully audited.** Junctionable and non-junctionable GFs, AP, summoning, Boost, Compatibility, level gates, refinement routes, abilities, teach items, and version-specific PocketStation material were checked against GF50775 and GF72431.

| Existing claim or omission | Classification | Change | Support |
|---|---|---|---|
| The summoning callout reversed who takes damage and said GF HP fully restores between battles. | Incorrect | Clarified that the charging GF takes damage in the character's place and that GF HP persists and requires recovery. | GF50775's GF mechanics and recovery-item data. |
| Boost said a mistimed input only partially lowers the counter. | Incorrect | Corrected it to reset to 75%. | GF50775. |
| Card was called required for the Triple Triad collection; Move-Find claimed overworld treasures; Auto-Haste said it freed ST-Atk-J. | Incorrect | Recast Card as a zero-EXP capture route, limited Move-Find to hidden Draw/Save Points, and tied Auto-Haste's Slow/Stop protection to ST-Def-J. | GF50775. |
| The damage-cap and non-junctionable-GF sections said Chocobo World/PocketStation content was built into Remastered. | Incorrect | Removed that claim and explicitly limited Chocobo growth, MiniMog, and Moomba acquisition to the legacy behavior supported by the PlayStation source. | GF50775; GF72431's version note. |
| The starting-GF priority block assigned Card/Card Mod to Shiva and misassigned multiple refinement abilities. | Incorrect | Replaced it with the actual owners: Quezacotl Card/Card Mod/T Mag-RF, Shiva I Mag-RF, Ifrit F Mag-RF/Ammo-RF, Siren L/ST/Tool-RF. | GF50775 GF ability tables. |
| Early refinement routes used the wrong ability for several item chains and claimed Screws produced Fast Ammo. | Incorrect | Replaced them with supported Blitz→Dynamo Stone→Thundaga, Snow Lion→North Wind→Blizzaga, Hexadragon→Red Fang→Firaga, and Screw→Normal Ammo routes. | GF50775 refinement charts. |
| The Blue Magic table called seven highlighted entries “complete.” | Incomplete | Renamed it as teach-item highlights; the canonical character table remains the complete 16-entry list. | GF50775. |
| The post-Diablos block said Diablos supplied Card Mod, put Elastoid encounters in Galbadia forests, called Triple the best HP junction, and called Ultra Waves Water-elemental. | Incorrect | Assigned Card Mod to Quezacotl, removed the false encounter claim, limited Triple to its supported strong Str/Spd role, and removed the false element. | GF50775's Quezacotl/Diablos, magic, card, and Blue Magic data. |
| Detailed Remastered availability for PocketStation summons could not be validated from the allowed sources beyond GF72431's explicit statement that Chocobo World is unavailable. | Unverified | Removed unsupported acquisition/stat detail and retained concise, supported Odin/Gilgamesh/Phoenix behavior plus the PlayStation-only caveat. | GF50775 and GF72431. |

### Magic Quick Reference

Status: **Fully audited.** All 50 rendered spells, 100-stock stat junction values, elemental/status junction values, cast effects, draw difficulty, and primary refine routes were checked against GF50775's Magic and Refinement charts. No correction or unresolved claim was required.

### Story, Lore & Music

Status: **Fully audited.** Progression summaries and glossary entries were checked against the completed chronological audit; the soundtrack order/contexts and Garden Festival assignments were checked against GF51741 and GF72431. No correction or unresolved claim was required.

## Disc 1

| # | Section | Status |
|---:|---|---|
| 1 | Preparing for the Exam | Fully audited |
| 2 | The SeeD Exam | Fully audited |
| 3 | After the Exam | Fully audited |
| 4 | The Timber Mission | Fully audited |
| 5 | Dollet Exploration | Fully audited |
| 6 | Journey to Galbadia Garden | Fully audited |
| 7 | Galbadia Garden | Fully audited |
| 8 | Deling City | Fully audited |

### Preparing for the Exam

Status: **Fully audited.** The full prose, five original checkpoints, the newly separated Shiva checkpoint, and all three encounter groups were checked. No unresolved claim remains in this section.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The Guide described the first field Draw Point use as the Magic Miner trigger and the checkpoint said the requirement was one Draw Point draw. | Incorrect | Replaced with the official requirement: draw magic 100 times from Draw Points; clarified that the early Cure Draw Point only contributes toward the total. | Steam list (primary) states “Draw magic 100 times from draw points.” Steam guide and GF78107 corroborate the cumulative nature. |
| The Library Esuna Draw Point was deferred until after meeting Quistis at the gate, making the earliest route easy to miss. | Incomplete | The classroom setup now equips Draw immediately, and the Esuna Draw Point is included during the first Library visit before the Cure Draw Point/front-gate sequence. | GF50775 and GF51741 both explicitly assign a GF/Draw before the first Library circuit and place Esuna there. GF37211 also identifies the Library Draw Point during the opening visit. |
| The Shiva learning order skipped Str-J and asserted that Str-J was not native to Shiva and could be taught with a Steel Pipe. | Incorrect | Restored Shiva’s native Str-J immediately after I Mag-RF in both opening learning-order references; removed the false Steel Pipe instruction. | GF72431’s opening chapter lists Shiva’s Str-J in her natural learning order. GF50775/GF51741 ability material also supports Shiva having Str-J; GF72431 identifies Steel Pipe as teaching SumMag+10%, not Str-J. |
| The Novice SeeD Candidates’ third window was placed after the D-District Prison escape, and the later windows/reward were imprecise. | Incorrect | Corrected the third window to after visiting the MD Level but before Fisherman’s Horizon; clarified the fourth and fifth windows, the need to talk until dialogue repeats, the scenes-only reward, and disappearance on failure. | GF72431, “The Novice SeeD Candidates,” provides all five windows and the outcome. |
| The Guide told players to find and defeat CC Jack and Joker before the exam, placed Joker in 2F classrooms, and said this started the quest. | Incorrect | Replaced this with the actual prerequisite: 15 qualifying Garden wins now, the Disc 2–3 start window, the excluded Cafeteria/Library/2F games, Jack’s main-hall location, and Joker’s later Training Center bridge location. | GF72431, “CC Group Quest,” states the prerequisite, availability, order, and locations. |
| A single “Quezacotl/Shiva” checkpoint represented two official achievements. | Incomplete | Split it into individually named Quezacotl and Shiva achievement checkpoints while retaining the old combined checkpoint ID for Quezacotl so existing checked progress is not discarded. | Steam list has two separate achievements: Quezacotl — “Unlock Guardian Force Quezacotl”; Shiva — “Unlock Guardian Force Shiva.” |
| The opening sidequest/card route did not explain which early card wins count toward the later CC prerequisite. | Incomplete | Added the 15-win requirement and the three Garden venues whose wins do not count, at the point where the player is already farming cards. | GF72431, “CC Group Quest.” |

### The SeeD Exam

Status: **Fully audited.** The complete mission route, exam-behavior instructions, encounter panel, four boss records, three checkpoints, Draw Point, drops, and post-battle escape were checked. One nonessential visibility descriptor could not be established from the allowed sources and was removed; it is recorded under “Could Not Be Validated.”

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The Guide said Seifer's GFs are removed when he leaves and instructed the player to junction them manually. | Incorrect | Clarified that Seifer's carried GF and magic transfer to Selphie, then told the player to recheck her junctions. | GF50775 explicitly states that Seifer's magic and junctioned equipment transfer to Selphie. GF78107 also routes the same GF and magic to Selphie at the party switch. |
| The Blind Draw Point at the communications tower was called hidden. | Unverified | Removed “hidden” while retaining the verified spell and location. | GF78107 and GF72431 both direct the player to draw Blind there, but none of the checked allowed sources established that this Draw Point is hidden. |
| The Biggs/Wedge strategy did not explain that defeating either soldier ends that phase or that the choice determines the guaranteed drop. | Incomplete | Added the phase-ending behavior and advised defeating Biggs for 2 Elixirs rather than Wedge for 2 Cottages. | GF78107 and GF51741 state that Elvoret intervenes once one soldier is defeated; GF50775's boss data gives their respective guaranteed drops. |
| Siren was described as obtainable only from Elvoret anywhere in the game. | Incorrect | Replaced the absolute claim with the Disc 4 fallback: Tri-Point in Ultimecia's Castle. The Dollet draw remains the strongly recommended practical opportunity. | Steam guide's Disc 4 boss list identifies Siren on Tri-Point; GF72431 also warns that missing Elvoret defers Siren to Disc 4. |
| The X-ATM092 route claimed that merely knocking it down and escaping repeatedly awards 50 AP, with an asserted 5–6-encounter/~250–300 AP cap. | Incorrect | Corrected the route: the initial 20%-HP knockdown and escape awards 0 AP; 50 AP requires depleting its full HP at least once. Removed the unsupported encounter-count/AP estimate. | GF50775 explicitly distinguishes the 20% knockdown (0 AP) from a full-HP depletion (50 AP). GF51741 and GF78107 corroborate that the first encounter is escape-only and later encounters can be used to defeat it. |
| The boss strategy said Protect reduces all three named X-ATM092 attacks, including Ray-Bomb. | Incorrect | Distinguished its physical attacks (Protect) from magical Ray-Bomb (Shell). | GF50775's attack data identifies the physical attacks as Protect-mitigated and Ray-Bomb as magic mitigated by Spirit/Shell. |
| The Guide asserted a specific two-repair-cycle/third-repair destruction rule. | Incorrect | Replaced it with the supported mechanic: in a later encounter, deplete its full HP during a repair window or it restores to full. | GF50775 documents the 20% knockdown and 20/40/60/80/100% repair sequence; GF78107 says later encounters allow destruction if its HP is depleted before repair completes. |
| Healing Water was presented as an immediately available Jelleye resource during the exam route even though Mug is unavailable. | Incomplete | Clarified that Jelleye provide Healing Water by Mug only after Mug becomes available; retained the verified Tool-RF and Recov Med-RF recipes. | GF50775 enemy data lists Healing Water only in Jelleye's Mug table. GF51741's item table confirms 1 Healing Water -> 2 Tents and 1 -> 2 Hi-Potions. |

### After the Exam

Status: **Fully audited.** The Balamb return, graduation, Training Center route, fixed Granaldo/Raldo encounter, pre-Timber item deadlines, three checkpoints, regional encounter panel, and Diablos data were checked. No unresolved claim remains in this section.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The Guide told a normally low-level party to draw Sleep, Silence, Berserk, and Confuse from Grat without noting the level tiers. | Incorrect | Limited the normal early draw advice to Sleep and Silence; added that Berserk appears at Lv 20 and Confuse at Lv 30. | GF50775's Grat data gives Sleep/Silence at Lv 1–19, adds Berserk at 20–29, and adds Confuse at 30+. GF72431 recommends Grat as the early status source but does not override those tiers. |
| The mandatory Granaldo/three-Raldo battle displayed the generic Lv 1–100 ranges, high-tier Draws, and normal EXP formula. | Incorrect | Applied the encounter-specific override: all four enemies are capped at Lv 11, Granaldo has 1,314–1,538 HP, each Raldo 111–287 HP, only low-tier Draws occur, and all award 0 EXP. | GF72431 explicitly identifies these boss versions as capped at Lv 11, supplies the capped maximum HP values, and states that the boss versions drop no EXP. Its tables and GF50775 corroborate base HP/AP/Draw data. |
| The Training Center T-Rexaur was described as capped at Lv 11. | Incorrect | Restored its normal Lv 1–100 scaling and explicitly distinguished it from the fixed boss encounter. | GF50775's T-Rexaur data gives Lv 1–100 and discusses obtaining Lv 20–30 T-Rexaurs at this stage. GF72431 applies the Lv 11 cap specifically to Granaldo/Raldo, not the random T-Rexaur. |
| The Magical Lamp route skipped the immediate Front Gate pickup and claimed that walking back inside makes Cid disappear and loses both items. | Incorrect | Added the primary pickup—speak to Cid again without leaving the Front Gate briefing screen—and the genuine fallback at his 3F office before boarding the Timber train; removed the false disappearance condition. | GF72431's “Mission Preparations” gives the Front Gate Lamp pickup and later identifies 3F Cid as the last fallback for both items. Steam guide likewise instructs talking to Cid again after the mission briefing. GF51741 corroborates the Battle Meter fallback. |
| The encounter panel was labeled only “Balamb Garden Training Center” even though it also listed beach/world-map enemies. | Incomplete | Renamed it “Balamb Area & Garden Training Center.” | GF72431 separates the regional Bite Bug/Caterchipillar/Fastitocalon-F/Glacial Eye/T-Rexaur availability from the Training Center route; the broader label now matches the entries. |

### The Timber Mission

Status: **Fully audited.** The pre-departure missables, first Laguna sequence, train operation and score effects, Forest Owls bosses, Timber shops/items/Draw Points, Angelo learning data, and all three checkpoints were checked. The Pet Nametag checkpoint was moved to its actual post-Timber return window in the next section. No unresolved claim remains here.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The Guide instructed the player to examine the train's luggage compartment for Pet Pals Vol. 1. | Incorrect | Corrected the acquisition: speaking to Zell in the cabin awards the magazine automatically. | GF72431's mission route and GF50775's item table both identify it as an automatic train-story acquisition, not a luggage pickup. |
| The Gerogero strategy grouped Elixir, Phoenix Down, Curaga, X-Potion, and the not-yet-available Recover command as equivalent instant kills. | Incorrect | Clarified that Elixir/X-Potion kill immediately, Phoenix Down succeeds only 25% of the time, and restorative magic deals damage without guaranteeing an instant kill; removed Recover. | GF72431's Gerogero strategy gives the guaranteed Elixir/X-Potion result and 25% Phoenix Down chance. Its progression places Recover much later with Leviathan. |
| The Timber pub choice said the Forbidden Card's refinement was usually more useful than Tonberry. | Incorrect | Reversed the recommendation: Tonberry is marginally better because it refines toward Death, while Forbidden leads to Confuse. | GF72431 explicitly compares the two rewards and favors Tonberry/Death. |
| The Pet Nametag journalist trigger was placed before the party first departed Timber, even though the event activates only after leaving and returning. | Incorrect | Removed the premature instruction and moved the durable checkpoint to “Dollet Exploration,” where the route returns through Timber after the first departure; preserved the required “No way!” response and Disc 1 deadline. | GF50775's Disc 1 route activates the would-be journalist on a return to Timber; GF51741 explicitly says to return after getting out of Timber the first time. |
| The repeated pre-Timber T-Rexaur record again treated the random encounter as capped at Lv 11. | Incorrect | Restored normal Lv 1–100 scaling and labeled it a normal encounter. | GF50775 gives T-Rexaur a Lv 1–100 range; GF72431's Lv 11 override applies only to the Granaldo/Raldo story battle. |
| A callout was titled “Zone supply package” even though Chief supplies the items. | Incorrect | Renamed the callout “Chief's supply package.” | GF72431 states that Chief gives the Potion, Phoenix Down, Soft, Antidote, and Remedy before departure. |

### Dollet Exploration

Status: **Fully audited.** The optional travel window, enemy resources, regional card-rule manipulation, journalist trigger, two Timber Maniacs entries, Pub Owner rewards, Occult Fan II, Bone Quest, Queen of Cards recovery, shops, card-player tiers, and checkpoint were checked. No unresolved claim remains here.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The Guide omitted Dollet Town Square's Silence Draw Point even though the route already sends the player through the square. | Incomplete | Added the Silence Draw Point at the earliest audited Dollet exploration window. | GF72431's Dollet Bone Quest identifies the Town Square Silence Draw Point; its Dollet Exploration route establishes that the square is freely accessible during this visit. |

### Journey to Galbadia Garden

Status: **Fully audited.** The party mapping, excavation-site enemy tiers, all three present Draw Points, both Old Keys, three floor-panel triggers, detonator order, boulder, fixed exit battles, wake-up HP state, and Dragon Fang route were checked. No unresolved claim remains here.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The Elastoid advice listed Meltdown without its level threshold, implying it was available alongside all-level Dispel. | Incomplete | Clarified the tiers: Dispel at all levels, Stop from Lv 20, and Meltdown only from Lv 30; retained the Lv 30+ Laser Cannon Mug. | GF72431 explicitly separates all-level Dispel, mid/high Stop, and Lv 30+ Meltdown/Laser Cannon. |
| The excavation encounter panel named Gesper but omitted its uniquely dangerous Degenerator behavior. | Incomplete | Added a warning that Gesper can eject a character with unblockable Degenerator and should be defeated quickly when avoiding removals/KOs. | GF72431 flags Gesper's Degenerator as unblockable and character-removing in this exact sequence. |

### Galbadia Garden

Status: **Fully audited.** The current scope covers the Garden reception through the train ride to Deling City. The first Level 6 Boss Card player, Haste and Life Draw Points, Trabia rule work, Irvine's joining items, and train order are placed at their first access point. The Tomb and Brothers route now begin in the following Deling City chapter, after the ID objective.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The card section omitted the first Level 6 Boss Card player and gave only a vague Trabia rule reminder. | Incomplete | Added the classroom opponent and the full save/rule-carry/confirmation/reload process, plus the Life Draw Point in the locker room. | GF78107, GF50775, GF51741, and GF72431 place these opportunities after Irvine's party selection. GF72431 warns Remaster players to make Trabia changes in this window. |
| The optional Tomb and Brothers achievement appeared before the student-ID objective was available. | Out of sequence | Moved the Tomb route, its encounter panel, map, boss images, and achievement checkpoint to Deling City after the guard assigns the ID task. | The approved walkthroughs place the Tomb excursion after the Deling City guard's assignment. The official Steam list requires unlocking Brothers. |

### Deling City

Status: **Fully audited.** The city route and services, student-ID objective, Location Displayer deadline, full optional Tomb route, Queen of Cards step, magazines, assassination sequence, Carbuncle Draw, sewers, and Seifer/Edea encounters were checked. Dynamic enemy values remain in encounter data; the Guide prose carries route and strategy context.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The chapter stopped at the Tomb sword and referred players to a Tomb section in the previous chapter. | Out of sequence and incomplete | Added the Tomb exterior Protect point, random ID reminder, map, Draw Points, both Sacred encounters, sluice/water-wheel route, Brothers, cards, rewards, and achievement checkpoint here, after the assigned ID objective. | GF78107, GF50775, GF51741, GF37211, and GF72431 place this route after Caraway's guard sends the party to retrieve the number. |
| The Brothers strategy told players to Float their own party to stop Minotaur's regeneration. | Incorrect | Cast Float on Sacred/Minotaur to stop their recovery; cast it on the party to avoid Mad Cow Special. | GF72431's Tomb boss section explicitly distinguishes these effects. |
| The Queen of Cards sidequest note did not match the Dollet-to-Balamb move after losing Sacred. | Incorrect | The Guide and sidequest placement now ask the player to confirm the Queen goes to Balamb, then recover Sacred from her son in Dollet when desired. | GF50775 and GF51741 give the Balamb destination for this stage; the current Kiros/Sacred card guidance is placed at the relevant Deling window. |
| The Caraway walking route omitted a useful Draw Point. | Incomplete | Added the Thundara Draw Point along the route to the Presidential Palace. | GF50775 calls out the point during the Caraway route. |
| The optional Brothers route lacked an achievement checkpoint in its actual chapter. | Incomplete | Added the checkpoint at the Brothers reward in Deling City and aligned the GF availability and sidequest placement with that chapter. | The official Steam list names “Brothers — Unlock Guardian Force Brothers”; the Steam guide places it after the Tomb route. |
| The Carbuncle setup said Orihalcon teaches Vit+60%. | Incorrect | Corrected the taught ability to **Vit+40%**; this unlocks Vit Bonus immediately. | GF72431 identifies Turtle Shell as Vit+20% and Orihalcon as Vit+40%. |
| The global Handyman entry tied the achievement to Fisherman's Horizon and later described Deling City as the earliest validated Junk Shop opportunity. | Incorrect | Handyman requires any weapon upgrade. The earliest available Junk Shop is in Balamb; Deling City is a later fallback. | The official Steam list states only “Upgrade your weapon.” GF51741 and GF72431 show Balamb Junk Shop access before the Timber departure. |

## Disc 2

| # | Section | Status |
|---:|---|---|
| 1 | Winhill | Fully audited |
| 2 | The Escape | Fully audited |
| 3 | Missile Base | Fully audited |
| 4 | Return to Balamb Garden | Fully audited |
| 5 | Fisherman's Horizon | Fully audited |
| 6 | The Garden Festival | Fully audited |
| 7 | Exploring the World | Fully audited |
| 8 | Return to Balamb | Fully audited |
| 9 | Trabia Garden | Fully audited |
| 10 | Battle of the Gardens | Fully audited |

### Winhill

Status: **Fully audited.** The dream opening, dialogue choice, junction transfer, three Draw Points, patrol route/enemies, separate Gil pool, shop behavior, and ending sequence were checked. No unresolved claim remains here.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The Guide told the player to speak with Raine and ask her about Julia to unlock Eyes On Me. | Incorrect | Corrected both the prose and checkpoint: the Julia topic is selected while speaking with **Kiros**, before choosing “Let's talk later.” | GF72431 and GF51741 both identify the Julia option in Kiros's pub conversation as the one-time unlock. |
| The Guide claimed a Timber Maniacs issue could be collected from the pub table during the dream. | Incorrect | Removed the nonexistent pickup. | GF72431's Winhill item table lists only the Eyes On Me entry; GF51741's chapter checklist lists only Laguna's 3,000 Gil stash. Both complete routes omit a magazine here. |
| The Curaga Draw Point's hidden status was omitted. | Incomplete | Identified the Curaga Draw Point beside the wardrobe as hidden. | GF51741 calls it hidden and GF37211 calls it invisible during this Winhill sequence. |
| The Bite Bug encounter note said Fire-elemental attacks work well. | Incorrect | Corrected the note to its actual Ice and Wind weaknesses and explicitly removed the Fire implication. | GF50775's enemy table lists Bite Bug as neutral to Fire and 2× weak to Ice and Wind. |

### The Escape

Status: **Fully audited.** The opening choices, second Biggs/Wedge fight, full prison-floor table, items and Draw Points, three card players, Moomba shortcuts/rewards, party switches, fixed final encounter, bridge escape, desert split, and Rinoa Card detour were checked. No unresolved claim remains here.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The prison Elite Soldier's minimum HP was listed as 45. | Incorrect | Corrected the D-District range to **148–2,260 HP** while preserving the Lv 70 encounter cap. | GF50775's detailed Elite Soldier table starts at 148 HP and explicitly notes the prison cap of Lv 70 / 2,260 HP; GF37211's Lv 14 example (330 HP) agrees with that progression. |
| The final encounter presented one Elite Soldier and an unlabeled singular GIM52A, obscuring that two machines are fought. | Incomplete | Labeled it as the fixed **Elite Soldier + 2x GIM52A** encounter and clarified the strategy refers to both machines. | GF72431 and GF37211 both specify one Elite Soldier with two GIM52As. |
| The Pet Nametag warning said it was one of only two normally available copies without identifying the release-specific exception. | Incomplete | Limited the two-copy statement to the original release without Chocobo World and noted that Remastered has additional access; retained the fact that this particular prison pickup is one-time. | GF72431 explicitly qualifies the two-copy claim with Chocobo World and Remastered exceptions. |
| The deterministic Rosetta Stone/HP Up card-player instructions omitted the rule-state prerequisites. | Incomplete | Added the source's conditions that the Queen of Cards must not be in Deling City and players must not be asking to change rules. | GF72431 states both conditions alongside the 54- and 64-refusal methods. |

### Missile Base

Status: **Fully audited.** The cover-preserving route, SeeD-rank choices, Draw Points, launcher sabotage, mandatory security fight, timer effects, BGH251F2 encounter, escape inputs, and delayed Timber cleanup reminder were checked. One source disagreement remains explicit in both the Guide and Source Conflicts section.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The chapter asserted that Selphie's team is always Selphie, Quistis, and Irvine. | Incorrect | Replaced the fixed lineup with Selphie plus whichever two characters the player assigned to her team. | GF72431 and GF51741 describe the player choosing the two teams; only Selphie and Squall are fixed as leaders. |
| The security encounter did not state that two Base Soldiers accompany the Base Leader. | Incomplete | Labeled the record as **Base Soldier (two enemies)**. | GF72431's boss heading and detailed strategy specify Base Leader + 2x Base Soldier. |
| BGH251F2 was presented definitively as 0 AP with no drop, with Weapons Monthly June treated only as a separate mission award. | Conflicting | Made the disagreement explicit in the boss record and checkpoint: the magazine is guaranteed after the encounter, but its technical attribution and the AP value remain disputed. | GF72431 lists 0 AP/no drop and treats the magazine as a mission item; GF50775 and GF51741 list 10 AP and the magazine as the fixed drop. The practical acquisition timing agrees, but the underlying battle record does not. |
| The BGH251F2 strategy recommended Blind without explaining its limited benefit. | Incomplete | Clarified that Darkness can stop Chaingun hits but does not affect Beam Cannon; emphasized Slow and fast elemental damage under the timer. | GF50775/GF51741 recommend Darkness for Chaingun, while GF72431 calls it low-value because it cannot stop Beam Cannon. This functional distinction reconciles the recommendations. |

### Return to Balamb Garden

Status: **Fully audited.** The temporary Balamb exit, Garden crisis fights/rewards, Zell love scene, MD Level route and Draw Point, fixed Oilboyle encounter, post-crisis sidequest windows, NORG encounter, Leviathan achievement/missable fallback, GF setup, Bio Draw Point, and final Library scene were checked. No unresolved claim remains here.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The MD Level Oilboyles used the generic Lv 1–100 enemy record, including 15,630 maximum HP, EXP, Lv 30+ Draw/Mug/Drop tables, and possible Orihalcon. | Incorrect | Restored the encounter-specific override: both Oilboyles are capped at **Lv 26 / 4,988 HP**, award **0 EXP**, cannot reach the high-level table, Mug 4x Fuel, and drop 8x Wizard Stone. | GF72431 explicitly warns that the MD Level boss versions are capped at Lv 26, have 4,988 maximum HP, never expose the high-level table, and drop no EXP. GF50775's boss-specific treatment also separates this encounter from later generic Oilboyles. |

### Fisherman's Horizon

Status: **Fully audited.** The crash arrival, Master Fisherman sequence, Grease Monkey scene, Mayor's House route, station-master/card rewards, fixed SAM08G/G-Soldier and BGH251F2 encounters, Irvine concert sequence, Draw Points, shops, sidequest timing, and achievement placement were checked. No unresolved claim remains in this section.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The shared Master Fisherman route delayed Occult Fan III until the end and omitted the exact pupil dialogue and Megalixir reward. | Incorrect | Corrected the route so the first conversation immediately awards **Occult Fan III**; added the three pupil responses, the post-Mayor return window, Inn/dock sequence, **Megalixir**, and 20 SeeD Exp reward. | GF72431's “Master Fisherman's Quest” page gives the full two-part sequence, dialogue responses, deadlines, and both item rewards. |
| The BGH251F2 item summary described Adamantine as part of a guaranteed drop. | Incorrect | Identified Adamantine as a **12.5% Mug** and retained the actual eight-item drop alternatives (Running Fire or Missile). | GF72431's Fisherman's Horizon boss data separates the 12.5% Adamantine Mug from the eight-item drop table. GF50775's enemy data corroborates the Mug/drop distinction. |
| The returning BGH251F2 strategy omitted that Shell works on its FH Beam Cannon even though it did not at the Missile Base. | Incomplete | Added the encounter-specific Shell distinction. | GF72431 explicitly says Shell halves Beam Cannon damage in the FH encounter and contrasts it with the Missile Base version. |
| The Grease Monkey callout promised Mega Phoenix regardless of the earlier party assignment. | Incomplete | Added the assignment-dependent outcome: Mega Phoenix if Zell was assigned to Squall's Garden team, otherwise Remedy. | GF72431's “The Escape” and Fisherman's Horizon material tie the later reward to Zell's party assignment. |

### The Garden Festival

Status: **Fully audited.** The Quad trigger, both valid instrument sets, Grease Monkey/Officer reward window and quantities, Zell Love Scene #6, concert dialogue consequences, and magazine trigger were checked. No correction or unresolved claim was required.

### Exploring the World

Status: **Fully audited.** The mobile-Garden route, UFO note, Cactuar farming, Timber cleanup, paid Ultima Draw Point, refinement list, and every reusable sidequest card rendered here (CC Group, Centra Ruins, Shumi Village, Chocobo Forests/World, Winhill, Queen of Cards, and Novice SeeD Candidates) were checked. No unresolved claim remains in this section.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The shared CC Group route used only an unspecified win prerequisite, placed Joker in a “dock area” and Club in the Dormitory corridor, and implied Joker unlocked shop access. | Incorrect | Restored the 15 qualifying-win requirement and exclusions; placed Joker on the Training Center bridge and Club at the back of the 1F circle; identified Joker's actual reward as the GF Report upgrade and clarified his ordering exception. The global achievement route was corrected at the same time. | GF72431's “CC Group Quest” gives the exact prerequisite, exclusions, locations, order, and Joker reward. |
| The Guide routed the CC Group quest but omitted the Cards Club Master achievement checkpoint. | Incomplete | Added the checkpoint with the official “Defeat every member of the CC group” requirement and placed it at the first full completion window. | Steam list (primary); Steam guide's CC Group sequence; GF72431 for practical timing/order. |
| The Tonberry lookup required “at least 20” kills, and the shared sidequest promised a Tonberry King Card opportunity. | Incorrect | Corrected the variable **18–24** Tonberry threshold, removed the nonexistent card reward, and listed the guaranteed Royal Crown instead. | GF72431's Centra Ruins data states the 18–24 range and Tonberry King's guaranteed Royal Crown/no card drop. |
| The Tonberry route omitted that the 20-minute timer remains active while Odin is undefeated and can be reset without losing the running Tonberry count. | Incomplete | Added the timer/reset behavior, 1 AP/0 EXP per Tonberry, variable threshold, and Royal Crown payoff to the reusable route. | GF72431's lower Centra Ruins walkthrough. |
| The Shumi route placed the false Water Stone in a “frog well,” described the real stone only vaguely, and told the player to return a doll directly to the Elder. | Incorrect | Corrected the false stone to the pond, the real stone to the Artisan's sink, and the final return order to Artisan then Elder. | GF72431's Shumi Village Part 1 and Part 2 routes. |
| The Shumi route omitted the World Map exit/re-entry required to unlock Part 2 and the 50 SeeD Exp reward for leaving Part 1 with “Explain.” | Incomplete | Added both the phase-transition prerequisite and reward to the shared route and placement. | GF72431's Shumi Village route explicitly states both. |
| The Chocobo World card said Remastered exposes the minigame from its menu. | Incorrect | Replaced it with the version split: original PC has the built-in minigame, supported PlayStation use requires PocketStation, and Remastered has no Chocobo World access (its exclusive items moved to Angelo Search). | GF72431's Chocobo Forests/Chocobo World material explicitly distinguishes all three releases. |
| The available Chocobo Forest route omitted the Chocobo achievement checkpoint. | Incomplete | Added a checkpoint at this first practical capture window using the official requirement and the validated one-Chicobo/mother-Chocobo method. | Steam list (primary) states “Capture a Chocobo”; Steam guide places it at Beginner Forest and says to summon and ride the mother; GF72431 corroborates the forest mechanic. |

### Return to Balamb

Status: **Fully audited.** The occupation entry, Big Bad Rascal exit route, Pandemona Card window, all three Captain-search outcomes, two consecutive boss encounters, Pandemona draw/fallback, Zell Love Scene #7, post-liberation card/item cleanup, GF setup, Ultima return, and Cactuar/Stat-J training notes were checked. One technical reward-attribution disagreement remains listed under Source Conflicts.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| Fujin's record said her normal drop was an 89.5% Megalixir / 10.5% Combat King 002 split. | Incorrect | Corrected Fujin's normal drop to guaranteed Megalixir and represented Combat King 002 separately as a guaranteed encounter reward. | GF51741's detailed tables give Fujin a Megalixir in every drop slot and list Combat King 002 separately as a fixed drop; GF72431's prose also says the magazine is guaranteed after the fight. |
| The Guide definitively attributed Combat King 002 to Fujin, while the allowed guides assign the guaranteed reward differently. | Conflicting | Removed the combatant-specific attribution. The chapter now states only the agreed practical fact: Combat King 002 is guaranteed after the Fujin/Raijin encounter. | GF72431 attributes the guaranteed magazine to Fujin; GF51741 places it as a fixed drop in the second Raijin record. |
| Pandemona was presented as permanently missable at Fujin with no recovery route. | Incomplete | Added the Disc 4 fallback: draw Pandemona from Red Giant in Ultimecia's Castle. | Steam guide's Ultimecia's Castle boss list identifies Red Giant as carrying Pandemona; GF51741's Red Giant Draw table corroborates it. |
| The post-liberation route vaguely referenced Zell-related scenes but omitted the available numbered Library event. | Incomplete | Added explicit instructions and a checkpoint for Zell Love Scene #7 at the Library Committee. | GF72431's Return to Balamb route places Zell Love Scene #7 immediately after liberation. |

### Trabia Garden

Status: **Fully audited.** The approach and net entrance, Thundaga Draw Point, hidden Weapons Monthly August pickup, graveyard Timber Maniacs issue, terminal/kids/basketball route, complete memory sequence, Selphie Card, refinement advice, optional-activity window, and next objective were checked. One unsupported Save Point assertion was removed and is tracked under “Could Not Be Validated.”

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The post-memory route omitted Zell Love Scene #8. | Incomplete | Added a callout and checkpoint instructing the player to put Zell in the active party and visit the Balamb Garden Library. | GF72431's Trabia Garden route places this event immediately after the memory sequence. |
| The chapter omitted the highlighted third return to Shumi Village's paid Ultima Draw Point. | Incomplete | Added the Ultima Drawing Session #3 reminder before the next major battle. | GF72431 explicitly places this optional return at the end of the Trabia Garden chapter. |
| The Guide asserted that a Save Point is at the north end of the basketball court. | Unverified | Removed the unsupported location claim while retaining the verified instruction to try leaving the court to trigger the scene. | GF72431, GF51741, and GF37211 were checked for the full Trabia route; none identifies a Save Point there. |

### Battle of the Gardens

Status: **Fully audited.** The Garden orders, Cottage pickup, Zell/Squall party transitions, classroom defense, rope duel, Aura Draw Point, all three Card Keys, hockey rink, Cerberus and Tri-Face preparation, both Seifer phases, Edea, boss level caps/tables, GF learning advice, and Disc 2 endpoint were checked. No unresolved claim remains in this section.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| Cerberus was presented as permanently missable after the Galbadia Garden battle. | Incomplete | Kept the strong recommendation to obtain it now but added the Disc 4 fallback: draw Cerberus from Gargantua in Ultimecia's Castle. Updated the callout, checkpoint, and global achievement entry. | Steam guide's Ultimecia's Castle boss list and GF51741's Gargantua Draw table both identify Cerberus. |
| Alexander was presented as permanently missable after Edea with no recovery route. | Incomplete | Added the Disc 4 fallback—draw Alexander from Catoblepas—to the callout, checkpoints, and global achievement entry. | Steam guide's Ultimecia's Castle boss list and GF51741's Catoblepas Draw table both identify Alexander. |

## Disc 3

| # | Section | Status |
|---:|---|---|
| 1 | The Aftermath | Fully audited |
| 2 | Trabia Canyon | Fully audited |
| 3 | Picking Up the Trail | Fully audited |
| 4 | Journey to the Silent Country | Fully audited |
| 5 | The Resistance | Fully audited |
| 6 | Esthar | Fully audited |
| 7 | Siege of Esthar | Fully audited |
| 8 | Lunar Base | Fully audited |
| 9 | Ragnarok | Fully audited |
| 10 | Back on Earth | Fully audited |
| 11 | The Final Mission | Fully audited |

### The Aftermath

Status: **Fully audited.** Alexander's learning/refinement setup, Zell Love Scene #9 and final payoff route, paid Ultima return, Weapons Monthly July, final Novice SeeD Candidates window, reusable Shumi phase, Dollet cleanup timing, Edea's House progression, Timber Maniacs issue, Edea/Seifer cards, Centra card rules, four Tutorial entries, and Infirmary trigger were checked. No correction or unresolved claim was required.

### Trabia Canyon

Status: **Fully audited.** The dream junction mapping and Ward condition, sword-fight timing/retry, “H-Hold on a sec” party-control window, optional enemies, fixed Ruby Dragon's affinities/statuses/draw tiers, LV Up/LV Down behavior, Breath party-size condition, non-perfect and perfect-file draw methods, and EXP-reduction finish were checked. The explicit fixed encounter correctly retains the normal Ruby Dragon behavior; no correction or unresolved claim was required.

### Picking Up the Trail

Status: **Fully audited.** The Novice SeeD Candidates payoff, Sorceress' Letter, White SeeD Ship location/boarding, one-time Timber Maniacs issue, all three Zone choices and rewards, Girl Next Door uniqueness warning, Watts/Angelo Card fallback and refinement, Holy Draw Point, and story-leader trigger were checked. No correction or unresolved claim was required.

### Journey to the Silent Country

Status: **Fully audited.** The White SeeD Ship return, Cactuar/AP preparation, Doomtrain material quantities and acquisition routes, temporary Edea party, Great Salt Lake Draw Points and route, Abadon preparation/data/strategy, and mystery-building transition were checked. No unresolved claim remains in this section.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The chapter omitted all three Shumi Village Ultima-drawing returns placed in this preparation sequence. | Incomplete | Added Ultima Drawing Sessions #5, #6, and #7 before Cactuar preparation, after the desert AP session, and after gathering Doomtrain ingredients. | GF72431 explicitly schedules these three returns around the preparation loop. |
| Edea was identified as a temporary party member, but the guide omitted the perfect-game consequence of using her in battle. | Incomplete | Added the warning to leave Edea out of the active party if preserving a perfect-game kill/KO record. | GF72431's Perfect Game Alert #13 states that Edea is optional here and can otherwise accumulate kills or KOs. |

### The Resistance

Status: **Fully audited.** The Laguna-party junction mapping and GF reset, complete laboratory progression, forced enemy groups, Weapons Mon 1st pickup window, Lv 30+ Elastoid Draw/Mug opportunity, Homing Laser description, reload advice, and final console/door route were checked against GF72431 and the corresponding enemy records in GF51741. No correction or unresolved claim was required.

### Esthar

Status: **Fully audited.** The Ward Card window, Esthar map topology and points of interest, Occult Fan IV setup/window, Combat King 004 setup, mall shops and one-time gifts, Call Shop missables, supported refinement routes, Pet Pals volumes, Esthar-region encounters, Doomtrain requirements and ingredient routes, Tears' Point, Lunar Gate party selection, and temporary Edea handling were checked.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The Lunar Gate instructions omitted the perfect-game warning for the mandatory Zell/Edea party. | Incomplete | Added a warning to prevent Edea from earning kills or KOs. | GF72431's Esthar chapter explicitly gives this warning; GF51741 gives the same restriction for temporary Edea use. |
| The Guide prescribed a complete fixed learning order for Doomtrain, but the allowed walkthrough evidence only explicitly prioritizes Forbid Med-RF. | Unverified | Softened the sentence to prioritize only Forbid Med-RF; the other named abilities are now identified as available options rather than a sourced mandatory order. | GF51741 says to learn Forbid Med-RF first and its Doomtrain table confirms the other abilities, but the checked allowed sources do not establish the Guide's former full order. |

### Siege of Esthar

Status: **Fully audited.** The operation setup, all three timed contact windows, Enc-None behavior, Combat King 004 payoff, first-contact treasure restriction, forced boarding battle, fixed Lv 1 non-war-asset encounters, complete three-elevator route, Draw Points, and every Disc 1-dependent treasure prerequisite were checked against GF72431 and the corresponding GF51741 encounter records. The explicit fixed-level overrides were preserved. No correction or unresolved claim was required.

### Lunar Base

Status: **Fully audited.** The Piet/Rinoa opening, examination-room Save Point, Lunar-rule abolition setup, Alexander Card window and Queen of Cards restriction, monitor/Ellone route, Laguna Card cutoff, med-bay and space-suit sequence, escape pod, and space-rescue controls were checked against GF72431 and GF51741.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The Guide claimed that a hidden Apocalypse Draw Point was in the Lunar Base examination room. | Incorrect | Removed the nonexistent Draw Point instruction. | GF72431's complete Lunar Base route and item summary identify no Draw Point or treasure there; GF51741 likewise lists no Lunar Base treasure and directs the player only to the Save Point. Apocalypse is not supported at this location by any checked allowed source. |
| The Laguna Card instructions omitted its immediately available, unusually large refinement reward. | Incomplete | Added Refinement Moment #12: Laguna Card refines into 100 Heroes, with the source's inventory-cap precaution. | GF72431 explicitly places this refinement immediately after winning the Laguna Card; GF51741 independently confirms the 100-Hero result. |

### Ragnarok

Status: **Fully audited.** The Save Point and junction setup, Propagator data/statuses/color drops, color-pair route and 25-kill fallback, and Ragnarok achievement were checked against GF72431, GF50775, GF51741, the Steam list, and the Steam guide. The optional-airship block that formerly appeared here was fully audited, corrected, and moved to “Back on Earth,” where those activities actually become the guide's progression focus.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| Jumbo Cactuar's Mug was listed as 3x/4x Cactus Thorn. | Incorrect | Corrected it to 3x Cactus Thorn with a 12.5% overall Mug chance. | GF72431's boss table and GF51741's level-banded steal table agree on 3x Cactus Thorn at every level. |
| The fixed-encounter discussion called Grendel/Imp a useful farming target despite the allowed route expressly excluding that pair from the useful fixed encounters. | Incorrect | Removed Grendel/Imp from the recommended farming list; Ruby Dragon, Behemoth, Iron Giant, and especially Tri-Face remain. | GF72431's Deep Sea Deposit section says every fixed encounter except Grendel/Imp is useful and identifies Tri-Face as the standout. |
| The Bahamut strategy omitted its key status openings and the especially valuable Full-Life draw opportunity. | Incomplete | Added Darkness and Slow and identified Full-Life as the priority Draw before ending the fight. | GF72431's boss strategy explicitly recommends both statuses and tells the player to fill each character with Full-Life; GF51741 independently recommends Darkness and drawing Bahamut's high-end magic. |
| The Guide described two steam-puzzle paths but did not give the steam expenditures needed to execute either one. | Incomplete | Added the exact Level 1-6 costs for the Zell fixed-encounter route and direct boss/Steam Room route, including the reset computer and seven-unit restoration. | GF72431's Steamworks table supplies the full two-route cost sequence. |
| The Deep Sea descent omitted its Triple Draw Point, hidden Ultima Draw Point, and hidden bottom-level Save Point. | Incomplete | Added all three at their validated screens and noted Move-Find for the Save Point. | GF72431's Deep Sea Deposit screen table and pre-boss instructions identify these utility points. |
| The Obel Lake route told the player merely to “collect the required rock clues,” leaving three rock locations and the Eldbeak clue unstated. | Incomplete | Added Eldbeak Peninsula, the Mandy Beach island, Balamb Beach, and the Monterosa Plateau nest, including the Thrustaevis alternatives. | GF72431's Obel Lake chapter enumerates the four required clues and their locations. |
| Completing Obel Lake was represented only as a generic treasure task, not as the official achievement. | Incomplete | Changed the checkpoint to the **Obel Lake Secret** achievement and stated the official completion requirement. | Steam list: “Complete the Obel Lake side quest”; Steam guide places the unlock at completion. |
| The complete PuPu route omitted the **UFO** achievement. | Incomplete | Added the UFO achievement to the prose and checkpoint at the PuPu resolution. | Steam list: “Complete the PuPu side quest”; Steam guide validates the four sightings, UFO? battle, and PuPu conclusion as the practical route. |

### Back on Earth

Status: **Fully audited.** The cabin trigger, paid Ultima return, Sorceress Memorial and Rinoa's return, airship sidequest window, Queen of Cards timing, Cactuar, Deep Sea Research Center, Obel Lake, PuPu, late Shumi/FH payoff, Level 100 islands, fixed Elnoyle material farming, perfect-game pacing, and promise scene were checked against GF72431, GF50775, GF51741, the Steam list, and the Steam guide.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The complete airship-sidequest block and its shared sidequest placements appeared in “Ragnarok,” before the mandatory return-to-Earth and Sorceress Memorial sequence. | Incorrect | Moved the block, its encounter panels, checkpoints, and all five shared sidequest placements to “Back on Earth” immediately after Rinoa rejoins. | GF72431 places Aerial Exploration after the cabin trigger, Ultima return, Sorceress Memorial, and Rinoa's return; its Ragnarok chapter ends when the Propagator pairs are cleared. |
| The chapter omitted Ultima Drawing Session #8 and its earliest timing before visiting the Memorial. | Incomplete | Added the Shumi Village paid-Ultima return immediately after the cabin trigger, including the reminder to revisit while doing optional quests. | GF72431 explicitly places Ultima Drawing Session #8 here, before Sorceress Memorial. |
| The fixed Elnoyle recommendation did not tell the player where or how to repeat the encounter, or connect its drops to weapon materials. | Incomplete | Added the former Combat King 004/man screen, talk-to-start and leave/re-enter loop, and Energy Crystal/Moon Stone purpose. | GF72431 identifies the repeatable man encounter as the practical source for these ultimate-weapon materials and singles it out before Disc 4. |
| The late Shumi Village workshop payoff and resulting FH Full-Life Draw Point were absent. | Incomplete | Added the Disc 2 completion prerequisite, workshop scene, Full-Life Draw Point location, and Disc 3 cutoff. | GF72431's Back on Earth chapter states that the scene appears only when both Shumi phases were finished on Disc 2 and creates the Draw Point at the former Master Fisherman seat. |
| The Guide omitted the special Level 100 encounter behavior and high-end Draw Points on the Islands Closest to Hell and Heaven. | Incomplete | Added both islands' fixed Level 100 behavior and the source's warning that the numerous Draw Points have low yields. | GF72431 explicitly identifies the enemy level and Draw Point characteristics for both islands. |
| The PuPu warning established that the card was unique but did not explicitly warn against Card Modding it. | Incomplete | Added the no-Card-Mod warning after the peaceful PuPu route. | GF72431's Missable Item Alert #7 says the PuPu Card cannot be replaced and must not be refined. |

### The Final Mission

Status: **Fully audited.** The Esthar briefing, Squall Card and refinement, preliminary cleanup, final Lunatic Pandora setup, Fujin/Raijin, fixed Lv 1 interior encounters, Meteor Draw Point, conditional excavation treasures, Mobile Type 8 and probes, exact irreversible cutoff, Seifer, Aura Draw, and Odin/Gilgamesh transition were checked against GF72431, GF50775, and GF51741.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The Squall Card pickup omitted its immediately available refinement choices. | Incomplete | Added 3 Three Stars, with each refining into 100 Triple or teaching Expendx3-1. | GF72431's Refinement Moment #13 gives these exact results. |
| The Guide labeled flying into Lunatic Pandora as the end-of-Disc-3 point of no return. | Incorrect | Recast that point as an early cleanup opportunity and moved the actual cutoff warning to after Mobile Type 8; added the Elevator #2 return route, affected quests/shops/resources, and the limited areas remaining afterward. | GF72431's Missable Item Alert #8 explicitly says the party can still return to Ragnarok after Mobile Type 8 and that proceeding beyond its room closes civilized areas. |
| The route recommended Mugging Mobile Type 8 for Laser Cannons even though its identical drop table is guaranteed. | Incorrect | Limited the Mug recommendation to the probes' optional stat-ups and told players to preserve the main body's guaranteed drop. | GF72431 lists a 12.5% Mug and 100% identical drop for Mobile Type 8 and says Mugging the main body does not matter; GF50775 corroborates the tables. |
| The Mobile Type 8 strategy omitted its mode-specific counters and lethal Corona/Megiddo Flame sequence. | Incomplete | Added Mobile/Support Mode behavior, both counter conditions, HP-to-1 Corona, the next-turn Spirit-ignoring Megiddo Flame, and the immediate-healing response. | GF72431's full boss strategy documents this sequence and its approximate 2,000 party-wide damage. |
| The Guide implied that a player who already recruited Odin could simply keep him out of the Seifer fight to avoid Gilgamesh. | Incorrect | Clarified that Odin appears automatically if recruited, is replaced by Gilgamesh, and can only be avoided by not recruiting Odin before this battle; added the 13-turn automatic endpoint. | GF72431 and GF51741 agree on the forced Odin event and Gilgamesh replacement. |

## Disc 4

| # | Section | Status |
|---:|---|---|
| 1 | The Awakening | Fully audited |
| 2 | Commencement Room | Fully audited |
| 3 | Ultimecia's Castle | Fully audited |
| 4 | Final Preparations | Fully audited |
| 5 | The Final Battle | Fully audited |

### The Awakening

Status: **Fully audited.** The forced party/junction check, crane route and inability to leave Lunatic Pandora, Adel preparation, Adel/Rinoa records, both Mugs, Rinoa healing, single-target restriction, and encounter completion were checked against GF72431 and GF51741.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The strategy did not state that any death of Rinoa causes Game Over and omitted Adel's announced Ultima sequence. | Incomplete | Added the absolute Rinoa survival condition, corrected Adel's pronoun, identified the every-turn drain, and added the “Magical powers...” telegraph with Shell mitigation. | GF72431's Adel strategy explicitly documents all of these mechanics. |

### Commencement Room

Status: **Fully audited.** The real/fake Save Points, Tent opportunity, elemental-defense advice, all eleven Sorceress patterns and reward ordering, final countdown/counter, Edea's House route, Triple Draw Point, world-map portals, Eden warning, and castle approach were checked against GF72431. No correction or unresolved claim was required.

### Ultimecia's Castle

Status: **Fully audited.** The sealed-command rules, random-level encounters, party switching, all eight guardians and seven missed-GF recovery draws, keys, paintings, coffins, organ/waterway Rosetta Stone route, Tiamat/Eden fallback, Omega Weapon, Proof of Omega, and final approach were checked against GF72431, GF50775, GF51741, the Steam list, and the Steam guide.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The Guide claimed Sphinxara could be Carded and refined into a G-Mega-Potion. | Incorrect | Removed the card/refinement claim while retaining its validated spells, statuses, summons, and physical strategy. | GF50775 says both Sphinx forms cannot be turned into cards; GF72431 lists no card reward. |
| The Tri-Point card callout reversed and multiplied its Card Mod result, called Jet Engines unique, and assigned the wrong direct ability/refinement ratios. | Incorrect | Removed the duplicate false refinement block and retained the validated boss drop: Rocket Engine teaches Spd+40%. | GF51741: 40 Tri-Point Cards refine into one Jet Engine; Jet Engine teaches Spd+20%, while Rocket Engine teaches Spd+40%. GF72431 identifies Rocket Engine as Tri-Point's drop. |
| Diamond Armor was described only as generic crafting material. | Incorrect | Corrected it to teach GFHP+40%. | GF72431 states this effect after Red Giant. |
| Krysta's strategy called Meltdown mandatory and claimed Earth magic always misses. | Incorrect | Made Meltdown optional for physical damage, retained Krysta's zero Spirit, removed the unsupported Earth claim, and added its validated Gravity vulnerability. | GF72431 recommends magic/Gravity and lists only Ice nullification; GF50775's affinity table corroborates Gravity and does not support Earth immunity. |
| The fixed unlock sequence attempted to restore Item twice and never restored GF. | Incorrect | Rewrote the post-boss unlock prompts conditionally so Draw, Magic, Item, Limit Break, GF, Command, Resurrection, and Save can each be restored once. | GF72431 lists the eight sealed abilities and its canonical route restores GF after Krysta. |
| Gargantua was said to counter only physical attacks, magic was presented as safe, Pain was said to block Curse, and Magic Armlet was said to teach St.Def-Jx4. | Incorrect | Corrected Counter Twist to all non-fatal damage, changed the plan to Zombie plus Revive/Recover/X-Potion (or lower-accuracy KO), called for direct Curse/Slow defense, and corrected Magic Armlet to Spr+60%. | GF72431's Gargantua preparation/strategy and reward description establish each point; GF51741 corroborates the item effect. |
| The coffin solution was listed as 1-2-3-4. | Incorrect | Corrected the reset solution to **2-3-1-4**. | GF72431 gives that exact sequence. |
| Catoblepas's Lightning protection incorrectly included Blizzaga. | Incorrect | Removed Blizzaga and retained Thundaga on Elem-Def-J. | GF72431 identifies Thunder Summon as Lightning elemental. |
| Dark Flare was described as simultaneous Fire/Ice/Thunder damage requiring three elemental defenses. | Incorrect | Corrected Dark Flare to Fire-only, Spirit-ignoring party damage; Firaga alone supplies the source's recommended 150% Fire resistance. | GF72431's Tiamat section explicitly identifies Fire as the sole element. |
| Defeating Tiamat was said to automatically make the internal Save Point available. | Incorrect | Made Save a player-selected unlock, used only if it is the remaining priority. | GF72431 says the player chooses an ability after each guardian; Save is not automatically restored by Tiamat. |
| Omega's version note said only PlayStation was fixed at Level 100 and Steam/Remastered scaled. | Incorrect | Corrected PlayStation, Steam, and Remastered to fixed Level 100; only the original PC version uses party-average scaling ±20%. | GF72431's Omega table contains this explicit version note. |
| The Omega preparation asserted mandatory ammo quantities, Str above 220, and slowest battle speed that the allowed sources do not establish. | Unverified | Removed those hard requirements and retained only the validated 9,999 HP, Defend, Item, Death defense, empty Elem-Atk, passive priority, Meltdown, and recovery-stock setup. | The full Omega sections in GF72431, GF50775, and GF51741 were checked; none supports the removed thresholds as requirements. |
| Omega recovery and invincibility advice used an unsafe Mega-Potion after Terra Break, said three Holy Wars were needed, claimed Hero was purchasable, and reversed the Power Wrist/Aura refinement quantities. | Incorrect | Restored the source's Elixir/Megalixir recovery, clarified that one Holy War affects the whole party, removed the shop claim, and corrected one Power Wrist/Hypno Crown to 10 Aura Stones and each stone to one Aura. | GF72431's Omega and refinement sections support the corrected sequence and quantities. |
| The final castle paragraph placed Left Diamond inside the castle as a rare-card opponent. | Incorrect | Removed the false castle encounter; Disc 4 CC Group card recovery remains on the Ragnarok in Final Preparations. | GF72431 places the CC Group aboard Ragnarok after it is recovered. |
| A generic missable checkpoint instructed every player not to defeat Ultima Weapon or Omega Weapon. | Incorrect | Removed it; leaving Ultima alive and not saving after Omega are explicitly Perfect Game/repeatable-farming preferences, not universal missables. | GF72431 limits both warnings to the relevant farming or Perfect Game goals. |

### Final Preparations

Status: **Fully audited.** Ragnarok recovery, compressed-time access, Disc 4 CC Group behavior, Man from Garden/Joker, Queen of Cards, remaining field areas, Odin timing, Level 100 islands, late refinements, stat-max prerequisites, full sealed-command restoration, and the Omega setup/bell route were checked against GF72431, GF50775, and GF51741.

| Existing claim or omission | Classification | Change | Sources and reasoning |
|---|---|---|---|
| The “CC Group on the Ragnarok” callout was empty. | Incomplete | Added Man from Garden/Joker's unconditional shops/card behavior, the completed CC Group's rare-card replay function, and the PuPu exception. | GF72431's Final Preparations section distinguishes Joker's universal presence from the quest-dependent CC members and their rare-card farming reward. |
| The Guide said world-map cleanup was available but omitted the route required to recover Ragnarok. | Incomplete | Added the middle portal, Forest of Solitude Chocobo, Centra shallows crossing, Kashkabald Desert recovery, and return-portal activation. | GF72431 gives this complete route at the start of Final Preparations. |
| The remaining accessible areas, Crash Site Queen behavior, post-Gilgamesh Odin timing, and Level 100 islands were omitted. | Incomplete | Added the eight accessible field areas, Queen card/rule limitations, item-farming warning for Odin, and both fixed-Level-100 islands. | GF72431 lists each item explicitly in the Disc 4 cleanup section. |
| The player-facing Guide defined six nested “Perfect Game tiers” with extensive exact requirements that could not be traced to the allowed sources. | Unverified | Removed the tier hierarchy and replaced it with the allowed guides' concrete perfect-file cautions: preserve Deep Sea fixed encounters, delay Odin during item farming, and avoid saving after a repeatable Omega win. | GF72431, GF50775, and GF51741 were checked; they support the replacement cautions but not that six-tier classification as written. |
| The chapter omitted the final Eden/GFAbl Med-RF and repeatable-rare-card refinement milestone. | Incomplete | Added four high-value, source-validated routes and directed the player to canonical Refine/Items data for the remainder. | GF72431's Refinement Moment #14 supplies the stated Tri-Face, Minotaur, Irvine, and Ward chains. |

### The Final Battle

Status: **Fully audited.** The approach, party-replacement rules, sealed-command behavior, preparation, all six enemy records, phase scripts, achievement, and ending checkpoint were checked.

| Existing claim or omission | Classification | Change | Support |
|---|---|---|---|
| The Helix advice only said to destroy support units quickly and did not explain how each Helix changes the main body's attacks or how the phase transition removes them. | Incomplete | Added the one-Helix/two-Helix attack changes, Great Attractor cadence, resummoning caveat, and the approximately 65%-HP-loss transition that removes both Helixes. | GF72431, The Final Battle. |
| The Guide said Ultimecia removes 100 copies of the character's highest-stocked spell. | Incorrect | Corrected this to destruction of an entire random spell stock; the warning now accurately describes the risk without claiming a deterministic target. | GF72431 describes both Griever and final Ultimecia blowing away a random magic stock. |
| The End of Game checkpoint paraphrased the requirement as defeating Ultimecia and clearing the ending sequence. | Incorrect | Replaced it with the official requirement, “Finish the game.” | Steam list (primary achievement authority). |

### Global Achievement and Missable Checklist Pass

Status: **Fully audited.** All 34 achievement records were matched to the official Steam names/requirements, then their practical timing and routes were checked against the Steam guide and relevant GameFAQs chapters. All global missable records were reconciled with the completed progression audit.

| Existing claim or omission | Classification | Change | Support |
|---|---|---|---|
| The 1,000 Kills cleanup entry placed the Island Closest to Hell northeast of Esthar and promised normal completion by Disc 3. | Incorrect | Replaced it with the Steam guide's weak three-enemy forest route near Dollet and removed the unsupported timing promise. | Steam list and Steam guide. |
| Carbuncle said both Iguions had to remain alive to Draw it. | Incorrect | Corrected the first opportunity to either Iguion and added the Krysta fallback already validated in the castle audit. | GF72431. |
| Card Player required a win, and Loser defined “rare” as Level 5+. | Incorrect | Restored the official requirements: play Triple Triad; lose a rare card. | Steam list (primary). |
| Ragnarok said the airship was obtained automatically during Lunar Base and pointed to the wrong chapter. | Incorrect | Changed it to “Find Ragnarok,” described the same-color Propagator pairs, and moved the checklist hint to the Ragnarok chapter. | Steam list and Steam guide. |
| UFO described five sightings by counting the later UFO? battle location as another flyover and misplaced PuPu. | Incorrect | Restored the four flyovers, UFO? battle north of the Chocobo Sanctuary area, and PuPu meeting at the former Balamb Garden site. | Steam guide; GF72431. |
| Top Rank again required all 30 tests, Maximum HP sent players to a wrongly located island, and End of Game used a nonofficial paraphrase. | Incorrect | Replaced all three with their official requirements and source-supported practical guidance. | Steam list and Steam guide; GF51741 for written tests. |
| The global missable list retained the unsupported “do not defeat Ultima/Omega” warning, understated the castle fallback GF list, preferred the fallback Eden draw, and placed the PuPu Card in the wrong chapter. | Incorrect / Incomplete | Removed the false boss warning; named the seven drawable-GF fallbacks; restored Ultima Weapon as Eden's first opportunity and Tiamat as fallback; moved PuPu to Back on Earth. | GF72431; completed Disc 3/4 audits. |
| The global Disc 3 cutoff warning did not identify the last reversible screen. | Incomplete | Added the Mobile Type 8 boundary and the final step into the Seifer sequence. | GF72431's Missable Item Alert #8. |

## Could Not Be Validated

- **The SeeD Exam — Blind Draw Point visibility.** The Guide called the communications-tower Blind Draw Point “hidden.” GF78107 and GF72431 confirm the Draw Point and spell but do not classify its visibility, and no checked allowed source supplied that descriptor. The word “hidden” was removed; the location/spell instruction remains.
- **Trabia Garden — basketball-court Save Point.** The Guide placed a Save Point at the north end of the basketball-court area. The complete Trabia routes in GF72431, GF51741, and GF37211 do not identify one there. The assertion was removed; all surrounding progression instructions remain.
- **Esthar — complete Doomtrain ability-learning order.** The Guide prescribed Forbid Med-RF, ST-Def-Jx4, Elem-Defx4, Auto-Shell, then Boost as one fixed order. GF51741 explicitly recommends Forbid Med-RF first and confirms that Doomtrain learns all the other named abilities, but the checked allowed sources do not support that complete sequence. The Guide was softened to retain only the validated first priority and present the remainder as player-selected options.
- **Ultimecia's Castle — mandatory Omega damage-build thresholds.** The Guide required 100 Fast Ammo, 50 AP Ammo, 50 Pulse Ammo, Strength above 220 for two characters, and the slowest battle speed. The complete Omega strategies in GF72431, GF50775, and GF51741 do not establish those exact values as requirements. They were removed; the validated defensive setup and attack-pattern response remain.
- **Final Preparations — six-tier Perfect Game hierarchy.** The Guide presented six nested tiers with many exact inventory, stat, rule, compatibility, kill, KO, escape, and hardware requirements. The checked allowed guides support numerous individual completion goals but do not establish this six-tier framework as written. The hierarchy was removed and replaced with source-supported late-game preservation warnings.
- **About This Guide — kill-credit exclusion.** The Guide said GF summon kills never count toward 100 Kills/1,000 Kills. The Steam list and Steam guide state only the kill totals and do not establish this exclusion. The restriction was removed; the official wording remains.
- **About This Guide — Draw Point recharge timing.** The Guide asserted that Draw Points recharge over time, while the Combat Mechanics page gave a different exact step range. The checked allowed sources support repeated Draw Point use but do not establish either recharge formula. Both recharge claims were removed.
- **Controls & Interface — modern platform mappings.** The Xbox, Switch, modern PlayStation, keyboard field/battle, and mobile mappings were not documented by the allowed sources. They were removed; the original PlayStation action table and Steam guide's F1/F2/F3 booster keys remain.
- **Controls & Interface — automatic trigger option.** The Guide claimed automatic Renzokuken timing could be enabled from Squall's status screen. The checked sources support manual R1 timing but did not establish that option. The claim was removed.
- **Combat Mechanics — exact damage/critical/ATB formulas.** The physical, magical, critical-rate, and seconds-per-ATB formulas could not be confirmed from the allowed sources as written. They were removed and replaced by the source-supported qualitative stat relationships already present.
- **Combat Mechanics — Draw Point step range.** No checked source supported the stated 10,000–20,000 walking-step refill interval. The callout was removed.
- **Combat Mechanics — exact auxiliary ability callouts.** The removed Absorb/Initiative, GFHP item-source, per-GF Boost-duration, and positional Cover blocks contained exact claims that could not be fully reconstructed from the allowed sources. Supported ability descriptions elsewhere were left unchanged; the unsupported blocks were removed.
- **Triple Triad Rules — deterministic RNG scripts.** The exact refusal counts, draw-point interactions, and reset sequences were specific to an unstated game/RNG state and could not be safely applied to Remastered from the allowed sources. They were removed; general save/reload and rule-mixing guidance remains.
- **GF Mechanics — PocketStation summons in Remastered.** GF50775 documents the original PlayStation/PocketStation behavior, and GF72431 says Remastered has no Chocobo World access, but the allowed sources do not validate the Guide's former claim that MiniMog, Moomba, and advanced Chocobo growth are emulated in Remastered. Those Remastered acquisition/stat claims were removed and replaced with an explicit legacy-version caveat.

## Source Conflicts

- **Missile Base — BGH251F2 AP and magazine attribution.** GF72431 lists the Missile Base BGH251F2 as awarding 0 AP with no enemy drop and treats Weapons Monthly June as a mission-sequence item. GF50775 and GF51741 list 10 AP and Weapons Monthly June as the boss's fixed drop. All sources agree that the magazine is guaranteed after the encounter. The Guide now states the practical certainty and exposes the unresolved technical disagreement instead of selecting one record as definitive.
- **Return to Balamb — Combat King 002 attribution.** GF72431 says Fujin always drops the magazine; GF51741 assigns it as the second Raijin encounter's fixed drop. Both agree that the magazine is guaranteed after the joint fight. The Guide now records the guaranteed encounter reward without assigning it to either combatant.

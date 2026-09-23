# Final Fantasy VIII Guide UI Audit

## Review scope and method

Reviewed all **47 main Guide chapters** in chapter order: 13 reference chapters and 34 story chapters across Discs 1–4. The review covered section order, prose and structured-data overlap, cards and Queen of Cards timing, sidequests, GF learning, Draw Points, field enemies, bosses, rewards, warnings, checkpoints, achievements, and consistency with the rest of the Guide. It combined a complete chapter-data pass with a live visual pass before and after the changes.

The Guide's detailed route and strategy content is intentional. Similar information was kept when it serves a different point in the player's progression, and the reference tabs remain the canonical lookup for system-wide data.

## Findings and decisions

| Area | Finding | Decision |
| --- | --- | --- |
| Shared visual language | The dark Garden palette and callout colors already distinguish warnings, cards, refinements, and optional routes. Long chapters felt like repeated prose blocks when their internal ordering and metadata were not easy to scan. | Kept the existing palette, tightened reusable content treatments, and retained chapter-specific narrative/strategy prose. |
| Field encounters | Reviewed all 229 walkthrough enemy entries. Many notes repeated level-banded Draw, Mug, and Drop lists already shown in the structured rows; others repeated encounter facts or nearby walkthrough/callout guidance. Long Drop-rate strings also competed with enemy names and Draw checkboxes. | Removed 187 redundant or non-actionable notes at the source; 36 entries retain distinct strategy, missable, spawn-location, behavior, or item-use context. The renderer also suppresses any remaining bare Draw/Mug/Drop list instead of restating it. Normal Drop outcomes use compact item/rate chips, with Rare Item outcomes under a disclosure. |
| Learning and refinement orders | The Guide recognized only Unicode arrows, while many paths use `->`; GF learning order used a separate chip style. | Added one wrapping sequence treatment for both arrow forms and reused it in Guide chains and the GF learning order. |
| Inline sidequest tracker | Inline cards repeated the quest summary, availability, deadline, and rewards already available in the Sidequests tab and often repeated alongside the walkthrough step. | Inline cards now focus on the check-off, current window, and deadline. Summary, requirements, route, notes, and rewards remain available in the expanded card or canonical Sidequests view. |
| Early Water refinement | `d1-preparing-for-the-exam` presented the Fastitocalon Card → Water Crystal route in both “Early Card Mod priorities” and “Early magic refinement targets.” | Kept the complete route in the Card Mod list and replaced the repeated route in the magic-target list with a cross-reference. Other distinct card paths remain. |
| Omega Weapon | The Castle chapter already contains the complete setup, bell route, attack pattern, and reward. Final Preparations repeated the route in prose, a checkpoint, and a second inline sidequest tracker. The Castle Omega note also repeated the Draw list from its structured boss entry. | Kept full encounter guidance in Ultimecia's Castle and the complete quest in the Sidequests tab. Final Preparations now has one concise pointer plus its existing bell-route checkpoint; removed the duplicate inline sidequest placement and repeated route paragraph. Removed only the duplicate Omega Draw sentence; kept the unique elemental immunity, status immunity, and no-Mug note. |
| Queen of Cards and CC Group recovery | Some card quests recur across chapters and windows. The two Deling City Queen placements are separate Kiros and Sacred milestones; the Disc 4 Queen and CC Group trackers inherited Disc 1/2 windows and requirements, while neighboring prose repeated their recovery details. | Kept the chronological milestones distinct. Added Disc 4-specific availability, deadlines, and requirements to both recovery placements; retained unique Queen card-pool and CC Group/PuPu details in their expanded steps; and removed duplicated Disc 4 prose. The Sidequest Index remains a compact overview, while the Sidequests tab carries the full route. |
| Cards, bosses, Draw Points, rewards, achievements | Local chapter opportunities have a different purpose from general rules and canonical data in the Cards, Refine, GFs, Items, or achievement/checklist views. Boss strategy also explains why a structured field matters. | Kept useful local prompts and strategic explanations. Consolidation was limited to actual repeated instructions or facts already displayed in the same presentation. |
| Progression order | Checkpoints and sidequest placements are tied to paragraph positions. Content edits could have shifted timing or tracker anchors. | Preserved chapter order and existing checkpoint IDs/indexes. Removed the redundant Omega placement instead of moving it; no route order or optional window was changed. |

## Chapter-by-chapter review log

The short entries below record the disposition for each chapter. “Retained” means overlap with a reference page or another progression window was reviewed and kept because the local timing, route, or gameplay purpose is different.

| Disc | Chapter | Review result |
| --- | --- | --- |
| Reference | About This Guide | Kept orientation, navigation, and usage notes as the guide's entry point; sequence examples now use the shared chain renderer. |
| Reference | Controls & Interface | Kept platform-specific controls and interface guidance together; no walkthrough step duplication found. |
| Reference | Shop Reference | Kept as the canonical shop lookup; local shop stops remain timely chapter prompts. |
| Reference | Sidequest Index | Kept as a disc-level overview; full requirements and routes remain in the Sidequests tab. |
| Reference | Character Reference | Kept character information as a reference layer; story-specific party instructions remain in chronology. |
| Reference | Combat Mechanics | Kept system explanations separate from boss-specific tactics. |
| Reference | Status Effects | Kept each status explanation as a scannable reference callout; local warnings explain encounter use. |
| Reference | Junction Quick Reference | Kept as a compact system lookup; no duplicated chapter route found. |
| Reference | SeeD Rank & Salary | Kept the full scoring and salary reference; exam-specific scoring reminders remain local to the mission. |
| Reference | Triple Triad Rules | Kept general rules and Queen mechanics distinct from chapter-specific opponents and card timing. |
| Reference | GF Mechanics | Kept system-wide GF, compatibility, and learning guidance; learning routes now share the structured sequence presentation. |
| Reference | Magic Quick Reference | Kept as the canonical magic lookup; chapter-specific Draw reminders remain local. |
| Reference | Story, Lore & Music | Kept optional story context distinct from the actionable walkthrough. |
| Disc 1 | Preparing for the Exam | Reviewed card opportunities, sidequest timing, GF learning, enemy entries, and refinement paths. Consolidated the repeated Fastitocalon Water Crystal route. |
| Disc 1 | The SeeD Exam | Kept exam scoring, required route, and Elvoret's boss Draw data; post-battle Siren setup serves a separate follow-through purpose. |
| Disc 1 | After the Exam | Kept the Magical Lamp pickup deadline separate from the later fight setup, along with Diablos preparation and card timing. |
| Disc 1 | The Timber Mission | Kept Watts/Angelo timing, mission instructions, boss tactics, and local optional stops in their chronology. |
| Disc 1 | Dollet Exploration | Kept Bone Quest timing separate from its route and preserved the optional interlude after the Timber mission. |
| Disc 1 | Journey to Galbadia Garden | Kept travel, Draw Points, and encounters in route order; enemy notes use the shared structured-data cleanup. |
| Disc 1 | Galbadia Garden | Kept the short garden visit and its local card/opportunity prompts; no redundant full sidequest block found. |
| Disc 1 | Deling City | Kept the Queen's Kiros and Sacred milestones as separate steps; retained card, Tomb, boss, and missable instructions in route order. |
| Disc 2 | Winhill | Kept the Laguna dream route and its chapter-local checklist. |
| Disc 2 | The Escape | Kept the timed escape sequence and checkpoint reminders; no repeated route block found. |
| Disc 2 | Missile Base | Kept the scored infiltration route and its distinct checkpoints together. |
| Disc 2 | Return to Balamb Garden | Kept the Garden return, NORG encounter, and Leviathan timing in progression order. |
| Disc 2 | Fisherman's Horizon | Kept the town, performance, card, and optional-stop guidance as one local progression window. |
| Disc 2 | The Garden Festival | Kept the brief, self-contained festival sequence and its associated checkpoints. |
| Disc 2 | Exploring the World | Kept optional routes and their deadlines in chronological order; inline sidequest cards are now compact trackers. |
| Disc 2 | Return to Balamb | Kept the town return and its distinct card and GF opportunities in route order. |
| Disc 2 | Trabia Garden | Kept the Zell and card-related windows as chapter-specific opportunities. |
| Disc 2 | Battle of the Gardens | Kept the battle route, boss strategies, and missables together; no duplicated boss-preparation block required removal. |
| Disc 3 | The Aftermath | Kept separate character and card progression windows; inline trackers now foreground timing and check-off. |
| Disc 3 | Trabia Canyon | Kept the optional canyon quest as a single chronological detour. |
| Disc 3 | Picking Up the Trail | Kept the short transition and its discrete character/card opportunities. |
| Disc 3 | Journey to the Silent Country | Kept the Laguna route, optional guidance, and encounter notes in story order. |
| Disc 3 | The Resistance | Kept the resistance sequence and its local opportunity checkpoints. |
| Disc 3 | Esthar | Kept the long city route, shop stops, sidequests, and party reminders in travel order. |
| Disc 3 | Siege of Esthar | Kept its timed route and optional milestones in chronological order. |
| Disc 3 | Lunar Base | Kept the space sequence and character/achievement reminders at their required point. |
| Disc 3 | Ragnarok | Kept the ship sequence and its card/sidequest interactions distinct from the later Disc 4 cleanup. |
| Disc 3 | Back on Earth | Kept Obel Lake, PuPu, GF, and world cleanup routes; their inline tracker entries no longer expand into repeated metadata by default. |
| Disc 3 | The Final Mission | Kept its boss sequence, GF opportunities, reward, and achievement guidance attached to the relevant encounter. |
| Disc 4 | The Awakening | Kept the opening route and encounter presentation in the Castle approach order. |
| Disc 4 | Commencement Room | Kept the room's route, encounter, and missable prompts in place. |
| Disc 4 | Ultimecia's Castle | Reviewed all 15 random field enemy entries and the guardian/Omega sequence. Structured encounter facts now stay in their rows; useful tactics, GF reminders, reward context, and warnings remain in prose. Removed the second Omega Draw list. |
| Disc 4 | Final Preparations | Kept command restoration and final-party chronology; corrected the Queen and CC Group recovery trackers' Disc 4 timing and removed the neighboring prose that repeated their recovery steps. Consolidated Omega guidance into one Castle pointer and its existing checkpoint, removing the overlapping inline sidequest tracker while leaving the full route in Sidequests. |
| Disc 4 | The Final Battle | Kept final party preparation, boss stat blocks, per-phase strategy, and end-of-game achievement guidance at the point of no return. |

## Reusable presentation changes

- `SequenceSteps` is shared by refinement chains in the Guide, suggested GF learning orders, and Card Mod conversions in the Cards view. It wraps at narrow widths and supports both `->` and `→` source text.
- Field enemy notes now contain only distinct context; structured Draw/Mug/Drop rows remain the source for those facts. Normal drop rates render as compact item/rate chips.
- Inline sidequest blocks now work as compact, time-sensitive checklist entries; their full route remains expandable and available in the Sidequests view.
- Warnings, optional content, rewards, and boss tactics keep their existing callout families and accent colors.

## Visual validation

Before editing, visually inspected the running Guide at the early-game preparation chapter, a Disc 2 exploration chapter, and Ultimecia's Castle. The baseline showed tall repeated sidequest cards, arrow paths rendered as prose when they used ASCII arrows, and Castle enemy rows that displayed Draw/Mug/Drop facts again in the notes. The Castle view also showed long Drop-rate pills competing with enemy names and Draw checkboxes.

After editing, re-opened the same early, mid, and late chapters and inspected the updated card/refinement chains, GF learning sequence, inline tracker, field enemy rows, and boss guidance. Responsive checks were completed at desktop, tablet-like, and narrow/mobile widths; the sequence and encounter rows wrap without horizontal overflow. Player Context Draw checkboxes remain alongside the structured Draw data, and the existing Guide/Sidequests/GFs/Cards/Refine navigation remains available.

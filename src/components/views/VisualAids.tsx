import { useState } from 'react'
import { Images, Maximize2 } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface GuideImage {
  src: string
  alt: string
  caption: string
  wide?: boolean
}

interface InlineAidProps {
  chapterId: string
  paragraphText: string
}

export type VisualAidPlacement = 'before' | 'after'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`


const namedGuideImage = (folder: string, file: string) =>
  asset(`images/${folder}/${file}`)

const hasCalloutTitle = (text: string, title: string) =>
  text.includes(`{{CALLOUT:`) && text.includes(`|${title}}}`)

export function contextualVisualAidPlacement(chapterId: string, paragraphText: string): VisualAidPlacement {
  if (
    chapterId === 'd1-preparing-for-the-exam' &&
    hasCalloutTitle(paragraphText, 'Balamb Garden orientation')
  ) return 'before'

  if (
    chapterId === 'd1-galbadia-garden' &&
    (hasCalloutTitle(paragraphText, 'Tomb route map') || hasCalloutTitle(paragraphText, 'To obtain the GF Brothers'))
  ) return 'before'

  if (
    chapterId === 'd2-winhill' &&
    hasCalloutTitle(paragraphText, 'Disc 2 opening')
  ) return 'before'

  if (
    chapterId === 'd2-the-garden-festival' &&
    (paragraphText.includes('**Chocobo Forests**') || hasCalloutTitle(paragraphText, 'Chocobo Forests'))
  ) return 'before'

  if (
    chapterId === 'd3-picking-up-the-trail' &&
    hasCalloutTitle(paragraphText, 'White SeeD Ship location')
  ) return 'before'

  if (
    chapterId === 'd3-esthar' &&
    hasCalloutTitle(paragraphText, 'Esthar City Map')
  ) return 'before'

  if (
    chapterId === 'd3-siege-of-esthar' &&
    hasCalloutTitle(paragraphText, 'Timed Contact Points')
  ) return 'before'

  if (
    chapterId === 'd3-back-on-earth' &&
    hasCalloutTitle(paragraphText, 'Sorceress Memorial Location')
  ) return 'before'

  if (
    chapterId === 'd3-ragnarok' &&
    (hasCalloutTitle(paragraphText, 'Deep Sea Research Center') || hasCalloutTitle(paragraphText, 'Bahamut'))
  ) return 'before'

  if (
    chapterId === 'd3-ragnarok' &&
    (hasCalloutTitle(paragraphText, 'PuPu Sidequest') || hasCalloutTitle(paragraphText, 'Obel Lake Quest'))
  ) return 'before'

  if (
    chapterId === 'd4-ultimecia-castle' &&
    (paragraphText.includes("Inside **Ultimecia's Castle**") || paragraphText.includes('**Unlock Resurrection.**'))
  ) return 'before'

  if (
    chapterId === 'd4-final-preparations' &&
    hasCalloutTitle(paragraphText, 'Final overworld access')
  ) return 'before'

  return 'after'
}

export function getBossImages(chapterId: string, bossName: string): GuideImage[] {
  const key = `${chapterId}:${bossName.toLowerCase()}`
  const imagesByBoss: Record<string, GuideImage[]> = {
    'd1-preparing-for-the-exam:ifrit': [
      {
        src: namedGuideImage('preparing-for-the-exam', 'ifrit-boss.png'),
        alt: 'Ifrit boss battle in the Fire Cavern',
        caption: 'Ifrit boss battle',
        wide: true,
      },
    ],
    'd1-the-seed-exam:elvoret': [
      {
        src: namedGuideImage('the-seed-exam', 'elvoret-boss.png'),
        alt: 'Elvoret boss battle at the Dollet communications tower',
        caption: 'Elvoret boss battle',
        wide: true,
      },
    ],
    'd1-the-seed-exam:x-atm092': [
      {
        src: namedGuideImage('the-seed-exam', 'x-atm092-escape.png'),
        alt: 'X-ATM092 chasing the party during the Dollet timed escape',
        caption: 'X-ATM092 timed escape',
        wide: true,
      },
    ],
    'd1-after-the-exam:granaldo': [
      {
        src: namedGuideImage('after-the-exam', 'granaldo-raldo-boss.png'),
        alt: 'Granaldo and Raldo boss battle in the Balamb Garden Training Center',
        caption: 'Granaldo and Raldo boss battle',
        wide: true,
      },
    ],
    'd1-after-the-exam:diablos': [
      {
        src: namedGuideImage('after-the-exam', 'diablos-boss.png'),
        alt: 'Diablos boss battle after using the Magical Lamp',
        caption: 'Diablos boss battle',
        wide: true,
      },
    ],
    'd1-the-timber-mission:fake president': [
      {
        src: namedGuideImage('the-timber-mission', 'fake-president-boss.png'),
        alt: 'Fake President boss battle inside the Forest Owls train',
        caption: 'Fake President boss battle',
        wide: true,
      },
    ],
    'd1-the-timber-mission:gerogero': [
      {
        src: namedGuideImage('the-timber-mission', 'gerogero-boss.png'),
        alt: 'Gerogero boss battle inside the Forest Owls train',
        caption: 'Gerogero boss battle',
        wide: true,
      },
    ],
    'd1-galbadia-garden:sacred': [
      { src: namedGuideImage('tomb-of-the-unknown-king', 'sacred-boss.png'), alt: 'Sacred boss battle screenshot', caption: 'Sacred boss battle', wide: true },
    ],
    'd1-galbadia-garden:minotaur': [
      { src: namedGuideImage('tomb-of-the-unknown-king', 'sacred-minotaur-boss.png'), alt: 'Sacred and Minotaur boss battle screenshot', caption: 'Sacred and Minotaur boss battle', wide: true },
    ],
    'd1-deling-city:2x iguion': [
      {
        src: namedGuideImage('deling-city', 'iguion-boss.png'),
        alt: 'Iguion boss battle during the Deling City assassination operation',
        caption: 'Iguion boss battle',
        wide: true,
      },
    ],
    'd1-deling-city:seifer': [
      {
        src: namedGuideImage('deling-city', 'seifer-boss.png'),
        alt: 'Seifer duel during the Deling City parade',
        caption: 'Seifer duel',
        wide: true,
      },
    ],
    'd1-deling-city:edea': [
      {
        src: namedGuideImage('deling-city', 'edea-boss.png'),
        alt: 'Edea boss battle at the end of Disc 1',
        caption: 'Edea boss battle',
        wide: true,
      },
    ],
    'd2-the-escape:biggs (2nd)': [
      {
        src: namedGuideImage('the-escape', 'biggs-wedge-second-battle.png'),
        alt: 'Biggs and Wedge second boss battle in D-District Prison',
        caption: 'Biggs and Wedge second battle',
        wide: true,
      },
    ],
    'd2-the-escape:wedge (2nd)': [
      {
        src: namedGuideImage('the-escape', 'biggs-wedge-second-battle.png'),
        alt: 'Biggs and Wedge second boss battle in D-District Prison',
        caption: 'Biggs and Wedge second battle',
        wide: true,
      },
    ],
    'd2-missile-base:base leader': [
      {
        src: namedGuideImage('missile-base', 'base-leader-soldiers.png'),
        alt: 'Base Leader and Base Soldiers fight inside the Missile Base',
        caption: 'Base Leader and Base Soldiers',
        wide: true,
      },
    ],
    'd2-missile-base:bgh251f2 (missile base)': [
      {
        src: namedGuideImage('missile-base', 'bgh251f2-boss.png'),
        alt: 'BGH251F2 boss battle outside the Missile Base with the timer active',
        caption: 'BGH251F2 at Missile Base',
        wide: true,
      },
    ],
    'd2-return-to-balamb-garden:oilboyle': [
      {
        src: namedGuideImage('return-to-balamb-garden', 'oilboyle-boss.png'),
        alt: 'Oilboyle boss battle in Balamb Garden MD Level',
        caption: 'Oilboyle boss battle',
        wide: true,
      },
    ],
    'd2-return-to-balamb-garden:norg': [
      {
        src: namedGuideImage('return-to-balamb-garden', 'norg-boss.png'),
        alt: 'NORG boss battle in Balamb Garden basement',
        caption: 'NORG boss battle',
        wide: true,
      },
    ],
    'd2-fishermans-horizon:bgh251f2 (fh)': [
      {
        src: namedGuideImage('fishermans-horizon', 'bgh251f2-bridge-boss.png'),
        alt: 'BGH251F2 bridge battle at Fisherman\'s Horizon',
        caption: 'BGH251F2 bridge battle',
        wide: true,
      },
    ],
    'd2-return-to-balamb:raijin (solo)': [
      {
        src: namedGuideImage('return-to-balamb', 'raijin-solo-confrontation.png'),
        alt: 'Raijin confrontation outside Balamb Hotel with Galbadian soldiers',
        caption: 'Raijin solo confrontation',
        wide: true,
      },
    ],
    'd2-return-to-balamb:raijin (with fujin)': [
      {
        src: namedGuideImage('return-to-balamb', 'fujin-raijin-hotel-battle.png'),
        alt: 'Fujin and Raijin battle at Balamb Hotel',
        caption: 'Fujin and Raijin hotel battle',
        wide: true,
      },
    ],
    'd2-return-to-balamb:fujin': [
      {
        src: namedGuideImage('return-to-balamb', 'fujin-raijin-hotel-battle.png'),
        alt: 'Fujin and Raijin battle at Balamb Hotel',
        caption: 'Fujin and Raijin hotel battle',
        wide: true,
      },
    ],
    'd2-battle-of-the-gardens:cerberus': [
      {
        src: namedGuideImage('battle-of-the-gardens', 'cerberus-main-hall-boss.png'),
        alt: 'Cerberus boss battle in Galbadia Garden main hall',
        caption: 'Cerberus main hall battle',
        wide: true,
      },
    ],
    'd2-battle-of-the-gardens:seifer (auditorium)': [
      {
        src: namedGuideImage('battle-of-the-gardens', 'seifer-auditorium-boss.png'),
        alt: 'Seifer boss battle in the Galbadia Garden auditorium',
        caption: 'Seifer auditorium battle',
        wide: true,
      },
    ],
    'd2-battle-of-the-gardens:seifer (with edea)': [
      {
        src: namedGuideImage('battle-of-the-gardens', 'edea-seifer-final-battle.png'),
        alt: 'Final Disc 2 Seifer and Edea battle',
        caption: 'Seifer and Edea final battle',
        wide: true,
      },
    ],
    'd2-battle-of-the-gardens:edea': [
      {
        src: namedGuideImage('battle-of-the-gardens', 'edea-seifer-final-battle.png'),
        alt: 'Final Disc 2 Edea battle after Seifer',
        caption: 'Edea final Disc 2 battle',
        wide: true,
      },
    ],
    'd3-journey-to-the-silent-country:abadon': [
      {
        src: namedGuideImage('journey-to-the-silent-country', 'abadon-boss.png'),
        alt: 'Abadon boss battle at Great Salt Lake',
        caption: 'Abadon boss battle',
        wide: true,
      },
    ],
    'd3-ragnarok:propagator': [
      {
        src: namedGuideImage('ragnarok', 'propagator-boss.png'),
        alt: 'Purple Propagator boss battle aboard the Ragnarok',
        caption: 'Propagator battle',
        wide: true,
      },
    ],
    'd3-ragnarok:jumbo cactuar': [
      {
        src: namedGuideImage('acquiring-cactuar', 'jumbo-cactuar-boss.png'),
        alt: 'Jumbo Cactuar boss battle on Cactuar Island',
        caption: 'Jumbo Cactuar battle',
        wide: true,
      },
    ],
    'd3-the-final-mission:fujin': [
      {
        src: namedGuideImage('the-final-mission', 'fujin-raijin-final-stand.png'),
        alt: 'Fujin and Raijin final stand in Lunatic Pandora',
        caption: 'Fujin and Raijin final stand',
        wide: true,
      },
    ],
    'd3-the-final-mission:raijin': [
      {
        src: namedGuideImage('the-final-mission', 'fujin-raijin-final-stand.png'),
        alt: 'Raijin and Fujin final stand in Lunatic Pandora',
        caption: 'Fujin and Raijin final stand',
        wide: true,
      },
    ],
    'd3-the-final-mission:mobile type 8': [
      {
        src: namedGuideImage('the-final-mission', 'mobile-type-8-boss.png'),
        alt: 'Mobile Type 8 boss battle in Lunatic Pandora',
        caption: 'Mobile Type 8 battle',
        wide: true,
      },
    ],
    'd3-the-final-mission:seifer': [
      {
        src: namedGuideImage('the-final-mission', 'seifer-lunatic-pandora.png'),
        alt: 'Seifer final Disc 3 battle in Lunatic Pandora',
        caption: 'Seifer final Disc 3 battle',
        wide: true,
      },
    ],
    'd4-the-awakening:adel': [
      {
        src: namedGuideImage('the-awakening', 'adel-rinoa-boss.png'),
        alt: 'Adel boss battle with Rinoa junctioned to Adel',
        caption: 'Adel and Rinoa battle',
        wide: true,
      },
    ],
    'd3-ragnarok:bahamut': [
      { src: namedGuideImage('deep-sea-research-center', 'bahamut-boss.png'), alt: 'Bahamut boss battle screenshot', caption: 'Bahamut boss battle', wide: true },
    ],
    'd3-ragnarok:ultima weapon': [
      { src: namedGuideImage('deep-sea-research-center', 'ultima-weapon-boss.png'), alt: 'Ultima Weapon boss battle in the Deep Sea Deposit', caption: 'Ultima Weapon battle', wide: true },
    ],
    'd2-exploring-the-world:tonberry king': [
      {
        src: namedGuideImage('centra-ruins', 'tonberry-king-boss.png'),
        alt: 'Tonberry King boss battle in the Centra Ruins',
        caption: 'Tonberry King battle',
        wide: true,
      },
    ],
    'd2-exploring-the-world:odin': [
      {
        src: namedGuideImage('centra-ruins', 'odin-boss.png'),
        alt: 'Odin boss battle in the Centra Ruins',
        caption: 'Odin battle',
        wide: true,
      },
    ],
    'd4-ultimecia-castle:sphinxaur': [
      { src: namedGuideImage('ultimecia-castle', 'sphinxaur-sphinxara-boss.png'), alt: 'Sphinxaur and Sphinxara boss battle screenshot', caption: 'Sphinxaur and Sphinxara boss battle', wide: true },
    ],
    'd4-ultimecia-castle:tri-point': [
      { src: namedGuideImage('ultimecia-castle', 'tri-point-boss.png'), alt: 'Tri-Point boss battle screenshot', caption: 'Tri-Point boss battle', wide: true },
    ],
    'd4-ultimecia-castle:trauma': [
      { src: namedGuideImage('ultimecia-castle', 'trauma-droma-boss.png'), alt: 'Trauma and Droma boss battle screenshot', caption: 'Trauma and Droma boss battle', wide: true },
    ],
    'd4-ultimecia-castle:red giant': [
      { src: namedGuideImage('ultimecia-castle', 'red-giant-boss.png'), alt: 'Red Giant boss battle screenshot', caption: 'Red Giant boss battle', wide: true },
    ],
    'd4-ultimecia-castle:krysta': [
      { src: namedGuideImage('ultimecia-castle', 'krysta-boss.png'), alt: 'Krysta boss battle screenshot', caption: 'Krysta boss battle', wide: true },
    ],
    'd4-ultimecia-castle:gargantua': [
      { src: namedGuideImage('ultimecia-castle', 'gargantua-boss.png'), alt: 'Gargantua boss battle screenshot', caption: 'Gargantua boss battle', wide: true },
    ],
    'd4-ultimecia-castle:catoblepas': [
      { src: namedGuideImage('ultimecia-castle', 'catoblepas-boss.png'), alt: 'Catoblepas boss battle screenshot', caption: 'Catoblepas boss battle', wide: true },
    ],
    'd4-ultimecia-castle:tiamat': [
      { src: namedGuideImage('ultimecia-castle', 'tiamat-boss.png'), alt: 'Tiamat boss battle screenshot', caption: 'Tiamat boss battle', wide: true },
    ],
    'd4-final-preparations:omega weapon': [
      {
        src: namedGuideImage('final-preparations', 'omega-weapon-boss.png'),
        alt: 'Omega Weapon battle in Ultimecia Castle Chapel',
        caption: 'Omega Weapon Chapel battle',
        wide: true,
      },
    ],
    'd4-the-final-battle:ultimecia': [
      {
        src: namedGuideImage('the-final-battle', 'ultimecia-first-form.png'),
        alt: 'Ultimecia first boss form in the clock room',
        caption: 'Ultimecia first form',
        wide: true,
      },
    ],
    'd4-the-final-battle:griever': [
      {
        src: namedGuideImage('the-final-battle', 'griever-boss.png'),
        alt: 'Griever boss phase on the final battle platform',
        caption: 'Griever boss phase',
        wide: true,
      },
    ],
    'd4-the-final-battle:ultimecia/griever': [
      {
        src: namedGuideImage('the-final-battle', 'ultimecia-griever-boss.png'),
        alt: 'Ultimecia junctioned to Griever boss phase',
        caption: 'Ultimecia junctioned to Griever',
        wide: true,
      },
    ],
    'd4-the-final-battle:ultimecia (final form)': [
      {
        src: namedGuideImage('the-final-battle', 'ultimecia-final-form.png'),
        alt: 'Ultimecia final form boss phase',
        caption: 'Ultimecia final form',
        wide: true,
      },
    ],
  }
  return imagesByBoss[key] ?? []
}

export function ContextualVisualAid({ chapterId, paragraphText }: InlineAidProps) {
  if (
    chapterId === 'd1-preparing-for-the-exam' &&
    hasCalloutTitle(paragraphText, 'Balamb Garden orientation')
  ) {
    return (
      <InlineImagePanel
        title="Balamb Garden Orientation"
        subtitle="Use this while learning the Garden hub layout before heading to the Front Gate."
        images={[
          {
            src: namedGuideImage('preparing-for-the-exam', 'balamb-garden-orientation.png'),
            alt: 'Balamb Garden facility orientation map',
            caption: 'Garden hub and facility spokes',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd1-the-seed-exam' &&
    hasCalloutTitle(paragraphText, 'Exam briefing')
  ) {
    return (
      <InlineImagePanel
        title="Exam Briefing"
        subtitle="Zell joins the active party as the Dollet field exam begins."
        images={[
          {
            src: namedGuideImage('the-seed-exam', 'zell-briefing.png'),
            alt: 'Zell during the SeeD exam briefing',
            caption: 'Zell joins the SeeD exam party',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd1-the-seed-exam' &&
    hasCalloutTitle(paragraphText, 'Exam scoring discipline')
  ) {
    return (
      <InlineImagePanel
        title="Vessel Briefing"
        subtitle="Choose the non-conversation option here, then follow Seifer's order to look outside."
        images={[
          {
            src: namedGuideImage('the-seed-exam', 'seifer-vessel-briefing.png'),
            alt: 'Seifer during the Dollet vessel briefing',
            caption: 'Seifer gives the vessel order',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd1-the-seed-exam' &&
    hasCalloutTitle(paragraphText, 'Tower battle setup')
  ) {
    return (
      <InlineImagePanel
        title="Communications Tower"
        subtitle="Biggs and Wedge open the tower battle before Elvoret interrupts."
        images={[
          {
            src: namedGuideImage('the-seed-exam', 'biggs-wedge-tower.png'),
            alt: 'Biggs and Wedge battle setup at the Dollet communications tower',
            caption: 'Biggs and Wedge before Elvoret',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd1-after-the-exam' &&
    hasCalloutTitle(paragraphText, 'SeeD score result')
  ) {
    return (
      <InlineImagePanel
        title="SeeD Score Results"
        subtitle="Use this as context for the score categories; exact scoring tables live in the reference page."
        images={[
          {
            src: namedGuideImage('after-the-exam', 'seed-score-results.png'),
            alt: 'SeeD exam score results screen',
            caption: 'SeeD score breakdown',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd1-the-timber-mission' &&
    hasCalloutTitle(paragraphText, 'Forest Owls train mission')
  ) {
    return (
      <InlineImagePanel
        title="Train Uncoupling Mission"
        subtitle="Use this as visual context for the timed roof and code-entry sequence."
        images={[
          {
            src: namedGuideImage('the-timber-mission', 'train-uncoupling.png'),
            alt: 'Forest Owls train uncoupling mission',
            caption: 'Timed train uncoupling sequence',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd1-the-timber-mission' &&
    hasCalloutTitle(paragraphText, 'TV broadcast scene')
  ) {
    return (
      <InlineImagePanel
        title="TV Broadcast"
        subtitle="Story visual for the broadcast sequence after the Pub route."
        images={[
          {
            src: namedGuideImage('the-timber-mission', 'edea-broadcast.png'),
            alt: 'Sorceress broadcast scene in Timber',
            caption: 'Timber broadcast reveal',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd1-dollet-exploration' &&
    hasCalloutTitle(paragraphText, 'Timber journalist trigger')
  ) {
    return (
      <InlineImagePanel
        title="Timber Journalist"
        subtitle="Return to this screen during the Dollet setup window to start the later Pet Nametag reward."
        images={[
          {
            src: namedGuideImage('dollet-exploration', 'timber-journalist-trigger.png'),
            alt: 'Timber journalist outside the Timber Maniacs building',
            caption: 'Journalist trigger outside Timber Maniacs',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd1-journey-to-galbadia-garden' &&
    hasCalloutTitle(paragraphText, 'Dragon Fang route')
  ) {
    return (
      <InlineImagePanel
        title="Yaulny Canyon Forest"
        subtitle="Use the cliff edges in this forest when looking for Grendel encounters."
        images={[
          {
            src: namedGuideImage('journey-to-galbadia-garden', 'yaulny-canyon-forest.png'),
            alt: 'Yaulny Canyon forest approach near Galbadia Garden',
            caption: 'Forest approach near Galbadia Garden',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd1-galbadia-garden' &&
    hasCalloutTitle(paragraphText, 'Galbadia Garden arrival')
  ) {
    return (
      <InlineImagePanel
        title="Galbadia Garden"
        subtitle="Arrival and first visit before the Deling City order."
        images={[
          {
            src: namedGuideImage('galbadia-garden', 'garden-arrival.png'),
            alt: 'Galbadia Garden exterior on arrival',
            caption: 'Galbadia Garden arrival',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd1-galbadia-garden' &&
    (hasCalloutTitle(paragraphText, 'Tomb route map') || hasCalloutTitle(paragraphText, 'To obtain the GF Brothers'))
  ) {
    return (
      <InlineImagePanel
        title="Tomb Route Reference"
        subtitle="Use this before committing to the Brothers route; the map is faster than translating the first-person turns in your head."
        images={[
          { src: namedGuideImage('tomb-of-the-unknown-king', 'tomb-route-map.png'), alt: 'Annotated Tomb of the Unknown King route map', caption: 'Route map: ID sword, Sacred, floodgate, drawbridge, and Brothers', wide: true },
        ]}
      />
    )
  }

  if (
    chapterId === 'd1-deling-city' &&
    hasCalloutTitle(paragraphText, 'Edea parade scene')
  ) {
    return (
      <InlineImagePanel
        title="Edea Parade Scene"
        subtitle="Story transition after Carbuncle is drawn and the clock tower route opens."
        images={[
          {
            src: namedGuideImage('deling-city', 'edea-parade.png'),
            alt: 'Edea during the Deling City parade sequence',
            caption: 'Edea parade scene',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd2-winhill' &&
    hasCalloutTitle(paragraphText, 'Disc 2 opening')
  ) {
    return (
      <InlineImagePanel
        title="Disc 2 Opening"
        subtitle="The transition into Laguna's Winhill dream."
        images={[
          {
            src: namedGuideImage('winhill', 'disc-2-opening.png'),
            alt: 'Disc 2 opening screen',
            caption: 'Disc 2 opening',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd2-the-escape' &&
    hasCalloutTitle(paragraphText, 'Irvine bridge scene')
  ) {
    return (
      <InlineImagePanel
        title="Irvine Bridge Scene"
        subtitle="Story visual for the crane and bridge escape sequence."
        images={[
          {
            src: namedGuideImage('the-escape', 'irvine-bridge-scene.png'),
            alt: 'Irvine during the D-District Prison bridge scene',
            caption: 'Irvine bridge scene',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd2-missile-base' &&
    hasCalloutTitle(paragraphText, 'Missile Base team')
  ) {
    return (
      <InlineImagePanel
        title="Missile Base Team"
        subtitle="Selphie leads the infiltration route while Squall's team races the missile launch."
        images={[
          {
            src: namedGuideImage('missile-base', 'selphie-missile-base-team.png'),
            alt: "Selphie during the Missile Base team transition",
            caption: "Selphie's Missile Base team",
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd2-exploring-the-world' &&
    hasCalloutTitle(paragraphText, 'Garden at sea')
  ) {
    return (
      <InlineImagePanel
        title="Garden At Sea"
        subtitle="The mobile Garden opens this optional cleanup route before returning to Balamb."
        images={[
          {
            src: namedGuideImage('exploring-the-world', 'garden-at-sea.png'),
            alt: 'Balamb Garden moving across the sea after the Garden Festival',
            caption: 'Garden at sea',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd2-exploring-the-world' &&
    paragraphText.includes('**Centra Ruins**')
  ) {
    return (
      <InlineImagePanel
        title="Centra Ruins Bosses"
        subtitle="Use these when deciding whether to clear Tonberry now and whether to delay Odin until later farming is done."
        images={[
          {
            src: namedGuideImage('centra-ruins', 'tonberry-king-boss.png'),
            alt: 'Tonberry King boss battle in the lower Centra Ruins',
            caption: 'Tonberry King GF battle',
            wide: true,
          },
          {
            src: namedGuideImage('centra-ruins', 'odin-boss.png'),
            alt: 'Odin boss battle in the upper Centra Ruins',
            caption: 'Odin timed battle',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd2-return-to-balamb' &&
    hasCalloutTitle(paragraphText, 'Balamb occupation')
  ) {
    return (
      <InlineImagePanel
        title="Balamb Occupation"
        subtitle="The town entrance cue before the hotel-owner and guard sequence."
        images={[
          {
            src: namedGuideImage('return-to-balamb', 'balamb-occupation-entry.png'),
            alt: 'Balamb Town under Galbadian occupation near the town entrance',
            caption: 'Balamb occupation entry',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd2-battle-of-the-gardens' &&
    hasCalloutTitle(paragraphText, 'Battle preparations')
  ) {
    return (
      <InlineImagePanel
        title="Battle Monitor"
        subtitle="The Garden battle begins with Squall issuing defense orders from the bridge."
        images={[
          {
            src: namedGuideImage('battle-of-the-gardens', 'balamb-garden-battle-monitor.png'),
            alt: 'Balamb Garden battle monitor during the Garden clash',
            caption: 'Battle monitor',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd2-battle-of-the-gardens' &&
    hasCalloutTitle(paragraphText, 'Defending the Garden')
  ) {
    return (
      <InlineImagePanel
        title="Garden Collision"
        subtitle="Story transition before Squall enters Galbadia Garden."
        images={[
          {
            src: namedGuideImage('battle-of-the-gardens', 'garden-collision-approach.png'),
            alt: 'Galbadia Garden approaching through the trees during the Garden battle',
            caption: 'Garden collision approach',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd3-trabia-canyon' &&
    hasCalloutTitle(paragraphText, 'Laguna film scene')
  ) {
    return (
      <InlineImagePanel
        title="Laguna Film Scene"
        subtitle="The dream sequence starts with Laguna's movie shoot before the fixed Ruby Dragon encounter."
        images={[
          {
            src: namedGuideImage('trabia-canyon', 'laguna-film-scene.png'),
            alt: 'Laguna during the Trabia Canyon film scene',
            caption: 'Laguna film scene',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd3-picking-up-the-trail' &&
    hasCalloutTitle(paragraphText, 'White SeeD Ship location')
  ) {
    return (
      <InlineImagePanel
        title="White SeeD Ship Location"
        subtitle="Use this map cue while searching the Centra inlets around Edea's House."
        images={[
          {
            src: namedGuideImage('picking-up-the-trail', 'white-seed-ship-location.png'),
            alt: 'World map location for the White SeeD Ship near Edea\'s House',
            caption: 'White SeeD Ship location',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd3-esthar' &&
    hasCalloutTitle(paragraphText, 'Esthar City Map')
  ) {
    return (
      <InlineImagePanel
        title="Esthar City Map"
        subtitle="Use this while routing Odine, Occult Fan IV, the mall, and later quest markers."
        images={[
          {
            src: namedGuideImage('esthar', 'esthar-city-map.png'),
            alt: 'Annotated Esthar city map with palace, airstation, shopping mall, Odine lab, and quest markers',
            caption: 'Esthar city map',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd3-siege-of-esthar' &&
    hasCalloutTitle(paragraphText, 'Timed Contact Points')
  ) {
    return (
      <InlineImagePanel
        title="Timed Contact Points"
        subtitle="Use this while routing the three yellow interception spots during the Esthar timer."
        images={[
          {
            src: namedGuideImage('siege-of-esthar', 'esthar-city-contact-points.png'),
            alt: 'Annotated Esthar city map with the three timed Lunatic Pandora contact points',
            caption: 'Yellow Spot #1, #2, and #3 interception route',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd3-siege-of-esthar' &&
    hasCalloutTitle(paragraphText, 'Lunatic Pandora Arrival')
  ) {
    return (
      <InlineImagePanel
        title="Lunatic Pandora Arrival"
        subtitle="Approach the structure on-screen and clear the forced soldier battle before that contact window closes."
        images={[
          {
            src: namedGuideImage('siege-of-esthar', 'lunatic-pandora-arrival.png'),
            alt: 'Lunatic Pandora arriving over the Esthar region',
            caption: 'Lunatic Pandora boarding cue',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd3-back-on-earth' &&
    hasCalloutTitle(paragraphText, 'Sorceress Memorial Location')
  ) {
    return (
      <InlineImagePanel
        title="Sorceress Memorial Location"
        subtitle="World-map cue for the peninsula east of Esthar where Rinoa returns to the party."
        images={[
          {
            src: namedGuideImage('back-on-earth', 'sorceress-memorial-location.png'),
            alt: 'World map location of the Sorceress Memorial on the peninsula east of Esthar',
            caption: 'Sorceress Memorial peninsula',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd2-the-garden-festival' &&
    (paragraphText.includes('**Chocobo Forests**') || hasCalloutTitle(paragraphText, 'Chocobo Forests'))
  ) {
    return <ChocoboForestSolver />
  }

  if (
    chapterId === 'd3-ragnarok' &&
    (hasCalloutTitle(paragraphText, 'Deep Sea Research Center') || hasCalloutTitle(paragraphText, 'Bahamut'))
  ) {
    return (
      <InlineImagePanel
        title="Deep Sea Research Center Entry"
        subtitle="Use these while locating the facility, approaching the flashing core for Bahamut, and descending for Ultima Weapon."
        images={[
          { src: namedGuideImage('deep-sea-research-center', 'world-map-location.png'), alt: 'Deep Sea Research Center world map location', caption: 'World map location' },
          { src: namedGuideImage('deep-sea-research-center', 'ultima-weapon-boss.png'), alt: 'Ultima Weapon boss battle in the Deep Sea Deposit', caption: 'Ultima Weapon battle', wide: true },
        ]}
      />
    )
  }

  if (
    chapterId === 'd3-ragnarok' &&
    (paragraphText.includes('**DSRC draw points and hidden save point**') || hasCalloutTitle(paragraphText, 'DSRC draw points and hidden save point'))
  ) {
    return null
  }

  if (
    chapterId === 'd3-ragnarok' &&
    hasCalloutTitle(paragraphText, 'PuPu Sidequest')
  ) {
    return (
      <InlineImagePanel
        title="PuPu UFO Route"
        subtitle="Use these for the four UFO sightings and the Grandidi Forest UFO battle; the later Balamb crater PuPu encounter is text-only here."
        images={[
          { src: namedGuideImage('pupu', 'winhill-bluffs-ufo.png'), alt: 'Winhill Bluffs UFO sighting location', caption: 'Winhill Bluffs' },
          { src: namedGuideImage('pupu', 'mandy-beach-ufo.png'), alt: 'Mandy Beach UFO sighting location', caption: 'Mandy Beach' },
          { src: namedGuideImage('pupu', 'heath-peninsula-ufo.png'), alt: 'Heath Peninsula UFO sighting location', caption: 'Heath Peninsula' },
          { src: namedGuideImage('pupu', 'kashkabald-desert-ufo.png'), alt: 'Kashkabald Desert UFO sighting location', caption: 'Kashkabald Desert' },
          { src: namedGuideImage('pupu', 'grandidi-forest-ufo-battle.png'), alt: 'Grandidi Forest canyon UFO battle location', caption: 'Grandidi Forest canyon UFO battle' },
        ]}
      />
    )
  }

  if (
    chapterId === 'd3-ragnarok' &&
    hasCalloutTitle(paragraphText, 'Obel Lake Quest')
  ) {
    return (
      <InlineImagePanel
        title="Obel Lake Clue Locations"
        subtitle="Use this while collecting the clue rocks, then finish at Mordred Plains and Minde Isle."
        images={[
          { src: namedGuideImage('obel-lake', 'obel-lake-shadow-start.png'), alt: 'Obel Lake shadow starting location', caption: 'Obel Lake shadow start' },
          { src: namedGuideImage('obel-lake', 'eldbeak-peninsula-clue.png'), alt: 'Eldbeak Peninsula clue location', caption: 'Eldbeak Peninsula' },
          { src: namedGuideImage('obel-lake', 'mandy-beach-clue.png'), alt: 'Mandy Beach clue location', caption: 'Mandy Beach clue' },
          { src: namedGuideImage('obel-lake', 'balamb-beach-clue.png'), alt: 'Balamb Beach clue location', caption: 'Balamb Beach clue' },
          { src: namedGuideImage('obel-lake', 'monterose-plateau-clue.png'), alt: 'Monterose Plateau clue location', caption: 'Monterose Plateau' },
          { src: namedGuideImage('obel-lake', 'mordred-plains-three-stars.png'), alt: 'Mordred Plains Three Stars location', caption: 'Mordred Plains Three Stars' },
          { src: namedGuideImage('obel-lake', 'minde-island-luck-j-scroll.png'), alt: 'Minde Island Luck-J Scroll location', caption: 'Minde Island Luck-J Scroll' },
        ]}
      />
    )
  }

  if (chapterId === 'd4-ultimecia-castle') {
    if (paragraphText.includes("Inside **Ultimecia's Castle**")) {
      return (
        <InlineImagePanel
          title="Castle Entry"
          subtitle="Orient yourself before the first guardian and party-switch routing starts."
          images={[
            { src: namedGuideImage('ultimecia-castle', 'castle-exterior-entry.png'), alt: 'Ultimecia Castle exterior view', caption: 'Castle exterior and entry', wide: true },
          ]}
        />
      )
    }
    if (paragraphText.includes('**Unlock Resurrection.**')) {
      return (
        <InlineImagePanel
          title="Treasure Vault"
          subtitle="Grab the fountain key, then solve the four-coffin puzzle before fighting Catoblepas."
          images={[
            { src: namedGuideImage('ultimecia-castle', 'treasure-vault-key-pickup.png'), alt: 'Treasure Vault Key pickup beside the fountain', caption: 'Treasure Vault Key pickup' },
            { src: namedGuideImage('ultimecia-castle', 'treasure-vault-coffin-puzzle.png'), alt: 'Four-coffin treasure vault puzzle reference', caption: 'Four-coffin puzzle order' },
          ]}
        />
      )
    }
  }

  if (
    chapterId === 'd4-final-preparations' &&
    hasCalloutTitle(paragraphText, 'Final overworld access')
  ) {
    return (
      <InlineImagePanel
        title="Ragnarok Final Cleanup"
        subtitle="Use the airship and compressed-time world map access for the last optional cleanup before the ending."
        images={[
          {
            src: namedGuideImage('final-preparations', 'ragnarok-final-preparations.png'),
            alt: 'Ragnarok flying over the compressed-time world map',
            caption: 'Ragnarok final-prep access',
            wide: true,
          },
        ]}
      />
    )
  }

  if (
    chapterId === 'd4-the-final-battle' &&
    hasCalloutTitle(paragraphText, 'Ending')
  ) {
    return (
      <InlineImagePanel
        title="Ending"
        subtitle="Final-scene visuals after the last battle is cleared."
        images={[
          {
            src: namedGuideImage('the-final-battle', 'ending-squall.png'),
            alt: 'Squall in the ending cinematic',
            caption: 'Ending scene',
            wide: true,
          },
          {
            src: namedGuideImage('the-final-battle', 'the-end-title.png'),
            alt: 'The End title card for Final Fantasy VIII',
            caption: 'The End',
            wide: true,
          },
        ]}
      />
    )
  }

  return null
}

const CHOCOBO_FORESTS = [
  {
    id: 'beginner',
    label: 'Beginner',
    reward: 'Aura Stone',
    images: [
      { src: namedGuideImage('chocobo-forests', 'beginner-location-solution.png'), alt: 'Beginner Forest location and solution table', caption: 'Location and solution', wide: true },
      { src: namedGuideImage('chocobo-forests', 'beginner-solution-point.png'), alt: 'Beginner Forest solution point detail', caption: 'Solution point' },
      { src: namedGuideImage('chocobo-forests', 'beginner-treasure-point.png'), alt: 'Beginner Forest treasure point detail', caption: 'Treasure point' },
    ],
  },
  {
    id: 'basics',
    label: 'Basics Snowfield',
    reward: 'Flare Stone',
    images: [
      { src: namedGuideImage('chocobo-forests', 'basics-location-solution.png'), alt: 'Basics Snowfield location and solution table', caption: 'Location and solution', wide: true },
      { src: namedGuideImage('chocobo-forests', 'basics-solution-point-1.png'), alt: 'Basics Snowfield solution point one', caption: 'Point 1' },
      { src: namedGuideImage('chocobo-forests', 'basics-solution-point-2.png'), alt: 'Basics Snowfield solution point two', caption: 'Point 2' },
      { src: namedGuideImage('chocobo-forests', 'basics-treasure-point.png'), alt: 'Basics Snowfield treasure point', caption: 'Treasure point' },
    ],
  },
  {
    id: 'roaming',
    label: 'Roaming',
    reward: 'Shell Stone + Holy Stone',
    images: [
      { src: namedGuideImage('chocobo-forests', 'roaming-location-solution.png'), alt: 'Roaming Forest location and solution table', caption: 'Location and solution', wide: true },
      { src: namedGuideImage('chocobo-forests', 'roaming-solution-point-1.png'), alt: 'Roaming Forest solution point one', caption: 'Point 1' },
      { src: namedGuideImage('chocobo-forests', 'roaming-solution-point-2.png'), alt: 'Roaming Forest solution point two', caption: 'Point 2' },
      { src: namedGuideImage('chocobo-forests', 'roaming-solution-point-3.png'), alt: 'Roaming Forest solution point three', caption: 'Point 3' },
      { src: namedGuideImage('chocobo-forests', 'roaming-solution-point-4.png'), alt: 'Roaming Forest solution point four', caption: 'Point 4' },
      { src: namedGuideImage('chocobo-forests', 'roaming-treasure-point.png'), alt: 'Roaming Forest treasure point', caption: 'Treasure point' },
    ],
  },
  {
    id: 'solitude',
    label: 'Solitude',
    reward: 'Protect Stone + Meteor Stone',
    images: [
      { src: namedGuideImage('chocobo-forests', 'solitude-location-solution.png'), alt: 'Forest of Solitude location and solution table', caption: 'Location and solution', wide: true },
      { src: namedGuideImage('chocobo-forests', 'solitude-solution-point.png'), alt: 'Forest of Solitude solution point', caption: 'Solution point' },
      { src: namedGuideImage('chocobo-forests', 'solitude-treasure-point.png'), alt: 'Forest of Solitude treasure point', caption: 'Treasure point' },
    ],
  },
  {
    id: 'fun',
    label: 'Fun',
    reward: 'Meteor Stone + Flare Stone + Ultima Stone',
    images: [
      { src: namedGuideImage('chocobo-forests', 'fun-location-solution.png'), alt: 'Forest of Fun location and solution table', caption: 'Location and solution', wide: true },
      { src: namedGuideImage('chocobo-forests', 'fun-solution-point-1.png'), alt: 'Forest of Fun solution point one', caption: 'Point 1' },
      { src: namedGuideImage('chocobo-forests', 'fun-solution-point-2.png'), alt: 'Forest of Fun solution point two', caption: 'Point 2' },
      { src: namedGuideImage('chocobo-forests', 'fun-solution-point-3.png'), alt: 'Forest of Fun solution point three', caption: 'Point 3' },
      { src: namedGuideImage('chocobo-forests', 'fun-solution-point-4.png'), alt: 'Forest of Fun solution point four', caption: 'Point 4' },
      { src: namedGuideImage('chocobo-forests', 'fun-treasure-point.png'), alt: 'Forest of Fun treasure point', caption: 'Treasure point' },
    ],
  },
  {
    id: 'enclosed',
    label: 'Enclosed',
    reward: 'Meteor Stone + Holy Stone + Ultima Stone',
    images: [
      { src: namedGuideImage('chocobo-forests', 'enclosed-location-solution.png'), alt: 'Enclosed Forest location and solution table', caption: 'Location and solution', wide: true },
      { src: namedGuideImage('chocobo-forests', 'enclosed-solution-point-1.png'), alt: 'Enclosed Forest solution point one', caption: 'Point 1' },
      { src: namedGuideImage('chocobo-forests', 'enclosed-solution-point-2.png'), alt: 'Enclosed Forest solution point two', caption: 'Point 2' },
      { src: namedGuideImage('chocobo-forests', 'enclosed-solution-point-3.png'), alt: 'Enclosed Forest solution point three', caption: 'Point 3' },
      { src: namedGuideImage('chocobo-forests', 'enclosed-solution-point-4.png'), alt: 'Enclosed Forest solution point four', caption: 'Point 4' },
      { src: namedGuideImage('chocobo-forests', 'enclosed-solution-point-5.png'), alt: 'Enclosed Forest solution point five', caption: 'Point 5' },
      { src: namedGuideImage('chocobo-forests', 'enclosed-treasure-point.png'), alt: 'Enclosed Forest treasure point', caption: 'Treasure point' },
    ],
  },
  {
    id: 'sanctuary',
    label: 'Sanctuary',
    reward: 'Chicobo Card',
    images: [
      { src: namedGuideImage('chocobo-forests', 'chocobo-sanctuary.png'), alt: 'Chocobo Sanctuary screenshot', caption: 'Chocobo Sanctuary', wide: true },
    ],
  },
]

function ChocoboForestSolver() {
  const [activeId, setActiveId] = useState(CHOCOBO_FORESTS[0].id)
  const active = CHOCOBO_FORESTS.find(f => f.id === activeId) ?? CHOCOBO_FORESTS[0]

  return (
    <div className="rounded-xl border border-cyan-800/40 bg-slate-900/55 overflow-hidden">
      <div className="px-4 py-3 border-b border-cyan-900/35 bg-cyan-950/15">
        <div className="flex items-center gap-2">
          <Images size={13} className="text-cyan-300" />
          <h3 className="text-sm font-semibold text-slate-100">Chocobo Forest Solver</h3>
          <span className="ml-auto text-[10px] font-mono text-amber-300">{active.reward}</span>
        </div>
        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
          {CHOCOBO_FORESTS.map(forest => (
            <button
              key={forest.id}
              onClick={() => setActiveId(forest.id)}
              className={cn(
                'shrink-0 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors',
                forest.id === active.id
                  ? 'border-cyan-400/70 bg-cyan-400/15 text-cyan-100'
                  : 'border-slate-700/50 bg-slate-950/40 text-slate-400 hover:border-slate-500 hover:text-slate-200'
              )}
            >
              {forest.label}
            </button>
          ))}
        </div>
      </div>
      <ImageGrid images={active.images} />
    </div>
  )
}

function InlineImagePanel({ title, subtitle, images }: { title: string; subtitle: string; images: GuideImage[] }) {
  return (
    <div className="rounded-xl border border-cyan-800/40 bg-slate-900/55 overflow-hidden">
      <div className="px-4 py-3 border-b border-cyan-900/35 bg-cyan-950/15">
        <div className="flex items-center gap-2">
          <Images size={13} className="text-cyan-300" />
          <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
          <span className="ml-auto text-[10px] font-mono text-slate-500">
            {images.length} {images.length === 1 ? 'image' : 'images'}
          </span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-slate-400">{subtitle}</p>
      </div>
      <ImageGrid images={images} />
    </div>
  )
}

export function ImageGrid({ images }: { images: GuideImage[] }) {
  return (
    <div className="grid gap-3 p-3 sm:grid-cols-2 2xl:grid-cols-3">
      {images.map(image => (
        <figure
          key={image.src}
          className={cn(
            'overflow-hidden rounded-lg border border-slate-700/45 bg-slate-950/50',
            image.wide && 'sm:col-span-2 2xl:col-span-2'
          )}
        >
          <a href={image.src} target="_blank" rel="noreferrer" className="group block">
            <div className="relative bg-slate-950">
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="max-h-[46vh] w-full object-contain sm:max-h-[520px]"
              />
              <div className="pointer-events-none absolute right-2 top-2 rounded-md border border-slate-600/50 bg-slate-950/70 p-1.5 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100">
                <Maximize2 size={12} />
              </div>
            </div>
            <figcaption className="border-t border-slate-800/70 px-3 py-2 text-xs font-medium text-slate-300">
              {image.caption}
            </figcaption>
          </a>
        </figure>
      ))}
    </div>
  )
}

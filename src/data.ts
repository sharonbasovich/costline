export type Quality =
  | { kind: 'cmhc'; letter: 'a' | 'b' | 'c' | 'd' }
  | { kind: 'official' }
  | { kind: 'estimate' }

export interface Figure {
  value: number
  quality: Quality
  sourceId: SourceId
  note?: string
}

export type SourceId =
  | 'cmhc-rms-oct2025'
  | 'mphec-2025-26'
  | 'univ-col-estimates'
  | 'transit-fares'
  | 'mun-tuition'

export interface Source {
  label: string
  url: string
  date: string
}

export const SOURCES: Record<SourceId, Source> = {
  'cmhc-rms-oct2025': {
    label:
      'CMHC Rental Market Survey, October 2025 — average purpose-built rents',
    url: 'https://www03.cmhc-schl.gc.ca/hmip-pimh/en/TableMapChart',
    date: '2025 survey (released Jan 2026)',
  },
  'mphec-2025-26': {
    label:
      'Maritime Provinces Higher Education Commission — Table A: Undergraduate Tuition 2025-2026',
    url: 'https://mphec.ca/media/238756/table-a_tuition-undergraduate-2025-2026.pdf',
    date: '2025-26 academic year',
  },
  'mun-tuition': {
    label: 'Memorial University — Undergraduate tuition & fee framework',
    url: 'https://mun.ca/undergrad/money-matters/new-tuition-framework/',
    date: '2025-26 academic year',
  },
  'transit-fares': {
    label:
      'Published transit authority fare pages (Halifax Transit UPass, Fredericton Transit U-Pass, Codiac Transpo, Metrobus, T3 Transit)',
    url: 'https://www.halifax.ca/transportation/halifax-transit/transit-programs-services/upass-program',
    date: 'checked Sep 2026',
  },
  'univ-col-estimates': {
    label:
      'Modeled estimate — university-published cost-of-living guides (Dalhousie, UNB, MUN, UPEI)',
    url: 'https://www.dal.ca/admissions/money_matters.html',
    date: '±15% band; adjust in the Budget tool',
  },
}

export interface Campus {
  name: string
  short: string
  tuitionArts: Figure
  tuitionSci?: Figure
  tuitionNote?: string
}

export type RentKind = 'bachelor' | 'oneBed' | 'twoBed' | 'sharedRoom'

export interface City {
  id: string
  name: string
  province: string
  x: number
  y: number
  rent: Record<RentKind, Figure> & { vacancyPct?: Figure }
  transitMonthly: Figure
  transitNote: string
  groceriesMonthly: Figure
  utilitiesMonthly: Figure
  campuses: Campus[]
}

const CMHC = 'cmhc-rms-oct2025' as const
const MPHEC = 'mphec-2025-26' as const
const EST = 'univ-col-estimates' as const
const TRANSIT = 'transit-fares' as const
const MUN = 'mun-tuition' as const

export const CITIES: City[] = [
  {
    id: 'halifax',
    name: 'Halifax',
    province: 'NS',
    x: 56,
    y: 76,
    rent: {
      bachelor: { value: 1362, quality: { kind: 'cmhc', letter: 'a' }, sourceId: CMHC },
      oneBed: { value: 1539, quality: { kind: 'cmhc', letter: 'a' }, sourceId: CMHC },
      twoBed: { value: 1828, quality: { kind: 'cmhc', letter: 'a' }, sourceId: CMHC },
      sharedRoom: {
        value: 914,
        quality: { kind: 'estimate' },
        sourceId: EST,
        note: '2-bed split 2 ways',
      },
      vacancyPct: { value: 2.1, quality: { kind: 'official' }, sourceId: CMHC },
    },
    transitMonthly: { value: 22.24, quality: { kind: 'official' }, sourceId: TRANSIT },
    transitNote:
      'Halifax Transit UPass $177.93/yr (Sep–Apr), included in mandatory student fees at Dal, SMU, MSVU, NSCAD, NSCC — shown prorated over the 8-month academic year',
    groceriesMonthly: { value: 370, quality: { kind: 'estimate' }, sourceId: EST },
    utilitiesMonthly: { value: 150, quality: { kind: 'estimate' }, sourceId: EST },
    campuses: [
      {
        name: 'Dalhousie University',
        short: 'Dalhousie',
        tuitionArts: { value: 9030, quality: { kind: 'official' }, sourceId: MPHEC },
        tuitionSci: { value: 10245, quality: { kind: 'official' }, sourceId: MPHEC },
        tuitionNote: 'NS resident rate; out-of-province may be higher',
      },
      {
        name: "Saint Mary's University",
        short: 'SMU',
        tuitionArts: { value: 9070, quality: { kind: 'official' }, sourceId: MPHEC },
        tuitionSci: { value: 9750, quality: { kind: 'official' }, sourceId: MPHEC },
      },
      {
        name: 'Mount Saint Vincent University',
        short: 'MSVU',
        tuitionArts: { value: 9106, quality: { kind: 'official' }, sourceId: MPHEC },
        tuitionSci: { value: 9558, quality: { kind: 'official' }, sourceId: MPHEC },
      },
      {
        name: 'NSCAD University',
        short: 'NSCAD',
        tuitionArts: { value: 9772, quality: { kind: 'official' }, sourceId: MPHEC },
      },
    ],
  },
  {
    id: 'sydney',
    name: 'Sydney',
    province: 'NS',
    x: 84,
    y: 42,
    rent: {
      bachelor: { value: 830, quality: { kind: 'cmhc', letter: 'a' }, sourceId: CMHC },
      oneBed: { value: 840, quality: { kind: 'cmhc', letter: 'b' }, sourceId: CMHC },
      twoBed: { value: 1134, quality: { kind: 'cmhc', letter: 'a' }, sourceId: CMHC },
      sharedRoom: {
        value: 567,
        quality: { kind: 'estimate' },
        sourceId: EST,
        note: '2-bed split 2 ways',
      },
      vacancyPct: undefined,
    },
    transitMonthly: { value: 75, quality: { kind: 'estimate' }, sourceId: TRANSIT },
    transitNote:
      'CBRM Transit — limited coverage; many CBU students live near campus',
    groceriesMonthly: { value: 340, quality: { kind: 'estimate' }, sourceId: EST },
    utilitiesMonthly: {
      value: 160,
      quality: { kind: 'estimate' },
      sourceId: EST,
      note: 'older housing stock, winter heat',
    },
    campuses: [
      {
        name: 'Cape Breton University',
        short: 'CBU',
        tuitionArts: { value: 9225, quality: { kind: 'official' }, sourceId: MPHEC },
        tuitionSci: { value: 9225, quality: { kind: 'official' }, sourceId: MPHEC },
      },
    ],
  },
  {
    id: 'wolfville',
    name: 'Wolfville',
    province: 'NS',
    x: 47,
    y: 70,
    rent: {
      bachelor: {
        value: 667,
        quality: { kind: 'cmhc', letter: 'b' },
        sourceId: CMHC,
        note: 'nearest surveyed market: Kentville',
      },
      oneBed: {
        value: 1044,
        quality: { kind: 'cmhc', letter: 'b' },
        sourceId: CMHC,
        note: 'nearest surveyed market: Kentville',
      },
      twoBed: {
        value: 1128,
        quality: { kind: 'cmhc', letter: 'a' },
        sourceId: CMHC,
        note: 'nearest surveyed market: Kentville',
      },
      sharedRoom: { value: 564, quality: { kind: 'estimate' }, sourceId: EST },
      vacancyPct: undefined,
    },
    transitMonthly: { value: 0, quality: { kind: 'official' }, sourceId: TRANSIT },
    transitNote:
      'Walkable town; Kings Transit regional bus exists but most students walk',
    groceriesMonthly: { value: 350, quality: { kind: 'estimate' }, sourceId: EST },
    utilitiesMonthly: { value: 140, quality: { kind: 'estimate' }, sourceId: EST },
    campuses: [
      {
        name: 'Acadia University',
        short: 'Acadia',
        tuitionArts: { value: 10255, quality: { kind: 'official' }, sourceId: MPHEC },
        tuitionSci: { value: 10255, quality: { kind: 'official' }, sourceId: MPHEC },
      },
    ],
  },
  {
    id: 'antigonish',
    name: 'Antigonish',
    province: 'NS',
    x: 68,
    y: 52,
    rent: {
      bachelor: {
        value: 650,
        quality: { kind: 'estimate' },
        sourceId: EST,
        note: 'no CMHC survey; town estimate',
      },
      oneBed: {
        value: 950,
        quality: { kind: 'estimate' },
        sourceId: EST,
        note: 'no CMHC survey; town estimate',
      },
      twoBed: {
        value: 1200,
        quality: { kind: 'estimate' },
        sourceId: EST,
        note: 'no CMHC survey; town estimate',
      },
      sharedRoom: { value: 600, quality: { kind: 'estimate' }, sourceId: EST },
      vacancyPct: undefined,
    },
    transitMonthly: { value: 0, quality: { kind: 'official' }, sourceId: TRANSIT },
    transitNote: 'Walkable town — no municipal transit needed for campus life',
    groceriesMonthly: { value: 350, quality: { kind: 'estimate' }, sourceId: EST },
    utilitiesMonthly: { value: 140, quality: { kind: 'estimate' }, sourceId: EST },
    campuses: [
      {
        name: 'St. Francis Xavier University',
        short: 'StFX',
        tuitionArts: { value: 10135, quality: { kind: 'official' }, sourceId: MPHEC },
        tuitionSci: { value: 10135, quality: { kind: 'official' }, sourceId: MPHEC },
      },
    ],
  },
  {
    id: 'fredericton',
    name: 'Fredericton',
    province: 'NB',
    x: 30,
    y: 58,
    rent: {
      bachelor: { value: 1011, quality: { kind: 'cmhc', letter: 'a' }, sourceId: CMHC },
      oneBed: { value: 1140, quality: { kind: 'cmhc', letter: 'a' }, sourceId: CMHC },
      twoBed: { value: 1354, quality: { kind: 'cmhc', letter: 'a' }, sourceId: CMHC },
      sharedRoom: {
        value: 677,
        quality: { kind: 'estimate' },
        sourceId: EST,
        note: '2-bed split 2 ways',
      },
      vacancyPct: { value: 2.5, quality: { kind: 'official' }, sourceId: CMHC },
    },
    transitMonthly: { value: 22.5, quality: { kind: 'official' }, sourceId: TRANSIT },
    transitNote:
      'U-Pass: UNB $180/yr (mandatory for international students, opt-in for domestic); STU $165/yr mandatory — shown prorated over the 8-month academic year',
    groceriesMonthly: { value: 340, quality: { kind: 'estimate' }, sourceId: EST },
    utilitiesMonthly: { value: 145, quality: { kind: 'estimate' }, sourceId: EST },
    campuses: [
      {
        name: 'University of New Brunswick',
        short: 'UNB',
        tuitionArts: { value: 8908, quality: { kind: 'official' }, sourceId: MPHEC },
        tuitionSci: { value: 8951, quality: { kind: 'official' }, sourceId: MPHEC },
      },
      {
        name: 'St. Thomas University',
        short: 'STU',
        tuitionArts: { value: 8869, quality: { kind: 'official' }, sourceId: MPHEC },
        tuitionNote: 'Arts only',
      },
    ],
  },
  {
    id: 'saintjohn',
    name: 'Saint John',
    province: 'NB',
    x: 32,
    y: 80,
    rent: {
      bachelor: { value: 788, quality: { kind: 'cmhc', letter: 'a' }, sourceId: CMHC },
      oneBed: { value: 982, quality: { kind: 'cmhc', letter: 'a' }, sourceId: CMHC },
      twoBed: { value: 1229, quality: { kind: 'cmhc', letter: 'a' }, sourceId: CMHC },
      sharedRoom: {
        value: 615,
        quality: { kind: 'estimate' },
        sourceId: EST,
        note: '2-bed split 2 ways',
      },
      vacancyPct: undefined,
    },
    transitMonthly: { value: 80, quality: { kind: 'estimate' }, sourceId: TRANSIT },
    transitNote: 'Saint John Transit monthly pass; UNB SJ campus on bus routes',
    groceriesMonthly: { value: 330, quality: { kind: 'estimate' }, sourceId: EST },
    utilitiesMonthly: { value: 150, quality: { kind: 'estimate' }, sourceId: EST },
    campuses: [
      {
        name: 'UNB Saint John',
        short: 'UNB SJ',
        tuitionArts: { value: 8908, quality: { kind: 'official' }, sourceId: MPHEC },
        tuitionSci: { value: 8951, quality: { kind: 'official' }, sourceId: MPHEC },
      },
    ],
  },
  {
    id: 'moncton',
    name: 'Moncton',
    province: 'NB',
    x: 40,
    y: 48,
    rent: {
      bachelor: { value: 1028, quality: { kind: 'cmhc', letter: 'a' }, sourceId: CMHC },
      oneBed: { value: 1164, quality: { kind: 'cmhc', letter: 'a' }, sourceId: CMHC },
      twoBed: { value: 1452, quality: { kind: 'cmhc', letter: 'a' }, sourceId: CMHC },
      sharedRoom: {
        value: 726,
        quality: { kind: 'estimate' },
        sourceId: EST,
        note: '2-bed split 2 ways',
      },
      vacancyPct: undefined,
    },
    transitMonthly: { value: 80, quality: { kind: 'estimate' }, sourceId: TRANSIT },
    transitNote: 'Codiac Transpo monthly pass; UdeM campus accessible by bus',
    groceriesMonthly: { value: 335, quality: { kind: 'estimate' }, sourceId: EST },
    utilitiesMonthly: { value: 140, quality: { kind: 'estimate' }, sourceId: EST },
    campuses: [
      {
        name: 'Université de Moncton',
        short: 'UdeM',
        tuitionArts: { value: 8270, quality: { kind: 'official' }, sourceId: MPHEC },
        tuitionSci: { value: 8270, quality: { kind: 'official' }, sourceId: MPHEC },
      },
    ],
  },
  {
    id: 'sackville',
    name: 'Sackville',
    province: 'NB',
    x: 48,
    y: 55,
    rent: {
      bachelor: {
        value: 640,
        quality: { kind: 'estimate' },
        sourceId: EST,
        note: 'no CMHC survey; town estimate',
      },
      oneBed: {
        value: 900,
        quality: { kind: 'estimate' },
        sourceId: EST,
        note: 'no CMHC survey; town estimate',
      },
      twoBed: {
        value: 1150,
        quality: { kind: 'estimate' },
        sourceId: EST,
        note: 'no CMHC survey; town estimate',
      },
      sharedRoom: { value: 575, quality: { kind: 'estimate' }, sourceId: EST },
      vacancyPct: undefined,
    },
    transitMonthly: { value: 0, quality: { kind: 'official' }, sourceId: TRANSIT },
    transitNote: 'Walkable town — no transit needed',
    groceriesMonthly: { value: 340, quality: { kind: 'estimate' }, sourceId: EST },
    utilitiesMonthly: { value: 140, quality: { kind: 'estimate' }, sourceId: EST },
    campuses: [
      {
        name: 'Mount Allison University',
        short: 'MtA',
        tuitionArts: { value: 10800, quality: { kind: 'official' }, sourceId: MPHEC },
        tuitionSci: { value: 10800, quality: { kind: 'official' }, sourceId: MPHEC },
      },
    ],
  },
  {
    id: 'stjohns',
    name: "St. John's",
    province: 'NL',
    x: 90,
    y: 12,
    rent: {
      bachelor: { value: 945, quality: { kind: 'cmhc', letter: 'a' }, sourceId: CMHC },
      oneBed: { value: 1064, quality: { kind: 'cmhc', letter: 'b' }, sourceId: CMHC },
      twoBed: { value: 1348, quality: { kind: 'cmhc', letter: 'b' }, sourceId: CMHC },
      sharedRoom: {
        value: 674,
        quality: { kind: 'estimate' },
        sourceId: EST,
        note: '2-bed split 2 ways',
      },
      vacancyPct: undefined,
    },
    transitMonthly: { value: 78, quality: { kind: 'official' }, sourceId: TRANSIT },
    transitNote: 'Metrobus monthly pass; MUN campus on main routes',
    groceriesMonthly: { value: 355, quality: { kind: 'estimate' }, sourceId: EST },
    utilitiesMonthly: {
      value: 155,
      quality: { kind: 'estimate' },
      sourceId: EST,
      note: 'heating costs significant',
    },
    campuses: [
      {
        name: 'Memorial University',
        short: 'MUN',
        tuitionArts: { value: 6750, quality: { kind: 'official' }, sourceId: MUN },
        tuitionSci: { value: 6750, quality: { kind: 'official' }, sourceId: MUN },
        tuitionNote:
          'Canadian students; NL residents may pay less under the tuition freeze',
      },
    ],
  },
  {
    id: 'charlottetown',
    name: 'Charlottetown',
    province: 'PEI',
    x: 52,
    y: 40,
    rent: {
      bachelor: { value: 984, quality: { kind: 'cmhc', letter: 'c' }, sourceId: CMHC },
      oneBed: { value: 1066, quality: { kind: 'cmhc', letter: 'b' }, sourceId: CMHC },
      twoBed: { value: 1354, quality: { kind: 'cmhc', letter: 'a' }, sourceId: CMHC },
      sharedRoom: {
        value: 677,
        quality: { kind: 'estimate' },
        sourceId: EST,
        note: '2-bed split 2 ways',
      },
      vacancyPct: undefined,
    },
    transitMonthly: { value: 58, quality: { kind: 'estimate' }, sourceId: TRANSIT },
    transitNote: 'T3 Transit monthly pass; UPEI on route network',
    groceriesMonthly: { value: 340, quality: { kind: 'estimate' }, sourceId: EST },
    utilitiesMonthly: { value: 145, quality: { kind: 'estimate' }, sourceId: EST },
    campuses: [
      {
        name: 'University of Prince Edward Island',
        short: 'UPEI',
        tuitionArts: { value: 7630, quality: { kind: 'official' }, sourceId: MPHEC },
        tuitionSci: { value: 7630, quality: { kind: 'official' }, sourceId: MPHEC },
        tuitionNote:
          'PEI residents may qualify for the $3,500 George Coles Bursary',
      },
    ],
  },
]

export type HousingId = RentKind | 'home'

export const HOUSING_OPTIONS: { id: HousingId; label: string }[] = [
  { id: 'sharedRoom', label: 'Room in shared 2-bed' },
  { id: 'bachelor', label: 'Bachelor / studio' },
  { id: 'oneBed', label: '1-bedroom' },
  { id: 'twoBed', label: '2-bedroom (solo)' },
  { id: 'home', label: 'Live at home' },
]

export const PERSONAL_DEFAULT: Figure = {
  value: 150,
  quality: { kind: 'estimate' },
  sourceId: EST,
  note: 'personal + entertainment + phone share',
}

export const PHONE_MONTHLY: Figure = {
  value: 45,
  quality: { kind: 'estimate' },
  sourceId: EST,
}

export const RENT_BAR_MAX = 1600
export const FY_BAR_MAX = 25000

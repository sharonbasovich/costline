import {
  CITIES,
  HOUSING_OPTIONS,
  PERSONAL_DEFAULT,
  PHONE_MONTHLY,
  type City,
  type Figure,
  type HousingId,
} from './data'

export interface BudgetOpts {
  transit: boolean
  groceriesMult: number
  personal: number
}

export interface BudgetLine {
  line: string
  amount: number
  figure?: Figure
}

export function rentFor(city: City, housing: HousingId): number {
  return housing === 'home' ? 0 : city.rent[housing].value
}

export function monthlyLines(
  city: City,
  housing: HousingId,
  opts: BudgetOpts,
): BudgetLine[] {
  const lines: BudgetLine[] = []
  if (housing !== 'home') {
    lines.push({
      line: 'Rent',
      amount: rentFor(city, housing),
      figure: city.rent[housing],
    })
    lines.push({
      line: 'Utilities + internet',
      amount: city.utilitiesMonthly.value,
      figure: city.utilitiesMonthly,
    })
  }
  lines.push({
    line: 'Groceries',
    amount: Math.round(city.groceriesMonthly.value * opts.groceriesMult),
    figure: city.groceriesMonthly,
  })
  if (opts.transit) {
    lines.push({
      line: 'Transit',
      amount: city.transitMonthly.value,
      figure: city.transitMonthly,
    })
  }
  lines.push({ line: 'Phone', amount: PHONE_MONTHLY.value, figure: PHONE_MONTHLY })
  lines.push({
    line: 'Personal & fun',
    amount: opts.personal,
    figure: PERSONAL_DEFAULT,
  })
  return lines
}

export function baselineMonthly(city: City): number {
  return monthlyLines(city, 'sharedRoom', {
    transit: true,
    groceriesMult: 1,
    personal: 150,
  }).reduce((sum, l) => sum + l.amount, 0)
}

export function minTuition(city: City): number {
  return Math.min(...city.campuses.map((c) => c.tuitionArts.value))
}

export function firstYearCost(city: City): number {
  return baselineMonthly(city) * 8 + minTuition(city)
}

export { CITIES, HOUSING_OPTIONS }

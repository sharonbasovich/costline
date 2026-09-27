import { useMemo, useState } from 'react'
import { CITIES, HOUSING_OPTIONS, type HousingId } from '../data'
import { fmt } from '../money'
import { monthlyLines } from '../metrics'
import { QualityBadge } from './QualityBadge'

type GroceryTier = 'lean' | 'normal' | 'comfort'

export function BudgetTool({ initialCity }: { initialCity: string }) {
  const [cityId, setCityId] = useState(initialCity)
  const [campusIdx, setCampusIdx] = useState(0)
  const [prevInitial, setPrevInitial] = useState(initialCity)
  if (prevInitial !== initialCity) {
    setPrevInitial(initialCity)
    setCityId(initialCity)
    setCampusIdx(0)
  }
  const city = CITIES.find((c) => c.id === cityId) ?? CITIES[0]
  const campus = city.campuses[Math.min(campusIdx, city.campuses.length - 1)]

  const [housing, setHousing] = useState<HousingId>('sharedRoom')
  const [transit, setTransit] = useState(true)
  const [tier, setTier] = useState<GroceryTier>('normal')
  const [personal, setPersonal] = useState(150)
  const [partTime, setPartTime] = useState(800)
  const [summer, setSummer] = useState(6000)
  const [family, setFamily] = useState(0)

  const groceriesMult = tier === 'lean' ? 0.85 : tier === 'comfort' ? 1.2 : 1
  const lines = useMemo(
    () =>
      monthlyLines(city, housing, {
        transit,
        groceriesMult,
        personal,
      }),
    [city, housing, transit, groceriesMult, personal],
  )
  const monthlyTotal = lines.reduce((sum, l) => sum + l.amount, 0)
  const eightMonth = monthlyTotal * 8 + campus.tuitionArts.value
  const twelveMonth = monthlyTotal * 12 + campus.tuitionArts.value
  const annualNet = partTime * 12 + summer + family - twelveMonth

  return (
    <section className="panel" id="budget">
      <h2>Budget your year</h2>
      <p className="panel-sub">
        Pick a campus, choose how you'd live, and see the true cost — 8-month
        academic year vs a full 12-month lease.
      </p>
      <div className="budget-grid">
        <div className="budget-controls">
          <label>
            City
            <select
              value={cityId}
              onChange={(e) => {
                setCityId(e.target.value)
                setCampusIdx(0)
              }}
            >
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}, {c.province}
                </option>
              ))}
            </select>
          </label>
          <label>
            Campus
            <select
              value={campusIdx}
              onChange={(e) => setCampusIdx(+e.target.value)}
            >
              {city.campuses.map((c, i) => (
                <option key={c.name} value={i}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Housing
            <select
              value={housing}
              onChange={(e) => setHousing(e.target.value as HousingId)}
            >
              {HOUSING_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="check-row">
            <input
              type="checkbox"
              checked={transit}
              onChange={(e) => setTransit(e.target.checked)}
            />
            Monthly transit pass ({fmt(city.transitMonthly.value)})
          </label>
          <fieldset>
            <legend>Groceries</legend>
            <div className="seg">
              {(['lean', 'normal', 'comfort'] as const).map((t) => (
                <button
                  key={t}
                  className={tier === t ? 'seg-on' : ''}
                  onClick={() => setTier(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>
          <label>
            Personal &amp; fun — {fmt(personal)}/mo
            <input
              type="range"
              min="0"
              max="400"
              step="25"
              value={personal}
              onChange={(e) => setPersonal(+e.target.value)}
            />
          </label>
          <label>
            Part-time income — {fmt(partTime)}/mo
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={partTime}
              onChange={(e) => setPartTime(+e.target.value)}
            />
            <span className="hint">≈ 12 h/wk at ~$16/hr ≈ $800/mo</span>
          </label>
          <label>
            Summer earnings — {fmt(summer)}/yr
            <input
              type="range"
              min="0"
              max="12000"
              step="500"
              value={summer}
              onChange={(e) => setSummer(+e.target.value)}
            />
          </label>
          <label>
            Family / scholarships — {fmt(family)}/yr
            <input
              type="range"
              min="0"
              max="15000"
              step="250"
              value={family}
              onChange={(e) => setFamily(+e.target.value)}
            />
          </label>
        </div>
        <div className="budget-out">
          <h3>Monthly breakdown — {city.name}</h3>
          <ul className="ledger">
            {lines.map((l) => (
              <li key={l.line}>
                <span>{l.line}</span>
                <span className="ledger-amt">
                  {fmt(l.amount)} {l.figure && <QualityBadge figure={l.figure} />}
                </span>
              </li>
            ))}
            <li className="ledger-total">
              <span>Monthly total</span>
              <span>{fmt(monthlyTotal)}</span>
            </li>
          </ul>
          <div className="totals">
            <div className="total-box">
              <span className="total-label">8-month academic year + tuition</span>
              <span className="total-num">{fmt(eightMonth)}</span>
            </div>
            <div className="total-box">
              <span className="total-label">Full 12 months + tuition</span>
              <span className="total-num">{fmt(twelveMonth)}</span>
            </div>
            <div className={`total-box ${annualNet >= 0 ? 'ok' : 'bad'}`}>
              <span className="total-label">Annual income − cost</span>
              <span className="total-num">
                {annualNet >= 0 ? '+' : '−'}
                {fmt(Math.abs(annualNet))}
              </span>
            </div>
          </div>
          <p className="footnote">
            The gap between the 8-month and 12-month figures is why many
            students sublet, take summer courses, or co-op. Figures marked
            "Estimate" are modeled — adjust the sliders.
          </p>
        </div>
      </div>
    </section>
  )
}

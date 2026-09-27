import { CITIES, FY_BAR_MAX, type City } from '../data'
import { fmt } from '../money'
import { baselineMonthly, firstYearCost, minTuition } from '../metrics'

interface Props {
  ids: Set<string>
  onToggle: (id: string) => void
}

const ROWS: [string, (c: City) => string][] = [
  ['Room in shared 2-bed', (c) => `${fmt(c.rent.sharedRoom.value)}/mo`],
  ['1-bedroom', (c) => `${fmt(c.rent.oneBed.value)}/mo`],
  ['2-bedroom', (c) => `${fmt(c.rent.twoBed.value)}/mo`],
  [
    'Transit pass',
    (c) => (c.transitMonthly.value === 0 ? '—' : `${fmt(c.transitMonthly.value)}/mo`),
  ],
  ['Groceries (est.)', (c) => `${fmt(c.groceriesMonthly.value)}/mo`],
  ['Baseline monthly', (c) => fmt(baselineMonthly(c))],
  ['Lowest Arts tuition', (c) => `${fmt(minTuition(c))}/yr`],
]

export function CompareTable({ ids, onToggle }: Props) {
  const cities = CITIES.filter((c) => ids.has(c.id))
  const picker = (
    <div className="cmp-picker">
      {CITIES.map((c) => (
        <label key={c.id} className={`cmp-chip ${ids.has(c.id) ? 'on' : ''}`}>
          <input
            type="checkbox"
            checked={ids.has(c.id)}
            onChange={() => onToggle(c.id)}
          />
          {c.name}
        </label>
      ))}
    </div>
  )
  if (cities.length < 2) {
    return (
      <section className="panel compare-empty" id="compare">
        <h2>Head-to-head</h2>
        <p>
          Tick <strong>compare</strong> on at least two city cards (or click
          dots on the map) to line them up here.
        </p>
        {picker}
      </section>
    )
  }
  return (
    <section className="panel" id="compare">
      <h2>Head-to-head</h2>
      {picker}
      <div className="table-wrap">
        <table className="cmp-table">
          <thead>
            <tr>
              <th></th>
              {cities.map((c) => (
                <th key={c.id}>
                  {c.name}
                  <span className="cmp-prov">{c.province}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([label, fn]) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                {cities.map((c) => (
                  <td key={c.id}>{fn(c)}</td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row">First-year cost*</th>
              {cities.map((c) => {
                const fy = firstYearCost(c)
                return (
                  <td key={c.id}>
                    <div className="fy-bar">
                      <span
                        className="fy-fill"
                        style={{ width: `${(fy / FY_BAR_MAX) * 100}%` }}
                      />
                      <span className="fy-val">{fmt(fy)}</span>
                    </div>
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="footnote">
        *Baseline = shared room + transit + groceries + utilities + phone +
        personal for the 8-month academic year, plus lowest Arts tuition.
        Hover/click any badge on city cards for the source and data-quality
        grade of each figure.
      </p>
    </section>
  )
}

import { CITIES, RENT_BAR_MAX, type City } from '../data'
import { fmt } from '../money'
import { firstYearCost } from '../metrics'
import { QualityBadge } from './QualityBadge'

interface Props {
  city: City
  selected: boolean
  onSelect: () => void
  onToggleCompare: () => void
  inCompare: boolean
}

export function CityCard({
  city,
  selected,
  onSelect,
  onToggleCompare,
  inCompare,
}: Props) {
  const minShared = Math.min(...CITIES.map((c) => c.rent.sharedRoom.value))
  const maxShared = Math.max(...CITIES.map((c) => c.rent.sharedRoom.value))
  const tuitions = city.campuses.map((c) => c.tuitionArts.value)
  const tuitionLabel =
    Math.min(...tuitions) === Math.max(...tuitions)
      ? fmt(tuitions[0])
      : `${fmt(Math.min(...tuitions))}–${fmt(Math.max(...tuitions))}`

  return (
    <article
      id={`card-${city.id}`}
      className={`card ${selected ? 'card-sel' : ''}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
    >
      <header className="card-head">
        <div>
          <h3>{city.name}</h3>
          <span className="card-prov">{city.province}</span>
        </div>
        <label className="cmp-check" onClick={(e) => e.stopPropagation()}>
          <input type="checkbox" checked={inCompare} onChange={onToggleCompare} />
          compare
        </label>
      </header>
      <div className="rent-hero">
        <span className="rent-num">{fmt(city.rent.sharedRoom.value)}</span>
        <span className="rent-sub">/mo room in shared 2-bed</span>
        <QualityBadge figure={city.rent.sharedRoom} />
      </div>
      {city.rent.sharedRoom.value === minShared && (
        <div className="flag flag-good">cheapest shared rent in dataset</div>
      )}
      {city.rent.sharedRoom.value === maxShared && (
        <div className="flag flag-warn">priciest shared rent in dataset</div>
      )}
      <div className="rent-bars">
        {(
          [
            ['1-bed', city.rent.oneBed],
            ['2-bed', city.rent.twoBed],
            ['bachelor', city.rent.bachelor],
          ] as const
        ).map(([label, fig]) => (
          <div className="rbar-row" key={label}>
            <span className="rbar-label">{label}</span>
            <span className="rbar-track">
              <span
                className="rbar-fill"
                style={{ width: `${Math.min(100, (fig.value / RENT_BAR_MAX) * 100)}%` }}
              />
            </span>
            <span className="rbar-val">{fmt(fig.value)}</span>
            <QualityBadge figure={fig} />
          </div>
        ))}
      </div>
      <dl className="card-facts">
        <div>
          <dt>Tuition (Arts, domestic)</dt>
          <dd>{tuitionLabel}/yr</dd>
        </div>
        <div>
          <dt>Transit</dt>
          <dd>
            {city.transitMonthly.value === 0
              ? 'walkable'
              : `${fmt(city.transitMonthly.value)}/mo`}
            <QualityBadge figure={city.transitMonthly} />
          </dd>
        </div>
        <div>
          <dt>Groceries (est.)</dt>
          <dd>
            {fmt(city.groceriesMonthly.value)}/mo{' '}
            <QualityBadge figure={city.groceriesMonthly} />
          </dd>
        </div>
        {city.rent.vacancyPct && (
          <div>
            <dt>Rental vacancy</dt>
            <dd>
              {city.rent.vacancyPct.value}%{' '}
              <QualityBadge figure={city.rent.vacancyPct} />
            </dd>
          </div>
        )}
        <div>
          <dt>First year*</dt>
          <dd>{fmt(firstYearCost(city))}</dd>
        </div>
      </dl>
      <ul className="campus-list">
        {city.campuses.map((campus) => (
          <li key={campus.name}>
            <strong>{campus.short}</strong> {fmt(campus.tuitionArts.value)}/yr{' '}
            <QualityBadge figure={campus.tuitionArts} />
            {campus.tuitionNote && (
              <em className="campus-note">{campus.tuitionNote}</em>
            )}
          </li>
        ))}
      </ul>
      <p className="transit-note">{city.transitNote}</p>
    </article>
  )
}

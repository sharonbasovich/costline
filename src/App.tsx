import { useMemo, useState } from 'react'
import { CITIES } from './data'
import { fmt } from './money'
import { firstYearCost } from './metrics'
import { AtlanticMap } from './components/AtlanticMap'
import { CityCard } from './components/CityCard'
import { CompareTable } from './components/CompareTable'
import { BudgetTool } from './components/BudgetTool'
import { SourcesSection } from './components/SourcesSection'

export default function App() {
  const [selected, setSelected] = useState<string>('halifax')
  const [compareSet, setCompareSet] = useState<Set<string>>(
    new Set(['halifax', 'fredericton', 'stjohns']),
  )
  const toggleCompare = (id: string) =>
    setCompareSet((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const { cheapest, priciest, spread } = useMemo(() => {
    const sorted = [...CITIES].sort((a, b) => firstYearCost(a) - firstYearCost(b))
    const lo = sorted[0]
    const hi = sorted[sorted.length - 1]
    return {
      cheapest: lo,
      priciest: hi,
      spread: firstYearCost(hi) - firstYearCost(lo),
    }
  }, [])

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">≈</span> CostLine
        </div>
        <nav>
          <a href="#explore">Explore</a>
          <a href="#compare">Compare</a>
          <a href="#budget">Budget</a>
          <a href="#sources">Sources</a>
        </nav>
      </header>
      <section className="hero">
        <div className="hero-text">
          <p className="kicker">Hack Atlantic 2026 · Atlantic Canada</p>
          <h1>
            Same degree. <span className="accent">{fmt(spread)}</span> apart.
          </h1>
          <p className="lede">
            A first year at {cheapest.campuses[0].short} in {cheapest.name}{' '}
            costs about <strong>{fmt(firstYearCost(cheapest))}</strong>. At{' '}
            {priciest.campuses[0].short} in {priciest.name},{' '}
            <strong>{fmt(firstYearCost(priciest))}</strong>. CostLine maps the
            real cost of student life across {CITIES.length} Atlantic Canadian
            cities — every figure cited, every estimate labeled.
          </p>
          <div className="hero-cta">
            <a className="btn" href="#explore">
              Explore the map
            </a>
            <a className="btn btn-ghost" href="#budget">
              Budget my year
            </a>
          </div>
        </div>
        <div className="hero-map">
          <AtlanticMap
            selected={selected}
            compareSet={compareSet}
            onSelect={(id) => {
              setSelected(id)
              document
                .getElementById(`card-${id}`)
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }}
          />
        </div>
      </section>
      <section className="panel" id="explore">
        <h2>Explore {CITIES.length} student cities</h2>
        <p className="panel-sub">
          Badges show where each number comes from and how reliable it is —
          CMHC survey grades, official figures, or clearly-marked estimates.
          *First year = 8-month baseline (shared room, transit, groceries,
          utilities, phone, personal) + lowest Arts tuition.
        </p>
        <div className="cards">
          {CITIES.map((c) => (
            <CityCard
              key={c.id}
              city={c}
              selected={selected === c.id}
              onSelect={() => setSelected(c.id)}
              inCompare={compareSet.has(c.id)}
              onToggleCompare={() => toggleCompare(c.id)}
            />
          ))}
        </div>
      </section>
      <CompareTable ids={compareSet} onToggle={toggleCompare} />
      <BudgetTool initialCity={selected ?? 'fredericton'} />
      <SourcesSection />
      <footer>
        <p>
          CostLine — built in 24 hours at Hack Atlantic 2026 by Sharon Basovich
          with Devin (AI pair-programmer). Data: CMHC, MPHEC, Memorial
          University, transit authorities, university cost-of-living guides.{' '}
          <a href="https://github.com/sharonbasovich/costline">
            Source on GitHub
          </a>
          .
        </p>
      </footer>
    </div>
  )
}

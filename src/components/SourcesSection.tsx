import { SOURCES } from '../data'

export function SourcesSection() {
  return (
    <section className="panel" id="sources">
      <h2>Sources &amp; method</h2>
      <p className="panel-sub">
        Every number in CostLine carries a badge: <strong>CMHC grade</strong>{' '}
        (official survey data quality), <strong>Official</strong> (published
        institutional/government figure), or <strong>Estimate</strong> (our
        model — treat as ±15%). Click any badge to see its source.
      </p>
      <table className="src-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Source</th>
            <th>Vintage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rents, vacancy rates</td>
            <td>
              <a
                href={SOURCES['cmhc-rms-oct2025'].url}
                target="_blank"
                rel="noreferrer"
              >
                {SOURCES['cmhc-rms-oct2025'].label}
              </a>
            </td>
            <td>{SOURCES['cmhc-rms-oct2025'].date}</td>
          </tr>
          <tr>
            <td>Tuition — Maritime universities</td>
            <td>
              <a
                href={SOURCES['mphec-2025-26'].url}
                target="_blank"
                rel="noreferrer"
              >
                {SOURCES['mphec-2025-26'].label}
              </a>
            </td>
            <td>{SOURCES['mphec-2025-26'].date}</td>
          </tr>
          <tr>
            <td>Tuition — Memorial University</td>
            <td>
              <a
                href={SOURCES['mun-tuition'].url}
                target="_blank"
                rel="noreferrer"
              >
                {SOURCES['mun-tuition'].label}
              </a>
            </td>
            <td>{SOURCES['mun-tuition'].date}</td>
          </tr>
          <tr>
            <td>Transit fares</td>
            <td>
              <a
                href={SOURCES['transit-fares'].url}
                target="_blank"
                rel="noreferrer"
              >
                {SOURCES['transit-fares'].label}
              </a>
            </td>
            <td>{SOURCES['transit-fares'].date}</td>
          </tr>
          <tr>
            <td>Groceries, utilities, personal</td>
            <td>
              <a
                href={SOURCES['univ-col-estimates'].url}
                target="_blank"
                rel="noreferrer"
              >
                {SOURCES['univ-col-estimates'].label}
              </a>
            </td>
            <td>{SOURCES['univ-col-estimates'].date}</td>
          </tr>
        </tbody>
      </table>
      <h3>Limits</h3>
      <ul className="limits">
        <li>
          CMHC surveys cover purpose-built rentals; basement suites and
          roomshares differ.
        </li>
        <li>
          Sackville, Antigonish and Wolfville are not separately surveyed by
          CMHC — Wolfville uses Kentville figures; the other two are marked as
          estimates.
        </li>
        <li>
          Tuition shown is domestic/in-province Arts; Science, international
          and ancillary fees vary.
        </li>
        <li>
          Estimates (groceries, utilities, phone, personal) carry a ±15% band.
        </li>
        <li>
          This is a planning tool, not financial advice — verify with each
          institution.
        </li>
      </ul>
    </section>
  )
}

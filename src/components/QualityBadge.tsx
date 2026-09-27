import { useState } from 'react'
import { SOURCES, type Figure, type Quality } from '../data'

const CMHC_GRADES = {
  a: 'A — excellent',
  b: 'B — very good',
  c: 'C — good',
  d: 'D — fair, use caution',
} as const

function qualityInfo(q: Quality) {
  if (q.kind === 'cmhc') {
    return {
      tag: `CMHC ${q.letter.toUpperCase()}`,
      cls: `q-cmhc-${q.letter}`,
      blurb: `Official CMHC survey figure, data-quality grade ${CMHC_GRADES[q.letter]}`,
    }
  }
  if (q.kind === 'official') {
    return { tag: 'Official', cls: 'q-official', blurb: 'Published official figure' }
  }
  return {
    tag: 'Estimate',
    cls: 'q-est',
    blurb: 'Modeled estimate — treat as ±15%',
  }
}

export function QualityBadge({ figure }: { figure: Figure }) {
  const [open, setOpen] = useState(false)
  const info = qualityInfo(figure.quality)
  const source = SOURCES[figure.sourceId]
  return (
    <span className="badge-wrap">
      <button
        className={`badge ${info.cls}`}
        onClick={(e) => {
          e.stopPropagation()
          setOpen(!open)
        }}
        onBlur={() => setOpen(false)}
        aria-label={`Data quality: ${info.blurb}`}
      >
        {info.tag}
      </button>
      {open && (
        <span className="badge-pop">
          <strong>{info.blurb}</strong>
          <br />
          {source.label}
          <br />
          <span className="badge-pop-date">{source.date}</span>
          {figure.note && (
            <>
              <br />
              <em>{figure.note}</em>
            </>
          )}
        </span>
      )}
    </span>
  )
}

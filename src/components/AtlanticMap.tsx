import { CITIES } from '../data'

interface Props {
  selected: string | null
  compareSet: Set<string>
  onSelect: (id: string) => void
}

export function AtlanticMap({ selected, compareSet, onSelect }: Props) {
  return (
    <svg
      viewBox="0 0 100 92"
      className="map"
      role="img"
      aria-label="Stylized map of Atlantic Canada"
    >
      <defs>
        <pattern id="waves" width="6" height="6" patternUnits="userSpaceOnUse">
          <path
            d="M0 3 Q1.5 2 3 3 T6 3"
            fill="none"
            stroke="#0e7c7b"
            strokeWidth="0.25"
            opacity="0.25"
          />
        </pattern>
      </defs>
      <rect width="100" height="92" fill="#eaf4f2" rx="2" />
      <rect width="100" height="92" fill="url(#waves)" rx="2" />
      <path
        d="M78,2 L95,0 L99,6 L96,20 L88,29 L79,26 L74,14 Z"
        className="land"
      />
      <path d="M58,0 L72,0 L70,8 L60,10 Z" className="land land-dim" />
      <path d="M80,37 L90,39 L89,48 L79,50 L76,44 Z" className="land" />
      <path
        d="M70,50 L75,56 L72,63 L66,68 L63,78 L56,85 L47,84 L42,75 L46,66 L55,58 L62,53 Z"
        className="land"
      />
      <path d="M49,37 Q54,35 57,38 Q55,42 50,42 Z" className="land" />
      <path
        d="M24,44 L42,44 L48,52 L44,62 L40,74 L34,84 L26,82 L24,70 L22,58 Z"
        className="land"
      />
      {CITIES.map((city) => {
        const isSel = selected === city.id
        const inCmp = compareSet.has(city.id)
        return (
          <g
            key={city.id}
            transform={`translate(${city.x},${city.y})`}
            onClick={() => onSelect(city.id)}
            className="map-city"
            role="button"
            aria-label={city.name}
          >
            <circle r="3.4" className={`dot-halo ${isSel ? 'on' : ''}`} />
            <circle
              r="1.9"
              className={`dot ${isSel ? 'on' : ''} ${inCmp ? 'cmp' : ''}`}
            />
            <text y="-3.6" className={`map-label ${isSel ? 'on' : ''}`}>
              {city.name}
            </text>
          </g>
        )
      })}
      <text x="2.5" y="90" className="map-note">
        stylized — not to scale · click a city
      </text>
    </svg>
  )
}

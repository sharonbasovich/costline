# CostLine — Atlantic Canada Student Cost Explorer

Compare the real cost of student life across 10 Atlantic Canadian cities —
every figure cited, every estimate labeled.

Built in 24 hours at **Hack Atlantic 2026** (solo entry) by Sharon Basovich.

## Live demo

- GitHub Pages: https://sharonbasovich.github.io/costline/
- Fallback preview: https://dist-ayzzxryj.devinapps.com

## What it does

- **Explore** — a stylized map + card grid of 10 university cities (NS, NB, NL, PEI)
  with rent, tuition, transit, groceries, utilities and a computed first-year cost.
- **Uncertainty labels** — every number carries a badge: `CMHC A–D` (official
  survey grade), `Official` (published institutional/government figure), or
  `Estimate` (modeled, ±15%). Click any badge for its source.
- **Head-to-head** — tick `compare` on city cards to line cities up in a table
  with a first-year-cost bar chart.
- **Budget your year** — pick city/campus/housing, adjust groceries, personal
  spending, part-time income, summer earnings and family support; see the
  8-month vs 12-month cost gap and annual net.

## Setup

```bash
npm install
npm run dev        # dev server
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build
```

Deploys to GitHub Pages from the `gh-pages` branch (Vite `base: './'`).

## Data sources & citations

| Data | Source | Vintage |
| --- | --- | --- |
| Rents, vacancy rates | [CMHC Rental Market Survey, October 2025 — average purpose-built rents](https://www03.cmhc-schl.gc.ca/hmip-pimh/en/TableMapChart) | 2025 survey (released Jan 2026) |
| Tuition — Maritime universities | [MPHEC — Table A: Undergraduate Tuition 2025-2026](https://mphec.ca/media/238756/table-a_tuition-undergraduate-2025-2026.pdf) | 2025-26 academic year |
| Tuition — Memorial University | [MUN undergraduate tuition & fee framework](https://mun.ca/undergrad/money-matters/new-tuition-framework/) | 2025-26 academic year |
| Transit fares | [Published transit authority fare pages (Halifax Transit UPass, Fredericton Transit U-Pass, Codiac Transpo, Metrobus, T3 Transit)](https://www.halifax.ca/transportation/halifax-transit/transit-programs-services/upass-program) | checked Sep 2026 |
| Groceries, utilities, personal | [Modeled estimate — university-published cost-of-living guides (Dalhousie, UNB, MUN, UPEI)](https://www.dal.ca/admissions/money_matters.html) | ±15% band |

**Limits:** CMHC surveys cover purpose-built rentals — roomshares/basement
suites differ. Sackville, Antigonish and Wolfville are not separately
surveyed (Wolfville uses Kentville; the others are marked as estimates).
Tuition shown is domestic Arts. This is a planning tool, not financial advice.

## Attribution

- **Code:** written during the Hack Atlantic event window by Sharon Basovich
  with Devin (AI pair-programmer, cognition.ai). No outside project code or
  pre-existing assets used.
- **Stack:** React 19, TypeScript, Vite. No other runtime dependencies.
- **Map:** hand-drawn stylized SVG (not to scale), created for this project.
- **Data:** publicly published sources listed above; modeled estimates are
  labeled in-app.

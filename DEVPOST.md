# CostLine — Devpost submission text (paste-ready)

## Title

CostLine

## Tagline

Same degree, $4,400 apart — the real cost of being a student in Atlantic Canada, with every number cited.

## Elevator / hook (first two sentences)

A first year at Memorial University in St. John's costs about $18,400. The same
year at Dalhousie in Halifax runs $22,800 — and neither school's website tells
you that in one place. CostLine maps the real cost of student life across 10
Atlantic Canadian cities — every figure cited, every estimate labeled.

## Inspiration

Atlantic Canada sells itself to students as "affordable" — but affordable
*where*? A student choosing between Dalhousie in Halifax and Memorial in
St. John's is really choosing between a $914 shared room and a $674 one —
between a city with a 2.1% rental vacancy and one where the search is easier.
That information exists, but it's scattered across CMHC tables, MPHEC PDFs and
a dozen university "estimated costs" pages — each in a different format, none
comparable. We wanted one honest map of what a student year actually costs
here.

## What it does

CostLine is a cost-of-living explorer for the ten university cities of
Atlantic Canada (Halifax, Sydney, Wolfville, Antigonish, Fredericton, Saint
John, Moncton, Sackville, St. John's, Charlottetown).

- **Explore** — a stylized map and card grid: shared-room rent, rent bars for
  1-bed/2-bed/bachelor units, Arts tuition per campus, transit, groceries,
  vacancy rates, and a computed first-year cost.
- **Honest numbers** — every figure carries a badge you can click: `CMHC A–D`
  survey grades, `Official` published figures, or `Estimate` (modeled, ±15%).
  No fake precision.
- **Head-to-head** — tick "compare" on any cards or map dots to line cities up
  side by side, with a first-year-cost bar chart.
- **Budget your year** — pick a city and campus, choose your housing, adjust
  groceries, personal spending, part-time income, summer earnings and family
  support. CostLine shows the 8-month vs 12-month cost gap — the reason
  students sublet — and whether your income actually covers it.

## How we built it

React 19 + TypeScript + Vite, single-page app, zero backend — all data is
bundled, typed and source-tagged in `src/data.ts`. The map is a hand-drawn
stylized SVG built for this project. Built in the Hack Atlantic 24-hour window
by a solo student with Devin (AI pair-programmer) — every AI-generated line
was reviewed, and all data sources are cited in the app and the README.

## Challenges we ran into

The honest-data model was the hard part. CMHC doesn't separately survey small
towns like Antigonish or Sackville, so we had to design a quality-label system
(CMHC grade / Official / Estimate) rather than pretend the numbers were
uniform. Mid-build, the original dev environment became unreachable — the
deployed build was recovered and rebuilt into a clean, readable codebase
without losing a feature.

## Accomplishments we're proud of

- Ten cities, five data sources, every number labeled — no other student
  budgeting tool shows its work like this.
- The 8-month vs 12-month lease gap is surfaced as a first-class number,
  because that's the decision students actually face.
- Recovered the entire app from a dead environment mid-hackathon and still
  shipped.

## What we learned

Data provenance is a feature, not a footnote. Designing the badge system
first — before the UI — forced every number to earn its place on the screen.

## What's next for CostLine

Rent-alert tracking when CMHC's next survey drops, international-student
tuition mode, OSAP/provincial-loan integration, and crowdsourced real-lease
submissions to shrink the "Estimate" badges.

## Built with

React, TypeScript, Vite, SVG, CSS. Data: CMHC Rental Market Survey (Oct 2025),
MPHEC Tuition Table A (2025-26), Memorial University tuition framework,
transit authority fare pages, university cost-of-living guides. AI
pair-programmer: Devin (Cognition).

## Links

- Live: https://sharonbasovich.github.io/costline/ (fallback:
  https://dist-ayzzxryj.devinapps.com)
- Source: https://github.com/sharonbasovich/costline

import { chromium } from 'playwright-core'
const b = await chromium.connectOverCDP('http://localhost:29229')
const ctx = b.contexts()[0]
const p = await ctx.newPage()
await p.bringToFront()
await p.setViewportSize({ width: 1280, height: 760 })
await p.goto('https://sharonbasovich.github.io/costline/', { waitUntil: 'networkidle' })
await p.waitForTimeout(6000) // hero hook

// map -> card (smooth scroll built in)
await p.locator('g.map-city[aria-label="St. John\'s"]').click()
await p.waitForTimeout(3500)

// source badge popover on Fredericton transit
const badge = p.locator('#card-fredericton .badge').nth(4)
await badge.scrollIntoViewIfNeeded()
await p.evaluate(() => scrollBy(0, -120))
await p.waitForTimeout(300)
await badge.click()
await p.waitForTimeout(4500)
await p.mouse.click(200, 300) // click-away closes via blur
await p.waitForTimeout(800)

// compare table
await p.evaluate(() => document.getElementById('compare')?.scrollIntoView({ behavior: 'smooth' }))
await p.waitForTimeout(6000)

// budget tool — slider + transit toggle
await p.evaluate(() => document.getElementById('budget')?.scrollIntoView({ behavior: 'smooth' }))
await p.waitForTimeout(3500)
await p.evaluate(() => {
  const el = document.querySelectorAll('#budget input[type=range]')[1]
  const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
  set.call(el, '1400'); el.dispatchEvent(new Event('input', { bubbles: true }))
})
await p.waitForTimeout(3000)
await p.locator('#budget input[type=checkbox]').click()
await p.waitForTimeout(2000)
await p.locator('#budget input[type=checkbox]').click()
await p.waitForTimeout(2500)

// sources
await p.evaluate(() => document.getElementById('sources')?.scrollIntoView({ behavior: 'smooth' }))
await p.waitForTimeout(6000)

// back to hero
await p.evaluate(() => scrollTo({ top: 0, behavior: 'smooth' }))
await p.waitForTimeout(3500)
await p.close()
console.log('demo done')

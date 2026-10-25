import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const sourceRoot = join(root, 'src')
const themePath = join(sourceRoot, 'styles/theme.css')
const assetRoot = join(sourceRoot, 'static/assets')

async function findVueFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return findVueFiles(path)
    return entry.isFile() && entry.name.endsWith('.vue') ? [path] : []
  }))
  return nested.flat()
}

function luminance(hex) {
  const channels = hex.slice(1).match(/.{2}/g).map((channel) => parseInt(channel, 16) / 255)
  const [red, green, blue] = channels.map((channel) => (
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  ))
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

function contrast(foreground, background) {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a)
  return (values[0] + 0.05) / (values[1] + 0.05)
}

function hslSaturation(hex) {
  const channels = hex.slice(1).match(/.{2}/g).map((channel) => parseInt(channel, 16) / 255)
  const maximum = Math.max(...channels)
  const minimum = Math.min(...channels)
  const delta = maximum - minimum
  return delta === 0 ? 0 : delta / (1 - Math.abs(maximum + minimum - 1))
}

const theme = await readFile(themePath, 'utf8')
const appSource = await readFile(join(sourceRoot, 'App.vue'), 'utf8')
assert.match(appSource, /@import\s+["']\.\/styles\/theme\.css["']\s*;/, 'App.vue must load the global theme')
assert.ok(!(await readdir(sourceRoot)).includes('uni.scss'), 'uni.scss must not auto-inject shared rules')
const tokens = new Map([...theme.matchAll(/(--color-[\w-]+)\s*:\s*(#[\da-f]{6})\b/gi)]
  .map(([, name, value]) => [name, value.toLowerCase()]))
const vueFiles = await findVueFiles(sourceRoot)
const rawColor = /#[\da-f]{3,8}\b|\b(?:rgba?|hsla?|oklab|oklch|lab|lch|hwb|color)\s*\(/i
const declaration = /(?:^|[;{}])\s*(?:color|background(?:-color)?|border(?:-(?:top|right|bottom|left))?(?:-color)?|outline(?:-color)?|box-shadow|text-shadow|fill|stroke)\s*:\s*([^;{}]+)/gim
const allowedColorKeywords = /^(?:0|none|transparent|currentcolor|inherit|initial|unset|revert)$/i

for (const file of vueFiles) {
  const source = await readFile(file, 'utf8')
  const styles = [...source.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi)]

  for (const [, css] of styles) {
    assert.doesNotMatch(css, rawColor, `${file}: raw CSS color found; use a theme token`)

    for (const [, value] of css.matchAll(declaration)) {
      if (allowedColorKeywords.test(value.trim())) continue
      assert.match(value, /var\(\s*--color-[\w-]+\s*\)/i, `${file}: color declaration must use a semantic token: ${value.trim()}`)
    }

    for (const [, name] of css.matchAll(/var\(\s*(--color-[\w-]+)/gi)) {
      assert.ok(tokens.has(name), `${file}: undefined theme token ${name}`)
    }
  }
}

const svgFiles = (await readdir(assetRoot, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && entry.name.endsWith('.svg'))

for (const entry of svgFiles) {
  const file = join(assetRoot, entry.name)
  const source = await readFile(file, 'utf8')

  for (const [, value] of source.matchAll(/(?:fill|stroke|stop-color|flood-color)\s*=\s*"([^"]+)"/gi)) {
    if (value.startsWith('#')) assert.match(value, /^#[\da-f]{6}$/i, `${file}: SVG paint colors must use six-digit hex`)
  }

  for (const [, hex] of source.matchAll(/#([\da-f]{6})(?![\da-f])/gi)) {
    const saturation = hslSaturation(`#${hex}`)
    assert.ok(saturation <= 0.55, `${file}: #${hex} saturation is ${(saturation * 100).toFixed(1)}% (maximum 55%)`)
  }
}

const contrastPairs = [
  ['--color-ink', '--color-paper'],
  ['--color-ink', '--color-surface'],
  ['--color-ink', '--color-wheat-soft'],
  ['--color-ink-muted', '--color-paper'],
  ['--color-ink-muted', '--color-surface'],
  ['--color-primary', '--color-paper'],
  ['--color-primary', '--color-surface'],
  ['--color-primary-dark', '--color-surface'],
  ['--color-primary-dark', '--color-surface-muted'],
  ['--color-primary-dark', '--color-primary-soft'],
  ['--color-primary-dark', '--color-wheat-soft'],
  ['--color-primary-dark', '--color-wood'],
  ['--color-wheat', '--color-wheat-soft'],
  ['--color-terracotta', '--color-terracotta-soft'],
  ['--color-aqua-ink', '--color-aqua-soft'],
  ['--color-accent', '--color-accent-soft'],
  ['--color-surface', '--color-primary'],
]

for (const [foreground, background] of contrastPairs) {
  assert.ok(tokens.has(foreground), `missing theme token ${foreground}`)
  assert.ok(tokens.has(background), `missing theme token ${background}`)
  const ratio = contrast(tokens.get(foreground), tokens.get(background))
  assert.ok(ratio >= 4.5, `${foreground} on ${background} contrast is ${ratio.toFixed(2)}:1 (minimum 4.5:1)`)
}

console.log(`Theme check passed: ${vueFiles.length} Vue files, ${svgFiles.length} SVG assets, ${contrastPairs.length} text/button contrast pairs >= 4.5:1.`)

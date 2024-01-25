const observedAttributes = ['values', 'width', 'height', 'color', 'curve', 'endpoint', 'endpoint-color', 'endpoint-width', 'fill', 'gradient', 'fill-color', 'gradient-color', 'line-width', 'start-label', 'end-label', 'animation-duration', 'animation-delay']

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function Sparkline ({ html, state: { attrs, instanceID } }) {
  if (!attrs.values) return ''

  /** @type {Record<string, any>} */
  const a = {
    color: 'currentColor',
    curve: false,
    endpoint: true,
    endpointWidth: 6,
    fill: false,
    gradient: false,
    height: 36,
    lineWidth: 2,
    width: 200,
  }

  for (const k of observedAttributes) {
    const val = attrs[k]

    if (!val) continue

    const key = k.replace(/-([a-z])/g, g => g[1].toUpperCase())

    if (key === 'values') {
      if (val === 'random') {
        a[key] = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10))
      } else {
        a[key] = val.split(',').map(v => Number(v))
      }
    } else if (val === 'true') {
      a[key] = true
    } else if (val === 'false') {
      a[key] = false
    } else if (!isNaN(Number(val))) {
      a[key] = parseFloat(val)
    } else {
      a[key] = val
    }
  }

  a.endpointColor = a.endpointColor || a.color
  a.gradientColor = a.gradientColor || a.fillColor || a.color

  const content = []

  if (a.startLabel) {
    content.push(`<span>${a.startLabel}</span>`)
  }

  content.push(`
      <svg width="${a.width}px" height="${a.height}px" viewBox="${getViewBox(a.values)}" preserveAspectRatio="none">
    `)

  if (a.gradient || a.fill) {
    const gradientID = instanceID
    content.push(`
        <defs>
          <linearGradient id="svg-sparkline-gradient-${gradientID}" gradientTransform="rotate(90)">
            <stop offset="0%" stop-color="var(--svg-sparkline-gradient-color, ${a.gradientColor})" />
            <stop offset="100%" stop-color="transparent" />
          </linearGradient>
        </defs>
        <path
            d="${getPath(a.values, a.curve ? bezierCommand : lineCommand)} L ${getFinalX(a.values)} ${getHighestY(a.values)} L 0 ${getHighestY(a.values)} Z"
            fill="${a.fill ? `var(--svg-sparkline-gradient-color, ${a.gradientColor})` : `url('#svg-sparkline-gradient-${gradientID}')`}"
            stroke="transparent"
        />
      `)
  }

  content.push(`
      <path
          d="${getPath(a.values, a.curve ? bezierCommand : lineCommand)}"
          stroke="var(--svg-sparkline-color, ${a.color})"
          stroke-width="${a.lineWidth}"
          stroke-linecap="round"
          fill="transparent"
          vector-effect="non-scaling-stroke"
      />
    `)

  content.push('</svg>')

  if (a.endpoint) {
    content.push(`
        <svg width="${a.width}px" height="${a.height}px" viewBox="0 0 ${a.width} ${a.height}" preserveAspectRatio="xMaxYMid meet">
          <circle " r="${a.endpointWidth / 2}" cx="${a.width}" cy="${(a.height / getHighestY(a.values)) * getFinalY(a.values)}" fill="var(--svg-sparkline-endpoint-color, ${a.endpointColor})"></circle>
        </svg>
      `)
  }

  if (a.endLabel) {
    content.push(`<span>${a.endLabel}</span>`)
  }

  return html`
<style>
  :host {
    display: grid;
    display: inline-grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr auto;
  }
  svg {
    inline-size: auto;
    grid-column: 1 / 3;
    grid-row: 1 / 2;
    padding: var(--svg-sparkline-padding, 0.375rem);
    overflow: visible;
  }
  span {
    padding-inline: var(--svg-sparkline-padding, 0.375rem);
  }
  span:nth-of-type(1) {
    grid-column: 1 / 2;
    text-align: start;
  }
  span:nth-of-type(2) {
      grid-column: 2 / 3;
      text-align: end;
  }
  @media (prefers-reduced-motion: no-preference) {
    :host([animate]) {
      --duration: var(--svg-sparkline-animation-duration, var(--animation-duration, 1s));
      --first-delay: var(--svg-sparkline-animation-first-delay, var(--svg-sparkline-animation-delay, var(--animation-delay, 1s)));
      --second-delay: var(--svg-sparkline-animation-second-delay, calc(var(--duration) + var(--first-delay)));
    }
    :host([animate]) svg:first-of-type {
      clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
    }
    :host([visible]) svg:first-of-type {
      animation: swipe var(--duration) linear var(--first-delay) forwards;
    }
    :host([animate]) svg:last-of-type,
    :host([animate]) span {
      opacity: 0;
    }
    :host([visible]) svg:last-of-type,
    :host([visible]) span {
      animation: fadein var(--duration) linear var(--second-delay) forwards;
    }
  }
  @keyframes swipe {
    to {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }
  @keyframes fadein {
    to {
      opacity: 1;
    }
  }
</style>

${content.join('\n')}
  `
}

function maxDecimals (value, decimals = 2) {
  return +value.toFixed(decimals)
}

function getViewBox (values) {
  return `0 0 ${values.length - 1} ${Math.max(...values) + 2}`
}

function lineCommand (point, i, a) {
  return `L ${i},${point}`
}

function line (ax, ay, bx, by) {
  const lengthX = bx - ax
  const lengthY = by - ay

  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  }
}

function controlPoint (cx, cy, px, py, nx, ny, reverse) {
  // When the current is the first or last point of the array, previous and
  // next don't exist. Replace with current.
  px = px || cx
  py = py || cy
  nx = nx || cx
  ny = ny || cy

  const smoothing = 0.2

  const o = line(px, py, nx, ny)

  const angle = o.angle + (reverse ? Math.PI : 0)
  const length = o.length * smoothing

  const x = cx + Math.cos(angle) * length
  const y = cy + Math.sin(angle) * length

  return [x, y]
}

function bezierCommand (point, i, a) {
  const [csx, csy] = controlPoint(i - 1, a[i - 1], i - 2, a[i - 2], i, point)
  const [cex, cey] = controlPoint(i, point, i - 1, a[i - 1], i + 1, a[i + 1], true)

  return `C ${maxDecimals(csx)},${maxDecimals(csy)} ${maxDecimals(cex)},${maxDecimals(cey)} ${i},${point}`
}

function getPath (values, command = lineCommand) {
  return values
    // flips each point in the vertical range
    .map((point) => Math.max(...values) - point + 1)
    // generate a string
    .reduce((acc, point, i, a) => {
      return i < 1 ? `M 0,${point}` : `${acc} ${command(point, i, a)}`
    }, '')
}

function getFinalX (values) {
  return values.length - 1
}

function getFinalY (values) {
  return Math.max(...values) - values[values.length - 1] + 1
}

function getHighestY (values) {
  return Math.max(...values) + 2
}

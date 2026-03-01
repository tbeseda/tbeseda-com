import { init, Terminal, FitAddon } from 'https://cdn.jsdelivr.net/npm/ghostty-web@0.4.0/dist/ghostty-web.js'

const TYPING_SPEED = 30

async function main() {
  await init()

  const term = new Terminal({
    cursorBlink: true,
    fontSize: 14,
    fontFamily: 'Monaco, Menlo, "Courier New", monospace',
    theme: {
      background: '#1a1a1a',
      foreground: '#cccccc',
      cursor: '#f0c674',
      cursorAccent: '#1a1a1a',
    },
    scrollback: 0,
  })

  const fitAddon = new FitAddon()
  term.loadAddon(fitAddon)

  document.getElementById('loading').remove()
  const container = document.getElementById('terminal-container')
  term.open(container)
  fitAddon.fit()
  window.addEventListener('resize', () => fitAddon.fit())

  const links = await greeting(term)

  // Map a mouse event to a link hit (if any)
  function linkAt(e) {
    const canvas = container.querySelector('canvas')
    if (!canvas || !term.renderer) return null
    const rect = canvas.getBoundingClientRect()
    const col = Math.floor((e.clientX - rect.left) / term.renderer.charWidth)
    const row = Math.floor((e.clientY - rect.top) / term.renderer.charHeight)
    return links.find(l => row === l.row && col >= l.colStart && col < l.colEnd) || null
  }

  container.addEventListener('click', (e) => {
    const link = linkAt(e)
    if (!link) return
    e.preventDefault()
    e.stopImmediatePropagation()
    if (link.uri.startsWith('/')) {
      location.href = link.uri
    } else {
      window.open(link.uri, '_blank', 'noopener,noreferrer')
    }
  }, true)

  container.addEventListener('mousemove', (e) => {
    const canvas = container.querySelector('canvas')
    if (canvas) canvas.style.cursor = linkAt(e) ? 'pointer' : ''
  })
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

function type(term, text, speed = TYPING_SPEED) {
  return new Promise(resolve => {
    let i = 0
    const iv = setInterval(() => {
      if (i < text.length) {
        term.write(text[i])
        i++
      } else {
        clearInterval(iv)
        resolve()
      }
    }, speed)
  })
}

async function greeting(term) {
  const links = []
  let row = 0

  function writeln(text) {
    term.writeln(text)
    row++
  }

  function link(label, uri) {
    links.push({ row, colStart: 2, colEnd: 2 + label.length, uri })
    return `\x1b[4;36m${label}\x1b[0m`
  }

  term.write('\x1b[1;33m$\x1b[0m ')
  await type(term, 'whoami')
  await sleep(300)
  writeln('')
  writeln('\x1b[1mTaylor Beseda\x1b[0m (tbeseda)')
  writeln('')
  writeln('  Software engineer · web developer')
  writeln('  Currently at \x1b[36mSanity.io\x1b[0m')
  writeln('')

  term.write('\x1b[1;33m$\x1b[0m ')
  await type(term, 'ls ~/links')
  await sleep(300)
  writeln('')
  writeln(`  ${link('/blog', '/blog')}          articles on web dev`)
  writeln(`  ${link('/about', '/about')}         more about me`)
  writeln(`  ${link('github.com', 'https://github.com/tbeseda')}     github.com/tbeseda`)
  writeln(`  ${link('bsky', 'https://bsky.app/profile/tbeseda.com')}           @tbeseda.com`)
  writeln('')

  term.write('\x1b[1;33m$\x1b[0m ')
  await type(term, 'cat status.txt')
  await sleep(300)
  writeln('')
  writeln('  Building things with cloud functions, web')
  writeln('  standards, and the occasional WASM terminal.')
  writeln('')

  term.write('\x1b[1;33m$\x1b[0m ')

  return links
}

main().catch(console.error)

import xterm from 'xterm'
import webglAddon from 'xterm-addon-webgl'

export class SimpleXterm {
	constructor({ prompt, elem }) {
		this.prompt = prompt || '> '
		this.elem = elem
	}

	init() {
		if (!this.elem) throw new Error('No terminal element')

		/** @type {import("xterm").Terminal} */
		const term = new xterm.Terminal()
		term.open(this.elem)
		term.loadAddon(new webglAddon.WebglAddon())
		term.write(this.prompt)

		term.onKey((e) => {
			console.log(e.key)
			if (e.key === '\r') {
				term.write(`\r\n${this.prompt}`)
			} else {
				term.write(e.key)
			}
		})
	}
}

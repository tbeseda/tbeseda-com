import chalk from 'chalk'
import { Terminal } from 'xterm'
import { Readline } from 'xterm-readline'

export class SimpleXterm {
	constructor({
		elem,
		user = '👻',
		host = 'localhost',
		symbol = '> ',
		options = { cursorBlink: true },
	}) {
		if (!elem) throw new Error('No terminal element')

		this.term = new Terminal(options)
		this.rl = new Readline()

		this.elem = elem
		this.line = ''
		this.prevLines = []
		this.user = user
		this.host = host
		this.symbol = symbol
		this.ps1 = symbol
		this.setPs1()
	}

	setPs1() {
		this.ps1 = [
			chalk.blueBright(this.user),
			'@',
			chalk.greenBright(this.host),
			' ',
			chalk.yellow(this.symbol),
		].join('')
	}

	setUser(user) {
		this.user = user
		this.setPs1()
	}

	write(text) {
		this.rl.println(text)
	}

	async run(cmd) {
		const [cmdName, ...args] = cmd.split(' ')

		try {
			const result = await this.commands[cmdName]({ args })
			if (result) result.forEach(this.write.bind(this))
		} catch (error) {
			if (error instanceof TypeError) {
				this.write(`command not found: ${cmdName}`)
			} else {
				console.log(error)
				this.write(`${error.message}}`)
			}
		}

		this.write('')
	}

	async processLine(text) {}

	async readLine() {
		const text = await this.rl.read(this.ps1)
		await this.run(text)
		setTimeout(this.readLine.bind(this)) // tick
	}

	init(commands) {
		this.commands = commands
		this.term.loadAddon(this.rl)
		this.term.open(this.elem)

		this.write('welcome.\r\ntry "help".')
		this.term.focus()
		this.readLine()
	}
}

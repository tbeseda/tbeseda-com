import { readFileSync } from 'node:fs'
import { parse as parseKdl } from 'kdljs'

const here = new URL('.', import.meta.url).pathname
const kdlFile = readFileSync(`${here}/app.kdl`).toString()

const ast = parseKdl(kdlFile)
console.log(JSON.stringify(ast, null, 2))

import crypto from 'node:crypto'

function createPart(size = 4) {
	return crypto.randomBytes(size).toString('hex').toUpperCase()
}

/**
 * @description Create uppercase alphanumeric ID
 * @param {number} length
 * @returns {string}
 */
export function createID(length = 8) {
	return `${createPart(length / 4)}-${createPart(length / 4)}`
}

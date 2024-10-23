import { Buffer } from 'node:buffer'
import lzString from 'lz-string'

export function urlsafeEncode(string) {
  return lzString.compressToEncodedURIComponent(string)
}

export function urlsafeDecode(string) {
  return lzString.decompressFromEncodedURIComponent(string)
}

export function encode(string) {
  const compressed = lzString.compress(string)
  const buffer = Buffer.from(compressed)
  const base64 = buffer.toString('base64')

  return base64
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, '') // Remove ending '='
}

export function decode(b64) {
  // Add removed at end '='
  // let base64 = b64 + Array(5 - (b64.length % 4)).join('=')
  const base64 = b64
    .replace(/\-/g, '+') // Convert '-' to '+'
    .replace(/\_/g, '/') // Convert '_' to '/'

  const string = Buffer.from(base64, 'base64').toString()
  const decompressed = lzString.decompress(string)
  return decompressed
}

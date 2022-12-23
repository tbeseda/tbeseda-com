import randomIconMiddleWare from '../middleware/random-icon.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler(req) {
  return {
    // @ts-ignore
    json: { icon: req.state.icon || '😵‍💫' }
  }
}

export const get = [randomIconMiddleWare, getHandler]

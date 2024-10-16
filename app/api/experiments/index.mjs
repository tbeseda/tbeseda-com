import { getCodeExperiments } from '../../lib/sanity-client.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
export const get = async () => {
  const experiments = await getCodeExperiments()
  console.log('experiments', experiments)

  return {
    json: {
      icon: '👨🏻‍🔬', // overrides preflight
      experiments,
    },
  }
}

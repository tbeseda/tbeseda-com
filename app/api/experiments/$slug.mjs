import { getCodeExperimentBySlug } from '../../lib/sanity-client.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
export const get = async ({ timers, params: { slug } }) => {
  timers.start('codeExperiment-query', 'tb-codeExperiment-query')
  const codeExperiment = await getCodeExperimentBySlug(slug)
  const queryTime = timers.stop('codeExperiment-query')

  timers.stop('total')
  return {
    headers: { ...timers.object() },
    json: {
      codeExperiment,
      queryTime,
      timers,
    },
  }
}

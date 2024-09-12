const omnivore = require('./seed-data/omnivore')
const myAqi = require('./seed-data/my-aqi')
// const articles = require('./seed-data/bedrock-articles')
const articles = require('./seed-data/production-articles')
const webmentions = require('./seed-data/webmentions')

module.exports = {
  articles,
  webmentions,
  things: [...omnivore.things, ...myAqi.things],
}

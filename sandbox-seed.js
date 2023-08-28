const omnivore = require('./seed-data/omnivore')
const vrite = require('./seed-data/vrite')
const myAqi = require('./seed-data/my-aqi')
const articles = require('./seed-data/articles')
const webmentions = require('./seed-data/webmentions')

module.exports = {
	articles,
	webmentions,
	things: [...omnivore.things, ...vrite.things, ...myAqi.things],
}

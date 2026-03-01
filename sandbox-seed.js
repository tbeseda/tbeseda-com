const myAqi = require('./seed-data/my-aqi')
const articles = require('./seed-data/production-articles')

module.exports = {
  articles,
  things: [...myAqi.things],
}

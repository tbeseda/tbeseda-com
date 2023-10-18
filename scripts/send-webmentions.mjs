let WEBMENTION_ENDPOINT = 'https://events.hookdeck.com/e/src_l6ylDkDiqo9u'
WEBMENTION_ENDPOINT = 'https://making-2c4.begin.app/webmention'

const sampleWebMention = {
  source: 'https://tbeseda.com/articles/2023/01/webmention-test',
  target: 'https://making-2c4.begin.app/'
}

const response = await fetch(WEBMENTION_ENDPOINT, {
  method: 'POST',
  body: new URLSearchParams(sampleWebMention)
})

const body = await response.text()

console.log(body)

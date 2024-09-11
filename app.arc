@app
tbeseda-com

@aws
region us-east-1
runtime nodejs20.x
architecture arm64

@plugins
enhance/arc-plugin-enhance
architect/plugin-lambda-invoker
# architect/plugin-go
# architect/plugin-python
# architect/plugin-ruby
# architect/plugin-rust

@http
# get  /.well-known/webfinger # ActivityPub webfinger
# get  /tbeseda               #      •      actor
# get  /api/followers         #      •      followers
# get  /api/following         #      •      following
# get  /api/inbox             #      •      admin inbox log
# get  /api/outbox            #      •      outbox activities
# post /api/inbox             #      •      inbound activity
get  /robots.txt
post /webmention            # inbound webmention
post /webhooks/vrite        # vrite incoming
post /webhooks/omnivore     # omnivore incoming
get  /api/skull             # skull drawing experiment
get  /pong                  # ping
# get  /test/golang           # golang test
# get  /test/python           # python test
# get  /test/ruby             # ruby test
# get  /test/rust             # rust test
get /og-img/:slug

@bundles
enhance-ssr-playground 'src/browser/enhance-ssr-playground.mjs'
my-milkdown-editor 'src/browser/my-milkdown-editor.mjs'
my-quill-editor 'src/browser/my-quill-editor.mjs'
my-tiptap-editor 'src/browser/my-tiptap-editor.mjs'
simple-xterm 'src/browser/simple-xterm.mjs'
quill.core 'node_modules/quill/dist/quill.core.css'
quill.snow 'node_modules/quill/dist/quill.snow.css'
server-timings 'node_modules/server-timings-elem/server-timings.js'
snow-fall 'node_modules/@zachleat/snow-fall/snow-fall.js'
xterm 'node_modules/xterm/css/xterm.css'

@static
fingerprint true # required by Enhance
ignore .uploaded-images # blog images
prune true

@events
# webmention-send
webmention-receive

@scheduled
aqi-update rate(30 minutes)
spotify-update rate(3 minutes)
spotify-token-refresh rate(50 minutes)
tomorrow-io-update rate(10 minutes)
get-dark-visitors rate(1 day)

@tables
articles
  articleID *String
  PointInTimeRecovery true
webmentions
  id *String
  targetPath **String
things # misc storage
  key *String
experiment-articles # /experiments/fake-articles
  articleID *String
  ttl TTL
users
  email *String
  ttl TTL

@tables-indexes
articles
  slug *String
  name articlesBySlug
webmentions
  targetPath *String
  name mentionsByPath
things
  type *String
  name thingsByType

@begin
# appID D1M9ZCD5

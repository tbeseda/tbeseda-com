@app
tbeseda-com

@plugins
# enhance/arc-plugin-enhance
architect/plugin-lambda-invoker
# architect/plugin-rust
# architect/plugin-go

@http
# get  /.well-known/webfinger # ActivityPub webfinger
# get  /tbeseda               #      •      actor
# get  /api/followers         #      •      followers
# get  /api/following         #      •      following
# get  /api/inbox             #      •      admin inbox log
# get  /api/outbox            #      •      outbox activities
# post /api/inbox             #      •      inbound activity
post /webmention            # inbound webmention
post /webhooks/vrite        # vrite incoming
post /webhooks/omnivore     # omnivore incoming
get  /api/skull             # skull drawing experiment
get  /pong                  # ping
# get  /test/golang           # golang test
# get  /test/python           # python test
# get  /test/ruby             # ruby test
# get  /test/rust             # rust test
any /*
get /_public/*

@bundles
xterm /node_modules/xterm/css/xterm.css
server-timings node_modules/server-timings-elem/server-timings.js
snow-fall 'node_modules/@zachleat/snow-fall/snow-fall.js'
my-milkdown-editor /app/lib/my-milkdown-editor.mjs
create-enhance-html /app/lib/create-enhance-html.mjs

@static
ignore .uploaded-images # blog images
prune true

@events
# webmention-send
webmention-receive

@scheduled
aqi-update rate(30 minutes)
spotify-update rate(1 minute)
spotify-token-refresh rate(50 minutes)
tomorrow-io-update rate(10 minutes)

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

@aws
region us-east-1
runtime nodejs20.x
architecture arm64

@begin
# appID D1M9ZCD5

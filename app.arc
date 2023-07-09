@app
tbeseda-com

@plugins
enhance/arc-plugin-enhance
architect/plugin-lambda-invoker

@http
get /.well-known/webfinger
get /tbeseda               # ActivityPub actor
get /api/followers         #      •      followers
get /api/following         #      •      following
get /api/inbox             #      •      admin inbox log
get /api/outbox            #      •      outbox activities
post /api/inbox            #      •      inbound activity
post /webmention           # inbound webmention
post /webhooks/vrite       # vrite incoming

@bundles
xterm './node_modules/xterm/css/xterm.css'

@static
prune true

@events
# webmention-send
webmention-receive

@scheduled
aqi-update rate(1 hour)
spotify-update rate(1 minute)
spotify-token-refresh rate(50 minutes)

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
runtime nodejs18.x
architecture arm64

@begin
# appID D1M9ZCD5

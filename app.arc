@app
tbeseda-com

@plugins
enhance/arc-plugin-enhance
architect/plugin-lambda-invoker
render-articles

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

@events
# webmention-send
webmention-receive

@scheduled
aqi-update rate(1 hour)

@tables
webmentions
  id *String
  targetPath **String
things # misc storage
  key *String

@tables-indexes
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

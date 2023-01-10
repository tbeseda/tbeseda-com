@app
tbeseda-com

@http
get /bench
get /.well-known/webfinger #
get /tbeseda               # ActivityPub actor
get /api/followers         #      •      followers
get /api/following         #      •      following
get /api/inbox             #      •      admin inbox log
get /api/outbox            #      •      outbox activities
post /api/inbox            #      •      inbound activity
post /webmention           # inbound webmention

@events
# webmention-send
webmention-receive

@plugins
enhance/arc-plugin-enhance
render-articles

@static
fingerprint true
prune true

@enhance-styles
config ./enhance-styles.json

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

@aws
region us-east-1
runtime nodejs18.x
architecture arm64
timeout 10 # unsure if this works at project level

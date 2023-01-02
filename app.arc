@app
tbeseda-com

@http
get /bench

@plugins
enhance/arc-plugin-enhance
render-articles

@static
fingerprint true
prune true

@enhance-styles
config ./enhance-styles.json

@tables
things
  thingID *String

@aws
region us-east-1
runtime nodejs18.x
architecture arm64
timeout 10 # unsure if this works at project level

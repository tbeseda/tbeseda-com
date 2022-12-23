@app
tbeseda-com

@plugins
enhance/arc-plugin-enhance

@static
fingerprint true
prune true

@enhance-styles
config ./enhance-styles.json

@http
post /

@scheduled
# update-things rate(1 hour)

@tables
things
  thingID *String

@aws
region us-east-1
runtime nodejs18.x
architecture arm64
timeout 10 # unsure if this works at project level

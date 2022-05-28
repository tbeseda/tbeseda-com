@app
tbeseda-com

@aws
region us-east-1
runtime nodejs16.x

@static
fingerprint true
prune true

@http
get /
post /

@scheduled
update-things rate(1 hour)

@tables
things
  thingID *String

@plugins
arc-plugin-tailwindcss
architect/plugin-bundles
architect/plugin-lambda-invoker

@bundles
"base-element" "/node_modules/@enhance/base-element/index.mjs"

@tailwindcss
src src/styles/index.css
minify true

@app
tbeseda-com

@aws
region us-east-1

@static
fingerprint true
prune true

@views

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
architect/plugin-lambda-invoker

@tailwindcss
src src/styles/index.css
minify true

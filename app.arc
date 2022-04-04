@app
tbeseda-com

@static
fingerprint true

@views

@http
get /

@scheduled
update-fortnite rate(1 hour)
update-github rate(1 hour)
update-letterboxd rate(1 hour)

@tables
things
  thingID *String

@plugins
arc-plugin-tailwindcss
architect/plugin-lambda-invoker

@tailwindcss
src src/styles/index.css
minify true

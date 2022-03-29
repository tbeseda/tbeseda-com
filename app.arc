@app
tbeseda-com

@static

@views

@http
get /

@scheduled
update-fortnite rate(5 minutes)
update-github rate(5 minutes)
update-letterboxd rate(5 minutes)

@tables
things
  thingID *String

@plugins
arc-plugin-tailwindcss
architect/plugin-lambda-invoker

@tailwindcss
minify true

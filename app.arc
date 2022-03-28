@app
tbeseda-com

@http
get /

@scheduled
update-fortnite rate(5 minutes)

@tables
things
  thingID *String

@plugins
architect/plugin-lambda-invoker

# def handler(req, context)
def handler(req)
  {
    statusCode: 200,
    headers: {
      'content-type': 'application/json; charset=utf8'
    },
    body: {
      hello: 'world'
    }.to_json
  }
end

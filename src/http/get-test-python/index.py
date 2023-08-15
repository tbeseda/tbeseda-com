import arc

def handler(req, context):
    return arc.http.res(req, {"hello": "world"})

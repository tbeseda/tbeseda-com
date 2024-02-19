export async function get(req) {
  return { status: 200, text: 'GET' }
}
export async function post(req) {
  return { status: 200, text: 'POST' }
}
export async function put(req) {
  return { status: 200, text: 'PUT' }
}
export async function patch(req) {
  return { status: 200, text: 'PATCH' }
}
export async function destroy(req) {
  return { status: 200, text: 'destroy' }
}

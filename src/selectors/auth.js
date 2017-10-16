export function selectAuthToken(state) {
  return state.auth.get('accessToken')
}
export function selectAuthIsLoggedIn(state) {
  return state.auth.get('status') === 'authenticated'
}
export function selectAuthIsLoading(state) {
  return state.auth.get('status') === 'pending'
}
export function selectAuthError(state) {
  return state.auth.get('error')
}

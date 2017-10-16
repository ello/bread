import { AUTHENTICATION } from '../constants/action_types'

export function bootstrapSuccess(payload) {
  return { type: AUTHENTICATION.BOOTSTRAP_SUCCESS, payload }
}

export function refresh(payload) {
  return { type: AUTHENTICATION.REFRESH, payload }
}

export function bootstrap() {
  return { type: AUTHENTICATION.BOOTSTRAP, payload: {} }
}

export function signIn(email, password) {
  return { type: AUTHENTICATION.SIGN_IN, payload: { email, password } }
}

export function signOut() {
  return { type: AUTHENTICATION.SIGN_OUT, payload: {} }
}

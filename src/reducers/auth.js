import Immutable from 'immutable'
import { AUTHENTICATION } from '../constants/action_types'

const DEFAULT_STATE = Immutable.Map({
  status: 'unauthenticated',
  token: null,
  refreshToken: null,
  expiresAt: null,
  error: null,
})

function tokenLoading(state) {
  return state.set('status', 'pending');
}

function tokenSuccess(state, { payload }) {
  const {
    access_token: accessToken,
    refresh_token: refreshToken,
    created_at: createdAt,
    expires_in: expiresIn,
  } = payload.response
  const expiresAt = createdAt + expiresIn

  // Set localStorage because that is how app currently is wired to get token.
  // This should eventually be accessed via state and we can use redux persist.
  localStorage.setItem('ello_access_token', accessToken)
  localStorage.setItem('ello_refresh_token', refreshToken)
  localStorage.setItem('ello_token_expires', expiresAt)

  return state.merge({
    status: 'authenticated', accessToken, refreshToken, expiresAt,
  })
}

function bootstrapToken(state, { payload }) {
  const { accessToken, refreshToken, expiresAt } = payload
  return state.merge({
    status: 'authenticated', accessToken, refreshToken, expiresAt,
  })
}

function tokenFailure(state) {
  return state.merge({
    status: 'unauthenticated',
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
    error: 'Unable to authenticate',
  })
}

function clearToken() {
  localStorage.removeItem('ello_access_token')
  localStorage.removeItem('ello_refresh_token')
  localStorage.removeItem('ello_token_expires')
  return DEFAULT_STATE
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case AUTHENTICATION.SIGN_IN:
    case AUTHENTICATION.REFRESH:
      return tokenLoading(state, action)
    case AUTHENTICATION.SIGN_IN_SUCCESS:
    case AUTHENTICATION.REFRESH_SUCCESS:
      return tokenSuccess(state, action)
    case AUTHENTICATION.BOOTSTRAP_SUCCESS:
      return bootstrapToken(state, action)
    case AUTHENTICATION.SIGN_IN_FAILURE:
    case AUTHENTICATION.REFRESH_FAILURE:
      return tokenFailure(state, action)
    case AUTHENTICATION.SIGN_OUT_SUCCESS:
    case AUTHENTICATION.SIGN_OUT_FAILURE:
      return clearToken(state, action)
    default:
      return state
  }
}

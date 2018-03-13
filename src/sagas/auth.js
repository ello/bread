/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
import { fork, take, call, put, all } from 'redux-saga/effects'
import immutableTransform from 'redux-persist-transform-immutable'
import { authenticatedRequest, tokenRequest } from './api'
import { AUTHENTICATION, REHYDRATE } from '../constants/action_types'
import {
  bootstrapSuccess,
  bootstrapFailure,
  refresh,
} from '../actions/authentication'

function* signInSaga() {
  while (true) {
    const action = yield take(AUTHENTICATION.SIGN_IN)
    const { email, password } = action.payload

    const body = { grant_type: 'password', email, password }
    yield call(tokenRequest, body, action)
  }
}

// Check localStorage for webapp auth token.
// If it exists, parse it to immutable data structure, check if logged in & valid.
// Never set refresh token from webapp, as it can only be used once.
function* bootstrapFromWebapp() {
  const webappAuthRaw = localStorage.getItem('reduxPersist:authentication')
  if (!webappAuthRaw) { return yield put(bootstrapFailure()) }
  const webappAuth = immutableTransform().out(JSON.parse(webappAuthRaw))
  const isLoggedIn = webappAuth.get('isLoggedIn')
  const accessToken = webappAuth.get('accessToken')
  const expiresAt = webappAuth.get('expirationDate').valueOf()

  if (isLoggedIn && accessToken && (expiresAt > Date.now())) {
    yield put(bootstrapSuccess({ accessToken, refreshToke: null, expiresAt }))
  } else {
    yield put(bootstrapFailure())
  }
}

function* rehydrateSaga() {
  while (true) {
    const { payload } = yield take(REHYDRATE)
    if (payload && payload.auth) {
      const accessToken = payload.auth.get('accessToken')
      const refreshToken = payload.auth.get('refreshToken')
      const expiresAt = payload.auth.get('expiresAt')

      // Prefer existing, valid token.
      if (accessToken && (expiresAt > Date.now())) {
        yield put(bootstrapSuccess({ accessToken, refreshToken, expiresAt }))
      // Secondary is valid refresh token.
      } else if (refreshToken) {
        yield put(refresh({ refreshToken }))
      // Tertiary is using webapp token.
      } else {
        yield call(bootstrapFromWebapp)
      }
    } else {
      yield call(bootstrapFromWebapp)
    }
  }
}

function* refreshSaga() {
  while (true) {
    const action = yield take(AUTHENTICATION.REFRESH)
    const { refreshToken } = action.payload

    const body = { grant_type: 'refresh_token', refresh_token: refreshToken }
    yield call(tokenRequest, body, action)
  }
}


function* signOutSaga() {
  while (true) {
    const action = yield take(AUTHENTICATION.SIGN_OUT)
    yield call(authenticatedRequest, 'DELETE', '/api/oauth/logout', null, action)
  }
}

export default function* authentication() {
  yield all([
    fork(rehydrateSaga),
    fork(signInSaga),
    fork(refreshSaga),
    fork(signOutSaga),
  ])
}

/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
import { fork, take, call, put, all } from 'redux-saga/effects'
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

function* rehydrateSaga() {
  while (true) {
    const { payload } = yield take(REHYDRATE)
    if (payload && payload.auth) {
      const accessToken = payload.auth.get('accessToken')
      const refreshToken = payload.auth.get('refreshToken')
      const expiresAt = payload.auth.get('expiresAt')

      if (accessToken && (expiresAt * 1000 > Date.now())) {
        yield put(bootstrapSuccess({ accessToken, refreshToken, expiresAt }))
      } else if (refreshToken) {
        yield put(refresh({ refreshToken }))
      } else {
        yield put(bootstrapFailure())
      }
    } else {
      yield put(bootstrapFailure())
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

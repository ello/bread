/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
import { fork, take, call, put, all } from 'redux-saga/effects'
import { authenticatedRequest, tokenRequest } from './api'
import { AUTHENTICATION } from '../constants/action_types'
import {
  bootstrapSuccess,
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

// TODO: Replace with redux-persist
function* bootstrapSaga() {
  while (true) {
    yield take(AUTHENTICATION.BOOTSTRAP)

    const accessToken = localStorage.getItem('ello_access_token')
    const refreshToken = localStorage.getItem('ello_refresh_token')
    const expiresAt = localStorage.getItem('ello_token_expires')

    if (accessToken && (expiresAt * 1000 > Date.now())) {
      yield put(bootstrapSuccess({ accessToken, refreshToken, expiresAt }))
    } else if (refreshToken) {
      yield put(refresh({ refreshToken }))
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
    fork(bootstrapSaga),
    fork(signInSaga),
    fork(refreshSaga),
    fork(signOutSaga),
  ])
}

import { all, fork } from 'redux-saga/effects'
import authSaga from './auth'
import requesterSaga from './requester'

export default function* root() {
  yield all([
    fork(authSaga),
    fork(requesterSaga),
  ])
}

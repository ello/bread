import { all, fork } from 'redux-saga/effects'
import authSaga from './auth'

export default function* root() {
  yield all([
    fork(authSaga),
  ])
}

/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
import { fork, take, call, all } from 'redux-saga/effects'
import { authenticatedRequest } from './api'
import { ARTIST_INVITES } from '../constants/action_types'

const requestTypes = [
  ARTIST_INVITES.LOAD,
]

function* requester() {
  while (true) {
    const action = yield take(requestTypes)
    const { endpoint, method, body } = action.payload

    yield call(authenticatedRequest, method, endpoint, body, action)
  }
}

export default function* main() {
  yield all([
    fork(requester),
  ])
}

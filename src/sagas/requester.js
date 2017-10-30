/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
import { fork, take, all } from 'redux-saga/effects'
import { authenticatedRequest } from './api'
import { ARTIST_INVITES } from '../constants/action_types'

const requestTypes = [
  ARTIST_INVITES.LOAD,
  ARTIST_INVITES.LOAD_TOTAL_SUBMISSIONS,
]

function* requester() {
  while (true) {
    const action = yield take(requestTypes)
    const { endpoint, method, body } = action.payload

    yield fork(authenticatedRequest, method, endpoint, body, action)
  }
}

export default function* main() {
  yield all([
    fork(requester),
  ])
}

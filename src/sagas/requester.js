/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
import { fork, take, all } from 'redux-saga/effects'
import { authenticatedRequest } from './api'
import { ARTIST_INVITES } from '../constants/action_types'

const requestTypes = [
  ARTIST_INVITES.LOAD,
  ARTIST_INVITES.LOAD_TOTAL_SUBMISSIONS,
  ARTIST_INVITES.LOAD_DAILY_SUBMISSIONS,
  ARTIST_INVITES.LOAD_TOTAL_PARTICIPANTS,
  ARTIST_INVITES.LOAD_DAILY_IMPRESSIONS,
  ARTIST_INVITES.LOAD_TOTAL_IMPRESSIONS,
  ARTIST_INVITES.LOAD_NETWORK_ACTIVITIES,
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

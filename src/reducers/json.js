import Immutable from 'immutable'
import * as ACTION_TYPES from '../constants/action_types'
import { parseJSONApi } from '../helpers/json'


function mergeDataFromServer(state, response) {
  return state.mergeDeepWith((a, b) => (b === null ? a : b), parseJSONApi(response, state))
}

function totalParticipants(state, action) {
  const updatedResponse = action.payload.response['total_participants'].map(function(partObj) {
    return Object.assign(partObj, { label: `${partObj.type}\n${partObj.participants}` })
  })
  return state.mergeDeepWith((a, b) => (b === null ? a : b), parseJSONApi(updatedResponse, state))
}

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case ACTION_TYPES.ARTIST_INVITES.LOAD_TOTAL_PARTICIPANTS_SUCCESS:
      return totalParticipants(state, action)
    case ACTION_TYPES.ARTIST_INVITES.LOAD_TOTAL_SUBMISSIONS_SUCCESS:
    case ACTION_TYPES.ARTIST_INVITES.LOAD_DAILY_SUBMISSIONS_SUCCESS:
    case ACTION_TYPES.ARTIST_INVITES.LOAD_SUCCESS:
      return mergeDataFromServer(state, action.payload.response)
    default:
      return state
  }
}

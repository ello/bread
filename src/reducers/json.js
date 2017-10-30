import Immutable from 'immutable'
import * as ACTION_TYPES from '../constants/action_types'
import { parseJSONApi } from '../helpers/json'


function mergeDataFromServer(state, response) {
  return state.mergeDeepWith((a, b) => (b === null ? a : b), parseJSONApi(response, state))
}

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case ACTION_TYPES.ARTIST_INVITES.LOAD_TOTAL_SUBMISSIONS_SUCCESS:
    case ACTION_TYPES.ARTIST_INVITES.LOAD_SUCCESS:
      return mergeDataFromServer(state, action.payload.response)
    default:
      return state
  }
}

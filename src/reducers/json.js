import Immutable from 'immutable'
import * as ACTION_TYPES from '../constants/action_types'
import { parseJSONApi } from '../helpers/json'


function mergeDataFromServer(state, response) {
  return state.mergeDeepWith((a, b) => (b === null ? a : b), parseJSONApi(response, state))
}

function totalParticipants(state, action) {
  const totalPart = action.payload.response['total_participants'] || []
  const updatedResponse = { 'total_participants': mergeVictoryLabel(totalPart, 'type', 'participants') }
  return mergeDataFromServer(state, updatedResponse)
}

function totalSubmissions(state, action) {
  const totalSubs = action.payload.response['total_submissions'] || []
  const updatedResponse = { 'total_submissions': mergeVictoryLabel(totalSubs, 'status', 'submissions') }
  return mergeDataFromServer(state, updatedResponse)
}

function mergeVictoryLabel(collection, labelName, labelValue) {
  return collection.map(function(obj) {
    return Object.assign(obj, { label: `${obj[labelName]}\n${obj[labelValue]}` })
  })
}

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case ACTION_TYPES.ARTIST_INVITES.LOAD_TOTAL_PARTICIPANTS_SUCCESS:
      return totalParticipants(state, action)
    case ACTION_TYPES.ARTIST_INVITES.LOAD_TOTAL_SUBMISSIONS_SUCCESS:
      return totalSubmissions(state, action)
    case ACTION_TYPES.ARTIST_INVITES.LOAD_DAILY_SUBMISSIONS_SUCCESS:
    case ACTION_TYPES.ARTIST_INVITES.LOAD_DAILY_IMPRESSIONS_SUCCESS:
    case ACTION_TYPES.ARTIST_INVITES.LOAD_TOTAL_IMPRESSIONS_SUCCESS:
    case ACTION_TYPES.ARTIST_INVITES.LOAD_SUCCESS:
      return mergeDataFromServer(state, action.payload.response)
    default:
      return state
  }
}

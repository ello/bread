import Immutable from 'immutable'

export function selectArtistInvites(state) {
  return state.json.get('artistInvites', Immutable.Map())
}

export function selectArtistInvite(state, id) {
  return selectArtistInvites(state).get(id, Immutable.Map())
}

export function selectTotalApprovedSubmissions(state, id) {
  return state.json.getIn(['totalSubmissions', `total_submissions:${id}:approved:total`], Immutable.Map())
}

export function selectTotalUnapprovedSubmissions(state, id) {
  return state.json.getIn(['totalSubmissions', `total_submissions:${id}:unapproved:total`], Immutable.Map())
}

export function selectTotalDeclinedSubmissions(state, id) {
  return state.json.getIn(['totalSubmissions', `total_submissions:${id}:declined:total`], Immutable.Map())
}

export function selectTotalSelectedSubmissions(state, id) {
  return state.json.getIn(['totalSubmissions', `total_submissions:${id}:selected:total`], Immutable.Map())
}

export function selectDailySubmissions(state, id) {
  return state.json.get('dailySubmissions', Immutable.Map()).filter(sub => sub.get('artistInviteId') === id)
}

export function selectInfluentialParticipants(state, id) {
  return state.json.getIn(['totalParticipants', `total_participants:${id}:Influencer:total`], Immutable.Map())
}

export function selectNormalParticipants(state, id) {
  return state.json.getIn(['totalParticipants', `total_participants:${id}:Normal:total`], Immutable.Map())
}

export function selectDailyImpressions(state, id) {
  return state.json.get('dailyImpressions', Immutable.Map()).filter(sub => sub.get('artistInviteId') === id)
}

export function selectTotalImpressions(state, id) {
  return state.json.getIn(['totalImpressions', `total_impressions:${id}:all`], Immutable.Map())
}

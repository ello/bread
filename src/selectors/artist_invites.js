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

export function selectTotalSubmissions(state, id) {
  return selectTotalDeclinedSubmissions(state, id).get('submissions', 0)
    + selectTotalUnapprovedSubmissions(state, id).get('submissions', 0)
    + selectTotalApprovedSubmissions(state, id).get('submissions', 0)
    + selectTotalSelectedSubmissions(state, id).get('submissions', 0)
}

export function selectDailySubmissions(state, id) {
  return state.json.get('dailySubmissions', Immutable.OrderedMap())
    .filter(sub => sub.get('artistInviteId') === id)
    .sortBy(sub => sub.get('date'))
}

export function selectInfluentialParticipants(state, id) {
  return state.json.getIn(['totalParticipants', `total_participants:${id}:Influencer:total`], Immutable.Map())
}

export function selectNormalParticipants(state, id) {
  return state.json.getIn(['totalParticipants', `total_participants:${id}:Normal:total`], Immutable.Map())
}

export function selectDailyImpressions(state, id) {
  return state.json.get('dailyImpressions', Immutable.OrderedMap())
    .filter(sub => sub.get('artistInviteId') === id)
    .sortBy(sub => sub.get('date'))
}

export function selectTotalImpressions(state, id) {
  return state.json.getIn(['totalImpressions', `total_impressions:${id}:all`], Immutable.Map())
}

export function selectCommentActivity(state, id) {
  return state.json.getIn(['totalActivities', `total_activities:${id}:comments`], Immutable.Map())
}

export function selectFollowerActivity(state, id) {
  return state.json.getIn(['totalActivities', `total_activities:${id}:followers`], Immutable.Map())
}

export function selectLoveActivity(state, id) {
  return state.json.getIn(['totalActivities', `total_activities:${id}:loves`], Immutable.Map())
}

export function selectMentionActivity(state, id) {
  return state.json.getIn(['totalActivities', `total_activities:${id}:mentions`], Immutable.Map())
}

export function selectRepostActivity(state, id) {
  return state.json.getIn(['totalActivities', `total_activities:${id}:reposts`], Immutable.Map())
}

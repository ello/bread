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

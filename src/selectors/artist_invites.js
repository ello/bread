import Immutable from 'immutable'

export function selectArtistInvites(state) {
  return state.json.get('artistInvites', Immutable.Map())
}

export function selectArtistInvite(state, id) {
  return selectArtistInvites(state).get(id, Immutable.Map())
}

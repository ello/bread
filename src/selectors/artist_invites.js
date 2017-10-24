import Immutable from 'immutable'

export function selectArtistInvites(state) {
  return state.json.get('artistInvites', Immutable.Map())
}


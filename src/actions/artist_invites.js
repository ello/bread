import { ARTIST_INVITES } from '../constants/action_types'

export function loadArtistInvites() {
  return {
    type: ARTIST_INVITES.LOAD,
    payload: {
      endpoint: '/api/v2/manage/artist-invites',
      method: 'GET',
    },
  }
}

export function loadArtistInvite(id) {
  return {
    type: ARTIST_INVITES.LOAD,
    payload: {
      endpoint: `/api/v2/manage/artist-invites/${id}`,
      method: 'GET',
    },
  }
}

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

export function loadTotalSubmissions(id) {
  return {
    type: ARTIST_INVITES.LOAD_TOTAL_SUBMISSIONS,
    payload: {
      endpoint: `/api/v2/manage/artist-invites/${id}/total-submissions`,
      method: 'GET',
    },
  }
}

export function loadDailySubmissions(id) {
  return {
    type: ARTIST_INVITES.LOAD_DAILY_SUBMISSIONS,
    payload: {
      endpoint: `/api/v2/manage/artist-invites/${id}/daily-submissions`,
      method: 'GET',
    },
  }
}

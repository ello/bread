import { call, put, select } from 'redux-saga/effects'
import { selectAuthToken } from '../selectors/auth'
import { OAUTH_CLIENT_ID } from '../env'

function mergeSuccessAction({ type, payload }, response) {
  return {
    type: `${type}_SUCCESS`,
    payload: { ...payload, response },
  }
}
function mergeFailureAction({ type, payload }, response) {
  return {
    type: `${type}_FAILURE`,
    payload: { ...payload, response },
  }
}

function parseJSON(response) {
  let json = {}
  if ((response.status === 200 || response.status === 201 || response.status === 422) &&
      /application\/json/.test(response.headers.get('content-type'))) {
    json = response ? response.json() : response
  }

  return json
}

// Make any API request, trigger callbacks and success actions if applicable.
export function* request(url, options, action = {}) {
  const { type, meta } = action
  const { onSuccess, onFailure } = meta || {}
  const response = yield call(fetch, url, options)
  const json = yield call(parseJSON, response)
  if (response.ok) {
    if (onSuccess) { onSuccess(json) }
    if (type) { yield put(mergeSuccessAction(action, json)) }
  } else {
    if (onFailure) { onFailure(json) }
    if (type) { yield put(mergeFailureAction(action, json)) }
  }
  return json
}

// Helper function that just makes a /api/oauth/token request
export function* tokenRequest(body, action = {}) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ ...body, client_id: OAUTH_CLIENT_ID }),
  }
  return yield call(request, `/api/oauth/token`, options, action)
}

// Helper function to make an authenticated API request
export function* authenticatedRequest(method, path, body, action = {}) {
  const token = yield select(selectAuthToken)
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  if (body) {
    options.body = JSON.stringify(body)
  }
  return yield call(request, path, options, action)
}

export default authenticatedRequest

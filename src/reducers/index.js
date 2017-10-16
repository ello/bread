import { combineReducers } from 'redux'
import json from './json'
import auth from './auth'

export default combineReducers({
  json, auth,
})

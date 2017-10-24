import Immutable, { fromJS } from 'immutable'
import { camelize } from 'humps'

function camelizeKeys(original) {
  return Object.keys(original).reduce((model, key) => {
    return model.set(camelize(key), fromJS(original[key]))
  }, Immutable.Map())
}

function mergeModels(models, originalState) {
  if (Array.isArray(models)) {
    return models.reduce((state, model) => {
      return state.set(`${model.id}`, camelizeKeys(model))
    }, originalState)
  }
  return originalState.set(`${models.id}`, camelizeKeys(models))
}

export function parseJSONApi(json, originalState) {
  return Object.keys(json).reduce((state, key) => {
    switch (key) {
      case 'linked':
        return parseJSONApi(json['linked'], state)
      default:
        const camelized = camelize(key)
        const existingState = state.get(camelized, Immutable.Map())
        return state.set(camelized, mergeModels(json[key], existingState))
    }
  }, originalState)
}

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/lib/integration/react'
import immutableTransform from 'redux-persist-transform-immutable'
import App from './App';
import reducers from './reducers'
import sagas from './sagas'
import { APP_DEBUG } from './env'

// Import CSS reset and Global Styles
import './constants/styled/global'

const logConfig = {
  collapsed: true,
  predicate: () => APP_DEBUG,
  stateTransformer: (state) => {
    const newState = {}
    Object.keys(state).forEach((key) => {
      if (key === '_persist') {
        newState[key] = state[key]
      } else {
        newState[key] = state[key].toJS()
      }
    })
    return newState
  }
}
const logger = createLogger(logConfig)

const sagaMiddleWare = createSagaMiddleware()
const persistConfig = {
  key: 'bread',
  storage,
  transforms: [immutableTransform()],
}
const appReducer = persistReducer(persistConfig, reducers)

const store = createStore(appReducer, applyMiddleware(sagaMiddleWare, logger))
let persistor = persistStore(store)

sagaMiddleWare.run(sagas)

const root = document.getElementById('root')
const app = (
  <Provider store={store}>
    <PersistGate
      persistor={persistor}
      loading={<em>Loading</em>}
      >
      <App />
    </PersistGate>
  </Provider>
)

ReactDOM.render(app, root);

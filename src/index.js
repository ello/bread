import React from 'react';
import { Router, Route, browserHistory } from 'react-router'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import './index.css';
import App from './App';
import AuthContainer from './components/AuthContainer';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers'
import sagas from './sagas'

const logConfig = { collapsed: true }
logConfig.stateTransformer = (state) => {
  const newState = {}
  Object.keys(state).forEach((key) => {
    newState[key] = state[key].toJS()
  })
  return newState
}
const logger = createLogger(logConfig)

const sagaMiddleWare = createSagaMiddleware()

const store = createStore(reducers, applyMiddleware(sagaMiddleWare, logger))

sagaMiddleWare.run(sagas)

const root = document.getElementById('root')
const app = (
  <Provider store={store}>
    <AuthContainer>
      <App />
    </AuthContainer>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

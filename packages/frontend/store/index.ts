import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import { ClientReducer } from './client';

// // --- Setting up Redux & Redux Dev Tools
// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export const testa = function (params: any) {
  console.log(params);
};

export const store = createStore(
  combineReducers({
    clients: ClientReducer
  }),
  {},
  compose(applyMiddleware(sagaMiddleware))
);

// sagaMiddleware.run(function* () {
//   yield all([clientsSaga()]);
// });

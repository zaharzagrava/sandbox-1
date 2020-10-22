import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './utils/reset.scss';

// // --- Importing Redux
// import { createStore, compose } from 'redux';
// import { Provider } from 'react-redux';
// import RootReducer from './redux/';

// // Importing react-router-dom
// import { BrowserRouter } from 'react-router-dom';

// // --- Setting up Redux & Redux Dev Tools
// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(RootReducer, composeEnhancers());

ReactDOM.render(
  <React.StrictMode>{/* <App /> */}</React.StrictMode>,
  document.getElementById('root')
);

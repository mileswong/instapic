import React from 'react';
import ReactDOM from 'react-dom';

import { Provider as ReduxProvider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './App';

import * as serviceWorker from './serviceWorker';
import reducers from './reducers';

import 'antd/dist/antd.css';
import './index.scss';


const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk),
);

ReactDOM.render((
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

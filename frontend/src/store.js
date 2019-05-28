import { applyMiddleware, createStore, combineReducers, compose } from 'redux';

import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import thunk from 'redux-thunk';

import reducers from './reducers';


const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  ...reducers,
})

export const history = createBrowserHistory();

export function configureStore() {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk,
      ),
    ),
  );

  return store
}

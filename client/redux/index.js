import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

import PostsReducer from './PostsReducer';
import PostsStatusReducer from './PostsStatusReducer';
import PostReducer from './PostReducer';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

let middleware = [
  // `withExtraArgument` gives us access to axios in our async action creators!
  // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
  thunkMiddleware.withExtraArgument({ axios }),
];
if (window) {
  // We'd like the redux logger to only log messages when it's running in the
  // browser, and not when we run the tests from within node
  middleware = [...middleware, createLogger({ collapsed: true })];
}

const appReducer = combineReducers({
  posts: PostsReducer,
  postsStatus: PostsStatusReducer,
  post: PostReducer,
});

/** We wrap the entire redux store in a root reducer with a special
 * action, RESET_STORE. It calls our application's reducer with
 * state = undefined. This will trigger each of our sub-reducers
 * to reset back to their initial state. This will come in
 * handy when we need to reset our redux store in between tests. */

const RESET_STORE = 'RESET_STORE';
export const resetStore = () => ({ type: RESET_STORE });
const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined;
    return appReducer(state, action);
  }
  return appReducer(state, action);
};

/* this initializes redux store at app start
    we need to attach the reducers which make state changes, and initialize the form fields and state
    this passes action creators (fetch, loading indicators, etc) etc to all components that are children of Provider
*/

const ConfigureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  return store;
};

export default ConfigureStore;

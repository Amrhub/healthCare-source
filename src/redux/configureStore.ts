import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import usersReducer from './users/users';

const reducer = combineReducers({
  users: usersReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

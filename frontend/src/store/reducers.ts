import { combineReducers } from 'redux';

import { usersReducer } from './Users';

export default combineReducers({
  users: usersReducer,
});

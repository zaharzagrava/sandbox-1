import { combineReducers } from 'redux';

import { sessionReducer } from './Session';
import { usersReducer } from './Users';

export default combineReducers({
  session: sessionReducer,
  users: usersReducer,
});

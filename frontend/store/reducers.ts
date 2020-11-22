import { combineReducers } from 'redux';

import { commentsReducer } from './Comments';
import { postsReducer } from './Posts';
import { sessionReducer } from './Session';
import { usersReducer } from './Users';

export default combineReducers({
  session: sessionReducer,
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
});

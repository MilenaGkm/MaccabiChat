import { combineReducers } from 'redux';
import conversations from './conversations';
import messages from './messages';
import users from './users';

const appReducer = combineReducers({
    users: users,
    conversations: conversations,
    messages: messages
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
      return appReducer(undefined, action)
    }
  
    return appReducer(state, action)
  }

export default rootReducer;
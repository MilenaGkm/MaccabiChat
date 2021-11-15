import { combineReducers } from 'redux';
import conversations from './conversations';
import messages from './messages';
import users from './users';

const rootReducer = combineReducers({
    users: users,
    conversations: conversations,
    messages: messages
});

export default rootReducer;
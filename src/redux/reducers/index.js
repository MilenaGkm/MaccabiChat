import { combineReducers } from 'redux';
// import user from './user';
import users from './users';

const rootReducer = combineReducers({
    // user: user,
    users: users,
});

export default rootReducer;
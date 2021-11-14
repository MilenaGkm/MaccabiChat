import * as type from '../types';

export function getUser(user) {
    return {
        type: type.GET_USER_REQUESTED,
        payload: user,
    }
}

export function getAllUsers(users) {
    return {
        type: type.GET_ALL_USERS_REQUESTED,
        payload: users,
    }
}
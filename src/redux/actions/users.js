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

export function loginUser(user) {
    return {
        type: type.LOGIN_REQUESTED,
        payload: user,
    }
}

export function signupUser(user) {
    return {
        type: type.SIGNUP_REQUESTED,
        payload: user,
    }
}
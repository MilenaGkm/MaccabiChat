import * as type from '../types';

const initialState = {
    user: {},
    users: [],
    userLoading: false,
    userError: null,
    loading: false,
    error: null,
}

export default function users(state = initialState, action) {
    switch (action.type) {
        case type.GET_USER_REQUESTED:
            return {
                ...state,
                userLoading: true,
            }
        case type.GET_USER_SUCCESS:
            return {
                ...state,
                userLoading: false,
                user: action.user
            }
        case type.GET_USER_FAILED:
            return {
                ...state,
                userLoading: false,
                userError: action.message,
            }
        case type.GET_ALL_USERS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.users
            }
        case type.GET_ALL_USERS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}
import * as type from '../types';

const initialState = {
    conversations: [],
    loading: false,
    error: null,
}

export default function conversations(state = initialState, action) {
    switch (action.type) {
        case type.GET_CONVERSATIONS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_CONVERSATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                conversations: action.conversations.data
            }
        case type.GET_CONVERSATIONS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}
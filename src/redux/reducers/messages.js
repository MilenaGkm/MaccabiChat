import * as type from '../types';

const initialState = {
    messages: [],
    loading: false,
    error: null,
}

export default function messages(state = initialState, action) {
    switch (action.type) {
        case type.GET_MESSAGES_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                messages: action.messages
            }
        case type.GET_MESSAGES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}
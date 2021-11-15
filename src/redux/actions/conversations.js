import * as type from '../types';

export function getUserConversations(userId) {
    return {
        type: type.GET_CONVERSATIONS_REQUESTED,
        payload: userId,
    }
}
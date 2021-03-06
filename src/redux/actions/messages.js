import * as type from '../types';

export function getConversationMessages(chatId) {
    return {
        type: type.GET_MESSAGES_REQUESTED,
        payload: chatId,
    }
}

export function addNewMessage(msg) {
    return {
        type: type.ADD_MESSAGE_REQUESTED,
        payload: msg,
    }
}

export function updateMessage(id) {
    return {
        type: type.UPDATE_MESSAGE_REQUESTED,
        payload: id,
    }
}

export function logout() {
    return {
        type: type.USER_LOGOUT,
        // payload: msg,
    }
}
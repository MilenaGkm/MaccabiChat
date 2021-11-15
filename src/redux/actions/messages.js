import * as type from '../types';

export function getConversationMessages(chatId) {
    return {
        type: type.GET_MESSAGES_REQUESTED,
        payload: chatId,
    }
}

import { call, put, takeEvery } from 'redux-saga/effects'
import { getConversationMessages, addNewMessage, updateMessage } from '../../services/apiServices';

function* fetchConversationMessages(action) {
   try {
      const messages = yield call(getConversationMessages, action.payload || action);
      yield put({ type: 'GET_MESSAGES_SUCCESS', messages: messages.data });
   } catch (e) {
      yield put({ type: 'GET_MESSAGES_FAILED', message: e.message });
   }
}

function* appendNewMessage(action) {
   try {
      yield call(addNewMessage, action.payload);
      yield fetchConversationMessages(action.payload.conversationId);
   } catch (e) {
      yield put({type: 'ADD_MESSAGE_FAILED', message: e.message});
   }
}

function* putMessage(action) {
   try {
      yield call(updateMessage, action.payload);
   } catch (e) {
      yield put({type: 'UPDATE_MESSAGE_FAILED', message: e.message});
   }
}

function* messageSaga() {
   yield takeEvery('GET_MESSAGES_REQUESTED', fetchConversationMessages);
   yield takeEvery('ADD_MESSAGE_REQUESTED', appendNewMessage);
   yield takeEvery('UPDATE_MESSAGE_REQUESTED', putMessage);
}

export default messageSaga;
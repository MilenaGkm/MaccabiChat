import { call, put, takeEvery } from 'redux-saga/effects'
import { getConversationMessages } from '../../services/apiServices';

function* fetchConversationMessages(action) {
   try {
      const messages = yield call(getConversationMessages, action.payload);
      console.log(messages.data);
      yield put({ type: 'GET_MESSAGES_SUCCESS', messages: messages.data });
   } catch (e) {
      yield put({ type: 'GET_MESSAGES_FAILED', message: e.message });
   }
}

function* messageSaga() {
   yield takeEvery('GET_MESSAGES_REQUESTED', fetchConversationMessages);
}

export default messageSaga;
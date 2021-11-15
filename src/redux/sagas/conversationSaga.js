import { call, put, takeEvery } from 'redux-saga/effects'
import { getUserConversations } from '../../services/apiServices';

function* fetchUserConversations(action) {
   // console.log(action);
   try {
      const userConversations = yield call(getUserConversations, action.payload);
      // console.log(userConversations);
      yield put({ type: 'GET_CONVERSATIONS_SUCCESS', conversations: userConversations });
   } catch (e) {
      yield put({ type: 'GET_CONVERSATIONS_FAILED', message: e.message });
   }
}

function* conversationSaga() {
   yield takeEvery('GET_CONVERSATIONS_REQUESTED', fetchUserConversations);
}

export default conversationSaga;
import { call, put, takeEvery } from 'redux-saga/effects'
import { getAllUsersApi, getUserApi, login, signup } from '../../services/apiServices';

function* fetchAllUsers(action) {
   try {
      const users = yield call(getAllUsersApi);
      console.log(users);
      yield put({ type: 'GET_ALL_USERS_SUCCESS', users: users.data });
   } catch (e) {
      yield put({ type: 'GET_ALL_USERS_FAILED', message: e.message });
   }
}

function* loginUser(action) {
   try {
      const user = yield call(login, action.payload);
      yield put({ type: 'LOGIN_SUCCESS', user: user.data });
   } catch (e) {
      yield put({ type: 'LOGIN_FAILED', message: e.message });
   }
}

function* signupUser(action) {
   try {
      const user = yield call(signup, action.payload);
      yield put({ type: 'SIGNUP_SUCCESS', user: user.data });
   } catch (e) {
      yield put({ type: 'SIGNUP_FAILED', message: e.message });
   }
}

function* userSaga() {
   yield takeEvery('GET_ALL_USERS_REQUESTED', fetchAllUsers);
   yield takeEvery('LOGIN_REQUESTED', loginUser);
   yield takeEvery('SIGNUP_REQUESTED', signupUser);
}

export default userSaga;
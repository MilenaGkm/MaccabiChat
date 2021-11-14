import { call, put, takeEvery } from 'redux-saga/effects'
import { getAllUsersApi, getUserApi, postUserApi, deleteUserApi } from '../../services/apiServices';

const apiUrl = 'http://localhost:3001/lol'

function* fetchAllUsers(action) {
   try {
      const users = yield call(getAllUsersApi);
      console.log(users);
      yield put({type: 'GET_ALL_USERS_SUCCESS', users: users});
   } catch (e) {
      yield put({type: 'GET_ALL_USERS_FAILED', message: e.message});
   }

}
// function* fetchUser(action) {
//    try {
//       const user = yield call(getUserApi);
//       yield put({type: 'GET_USER_SUCCESS', user: user});
//    } catch (e) {
//       yield put({type: 'GET_USER_FAILED', message: e.message});
//    }
// }

// function* addUser(action) {
//    try {
//       yield call(postUserApi, action.payload);
//       yield fetchUser();
//    } catch (e) {
//       yield put({type: 'ADD_USER_FAILED', message: e.message});
//    }
// }

// function* deleteUser(action) {
//    try {
//       yield call(deleteUserApi, action.payload);
//       yield fetchUser();
//    } catch (e) {
//       yield put({type: 'DELETE_USER_FAILED', message: e.message});
//    }
// }

function* userSaga() {
   yield takeEvery('GET_ALL_USERS_REQUESTED', fetchAllUsers);
   // yield takeEvery('GET_USER_REQUESTED', fetchUser);
   // yield takeEvery('ADD_USER_REQUESTED', addUser);
   // yield takeEvery('DELETE_USER_REQUESTED', deleteUser);
}

export default userSaga;
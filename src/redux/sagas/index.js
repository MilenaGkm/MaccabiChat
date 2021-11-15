import { all } from 'redux-saga/effects'
import userSaga from './userSaga'
import messageSaga from './messageSaga'
import conversationSaga from './conversationSaga'

export default function* rootSaga() {
  yield all([
    userSaga(),
    messageSaga(),
    conversationSaga(),
  ])
}
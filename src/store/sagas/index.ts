import { all } from 'redux-saga/effects';
import loginSagas from './login';
import signUpSagas from './signUp';

export default function* rootSaga() {
  yield all([loginSagas(), signUpSagas()]);
}

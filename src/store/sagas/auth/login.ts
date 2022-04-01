import { takeLatest, put, call } from 'redux-saga/effects';

// Actions
import {
  login,
  loginStart,
  cleanErrors,
  loginSuccess,
  loginFailure,
  cleanErrorsAction,
} from '../../slices/auth/login';

// Api
import { login as callService } from '../../api/auth/login';

export function* loginWorker(data: { payload: { email: string; password: string } }) {
  try {
    yield put(loginStart());

    const response: { data: any } = yield call(callService, data.payload);

    yield put(loginSuccess(response));
  } catch ({ response }) {
    // @ts-ignore
    yield put(loginFailure(response?.data || {}));
  }
}

export function* resetErrorsWorker() {
  yield put(cleanErrors());
}

export default function* loginSagasRoot() {
  yield takeLatest(login, loginWorker);
  yield takeLatest(cleanErrorsAction, resetErrorsWorker);
}

import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';

// Actions
import {
  forgotPassword,
  forgotPasswordStart,
  cleanErrors,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  cleanErrorsAction,
} from '../slices/forgotPassword';

// Api
import { forgotPassword as callService } from '../api/forgotPassword';

export function* forgotPasswordWorker(data: {
  payload: {
    email: string;
  };
}) {
  try {
    yield put(forgotPasswordStart());

    const response: Promise<AxiosResponse<any, any>> = yield call(
      callService,
      data.payload,
    );

    yield put(forgotPasswordSuccess(response));
  } catch ({ response }) {
    // @ts-ignore
    yield put(forgotPasswordFailure(response.data || {}));
  }
}

export function* resetErrorsWorker() {
  yield put(cleanErrors());
}

export default function* forgotPasswordSagasRoot() {
  yield takeLatest(forgotPassword, forgotPasswordWorker);
  yield takeLatest(cleanErrorsAction, resetErrorsWorker);
}

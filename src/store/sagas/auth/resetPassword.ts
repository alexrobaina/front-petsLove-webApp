import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';

// Actions
import {
  cleanErrors,
  resetPassword,
  cleanErrorsAction,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
} from '../../slices/auth/resetPassword';

// Api
import { resetPassword as callService } from '../../api/auth/resetPassword';

export function* resetPasswordWorker(data: {
  payload: {
    password: string;
    token: string;
  };
}) {
  try {
    yield put(resetPasswordStart());

    const response: Promise<AxiosResponse<any, any>> = yield call(
      callService,
      data.payload,
    );

    yield put(resetPasswordSuccess(response));
  } catch ({ response }) {
    // @ts-ignore
    yield put(resetPasswordFailure(response.data || {}));
  }
}

export function* resetErrorsWorker() {
  yield put(cleanErrors());
}

export default function* resetPasswordSagasRoot() {
  yield takeLatest(resetPassword, resetPasswordWorker);
  yield takeLatest(cleanErrorsAction, resetErrorsWorker);
}

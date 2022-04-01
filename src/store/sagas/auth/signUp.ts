import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';

// Actions
import {
  signUp,
  signUpStart,
  cleanErrors,
  signUpSuccess,
  signUpFailure,
  cleanErrorsAction,
} from '../../slices/auth/signUp';

// Api
import { signUp as callService } from '../../api/auth/signUp';

export function* signUpWorker(data: {
  payload: {
    role: string;
    email: string;
    name?: string;
    phone?: string;
    password: string;
  };
}) {
  try {
    yield put(signUpStart());

    const response: Promise<AxiosResponse<any, any>> = yield call(
      callService,
      data.payload,
    );

    yield put(signUpSuccess(response));
  } catch ({ response }) {
    // @ts-ignore
    yield put(signUpFailure(response.data || {}));
  }
}

export function* resetErrorsWorker() {
  yield put(cleanErrors());
}

export default function* signUpSagasRoot() {
  yield takeLatest(signUp, signUpWorker);
  yield takeLatest(cleanErrorsAction, resetErrorsWorker);
}

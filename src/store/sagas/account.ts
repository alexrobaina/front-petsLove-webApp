// Dependencies
import { takeLatest, put, call } from 'redux-saga/effects';

// Actions
import {
  cleanErrors,
  accountStart,
  accountSuccess,
  accountFailure,
  connectAccount,
} from '../slices/account';

// Api
import { connectAccount as callService } from '../api/account';

export function* connectAcconuntWorker(data: { payload: { address: string } }) {
  try {
    yield put(accountStart());

    const response: { address: string } = yield call(callService, data.payload.address);

    yield put(accountSuccess({ message: response }));
  } catch (err) {
    yield put(accountFailure({}));
  }
}

export function* resetErrorsWorker() {
  yield put(cleanErrors());
}

export default function* signUpSagasRoot() {
  yield takeLatest(connectAccount, connectAcconuntWorker);
}

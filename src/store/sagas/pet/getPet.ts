import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';

// Actions
import {
  getPet,
  cleanErrors,
  getPetStart,
  getPetSuccess,
  getPetFailure,
  cleanErrorsAction,
} from '../../slices/pet/getPet';

// Api
import { getPet as callService } from '../../api/pet/getPet';

export function* getPetWorker(data: { payload: { id: string } }) {
  try {
    yield put(getPetStart());

    const response: Promise<AxiosResponse<any, any>> = yield call(
      callService,
      data.payload,
    );

    yield put(getPetSuccess(response));
  } catch (error) {
    // @ts-ignore
    yield put(getPetFailure());
  }
}

export function* resetErrorsWorker() {
  yield put(cleanErrors());
}

export default function* getPetSagasRoot() {
  yield takeLatest(getPet, getPetWorker);
  yield takeLatest(cleanErrorsAction, resetErrorsWorker);
}

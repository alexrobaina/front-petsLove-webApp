import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';

// Actions
import {
  updatePet,
  cleanErrors,
  updatePetStart,
  updatePetSuccess,
  updatePetFailure,
  cleanErrorsUpdateAction,
} from '../../slices/pet/updatePet';

// Api
import { updatePet as callService } from '../../api/pet/updatePet';

export function* updatePetWorker(data: { payload: any }) {
  try {
    yield put(updatePetStart());

    const response: Promise<AxiosResponse<any, any>> = yield call(
      callService,
      data.payload,
    );

    yield put(updatePetSuccess(response));
  } catch (error) {
    // @ts-ignore
    yield put(updatePetFailure());
  }
}

export function* resetErrorsWorker() {
  yield put(cleanErrors());
}

export default function* updatePetSagasRoot() {
  yield takeLatest(updatePet, updatePetWorker);
  yield takeLatest(cleanErrorsUpdateAction, resetErrorsWorker);
}

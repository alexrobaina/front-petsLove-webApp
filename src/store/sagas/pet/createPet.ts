import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';

// Actions
import {
  createPet,
  cleanErrors,
  createPetStart,
  createPetSuccess,
  createPetFailure,
  cleanErrorsAction,
} from '../../slices/pet/createPet';

// Api
import { createPet as callService } from '../../api/pet/createPet';
import { TCreatePetSlice } from '../../../views/CreatePet/types';

export function* createPetWorker(data: { payload: TCreatePetSlice }) {
  try {
    yield put(createPetStart());

    const response: Promise<AxiosResponse<any, any>> = yield call(
      callService,
      data.payload,
    );

    yield put(createPetSuccess(response));
  } catch (error) {
    // @ts-ignore
    yield put(createPetFailure());
  }
}

export function* resetErrorsWorker() {
  yield put(cleanErrors());
}

export default function* createPetSagasRoot() {
  yield takeLatest(createPet, createPetWorker);
  yield takeLatest(cleanErrorsAction, resetErrorsWorker);
}

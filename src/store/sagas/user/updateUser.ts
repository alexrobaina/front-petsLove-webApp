import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';

// Actions
import {
  updateUser,
  cleanErrors,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  cleanErrorsUpdateAction,
} from '../../slices/user/updateUser';

// Api
import { updateUser as callService } from '../../api/user/updateUser';

export function* updateUserWorker(data: { payload: any }) {
  try {
    yield put(updateUserStart());

    const response: Promise<AxiosResponse<any, any>> = yield call(
      callService,
      data.payload,
    );

    yield put(updateUserSuccess(response));
  } catch (error) {
    // @ts-ignore
    yield put(updateUserFailure());
  }
}

export function* resetErrorsWorker() {
  yield put(cleanErrors());
}

export default function* updateUserSagasRoot() {
  yield takeLatest(updateUser, updateUserWorker);
  yield takeLatest(cleanErrorsUpdateAction, resetErrorsWorker);
}

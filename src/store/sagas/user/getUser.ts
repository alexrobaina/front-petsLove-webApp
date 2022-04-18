import { takeLatest, put, call } from 'redux-saga/effects';

// Actions
import {
  getUser,
  getUserStart,
  getUserSuccess,
  getUserFailure,
} from '../../slices/user/getUser';

// Api
import { getUser as callServiceGetUser } from '../../api/user/getUser';

export function* getUserWorker(data: { payload: string }) {
  try {
    yield put(getUserStart());

    const response: { data: any } = yield call(callServiceGetUser, data.payload);

    yield put(getUserSuccess(response));
  } catch ({ response }) {
    // @ts-ignore
    yield put(getUserFailure(response?.data || {}));
  }
}

export default function* getUserSagasRoot() {
  yield takeLatest(getUser, getUserWorker);
}

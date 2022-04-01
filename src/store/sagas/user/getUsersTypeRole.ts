import { takeLatest, put, call } from 'redux-saga/effects';

// Actions
import {
  listUsersTypeRole,
  listUsersTypeRoleStart,
  listUsersTypeRoleSuccess,
  listUsersTypeRoleFailure,
} from '../../slices/user/getUsersTypeRole';

// Api
import { getUsersTypeRole as callServicegetUsersTypeRole } from '../../api/user/getUsersTypeRole';

export function* getUsersTypeRoleWorker(data: {
  payload: {
    role: [string, string];
  };
}) {
  try {
    yield put(listUsersTypeRoleStart());

    const response: { data: any } = yield call(callServicegetUsersTypeRole, data.payload);

    yield put(listUsersTypeRoleSuccess(response));
  } catch ({ response }) {
    // @ts-ignore
    yield put(listUsersTypeRoleFailure(response?.data || {}));
  }
}

export default function* listUsersTypeRoleSagasRoot() {
  yield takeLatest(listUsersTypeRole, getUsersTypeRoleWorker);
}

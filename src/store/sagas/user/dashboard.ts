import { takeLatest, put, call } from 'redux-saga/effects';

// Actions
import {
  dashboard,
  dashboardStart,
  dashboardSuccess,
  dashboardFailure,
  filterDashboardPets,
  filterDashboardPetsStart,
  filterDashboardPetsSuccess,
  filterDashboardPetsFailure,
} from '../../slices/user/dashboard';

// Api
import {
  dashboard as callServiceDashboard,
  filterDashboardPets as callServiceFilterDashboradPets,
} from '../../api/user/dashboard';

export function* dashboardWorker(data: {
  payload: {
    userId: string;
  };
}) {
  try {
    yield put(dashboardStart());

    const response: { data: any } = yield call(callServiceDashboard, data.payload.userId);

    yield put(dashboardSuccess(response));
  } catch ({ response }) {
    // @ts-ignore
    yield put(dashboardFailure(response?.data || {}));
  }
}

export function* filterDashboardPetsWorker(data: {
  payload: {
    userId: string;
    gender: string;
    isAdopt: boolean;
    namePet: string;
    limit: number;
    page: number;
    category: string;
  };
}) {
  try {
    yield put(filterDashboardPetsStart());

    const response: { data: any } = yield call(
      callServiceFilterDashboradPets,
      data.payload,
    );

    yield put(filterDashboardPetsSuccess(response));
  } catch ({ response }) {
    // @ts-ignore
    yield put(filterDashboardPetsFailure(response?.data || {}));
  }
}

export default function* dashboardSagasRoot() {
  yield takeLatest(filterDashboardPets, filterDashboardPetsWorker);
  yield takeLatest(dashboard, dashboardWorker);
}

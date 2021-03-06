import { all } from 'redux-saga/effects';
import loginSagas from './auth/login';
import signUpSagas from './auth/signUp';
import forgortPasswordSagas from './auth/forgotPassword';
import dashboardSagas from './user/dashboard';
import listUsersTypeRoleSagas from './user/getUsersTypeRole';
import resetPasswordSagas from './auth/resetPassword';
import createPetSagas from './pet/createPet';
import getPetSagas from './pet/getPet';
import updatePetSagas from './pet/updatePet';
import getUserSagas from './user/getUser';
import updateUserSagas from './user/updateUser';

export default function* rootSaga() {
  yield all([
    loginSagas(),
    signUpSagas(),
    forgortPasswordSagas(),
    resetPasswordSagas(),
    dashboardSagas(),
    createPetSagas(),
    listUsersTypeRoleSagas(),
    getPetSagas(),
    updatePetSagas(),
    getUserSagas(),
    updateUserSagas(),
  ]);
}

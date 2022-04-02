import CreatePet from '../views/CreatePet';
import ForgotPassword from '../views/ForgotPassword';
import ResetPassword from '../views/ResetPassword/ResetPassword';
import SignUp from '../views/SignUp';
import ProfilePet from '../views/ProfilePet';
import EditPet from '../views/EditPet';
import {
  SIGN_UP,
  EDIT_PET,
  CREATE_PET,
  PROFILE_PET,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
} from './routes/routes';

// Components
const navigation = [
  { path: SIGN_UP, component: SignUp },
  { path: FORGOT_PASSWORD, component: ForgotPassword },
  { path: RESET_PASSWORD, component: ResetPassword },
  { path: CREATE_PET, component: CreatePet },
  { path: PROFILE_PET, component: ProfilePet },
  { path: EDIT_PET, component: EditPet },
];

export default navigation;

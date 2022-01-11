import CreatePet from '../views/CreatePet';
import ForgotPassword from '../views/ForgotPassword';
import ResetPassword from '../views/ResetPassword/ResetPassword';
import SignUp from '../views/SignUp';
import { CREATE_PET, FORGOT_PASSWORD, RESET_PASSWORD, SIGN_UP } from './routes/routes';

// Components
const navigation = [
  { path: SIGN_UP, component: SignUp },
  { path: FORGOT_PASSWORD, component: ForgotPassword },
  { path: RESET_PASSWORD, component: ResetPassword },
  { path: CREATE_PET, component: CreatePet },
];

export default navigation;

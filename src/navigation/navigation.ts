import ForgotPassword from '../views/ForgotPassword';
import ResetPassword from '../views/ResetPassword/ResetPassword';
import SignUp from '../views/SignUp';
import { FORGOT_PASSWORD, RESET_PASSWORD, SIGN_UP } from './routes/routes';

// Components
const navigation = [
  { path: SIGN_UP, component: SignUp },
  { path: FORGOT_PASSWORD, component: ForgotPassword },
  { path: RESET_PASSWORD, component: ResetPassword },
];

export default navigation;

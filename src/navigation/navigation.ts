import ForgotPassword from '../views/ForgotPassword';
import SignUp from '../views/SignUp';
import { FORGOT_PASSWORD, SIGN_UP } from './routes/routes';

// Components
const navigation = [
  { path: SIGN_UP, component: SignUp },
  { path: FORGOT_PASSWORD, component: ForgotPassword },
];

export default navigation;

import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import LoginForm from './components/LoginForm';
import { login } from '../../store/slices/login';
import { validationLogin } from './helpers/validationInputSchema';
import { FORGOT_PASSWORD, SIGN_UP, USER_PROFILE } from '../../navigation/routes/routes';
import BaseImage from '../../components/common/BaseImage';
import styles from './Login.module.scss';

const Login: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useSelector((state: any) => state.login);

  if (token !== '') {
    history.push(USER_PROFILE);
  }

  const goToForgotPassword = () => {
    history.push(FORGOT_PASSWORD);
  };

  const goToRegister = () => {
    history.push(SIGN_UP);
  };

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationLogin,
    onSubmit: (values: { email: string; password: string }) => {
      const data = { email: values.email, password: values.password };
      dispatch(login(data));
    },
  });

  const { values, handleChange, handleSubmit, errors } = formik;

  return (
    <div className={styles.containerForm}>
      <div className={styles.containerImage}>
        <BaseImage
          src="https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
          width="100rem"
        />
      </div>
      <LoginForm
        testId="login"
        values={values}
        errors={errors}
        submitForm={handleSubmit}
        handleChange={handleChange}
        goToRegister={goToRegister}
        goToForgotPassword={goToForgotPassword}
      />
    </div>
  );
};

export default Login;

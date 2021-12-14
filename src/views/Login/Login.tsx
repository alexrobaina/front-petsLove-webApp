import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Layout from '../../components/common/Layout';
import LoginForm from './components/LoginForm';
import { login } from '../../store/slices/login';
import { validationLogin } from './helpers/validationInputSchema';
import { FORGOT_PASSWORD, SIGN_UP } from '../../navigation/routes/routes';

const Login: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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
      console.log(values);
      const data = { email: values.email, password: values.password };
      dispatch(login(data));
    },
  });
  const { values, handleChange, handleSubmit, errors } = formik;

  return (
    <Layout testID="home">
      <LoginForm
        testId="login"
        values={values}
        errors={errors}
        submitForm={handleSubmit}
        handleChange={handleChange}
        goToRegister={goToRegister}
        goToForgotPassword={goToForgotPassword}
      />
    </Layout>
  );
};

export default Login;

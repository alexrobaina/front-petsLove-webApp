import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Layout from '../../components/common/Layout';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import { login } from '../../store/slices/login';
import { validationLogin } from './helpers/validationInputSchema';
import { LOGIN } from '../../navigation/routes/routes';

const ForgotPassword: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const goToLogin = () => {
    history.push(LOGIN);
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
    <Layout testID="home">
      <ForgotPasswordForm
        testId="login"
        values={values}
        errors={errors}
        goToLogin={goToLogin}
        submitForm={handleSubmit}
        handleChange={handleChange}
      />
    </Layout>
  );
};

export default ForgotPassword;

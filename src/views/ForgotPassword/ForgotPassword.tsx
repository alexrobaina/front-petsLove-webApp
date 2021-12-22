import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Layout from '../../components/common/Layout';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import { forgotPassword } from '../../store/slices/forgotPassword';
import { validationForgotPassword } from './helpers/validationInputSchema';
import { LOGIN } from '../../navigation/routes/routes';

const ForgotPassword: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const goToLogin = () => {
    history.push(LOGIN);
  };

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: validationForgotPassword,
    onSubmit: (values: { email: string }) => {
      const data = { email: values.email };
      dispatch(forgotPassword(data));
    },
  });
  const { values, handleChange, handleSubmit, errors } = formik;

  return (
    <Layout testID="forgotPassword">
      <ForgotPasswordForm
        values={values}
        errors={errors}
        goToLogin={goToLogin}
        testId="forgotPassword"
        submitForm={handleSubmit}
        handleChange={handleChange}
      />
    </Layout>
  );
};

export default ForgotPassword;

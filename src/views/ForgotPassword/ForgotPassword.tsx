import { FC, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Layout from '../../components/common/Layout';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import { forgotPassword } from '../../store/slices/forgotPassword';
import { validationForgotPassword } from './helpers/validationInputSchema';
import { LOGIN } from '../../navigation/routes/routes';

const ForgotPassword: FC = () => {
  const [errorMessageCaptcha, setErrorCaptcha] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  let captchaRef: any = useRef(null);

  const goToLogin = () => {
    history.push(LOGIN);
  };

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: validationForgotPassword,
    onSubmit: (values: { email: string }) => {
      const data = { email: values.email, lang: localStorage.getItem('lang') || '' };
      if (!captchaRef.current.getValue()) setErrorCaptcha('common.errorCaptcha');
      if (captchaRef.current.getValue()) dispatch(forgotPassword(data));
      setErrorCaptcha('common.errorCaptcha');
    },
  });

  useEffect(() => {
    return () => {
      captchaRef = null;
    };
  }, [captchaRef]);

  const { values, handleChange, handleSubmit, errors } = formik;

  return (
    <Layout testID="forgotPassword">
      <ForgotPasswordForm
        values={values}
        errors={errors}
        goToLogin={goToLogin}
        testId="forgotPassword"
        captchaRef={captchaRef}
        submitForm={handleSubmit}
        handleChange={handleChange}
        errorCaptcha={errorMessageCaptcha}
      />
    </Layout>
  );
};

export default ForgotPassword;

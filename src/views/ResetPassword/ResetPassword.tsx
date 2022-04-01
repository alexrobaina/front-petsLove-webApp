import { FC, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import ResetPasswordForm from './components/ResetPasswordForm';
import { cleanErrorsAction, resetPassword } from '../../store/slices/auth/resetPassword';
import { validationResetPasseword } from './helpers/validationInputSchema';
import { LOGIN } from '../../navigation/routes/routes';
import Layout from '../../components/common/Layout';

const ResetPassword: FC = () => {
  const { token }: { token: string } = useParams();
  let captchaRef: any = useRef(null);
  const [errorCaptcha, setErrorCaptcha] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { error } = useSelector((state: any) => state.resetPassword);

  const goToLogin = () => {
    history.push(LOGIN);
  };

  const formik = useFormik({
    initialValues: { password: '' },
    validationSchema: validationResetPasseword,
    onSubmit: (values: { password: string }) => {
      const data = { password: values.password, token };

      if (!captchaRef.current.getValue()) setErrorCaptcha('common.errorCaptcha');
      if (captchaRef.current.getValue()) {
        dispatch(resetPassword(data));
        setErrorCaptcha('');
        dispatch(cleanErrorsAction());
      }
    },
  });

  useEffect(() => {
    if (error) dispatch(cleanErrorsAction());

    return () => {
      captchaRef = null;
    };
  }, [dispatch]);

  const { values, handleChange, handleSubmit, errors } = formik;

  return (
    <Layout testId="reset-password">
      <ResetPasswordForm
        values={values}
        errors={errors}
        goToLogin={goToLogin}
        testId="reset-password"
        captchaRef={captchaRef}
        submitForm={handleSubmit}
        errorCaptcha={errorCaptcha}
        handleChange={handleChange}
      />
    </Layout>
  );
};

export default ResetPassword;

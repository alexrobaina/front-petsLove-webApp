import { FC, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import CreatePetForm from './components/CreatePetForm';
import { cleanErrorsAction, login } from '../../store/slices/login';
import { validationCreatePet } from './helpers/validationInputSchema';
import { FORGOT_PASSWORD, SIGN_UP } from '../../navigation/routes/routes';
import styles from './CreatePet.module.scss';

const Login: FC = () => {
  const captchaRef: any = useRef(null);
  const [errorCaptcha, setErrorCaptcha] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { error } = useSelector((state: any) => state.login);

  const goToForgotPassword = () => {
    history.push(FORGOT_PASSWORD);
  };

  const goToRegister = () => {
    history.push(SIGN_UP);
  };

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationCreatePet,
    onSubmit: (values: { email: string; password: string }) => {
      const data = { email: values.email, password: values.password };

      if (!captchaRef.current.getValue()) setErrorCaptcha('common.errorCaptcha');
      if (captchaRef.current.getValue()) {
        dispatch(login(data));
        setErrorCaptcha('');
      }
    },
  });

  useEffect(() => {
    if (error) dispatch(cleanErrorsAction());
  }, [dispatch]);

  const { values, handleChange, handleSubmit, errors } = formik;

  return (
    <div className={styles.containerForm}>
      <CreatePetForm
        testId="createPet"
        values={values}
        errors={errors}
        captchaRef={captchaRef}
        submitForm={handleSubmit}
        errorCaptcha={errorCaptcha}
        handleChange={handleChange}
        goToRegister={goToRegister}
        goToForgotPassword={goToForgotPassword}
      />
    </div>
  );
};

export default Login;

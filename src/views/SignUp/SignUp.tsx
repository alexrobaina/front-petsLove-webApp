import { FC, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import SignUpForm from './components/SignUpForm';
import {
  validationSignUpOrganization,
  validationSignUpAdopter,
} from './helpers/validationInputSchema';
import { LOGIN } from '../../navigation/routes/routes';
import BaseImage from '../../components/common/BaseImage';
import {
  USER_ADOPTER_ROLE,
  USER_SHELTER_ROLE,
  USER_VET_ROLE,
} from '../../constants/roles';
import { signUp } from '../../store/slices/signUp';
import { TSignUpForm } from './types';
import styles from './SignUp.module.scss';
import { signUpState } from './constants';

const SignUp: FC = () => {
  const [errorCaptcha, setErrorCaptcha] = useState('');
  let captchaRef: any = useRef(null);
  const [schema, setSchema] = useState<any>(validationSignUpAdopter);
  const dispatch = useDispatch();
  const history = useHistory();

  const goToLogin = () => {
    history.push(LOGIN);
  };

  const formik = useFormik({
    initialValues: signUpState,
    validationSchema: schema,
    onSubmit: (values: TSignUpForm) => {
      let data: TSignUpForm = signUpState;
      if (values.role === USER_VET_ROLE || values.role === USER_SHELTER_ROLE)
        data = {
          role: values.role,
          name: values.name,
          phone: values.phone,
          email: values.email,
          password: values.password,
        };
      if (values.role === USER_ADOPTER_ROLE)
        data = { role: values.role, email: values.email, password: values.password };

      if (!captchaRef.current.getValue()) setErrorCaptcha('common.errorCaptcha');
      if (captchaRef.current.getValue()) dispatch(signUp(data));
      setErrorCaptcha('common.errorCaptcha');
    },
  });

  const { values, handleChange, handleSubmit, errors, setFieldValue } = formik;

  useEffect(() => {
    if (values.role === USER_SHELTER_ROLE || values.role === USER_VET_ROLE) {
      setSchema(validationSignUpOrganization);
    } else if (values.role === USER_ADOPTER_ROLE) {
      setSchema(validationSignUpAdopter);
    }

    return () => {
      captchaRef = null;
    };
  }, [values.role, captchaRef]);

  return (
    <div className={styles.containerForm}>
      <div className={styles.containerImage}>
        <BaseImage
          width="100rem"
          src="https://images.unsplash.com/photo-1618678900888-da259539f5ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80"
        />
      </div>
      <SignUpForm
        values={values}
        errors={errors}
        testId="sign-up"
        goToLogin={goToLogin}
        captchaRef={captchaRef}
        errorCaptcha={errorCaptcha}
        submitForm={handleSubmit}
        handleChange={handleChange}
        setFieldValue={setFieldValue}
      />
    </div>
  );
};

export default SignUp;

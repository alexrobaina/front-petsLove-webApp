import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import SignUpForm from './components/SignUpForm';
import { login } from '../../store/slices/login';
import { validationLogin } from './helpers/validationInputSchema';
import { LOGIN } from '../../navigation/routes/routes';
import BaseImage from '../../components/common/BaseImage';
import styles from './SignUp.module.scss';

const SignUp: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const goToLogin = () => {
    history.push(LOGIN);
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
    <div className={styles.containerForm}>
      <div className={styles.containerImage}>
        <BaseImage
          width="100rem"
          src="https://images.unsplash.com/photo-1618678900888-da259539f5ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80"
        />
      </div>
      <SignUpForm
        testId="login"
        values={values}
        errors={errors}
        goToLogin={goToLogin}
        submitForm={handleSubmit}
        handleChange={handleChange}
      />
    </div>
  );
};

export default SignUp;

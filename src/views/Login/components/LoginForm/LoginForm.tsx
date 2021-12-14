import { FC, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { FormikErrors } from 'formik';
import BaseInput from '../../../../components/common/BaseInput';
// import BaseNotifyMessage from '../../../../components/common/BaseNotifyMessage';
import BaseButton from '../../../../components/common/BaseButton';
import BaseTitle from '../../../../components/common/BaseTitle';
import { VARIANTS_OPACITY } from '../../../../constants/animation';
import styles from './LoginForm.module.scss';

interface Props {
  testId: string;
  submitForm: any;
  goToRegister: () => void;
  goToForgotPassword: () => void;
  values: { email: string; password: string };
  errors: FormikErrors<{ email: string; password: string }>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LoginForm: FC<Props> = ({
  testId,
  values,
  errors,
  submitForm,
  handleChange,
  goToRegister,
  goToForgotPassword,
}) => {
  return (
    <div data-testid={`form-container-${testId}`} className={styles.container}>
      <form onSubmit={submitForm} className={styles.columns}>
        <motion.div
          initial="hidden"
          animate="visible"
          data-testid="loguin"
          variants={VARIANTS_OPACITY}
          transition={{ ease: 'easeOut', delay: 0.2 }}
        >
          <BaseTitle center marginTop={40} marginBottom={60} fontSize={30} text="Login" />
          <BaseInput
            type="text"
            label="Emial"
            marginTop={10}
            testId={testId}
            inputName="email"
            value={values.email}
            errorMessage={errors.email}
            handleChange={handleChange}
            placeholder="alexgomez@gmail.com"
          />
          <BaseInput
            type="text"
            marginTop={10}
            testId={testId}
            label="Password"
            inputName="password"
            placeholder="Pasword"
            value={values.password}
            handleChange={handleChange}
            errorMessage={errors.password}
          />
          <BaseButton large type="submit" text="Login" marginTop={30} />
        </motion.div>
      </form>
      <BaseButton text="Registrarme" isButtonLink onClick={goToRegister} />
      <BaseButton text="Olvidé mi contraseña" isButtonLink onClick={goToForgotPassword} />
    </div>
  );
};

export default LoginForm;

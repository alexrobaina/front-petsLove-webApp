import { FC, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { FormikErrors } from 'formik';
import BaseInput from '../../../../components/common/BaseInput';
// import BaseNotifyMessage from '../../../../components/common/BaseNotifyMessage';
import BaseButton from '../../../../components/common/BaseButton';
import BaseTitle from '../../../../components/common/BaseTitle';
import { VARIANTS_OPACITY } from '../../../../constants/animation';
import { useTranslate } from '../../../../hooks/useTranslate';
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
  const { t } = useTranslate();

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
          <BaseTitle
            center
            fontSize={30}
            marginTop={40}
            marginBottom={60}
            text={t('common.login')}
          />
          <BaseInput
            type="text"
            marginTop={10}
            testId={testId}
            inputName="email"
            value={values.email}
            label={t('common.email')}
            handleChange={handleChange}
            placeholder="alexgomez@gmail.com"
            errorMessage={t(errors.email || '')}
          />
          <BaseInput
            type="text"
            marginTop={10}
            testId={testId}
            inputName="password"
            value={values.password}
            handleChange={handleChange}
            label={t('common.password')}
            placeholder={t('common.password')}
            errorMessage={t(errors.password || '')}
          />
          <BaseButton large type="submit" text={t('common.login')} marginTop={30} />
          <div className={styles.containerActions}>
            <BaseButton
              small
              isButtonLink
              fontSize={18}
              onClick={goToRegister}
              text={t('common.signUp')}
            />
            <BaseButton
              small
              isButtonLink
              fontSize={18}
              onClick={goToForgotPassword}
              text={t('common.forgotPassword')}
            />
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default LoginForm;

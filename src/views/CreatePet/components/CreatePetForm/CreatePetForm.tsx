import { FC, ChangeEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { motion } from 'framer-motion';
import { FormikErrors } from 'formik';
import { useSelector } from 'react-redux';
import BaseInput from '../../../../components/common/BaseInput';
import BaseNotifyMessage from '../../../../components/common/BaseNotifyMessage';
import BaseButton from '../../../../components/common/BaseButton';
import BaseTitle from '../../../../components/common/BaseTitle';
import { VARIANTS_OPACITY } from '../../../../constants/animation';
import { useTranslate } from '../../../../hooks/useTranslate';
import BaseErrorMessage from '../../../../components/common/BaseErrorMessage';
import styles from './CreatePetForm.module.scss';

interface Props {
  testId: string;
  submitForm: any;
  captchaRef: any;
  errorCaptcha: string;
  goToRegister: () => void;
  goToForgotPassword: () => void;
  values: { email: string; password: string };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: FormikErrors<{ email: string; password: string }>;
}

const CreatePetForm: FC<Props> = ({
  testId,
  values,
  errors,
  captchaRef,
  submitForm,
  handleChange,
  goToRegister,
  errorCaptcha,
  goToForgotPassword,
}) => {
  const { t } = useTranslate();
  const { data } = useSelector((state: any) => state.login);

  const setErrorMessageComponent = (errorCode: number) => {
    if (errorCode === 2)
      return <BaseNotifyMessage canClose message={t('login.documentNotFound')} />;
    if (errorCode === 1)
      return <BaseNotifyMessage canClose message={t('login.credentialsError')} />;
    return null;
  };

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
            text={t('common.createPet')}
          />
          {data?.code && setErrorMessageComponent(data?.code)}
          <BaseInput
            type="text"
            marginTop={10}
            testId={testId}
            inputName="email"
            value={values.email}
            label={t('common.email')}
            handleChange={handleChange}
            placeholder="alexgomez@gmail.com"
            errorMessage={t(errors.email)}
          />
          <BaseInput
            marginTop={10}
            testId={testId}
            type="password"
            marginBottom={30}
            inputName="password"
            value={values.password}
            handleChange={handleChange}
            label={t('common.password')}
            placeholder={t('common.password')}
            errorMessage={t(errors.password)}
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
          {process.env.REACT_APP_GOOGLE_CAPTCHA && (
            <div className={styles.containerCaptcha}>
              <ReCAPTCHA
                size="normal"
                ref={captchaRef}
                sitekey={process.env.REACT_APP_GOOGLE_CAPTCHA || ''}
              />
              {errorCaptcha && <BaseErrorMessage text={t(errorCaptcha)} />}
            </div>
          )}
        </motion.div>
      </form>
    </div>
  );
};

export default CreatePetForm;

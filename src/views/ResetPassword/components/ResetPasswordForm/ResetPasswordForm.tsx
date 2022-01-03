import { FC, ChangeEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { motion } from 'framer-motion';
import { FormikErrors } from 'formik';
import { useSelector } from 'react-redux';
import shelterImage from '../../../../assets/images/shelter.png';
import BaseInput from '../../../../components/common/BaseInput';
import BaseNotifyMessage from '../../../../components/common/BaseNotifyMessage';
import BaseButton from '../../../../components/common/BaseButton';
import BaseTitle from '../../../../components/common/BaseTitle';
import { VARIANTS_OPACITY } from '../../../../constants/animation';
import { useTranslate } from '../../../../hooks/useTranslate';
import BaseErrorMessage from '../../../../components/common/BaseErrorMessage';
import styles from './ResetPasswordForm.module.scss';
import {
  ERROR_RESET_PASSWORD,
  RESET_PASWORD_SUCCESS,
} from '../../../../constants/responseCodes';
import BaseLoading from '../../../../components/common/BaseLoading';
import BaseResponseMessage from '../../../../components/common/BaseResponseMessage';

interface Props {
  testId: string;
  submitForm: any;
  captchaRef: any;
  errorCaptcha: string;
  goToLogin: () => void;
  values: { password: string };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: FormikErrors<{ password: string }>;
}

const LoginForm: FC<Props> = ({
  testId,
  values,
  errors,
  goToLogin,
  captchaRef,
  submitForm,
  errorCaptcha,
  handleChange,
}) => {
  const { t } = useTranslate();
  const { data, isloading } = useSelector((state: any) => state.resetPassword);

  if (isloading) {
    return <BaseLoading testId="resetPassword" />;
  }

  const setErrorMessageComponent = (errorCode: number) => {
    if (errorCode === ERROR_RESET_PASSWORD)
      return <BaseNotifyMessage canClose message={t('common.somethingIsWrong')} />;
    return <BaseNotifyMessage canClose message={t('common.tokenExpired')} />;
  };

  if (data?.code === RESET_PASWORD_SUCCESS) {
    return (
      <BaseResponseMessage
        goTo={goToLogin}
        image={shelterImage}
        buttonText={t('common.goToLogin')}
        message={t('resetPassword.resetPasswordSuccessful')}
      />
    );
  }

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
            text={t('resetPassword.changePassword')}
          />
          {data?.code && setErrorMessageComponent(data?.code)}
          <BaseInput
            marginTop={10}
            testId={testId}
            type="password"
            marginBottom={30}
            inputName="password"
            value={values.password}
            handleChange={handleChange}
            errorMessage={t(errors.password)}
            placeholder={t('common.password')}
            label={t('resetPassword.resetPasswordInputLabel')}
          />
          <BaseButton large type="submit" text={t('common.continue')} marginTop={30} />
          <div className={styles.containerActions}>
            <BaseButton
              small
              isButtonLink
              fontSize={18}
              onClick={goToLogin}
              text={t('common.login')}
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

export default LoginForm;

import { FC, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import { FormikErrors } from 'formik';
import { useSelector } from 'react-redux';
import BaseInput from '../../../../components/common/BaseInput';
import BaseNotifyMessage from '../../../../components/common/BaseNotifyMessage';
import shelterComputer from '../../../../assets/images/shelterComputer.png';
import BaseResponseMessage from '../../../../components/common/BaseResponseMessage';
import BaseButton from '../../../../components/common/BaseButton';
import BaseLoading from '../../../../components/common/BaseLoading';
import BaseTitle from '../../../../components/common/BaseTitle';
import { VARIANTS_OPACITY } from '../../../../constants/animation';
import { useTranslate } from '../../../../hooks/useTranslate';
import {
  DOCUMENT_NOT_FOUND_ERROR_CODE,
  EMAIL_SEND_SUCCESSFUL,
} from '../../../../constants/responseCodes';
import BaseErrorMessage from '../../../../components/common/BaseErrorMessage';
import styles from './ForgotPasswordForm.module.scss';

interface Props {
  testId: string;
  submitForm: any;
  captchaRef: any;
  errorCaptcha: string;
  goToLogin: () => void;
  values: { email: string };
  errors: FormikErrors<{ email: string }>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ForgotPasswordForm: FC<Props> = ({
  testId,
  values,
  errors,
  goToLogin,
  submitForm,
  captchaRef,
  errorCaptcha,
  handleChange,
}) => {
  const { t } = useTranslate();
  const { isLoading, data } = useSelector((state: any) => state.forgotPassword);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <BaseLoading testId="forgotPassword" />
      </div>
    );
  }

  if (data?.code === EMAIL_SEND_SUCCESSFUL) {
    return (
      <BaseResponseMessage
        goTo={goToLogin}
        image={shelterComputer}
        buttonText={t('common.goToLogin')}
        message={t('signUp.forgotPasswordEmailSend')}
      />
    );
  }

  return (
    <div data-testid={`form-container-${testId}`} className={styles.container}>
      <form onSubmit={submitForm} className={styles.columns}>
        <motion.div
          initial="hidden"
          animate="visible"
          data-testid="forgot-password"
          variants={VARIANTS_OPACITY}
          transition={{ ease: 'easeOut', delay: 0.2 }}
        >
          <BaseTitle
            center
            marginTop={40}
            marginBottom={40}
            fontSize={30}
            text={t('common.forgotPassword')}
          />
          {data?.code === DOCUMENT_NOT_FOUND_ERROR_CODE && (
            <BaseNotifyMessage
              canClose
              testId="forgot-password"
              message={t('common.somethingIsWrong')}
            />
          )}
          <BaseInput
            type="text"
            marginTop={10}
            testId={testId}
            inputName="email"
            value={values.email}
            label={t('common.email')}
            handleChange={handleChange}
            placeholder="alexgomez@gmail.com"
            errorMessage={t(`${errors.email || ''}`)}
          />
          <BaseButton large type="submit" text={t('common.continue')} marginTop={30} />
        </motion.div>
      </form>
      <BaseButton
        isButtonLink
        marginTop={20}
        onClick={goToLogin}
        text={t('common.login')}
      />
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
    </div>
  );
};

export default ForgotPasswordForm;

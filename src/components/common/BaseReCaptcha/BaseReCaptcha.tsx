import { FC } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslate } from '../../../hooks/useTranslate';
import BaseErrorMessage from '../BaseErrorMessage';
import styles from './BaseReCaptcha.module.scss';

interface Props {
  ref: any;
  errorMessage?: string;
}

const BaseReCaptcha: FC<Props> = ({ ref, errorMessage }) => {
  const { t } = useTranslate();

  return (
    <div className={styles.containerCaptcha}>
      <ReCAPTCHA
        ref={ref}
        size="normal"
        sitekey={process.env.REACT_APP_GOOGLE_CAPTCHA || ''}
      />
      {errorMessage && <BaseErrorMessage text={t(errorMessage)} />}
    </div>
  );
};

export default BaseReCaptcha;

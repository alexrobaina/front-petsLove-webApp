import { FC, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { FormikErrors } from 'formik';
import BaseInput from '../../../../components/common/BaseInput';
// import BaseNotifyMessage from '../../../../components/common/BaseNotifyMessage';
import BaseButton from '../../../../components/common/BaseButton';
import BaseTitle from '../../../../components/common/BaseTitle';
import { VARIANTS_OPACITY } from '../../../../constants/animation';
import styles from './ForgotPasswordForm.module.scss';
import { useTranslate } from '../../../../hooks/useTranslate';

interface Props {
  testId: string;
  submitForm: any;
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
  handleChange,
}) => {
  const { t } = useTranslate();
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
            marginBottom={60}
            fontSize={30}
            text={t('common.forgotPassword')}
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
    </div>
  );
};

export default ForgotPasswordForm;

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
import BaseRadioButton from '../../../../components/common/BaseRadioButton';
import BaseInputPhone from '../../../../components/common/BaseInputPhone';
import {
  USER_ADOPTER_ROLE,
  USER_SHELTER_ROLE,
  USER_VET_ROLE,
} from '../../../../constants/roles';
import { useTranslate } from '../../../../hooks/useTranslate';
import { TSignUpForm } from '../../types';
import styles from './SignUpForm.module.scss';
import BaseErrorMessage from '../../../../components/common/BaseErrorMessage';

interface Props {
  testId: string;
  captchaRef: any;
  submitForm: any;
  setFieldValue: any;
  errorCaptcha: string;
  goToLogin: () => void;
  values: TSignUpForm;
  errors: FormikErrors<TSignUpForm>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SignUpForm: FC<Props> = ({
  testId,
  values,
  errors,
  goToLogin,
  captchaRef,
  submitForm,
  errorCaptcha,
  handleChange,
  setFieldValue,
}) => {
  const { t } = useTranslate();
  const { data } = useSelector((state: any) => state.signUp);
  const setFieldsAdditional = () => {
    return values?.role === USER_SHELTER_ROLE || values?.role === USER_VET_ROLE;
  };

  const setErrorMessageComponent = (errorCode: number) => {
    if (errorCode === 3)
      return <BaseNotifyMessage canClose message={t('common.userExist')} />;
    if (errorCode === 4)
      return <BaseNotifyMessage canClose message={t('common.somethingIsWrong')} />;
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
            text={t('common.signUp')}
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
            errorMessage={t(errors.email)}
            placeholder="alexgomez@gmail.com"
          />
          <BaseInput
            type="password"
            marginTop={10}
            testId={testId}
            inputName="password"
            value={values.password}
            handleChange={handleChange}
            label={t('common.password')}
            errorMessage={t(errors.password)}
            placeholder={t('common.password')}
          />
          <div className={styles.containerRadioButtons}>
            <BaseRadioButton
              inputName="role"
              value={USER_SHELTER_ROLE}
              errorMessage={errors.role}
              handleChange={handleChange}
              text={t('signUp.iAmShelter')}
              isChecked={values.role === USER_SHELTER_ROLE}
            />
            <BaseRadioButton
              inputName="role"
              value={USER_VET_ROLE}
              text={t('signUp.iAmVet')}
              errorMessage={errors.role}
              handleChange={handleChange}
              isChecked={values.role === USER_VET_ROLE}
            />
            <BaseRadioButton
              inputName="role"
              value={USER_ADOPTER_ROLE}
              errorMessage={errors.role}
              handleChange={handleChange}
              text={t('signUp.wantToAdopt')}
              isChecked={values.role === USER_ADOPTER_ROLE}
            />
          </div>

          {setFieldsAdditional() && (
            <motion.div
              initial="hidden"
              animate="visible"
              data-testid="loguin"
              variants={VARIANTS_OPACITY}
              transition={{ ease: 'easeOut', delay: 0.2 }}
            >
              <BaseInput
                type="text"
                testId="name"
                marginTop={10}
                inputName="name"
                value={values.name}
                label={t('common.name')}
                handleChange={handleChange}
                errorMessage={t(errors.name)}
                placeholder={t('signUp.organizationName')}
              />
              <BaseInputPhone
                marginTop={10}
                testId="phone"
                inputName="phone"
                marginBottom={30}
                defaultCountry="ar"
                countryList={['ar']}
                label={t('common.phone')}
                value={values.phone || ''}
                setFieldValue={setFieldValue}
                errorMessage={t(errors.phone)}
              />
            </motion.div>
          )}
          <ReCAPTCHA
            size="normal"
            ref={captchaRef}
            sitekey="6LeMTrsdAAAAAP1SekJgyrAFNlvX94RJyok1oA5C"
          />
          {errorCaptcha && <BaseErrorMessage text={t(errorCaptcha)} />}
          <BaseButton large type="submit" text={t('common.signUp')} marginTop={30} />
        </motion.div>
        <BaseButton
          isButtonLink
          marginTop={20}
          onClick={goToLogin}
          text={t('common.goToLogin')}
        />
      </form>
    </div>
  );
};

export default SignUpForm;

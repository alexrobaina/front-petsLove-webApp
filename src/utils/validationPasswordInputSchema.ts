import * as Yup from 'yup';

export const validationPasswordInputSchema = () => {
  return Yup.string()
    .max(15, 'common.validationMaxLength')
    .matches(/^\S*$/, 'common.validationWhiteSpace')
    .required('common.validationRequired');
};

export const validationSignUpFirstStep = Yup.object().shape({
  email: Yup.string()
    .email('common.validationEmail')
    .required('common.validationRequired'),
  password: Yup.string()
    .max(15, 'common.validationMaxLength')
    .matches(/^\S*$/, 'common.validationSpaceWhite')
    .required('common.validationRequired'),
});

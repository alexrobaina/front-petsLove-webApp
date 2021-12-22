import * as Yup from 'yup';

export const validationLogin = Yup.object().shape({
  email: Yup.string()
    .email('common.validationEmail')
    .required('common.validationRequired'),
  password: Yup.string().required('common.validationRequired'),
});

export const validationForgotPassword = Yup.object().shape({
  email: Yup.string()
    .email('common.validationEmail')
    .required('common.validationRequired'),
});

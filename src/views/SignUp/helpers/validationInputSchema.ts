import * as Yup from 'yup';

export const validationSignUpAdopter = Yup.object().shape({
  email: Yup.string()
    .email('common.validationEmail')
    .required('common.validationRequired'),
  password: Yup.string().required('common.validationRequired'),
  role: Yup.string().required('common.validationRequired'),
});

export const validationSignUpOrganization = Yup.object().shape({
  email: Yup.string()
    .email('common.validationEmail')
    .required('common.validationRequired'),
  password: Yup.string().required('common.validationRequired'),
  role: Yup.string().required('common.validationRequired'),
  phone: Yup.string().required('common.validationRequired'),
  name: Yup.string().required('common.validationRequired'),
});

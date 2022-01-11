import * as Yup from 'yup';

export const validationCreatePet = Yup.object().shape({
  email: Yup.string()
    .email('common.validationEmail')
    .required('common.validationRequired'),
  password: Yup.string().required('common.validationRequired'),
});

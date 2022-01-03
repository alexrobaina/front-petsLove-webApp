import * as Yup from 'yup';

export const validationResetPasseword = Yup.object().shape({
  password: Yup.string().required('common.validationRequired'),
});

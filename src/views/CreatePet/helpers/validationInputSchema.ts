import * as Yup from 'yup';

export const validationCreatePet = Yup.object().shape({
  name: Yup.string().strict().required('common.validationRequired'),
  color: Yup.string().strict().required('common.validationRequired'),
  gender: Yup.string().required('common.validationRequired'),
  description: Yup.string().required('common.validationRequired'),
  category: Yup.string().required('common.validationRequired'),
  age: Yup.date().required('common.validationRequired'),
});

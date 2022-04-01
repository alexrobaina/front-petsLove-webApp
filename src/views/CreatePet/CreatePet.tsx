import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineReportProblem } from 'react-icons/md';
import { useFormik } from 'formik';
import CreatePetForm from './components/CreatePetForm';
import { cleanErrorsAction, createPet } from '../../store/slices/pet/createPet';
import { validationCreatePet } from './helpers/validationInputSchema';
import { DASHBOARD } from '../../navigation/routes/routes';
import unicornAvatar from '../../assets/images/unicorn-avatar.jpg';
import Layout from '../../components/common/Layout';
import { TValues } from './types';
import { calculateAge } from '../../utils/calculateAge';
import { listUsersTypeRole } from '../../store/slices/user/getUsersTypeRole';
import { selectDataFormatted } from '../../utils/selectDataFormatted';
import BaseLoading from '../../components/common/BaseLoading';
import { FORM_STATE } from './contants';
import BaseDynamicMessage from '../../components/common/BaseDynamicMessage';
import BaseButton from '../../components/common/BaseButton';
import BaseImage from '../../components/common/BaseImage';
import styles from './CreatePet.module.scss';
import { useTranslate } from '../../hooks/useTranslate';

const CreatePet: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslate();
  const [usersAdopter, setUsersAdopter] = useState([{ label: '', value: '' }]);
  const [usersVet, setUsersVet] = useState([{ label: '', value: '' }]);
  const { error, isLoading, success } = useSelector((state: any) => state.createPet);
  const user: any = JSON.parse(localStorage.getItem('user') || '');
  const [userCreator, setUserCreator] = useState('');
  const { data } = useSelector((state: any) => state.getUsersTypeRole.listUsersTypeRole);

  useEffect(() => {
    const usersAdopterRole = data[0];
    const usersVetRole = data[1];

    if (usersAdopterRole?.userAdopterRole) {
      setUsersAdopter(selectDataFormatted(usersAdopterRole.userAdopterRole));
    }

    if (usersVetRole?.userVetRole) {
      setUsersVet(selectDataFormatted(usersVetRole.userVetRole));
    }
  }, [data]);

  useEffect(() => {
    setUserCreator(user._id);
  }, [setUserCreator, user]);

  const resetApiErrors = () => {
    dispatch(cleanErrorsAction());
  };

  const goToDashboard = () => {
    resetApiErrors();
    history.push(DASHBOARD);
  };

  const formik = useFormik({
    initialValues: FORM_STATE,
    validationSchema: validationCreatePet,
    onSubmit: (values: TValues) => {
      const newPet = {
        userCreator,
        bucket: 'pets',
        name: values.name,
        city: values.city,
        color: values.color,
        weight: values.weight,
        images: values.images,
        gender: values.gender,
        userVet: values.userVet,
        country: values.country,
        adopted: values.adopted,
        category: values.category,
        location: values.location,
        age: calculateAge(values.age),
        textAddress: values.textAddress,
        description: values.description,
        userAdopted: values.userAdopted,
        medicalNotes: values.medicalNotes,
      };
      dispatch(createPet(newPet));
    },
  });

  useEffect(() => {
    if (error) dispatch(cleanErrorsAction());

    dispatch(listUsersTypeRole({ role: ['userAdopterRole', 'userVetRole'] }));
  }, [dispatch]);

  const { values, handleChange, setFieldValue, handleSubmit, errors } = formik;

  if (error) {
    return (
      <BaseDynamicMessage
        testId="error-message-create-pet"
        title={t('common.someThingIsWrong')}
        image={
          <div className={styles.imageError}>
            <MdOutlineReportProblem color="#ce0000" size={150} />
          </div>
        }
        textActionButton={
          <BaseButton onClick={resetApiErrors} text={t('common.tryAgain')} />
        }
      />
    );
  }

  if (success) {
    return (
      <BaseDynamicMessage
        title={t('createPetSuccess')}
        testId="success-message-create-pet"
        image={<BaseImage src={unicornAvatar} testId="success-created-message" />}
        textActionButton={
          <BaseButton onClick={goToDashboard} text={t('createPet.goToDashboard')} />
        }
      />
    );
  }

  if (isLoading) {
    return <BaseLoading testId="create-pet" center marginTop={100} />;
  }

  return (
    <Layout paddingBottom={150} testId="create-pet">
      <CreatePetForm
        values={values}
        errors={errors}
        testId="create-pet-form"
        submitForm={handleSubmit}
        handleChange={handleChange}
        usersVetEmailList={usersVet}
        setFieldValue={setFieldValue}
        goToDashboard={goToDashboard}
        usersAdoptedEmailList={usersAdopter}
      />
    </Layout>
  );
};

export default CreatePet;

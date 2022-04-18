import { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineReportProblem } from 'react-icons/md';
import { GrFormCheckmark } from 'react-icons/gr';
import { useFormik } from 'formik';
import CreatePetForm from './components/CreatePetForm';
import { cleanErrorsAction, createPet } from '../../store/slices/pet/createPet';
import { validationCreatePet } from './helpers/validationInputSchema';
import { DASHBOARD } from '../../navigation/routes/routes';
import Layout from '../../components/common/Layout';
import { ICreatePet, TValues } from './types';
import { listUsersTypeRole } from '../../store/slices/user/getUsersTypeRole';
import { selectDataFormatted } from '../../utils/selectDataFormatted';
import BaseLoading from '../../components/common/BaseLoading';
import { FORM_STATE } from './contants';
import BaseDynamicMessage from '../../components/common/BaseDynamicMessage';
import BaseButton from '../../components/common/BaseButton';
import { useTranslate } from '../../hooks/useTranslate';
import {
  getPet,
  cleanErrorsAction as cleanErrorsGetPet,
} from '../../store/slices/pet/getPet';
import { updatePet, cleanErrorsUpdateAction } from '../../store/slices/pet/updatePet';
import styles from './CreatePet.module.scss';

const CreatePet: FC<ICreatePet> = ({ petId = '' }) => {
  const [titlePage, setTitlePage] = useState('createPet.createPet');
  const [imagesToDelete] = useState<any>([]);
  const [oldImages, setOldImages] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslate();
  const [usersAdopter, setUsersAdopter] = useState([{ label: '', value: '' }]);
  const [usersVet, setUsersVet] = useState([{ label: '', value: '' }]);
  const user: any = JSON.parse(localStorage.getItem('user') || '');
  const [userCreator, setUserCreator] = useState('');

  const { error, isLoading, success } = useSelector((state: any) => state.createPet);
  const updatePetSlice = useSelector((state: any) => state.updatePet);
  const { data } = useSelector((state: any) => state.getUsersTypeRole.listUsersTypeRole);
  const petSelected = useSelector((state: any) => state.getPet);

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

  const resetApiErrors = useCallback(() => {
    dispatch(cleanErrorsAction());
    dispatch(cleanErrorsUpdateAction());
    dispatch(cleanErrorsGetPet());
  }, [dispatch]);

  const goToDashboard = () => {
    resetApiErrors();
    history.push(DASHBOARD);
  };

  useEffect(() => {
    dispatch(listUsersTypeRole({ role: ['userAdopterRole', 'userVetRole'] }));
    resetApiErrors();

    if (petId) {
      setTitlePage('editPet.editPet');
      dispatch(getPet({ id: petId }));
    }
  }, [dispatch]);

  const formik = useFormik({
    initialValues: FORM_STATE,
    validationSchema: validationCreatePet,
    onSubmit: (values: TValues) => {
      const newPet = {
        _id: '',
        userCreator,
        age: values.age,
        imageDeleted: [],
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
        newImages: values.newImages,
        textAddress: values.textAddress,
        description: values.description,
        userAdopted: values.userAdopted,
        medicalNotes: values.medicalNotes,
      };
      if (petId) {
        newPet.imageDeleted = imagesToDelete;
        newPet._id = petId;
        dispatch(updatePet(newPet));
        return;
      }
      dispatch(createPet(newPet));
    },
  });

  const { values, handleChange, setFieldValue, handleSubmit, errors }: any = formik;

  const handleDeleteImages = useCallback((image: string, oldImagesSelected: any) => {
    const imagesDeleted = oldImagesSelected.filter((img: any) => {
      return image !== img;
    });
    imagesToDelete.push(image);
    setOldImages(imagesDeleted);
  }, []);

  useEffect(() => {
    if (petId) {
      if (petSelected.data?.petDB) {
        Object.entries(petSelected.data.petDB).forEach(([key, value]: any) => {
          if (key === 'images') {
            setOldImages(value);
          }
          values[key] = value;
        });
      }
    }
  }, [petSelected.data]);

  useEffect(() => {
    if (petId && updatePetSlice.success) {
      dispatch(getPet({ id: petId }));
    }
  }, [updatePetSlice.success]);

  if (error || updatePetSlice.error) {
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

  if (success || updatePetSlice.success) {
    return (
      <BaseDynamicMessage
        testId="success-message-create-pet"
        title={t('common.petSuccessCreateAndSuccess')}
        image={
          <div className={styles.successIcon}>
            <GrFormCheckmark color="#00c853" size={150} />
          </div>
        }
        textActionButton={
          <BaseButton onClick={goToDashboard} text={t('common.goToDashboard')} />
        }
      />
    );
  }

  if (isLoading || updatePetSlice.isLoading) {
    return <BaseLoading testId="create-pet" center marginTop={100} />;
  }

  return (
    <Layout paddingBottom={150} testId="create-pet">
      <CreatePetForm
        values={values}
        errors={errors}
        oldImages={oldImages}
        titlePage={titlePage}
        testId="create-pet-form"
        submitForm={handleSubmit}
        handleChange={handleChange}
        usersVetEmailList={usersVet}
        setFieldValue={setFieldValue}
        goToDashboard={goToDashboard}
        usersAdoptedEmailList={usersAdopter}
        handleDeleteImages={handleDeleteImages}
      />
    </Layout>
  );
};

export default CreatePet;

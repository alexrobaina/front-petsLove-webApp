import { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { GrFormCheckmark } from 'react-icons/gr';
import BaseDynamicMessage from '../../components/common/BaseDynamicMessage';
import Layout from '../../components/common/Layout';
import BaseButton from '../../components/common/BaseButton';
import BaseLoading from '../../components/common/BaseLoading';
import { useTranslate } from '../../hooks/useTranslate';
import styles from './EditUser.module.scss';
import { DASHBOARD } from '../../navigation/routes/routes';
import { getUser } from '../../store/slices/user/getUser';
import BaseTitle from '../../components/common/BaseTitle';
import BaseInput from '../../components/common/BaseInput';
import BaseInputPhone from '../../components/common/BaseInputPhone';
import InputUploadImage from '../../components/common/InputUploadImage';
import {
  cleanErrors,
  updateUser as updateUserFetch,
} from '../../store/slices/user/updateUser';
import GoogleAutocomplete from '../../components/common/GoogleAutocomplete';

const EditPet: FC = () => {
  const history = useHistory();
  const [oldImages, setOldImages] = useState([]);
  const userStorage = localStorage.getItem('user') || '';
  const userId: string = JSON.parse(userStorage)._id || '';
  const { t } = useTranslate();
  const { user, updateUser } = useSelector((state: any) => {
    return { user: state.getUser.getUser, updateUser: state.updateUser };
  });

  const dispatch = useDispatch();
  const FORM_STATE = {
    name: '',
    city: '',
    email: '',
    phone: '',
    aboutUs: '',
    lastname: '',
    location: {},
    firstname: '',
    newImages: [],
    textAddress: '',
    requirementsToAdopt: '',
  };

  const goToDashboard = () => {
    dispatch(cleanErrors());
    history.push(DASHBOARD);
  };

  useEffect(() => {
    dispatch(getUser(userId));
    setOldImages([]);
    dispatch(cleanErrors());
  }, []);

  const formik = useFormik({
    initialValues: FORM_STATE,
    onSubmit: (values: any) => {
      dispatch(updateUserFetch(values));
    },
  });

  const { values, handleChange, setFieldValue, handleSubmit, errors }: any = formik;

  const handleChangeAddress = (location: any) => {
    setFieldValue('location', location);
  };

  const handleChangeAddressComponents = useCallback((addressComponent: any) => {
    if (addressComponent?.address_components) {
      addressComponent.address_components.forEach((components: any) => {
        components.types.forEach((type: string) => {
          if (type === 'country') {
            setFieldValue('country', components.long_name);
          }
          if (type === 'administrative_area_level_1') {
            setFieldValue('city', components.long_name);
          }
        });
      });
    }
  }, []);

  const handleChangeTextAddress = useCallback((address: any) => {
    setFieldValue('textAddress', address);
  }, []);

  useEffect(() => {
    if (user.data) {
      Object.entries(user.data).forEach(([key, value]: any) => {
        if (key === 'image') {
          setOldImages(value);
        }
        setFieldValue(key, value);
      });
    }
  }, [user.data]);

  useEffect(() => {
    setOldImages([]);
  }, [values.newImages]);

  if (updateUser.success) {
    return (
      <BaseDynamicMessage
        testId="messages-update-user"
        title={t('editUser.updateUserSuccess')}
        image={
          <div className={styles.successIcon}>
            <GrFormCheckmark color="#00c853" size={150} />
          </div>
        }
        textActionButton={
          <BaseButton onClick={goToDashboard} text={t('createPet.goToDashboard')} />
        }
      />
    );
  }

  if (user.isLoading || updateUser.isLoading) {
    return <BaseLoading testId="create-pet" center marginTop={100} />;
  }

  return (
    <Layout paddingBottom={150} testId="edit-user">
      <form onSubmit={handleSubmit}>
        <BaseTitle
          center
          fontSize={50}
          marginTop={40}
          marginBottom={60}
          text="Editar usuario"
          testId="title-edit-user"
        />
        <InputUploadImage
          marginBottom={20}
          oldImages={oldImages}
          setFieldValue={setFieldValue}
          bucketUrl={process.env.REACT_APP_AWS_IMAGE_USERS_URL_BASE || ''}
        />
        <BaseInput
          marginTop={10}
          inputName="name"
          value={values.name}
          label="Nombre de usuario"
          handleChange={handleChange}
          placeholder="Nombre de usuario"
        />
        <BaseInput
          marginTop={10}
          label="Nombre real"
          inputName="firstname"
          value={values.firstname}
          placeholder="Nombre real"
          handleChange={handleChange}
        />
        <BaseInput
          marginTop={10}
          label="Apellido"
          inputName="lastname"
          value={values.lastname}
          placeholder="Apellido"
          handleChange={handleChange}
        />
        <BaseInput
          disabled
          type="text"
          label="Email"
          marginTop={10}
          inputName="email"
          placeholder="Email"
          marginBottom={10}
          value={values.email}
          handleChange={handleChange}
        />
        <GoogleAutocomplete
          name="google"
          value={values.textAddress}
          label={t('createPet.petLocation')}
          handleChangeAddress={handleChangeAddress}
          handleChangeTextAddress={handleChangeTextAddress}
          placeholder={t('editUser.userLocationPlaceHolder')}
          handleChangeAddressComponents={handleChangeAddressComponents}
        />
        {values.textAddress && <BaseTitle fontSize={14} text={values.textAddress} />}
        <BaseInput
          marginTop={10}
          label="requirementsToAdopt"
          handleChange={handleChange}
          inputName="requirementsToAdopt"
          value={values.requirementsToAdopt}
          placeholder="Requisitos para adoptar"
        />
        <BaseInput
          marginTop={10}
          inputName="aboutUs"
          label="Sobre nosotros"
          value={values.aboutUs}
          handleChange={handleChange}
          placeholder="Pequeña historia o Descripcion sobre usted."
        />
        <BaseInputPhone
          marginTop={10}
          label="Telefono"
          inputName="phone"
          testId="edit-user"
          defaultCountry="ar"
          countryList={['ar']}
          value={values.phone || ''}
          setFieldValue={setFieldValue}
          errorMessage={t(errors.phone)}
        />
        <div className={styles.containerActions}>
          <BaseButton type="submit" text={t('common.save')} />
          <BaseButton onClick={goToDashboard} text={t('common.cancel')} />
        </div>
      </form>
    </Layout>
  );
};

export default EditPet;

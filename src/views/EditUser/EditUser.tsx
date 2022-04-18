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

  const goToProfile = () => {
    dispatch(cleanErrors());
    window.open(
      `${process.env.REACT_APP_NEXT_JS_APP}profile-user/${user.data?._id}`,
      '_blank',
    );
  };

  const goToDashboard = () => {
    dispatch(cleanErrors());
    history.push(DASHBOARD);
  };

  const tryAgain = () => {
    dispatch(cleanErrors());
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

  if (updateUser.success || updateUser.error) {
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
          <div className={styles.actionsMessageRequest}>
            {updateUser.error ? (
              <BaseButton onClick={tryAgain} text={t('common.tryAgain')} />
            ) : (
              <>
                <BaseButton onClick={goToProfile} text={t('common.goToProfile')} />
                <BaseButton onClick={goToDashboard} text={t('common.goToDashboard')} />
              </>
            )}
          </div>
        }
      />
    );
  }

  if (user.isLoading || updateUser.isLoading) {
    return <BaseLoading testId="edit-user" center marginTop={100} />;
  }

  return (
    <Layout paddingBottom={150} testId="edit-user">
      <form onSubmit={handleSubmit}>
        <BaseTitle
          center
          fontSize={50}
          marginTop={40}
          marginBottom={60}
          testId="title-edit-user"
          text={t('editUser.title')}
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
          handleChange={handleChange}
          errorMessage={t(errors.name)}
          label={t('editUser.labelUsername')}
          placeholder={t('editUser.placeholderUsername')}
        />
        <BaseInput
          marginTop={10}
          inputName="firstname"
          value={values.firstname}
          handleChange={handleChange}
          label={t('editUser.firstNameLabel')}
          placeholder={t('editUser.firstnamePlaceholder')}
        />
        <BaseInput
          marginTop={10}
          inputName="lastname"
          value={values.lastname}
          handleChange={handleChange}
          errorMessage={t(errors.lastname)}
          label={t('editUser.lastnameLabel')}
          placeholder={t('editUser.lastnamePlaceholder')}
        />
        <BaseInput
          disabled
          type="text"
          marginTop={10}
          inputName="email"
          marginBottom={10}
          value={values.email}
          label={t('common.email')}
          handleChange={handleChange}
          placeholder="email@test.com"
          errorMessage={t(errors.email)}
        />
        {/* @ts-ignore */}
        <GoogleAutocomplete
          name="google"
          handleChangeAddress={handleChangeAddress}
          label={t('editUser.googleAutocompleteLabel')}
          handleChangeTextAddress={handleChangeTextAddress}
          placeholder={t('editUser.googleAutocompletePlaceHolder')}
          handleChangeAddressComponents={handleChangeAddressComponents}
        />
        {values.textAddress && <BaseTitle fontSize={14} text={values.textAddress} />}
        <BaseInput
          marginTop={10}
          handleChange={handleChange}
          inputName="requirementsToAdopt"
          value={values.requirementsToAdopt}
          errorMessage={t(errors.requirementsToAdopt)}
          label={t('editUser.requirementsToAdoptLabel')}
          placeholder={t('editUser.requirementsToAdoptPlaceholder')}
        />
        <BaseInput
          marginTop={10}
          inputName="aboutUs"
          value={values.aboutUs}
          handleChange={handleChange}
          errorMessage={t(errors.aboutUs)}
          label={t('editUser.aboutUsLabel')}
          placeholder={t('editUser.aboutUsPlaceholder')}
        />
        <BaseInputPhone
          marginTop={10}
          inputName="phone"
          testId="edit-user"
          defaultCountry="ar"
          countryList={['ar']}
          label={t('common.phone')}
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

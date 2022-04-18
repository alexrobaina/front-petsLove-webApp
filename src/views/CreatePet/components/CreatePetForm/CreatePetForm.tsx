import { FC, useState, useCallback, useEffect, ChangeEvent } from 'react';
import { motion } from 'framer-motion';

import BaseInput from '../../../../components/common/BaseInput';
import BaseButton from '../../../../components/common/BaseButton';
import BaseTitle from '../../../../components/common/BaseTitle';
import { VARIANTS_OPACITY } from '../../../../constants/animation';
import { useTranslate } from '../../../../hooks/useTranslate';
import BaseTextarea from '../../../../components/common/BaseTextarea';
import BaseSelectInput from '../../../../components/common/BaseSelectInput';
import GoogleAutocomplete from '../../../../components/common/GoogleAutocomplete';
import BaseRadioButton from '../../../../components/common/BaseRadioButton';
import PopUp from '../../../../components/common/PopUp';
import MedicalNotesItem from '../MedicalNotesItems';
import { ICreatePetFormProps } from '../../types';
import InputUploadImage from '../../../../components/common/InputUploadImage';

import styles from './CreatePetForm.module.scss';

const CreatePetForm: FC<ICreatePetFormProps> = ({
  testId,
  values,
  errors,
  oldImages,
  titlePage,
  submitForm,
  handleChange,
  setFieldValue,
  goToDashboard,
  usersVetEmailList,
  handleDeleteImages,
  usersAdoptedEmailList,
}) => {
  const { t } = useTranslate();
  const [modalIsOpen, setModal] = useState(false);
  const [canAddMedicalNote, setCanAddMedicalNote] = useState(true);

  const closeModalMedicalNote = () => {
    setModal(false);
  };

  const categoryOptions = [
    { label: t('common.dog'), value: 'dog' },
    { label: t('common.cat'), value: 'cat' },
    { label: t('common.exotic'), value: 'exotic' },
  ];

  const addMedicalNote = (): void => {
    closeModalMedicalNote();
    const medicalNotesCopy = Array.from(values.medicalNotes);
    medicalNotesCopy.push({
      description: values.detailMedicalNote,
      title: values.titleMedicalNote,
      date: new Date(),
    });
    setFieldValue('medicalNotes', medicalNotesCopy);
  };

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

  const validateMedicalNote = useCallback(() => {
    return values.detailMedicalNote === '' || values.titleMedicalNote === '';
  }, [values]);

  const handleChangeMedicalDetail = (e: ChangeEvent<HTMLInputElement>): void => {
    setCanAddMedicalNote(validateMedicalNote());
    values.detailMedicalNote = e.target.value;
  };

  const handleChangeMedicalTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    setCanAddMedicalNote(validateMedicalNote());
    values.titleMedicalNote = e.target.value;
  };

  const handleCloseModal = () => {
    setModal(true);
    values.detailMedicalNote = '';
    values.titleMedicalNote = '';
  };

  const handleDelete = useCallback(
    (indexNote: number): void => {
      const medicalNotesCopy = Array.from(values.medicalNotes);
      if (medicalNotesCopy) {
        medicalNotesCopy.splice(indexNote, 1);
        setFieldValue('medicalNotes', medicalNotesCopy);
      }
    },
    [values?.medicalNotes],
  );

  useEffect(() => {
    setCanAddMedicalNote(validateMedicalNote());
  }, [setCanAddMedicalNote, validateMedicalNote, values]);

  return (
    <div data-testid={`form-container-${testId}`} className={styles.container}>
      <form onSubmit={submitForm} className={styles.columns}>
        <motion.div
          initial="hidden"
          animate="visible"
          data-testid="create-pet"
          variants={VARIANTS_OPACITY}
          transition={{ ease: 'easeOut', delay: 0.2 }}
        >
          <BaseTitle
            center
            fontSize={50}
            marginTop={40}
            marginBottom={60}
            text={t(titlePage)}
          />
          <InputUploadImage
            marginBottom={20}
            oldImages={oldImages}
            setFieldValue={setFieldValue}
            handleDeleteImages={handleDeleteImages}
            bucketUrl={process.env.REACT_APP_AWS_IMAGE_PETS_URL_BASE || ''}
          />
          <BaseRadioButton
            inputName="adopted"
            text={t('createPet.isAdopted')}
            isChecked={values.adopted === true}
            setFieldValue={() => {
              setFieldValue('adopted', !values.adopted);
            }}
          />
          <BaseInput
            type="text"
            marginTop={10}
            testId={testId}
            inputName="name"
            value={values.name}
            handleChange={handleChange}
            errorMessage={t(errors.name)}
            label={t('createPet.namePet')}
            placeholder={t('createPet.namePetPlaceholder')}
          />
          <BaseInput
            type="date"
            marginTop={10}
            testId={testId}
            inputName="age"
            value={values.age}
            label={t('common.age')}
            handleChange={handleChange}
            errorMessage={t(errors.age)}
            placeholder={t('createPet.agePetPlaceholder')}
          />
          <BaseInput
            type="text"
            marginTop={10}
            testId={testId}
            inputName="color"
            value={values.color}
            label={t('common.color')}
            handleChange={handleChange}
            errorMessage={t(errors.color)}
            placeholder={t('createPet.colorPetPlaceholder')}
          />
          <BaseInput
            type="number"
            marginTop={10}
            testId={testId}
            marginBottom={10}
            inputName="weight"
            value={values.weight}
            label={t('common.weight')}
            handleChange={handleChange}
            errorMessage={t(errors.weight)}
            placeholder={t('createPet.weightPetPlaceholder')}
          />
          {/* @ts-ignore */}
          <GoogleAutocomplete
            name="google"
            value={values.textAddress}
            label={t('createPet.petLocation')}
            handleChangeAddress={handleChangeAddress}
            handleChangeTextAddress={handleChangeTextAddress}
            placeholder={t('createPet.petLocationPlaceHolder')}
            handleChangeAddressComponents={handleChangeAddressComponents}
          />
          {values.textAddress && <BaseTitle fontSize={14} text={values.textAddress} />}
          <BaseSelectInput
            marginTop={10}
            testId="category"
            inputName="category"
            value={values.category}
            options={categoryOptions}
            label={t('common.category')}
            placeholder={t('common.dog')}
            setFieldValue={setFieldValue}
            errorMessage={t(errors.category)}
          />
          <BaseSelectInput
            marginTop={10}
            testId="gender"
            inputName="gender"
            value={values.gender}
            label={t('common.gender')}
            setFieldValue={setFieldValue}
            placeholder={t('common.gender')}
            options={[
              { label: t('common.male'), value: 'male' },
              { label: t('common.female'), value: 'female' },
            ]}
            errorMessage={t(errors.gender)}
          />
          <BaseSelectInput
            marginTop={10}
            testId="user-adopted"
            inputName="userAdopted"
            setFieldValue={setFieldValue}
            options={usersAdoptedEmailList}
            value={values.userAdopted || ''}
            label={t('createPet.userAdopterEmail')}
            placeholder={t('createPet.adopterEmailPlanceholder')}
          />
          <BaseSelectInput
            testId="vet"
            marginTop={10}
            inputName="userVet"
            label={t('common.vet')}
            value={values.userVet || ''}
            options={usersVetEmailList}
            setFieldValue={setFieldValue}
            placeholder={t('createPet.vetEmailPlanceholder')}
          />
          <BaseTextarea
            marginTop={10}
            testId={testId}
            inputName="description"
            value={values.description}
            handleChange={handleChange}
            label={t('common.description')}
            errorMessage={t(errors.description)}
            placeholder={t('createPet.petDescriptionPlaceHolder')}
          />
          <BaseTitle marginTop={20} text={t('common.medicalNotes')} />
          <PopUp
            modalIsOpen={modalIsOpen}
            handleCloseModal={closeModalMedicalNote}
            title={t('createPet.titleModalMedicalNote')}
          >
            <>
              <BaseInput
                type="text"
                marginTop={10}
                testId={testId}
                inputName="titleMedicalNote"
                value={values.titleMedicalNote}
                label={t('createPet.titleMedicalNote')}
                handleChange={handleChangeMedicalTitle}
                errorMessage={t(errors.titleMedicalNote)}
                placeholder={t('createPet.titleMedicalNotePlaceholder')}
              />
              <BaseTextarea
                marginTop={10}
                testId={testId}
                inputName="detailMedicalNote"
                value={values.detailMedicalNote}
                handleChange={handleChangeMedicalDetail}
                errorMessage={t(errors.detailMedicalNote)}
                label={t('createPet.detailMedicalNoteLabel')}
                placeholder={t('createPet.detailMedicalNotePlaceholder')}
              />
              <div className={styles.containerButtonMedicalModal}>
                <BaseButton
                  medium
                  marginTop={15}
                  text={t('common.add')}
                  onClick={addMedicalNote}
                  disabled={canAddMedicalNote}
                />
              </div>
            </>
          </PopUp>
          {values.medicalNotes.map(
            (note: { title: string; description: string }, index: number) => (
              <MedicalNotesItem
                key={note.title}
                title={note.title}
                description={note.description}
                handleDelete={() => handleDelete(index)}
                testId={`medical-notes-item-${note.title}`}
              />
            ),
          )}
          <BaseButton
            marginTop={15}
            onClick={handleCloseModal}
            text={t('createPet.createMedicalNote')}
          />
          <div className={styles.containerActions}>
            <BaseButton type="submit" text={t('common.save')} />
            <BaseButton onClick={goToDashboard} text={t('common.cancel')} />
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default CreatePetForm;

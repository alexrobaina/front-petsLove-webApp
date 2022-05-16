import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BaseButton from '../../components/common/BaseButton';

import BaseInput from '../../components/common/BaseInput';
import BaseNotifyMessage from '../../components/common/BaseNotifyMessage';
import BaseRadioButton from '../../components/common/BaseRadioButton';
import BaseTitle from '../../components/common/BaseTitle';
import PaginationList from '../../components/common/PaginationList';
import { USER_ADOPTER_ROLE, USER_VET_ROLE } from '../../constants/roles';
import { useTranslate } from '../../hooks/useTranslate';
import {
  dashboard,
  filterDashboardPets,
  deletePet,
} from '../../store/slices/user/dashboard';
import ActionsButtons from './components/ActionsButtons';
import CardPet from './components/CardPet';
import CardsData from './components/CardsData';
import styles from './Dashboard.module.scss';

const Dashboard: FC = () => {
  const [namePet, setNamePet] = useState('');
  const [gender, setGender] = useState('female');
  const [allPets, setAllPets] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isAdopted, setAdopted] = useState(false);
  const [category, setCategory] = useState('dog');
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const { pets } = useSelector((state: any) => state.dashboard.petsDashboard);
  const userString: any = localStorage.getItem('user');
  const user: { _id: string; role: string; userCreator: string } = JSON.parse(userString);
  const userId: string = user?._id || '';

  const handleChangePage = (e: any, pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleDeletePet = (id: string) => {
    setPage(1);
    dispatch(deletePet(id));
  };

  const handleAllPet = () => {
    setPage(1);
    setAllPets(!allPets);
    setGender('');
    setCategory('');
    setNamePet('');
    setAdopted(false);
  };

  const handleGenderPet = (e: any) => {
    setPage(1);
    setGender(e.target.name);
  };

  const handleCategoryPet = (e: any) => {
    setPage(1);
    setCategory(e.target.name);
  };

  const handleNamePet = (e: any) => {
    setPage(1);
    setNamePet(e.target.value);
  };

  const handleAdoptedPet = () => {
    setPage(1);
    setAdopted(!isAdopted);
  };

  const canBeChangeDeletePet = useCallback(
    (pet) => {
      if (userId === pet.userCreator) {
        return true;
      }
      return false;
    },
    [user.role],
  );

  const canShow = useCallback(() => {
    if (user?.role === USER_VET_ROLE || user?.role === USER_ADOPTER_ROLE) {
      return false;
    }
    return true;
  }, [user.role, userId]);

  const handleViewProfile = (id: string) => {
    window.open(`${process.env.REACT_APP_NEXT_JS_APP}profile-pet/${id}`, '_blank');
  };

  useEffect(() => {
    if (userId) dispatch(dashboard({ userId }));
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(
        filterDashboardPets({
          userId,
          gender,
          isAdopted,
          namePet,
          limit,
          page,
          category,
        }),
      );
    }
  }, [userId, gender, isAdopted, namePet, limit, page, category, dispatch]);

  return (
    <div className={styles.container}>
      <BaseTitle marginBottom={50} fontSize={40} text={t('common.dashboardTitle')} />
      <ActionsButtons />
      <CardsData userRole={user?.role} />
      <BaseInput
        marginTop={20}
        inputName="search"
        testId="name-filter-pet"
        handleChange={handleNamePet}
        label={t('dashboard.namePet')}
        placeholder={t('dashboard.nameFilterPlaceholder')}
      />
      <div className={styles.containerFilters}>
        <div className={styles.containerRadioButtons}>
          <BaseRadioButton
            inputName="exotic"
            text={t('common.exotics')}
            isChecked={category === 'exotic'}
            handleChange={handleCategoryPet}
          />
          <BaseRadioButton
            inputName="cat"
            text={t('common.cats')}
            isChecked={category === 'cat'}
            handleChange={handleCategoryPet}
          />
          <BaseRadioButton
            inputName="dog"
            text={t('common.dogs')}
            isChecked={category === 'dog'}
            handleChange={handleCategoryPet}
          />
          {canShow() && (
            <BaseRadioButton
              inputName="isAdopted"
              isChecked={isAdopted}
              text={t('common.adopted')}
              setFieldValue={handleAdoptedPet}
            />
          )}
          <BaseRadioButton
            inputName="female"
            text={t('common.female')}
            handleChange={handleGenderPet}
            isChecked={gender === 'female'}
          />
          <BaseRadioButton
            inputName="male"
            text={t('common.male')}
            isChecked={gender === 'male'}
            handleChange={handleGenderPet}
          />
          <div>
            <BaseButton text={t('dashboard.removeFilters')} onClick={handleAllPet} />
          </div>
        </div>
      </div>
      {pets?.pets?.length === 0 && (
        <BaseNotifyMessage message={t('common.petsNotFound')} />
      )}
      {pets?.pets && (
        <div className={styles.containerPets}>
          {pets.pets.map((pet: any) => {
            return (
              <CardPet
                id={pet._id}
                key={pet._id}
                name={pet.name}
                images={pet.images}
                gender={pet.gender}
                adopted={pet.adopted}
                handleDeletePet={handleDeletePet}
                handleViewProfile={handleViewProfile}
                canBeChangeDeletePet={canBeChangeDeletePet(pet)}
              />
            );
          })}
        </div>
      )}
      {pets.pets?.length > 0 && (
        <PaginationList
          page={page}
          limit={limit}
          total={pets.total}
          handleChange={handleChangePage}
        />
      )}
    </div>
  );
};

export default Dashboard;

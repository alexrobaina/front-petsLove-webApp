import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BaseInput from '../../components/common/BaseInput';
import BaseNotifyMessage from '../../components/common/BaseNotifyMessage';
import BaseRadioButton from '../../components/common/BaseRadioButton';
import BaseTitle from '../../components/common/BaseTitle';
import PaginationList from '../../components/common/PaginationList';
import { useTranslate } from '../../hooks/useTranslate';
import { dashboard, filterDashboardPets } from '../../store/slices/user/dashboard';
import ActionsButtons from './components/ActionsButtons';
import CardPet from './components/CardPet';
import CardsData from './components/CardsData';
import styles from './Dashboard.module.scss';

const Dashboard: FC = () => {
  const [namePet, setNamePet] = useState('');
  const [gender, setGender] = useState('female');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isAdopt, setIsAdopt] = useState(false);
  const [category, setCategoryFilter] = useState('dog');
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const { pets } = useSelector((state: any) => state.dashboard.petsDashboard);
  const userString: any = localStorage.getItem('user');
  const user: { _id: string } = JSON.parse(userString);
  const userId: string = user?._id || '';

  const handleChangePage = (e: any, pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleGenderPet = (e: any) => {
    setPage(1);
    setGender(e.target.name);
  };

  const handleNamePet = (e: any) => {
    setPage(1);
    setNamePet(e.target.value);
  };

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
          isAdopt,
          namePet,
          limit,
          page,
          category,
        }),
      );
    }
  }, [userId, gender, isAdopt, namePet, limit, page, category, dispatch]);

  return (
    <div className={styles.container}>
      <BaseTitle marginBottom={50} fontSize={40} text={t('common.dashboardTitle')} />
      <CardsData
        isAdopt={isAdopt}
        setIsAdopt={setIsAdopt}
        categoryFilter={category}
        setCategoryFilter={setCategoryFilter}
      />
      <ActionsButtons />
      <BaseInput
        marginTop={20}
        inputName="search"
        testId="name-filter-pet"
        handleChange={handleNamePet}
        label={t('dashboard.namePet')}
        placeholder={t('dashboard.nameFilterPlaceholder')}
      />
      <div className={styles.containerFilters}>
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
                handleViewProfile={handleViewProfile}
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

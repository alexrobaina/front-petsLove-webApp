import { FC } from 'react';
import { AiOutlineEdit, AiOutlineFolderView } from 'react-icons/ai';
import BaseButton from '../../components/common/BaseButton';
import BaseImage from '../../components/common/BaseImage';
import BaseInput from '../../components/common/BaseInput';
import BaseRadioButton from '../../components/common/BaseRadioButton';
import BaseText from '../../components/common/BaseText';
import BaseTitle from '../../components/common/BaseTitle';
import styles from './Dashboard.module.scss';

const Dashboard: FC = () => {
  return (
    <div className={styles.container}>
      <BaseTitle marginBottom={50} fontSize={40} text="Dashboard" />
      <div className={styles.containerCardCounts}>
        <div className={styles.cardCount}>
          <BaseTitle center text="Perros" />
          <BaseTitle center fontSize={40} marginTop={15} text="20" />
        </div>
        <div className={styles.cardCount}>
          <BaseTitle center text="Gatos" />
          <BaseTitle center fontSize={40} marginTop={15} text="12" />
        </div>
        <div className={styles.cardCount}>
          <BaseTitle center text="Exóticos" />
          <BaseTitle center fontSize={40} marginTop={15} text="5" />
        </div>
        <div className={styles.cardCount}>
          <BaseTitle center text="Adoptados" />
          <BaseTitle center fontSize={40} marginTop={15} text="3" />
        </div>
        <div className={styles.cardCount}>
          <BaseTitle center text="En adopcion" />
          <BaseTitle center fontSize={40} marginTop={15} text="17" />
        </div>
      </div>
      <div>
        <div className={styles.actionCreateNewPet}>
          <BaseButton marginTop={50} text="Create Pet" />
          <BaseButton marginTop={50} text="Edit profile" />
        </div>
        <BaseInput
          testId="asd"
          marginTop={20}
          inputName="search"
          label="Name filter"
          placeholder="buscar mascota por nombre"
        />
        <div className={styles.containerFilters}>
          <BaseRadioButton isChecked handleChange={() => {}} text="Adopted" />
          <BaseRadioButton isChecked handleChange={() => {}} text="Adopt" />
          <BaseRadioButton isChecked handleChange={() => {}} text="Female" />
          <BaseRadioButton isChecked handleChange={() => {}} text="Male" />
        </div>
      </div>
      <div className={styles.containerPets}>
        <div className={styles.card}>
          <BaseImage
            width="100%"
            height="200px"
            objectFit="cover"
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80"
          />
          <div className={styles.cardInfo}>
            <div className={styles.containerActions}>
              <BaseButton icon={<AiOutlineEdit size={20} />} />
              <BaseButton icon={<AiOutlineFolderView size={20} />} />
            </div>
            <div className={styles.containerInfo}>
              <BaseTitle text="Sotopo" />
              <BaseText text="Adopted" />
            </div>
            <div className={styles.containerDataDetail}>
              <BaseText marginRight={10} text="sexo:" />
              <BaseText text="female" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { FC } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaRegEye } from 'react-icons/fa';
import BaseButton from '../../../../components/common/BaseButton';
import BaseImage from '../../../../components/common/BaseImage';
import BaseText from '../../../../components/common/BaseText';
import BaseTitle from '../../../../components/common/BaseTitle';
import { useTranslate } from '../../../../hooks/useTranslate';
import styles from './CardPet.module.scss';

interface Props {
  id: string;
  name: string;
  gender: string;
  images: string;
  adopted: boolean;
  handleViewProfile: Function;
}

const CardPet: FC<Props> = ({
  id,
  name,
  gender,
  adopted,
  images,
  handleViewProfile,
}: any) => {
  const { t } = useTranslate();

  return (
    <div className={styles.card}>
      <BaseImage width="100%" height="200px" objectFit="cover" src={images[0]} />
      <div className={styles.cardInfo}>
        <div className={styles.containerActions}>
          <BaseButton icon={<AiOutlineEdit size={20} />} />
          <BaseButton
            onClick={() => handleViewProfile(id)}
            icon={<FaRegEye size={20} />}
          />
        </div>
        <div className={styles.containerInfo}>
          <BaseTitle text={name} />
          <BaseText text={adopted ? 'Adopted' : 'In adoption'} />
        </div>
        <div className={styles.containerDataDetail}>
          <BaseText marginRight={10} text={t('dashboard.sex')} />
          <BaseText text={gender} />
        </div>
      </div>
    </div>
  );
};

export default CardPet;
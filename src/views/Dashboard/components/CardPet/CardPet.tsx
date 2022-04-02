import { FC } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaRegEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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
  images,
  adopted,
  handleViewProfile,
}: any) => {
  const { t } = useTranslate();

  return (
    <div className={styles.card}>
      <BaseImage
        width="100%"
        height="200px"
        objectFit="cover"
        src={`${
          process.env.REACT_APP_AWS_IMAGE_PETS_URL_BASE ||
          'https://petslove-bucket-2.s3.amazonaws.com/pets/'
        }${images[0]}`}
      />
      <div className={styles.cardInfo}>
        <div className={styles.containerActions}>
          <Link to={`edit-pet/${id}`}>
            <BaseButton icon={<AiOutlineEdit size={20} />} />
          </Link>
          <BaseButton
            icon={<FaRegEye size={20} />}
            onClick={() => handleViewProfile(id)}
          />
        </div>
        <div className={styles.containerInfo}>
          <BaseTitle capitalize text={name} />
          <BaseText
            capitalize
            text={adopted ? t('common.adopted') : t('common.adoption')}
          />
        </div>
        <div className={styles.containerDataDetail}>
          <BaseText marginRight={10} text={t('dashboard.sex')} />
          <BaseText capitalize text={gender} />
        </div>
      </div>
    </div>
  );
};

export default CardPet;

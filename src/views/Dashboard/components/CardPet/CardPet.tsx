import { FC } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaRegEye } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
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
  handleDeletePet: Function;
  handleViewProfile: Function;
  canBeChangeDeletePet: boolean;
}

const CardPet: FC<Props> = ({
  id,
  name,
  gender,
  images,
  adopted,
  handleDeletePet,
  handleViewProfile,
  canBeChangeDeletePet,
}: any) => {
  const { t } = useTranslate();

  return (
    <div className={styles.card}>
      <BaseImage
        width="100%"
        height="200px"
        objectFit="cover"
        src={`${process.env.REACT_APP_AWS_IMAGE_PETS_URL_BASE}${images[0]}`}
      />
      <div className={styles.cardInfo}>
        <div className={styles.containerActions}>
          <Link className={styles.buttonLink} to={`edit-pet/${id}`}>
            <BaseButton icon={<AiOutlineEdit size={20} />} />
          </Link>
          <BaseButton
            icon={<FaRegEye size={20} />}
            onClick={() => handleViewProfile(id)}
          />
          {canBeChangeDeletePet && (
            <BaseButton
              backgroundColor="#c62828"
              onClick={() => handleDeletePet(id)}
              icon={<MdDeleteForever color="#ffffff" size={23} />}
            />
          )}
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
          <BaseText capitalize text={t(`common.${gender}`)} />
        </div>
      </div>
    </div>
  );
};

export default CardPet;

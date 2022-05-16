import { FC } from 'react';
import { useSelector } from 'react-redux';
import BaseTitle from '../../../../components/common/BaseTitle';
import { useTranslate } from '../../../../hooks/useTranslate';
import styles from './CardsData.module.scss';
import { USER_SHELTER_ROLE } from '../../../../constants/roles';

interface Props {
  userRole: string;
}

const CardsData: FC<Props> = ({ userRole }) => {
  const { t } = useTranslate();
  const { data } = useSelector((state: any) => state.dashboard.userDashboard);

  return (
    <div className={styles.containerCardCounts}>
      {data.dogs !== 0 && (
        <div className={styles.cardCount}>
          <BaseTitle center text={t('common.dogs')} />
          <BaseTitle center fontSize={30} text={data.dogs} />
        </div>
      )}
      {data.cats !== 0 && (
        <div className={styles.cardCount}>
          <BaseTitle center text={t('common.cats')} />
          <BaseTitle center fontSize={30} text={data.cats} />
        </div>
      )}
      {data.exotics !== 0 && (
        <div className={styles.cardCount}>
          <BaseTitle center text={t('common.exotics')} />
          <BaseTitle center fontSize={30} text={data.exotics} />
        </div>
      )}
      {userRole === USER_SHELTER_ROLE && (
        <>
          <div className={styles.cardCount}>
            <BaseTitle center text={t('common.adopted')} />
            <BaseTitle center fontSize={30} text={data.adopted} />
          </div>
          <div className={styles.cardCount}>
            <BaseTitle center text={t('common.adoption')} />
            <BaseTitle center fontSize={30} text={data.adoption} />
          </div>
        </>
      )}
    </div>
  );
};

export default CardsData;

import { FC } from 'react';
import c from 'classnames';
import { useSelector } from 'react-redux';
import BaseTitle from '../../../../components/common/BaseTitle';
import { useTranslate } from '../../../../hooks/useTranslate';
import styles from './CardsData.module.scss';

interface Props {
  isAdopt: boolean;
  setIsAdopt: Function;
  categoryFilter: string;
  setCategoryFilter: (filter: string) => void;
}

const Dashboard: FC<Props> = ({
  isAdopt,
  setIsAdopt,
  categoryFilter,
  setCategoryFilter,
}) => {
  const { t } = useTranslate();
  const { data } = useSelector((state: any) => state.dashboard.userDashboard);

  return (
    <div className={styles.containerCardCounts}>
      {data.dogs !== 0 && (
        <div
          onClick={() => setCategoryFilter('dog')}
          className={c(categoryFilter === 'dog' && styles.selected, styles.cardCount)}
        >
          <BaseTitle center text={t('common.dogs')} />
          <BaseTitle center fontSize={40} marginTop={15} text={data.dogs} />
        </div>
      )}
      {data.cats !== 0 && (
        <div
          onClick={() => setCategoryFilter('cat')}
          className={c(categoryFilter === 'cat' && styles.selected, styles.cardCount)}
        >
          <BaseTitle center text={t('common.cats')} />
          <BaseTitle center fontSize={40} marginTop={15} text={data.cats} />
        </div>
      )}
      {data.exotics !== 0 && (
        <div
          onClick={() => setCategoryFilter('exotic')}
          className={c(categoryFilter === 'exotic' && styles.selected, styles.cardCount)}
        >
          <BaseTitle center text={t('common.exotics')} />
          <BaseTitle center fontSize={40} marginTop={15} text={data.exotics} />
        </div>
      )}
      <div
        onClick={() => setIsAdopt(true)}
        className={c(isAdopt === true && styles.selected, styles.cardCount)}
      >
        <BaseTitle center text={t('common.adopted')} />
        <BaseTitle center fontSize={40} marginTop={15} text={data.adopted} />
      </div>
      <div
        onClick={() => setIsAdopt(false)}
        className={c(isAdopt === false && styles.selected, styles.cardCount)}
      >
        <BaseTitle center text={t('common.adoption')} />
        <BaseTitle center fontSize={40} marginTop={15} text={data.adoption} />
      </div>
    </div>
  );
};

export default Dashboard;

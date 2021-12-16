import { FC } from 'react';
import BaseText from '../../../BaseText';
import styles from './MenuItem.module.scss';

interface Props {
  text: string;
}

const MenuItem: FC<Props> = ({ text }) => {
  return (
    <div className={styles.menuItemContainer}>
      <BaseText bold text={text} />
    </div>
  );
};

export default MenuItem;

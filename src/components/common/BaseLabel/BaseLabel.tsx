import { FC } from 'react';
import styles from './BaseLabel.module.scss';

interface Props {
  text?: string;
  marginBottom?: number;
}

const BaseLabel: FC<Props> = ({ text, marginBottom = 0 }) => {
  return (
    <div style={{ marginBottom }}>
      <label className={styles.label}>{text}</label>
    </div>
  );
};

export default BaseLabel;

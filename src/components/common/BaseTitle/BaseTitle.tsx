import { FC } from 'react';
import c from 'classnames';
import styles from './BaseTitle.module.scss';

interface Props {
  text?: string;
  testId?: string;
  center?: boolean;
  fontSize?: number;
  pointer?: boolean;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
}

const BaseTitle: FC<Props> = ({
  text,
  testId,
  center,
  pointer,
  fontSize,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
}) => {
  return (
    <div
      data-testid={`title-${testId}`}
      style={{ fontSize, marginTop, marginLeft, marginRight, marginBottom }}
      className={c(styles.title, center && styles.center, pointer && styles.pointer)}
    >
      {text}
    </div>
  );
};

export default BaseTitle;

import { FC } from 'react';
import c from 'classnames';
import styles from './BaseText.module.scss';

interface Props {
  color?: string;
  bold?: boolean;
  thin?: boolean;
  testId?: string;
  center?: boolean;
  medium?: boolean;
  fontSize?: number;
  regular?: boolean;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  text?: string | number;
}

const BaseText: FC<Props> = ({
  testId,
  fontSize,
  text = 16,
  marginTop,
  marginLeft,
  marginRight,
  thin = true,
  marginBottom,
  color = '',
  bold = false,
  medium = false,
  center = false,
  regular = false,
}) => {
  return (
    <div
      style={{
        color,
        fontSize,
        marginTop,
        marginLeft,
        marginRight,
        marginBottom,
      }}
      data-testid={`text-${testId}`}
      className={c(
        styles.text,
        bold && styles.bold,
        thin && styles.thin,
        center && styles.center,
        medium && styles.medium,
        regular && styles.regular,
      )}
    >
      {text}
    </div>
  );
};

export default BaseText;

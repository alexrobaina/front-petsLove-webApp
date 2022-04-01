import { FC, MouseEventHandler } from 'react';
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
  capitalize?: boolean;
  marginRight?: number;
  marginBottom?: number;
  text: string | number;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}

const BaseText: FC<Props> = ({
  testId,
  onClick,
  fontSize,
  text = 16,
  marginTop,
  marginLeft,
  marginRight,
  thin = false,
  marginBottom,
  color = '',
  bold = false,
  medium = false,
  center = false,
  regular = false,
  capitalize = false,
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
      onClick={onClick}
      data-testid={`text-${testId}`}
      className={c(
        styles.text,
        bold && styles.bold,
        thin && styles.thin,
        center && styles.center,
        medium && styles.medium,
        regular && styles.regular,
        capitalize && styles.capitalize,
      )}
    >
      {text}
    </div>
  );
};

export default BaseText;

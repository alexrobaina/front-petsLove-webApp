import { FC } from 'react';
import c from 'classnames';
import styles from './BaseImage.module.scss';

interface Props {
  src?: string;
  left?: boolean;
  testId?: string;
  width?: number;
  right?: boolean;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
}

const BaseImage: FC<Props> = ({
  src,
  width,
  testId,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  left = false,
  right = false,
}) => {
  return (
    <div
      data-testid={`base-image-${testId}`}
      style={{ marginTop, marginLeft, marginRight, marginBottom }}
      className={c(styles.container, left && styles.left, right && styles.right)}
    >
      <img data-testid="image" style={{ width }} src={src} alt="baseImage" />
    </div>
  );
};

export default BaseImage;

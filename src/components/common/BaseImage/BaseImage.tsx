import { FC } from 'react';
import c from 'classnames';
import noImage from '../../../assets/images/no-photo.png';
import styles from './BaseImage.module.scss';

interface Props {
  src?: string;
  left?: boolean;
  testId?: string;
  width?: string;
  height?: string;
  right?: boolean;
  objectFit?: any;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
}

const BaseImage: FC<Props> = ({
  src,
  width,
  height,
  testId,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  left = false,
  right = false,
  objectFit = 'none',
}) => {
  return (
    <div
      data-testid={`base-image-${testId}`}
      style={{ marginTop, marginLeft, marginRight, marginBottom }}
      className={c(styles.container, left && styles.left, right && styles.right)}
    >
      <img
        src={src}
        alt="baseImage"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = noImage;
        }}
        data-testid="image"
        style={{ width, height, objectFit }}
      />
    </div>
  );
};

export default BaseImage;

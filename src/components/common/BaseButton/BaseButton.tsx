import { FC, ReactChild } from 'react';
import c from 'classnames';
import styles from './BaseButton.module.scss';

interface Props {
  text?: string;
  type?: string;
  color?: string;
  testId?: string;
  small?: boolean;
  large?: boolean;
  medium?: boolean;
  fontSize?: number;
  success?: boolean;
  icon?: ReactChild;
  onClick?: Function;
  disabled?: boolean;
  marginTop?: number;
  marginRight?: number;
  secundary?: boolean;
  isLoading?: boolean;
  marginBottom?: number;
  transparent?: boolean;
  isButtonLink?: boolean;
  backgroundColor?: string;
}

const BaseButton: FC<Props> = ({
  text = '',
  type = '',
  color = '',
  testId = '',
  icon = null,
  fontSize = 16,
  small = false,
  large = false,
  marginTop = 0,
  medium = false,
  success = false,
  marginRight = 0,
  marginBottom = 0,
  disabled = false,
  isLoading = false,
  onClick = () => {},
  backgroundColor = '',
  isButtonLink = false,
}) => {
  const click = () => {
    if (isLoading || disabled) {
      return;
    }
    onClick();
  };

  if (isButtonLink) {
    return (
      <div
        onClick={click}
        data-testid={`button-link-${testId}`}
        className={c(
          styles.isButtonLink,
          small && styles.small,
          large && styles.large,
          medium && styles.medium,
          icon && styles.iconContainer,
        )}
        style={{ marginTop, marginBottom, fontSize, marginRight }}
      >
        <div className={styles.icon}>{icon}</div>
        <div className={styles.linkText}>{text}</div>
      </div>
    );
  }

  return (
    <button
      tabIndex={0}
      onClick={click}
      disabled={disabled}
      data-testid={`button-${testId}`}
      className={c(
        styles.button,
        styles.buttonPrimary,
        small && styles.small,
        large && styles.large,
        medium && styles.medium,
        icon && styles.iconContainer,
        success && styles.buttonStateSuccess,
        disabled && styles.buttonStateDisabled,
      )}
      style={{ marginTop, marginBottom, backgroundColor, color }}
      type={type === 'submit' ? 'submit' : 'button'}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      {text && <div className={styles.text}>{text}</div>}
    </button>
  );
};

export default BaseButton;

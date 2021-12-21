import { FC, ChangeEvent } from 'react';
import { getColor } from '../../../utils/getColor';
import BaseText from '../BaseText';
import styles from './BaseRadioButton.module.scss';

interface Props {
  text?: string;
  value?: string;
  inputName?: string;
  isChecked: boolean;
  errorMessage?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const BaseRadioButton: FC<Props> = ({
  value,
  text = '',
  inputName,
  isChecked,
  handleChange,
  errorMessage,
}) => {
  return (
    <label className={styles.container}>
      <input
        type="radio"
        value={value}
        name={inputName}
        checked={isChecked}
        onChange={handleChange}
      />
      <BaseText
        bold
        text={text}
        marginLeft={5}
        color={errorMessage && getColor('--strong-red')}
      />
    </label>
  );
};

export default BaseRadioButton;

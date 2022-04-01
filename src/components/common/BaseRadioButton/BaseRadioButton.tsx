import { FC, ChangeEvent, MouseEventHandler, useCallback } from 'react';
import { getColor } from '../../../utils/getColor';
import BaseText from '../BaseText';
import styles from './BaseRadioButton.module.scss';

interface Props {
  value?: any;
  text?: string;
  inputName?: string;
  isChecked: boolean;
  errorMessage?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  setFieldValue?: MouseEventHandler<HTMLDivElement> | undefined;
}

const BaseRadioButton: FC<Props> = ({
  value,
  text = '',
  inputName,
  isChecked,
  handleChange,
  errorMessage,
  setFieldValue,
}) => {
  const handleChangeCallback = useCallback((event) => {
    if (handleChange) {
      handleChange(event);
    }
  }, []);

  return (
    <label className={styles.container}>
      <input
        type="radio"
        value={value}
        name={inputName}
        checked={isChecked}
        onChange={handleChangeCallback}
      />
      <BaseText
        bold
        text={text}
        marginLeft={5}
        onClick={setFieldValue}
        color={errorMessage && getColor('--strong-red')}
      />
    </label>
  );
};

export default BaseRadioButton;

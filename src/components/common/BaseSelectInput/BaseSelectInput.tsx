import { FC, useState, useEffect } from 'react';
import Select from 'react-select';
import { useTranslate } from '../../../hooks/useTranslate';
import { getColor } from '../../../utils/getColor';
import BaseErrorMessage from '../BaseErrorMessage';
import BaseLabel from '../BaseLabel';
import styles from './BaseSelectInput.module.scss';

type OptionType = { label: string; value: string }[];
interface ISelectInputProps {
  value: string;
  label?: string;
  testId: string;
  inputName?: string;
  marginTop?: number;
  options: OptionType;
  setFieldValue?: any;
  isLoading?: boolean;
  placeholder: string;
  isClearable?: boolean;
  marginBottom?: number;
  errorMessage?: string;
  isSearcheable?: boolean;
}

const BaseSelectInput: FC<ISelectInputProps> = ({
  value,
  options,
  isLoading,
  label = '',
  testId = '',
  setFieldValue,
  marginTop = 0,
  inputName = '',
  marginBottom = 0,
  placeholder = '',
  errorMessage = '',
  isClearable = false,
}) => {
  const { t } = useTranslate();
  const errorFormatted = t(errorMessage || '');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (errorMessage) {
      setError(errorFormatted);
    }
  }, [errorMessage, errorFormatted]);

  return (
    <div data-testid={`react-select-${testId}`} style={{ marginTop, marginBottom }}>
      {label && <BaseLabel text={label} />}
      <Select
        styles={styles}
        name={inputName}
        options={options}
        isLoading={isLoading}
        placeholder={placeholder}
        className={styles.select}
        isClearable={isClearable}
        value={options.find((option) => option.value === value)}
        components={{
          IndicatorSeparator: null,
        }}
        onChange={(option: any) => {
          setFieldValue(inputName, option.value);
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            neutral30: getColor('--input-hover'),
            neutral20: errorMessage
              ? getColor('--input-error')
              : getColor('--input-border-color'),
            primary50: getColor('--input-hover'),
            primary: getColor('--input-focus'),
          },
        })}
      />
      {errorMessage && <BaseErrorMessage text={error} />}
    </div>
  );
};

export default BaseSelectInput;

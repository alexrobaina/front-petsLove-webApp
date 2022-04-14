import { FC, useState, useCallback, useEffect } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { useTranslate } from '../../../hooks/useTranslate';
import BaseLabel from '../BaseLabel';
import styles from './googleAutocomplete.module.scss';

const GoogleAutocomplete: FC<any> = ({
  name = '',
  label = '',
  icon = null,
  inputRef = null,
  placeholder = '',
  handleSearch = null,
  handleChangeAddress = null,
  handleChangeTextAddress = null,
  handleChangeAddressComponents = null,
}) => {
  const [address, setAddress] = useState('');
  const { t } = useTranslate();

  const handleChange = useCallback((addressChange: string) => {
    if (addressChange === '') {
      if (handleChangeTextAddress && handleChangeAddressComponents) {
        handleChangeAddressComponents([]);
      }
    }

    setAddress(addressChange);
  }, []);

  const configAddress = async (addressSelected: string) => {
    setAddress(addressSelected);

    if (handleChangeTextAddress) {
      handleChangeTextAddress(addressSelected);
    }

    if (handleSearch) {
      handleSearch();
    }
    if (handleChangeTextAddress) {
      handleChangeTextAddress(addressSelected);
    }

    const results = await geocodeByAddress(addressSelected);
    const latLng = await getLatLng(results[0]);

    if (handleChangeAddress) {
      handleChangeAddress(latLng);
    }

    if (handleChangeAddressComponents) {
      handleChangeAddressComponents(results[0]);

      if (handleSearch) {
        handleSearch();
      }
    }
  };

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={configAddress}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          return (
            <>
              <div className={styles.containerInput}>
                {label && <BaseLabel bold text={label} />}
                {/* @ts-ignore */}
                <input
                  name={name}
                  ref={inputRef}
                  className={styles.input}
                  {...getInputProps({
                    placeholder,
                  })}
                />
                {icon && <div className={styles.icon}>{icon}</div>}
              </div>
              <div className={styles.dropdown}>
                {loading && <div className={styles.text}>{t('common.loading')}</div>}
                {suggestions.map((suggestion: any) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? {
                        backgroundColor: 'rgba(146, 154, 230, 0.30)',
                        cursor: 'pointer',
                        padding: '10px',
                      }
                    : {
                        backgroundColor: 'rgb(255, 255, 255)',
                        cursor: 'pointer',
                        padding: '10px',
                      };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span className={styles.descriptionAddress}>
                        {suggestion.description}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          );
        }}
      </PlacesAutocomplete>
    </>
  );
};

export default GoogleApiWrapper({
  // @ts-ignore
  apiKey: process.env.REACT_APP_API_KEY_GOOGLE,
  language: 'es',
  // @ts-ignore
})(GoogleAutocomplete);

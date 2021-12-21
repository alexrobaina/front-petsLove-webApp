import { useIntl } from 'react-intl';

export const useTranslate = () => {
  const intl = useIntl();

  const t = (textKey: string | undefined) => {
    if (!textKey) {
      return '';
    }

    return intl.formatMessage({
      id: textKey,
    });
  };
  return { t };
};

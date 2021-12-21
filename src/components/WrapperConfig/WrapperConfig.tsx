import { ReactElement, FC, useState, useCallback, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import Header from '../Header';
import spanishAR from '../../languages/es-AR.json';
import englishUS from '../../languages/en-US.json';
import { DARK, LIGHT } from '../Header/contants';
import '../../styles/themeLight.scss';
import '../../styles/themeDark.scss';

interface Props {
  children: ReactElement;
}

const WrapperConfig: FC<Props> = ({ children }) => {
  const local = navigator.language;
  const [theme, setTheme] = useState(LIGHT);
  const [langSelected, setLangSelected] = useState(englishUS);

  const setLanguage = (lang: string) => {
    if (lang === 'en-US') return setLangSelected(englishUS);
    return setLangSelected(spanishAR);
  };

  const changeThemne = useCallback((selectedTheme: string) => {
    setTheme(selectedTheme);
    if (selectedTheme === DARK) {
      document.body.classList.add(DARK);
      document.body.classList.remove(LIGHT);
    }
    if (selectedTheme === LIGHT) {
      document.body.classList.add(LIGHT);
      document.body.classList.remove(DARK);
    }
  }, []);

  useEffect(() => {
    changeThemne(LIGHT);
  }, [changeThemne]);

  return (
    <IntlProvider locale={local} messages={langSelected}>
      <div data-testid="wrapperConfig-app">
        <Header setLanguage={setLanguage} changeTheme={changeThemne} theme={theme} />
        {children}
      </div>
    </IntlProvider>
  );
};

export default WrapperConfig;

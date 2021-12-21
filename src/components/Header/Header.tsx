import { FC } from 'react';
import BaseTitle from '../common/BaseTitle';
import BasicMenu from '../common/BasicMenu';
// import ThemeChange from './components/ThemeChange';
import styles from './Header.module.scss';

interface Props {
  theme: string;
  changeTheme: (selectedTheme: string) => void;
  setLanguage: (selectedTheme: string) => void;
}

const ITEMS = [
  { text: 'ES', value: 'es-AR' },
  { text: 'EN', value: 'en-US' },
];

const Header: FC<Props> = ({
  // changeTheme,
  // theme,
  setLanguage,
}) => {
  return (
    <div data-testid="header-app" className={styles.header}>
      <BaseTitle fontSize={20} text="Pets Love" />
      <div className={styles.containerNavegation}>
        {/* <ThemeChange changeTheme={changeTheme} theme={theme} /> */}
        <BasicMenu handleSelectItem={setLanguage} items={ITEMS} />
      </div>
    </div>
  );
};

export default Header;

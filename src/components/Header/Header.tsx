import { FC } from 'react';
import { IoMdLogOut } from 'react-icons/io';
import { BiSearchAlt } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import { LOGIN } from '../../navigation/routes/routes';
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
  const token = localStorage.getItem('token');
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('token');
    history.push(LOGIN);
  };

  return (
    <div data-testid="header-app" className={styles.header}>
      <a className={styles.iconButton} href={`${process.env.REACT_APP_NEXT_JS_APP}`}>
        <BaseTitle fontSize={18} text="Pets Love" />
      </a>
      <div className={styles.containerNavegation}>
        {/* <ThemeChange changeTheme={changeTheme} theme={theme} /> */}
        <BasicMenu handleSelectItem={setLanguage} items={ITEMS} />
        <a className={styles.iconButton} href={`${process.env.REACT_APP_NEXT_JS_APP}`}>
          <BiSearchAlt size={30} />
        </a>
        {token && (
          <div className={styles.iconButton} onClick={() => logout()}>
            <IoMdLogOut size={30} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

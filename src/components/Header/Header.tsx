import { FC, useCallback } from 'react';
import { IoMdLogOut } from 'react-icons/io';
import { BiSearchAlt } from 'react-icons/bi';
import { BsFillHeartFill } from 'react-icons/bs';
import { MdDashboard } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { DASHBOARD, LOGIN } from '../../navigation/routes/routes';
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

  const goToDashboard = useCallback(() => {
    history.push(DASHBOARD);
  }, []);

  return (
    <div data-testid="header-app" className={styles.header}>
      {token ? (
        <MdDashboard
          size={28}
          onClick={goToDashboard}
          className={styles.dashboardAction}
        />
      ) : (
        <a className={styles.iconButton} href={`${process.env.REACT_APP_NEXT_JS_APP}`}>
          <BaseTitle marginRight={5} fontSize={18} text="Pets" />
          <BsFillHeartFill size={20} />
        </a>
      )}
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

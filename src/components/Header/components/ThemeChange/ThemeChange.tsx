import { FC } from 'react';
import { FaRegMoon } from 'react-icons/fa';
import { BsFillEmojiSunglassesFill } from 'react-icons/bs';
import { DARK, LIGHT } from '../../contants';
import styles from './ThemeChange.module.scss';

interface Props {
  changeTheme: (theme: string) => void;
  theme: string;
}

const ThemeChange: FC<Props> = ({ changeTheme, theme }) => {
  return (
    <>
      {theme === DARK && (
        <div className={styles.setLight} onClick={() => changeTheme(LIGHT)}>
          <BsFillEmojiSunglassesFill size={22} />
        </div>
      )}
      {theme === LIGHT && (
        <div className={styles.setDark} onClick={() => changeTheme(DARK)}>
          <FaRegMoon size={20} />
        </div>
      )}
    </>
  );
};

export default ThemeChange;

import { FC, useState } from 'react';
import { FaRegMoon } from 'react-icons/fa';
import { BsFillEmojiSunglassesFill } from 'react-icons/bs';
import styles from './ThemeChange.module.scss';

const DARK = 'dark';
const LIGHT = 'light';

const ThemeChange: FC = () => {
  const { theme, setTheme }: any = useState(DARK);

  return (
    <>
      {theme === DARK && (
        <div className={styles.setLight} onClick={() => setTheme(LIGHT)}>
          <BsFillEmojiSunglassesFill size={22} />
        </div>
      )}
      {theme === LIGHT && (
        <div className={styles.setDark} onClick={() => setTheme(DARK)}>
          <FaRegMoon size={20} />
        </div>
      )}
    </>
  );
};

export default ThemeChange;

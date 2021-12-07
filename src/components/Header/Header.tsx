import { FC } from "react";
import BaseTitle from "../common/BaseTitle";
import ThemeChange from "./components/ThemeChange";
import styles from "./Header.module.scss";

interface Props {
  changeTheme: (selectedTheme: string) => void;
  theme: string;
}

const Header: FC<Props> = ({ changeTheme, theme }) => {
  return (
    <div data-testid="header-app" className={styles.header}>
      <BaseTitle fontSize={20} text="ETH Wallet" />
      <ThemeChange changeTheme={changeTheme} theme={theme} />
    </div>
  );
};

export default Header;

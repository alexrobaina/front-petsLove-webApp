import { ReactElement, FC, useState, useCallback, useEffect } from "react";
import Header from "../Header";
import { DARK, LIGHT } from "../Header/contants";
import "./theme.scss";

interface Props {
  children: ReactElement;
}

const WrapperConfig: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState(LIGHT);

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
    <div data-testid="wrapperConfig-app">
      <Header changeTheme={changeThemne} theme={theme} />
      {children}
    </div>
  );
};

export default WrapperConfig;

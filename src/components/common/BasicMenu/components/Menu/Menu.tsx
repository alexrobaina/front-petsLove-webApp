import { FC, ReactNode } from 'react';
import c from 'classnames';
import styles from './Menu.module.scss';

interface Props {
  children: ReactNode;
  open: boolean;
}

const Menu: FC<Props> = ({ children, open }) => {
  return <div className={c(styles.toggleMenu, open && styles.open)}>{children}</div>;
};

export default Menu;

import { useState, FC } from 'react';
import { FaLanguage } from 'react-icons/fa';
import Menu from './components/Menu';
import MenuItem from './components/MenuItem';
import styles from './BasicMenu.module.scss';

interface Props {
  items: any;
  handleSelectItem: (selectedTheme: string) => void;
}

const BasicMenu: FC<Props> = ({ items, handleSelectItem }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleToggleSelected = (value: string) => {
    setOpen(!isOpen);
    handleSelectItem(value);
  };

  const handleToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <div className={styles.containerBasicMenu}>
      <div className={styles.iconButton} onClick={handleToggle}>
        <FaLanguage size={30} />
      </div>
      <Menu open={isOpen}>
        <>
          {items.map((item: { text: string; value: string }) => (
            <div key={item.value} onClick={() => handleToggleSelected(item.value)}>
              <MenuItem key={item.text} text={item.text} />
            </div>
          ))}
        </>
      </Menu>
    </div>
  );
};

export default BasicMenu;

import { FC, ReactElement } from 'react';
import c from 'classnames';
import { motion } from 'framer-motion';
import { VARIANTS_OPACITY } from '../../../constants/animation';
import styles from './Layout.module.scss';

interface Props {
  testID: string;
  center?: boolean;
  children?: ReactElement;
}

const Layout: FC<Props> = ({ children, testID, center }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={VARIANTS_OPACITY}
      className={styles.layout}
      transition={{ ease: 'easeOut', delay: 0.2 }}
    >
      <div
        data-testid={`layout-${testID}`}
        className={c(styles.row, center && styles.center)}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Layout;

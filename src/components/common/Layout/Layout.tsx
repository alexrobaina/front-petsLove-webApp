import { FC, ReactElement } from 'react';
import c from 'classnames';
import { motion } from 'framer-motion';
import { VARIANTS_OPACITY } from '../../../constants/animation';
import styles from './Layout.module.scss';

interface Props {
  testId: string;
  center?: boolean;
  paddingBottom?: number;
  children?: ReactElement;
}

const Layout: FC<Props> = ({ children, testId, center, paddingBottom }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      style={{ paddingBottom }}
      className={styles.layout}
      variants={VARIANTS_OPACITY}
      transition={{ ease: 'easeOut', delay: 0.2 }}
    >
      <div
        data-testid={`layout-${testId}`}
        className={c(styles.row, center && styles.center)}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Layout;

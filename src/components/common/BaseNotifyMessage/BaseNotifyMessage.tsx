import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import c from 'classnames';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import styles from './BaseNotifyMessage.module.scss';

interface NotifyProps {
  testId?: string;
  message: string;
  canClose?: boolean;
  clearErrorCallback?: Function;
}

const BaseNotifyMessage: FC<NotifyProps> = ({
  testId,
  message,
  canClose = false,
  clearErrorCallback = () => {},
}) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    clearErrorCallback();
    if (canClose) setIsOpen(false);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      onClick={() => handleClose()}
      data-testid={`notify-${testId}`}
      transition={{ ease: 'easeOut', delay: 0.3 }}
      className={c(styles.container, !isOpen && styles.isOpen)}
    >
      <div className={styles.close}>
        <IoMdCloseCircleOutline size={22} />
      </div>
      <div className={styles.message}>{message}</div>
    </motion.div>
  );
};

export default BaseNotifyMessage;

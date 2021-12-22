import { motion } from 'framer-motion';
import { FC } from 'react';
import BaseButton from '../BaseButton';
import BaseImage from '../BaseImage';
import BaseText from '../BaseText';
import styles from './BaseResponseMessage.module.scss';

interface NotifyProps {
  image?: string;
  testId?: string;
  message: string;
  goTo?: Function;
  buttonText?: string;
}

const BaseResponseMessage: FC<NotifyProps> = ({
  testId,
  message,
  image = '',
  buttonText = '',
  goTo = () => {},
}) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={styles.container}
      data-testid={`response-${testId}`}
      transition={{ ease: 'easeOut', delay: 0.3 }}
    >
      <BaseImage marginTop={50} width="500px" src={image} />
      <BaseText marginTop={30} fontSize={20} bold text={message} />
      {goTo && (
        <div className={styles.actions}>
          <BaseButton marginTop={40} onClick={goTo} text={buttonText} />
        </div>
      )}
    </motion.div>
  );
};

export default BaseResponseMessage;

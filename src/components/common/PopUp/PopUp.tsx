import { FC, ReactNode } from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { GrClose } from 'react-icons/gr';
import styles from './popUp.module.scss';

interface Props {
  title: string;
  children: ReactNode;
  modalIsOpen: boolean;
  handleCloseModal?: (value: boolean) => void;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    bakgroundColor: 'white',
  },
  overlay: {
    background: 'rgba(0,0,0,0.5)',
  },
};

const PopUp: FC<Props> = ({ title, children, handleCloseModal, modalIsOpen }) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const canClose = () => {
    if (handleCloseModal) handleCloseModal(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
      contentLabel="Example Modal"
      onRequestClose={() => canClose()}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className={styles.layout}
        transition={{ ease: 'easeOut' }}
      >
        <div className={styles.modalContainer}>
          <div className={styles.header}>
            <div className={styles.title}>{title}</div>
            <div className={styles.close} onClick={canClose}>
              <GrClose size={20} />
            </div>
          </div>
          <div className={styles.children}>{children}</div>
        </div>
      </motion.div>
    </Modal>
  );
};

export default PopUp;

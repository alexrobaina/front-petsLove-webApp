import { FC } from 'react';
import { motion } from 'framer-motion';
import BaseImage from '../../../../components/common/BaseImage';
import ethLogo from '../../../../assets/images/ethereum.png';
import BaseText from '../../../../components/common/BaseText';
import { VARIANTS_OPACITY } from '../../../../constants/animation';
import styles from './CardBalance.module.scss';
import BaseLoading from '../../../../components/common/BaseLoading';

interface Props {
  balance: number;
  isLoading: boolean;
}

const CardBalance: FC<Props> = ({ balance, isLoading }) => {
  return (
    <>
      <BaseText marginTop={40} bold fontSize={12} text="Available to send" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={VARIANTS_OPACITY}
        data-testid="card-balance"
        className={styles.containerBalance}
        transition={{ ease: 'easeOut', delay: 0.2 }}
      >
        <div className={styles.titleCrypto}>
          <BaseImage width={50} src={ethLogo} />
          <BaseText medium fontSize={16} text="ETH Wallet" />
        </div>
        {isLoading ? (
          <BaseLoading small testId="account" />
        ) : (
          <BaseText medium fontSize={15} text={`${balance || '0.0000'} ETH`} />
        )}
      </motion.div>
    </>
  );
};

export default CardBalance;

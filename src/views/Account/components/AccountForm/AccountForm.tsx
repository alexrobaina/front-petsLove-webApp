import { FC, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import BaseInput from '../../../../components/common/BaseInput';
import BaseNotifyMessage from '../../../../components/common/BaseNotifyMessage';
import BaseButton from '../../../../components/common/BaseButton';
import CardBalance from '../CardBalance';
import BaseTitle from '../../../../components/common/BaseTitle';
import BaseText from '../../../../components/common/BaseText';
import { VARIANTS_OPACITY } from '../../../../constants/animation';
import { maskAddress } from '../../../../utils/maskAddress';
import styles from './AccountForm.module.scss';

interface Props {
  testId: string;
  balance: number;
  disabled: boolean;
  isLoading: boolean;
  getOwnBalance: any;
  userAddress: string;
  errorAccount: string;
  sendTransaction: any;
  isWeb3Initialized: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  values: { address: string; amount: string; to: string; errorAccount: string };
}

const AccountForm: FC<Props> = ({
  testId,
  values,
  balance,
  disabled,
  isLoading,
  userAddress,
  errorAccount,
  handleChange,
  getOwnBalance,
  sendTransaction,
  isWeb3Initialized,
}) => {
  const canGetBalance = (balanceState: number) => {
    return balanceState === 0;
  };

  const getBalance = async (address: string) => {
    await getOwnBalance(address);
  };

  return (
    <div data-testid={`form-container-${testId}`} className={styles.container}>
      <BaseText bold marginTop={15} text="Your account" />
      <BaseText text={maskAddress(userAddress)} />
      <form className={styles.columns}>
        {!isWeb3Initialized && (
          <BaseNotifyMessage testId="web3-error" message="Please connect to MetaMask" />
        )}
        <div className={styles.containerAction}>
          <BaseButton
            large
            marginTop={30}
            text="Get balance"
            disabled={disabled}
            onClick={() => getBalance(userAddress)}
          />
        </div>
        {balance !== 0 && <CardBalance isLoading={isLoading} balance={balance} />}
        {balance !== 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={VARIANTS_OPACITY}
            data-testid="card-balance"
            transition={{ ease: 'easeOut', delay: 0.2 }}
          >
            <BaseTitle marginTop={40} fontSize={20} text="Send Transaction" />
            {errorAccount !== '' && (
              <BaseNotifyMessage testId="web3-error" message={errorAccount} />
            )}
            <BaseInput
              label="To"
              type="text"
              inputName="to"
              marginTop={10}
              testId={testId}
              value={values.to}
              handleChange={handleChange}
              placeholder="Wallet address"
            />
            <BaseInput
              type="text"
              label="Amount"
              marginTop={10}
              testId={testId}
              inputName="amount"
              placeholder="Amount"
              value={values.amount}
              handleChange={handleChange}
            />
            <BaseButton
              large
              marginTop={30}
              text="Send transaction"
              disabled={canGetBalance(balance)}
              onClick={() => sendTransaction(values.to, values.amount)}
            />
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default AccountForm;

import { FC, useCallback, useEffect } from 'react';
import { useFormik } from 'formik';
import Layout from '../../components/common/Layout';
import AccountForm from './components/AccountForm';
import { useWallet } from '../../hooks/useWallet';

const Account: FC = () => {
  const [getOwnBalance, state, sendTransaction]: any = useWallet();

  const formik = useFormik({
    onSubmit: () => {},
    initialValues: { address: '', amount: '', to: '', errorAccount: '' },
  });

  const isDisabledGetBalance = useCallback(
    (account: string) => {
      return account === '';
    },
    [state.account],
  );

  useEffect(() => {
    if (state.account) getOwnBalance(state.account);
  }, [state.account]);

  const { values, handleChange } = formik;

  return (
    <Layout testID="home">
      <AccountForm
        values={values}
        testId="account"
        balance={state.balance}
        handleChange={handleChange}
        isLoading={state.isLoading}
        userAddress={state.account}
        getOwnBalance={getOwnBalance}
        sendTransaction={sendTransaction}
        errorAccount={state.errorAccount}
        isWeb3Initialized={state.isInitialized}
        disabled={isDisabledGetBalance(state.account)}
      />
    </Layout>
  );
};

export default Account;

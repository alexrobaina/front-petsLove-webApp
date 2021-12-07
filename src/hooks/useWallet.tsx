import { useEffect, useState } from 'react';
import Web3 from 'web3';

let web3: any;

export const useWallet = () => {
  const [state, setState] = useState({
    balance: 0,
    account: '',
    isLoading: false,
    errorAccount: '',
    isInitialized: false,
  });
  // @ts-ignore: Unreachable code error
  const provider = window.ethereum;
  web3 = new Web3(provider);

  const getOwnBalance = async (address: string) => {
    setState({ ...state, isLoading: true });
    web3.eth
      .getBalance(address)
      .then((balance: any) => {
        const balanceFormatted = web3.utils.fromWei(balance, 'ether');
        setTimeout(() => {
          setState({ ...state, balance: balanceFormatted, isLoading: false });
        }, 2000);
      })
      .catch(() => {
        setState({ ...state, errorAccount: 'Something is wrong with MetaMask' });
      });
  };

  const sendTransaction = async (to: string, amount: string) => {
    setState({ ...state, errorAccount: '' });
    try {
      web3.eth
        .sendTransaction({
          from: state.account,
          to,
          value: web3.utils.toWei(amount, 'ether'),
          gasLimit: 21000,
          gasPrice: 20000000000,
        })
        .then((receipt: { account: string }) => {
          if (receipt) getOwnBalance(state.account);
          setState({ ...state, errorAccount: '' });
        })
        .catch((error: any) => {
          setState({ ...state, errorAccount: error?.message || 'Something is wrong' });
        });
    } catch {
      setState({ ...state, errorAccount: 'Check the destination address' });
    }
  };

  const init = async () => {
    setState({ ...state, errorAccount: '' });
    if (typeof provider !== 'undefined') {
      provider
        .request({ method: 'eth_requestAccounts' })
        .then((accounts: [string]) => {
          setState({ ...state, account: accounts[0], isInitialized: true });
        })
        .catch(() => {
          setState({ ...state, errorAccount: 'Please connect with MetaMask' });
        });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return [getOwnBalance, state, sendTransaction];
};

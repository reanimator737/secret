import React from 'react';
import Button from '@mui/material/Button';
import { ethers } from 'ethers';
import { useAppDispatch } from '@/hooks/stateHooks';
import { setProvider, setSigner } from '@/store/user';

export const ConnectButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const onClick = async () => {
    let provider;
    // @ts-ignore
    if (window.ethereum === null) {
      console.log('MetaMask not installed; using read-only defaults');
      provider = new ethers.EtherscanProvider();
      dispatch(setProvider(provider));
    } else {
      try {
        // @ts-ignore
        provider = new ethers.BrowserProvider(window.ethereum);

        let signer = await provider.getSigner();
        console.log(signer);
        dispatch(setSigner(signer));
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Button color="secondary" onClick={onClick}>
      Connect Wallet
    </Button>
  );
};

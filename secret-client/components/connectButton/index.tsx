import React from 'react';
import Button from '@mui/material/Button';
import { ethers } from 'ethers';

export const ConnectButton: React.FC = () => {
  const onClick = async () => {
    let signer = null;

    let provider;
    //@ts-ignore
    if (window.ethereum == null) {
      // If MetaMask is not installed, we use the default provider,
      // which is backed by a variety of third-party services (such
      // as INFURA). They do not have private keys installed so are
      // only have read-only access
      console.log('MetaMask not installed; using read-only defaults');
      //@ts-ignore
      provider = ethers.getDefaultProvider();
      console.log(provider);
    } else {
      // Connect to the MetaMask EIP-1193 object. This is a standard
      // protocol that allows Ethers access to make all read-only
      // requests through MetaMask.
      //@ts-ignore
      provider = new ethers.BrowserProvider(window.ethereum);

      // It also provides an opportunity to request access to write
      // operations, which will be performed by the private key
      // that MetaMask manages for the user.
      signer = await provider.getSigner();

      console.log(signer);
    }
  };

  return (
    <Button color="secondary" onClick={onClick}>
      Connect Wallet
    </Button>
  );
};

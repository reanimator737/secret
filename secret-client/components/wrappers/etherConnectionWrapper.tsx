import React, { PropsWithChildren, useEffect } from 'react';

export const EtherConnectionWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    window.ethereum.on('accountsChanged', async (accounts) => {
      if (accounts.length > 0 accounts[0] !== currentAccount){
        currentAccount = accounts[0];
      }
    })
  }, []);

  return <>{children}</>;
};

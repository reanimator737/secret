import React, { useCallback } from 'react';
import Button from '@mui/material/Button';
import { useAppDispatch } from '@/hooks/stateHooks';
import { tryGetSigner } from '@/utils/loginFunc';

export const ConnectButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const onClick = useCallback(() => tryGetSigner(dispatch), [dispatch]);

  return (
    <Button color="secondary" onClick={onClick}>
      Connect Wallet
    </Button>
  );
};

import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { isAddress } from 'ethers';
import { useCreateNewUserMutation } from '@/store/service';
import { LoadingButton } from '@mui/lab';
import { useAppSelector } from '@/hooks/stateHooks';
import { useGetSign } from '@/hooks/useSign';

interface ICreateNewUserModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const CreateNewUserModal: React.FC<ICreateNewUserModalProps> = ({ isOpen, handleClose }) => {
  const [createNewUser, { error, isError, isLoading, isSuccess }] = useCreateNewUserMutation();
  //TODO
  const signer = useAppSelector((state) => state.connector.signer);
  const { call } = useGetSign();
  //TODO
  const [wallet, setWallet] = useState<string>(signer?.address ?? '');
  const [walletError, setWalletError] = useState<string>('');
  const [nickName, setNickName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [avatar, setAvatar] = useState<File | null>(null);

  useEffect(() => {
    if (isError) {
      setWalletError(error.data.message);
    }
  }, [isError, setWalletError, error]);

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess, handleClose]);

  const onAddressChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setWallet(event.target.value);
    setWalletError('');
  }, []);

  const onNickNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNickName(event.target.value);
  }, []);

  const onDescriptionChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }, []);

  const onAvatarChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newAvatar = event.target?.files?.[0];
    if (newAvatar) {
      setAvatar(newAvatar);
    }
  }, []);

  const onButtonClick = async () => {
    if (!isAddress(wallet)) {
      setWalletError('Incorrect wallet');
      return;
    }

    const signMsg = await call();

    if (!signMsg) {
      console.log('smth go wrong with signMsg');
      return;
    }

    const formData = new FormData();
    formData.append('address', wallet);
    formData.append('nickName', nickName ?? null);
    formData.append('description', description ?? null);

    if (avatar) {
      formData.append('avatar', avatar);
    }

    createNewUser({ formData, signMsg });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle align="center">Sign In</DialogTitle>
      <DialogContent>
        <TextField
          error={!!walletError}
          id="address"
          label="Wallet"
          variant="outlined"
          required
          fullWidth
          margin="dense"
          helperText={walletError}
          onChange={onAddressChange}
          value={wallet}
        />
        <TextField
          id="nickName"
          label="Display name"
          variant="outlined"
          fullWidth
          margin="dense"
          value={nickName}
          onChange={onNickNameChange}
        />
        <TextField
          id="description"
          label="About you"
          variant="outlined"
          fullWidth
          multiline
          margin="dense"
          onChange={onDescriptionChange}
          value={description}
        />

        <Grid container spacing={2} alignItems="center" marginTop={1}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={avatar ? URL.createObjectURL(avatar) : ''} sx={{ width: 80, height: 80 }} />
          </Grid>
          <Grid item>
            <Button variant="contained" component="label">
              Upload avatar
              <input id="avatar" hidden accept="image/*" multiple type="file" onChange={onAvatarChange} />
            </Button>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <LoadingButton loading={isLoading} variant="contained" size="large" onClick={onButtonClick}>
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

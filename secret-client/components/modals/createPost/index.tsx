import React, { ChangeEvent, useCallback, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useCreateNewPostMutation } from '@/store/service';
import { useAppSelector } from '@/hooks/stateHooks';
import pool from '@/abi/Pool.json';
import token from '@/abi/SecretToken.json';
import { Pool } from '@/interface/abi/Pool';
import { SecretToken } from '@/interface/abi/SecretToken';
import { ethers } from 'ethers';
import { useGetUserData } from '@/hooks/api/useGetUserData';

interface ICreateNewUserModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const CreatePostModal: React.FC<ICreateNewUserModalProps> = ({ isOpen, handleClose }) => {
  const { signer } = useAppSelector((state) => state.connector);
  const { data } = useGetUserData();
  const [createNewPost, { error, isError, isLoading, isSuccess }] = useCreateNewPostMutation();

  const [reward, setReward] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const onRewardChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (+event.target.value > 0) {
        setReward(+event.target.value);
      }
    },
    [setReward],
  );

  const onDescriptionChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }, []);

  const onTitleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }, []);

  const onLoadingButtonClick = async () => {
    console.log('data', data);
    if (data) {
      createNewPost({ title, description, owner: data.address, id: data.id });
      const POOL_ADDRESS = '0x66822C5C8B0e7bBEaDA80fBdb2C78758b84fC42B';
      const TOKEN_ADDRESS = '0xE5c8811c4c3A50Ca3203123d0ee84A07278080BC';

      const tokenContract = new ethers.Contract(TOKEN_ADDRESS, token.abi, signer) as unknown as SecretToken;

      const res = await tokenContract.approve(POOL_ADDRESS, reward);
      console.log('token contract res', res);

      console.log(ethers.solidityPackedKeccak256(['address', 'string', 'string'], [data.address, title, description]));
      const poolContract = new ethers.Contract(POOL_ADDRESS, pool.abi, signer) as unknown as Pool;
      const res2 = await poolContract.createNewPost(
        reward,
        28800,
        ethers.solidityPackedKeccak256(['address', 'string', 'string'], [data.address, title, description]),
      );
      console.log('pool contract res', res2);
    }
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
          id="title"
          label="Title"
          variant="outlined"
          fullWidth
          multiline
          margin="dense"
          onChange={onTitleChange}
          value={title}
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          margin="dense"
          onChange={onDescriptionChange}
          value={description}
        />

        <TextField
          id="reward"
          label="Reward"
          variant="outlined"
          fullWidth
          type="number"
          margin="dense"
          onChange={onRewardChange}
          value={reward}
        />
      </DialogContent>

      <DialogActions>
        <LoadingButton loading={isLoading} variant="contained" size="large" onClick={onLoadingButtonClick}>
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

import React, { ChangeEvent, useCallback, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface ICreateNewUserModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const CreatePostModal: React.FC<ICreateNewUserModalProps> = ({ isOpen, handleClose }) => {
  const [reward, setReward] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  const onRewardChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (+event.target.value > 0) {
        setReward(+event.target.value);
      }
    },
    [setReward],
  );

  const onDescriptionChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDescription(event.target.value);
    },
    [setDescription],
  );

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
          id="reward"
          label="Reward"
          variant="outlined"
          fullWidth
          type="number"
          multiline
          margin="dense"
          onChange={onRewardChange}
          value={reward}
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
      </DialogContent>

      <DialogActions>
        <LoadingButton loading={isLoading} variant="contained" size="large" onClick={onButtonClick}>
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

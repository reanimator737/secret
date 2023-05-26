import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface ICreateNewUserModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const CreatePostModal: React.FC<ICreateNewUserModalProps> = ({ isOpen, handleClose }) => {
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
          onChange={onDescriptionChange}
          value={description}
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

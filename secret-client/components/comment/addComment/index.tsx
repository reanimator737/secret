import React, { ChangeEvent, useState } from 'react';
import { Card, TextField, Button, Grid } from '@mui/material';
import { IRPost, useAddNewCommentMutation } from '@/store/service';
import { useGetUserData } from '@/hooks/api/useGetUserData';

export const AddComment: React.FC<IRPost> = (data) => {
  const [addNewComment] = useAddNewCommentMutation();
  const [comment, setComment] = useState<string>('');
  const { data: user, isSuccess } = useGetUserData();

  const handler = () => {
    if (user) {
      addNewComment({ owner: user, text: comment, post: data });
    }
  };

  const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  return (
    <Card>
      <Grid container>
        <Grid xs={11}>
          <TextField
            id=""
            value={comment}
            label="Add your comment"
            variant="filled"
            multiline
            fullWidth
            onChange={onTextFieldChange}
          />
        </Grid>
        <Grid xs={1} alignSelf={'flex-end'} justifyContent={'center'} container>
          <Button onClick={handler}>Submit</Button>
        </Grid>
      </Grid>
    </Card>
  );
};

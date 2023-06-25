import React, { useEffect } from 'react';
import { useLazyGetCommentsForPostQuery } from '@/store/service';
import { Comment } from '@/components/comment';
import { Paper } from '@mui/material';
import { ListItem } from '@/components/listItem';

export const CommentList: React.FC<{ id: number }> = ({ id }) => {
  const [getAllComments, { data, isLoading, isError }] = useLazyGetCommentsForPostQuery();

  useEffect(() => {
    getAllComments(id);
  }, [id, getAllComments]);

  if (isLoading || !data) {
    return <></>;
  }

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {data.map((comment) => (
        <ListItem key={comment.id}>
          <Comment {...comment} />
        </ListItem>
      ))}
    </Paper>
  );
};

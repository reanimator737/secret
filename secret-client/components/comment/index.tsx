import React from 'react';
import { Card, CardActions, CardContent, CardHeader } from '@mui/material';
import { ICommentCompProps } from '@/store/service';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Button from '@mui/material/Button';

export const Comment: React.FC<ICommentCompProps> = ({
  owner,
  id,
  hasOwnerLike,
  text,
  addLikeHandler,
  addDislikeHandler,
  removeReactionHandler,
  hasUserLike,
  hasUserDislike,
  dislikesCount,
  likesCount,
}) => {
  return (
    <Card variant="outlined" style={{ cursor: 'pointer' }}>
      <CardHeader
        avatar={<Avatar aria-label="recipe">R</Avatar>}
        title={owner?.nickName ?? 'empty'}
        subheader={owner.address}
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }}>{id}</Typography>
        <Typography sx={{ fontSize: 14 }}>{text}</Typography>
      </CardContent>
      <CardActions>
        <Button
          color={hasUserLike ? 'success' : 'primary'}
          onClick={() => (hasUserLike ? removeReactionHandler(id) : addLikeHandler(id))}
        >
          {likesCount}
          <ThumbUpIcon fontSize={'small'} />
        </Button>
        <Button
          color={hasUserDislike ? 'error' : 'primary'}
          onClick={() => (hasUserDislike ? removeReactionHandler(id) : addDislikeHandler(id))}
        >
          {dislikesCount}
          <ThumbDownIcon fontSize={'small'} />
        </Button>
      </CardActions>
    </Card>
  );
};

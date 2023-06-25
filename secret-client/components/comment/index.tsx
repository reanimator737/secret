import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { IComment } from '@/store/service';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export const Comment: React.FC<IComment> = ({ owner, commentRates, id, hasOwnerLike, text }) => {
  return (
    <Card variant="outlined" style={{ cursor: 'pointer' }}>
      <CardHeader
        avatar={<Avatar aria-label="recipe">R</Avatar>}
        title={owner?.nickName ?? 'empty'}
        subheader={owner.address}
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }}>{text}</Typography>
      </CardContent>
    </Card>
  );
};

import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { IRPost } from '@/store/service';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';
import { getOrderPostPage } from '@/constants/routes';

export const OrderPost: React.FC<IRPost> = ({ owner, id, reward, title, isActive, description }) => {
  //TODO
  return (
    <Link href={getOrderPostPage(id)}>
      <Card variant="outlined" style={{ cursor: 'pointer' }}>
        <CardContent>
          <Typography sx={{ fontSize: 18 }}>{title}</Typography>
          <Typography sx={{ fontSize: 14 }}>Reward: {reward}</Typography>
          <Typography sx={{ fontSize: 14 }} marginTop={2}>
            {description}
          </Typography>
        </CardContent>
        <CardHeader
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          title={owner?.nickName ?? 'empty'}
          subheader={owner.address}
        />
      </Card>
    </Link>
  );
};

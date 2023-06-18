import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { IRPost } from '@/store/service';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';
import { getOrderPostPage } from '@/constants/routes';

export const OrderPost: React.FC<IRPost> = ({ owner, id, reward, title, isActive, description }) => {
  //TODO remove
  if (owner === null) {
    return (
      <Card variant="outlined">
        <CardHeader>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {reward}
          </Typography>
        </CardHeader>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {description}
          </Typography>
        </CardContent>
      </Card>
    );
  }

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
        <CardHeader avatar={<Avatar aria-label="recipe">R</Avatar>} title={owner.nickName} subheader={owner.address} />
      </Card>
    </Link>
  );
};

import { useGetCategoriesQuery } from '@/store/service';
import { Chip, Paper } from '@mui/material';
import React from 'react';
import { styled } from '@mui/system';
import { ListItem } from '@/components/listItem';

export const Categories: React.FC = () => {
  const { data } = useGetCategoriesQuery();
  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {data.map((el) => (
        <ListItem key={el.id}>
          <Chip label={el.name} />
        </ListItem>
      ))}
    </Paper>
  );
};

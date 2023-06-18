import React, { useEffect } from 'react';
import { useLazyGetAllPostsQuery } from '@/store/service';
import { OrderPost } from '@/components/orderPost';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

const Home: React.FC = () => {
  const [getAllPost, { data, isLoading, isSuccess, isError }] = useLazyGetAllPostsQuery();

  console.log(data);
  useEffect(() => {
    getAllPost(0);
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        {data &&
          data.map((el) => (
            <Grid xs={12} key={el.id}>
              <OrderPost {...el} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Home;

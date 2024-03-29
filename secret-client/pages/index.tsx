import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useLazyGetAllPostsQuery } from '@/store/service';
import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import { Categories } from '@/components/categories';
import Grid from '@mui/material/Unstable_Grid2';
import { OrderPost } from '@/components/orderPost';

export default function Home() {
  const [getAllPost, { data, isLoading, isSuccess, isError }] = useLazyGetAllPostsQuery();

  useEffect(() => {
    getAllPost();
  }, []);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="xl">
        <Categories />
        <Grid container spacing={2}>
          {data &&
            data.map((el) => (
              <Grid xs={12} key={el.id}>
                <OrderPost {...el} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}

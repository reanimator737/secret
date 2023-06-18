import React, { useEffect } from 'react';
import { useAddNewCommentMutation, useLazyGetOrderPostConnectQuery, useLazyGetPostByIdQuery } from '@/store/service';
import { useRouter } from 'next/router';
import { OrderPost } from '@/components/orderPost';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const OrderPostPage: React.FC = () => {
  const {
    query: { pid },
  } = useRouter();
  const [getPost, { data, isLoading, isSuccess, isError }] = useLazyGetPostByIdQuery();
  const [connectOrderPost, { data: data2 }] = useLazyGetOrderPostConnectQuery();
  const [addNewComment] = useAddNewCommentMutation();

  useEffect(() => {
    if (pid && !Number.isNaN(+pid)) {
      getPost(+pid);
      connectOrderPost(+pid);
    }
  }, [getPost, connectOrderPost, pid]);

  const handler = () => {
    if (data) {
      addNewComment({ owner: 'owner', text: 'Text', post: data[0] });
    }
  };

  console.log(data2);

  if (!data) {
    return <div></div>;
  }

  return (
    <Container maxWidth="xl">
      <OrderPost {...data[0]} />

      <Button onClick={handler}>TEST BUTTON</Button>
    </Container>
  );
};

export default OrderPostPage;

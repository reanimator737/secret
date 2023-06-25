import React, { useEffect } from 'react';
import { useLazyGetOrderPostConnectQuery, useLazyGetPostByIdQuery } from '@/store/service';
import { useRouter } from 'next/router';
import { OrderPost } from '@/components/orderPost';
import Container from '@mui/material/Container';
import { AddComment } from '@/components/comment/addComment';
import { CommentList } from '@/components/comment/list';

const OrderPostPage: React.FC = () => {
  const {
    query: { pid },
  } = useRouter();
  const [getPost, { data: postData, isLoading, isSuccess, isError }] = useLazyGetPostByIdQuery();
  const [connectOrderPost, { data: data2 }] = useLazyGetOrderPostConnectQuery();

  useEffect(() => {
    if (pid && !Number.isNaN(+pid)) {
      getPost(+pid);
      connectOrderPost(+pid);
    }
  }, [getPost, connectOrderPost, pid]);

  useEffect(() => {
    if (postData) {
    }
  }, [postData]);

  if (!postData) {
    return <div></div>;
  }

  return (
    <Container maxWidth="xl">
      <OrderPost {...postData} />
      <CommentList id={postData.id} />
      <AddComment {...postData} />
    </Container>
  );
};

export default OrderPostPage;

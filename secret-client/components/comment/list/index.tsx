import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  IComment,
  useAddLikeMutation,
  useLazyGetAllUserReactionFromPostQuery,
  useLazyGetOrderPostConnectQuery,
} from '@/store/service';
import { Comment } from '@/components/comment';
import { WebSocket } from '@/constants/webSocket';
import { Grid } from '@mui/material';
import { useAppSelector } from '@/hooks/stateHooks';
import { useGetUserData } from '@/hooks/api/useGetUserData';

export const CommentList: React.FC<{ id: number }> = ({ id }) => {
  const { signer } = useAppSelector((state) => state.connector);
  const [connectOrderPost, { data: wsData, isLoading }] = useLazyGetOrderPostConnectQuery();
  const [data, setData] = useState<IComment[]>([]);
  const [getAllUserReactions, { data: userReactions }] = useLazyGetAllUserReactionFromPostQuery();
  const [addLike] = useAddLikeMutation();
  const { data: user, isSuccess } = useGetUserData();

  const addLikeHandler = useCallback(
    (commentId: number) => {
      if (user) {
        console.log({ commentId, user });
        addLike({ commentId, user });
      }
    },
    [addLike, user],
  );

  const renderData = useMemo(() => {
    if (!userReactions || userReactions.length === 0) {
      return data.map((comment) => (
        <Grid key={comment.id} xs={12} item>
          <Comment hasUserLike={false} hasUserDislike={false} {...comment} />
        </Grid>
      ));
    }

    const cloneData = data.map((el) => ({ hasUserLike: false, hasUserDislike: false, ...el }));
    console.log('userReactions', userReactions);
    userReactions.forEach(({ id, isLiked }) => {
      const el = cloneData.find((el) => el.id === id);

      if (el) {
        el.hasUserLike = isLiked;
        el.hasUserDislike = !isLiked;
        console.log(el);
      }
    });

    return cloneData.map((comment) => (
      <Grid key={comment.id} xs={12} item>
        <Comment {...comment} />
      </Grid>
    ));
  }, [data, userReactions]);

  useEffect(() => {
    connectOrderPost(id);
  }, [connectOrderPost, id]);

  useEffect(() => {
    if (signer) {
      getAllUserReactions({ id, address: signer.address });
    }
  }, [signer, id]);

  useEffect(() => {
    //TODO
    if (wsData === undefined) {
      return;
    }

    if (wsData.length === 0) {
      return;
    }

    const { type, data } = wsData.at(-1);

    switch (type) {
      case WebSocket.NEW_COMMENT:
        setData((prev) => {
          return [data, ...prev];
        });
        break;
      case WebSocket.POST_GET_ALL_DATA:
        setData(data);
        break;
      case WebSocket.NEW_REACTION:
        console.log('newReaction');
        break;
    }
  }, [wsData]);

  if (isLoading || !data) {
    return <></>;
  }

  return (
    <Grid container spacing={1} marginTop={2}>
      {renderData}
    </Grid>
  );
};

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  IComment,
  useAddDislikeMutation,
  useAddLikeMutation,
  useLazyGetAllUserReactionFromPostQuery,
  useLazyGetOrderPostConnectQuery,
  useRemoveReactionMutation,
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
  const [getAllUserReactions, { data: dbUserReactions }] = useLazyGetAllUserReactionFromPostQuery();
  const [userReactions, setUserReactions] = useState([]);

  const [removeReaction] = useRemoveReactionMutation();
  const [addLike] = useAddLikeMutation();
  const [addDislike] = useAddDislikeMutation();
  const { data: user } = useGetUserData();

  const removeReactionHandler = useCallback(
    (commentId: number) => {
      if (user) {
        removeReaction({ commentId, user });
      }
    },
    [removeReaction, user],
  );

  const addLikeHandler = useCallback(
    (commentId: number) => {
      if (user) {
        addLike({ commentId, user });
      }
    },
    [addLike, user],
  );

  const addDislikeHandler = useCallback(
    (commentId: number) => {
      if (user) {
        addDislike({ commentId, user });
      }
    },
    [addLike, user],
  );

  const prerenderData = useMemo(() => {
    if (userReactions.length === 0) {
      return data.map((comment) => (
        <Grid key={comment.id} xs={12} item>
          <Comment
            hasUserLike={false}
            hasUserDislike={false}
            {...comment}
            addLikeHandler={addLikeHandler}
            addDislikeHandler={addDislikeHandler}
            removeReactionHandler={removeReactionHandler}
          />
        </Grid>
      ));
    }

    const cloneData = data.map((el) => ({ hasUserLike: false, hasUserDislike: false, ...el }));
    userReactions.forEach(({ comment: { id }, isLiked }) => {
      const el = cloneData.find((el) => el.id === id);

      if (el) {
        el.hasUserLike = isLiked;
        el.hasUserDislike = !isLiked;
      }
    });

    return cloneData.map((comment) => (
      <Grid key={comment.id} xs={12} item>
        <Comment
          {...comment}
          addLikeHandler={addLikeHandler}
          addDislikeHandler={addDislikeHandler}
          removeReactionHandler={removeReactionHandler}
        />
      </Grid>
    ));
  }, [data, userReactions]);

  useEffect(() => {
    setUserReactions(dbUserReactions ?? []);
  }, [dbUserReactions]);

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
        setData((prev) => {
          return prev.map((el) => (el.id === data.comment.id ? data.comment : el));
        });
        if (user?.id === data.actionTriggerBy.id) {
          setUserReactions((prev) => [...prev, { isLiked: data.isLiked, comment: data.comment }]);
        }
        break;
      case WebSocket.DELETE_REACTION:
        setData((prev) => {
          return prev.map((el) => (el.id === data.comment.id ? data.comment : el));
        });
        if (user?.id === data.actionTriggerBy.id) {
          setUserReactions((prev) => prev.filter((el) => el.comment.id !== data.comment.id));
        }
    }
  }, [wsData]);

  if (isLoading || !data) {
    return <></>;
  }

  return (
    <Grid container spacing={1} marginTop={2}>
      {prerenderData}
    </Grid>
  );
};

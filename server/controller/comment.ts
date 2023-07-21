import { Response, Request } from 'express';
import { Comment } from '../entity/comment';
import { CommentRate } from '../entity/commentRate';
import { FindOneOptions, getRepository, Repository } from 'typeorm';
import { User } from '../entity/user';
import { OrderPost } from '../entity/orderPost';
import { socket } from '../index';

interface ITryFindComment {
  commentRepo: Repository<Comment>;
  comment: Comment;
}

async function tryFindComment(commentId: number): Promise<ITryFindComment> {
  const commentRepo = getRepository(Comment);
  const comment = await commentRepo.findOne({ where: { id: commentId }, relations: ['owner', 'post'] });
  if (!comment) {
    console.log('comment not exist');
    throw new Error('3');
  }

  return { commentRepo, comment };
}

interface ITryFindCommentRate {
  commentRateRepo: Repository<CommentRate>;
  commentRate: CommentRate | null;
}

interface IGetCommentRate {
  commentRateRepo: Repository<CommentRate>;
  commentRate: CommentRate;
  isExisted: boolean;
}

async function tryFindCommentRate(comment: Comment, user: User): Promise<ITryFindCommentRate> {
  const commentRateRepo = getRepository(CommentRate);
  let commentRate = await commentRateRepo.findOne({
    where: { comment: { id: comment.id }, user },
  });

  return { commentRateRepo, commentRate };
}

async function getCommentRate(comment: Comment, user: User): Promise<IGetCommentRate> {
  const { commentRateRepo, commentRate } = await tryFindCommentRate(comment, user);

  if (commentRate === null) {
    const newCommentRate = new CommentRate();
    newCommentRate.user = user;
    newCommentRate.comment = comment;
    return { commentRateRepo, isExisted: false, commentRate: newCommentRate };
  }

  return { commentRateRepo, isExisted: true, commentRate };
}

class CommentController {
  async addComment(req: Request<{}, {}, Omit<Comment, 'id' | 'hasOwnerLike'>>, res: Response) {
    const { text, post, owner } = req.body;
    const CommentRepo = getRepository(Comment);
    const newComment = CommentRepo.create({ post, text, hasOwnerLike: false, owner });
    await CommentRepo.save(newComment);
    res.status(200).send(newComment);
    socket.emitNewComment({ newComment, postId: post.id });
  }

  async removeComment(req: Request<{}, {}, Pick<Comment, 'id' | 'owner'>>, res: Response) {
    const { id, owner } = req.body;
    const CommentRepo = getRepository(Comment);
    const comment = await CommentRepo.findOneById(id);
    if (!comment || comment.owner !== owner) {
      res.json({ todo: 'error' });
      return;
    }
    const deletedComment = await CommentRepo.remove(comment);
    res.json(deletedComment);
  }

  async addLike(req: Request<{}, {}, { user: User; commentId: number }>, res: Response) {
    try {
      const { user, commentId } = req.body;
      const { commentRepo, comment } = await tryFindComment(commentId);
      if (comment.owner.address === user.address) {
        throw new Error('1');
      }
      const { commentRateRepo, isExisted, commentRate } = await getCommentRate(comment, user);
      if (isExisted) {
        if (commentRate.isLiked) {
          throw new Error('2');
        }

        comment.dislikesCount--;
      }
      commentRate.isLiked = true;
      comment.likesCount++;
      await commentRepo.save(comment);
      await commentRateRepo.save(commentRate);
      res.json(commentRate);
      socket.emitReaction({
        comment,
        actionTriggerBy: user,
        isLiked: true,
      });
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async removeReaction(req: Request<{}, {}, { user: User; commentId: number }>, res: Response) {
    try {
      const { user, commentId } = req.body;

      const { comment, commentRepo } = await tryFindComment(commentId);
      const { commentRateRepo, commentRate } = await tryFindCommentRate(comment, user);

      if (!commentRate) {
        throw new Error();
      }

      commentRate.isLiked ? (comment.likesCount -= 1) : (comment.dislikesCount -= 1);
      await commentRepo.save(comment);
      await commentRateRepo.delete(commentRate);

      res.json(commentRate);
      socket.emitDeleteReaction({ comment, actionTriggerBy: user });
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async addDislike(req: Request<{}, {}, { user: User; commentId: number }>, res: Response) {
    try {
      const { user, commentId } = req.body;
      const { commentRepo, comment } = await tryFindComment(commentId);

      if (comment.owner.address === user.address) {
        throw new Error('1');
      }

      const { commentRateRepo, isExisted, commentRate } = await getCommentRate(comment, user);

      if (isExisted) {
        if (!commentRate.isLiked) {
          throw new Error('2');
        }
        comment.likesCount--;
      }
      commentRate.isLiked = false;
      comment.dislikesCount++;
      await commentRepo.save(comment);
      await commentRateRepo.save(commentRate);
      res.json(commentRate);

      socket.emitReaction({
        comment,
        actionTriggerBy: user,
        isLiked: false,
      });
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async addOwnerLike(req: Request<{}, {}, { id: string; address: string }>, res: Response) {
    const { id, address } = req.body;
    const CommentRepo = getRepository(Comment);
    const comment = await CommentRepo.findOneById(id);
    if (!comment) {
      res.json({ todo: 'error' });
      return;
    }

    const orderPostRepository = getRepository(OrderPost);
    const orderPost = await orderPostRepository.findOne({
      order: { owner: comment.owner },
    } as FindOneOptions<OrderPost>);

    if (orderPost?.owner.address !== address) {
      res.json({ todo: 'error' });
      return;
    }

    comment.hasOwnerLike = true;
    await CommentRepo.save(comment);
    res.json(comment);
  }

  async removeOwnerLike(req: Request<{}, {}, { id: string; address: string }>, res: Response) {
    const { id, address } = req.body;
    const CommentRepo = getRepository(Comment);
    const comment = await CommentRepo.findOneById(id);
    if (!comment) {
      res.json({ todo: 'error' });
      return;
    }

    const orderPostRepository = getRepository(OrderPost);
    const orderPost = await orderPostRepository.findOne({
      order: { owner: comment.owner },
    } as FindOneOptions<OrderPost>);

    if (orderPost?.owner.address !== address) {
      res.json({ todo: 'error' });
      return;
    }

    comment.hasOwnerLike = false;
    await CommentRepo.save(comment);
    res.json(comment);
  }

  async getAllCommentsFromPost(req: Request<{ postId: string }>, res: Response) {
    const postId = req.query;
    const CommentRepo = getRepository(Comment);
    const comments = await CommentRepo.find({ where: { post: postId }, relations: ['commentRates', 'owner'] });
    res.json(comments);
  }
}

export const commentController = new CommentController();

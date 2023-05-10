import { Response, Request } from 'express';
import { Comment } from '../entity/comment';
import { CommentRate } from '../entity/commentRate';
import { FindOneOptions, getRepository } from 'typeorm';
import { User } from '../entity/user';
import { OrderPost } from '../entity/orderPost';

class CommentController {
  async addComment(req: Request<{}, {}, Omit<Comment, 'id' | 'hasOwnerLike'>>, res: Response) {
    const { text, post, owner } = req.body;
    const CommentRepo = getRepository(Comment);
    const newComment = CommentRepo.create({ post, text, hasOwnerLike: false, owner });
    await CommentRepo.save(newComment);
    res.json(newComment);
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
    const { user, commentId } = req.body;
    const CommentRepo = getRepository(Comment);
    const comment = await CommentRepo.findOneById(commentId);
    if (!comment) {
      res.json({ todo: 'error' });
      return;
    }

    if (comment.owner === user.address) {
      res.json({ todo: 'error' });
      return;
    }

    const CommentRateRepo = getRepository(CommentRate);
    let userCommentRate = await CommentRateRepo.findOne({
      where: { comment: commentId, user: user.address },
    } as FindOneOptions<CommentRate>);

    if (!userCommentRate) {
      userCommentRate = new CommentRate();
      userCommentRate.user = user;
    }

    userCommentRate.is_disliked = false;
    userCommentRate.is_liked = true;
    await CommentRateRepo.save(userCommentRate);

    res.json(userCommentRate);
  }

  async removeLike(req: Request<{}, {}, { user: User; commentId: number }>, res: Response) {
    const {
      user: { address },
      commentId,
    } = req.body;
    const CommentRepo = getRepository(Comment);
    const comment = await CommentRepo.findOneById(commentId);
    if (!comment) {
      res.json({ todo: 'error' });
      return;
    }

    if (comment.owner === address) {
      res.json({ todo: 'error' });
      return;
    }

    const CommentRateRepo = getRepository(CommentRate);
    let userCommentRate = await CommentRateRepo.findOne({
      where: { comment: commentId, user: address },
    } as FindOneOptions<CommentRate>);

    if (!userCommentRate) {
      res.json({ todo: 'error' });
      return;
    }

    userCommentRate.is_liked = false;
    await CommentRateRepo.save(userCommentRate);

    res.json(userCommentRate);
  }

  async addDislike(req: Request<{}, {}, { user: User; commentId: number }>, res: Response) {
    const { user, commentId } = req.body;
    const CommentRepo = getRepository(Comment);
    const comment = await CommentRepo.findOneById(commentId);
    if (!comment) {
      res.json({ todo: 'error' });
      return;
    }

    if (comment.owner === user.address) {
      res.json({ todo: 'error' });
      return;
    }

    const CommentRateRepo = getRepository(CommentRate);
    let userCommentRate = await CommentRateRepo.findOne({
      where: { comment: commentId, user: user.address },
    } as FindOneOptions<CommentRate>);

    if (!userCommentRate) {
      userCommentRate = new CommentRate();
      userCommentRate.user = user;
    }

    userCommentRate.is_disliked = true;
    userCommentRate.is_liked = false;
    await CommentRateRepo.save(userCommentRate);

    res.json(userCommentRate);
  }

  async removeDislike(req: Request<{}, {}, { user: User; commentId: number }>, res: Response) {
    const {
      user: { address },
      commentId,
    } = req.body;
    const CommentRepo = getRepository(Comment);
    const comment = await CommentRepo.findOneById(commentId);
    if (!comment) {
      res.json({ todo: 'error' });
      return;
    }

    if (comment.owner === address) {
      res.json({ todo: 'error' });
      return;
    }

    const CommentRateRepo = getRepository(CommentRate);
    let userCommentRate = await CommentRateRepo.findOne({
      where: { comment: commentId, user: address },
    } as FindOneOptions<CommentRate>);

    if (!userCommentRate) {
      res.json({ todo: 'error' });
      return;
    }

    userCommentRate.is_disliked = false;
    await CommentRateRepo.save(userCommentRate);

    res.json(userCommentRate);
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

  async getAllComments(_: never, res: Response) {
    const CommentRepo = getRepository(Comment);
    const comments = await CommentRepo.find();
    res.json(comments);
  }
}

export const commentController = new CommentController();

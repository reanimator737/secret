import { Response, Request } from 'express';
import { Comment } from '../entity/comment';
import { CommentRate } from '../entity/commentRate';
import { FindOneOptions, getRepository } from 'typeorm';
import { User } from '../entity/user';
import { OrderPost } from '../entity/orderPost';
import { socket } from '../index';

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
    const { user, commentId } = req.body;
    console.log('-------------------------------------');
    console.log(1);
    const commentRepo = getRepository(Comment);
    const comment = await commentRepo.findOne({ where: { id: commentId }, relations: ['owner', 'post'] });
    if (!comment) {
      res.json({ todo: 'error' });
      return;
    }

    console.log(2);

    if (comment.owner.address === user.address) {
      res.json({ todo: 'error' });
      return;
    }

    console.log(3);

    const CommentRateRepo = getRepository(CommentRate);
    let existingRate = await CommentRateRepo.findOne({
      where: { comment: { id: commentId }, user },
    });

    console.log(4);

    //TODO
    if (!existingRate) {
      console.log(5);
      const newCommentRate = new CommentRate();
      newCommentRate.user = user;
      newCommentRate.comment = comment;
      newCommentRate.isLiked = true;
      await CommentRateRepo.save(newCommentRate);
      comment.likesCount++;
      await commentRepo.save(comment);
      res.json(newCommentRate);
      socket.emitReaction(comment);
      return;
    }

    console.log(6);
    if (existingRate.isLiked) {
      res.json({ todo: 'call another method' });
      return;
    }
    console.log(7);

    existingRate.isLiked = true;
    comment.likesCount++;
    comment.dislikesCount--;
    await commentRepo.save(comment);
    await CommentRateRepo.save(existingRate);
    res.json(existingRate);
    socket.emitReaction(comment);

    return;
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

    if (comment.owner.address === address) {
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

    userCommentRate.isLiked = false;
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

    if (comment.owner.address === user.address) {
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

    userCommentRate.isLiked = false;
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

    if (comment.owner.address === address) {
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

  async getAllCommentsFromPost(req: Request<{ postId: string }>, res: Response) {
    const postId = req.query;
    const CommentRepo = getRepository(Comment);
    const comments = await CommentRepo.find({ where: { post: postId }, relations: ['commentRates', 'owner'] });
    res.json(comments);
  }
}

export const commentController = new CommentController();

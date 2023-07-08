import { Response, Request } from 'express';
import { OrderPost, TemporaryPost } from '../entity/orderPost';
import { getRepository } from 'typeorm';
import { BigNumberish, ethers } from 'ethers';
import { User } from '../entity/user';
import { CommentRate } from '../entity/commentRate';

class OrderPostController {
  async createNewTemporaryPost(req: Request<{}, {}, Omit<TemporaryPost, 'secret' | 'expirationTime'>>, res: Response) {
    const { title, description, owner, id, categories } = req.body;
    const temporaryPostRepo = getRepository(TemporaryPost);
    const userRepo = getRepository(User);

    const user = await userRepo.findOneById(id);
    //TODO
    if (!user) {
      res.json('Error');
      return;
    }
    const secret = ethers.solidityPackedKeccak256(['address', 'string', 'string'], [owner, title, description]);
    const newTemporaryPost = temporaryPostRepo.create({
      owner: user,
      description,
      secret,
      title,
      categories,
    });
    await temporaryPostRepo.save(newTemporaryPost);
    return res.json(newTemporaryPost);
  }

  async getAllTemporaryPost(_: Request, res: Response) {
    const temporaryPostRepo = getRepository(TemporaryPost);
    const allPosts = await temporaryPostRepo.find({ relations: ['owner'] });
    return res.json(allPosts);
  }

  async getAllPost(_: Request, res: Response) {
    const orderPost = getRepository(OrderPost);
    const allPosts = await orderPost.find({ relations: ['owner'] });
    return res.json(allPosts);
  }

  async createNewPost(temporaryPost: TemporaryPost, reward: BigNumberish, id: BigNumberish) {
    const { description, title, owner, categories } = temporaryPost;
    const temporaryPostRepo = getRepository(TemporaryPost);
    const orderPostRepository = getRepository(OrderPost);

    const newOrder = orderPostRepository.create({
      reward: Number(reward),
      isActive: true,
      description,
      categories,
      owner,
      title,
      id: Number(id),
    });

    await orderPostRepository.save(newOrder);
    await temporaryPostRepo.delete(temporaryPost);
  }

  async getOrderPostById(req: Request<{ id: number }>, res: Response) {
    const id = req.params.id;
    const orderPostRepository = getRepository(OrderPost);
    const post = await orderPostRepository.findOne({ where: { id }, relations: ['owner'] });
    return res.json(post);
  }

  async getAllUserReactionFromPost(req: Request<{ id: string; address: string }>, res: Response) {
    const { id, address } = req.params;

    const commentRateRepository = getRepository(CommentRate);
    const reactions = await commentRateRepository
      .createQueryBuilder('commentRate')
      .innerJoin('commentRate.comment', 'comment')
      .innerJoin('comment.post', 'post')
      .innerJoin('commentRate.user', 'user', 'user.address = :address', { address })
      .where('post.id = :postId', { postId: id })
      .getMany();

    res.status(200).json(reactions);
  }
}

export const orderPostController = new OrderPostController();

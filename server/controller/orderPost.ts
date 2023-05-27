import { Response, Request } from 'express';
import { OrderPost, TemporaryPost } from '../entity/orderPost';
import { getRepository } from 'typeorm';
import { ethers } from 'ethers';
import { DAY_MS } from '../constants/time';

class OrderPostController {
  async createNewTemporaryPost(
    req: Request<{}, {}, Omit<TemporaryPost, 'id' | 'secret' | 'expirationTime'>>,
    res: Response,
  ) {
    const { title, description, owner } = req.body;
    const temporaryPostRepo = getRepository(TemporaryPost);
    const now = new Date().getTime();
    const secret = ethers.solidityPackedKeccak256(['address', 'string', 'string'], [owner, title, description]);
    const newTemporaryPost = temporaryPostRepo.create({
      expirationTime: now + DAY_MS,
      owner,
      description,
      secret,
      title,
    });
    await temporaryPostRepo.save(newTemporaryPost);
    return res.json(newTemporaryPost);
  }

  async createNewPost(temporaryPost: TemporaryPost, reward: number, id: number) {
    const { description, title, owner } = temporaryPost;
    const temporaryPostRepo = getRepository(TemporaryPost);
    const orderPostRepository = getRepository(OrderPost);
    const newOrder = orderPostRepository.create({
      reward,
      isActive: true,
      description,
      owner,
      title,
      id,
    });

    await orderPostRepository.save(newOrder);
    await temporaryPostRepo.delete(temporaryPost);
  }
}

export const orderPostController = new OrderPostController();

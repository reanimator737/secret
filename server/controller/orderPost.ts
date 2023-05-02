import { Response, Request } from 'express';
import { OrderPost } from '../entity/orderPost';
import { getRepository } from 'typeorm';

class OrderPostController {
  async createNewPost(req: Request<{}, {}, Omit<OrderPost, 'id'>>, res: Response) {
    const orderPostRepo = getRepository(OrderPost);
    const newOrder = orderPostRepo.create(req.body);
    await orderPostRepo.save(newOrder);
    return res.json(newOrder);
  }
}

export const orderPostController = new OrderPostController();

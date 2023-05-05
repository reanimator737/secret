import { getRepository } from 'typeorm';
import { User } from '../entity/user';
import { Request, Response } from 'express';

class UserController {
  async createUser(req: Request<{ address: string }>, res: Response) {
    const { address } = req.body;
    const userRepository = getRepository(User);
    const newUser = userRepository.create({ address: address, rate: 0 });
    await userRepository.save(newUser);
    res.json(newUser);
  }
  async getAllUsers(_: Request, res: Response) {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  }
  async getUserByAddress(req: Request<{ address: string }>, res: Response) {
    const address = req.params.address;
    const userRepository = getRepository(User);
    const user = await userRepository.findOneBy({ address: address });
    res.json(user);
  }

  async getUserById(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id;
    const userRepository = getRepository(User);
    const user = await userRepository.findOneById(id);
    res.json(user);
  }
}

export const userController = new UserController();
import { getRepository } from 'typeorm';
import { User } from '../entity/user';
import { Request, Response } from 'express';

class UserController {
  async createUser(req: Request<{}, {}, Omit<User, 'id' | 'rate'>>, res: Response) {
    const { address, nickName, description } = req.body;
    const avatar = req.file?.filename;

    const userRepository = getRepository(User);

    const existingUser = await userRepository.findOne({ where: { address } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this address already exists' });
    }

    const newUser = userRepository.create({ address: address, rate: 0, description, nickName, avatar });
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
    const user = await userRepository.findOneBy({ address });
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

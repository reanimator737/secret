import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Category } from '../entity/category';

class CategoryController {
  async addCategory(req: Request<{}, {}, { name: string }>, res: Response) {
    const { name } = req.body;
    const categoryRepository = getRepository(Category);
    const newCategory = categoryRepository.create({ name });
    await categoryRepository.save(newCategory);
    res.status(200).send(newCategory);
  }

  async getAllCategory(_: Request, res: Response) {
    const categoryRepository = getRepository(Category);
    const allCategory = await categoryRepository.find();
    res.status(200).send(allCategory);
  }
}

export const categoryController = new CategoryController();

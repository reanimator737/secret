import { Router } from 'express';
import { categoryController } from '../controller/category';
//@ts-ignore
const category = new Router();
category.get('/category', categoryController.getAllCategory);
category.post('/category', categoryController.addCategory);

export default category;

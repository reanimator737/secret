import { Router } from 'express';
import { orderPostController } from '../controller/orderPost';
//@ts-ignore
const orderPost = new Router();

orderPost.post('/order-post', orderPostController.createNewPost);

export default orderPost;

import { Router } from 'express';
import { orderPostController } from '../controller/orderPost';
//@ts-ignore
const orderPost = new Router();

orderPost.post('/order-post', orderPostController.createNewTemporaryPost);
orderPost.get('/order-post-temporary', orderPostController.getAllTemporaryPost);
orderPost.get('/order-post', orderPostController.getAllPost);
orderPost.get('/order-post/:id', orderPostController.getOrderPostById);
orderPost.get('/order-post/reaction/:id/:address', orderPostController.getAllUserReactionFromPost);

export default orderPost;

import { Router } from 'express';
import { userController } from '../controller/user';
import { checkUserAddress } from '../middleware/checkUserAddress';
//@ts-ignore
const userRouter = new Router();

userRouter.post('/user', checkUserAddress, userController.createUser);
userRouter.get('/user', userController.getAllUsers);
userRouter.get('/user/address/:address', userController.getUserByAddress);
userRouter.get('/user/id/:id', userController.getUserById);

export default userRouter;

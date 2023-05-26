import { Router } from 'express';
import { userController } from '../controller/user';
import { checkUserAddress } from '../middleware/checkUserAddress';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + '-' + Date.now();
    cb(null, name + ext);
  },
});

export const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|png|svg|jpg/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images with extensions .jpeg, .png, jpg and .svg are allowed.'));
    }
  },
});

//@ts-ignore
const userRouter = new Router();

userRouter.post('/user', upload.single('avatar'), checkUserAddress, userController.createUser);
userRouter.get('/user', userController.getAllUsers);
userRouter.get('/user/address/:address', userController.getUserByAddress);
userRouter.get('/user/id/:id', userController.getUserById);

export default userRouter;

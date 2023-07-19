import express, { Application } from 'express';
import {
  avatar,
  uploadAvatar,
  removeAvatar,
  deleteUser,
  updatePersonalInfo,
  updateUserPassword,
} from '../controllers/userController';
import authenticateToken from '../middleware/auth';

const userRouter = express.Router();

userRouter.post(
  '/avatar',
  authenticateToken as Application,
  avatar.single('avatar'),
  uploadAvatar as any,
);
userRouter.delete(
  '/avatar',
  authenticateToken as Application,
  removeAvatar as any
);
userRouter.patch(
  '/update/personal',
  authenticateToken as Application,
  updatePersonalInfo as any
);
userRouter.patch(
  '/update/password',
  authenticateToken as Application,
  updateUserPassword as any
);
userRouter.delete(
  '/delete',
  authenticateToken as Application,
  deleteUser as any
);

export default userRouter;

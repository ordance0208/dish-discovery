import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  logoutAll,
} from '../controllers/authController';
import authenticateToken from '../middleware/auth';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', authenticateToken as any, logoutUser as any);
authRouter.post('/logoutall', authenticateToken as any, logoutAll as any);

export default authRouter;

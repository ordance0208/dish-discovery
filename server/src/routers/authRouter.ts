import express, { Application } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  logoutAll,
  getCurrentUser
} from '../controllers/authController';
import authenticateToken from '../middleware/auth';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', authenticateToken as any, logoutUser as any);
authRouter.post('/logout-all', authenticateToken as any, logoutAll as any);
authRouter.get('/current', authenticateToken as Application, getCurrentUser as any)

export default authRouter;

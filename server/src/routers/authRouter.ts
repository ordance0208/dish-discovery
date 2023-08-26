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
authRouter.post('/logout', authenticateToken as Application, logoutUser as any);
authRouter.post('/logout-all', authenticateToken as Application, logoutAll as any);
authRouter.get('/session', authenticateToken as Application, getCurrentUser as any)

export default authRouter;

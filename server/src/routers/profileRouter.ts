import express from 'express';
import { getUserProfile } from '../controllers/profileController';

const profileRouter = express.Router();

profileRouter.get('/:id', getUserProfile);

export default profileRouter;

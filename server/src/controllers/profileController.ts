import { Request, Response } from 'express';
import Recipe from '../models/Recipe';
import User from '../models/User';

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    const userRecipes = await Recipe.find({ user: user._id }, null, {
      sort: { createdAt: -1 },
    }).populate({ path: 'user' });

    res.send({ user, userRecipes });
  } catch (err: any) {
    if (err.name === 'CastError') {
      return res.status(404).send();
    }
    return res.status(500).send(err);
  }
};

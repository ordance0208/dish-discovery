import express, { Application } from 'express';
import {
  recipe,
  createRecipe,
  getRecipe,
  editRecipe,
  deleteRecipe,
} from '../controllers/recipeController';
import authenticateToken from '../middleware/auth';

const recipeRouter = express.Router();

recipeRouter.post(
  '/',
  authenticateToken as Application,
  recipe.single('recipe'),
  createRecipe as any
);
recipeRouter.get('/:id', getRecipe as any);
recipeRouter.put('/:id', authenticateToken as Application, recipe.single('recipe'), editRecipe as any);
recipeRouter.delete(
  '/:id',
  authenticateToken as Application,
  deleteRecipe as any
);

export default recipeRouter;

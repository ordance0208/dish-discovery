import express, { Application } from 'express';
import multer from 'multer';
import {
  recipe,
  storage,
  createRecipe,
  getRecipe,
  getRecipeForEdit,
  editRecipe,
  deleteRecipe,
  likeRecipe,
  getRecipes,
} from '../controllers/recipeController';
import authenticateToken from '../middleware/auth';

const recipeRouter = express.Router();

const upload = multer({ storage });

recipeRouter.post(
  '/',
  authenticateToken as Application,
  upload.single('recipe'),
  createRecipe as any
);
recipeRouter.get('/', getRecipes as any);
recipeRouter.get('/:id', getRecipe as any);
recipeRouter.get(
  '/edit/:id',
  authenticateToken as Application,
  getRecipeForEdit as any
);
recipeRouter.put(
  '/:id',
  authenticateToken as Application,
  recipe.single('recipe'),
  editRecipe as any
);
recipeRouter.put(
  '/:id/like',
  authenticateToken as Application,
  recipe.single('recipe'),
  likeRecipe as any
);
recipeRouter.delete(
  '/:id',
  authenticateToken as Application,
  deleteRecipe as any
);

export default recipeRouter;

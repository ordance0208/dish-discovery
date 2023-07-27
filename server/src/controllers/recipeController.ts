import { Response } from 'express';
import multer from 'multer';
import Recipe from '../models/Recipe';
import { AuthRequest } from '../middleware/auth';
import { recipePayloadSchema } from '../validation/recipe';

export const recipe = multer({
  dest: 'recipes',
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image')) {
      (req as any).fileValidationError = 'Please upload a valid image file';
    }
    cb(null, true);
  },
});

export const createRecipe = async (req: AuthRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).send({ error: 'Invalid data' });
  }

  try {
    await recipePayloadSchema.validateAsync(req.body);
    const recipe = new Recipe({
      ...req.body,
      user: req.user._id,
      image: `http://localhost:8000/${req?.file?.path}`,
    });
    await recipe.save();
    res.status(201).send(recipe);
    console.log(recipe);
  } catch (err: any) {
    console.log(err);
    return res.status(400).send({ error: err });
  }

  res.status(200).send();
};

export const getRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.send(recipe);
  } catch (err: any) {
    if (err.name === 'CastError') {
      return res.status(404).send();
    }
    return res.status(500).send(err);
  }
};

export const editRecipe = async (req: AuthRequest, res: Response) => {
  try {
    await recipePayloadSchema.validateAsync(req.body);
    const recipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
        ...(req.file && { image: `http://localhost:8000/${req?.file?.path}` }),
      },
      { new: true }
    );
    res.send(recipe);
  } catch (err: any) {
    return res.status(500).send(err);
  }
};

export const deleteRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    await recipe?.deleteOne();
    res.send(recipe);
  } catch (err: any) {
    return res.status(500).send(err);
  }
};

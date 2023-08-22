import { Response } from 'express';
import multer from 'multer';
import Recipe from '../models/Recipe';
import { AuthRequest } from '../middleware/auth';
import { recipePayloadSchema, isEditorEmpty } from '../validation/recipe';

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

export const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'recipes');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

export const createRecipe = async (req: AuthRequest, res: Response) => {
  if (!req.file || (req as any).fileValidationError) {
    return res.status(400).send({ error: 'Invalid data' });
  }

  try {
    await recipePayloadSchema.validateAsync(req.body);

    if (isEditorEmpty(req.body.description)) {
      return res.status(400).send({ error: 'Invalid data' });
    }

    const recipe = new Recipe({
      ...req.body,
      user: req.user._id,
      image: `http://localhost:8000/${req?.file?.path}`,
    });
    await recipe.save();
    res.status(201).send(recipe);
  } catch (err: any) {
    if (err.details) {
      return res.status(400).send({ error: 'Invalid data' });
    }
    return res.status(500).send({ error: err.message });
  }
};

export const getRecipes = async (req: AuthRequest, res: Response) => {
  const { search, sortBy } = req.query;

  let query: any = {};
  let sort: any = {};

  if (search) {
    query.$or = [
      { title: { $regex: new RegExp(search as string, 'i') } },
      {
        description: {
          $elemMatch: {
            type: 'paragraph',
            children: {
              $elemMatch: {
                text: {
                  $regex: new RegExp(search as string, 'i'),
                },
              },
            },
          },
        },
      },
    ];
  }

  if (sortBy) {
    const parts = (sortBy as string)?.split('_');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  } else {
    sort.createdAt = -1;
  }

  try {
    const recipes = await Recipe.find(query, null, {
      sort,
    }).populate({ path: 'user' });

    res.send(recipes);
  } catch (err: any) {
    return res.status(500).send({ error: err.message });
  }
};

export const getRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    const latestRecipes = await Recipe.find(
      { _id: { $ne: recipe?._id } },
      {
        description: 0,
        ingredients: 0,
        tags: 0,
        updatedAt: 0,
        likes: 0,
        views: 0,
      },
      {
        sort: { createdAt: -1 },
        limit: 3,
      }
    ).populate({ path: 'user' });
    if (!recipe) {
      return res.status(404).send({ error: 'Recipe not found' });
    }

    recipe.views = recipe.views + 1;
    await recipe.save();
    await recipe?.populate({ path: 'user' });

    res.send({ recipe, latestRecipes });
  } catch (err: any) {
    if (err.name === 'CastError') {
      return res.status(404).send({ error: 'Recipe not found' });
    }
    return res.status(500).send({ error: err.message });
  }
};

export const getRecipeForEdit = async (req: AuthRequest, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).send({ error: 'Recipe not found' });
    }

    if (req.user._id.toString() !== recipe.user.toString()) {
      return res
        .status(403)
        .send({ error: 'You are unable to edit this recipe' });
    }

    res.send(recipe);
  } catch (err: any) {
    if (err.name === 'CastError') {
      return res.status(404).send({ error: 'Recipe not found' });
    }
    return res.status(500).send({ error: err.message });
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
    if (err.details) {
      return res.status(400).send({ error: 'Invalid data' });
    }
    return res.status(500).send({ error: err.message });
  }
};

export const likeRecipe = async (req: AuthRequest, res: Response) => {
  const action = req.query.status === 'true' ? 1 : -1;

  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).send({ error: 'Recipe not found' });
    }
    if (action === 1) {
      if (recipe.likes.includes(req.user._id)) {
        return res.status(400).send({ error: 'Recipe already liked' });
      }
      recipe.likes = [...recipe.likes, req.user._id];
    } else {
      console.log(recipe.likes);
      const index = recipe.likes.indexOf(req.user._id);
      if (index === -1) {
        return res.status(400).send({ error: 'Recipe already unliked' });
      }
      recipe.likes.splice(index, 1);
    }
    await recipe.save();
    res.send(recipe);
  } catch (err: any) {
    if (err.name === 'CastError') {
      return res.status(404).send({ error: 'Recipe not found' });
    }
    return res.status(500).send({ error: err.message });
  }
};

export const deleteRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).send({ error: 'Recipe not found' });
    }
    if (req.user._id.toString() !== recipe?.user.toString()) {
      return res.status(403).send({ error: 'Authorization failed' });
    }
    await recipe?.deleteOne();
    res.send(recipe);
  } catch (err: any) {
    if (err.name === 'CastError') {
      return res.status(404).send({ error: 'Recipe not found' });
    }
    return res.status(500).send({ error: err.message });
  }
};

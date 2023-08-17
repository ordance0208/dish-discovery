import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: [Object],
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    preparationTime: {
      type: Number,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
    },
    views: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;

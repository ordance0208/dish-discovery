import { likeRecipe } from '../../endpoints/recipe';

const useLikeRecipe = (
  setLiked: React.Dispatch<React.SetStateAction<boolean>>,
  recipeId: string,
  action: boolean
) => {
  const handleRecipeLike = async () => {
    try {
      await likeRecipe(recipeId, !action);
      setLiked(!action);
    } catch (err: any) {}
  };

  return {
    handleRecipeLike,
  };
};

export default useLikeRecipe;

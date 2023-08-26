import { useRecipeContext } from './context';

export const useRecipeData = () => {
  const { state } = useRecipeContext();

  return {
    recipes: state.recipes,
    latestRecipes: state.latestRecipes,
    singleRecipe: state.singleRecipe || null,
    loading: state.loading,
    hasMore: state.hasMore,
  };
};

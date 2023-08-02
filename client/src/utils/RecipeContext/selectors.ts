import { useRecipeContext } from './context';

export const useRecipeData = () => {
  const { state } = useRecipeContext();

  return {
    recipes: state.recipes,
    singleRecipe: state.singleRecipe || null,
    loading: state.loading,
  };
};

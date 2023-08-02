import { useCallback } from 'react';
import * as types from './types';
import { useRecipeContext } from './context';
import { getAllRecipes, getSingleRecipe } from '../../endpoints/recipe';

export const useRecipeActions = () => {
  const { dispatch } = useRecipeContext();

  const fetchAllRecipes = useCallback(async () => {
    dispatch({ type: types.FETCH_ALL_RECIPES });
    try {
      const data = await getAllRecipes();
      dispatch({ type: types.FETCH_ALL_RECIPES_SUCCESS, payload: data });
    } catch (err: any) {
      dispatch({ type: types.FETCH_ALL_RECIPES_FAIL });
    }
  }, [dispatch]);

  const fetchSingleRecipe = useCallback(
    async (recipeId: string) => {
      dispatch({ type: types.FETCH_SINGLE_RECIPE });
      try {
        const data = await getSingleRecipe(recipeId);
        console.log(data)
        dispatch({ type: types.FETCH_SINGLE_RECIPE_SUCCESS, payload: data });
      } catch (err: any) {
        dispatch({ type: types.FETCH_SINGLE_RECIPE_FAIL });
      }
    },
    [dispatch]
  );

  return {
    fetchAllRecipes,
    fetchSingleRecipe,
  };
};

export default useRecipeActions;

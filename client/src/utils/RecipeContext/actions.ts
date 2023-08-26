import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as types from './types';
import { useRecipeContext } from './context';
import useSnackbar from '../../hooks/useSnackbar';
import {
  getAllRecipes,
  getSingleRecipe,
  deleteRecipe,
} from '../../endpoints/recipe';
import { PATHS } from '../../routes';

export const useRecipeActions = () => {
  const navigate = useNavigate();
  const queueSnackbar = useSnackbar();
  const { dispatch } = useRecipeContext();

  const fetchAllRecipes = useCallback(
    async (query?: string, sortBy?: string, page?: string) => {
      dispatch({ type: types.FETCH_ALL_RECIPES });
      try {
        const data = await getAllRecipes(query, sortBy, page);
        dispatch({ type: types.FETCH_ALL_RECIPES_SUCCESS, payload: data });
      } catch (err: any) {
        dispatch({ type: types.FETCH_ALL_RECIPES_FAIL });
      }
    },
    [dispatch]
  );

  const fetchSingleRecipe = useCallback(
    async (recipeId: string) => {
      dispatch({ type: types.FETCH_SINGLE_RECIPE });
      try {
        const data = await getSingleRecipe(recipeId);
        dispatch({
          type: types.FETCH_SINGLE_RECIPE_SUCCESS,
          payload: data,
        });
      } catch (err: any) {
        if (err.response.status === 404) {
          navigate(PATHS.NOT_FOUND, { replace: true });
        }
        dispatch({ type: types.FETCH_SINGLE_RECIPE_FAIL });
      }
    },
    [dispatch]
  );

  const recipeDelete = useCallback(
    async (recipeId: string) => {
      dispatch({ type: types.DELETE_RECIPE });
      try {
        await deleteRecipe(recipeId);
        dispatch({ type: types.DELETE_RECIPE_SUCCESS });
        navigate(PATHS.RECIPES);
        queueSnackbar({
          text: 'Recipe deleted successfully',
          severity: 'success',
        });
      } catch (err: any) {
        dispatch({ type: types.DELETE_RECIPE_FAIL });
        queueSnackbar({
          text: err.response.data.error,
          severity: 'error',
        });
      }
    },
    // eslint-disable-next-line
    [dispatch]
  );

  const resetAllRecipes = useCallback(() => {
    dispatch({ type: types.RESET_ALL_RECIPES });
  }, [dispatch]);

  const resetRecipe = useCallback(() => {
    dispatch({ type: types.RESET_SINGLE_RECIPE });
  }, [dispatch]);

  return {
    fetchAllRecipes,
    fetchSingleRecipe,
    recipeDelete,
    resetAllRecipes,
    resetRecipe,
  };
};

export default useRecipeActions;

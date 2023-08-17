import * as types from './types';
import { Action } from '../../models/action';
import { IRecipe } from '../../models/recipe';

export interface State {
  recipes: IRecipe[];
  singleRecipe: IRecipe | null;
  latestRecipes: IRecipe[];
  loading: boolean;
}

export const DEFAULT_STATE: State = {
  recipes: [],
  latestRecipes: [],
  singleRecipe: null,
  loading: false,
};

export const recipeReducer = (state: State, action: Action<any>): State => {
  switch (action.type) {
    // Fetch All Recipes Cases
    case types.FETCH_ALL_RECIPES:
      return { ...state, loading: true };
    case types.FETCH_ALL_RECIPES_SUCCESS:
      return { ...state, recipes: action.payload, loading: false };
    case types.FETCH_ALL_RECIPES_FAIL:
      return { ...state, loading: false };

    // Fetch Single Recipe Cases
    case types.FETCH_SINGLE_RECIPE:
      return { ...state, loading: true };
    case types.FETCH_SINGLE_RECIPE_SUCCESS:
      return {
        ...state,
        singleRecipe: action.payload.recipe,
        latestRecipes: action.payload.latestRecipes,
        loading: false,
      };
    case types.FETCH_SINGLE_RECIPE_FAIL:
      return { ...state, loading: false };

    // Delete Recipe Cases
    case types.DELETE_RECIPE:
      return { ...state, loading: true };
    case types.DELETE_RECIPE_SUCCESS:
      return { ...state, singleRecipe: null, loading: false };
    case types.DELETE_RECIPE_FAIL:
      return { ...state, loading: false };

    // Reset Recipe Cases
    case types.RESET_ALL_RECIPES:
      return { ...state, recipes: [] };
    case types.RESET_SINGLE_RECIPE:
      return { ...state, singleRecipe: null, loading: false };
  }

  return state;
};

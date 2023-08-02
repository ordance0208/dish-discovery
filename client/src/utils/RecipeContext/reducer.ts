import * as types from './types';
import { Action } from '../../models/action';
import { IRecipe } from '../../models/recipe';

export interface State {
  recipes: IRecipe[];
  singleRecipe: IRecipe | null;
  loading: boolean;
}

export const DEFAULT_STATE: State = {
  recipes: [],
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
      console.log('🚀', action.payload);
      return { ...state, singleRecipe: action.payload, loading: false };
    case types.FETCH_SINGLE_RECIPE_FAIL:
      return { ...state, loading: false };
  }

  return state;
};

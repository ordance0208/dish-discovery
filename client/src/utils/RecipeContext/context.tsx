import { createContext, useReducer, useContext } from 'react';
import { DEFAULT_STATE, recipeReducer, State } from './reducer';

const RecipeContext = createContext<any>(DEFAULT_STATE);

const RecipeProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(recipeReducer, DEFAULT_STATE);

  return (
    <RecipeContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
};

const useRecipeContext = () => useContext(RecipeContext);

export { useRecipeContext  };

export default RecipeProvider;

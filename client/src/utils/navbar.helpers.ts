import { Path } from '../models/path';
import { AUTH_PATHS, PATHS } from '../routes';

export const menuPaths: Path[] = [
  // {
  //   label: 'Home',
  //   to: PATHS.HOME,
  //   availableWhenLoggedIn: true,
  //   protectedRoute: false,
  // },
  {
    label: 'Recipes',
    to: PATHS.RECIPES,
    availableWhenLoggedIn: true,
    protectedRoute: false,
  },
  {
    label: 'Submit',
    to: PATHS.RECIPE_SUBMIT,
    availableWhenLoggedIn: true,
    protectedRoute: true,
  },
  {
    label: 'Sign In',
    to: AUTH_PATHS.LOGIN,
    availableWhenLoggedIn: false,
    protectedRoute: false,
  },
  {
    label: 'Sign Up',
    to: AUTH_PATHS.REGISTER,
    availableWhenLoggedIn: false,
    protectedRoute: false,
  },
];

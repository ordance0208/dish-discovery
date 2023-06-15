import { Path } from '../models/path';
import { AUTH_PATHS, PATHS } from '../routes';

export const menuPaths: Path[] = [
  {
    label: 'Home',
    to: PATHS.HOME,
    availableWhenLoggedIn: true
  },
  {
    label: 'Recipes',
    to: PATHS.RECIPES,
    availableWhenLoggedIn: true
  },
  {
    label: 'Sign In',
    to: AUTH_PATHS.LOGIN,
    availableWhenLoggedIn: false
  },
  {
    label: 'Sign Up',
    to: AUTH_PATHS.REGISTER,
    availableWhenLoggedIn: false
  },
];

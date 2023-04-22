import { Path } from '../models/path';
import { AUTH_PATHS, PATHS } from '../routes';

export const menuPaths: Path[] = [
  {
    label: 'Home',
    to: PATHS.HOME,
  },
  {
    label: 'Recipes',
    to: PATHS.RECIPES,
  },
  {
    label: 'About',
    to: PATHS.ABOUT,
  },
  {
    label: 'Sign In',
    to: AUTH_PATHS.LOGIN,
  },
  {
    label: 'Sign Up',
    to: AUTH_PATHS.REGISTER,
  },
];

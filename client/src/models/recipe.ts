import { Descendant } from 'slate';
import { IUser } from './user';

export interface IRecipe {
  title: string;
  image: string;
  description: Descendant[];
  ingredients: string[];
  preparationTime: number;
  tags: string[];
  views: number;
  likes: string[];
  user: IUser;
}

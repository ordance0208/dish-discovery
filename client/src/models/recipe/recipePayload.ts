import { Descendant } from 'slate';

export interface RecipeFields {
  title: string;
  ingredients: string[];
  preparationTime: number;
  tags: never[];
  description: Descendant[];
}

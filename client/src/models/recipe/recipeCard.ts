import { IUser } from '../user';

export default interface IRecipeCard {
  title: string;
  user: IUser;
  createdAt: Date;
  preparationTime: number;
  image: string;
  _id: string;
}

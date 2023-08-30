import { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IMenuCategories {
  name: string;
  description: string;
  icon: string;
  image: string;
  type: ['veg', 'NonVeg', 'Vegan'];
}

export interface IMenuCategoriesDoc extends IMenuCategories, Document {}

export interface IMenuCategoriesModel extends Model<IMenuCategoriesDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type updateIMenuCategoriesBody = Partial<IMenuCategories>;

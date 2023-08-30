import { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IMenuIngredients {
  name: string;
  description: string;
  unit: string;
  image: string;
  quantityInStock: string;
  threshold: string;
  supplier: {
    name: string;
    contactDetails: string;
  };
  cost: number;
  lastOrderedDate: Date;
  shelfLife: string;
  storageInstruction: string;
  category: string;
}

export interface IMenuIngredientsDoc extends IMenuIngredients, Document {}

export interface IMenuIngredientsModel extends Model<IMenuIngredientsDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type updateIMenuIngredientsBody = Partial<IMenuIngredients>;

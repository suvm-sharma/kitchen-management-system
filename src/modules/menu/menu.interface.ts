import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IMenu {
  restaurant: mongoose.Types.ObjectId;
  name: string;
  description: string;
  image: string;
  category: mongoose.Types.ObjectId;
  ingredient: [
    {
      ingredient: mongoose.Types.ObjectId;
      quantity: string;
    }
  ];
  tags: [string];
  availability: [string];
  prepTime: string;
  nutritionInfo: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
  allergies: [string];
  options: [
    {
      name: string;
      description: string;
      additionalPrice: string;
    }
  ];
  variants: [
    {
      name: string;
      description: string;
      price: number;
    }
  ];
  addOn: [
    {
      name: string;
      description: string;
      additionalPrice: number;
    }
  ];
  offers: [
    {
      name: string;
      description: string;
      validity: {
        from: string;
        to: string;
      };
      discountPercentage: string;
      discountAmount: number;
      applicableON: boolean;
    }
  ];
  isAvailable: boolean;
}

export interface IMenuDoc extends IMenu, Document {}

export interface IMenuModel extends Model<IMenuDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type updateIMenuBody = Partial<IMenu>;

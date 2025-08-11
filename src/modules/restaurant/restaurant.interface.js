import { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IRestaurant {
  name: string;
  address: string;
  phone: number;
  email: string;
  hoursOfOperation: [
    {
      daysOfWork: string;
      openingTime: string;
      closingTime: string;
    }
  ];
  location: [latitude: string, longitude: string];
  restaurantImage: string;
  logo: string;
}

export interface IRestaurantDoc extends IRestaurant, Document {}

export interface IRestaurantModel extends Model<IRestaurantDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type updateIRestaurantBody = Partial<IRestaurant>;

import mongoose from 'mongoose';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IRestaurant, IRestaurantDoc, updateIRestaurantBody } from './restaurant.interface';
import Restaurant from './restaurant.model';
import { ApiError } from '../errors';
import httpStatus from 'http-status';

export const createRestaurant = async (createRestaurant: IRestaurant): Promise<IRestaurantDoc> => {
  return await Restaurant.create(createRestaurant);
};

export const getRestaurant = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const restaurant = await Restaurant.paginate(filter, options);
  return restaurant;
};

export const getRestaurantById = async (RestaurantId: mongoose.Types.ObjectId): Promise<IRestaurantDoc | null> => {
  return await Restaurant.findById(RestaurantId);
};

export const updateRestaurant = async (RestaurantId: mongoose.Types.ObjectId, updateBody: updateIRestaurantBody): Promise<IRestaurantDoc | null> => {
  const restaurant = await getRestaurantById(RestaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not Found');
  }
  Object.assign(restaurant, updateBody);
  await restaurant.save();
  return restaurant;
};

export const deleteRestaurant = async (RestaurantId: mongoose.Types.ObjectId): Promise<IRestaurantDoc | null> => {
  const restaurant = await getRestaurantById(RestaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not Found');
  }
  await restaurant.deleteOne();
  return restaurant;
};

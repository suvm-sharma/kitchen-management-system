import Restaurant from './restaurant.model';
import { ApiError } from '../errors';
import httpStatus from 'http-status';

export const createRestaurant = async (createRestaurant) => {
  return await Restaurant.create(createRestaurant);
};

export const getRestaurant = async (filter, options) => {
  const restaurant = await Restaurant.paginate(filter, options);
  return restaurant;
};

export const getRestaurantById = async (RestaurantId) => {
  return await Restaurant.findById(RestaurantId);
};

export const updateRestaurant = async (RestaurantId, updateBody) => {
  const restaurant = await getRestaurantById(RestaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not Found');
  }
  Object.assign(restaurant, updateBody);
  await restaurant.save();
  return restaurant;
};

export const deleteRestaurant = async (RestaurantId) => {
  const restaurant = await getRestaurantById(RestaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not Found');
  }
  await restaurant.deleteOne();
  return restaurant;
};

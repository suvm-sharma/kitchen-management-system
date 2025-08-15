import { catchAsync, pick } from '../utils/index.js';
import * as restaurantService from './restaurant.service.js';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { ApiError } from '../errors/index.js';

export const createRestaurant = catchAsync(async (req, res) => {
  const restaurant = await restaurantService.createRestaurant(req);
  res.status(httpStatus.CREATED).send(restaurant);
});

export const getRestaurant = catchAsync(async (req, res) => {
  let filter = await pick(req.query, ['name', 'address']);
  const options = await pick(req.query, ['sortBy', 'projectBy', 'limit', 'page']);
  const result = await restaurantService.getRestaurant(filter, options);
  res.send(result);
});

export const getRestaurantById = catchAsync(async (req, res) => {
  if (typeof req.params['restaurantId'] === 'string') {
    const restaurant = await restaurantService.getRestaurantById(new mongoose.Types.ObjectId(req.params['restaurantId']));
    if (!restaurant) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not Found');
    }
    res.send(restaurant);
  }
});

export const updateRestaurant = catchAsync(async (req, res) => {
  if (typeof req.params['restaurantId'] === 'string') {
    const restaurant = await restaurantService.updateRestaurant(
      new mongoose.Types.ObjectId(req.params['restaurantId']),
      req.body
    );
    if (!restaurant) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not Found');
    }
    res.send(restaurant);
  }
});

export const deleteRestaurant = catchAsync(async (req, res) => {
  if (typeof req.params['restaurantId'] === 'string') {
    const restaurant = await restaurantService.deleteRestaurant(new mongoose.Types.ObjectId(req.params['restaurantId']));
    if (!restaurant) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not Found');
    }
  }
  res.status(httpStatus.NO_CONTENT).send();
});

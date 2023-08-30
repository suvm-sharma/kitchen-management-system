import { Request, Response } from 'express';
import { catchAsync, pick } from '../utils';
import * as restaurantService from './restaurant.service';
import httpStatus from 'http-status';
import { IOptions } from '../paginate/paginate';
import mongoose from 'mongoose';
import { ApiError } from '../errors';

export const createRestaurant = catchAsync(async (req: Request, res: Response) => {
  const restaurant = await restaurantService.createRestaurant(req.body);
  res.status(httpStatus.CREATED).send(restaurant);
});

export const getRestaurant = catchAsync(async (req: Request, res: Response) => {
  let filter = await pick(req.query, ['name', 'address']);
  const options: IOptions = await pick(req.query, ['sortBy', 'projectBy', 'limit', 'page']);
  const result = await restaurantService.getRestaurant(filter, options);
  res.send(result);
});

export const getRestaurantById = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['restaurantId'] === 'string') {
    const restaurant = await restaurantService.getRestaurantById(new mongoose.Types.ObjectId(req.params['restaurantId']));
    if (!restaurant) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not Found');
    }
    res.send(restaurant);
  }
});

export const updateRestaurant = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['restaurantId'] === 'string') {
    const restaurant = await restaurantService.updateRestaurant(new mongoose.Types.ObjectId(req.params['restaurantId']), req.body);
    if (!restaurant) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not Found');
    }
    res.send(restaurant);
  }
});

export const deleteRestaurant = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['restaurantId'] === 'string') {
    const restaurant = await restaurantService.deleteRestaurant(new mongoose.Types.ObjectId(req.params['restaurantId']));
    if (!restaurant) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not Found');
    }
  }
  res.status(httpStatus.NO_CONTENT).send();
});

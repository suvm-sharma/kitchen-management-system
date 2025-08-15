import { catchAsync, pick } from '../utils/index.js';
import * as menuCategoriesService from './menuCategories.service.js';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { ApiError } from '../errors/index.js';

export const createMenuCategories = catchAsync(async (req, res) => {
  const menuCategories = await menuCategoriesService.createMenuCategories(req.body);
  res.status(httpStatus.CREATED).send(menuCategories);
});

export const getMenuCategories = catchAsync(async (req, res) => {
  let filter = await pick(req.query, ['name']);
  const options = await pick(req.query, ['sortBy', 'projectBy', 'limit', 'page']);
  const result = await menuCategoriesService.getMenuCategories(filter, options);
  res.send(result);
});

export const getMenuCategoriesById = catchAsync(async (req, res) => {
  if (typeof req.params['menuCategoriesId'] === 'string') {
    const menuCategories = await menuCategoriesService.getMenuCategoriesById(
      new mongoose.Types.ObjectId(req.params['menuCategoriesId'])
    );
    if (!menuCategories) {
      throw new ApiError(httpStatus.NOT_FOUND, 'MenuCategories not Found');
    }
    res.send(menuCategories);
  }
});

export const updateMenuCategories = catchAsync(async (req, res) => {
  if (typeof req.params['menuCategoriesId'] === 'string') {
    const menuCategories = await menuCategoriesService.updateMenuCategories(
      new mongoose.Types.ObjectId(req.params['menuCategoriesId']),
      req.body
    );
    if (!menuCategories) {
      throw new ApiError(httpStatus.NOT_FOUND, 'MenuCategories not Found');
    }
    res.send(menuCategories);
  }
});

export const deleteMenuCategories = catchAsync(async (req, res) => {
  if (typeof req.params['menuCategoriesId'] === 'string') {
    const menuCategories = await menuCategoriesService.deleteMenuCategories(
      new mongoose.Types.ObjectId(req.params['menuCategoriesId'])
    );
    if (!menuCategories) {
      throw new ApiError(httpStatus.NOT_FOUND, 'MenuCategories not Found');
    }
  }
  res.status(httpStatus.NO_CONTENT).send();
});

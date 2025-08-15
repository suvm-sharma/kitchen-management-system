import { catchAsync, pick } from '../utils/index.js';
import * as menuIngredientsService from './menuIngredients.service.js';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { ApiError } from '../errors/index.js';

export const createMenuIngredients = catchAsync(async (req, res) => {
  const menuIngredients = await menuIngredientsService.createMenuIngredients(req.body);
  res.status(httpStatus.CREATED).send(menuIngredients);
});

export const getMenuIngredients = catchAsync(async (req, res) => {
  let filter = await pick(req.query, ['name']);
  const options = await pick(req.query, ['sortBy', 'projectBy', 'limit', 'page']);
  const result = await menuIngredientsService.getMenuIngredients(filter, options);
  res.send(result);
});

export const getMenuIngredientsById = catchAsync(async (req, res) => {
  if (typeof req.params['menuIngredientsId'] === 'string') {
    const menuIngredients = await menuIngredientsService.getMenuIngredientsById(
      new mongoose.Types.ObjectId(req.params['menuIngredientsId'])
    );
    if (!menuIngredients) {
      throw new ApiError(httpStatus.NOT_FOUND, 'MenuIngredients not Found');
    }
    res.send(menuIngredients);
  }
});

export const updateMenuIngredients = catchAsync(async (req, res) => {
  if (typeof req.params['menuIngredientsId'] === 'string') {
    const menuIngredients = await menuIngredientsService.updateMenuIngredients(
      new mongoose.Types.ObjectId(req.params['menuIngredientsId']),
      req.body
    );
    if (!menuIngredients) {
      throw new ApiError(httpStatus.NOT_FOUND, 'MenuIngredients not Found');
    }
    res.send(menuIngredients);
  }
});

export const deleteMenuIngredients = catchAsync(async (req, res) => {
  if (typeof req.params['menuIngredientsId'] === 'string') {
    const menuIngredients = await menuIngredientsService.deleteMenuIngredients(
      new mongoose.Types.ObjectId(req.params['menuIngredientsId'])
    );
    if (!menuIngredients) {
      throw new ApiError(httpStatus.NOT_FOUND, 'MenuIngredients not Found');
    }
  }
  res.status(httpStatus.NO_CONTENT).send();
});

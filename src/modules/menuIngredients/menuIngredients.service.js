import mongoose from 'mongoose';
import MenuIngredients from './menuIngredients.model';
import { ApiError } from '../errors';
import httpStatus from 'http-status';

export const createMenuIngredients = async (createMenuIngredients) => {
  return await MenuIngredients.create(createMenuIngredients);
};

export const getMenuIngredients = async (filter, options) => {
  const menuIngredients = await MenuIngredients.paginate(filter, options);
  return menuIngredients;
};

export const getMenuIngredientsById = async (MenuIngredientsId) => {
  return await MenuIngredients.findById(MenuIngredientsId);
};

export const updateMenuIngredients = async (MenuIngredientsId, updateBody) => {
  const menuIngredients = await getMenuIngredientsById(MenuIngredientsId);
  if (!menuIngredients) {
    throw new ApiError(httpStatus.NOT_FOUND, 'MenuIngredients not Found');
  }
  Object.assign(menuIngredients, updateBody);
  await menuIngredients.save();
  return menuIngredients;
};

export const deleteMenuIngredients = async (MenuIngredientsId) => {
  const menuIngredients = await getMenuIngredientsById(MenuIngredientsId);
  if (!menuIngredients) {
    throw new ApiError(httpStatus.NOT_FOUND, 'MenuIngredients not Found');
  }
  await menuIngredients.deleteOne();
  return menuIngredients;
};

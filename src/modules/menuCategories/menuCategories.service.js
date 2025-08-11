import MenuCategories from './menuCategories.model';
import { ApiError } from '../errors';
import httpStatus from 'http-status';

export const createMenuCategories = async (createMenuCategories) => {
  return await MenuCategories.create(createMenuCategories);
};

export const getMenuCategories = async (filter) => {
  const menuCategories = await MenuCategories.paginate(filter, options);
  return menuCategories;
};

export const getMenuCategoriesById = async (MenuCategoriesId) => {
  return await MenuCategories.findById(MenuCategoriesId);
};

export const updateMenuCategories = async (MenuCategoriesId, updateBody) => {
  const menuCategories = await getMenuCategoriesById(MenuCategoriesId);
  if (!menuCategories) {
    throw new ApiError(httpStatus.NOT_FOUND, 'MenuCategories not Found');
  }
  Object.assign(menuCategories, updateBody);
  await menuCategories.save();
  return menuCategories;
};

export const deleteMenuCategories = async (MenuCategoriesId) => {
  const menuCategories = await getMenuCategoriesById(MenuCategoriesId);
  if (!menuCategories) {
    throw new ApiError(httpStatus.NOT_FOUND, 'MenuCategories not Found');
  }
  await menuCategories.deleteOne();
  return menuCategories;
};

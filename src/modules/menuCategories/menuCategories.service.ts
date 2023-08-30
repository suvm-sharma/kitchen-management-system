import mongoose from 'mongoose';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IMenuCategories, IMenuCategoriesDoc, updateIMenuCategoriesBody } from './menuCategories.interface';
import MenuCategories from './menuCategories.model';
import { ApiError } from '../errors';
import httpStatus from 'http-status';

export const createMenuCategories = async (createMenuCategories: IMenuCategories): Promise<IMenuCategoriesDoc> => {
  return await MenuCategories.create(createMenuCategories);
};

export const getMenuCategories = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const menuCategories = await MenuCategories.paginate(filter, options);
  return menuCategories;
};

export const getMenuCategoriesById = async (MenuCategoriesId: mongoose.Types.ObjectId): Promise<IMenuCategoriesDoc | null> => {
  return await MenuCategories.findById(MenuCategoriesId);
};

export const updateMenuCategories = async (MenuCategoriesId: mongoose.Types.ObjectId, updateBody: updateIMenuCategoriesBody): Promise<IMenuCategoriesDoc | null> => {
  const menuCategories = await getMenuCategoriesById(MenuCategoriesId);
  if (!menuCategories) {
    throw new ApiError(httpStatus.NOT_FOUND, 'MenuCategories not Found');
  }
  Object.assign(menuCategories, updateBody);
  await menuCategories.save();
  return menuCategories;
};

export const deleteMenuCategories = async (MenuCategoriesId: mongoose.Types.ObjectId): Promise<IMenuCategoriesDoc | null> => {
  const menuCategories = await getMenuCategoriesById(MenuCategoriesId);
  if (!menuCategories) {
    throw new ApiError(httpStatus.NOT_FOUND, 'MenuCategories not Found');
  }
  await menuCategories.deleteOne();
  return menuCategories;
};

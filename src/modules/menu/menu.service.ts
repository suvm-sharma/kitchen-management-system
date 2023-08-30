import mongoose from 'mongoose';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IMenu, IMenuDoc, updateIMenuBody } from './menu.interface';
import Menu from './menu.model';
import { ApiError } from '../errors';
import httpStatus from 'http-status';

export const createMenu = async (createMenu: IMenu): Promise<IMenuDoc> => {
  return await Menu.create(createMenu);
};

export const getMenu = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const menu = await Menu.paginate(filter, options);
  return menu;
};

export const getMenuById = async (MenuId: mongoose.Types.ObjectId): Promise<IMenuDoc | null> => {
  return await Menu.findById(MenuId);
};

export const updateMenu = async (MenuId: mongoose.Types.ObjectId, updateBody: updateIMenuBody): Promise<IMenuDoc | null> => {
  const menu = await getMenuById(MenuId);
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Menu not Found');
  }
  Object.assign(menu, updateBody);
  await menu.save();
  return menu;
};

export const deleteMenu = async (MenuId: mongoose.Types.ObjectId): Promise<IMenuDoc | null> => {
  const menu = await getMenuById(MenuId);
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Menu not Found');
  }
  await menu.deleteOne();
  return menu;
};

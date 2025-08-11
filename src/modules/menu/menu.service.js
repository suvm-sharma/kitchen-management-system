import mongoose from 'mongoose';
import Menu from './menu.model';
import { ApiError } from '../errors';
import httpStatus from 'http-status';

export const createMenu = async (createMenu) => {
  return await Menu.create(createMenu);
};

export const getMenu = async (filter, options) => {
  const menu = await Menu.paginate(filter, options);
  return menu;
};

export const getMenuById = async (MenuId) => {
  return await Menu.findById(MenuId);
};

export const updateMenu = async (MenuId, updateBody) => {
  const menu = await getMenuById(MenuId);
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Menu not Found');
  }
  Object.assign(menu, updateBody);
  await menu.save();
  return menu;
};

export const deleteMenu = async (MenuId) => {
  const menu = await getMenuById(MenuId);
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Menu not Found');
  }
  await menu.deleteOne();
  return menu;
};

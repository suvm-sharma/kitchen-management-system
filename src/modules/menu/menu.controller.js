import { catchAsync, pick } from '../utils';
import * as menuService from './menu.service';
import httpStatus from 'http-status';
import { IOptions } from '../paginate/paginate';
import mongoose from 'mongoose';
import { ApiError } from '../errors';
import { checkIfHasAccess } from '../utils';

export const createMenu = catchAsync(async (req, res) => {
  checkIfHasAccess(req.body, req.staff);
  const menu = await menuService.createMenu(req.body);
  res.status(httpStatus.CREATED).send(menu);
});

export const getMenu = catchAsync(async (req, res) => {
  let filter = await pick(req.query, ['name']);
  //  if the staff member is not a super admin, the code inside the curly braces will be executed.
  // if (!req.staff.isSuperAdmin) {
  //   filter.restaurant = req.staff.restaurant;
  // }
  const options = await pick(req.query, ['sortBy', 'projectBy', 'limit', 'page']);
  const result = await menuService.getMenu(filter, options);

  res.send(result);
});

export const getMenuById = catchAsync(async (req, res) => {
  if (typeof req.params['menuId'] === 'string') {
    const menu = await menuService.getMenuById(new mongoose.Types.ObjectId(req.params['menuId']));

    checkIfHasAccess(menu, req.staff);
    if (!menu) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Menu not Found');
    }
    res.send(menu);
  }
});

export const updateMenu = catchAsync(async (req, res) => {
  checkIfHasAccess(req.body, req.staff);
  if (typeof req.params['menuId'] === 'string') {
    const menu = await menuService.updateMenu(new mongoose.Types.ObjectId(req.params['menuId']), req.body);
    if (!menu) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Menu not Found');
    }
    res.send(menu);
  }
});

export const deleteMenu = catchAsync(async (req, res) => {
  if (typeof req.params['menuId'] === 'string') {
    const menu = await menuService.deleteMenu(new mongoose.Types.ObjectId(req.params['menuId']));
    if (!menu) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Menu not Found');
    }
  }
  res.status(httpStatus.NO_CONTENT).send();
});

import { Request, Response } from 'express';
import { catchAsync, pick } from '../utils';
import * as roleService from './role.service';
import httpStatus from 'http-status';
import { IOptions } from '../paginate/paginate';
import mongoose from 'mongoose';
import { ApiError } from '../errors';

export const createRole = catchAsync(async (req: Request, res: Response) => {
  const role = await roleService.createRole(req.body);
  res.status(httpStatus.CREATED).send(role);
});

export const getRole = catchAsync(async (req: Request, res: Response) => {
  let filter = await pick(req.query, ['title']);
  const options: IOptions = await pick(req.query, ['sortBy', 'projectBy', 'limit', 'page']);
  const result = await roleService.getRole(filter, options);
  res.send(result);
});

export const getRoleById = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['roleId'] === 'string') {
    const role = await roleService.getRoleById(new mongoose.Types.ObjectId(req.params['roleId']));
    if (!role) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Role not Found');
    }
    res.send(role);
  }
});

export const updateRole = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['roleId'] === 'string') {
    const role = await roleService.updateRole(new mongoose.Types.ObjectId(req.params['roleId']), req.body);
    if (!role) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Role not Found');
    }
    res.send(role);
  }
});

export const deleteRole = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['roleId'] === 'string') {
    const role = await roleService.deleteRole(new mongoose.Types.ObjectId(req.params['roleId']));
    if (!role) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Role not Found');
    }
  }
  res.status(httpStatus.NO_CONTENT).send();
});

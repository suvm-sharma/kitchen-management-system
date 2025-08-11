import { catchAsync, pick } from '../utils';
import * as roleService from './role.service';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { ApiError } from '../errors';

export const createRole = catchAsync(async (req, res) => {
  const role = await roleService.createRole(req.body);
  res.status(httpStatus.CREATED).send(role);
});

export const getRole = catchAsync(async (req, res) => {
  let filter = await pick(req.query, ['title']);
  const options = await pick(req.query, ['sortBy', 'projectBy', 'limit', 'page']);
  const result = await roleService.getRole(filter, options);
  res.send(result);
});

export const getRoleById = catchAsync(async (req, res) => {
  if (typeof req.params['roleId'] === 'string') {
    const role = await roleService.getRoleById(new mongoose.Types.ObjectId(req.params['roleId']));
    if (!role) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Role not Found');
    }
    res.send(role);
  }
});

export const updateRole = catchAsync(async (req, res) => {
  if (typeof req.params['roleId'] === 'string') {
    const role = await roleService.updateRole(new mongoose.Types.ObjectId(req.params['roleId']), req.body);
    if (!role) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Role not Found');
    }
    res.send(role);
  }
});

export const deleteRole = catchAsync(async (req, res) => {
  if (typeof req.params['roleId'] === 'string') {
    const role = await roleService.deleteRole(new mongoose.Types.ObjectId(req.params['roleId']));
    if (!role) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Role not Found');
    }
  }
  res.status(httpStatus.NO_CONTENT).send();
});

import { catchAsync, checkIfHasAccess, pick } from '../utils';
import * as staffService from './staff.service';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { ApiError } from '../errors';

export const createStaff = catchAsync(async (req, res) => {
  checkIfHasAccess(req.body, req.staff);
  const staff = await staffService.createStaff(req.body);
  res.status(httpStatus.CREATED).send(staff);
});

export const getStaff = catchAsync(async (req, res) => {
  let filter = await pick(req.query, ['firstName', 'lastName', 'role']);
  const options = await pick(req.query, ['sortBy', 'projectBy', 'limit', 'page']);
  options.populate = [
    { path: 'role', model: 'Role' },
    { path: 'restaurant', model: 'Restaurant' },
  ]
    .map(({ path }) => path)
    .join(' ');
  // options.populate = 'Role';
  const result = await staffService.getStaff(filter, options);
  res.send(result);
});

export const getStaffById = catchAsync(async (req, res) => {
  if (typeof req.params['staffId'] === 'string') {
    const staff = await staffService.getStaffById(new mongoose.Types.ObjectId(req.params['staffId']));

    if (!staff) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Staff not Found');
    }
    checkIfHasAccess(staff, req.staff);
    res.send(staff);
  }
});

export const updateStaff = catchAsync(async (req, res) => {
  checkIfHasAccess(req.body, req.staff);
  if (typeof req.params['staffId'] === 'string') {
    const staff = await staffService.updateStaff(new mongoose.Types.ObjectId(req.params['staffId']), req.body);

    if (!staff) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Staff not Found');
    }
    res.send(staff);
  }
});

export const deleteStaff = catchAsync(async (req, res) => {
  if (typeof req.params['staffId'] === 'string') {
    const staff = await staffService.deleteStaff(new mongoose.Types.ObjectId(req.params['staffId']));
    if (!staff) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Staff not Found');
    }
  }
  res.status(httpStatus.NO_CONTENT).send();
});

export const profileView = catchAsync(async (req, res) => {
  const staff = await staffService.profileView(req.staff);
  res.send(staff);
});

export const profileUpdate = catchAsync(async (req, res) => {
  checkIfHasAccess(req.body, req.staff);
  const staff = await staffService.profileUpdate(req.staff, req.body);

  res.send(staff);
});

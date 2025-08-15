import mongoose from 'mongoose';
import QueryResult from '../paginate/paginate.js';
import Staff from './staff.model.js';
import { ApiError } from '../errors/index.js';
import httpStatus from 'http-status';

/**
 * Create a staff
 * @param {NewCreatedStaff} staffBody
 * @returns {Promise<IStaffDoc>}
 */

export const createStaff = async (staffBody) => {
  if (await Staff.isEmailTaken(staffBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Staff.create(staffBody);
};

/**
 * Register a staff
 * @param {NewRegisteredStaff} staffBody
 * @returns {Promise<IStaffDoc>}
 */
export const registerStaff = async (staffBody) => {
  if (await Staff.isEmailTaken(staffBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Staff.create(staffBody);
};

/** Query for staffs
 * @param {Object} filter - Mongoose filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const getStaff = async (filter, options) => {
  const staff = await Staff.paginate(filter, options);
  return staff;
};

/**
 * Get staff by id
 * @param {mongoose.Types.ObjectId} StaffId
 * @returns {Promise<IStaffDoc | null>}
 */
export const getStaffById = async (StaffId) => {
  return await Staff.findById(StaffId);
};

/**
 * Get staff by email
 * @param {string} email
 * @returns {Promise<IStaffDoc | null>}
 */
export const getStaffByEmail = async (email) => Staff.findOne({ email });

/**
 * Update staff by id
 * @param {mongoose.Types.ObjectId} StaffId
 * @param {UpdateStaffBody} updateBody
 * @returns {Promise<IStaffDoc | null>}
 */
export const updateStaff = async (StaffId, updateBody) => {
  const staff = await getStaffById(StaffId);

  if (!staff) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Staff not Found');
  }
  Object.assign(staff, updateBody);
  await staff.save();
  return staff;
};

/**
 * Delete staff by id
 * @param {mongoose.Types.ObjectId} StaffId
 * @returns {Promise<IStaffDoc | null>}
 */
export const deleteStaff = async (StaffId) => {
  const staff = await getStaffById(StaffId);
  if (!staff) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Staff not Found');
  }
  await staff.deleteOne();
  return staff;
};

export const profileView = async (Staff) => {
  return Staff;
};

export const profileUpdate = async (staff, updateBody) => {
  if (!staff) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Staff not Found');
  }
  Object.assign(staff, updateBody);
  await staff.save();
  return staff;
};

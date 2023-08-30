import mongoose from 'mongoose';
import { IOptions, QueryResult } from '../paginate/paginate';
import Staff from './staff.model';
import { ApiError } from '../errors';
import httpStatus from 'http-status';
import { NewCreatedStaff, updateIStaffBody, IStaffDoc, NewRegisteredStaff } from './staff.interface';

/**
 * Create a staff
 * @param {NewCreatedStaff} staffBody
 * @returns {Promise<IStaffDoc>}
 */

export const createStaff = async (staffBody: NewCreatedStaff): Promise<IStaffDoc> => {
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
export const registerStaff = async (staffBody: NewRegisteredStaff): Promise<IStaffDoc> => {
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
export const getStaff = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const staff = await Staff.paginate(filter, options);
  return staff;
};

/**
 * Get staff by id
 * @param {mongoose.Types.ObjectId} StaffId
 * @returns {Promise<IStaffDoc | null>}
 */
export const getStaffById = async (StaffId: mongoose.Types.ObjectId): Promise<IStaffDoc | null> => {
  return await Staff.findById(StaffId);
};

/**
 * Get staff by email
 * @param {string} email
 * @returns {Promise<IStaffDoc | null>}
 */
export const getStaffByEmail = async (email: string): Promise<IStaffDoc | null> => Staff.findOne({ email });

/**
 * Update staff by id
 * @param {mongoose.Types.ObjectId} StaffId
 * @param {UpdateStaffBody} updateBody
 * @returns {Promise<IStaffDoc | null>}
 */
export const updateStaff = async (
  StaffId: mongoose.Types.ObjectId,
  updateBody: updateIStaffBody
): Promise<IStaffDoc | null> => {
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
export const deleteStaff = async (StaffId: mongoose.Types.ObjectId): Promise<IStaffDoc | null> => {
  const staff = await getStaffById(StaffId);
  if (!staff) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Staff not Found');
  }
  await staff.deleteOne();
  return staff;
};

export const profileView = async (Staff: IStaffDoc): Promise<IStaffDoc | null> => {
  return Staff;
};

export const profileUpdate = async (staff: IStaffDoc, updateBody: updateIStaffBody): Promise<IStaffDoc | null> => {
  if (!staff) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Staff not Found');
  }
  Object.assign(staff, updateBody);
  await staff.save();
  return staff;
};

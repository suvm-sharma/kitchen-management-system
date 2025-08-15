import httpStatus from 'http-status';
import mongoose from 'mongoose';
import StaffToken from '../staffToken/staffToken.model.js';
import ApiError from '../errors/ApiError.js';
import tokenTypes from '../staffToken/staffToken.types.js';
import { getStaffByEmail, getStaffById, updateStaff } from '../staff/staff.service.js';
import { verifyToken } from '../staffToken/staffToken.service.js';

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<IStaffDoc>}
 */
export const loginStaffWithEmailAndPassword = async (email, password) => {
  const staff = await getStaffByEmail(email);
  if (!staff || !(await staff.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return staff;
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise<void>}
 */
export const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const staff = await getStaffById(new mongoose.Types.ObjectId(resetPasswordTokenDoc.staff));
    if (!staff) {
      throw new Error();
    }
    await updateStaff(staff.id, { password: newPassword });
    await StaffToken.deleteMany({ staff: staff.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Change password
 * @param {email} email
 * @param {string} oldPassword
 * @param {string} newPassword
 * @returns {string} message
 */

export const changePassword = async (email, oldPassword, newPassword) => {
  const staff = await getStaffByEmail(email);
  if (!staff || !(await staff.isPasswordMatch(oldPassword))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or oldPassword');
  }
  staff.password = newPassword;
  return staff.save();
};

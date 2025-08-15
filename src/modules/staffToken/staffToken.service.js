import jwt from 'jsonwebtoken';
import moment from 'moment';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import config from '../../config/config.js';
import StaffToken from './staffToken.model.js';
import ApiError from '../errors/ApiError.js';
import tokenTypes from './staffToken.types.js';
import { staffService } from '../staff/index.js';

/**
 * Generate token
 * @param {mongoose.Types.ObjectId} staffId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
export const generateToken = (staffId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: staffId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {mongoose.Types.ObjectId} staffId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<ITokenDoc>}
 */
export const saveToken = async (token, staffId, expires, type, blacklisted = false) => {
  const tokenDoc = await StaffToken.create({
    token,
    staff: staffId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<ITokenDoc>}
 */
export const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  // console.log('payload-------------------', payload);

  if (typeof payload.sub !== 'string') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'bad staff');
  }
  const tokenDoc = await StaffToken.findOne({
    token,
    type,
    staff: payload.sub,
    blacklisted: false,
  });

  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {IStaffDoc} staff
 * @returns {Promise<AccessAndRefreshTokens>}
 */
export const generateAuthTokens = async (staff) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(staff.id, accessTokenExpires, tokenTypes.ACCESS);
  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(staff.id, refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(refreshToken, staff.id, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
export const generateResetPasswordToken = async (email) => {
  const staff = await staffService.getStaffByEmail(email);
  console.log('staff-----------', staff);

  if (!staff) {
    throw new ApiError(httpStatus.NO_CONTENT, '');
  }
  const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
  const resetPasswordToken = generateToken(staff.id, expires, tokenTypes.RESET_PASSWORD);
  await saveToken(resetPasswordToken, staff.id, expires, tokenTypes.RESET_PASSWORD);

  return resetPasswordToken;
};

/**
 * Generate verify email token
 * @param {IStaffDoc} staff
 * @returns {Promise<string>}
 */
export const generateVerifyEmailToken = async (staff) => {
  const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
  const verifyEmailToken = generateToken(staff.id, expires, tokenTypes.VERIFY_EMAIL);
  await saveToken(verifyEmailToken, staff.id, expires, tokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
};

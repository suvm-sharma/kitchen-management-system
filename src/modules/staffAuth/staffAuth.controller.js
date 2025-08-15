import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { tokenService } from '../staffToken/index.js';
import { staffService } from '../staff/index.js';
import * as staffAuthService from './staffAuth.service.js';
import { emailService } from '../email/index.js';

export const register = catchAsync(async (req, res) => {
  const staff = await staffService.registerStaff(req.body);
  const tokens = await tokenService.generateAuthTokens(staff);
  res.status(httpStatus.CREATED).send({ staff, tokens });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const staff = await staffAuthService.loginStaffWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(staff);
  res.send({ staff, tokens });
});

export const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

export const resetPassword = catchAsync(async (req, res) => {
  await staffAuthService.resetPassword(req.query['token'], req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

export const changePassword = catchAsync(async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  await staffAuthService.changePassword(email, oldPassword, newPassword);
  res.send('Password changed successfully');
});

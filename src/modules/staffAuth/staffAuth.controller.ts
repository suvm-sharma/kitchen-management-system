import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { tokenService } from '../staffToken';
import { staffService } from '../staff';
import * as staffAuthService from './staffAuth.service';
import { emailService } from '../email';

export const register = catchAsync(async (req: Request, res: Response) => {
  const staff = await staffService.registerStaff(req.body);
  const tokens = await tokenService.generateAuthTokens(staff);
  res.status(httpStatus.CREATED).send({ staff, tokens });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const staff = await staffAuthService.loginStaffWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(staff);
  res.send({ staff, tokens });
});

export const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await staffAuthService.resetPassword(req.query['token'], req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

export const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { email, oldPassword, newPassword } = req.body;
  await staffAuthService.changePassword(email, oldPassword, newPassword);
  res.send('Password changed successfully');
});

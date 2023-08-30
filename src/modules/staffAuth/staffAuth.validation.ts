import Joi from 'joi';
import { objectId, password } from '../validate/custom.validation';
import { NewRegisteredStaff } from '../staff/staff.interface';

const registerBody: Record<keyof NewRegisteredStaff, any> = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.custom(objectId).required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().custom(password),
  workSchedule: Joi.array().items(
    Joi.object({
      dayOfWeek: Joi.string(),
      startHour: Joi.string(),
      endHour: Joi.string(),
    })
  ),
  salary: Joi.object({
    amount: Joi.number(),
    payPeriod: Joi.string(),
  }),
  restaurant: Joi.custom(objectId),
  dateOfBirth: Joi.date(),
  dateHired: Joi.date(),
  dateLeft: Joi.date(),
  address: Joi.string(),
  phone: Joi.string(),
  emergencyContact: Joi.object({
    name: Joi.string(),
    phone: Joi.string(),
  }),
  notes: Joi.string(),
  image: Joi.string(),
};

export const register = {
  body: Joi.object().keys(registerBody),
};

export const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

export const changePassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    oldPassword: Joi.string().required().custom(password),
    newPassword: Joi.string().required().custom(password),
  }),
};

export const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

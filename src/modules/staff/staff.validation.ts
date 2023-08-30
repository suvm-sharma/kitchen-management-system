import Joi from 'joi';
import { NewCreatedStaff } from './staff.interface';
import { password, objectId } from '../validate';

const createStaffBody: Record<keyof NewCreatedStaff, any> = {
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

export const createStaff = {
  body: Joi.object().keys(createStaffBody),
};

export const getStaff = {
  body: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getStaffById = {
  params: Joi.object().keys({
    staffId: Joi.string().custom(objectId),
  }),
};

export const updateStaff = {
  params: Joi.object().keys({
    staffId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
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
    isSuperAdmin: Joi.boolean(),
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
  }),
};

export const deleteStaff = {
  params: Joi.object().keys({
    staffId: Joi.string().custom(objectId),
  }),
};

export const profileView = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

export const profileUpdate = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.custom(objectId).valid(),
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
    phone: Joi.number(),
    emergencyContact: Joi.object({
      name: Joi.string(),
      phone: Joi.number(),
    }),
    notes: Joi.string(),
    image: Joi.string(),
  }),
};

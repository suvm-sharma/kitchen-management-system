import Joi from 'joi';
import { IRole } from './role.interface';
import { objectId } from '../validate';

const createRole: Record<keyof IRole, any> = {
  title: Joi.string().required(),
  permission: Joi.array().items(Joi.string()).required(),
  description: Joi.string(),
  reportsTo: Joi.string(),
};

export const createRoleBody = {
  body: Joi.object().keys(createRole),
};

export const getRole = {
  body: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getRoleById = {
  params: Joi.object().keys({
    roleId: Joi.string().custom(objectId),
  }),
};

export const updateRole = {
  params: Joi.object().keys({
    roleId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    permission: Joi.array().items(Joi.string()).required(),
    description: Joi.string(),
    reportsTo: Joi.string(),
  }),
};

export const deleteRole = {
  params: Joi.object().keys({
    roleId: Joi.string().custom(objectId),
  }),
};

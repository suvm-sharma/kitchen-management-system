import Role from './role.model.js';
import { ApiError } from '../errors/index.js';
import httpStatus from 'http-status';

export const createRole = async (createRole) => {
  return await Role.create(createRole);
};

export const getRole = async (filter, options) => {
  const role = await Role.paginate(filter, options);
  return role;
};

export const getRoleById = async (RoleId) => {
  return await Role.findById(RoleId);
};

export const updateRole = async (RoleId, updateBody) => {
  const role = await getRoleById(RoleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not Found');
  }
  Object.assign(role, updateBody);
  await role.save();
  return role;
};

export const deleteRole = async (RoleId) => {
  const role = await getRoleById(RoleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not Found');
  }
  await role.deleteOne();
  return role;
};

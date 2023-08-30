import mongoose from 'mongoose';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IRole, IRoleDoc, updateIRoleBody } from './role.interface';
import Role from './role.model';
import { ApiError } from '../errors';
import httpStatus from 'http-status';

export const createRole = async (createRole: IRole): Promise<IRoleDoc> => {
  return await Role.create(createRole);
};

export const getRole = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const role = await Role.paginate(filter, options);
  return role;
};

export const getRoleById = async (RoleId: mongoose.Types.ObjectId): Promise<IRoleDoc | null> => {
  return await Role.findById(RoleId);
};

export const updateRole = async (RoleId: mongoose.Types.ObjectId, updateBody: updateIRoleBody): Promise<IRoleDoc | null> => {
  const role = await getRoleById(RoleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not Found');
  }
  Object.assign(role, updateBody);
  await role.save();
  return role;
};

export const deleteRole = async (RoleId: mongoose.Types.ObjectId): Promise<IRoleDoc | null> => {
  const role = await getRoleById(RoleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not Found');
  }
  await role.deleteOne();
  return role;
};

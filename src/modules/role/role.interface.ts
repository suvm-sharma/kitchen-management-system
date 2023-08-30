import { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IRole {
  title: string;
  permission: [string];
  description: string;
  reportsTo: string;
}

export interface IRoleDoc extends IRole, Document {}

export interface IRoleModel extends Model<IRoleDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type updateIRoleBody = Partial<IRole>;

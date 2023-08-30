import mongoose from 'mongoose';
import { IRoleDoc, IRoleModel } from './role.interface';
import { toJSON } from '../toJSON';
import { paginate } from '../paginate';

const roleSchema = new mongoose.Schema<IRoleDoc, IRoleModel>({
  title: {
    type: String,
    required: true,
  },
  permission: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
  },
  reportsTo: {
    type: String,
  },
});

roleSchema.plugin(toJSON);
roleSchema.plugin(paginate);

const Role = mongoose.model<IRoleDoc, IRoleModel>('Role', roleSchema);
export default Role;

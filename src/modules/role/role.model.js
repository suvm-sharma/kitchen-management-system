import mongoose from 'mongoose';
import { toJSON } from '../toJSON/index.js';
import { paginate } from '../paginate/index.js';

const roleSchema = new mongoose.Schema({
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

const Role = mongoose.model('Role', roleSchema);
export default Role;

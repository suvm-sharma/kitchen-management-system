import mongoose from 'mongoose';
import tokenTypes from './staffToken.types';
import toJSON from '../toJSON/toJSON';

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    staff: {
      type: String,
      ref: 'Staff',
      required: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
tokenSchema.plugin(toJSON);

const StaffToken = mongoose.model('StaffToken', tokenSchema);

export default StaffToken;

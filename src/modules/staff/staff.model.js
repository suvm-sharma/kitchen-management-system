import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import toJSON from '../toJSON/toJSON.js';
import { paginate } from '../paginate/index.js';

const staffSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true,
    },
    workSchedule: [
      {
        dayOfWeek: String,
        startHour: String,
        endHour: String,
      },
    ],
    salary: {
      amount: Number,
      payPeriod: String,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
    dateOfBirth: Date,
    dateHired: Date,
    dateLeft: Date,
    address: String,
    phone: String,
    emergencyContact: {
      name: String,
      phone: String,
    },
    notes: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
staffSchema.plugin(toJSON);
staffSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The staff's email
 * @param {ObjectId} [excludeStaffId] - The id of the staff to be excluded
 * @returns {Promise<boolean>}
 */
staffSchema.static('isEmailTaken', async function (email, excludeStaffId) {
  const staff = await this.findOne({ email, _id: { $ne: excludeStaffId } });
  return !!staff;
});

/**
 * Check if password matches the staff's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
staffSchema.method('isPasswordMatch', async function (password) {
  const staff = this;
  return bcrypt.compare(password, staff.password);
});

// pre hook middleware :- it will work on save or create
staffSchema.pre('save', async function (next) {
  const staff = this;
  if (staff.isModified('password')) {
    staff.password = await bcrypt.hash(staff.password, 8);
  }
  next();
});

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;

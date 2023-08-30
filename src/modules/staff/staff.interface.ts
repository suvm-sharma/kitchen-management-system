import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';
import { AccessAndRefreshTokens } from '../staffToken/staffToken.interfaces';

export interface IStaff {
  firstName: string;
  lastName: string;
  role: mongoose.Types.ObjectId;
  email: string;
  password: string;
  workSchedule: [
    {
      dayOfWeek: string;
      startHour: string;
      endHour: string;
    }
  ];
  salary: {
    amount: number;
    payPeriod: string;
  };
  restaurant: mongoose.Types.ObjectId;
  isSuperAdmin: boolean;
  dateOfBirth: Date;
  dateHired: Date;
  dateLeft: Date;
  address: string;
  phone: string;
  emergencyContact: {
    name: string;
    phone: string;
  };
  notes: string;
  image: string;
}

export interface IStaffDoc extends IStaff, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IStaffModel extends Model<IStaffDoc> {
  isEmailTaken(email: string, excludeStaffId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type updateIStaffBody = Partial<IStaff>;

export type NewRegisteredStaff = Omit<IStaff, 'isSuperAdmin'>;

export type NewCreatedStaff = Omit<IStaff, 'isSuperAdmin'>;

export interface IStaffWithTokens {
  staff: IStaffDoc;
  tokens: AccessAndRefreshTokens;
}

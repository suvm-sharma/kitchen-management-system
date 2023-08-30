import { IUserDoc } from './modules/user/user.interfaces';
import { IStaffDoc } from './modules/staff/staff.interface';

declare module 'express-serve-static-core' {
  export interface Request {
    user: IUserDoc;
  }
}

declare module 'express-serve-static-core' {
  export interface Request {
    staff: IStaffDoc;
  }
}

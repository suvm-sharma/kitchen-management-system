import { IStaffDoc } from '../staff/staff.interface';
import { ApiError } from '../errors';
import httpStatus from 'http-status';

const checkIfHasAccess = (item: any, staff: IStaffDoc) => {
  if (staff.isSuperAdmin || staff.restaurant.toString() === item.restaurant.toString()) {
    return true;
  } else {
    throw new ApiError(httpStatus.FORBIDDEN, "Don't have appropriate permissions");
  }
};

export default checkIfHasAccess;

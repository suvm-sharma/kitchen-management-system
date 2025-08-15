import { ApiError } from '../errors/index.js';
import httpStatus from 'http-status';

const checkIfHasAccess = (item, staff) => {
  if (staff.isSuperAdmin || staff.restaurant.toString() === item.restaurant.toString()) {
    return true;
  } else {
    throw new ApiError(httpStatus.FORBIDDEN, "Don't have appropriate permissions");
  }
};

export default checkIfHasAccess;

import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';
import Role from '../role/role.model';
import { IStaffDoc } from '../staff/staff.interface';

const verifyCallback =
  (req: Request, resolve: any, reject: any, requiredRights: string[]) =>
  async (err: Error, staff: IStaffDoc, info: string) => {
    if (err || info || !staff) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
    req.staff = staff;

    if (staff.isSuperAdmin || requiredRights.includes('profile')) {
      resolve();
    }

    if (requiredRights.length) {
      const role = await Role.findById(staff.role); // get whole role document

      if (!role) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Invalid role'));
      }

      const staffRights = role.permission;

      if (!staffRights) return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));

      const hasRequiredRights = requiredRights.every((requiredRight: string) => staffRights.includes(requiredRight));

      if (!hasRequiredRights && req.params['staffId'] !== staff.id) {
        return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
      }
    }
    resolve();
  };

const authMiddleware =
  (...requiredRights: string[]) =>
  async (req: Request, res: Response, next: NextFunction) =>
    new Promise<void>((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));

export default authMiddleware;

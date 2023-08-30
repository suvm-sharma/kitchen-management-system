import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';
import { roleRights } from '../../config/roles';
import { IUserDoc } from '../user/user.interfaces';

const verifyCallback =
  (req: Request, resolve: any, reject: any, requiredRights: string[]) =>
  async (err: Error, user: IUserDoc, info: string) => {
    // console.log('req.params-----------------', req.params['userId']);
    console.log('user----------------------', user);

    if (err || info || !user) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
    req.user = user;

    if (requiredRights.length) {
      // get():- boolean indicating whether an element with the specified key exists or not.
      const userRights = roleRights.get(user.role);
      // console.log('userRights----------------', userRights); // [ 'getUsers', 'manageUsers', 'manageStaff', 'manageRole' ]

      if (!userRights) return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
      const hasRequiredRights = requiredRights.every((requiredRight: string) => userRights.includes(requiredRight));

      if (!hasRequiredRights && req.params['userId'] !== user.id) {
        return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
      }
    }
    resolve();
  };

const authMiddleware =
  (...requiredRights: string[]) =>
  async (req: Request, res: Response, next: NextFunction) =>
    new Promise<void>((resolve, reject) => {
      // console.log('req.body ---------------------', req.body);
      // console.log('requiredRights------------', typeof requiredRights);
      // console.log('requiredRights------------', requiredRights);

      // console.log('Incoming request headers:------------', req.headers);

      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
      // console.log('req.user---------------------', req.user);
    })
      .then(() => next())
      .catch((err) => next(err));

export default authMiddleware;

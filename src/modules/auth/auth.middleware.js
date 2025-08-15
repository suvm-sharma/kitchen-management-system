import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError.js';
import { roleRights } from '../../config/roles.js';

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  if (requiredRights.length) {
    // get():- boolean indicating whether an element with the specified key exists or not.
    const userRights = roleRights.get(user.role);

    if (!userRights) return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));

    if (!hasRequiredRights && req.params['userId'] !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }
  resolve();
};

const authMiddleware =
  (...requiredRights) =>
  async (req, res, next) =>
    new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));

export default authMiddleware;

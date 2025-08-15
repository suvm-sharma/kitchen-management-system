import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError.js';
import Role from '../role/role.model.js';

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, staff, info) => {
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

    const hasRequiredRights = requiredRights.every((requiredRight) => staffRights.includes(requiredRight));

    if (!hasRequiredRights && req.params['staffId'] !== staff.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }
  resolve();
};

// const authMiddleware =
// (...requiredRights) =>
// async (req, res, next) =>
//   ((resolve, reject) => {
//     passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
//   })
//     .then(() => next())
//     .catch((err) => next(err));

const authMiddleware =
  (
    ...requiredRights // ✅ restore higher-order function
  ) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

export default authMiddleware;

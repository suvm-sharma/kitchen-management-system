import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import tokenTypes from '../staffToken/staffToken.types.js';
import config from '../../config/config.js';
import Staff from '../staff/staff.model.js';

const staffJwtStrategy = new JwtStrategy(
  {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload, done) => {
    try {
      if (payload.type !== tokenTypes.ACCESS) {
        throw new Error('Invalid token type');
      }
      const staff = await Staff.findById(payload.sub);

      if (!staff) {
        return done(null, false);
      }
      done(null, staff);
    } catch (error) {
      done(error, false);
    }
  }
);

export default staffJwtStrategy;

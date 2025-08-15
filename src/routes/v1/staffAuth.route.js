import express from 'express';
import { validate } from '../../modules/validate/index.js';
import { staffAuthValidation, staffAuthController } from '../../modules/staffAuth/index.js';

const router = express.Router();

router.post('/register', validate(staffAuthValidation.register), staffAuthController.register);
router.post('/login', validate(staffAuthValidation.login), staffAuthController.login);
router.post('/change-password', validate(staffAuthValidation.changePassword), staffAuthController.changePassword);
router.post('/forgot-password', validate(staffAuthValidation.forgotPassword), staffAuthController.forgotPassword);
router.post('/reset-password', validate(staffAuthValidation.resetPassword), staffAuthController.resetPassword);

export default router;

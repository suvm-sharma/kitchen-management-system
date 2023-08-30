import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { staffController, staffValidation } from '../../modules/staff/index';
import { staffAuth } from '../../modules/staffAuth';

const router: Router = express.Router();

router.route('/profile-view').get(staffAuth('profile'), validate(staffValidation.profileView), staffController.profileView);
router
  .route('/profile-update')
  .post(staffAuth('profile'), validate(staffValidation.profileUpdate), staffController.profileUpdate);

router
  .route('/')
  .post(staffAuth('manageStaff'), validate(staffValidation.createStaff), staffController.createStaff)
  .get(staffAuth('getStaff'), validate(staffValidation.getStaff), staffController.getStaff);

router
  .route('/:staffId')
  .get(staffAuth('getStaff'), validate(staffValidation.getStaffById), staffController.getStaffById)
  .patch(staffAuth('manageStaff'), validate(staffValidation.updateStaff), staffController.updateStaff)
  .delete(staffAuth('manageStaff'), validate(staffValidation.deleteStaff), staffController.deleteStaff);

export default router;

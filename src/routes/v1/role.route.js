import express from 'express';
import { validate } from '../../modules/validate';
import { roleController, roleValidation } from '../../modules/role/index';
import { staffAuth } from '../../modules/staffAuth';

const router = express.Router();

router
  .route('/')
  .post(staffAuth('manageRole'), validate(roleValidation.createRoleBody), roleController.createRole)
  .get(staffAuth('getRole'), validate(roleValidation.getRole), roleController.getRole);

router
  .route('/:roleId')
  .get(staffAuth('getRole'), validate(roleValidation.getRoleById), roleController.getRoleById)
  .patch(staffAuth('manageRole'), validate(roleValidation.updateRole), roleController.updateRole)
  .delete(staffAuth('manageRole'), validate(roleValidation.deleteRole), roleController.deleteRole);

export default router;

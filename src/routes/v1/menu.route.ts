import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { menuController, menuValidation } from '../../modules/menu/index';
import { staffAuth } from '../../modules/staffAuth';

const router: Router = express.Router();

router
  .route('/')
  .post(staffAuth('manageMenu'), validate(menuValidation.createMenuBody), menuController.createMenu)
  .get(validate(menuValidation.getMenu), menuController.getMenu);

router
  .route('/:menuId')
  .get(staffAuth('getMenu'), validate(menuValidation.getMenuById), menuController.getMenuById)
  .patch(staffAuth('manageMenu'), validate(menuValidation.updateMenu), menuController.updateMenu)
  .delete(staffAuth('manageMenu'), validate(menuValidation.deleteMenu), menuController.deleteMenu);

export default router;

import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { menuCategoriesController, menuCategoriesValidation } from '../../modules/menuCategories/index';
import { staffAuth } from '../../modules/staffAuth';

const router: Router = express.Router();

router
  .route('/')
  .post(
    staffAuth('manageMenuCategories'),
    validate(menuCategoriesValidation.createMenuCategoriesBody),
    menuCategoriesController.createMenuCategories
  )
  .get(validate(menuCategoriesValidation.getMenuCategories), menuCategoriesController.getMenuCategories);

router
  .route('/:menuCategoriesId')
  .get(
    staffAuth('getMenuCategories'),
    validate(menuCategoriesValidation.getMenuCategoriesById),
    menuCategoriesController.getMenuCategoriesById
  )
  .patch(
    staffAuth('manageMenuCategories'),
    validate(menuCategoriesValidation.updateMenuCategories),
    menuCategoriesController.updateMenuCategories
  )
  .delete(
    staffAuth('manageMenuCategories'),
    validate(menuCategoriesValidation.deleteMenuCategories),
    menuCategoriesController.deleteMenuCategories
  );

export default router;

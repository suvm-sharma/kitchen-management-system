import express from 'express';
import { validate } from '../../modules/validate/index.js';
import { menuCategoriesController, menuCategoriesValidation } from '../../modules/menuCategories/index.js';
import { staffAuth } from '../../modules/staffAuth/index.js';

const router = express.Router();

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

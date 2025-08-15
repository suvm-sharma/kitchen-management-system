import express from 'express';
import { validate } from '../../modules/validate/index.js';
import { menuIngredientsController, menuIngredientsValidation } from '../../modules/menuIngredients/index.js';
import { staffAuth } from '../../modules/staffAuth/index.js';

const router = express.Router();

router
  .route('/')
  .post(
    staffAuth('menuIngredients'),
    validate(menuIngredientsValidation.createMenuIngredientsBody),
    menuIngredientsController.createMenuIngredients
  )
  .get(
    staffAuth('getMenuIngredients'),
    validate(menuIngredientsValidation.getMenuIngredients),
    menuIngredientsController.getMenuIngredients
  );

router
  .route('/:menuIngredientsId')
  .get(
    staffAuth('getMenuIngredients'),
    validate(menuIngredientsValidation.getMenuIngredientsById),
    menuIngredientsController.getMenuIngredientsById
  )
  .patch(
    staffAuth('menuIngredients'),
    validate(menuIngredientsValidation.updateMenuIngredients),
    menuIngredientsController.updateMenuIngredients
  )
  .delete(
    staffAuth('menuIngredients'),
    validate(menuIngredientsValidation.deleteMenuIngredients),
    menuIngredientsController.deleteMenuIngredients
  );

export default router;

import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { restaurantController, restaurantValidation } from '../../modules/restaurant/index';
import { staffAuth } from '../../modules/staffAuth';

const router: Router = express.Router();

router
  .route('/')
  .post(
    staffAuth('manageRestaurant'),
    validate(restaurantValidation.creRestaurantBody),
    restaurantController.createRestaurant
  )
  .get(staffAuth('getRestaurant'), validate(restaurantValidation.getRestaurant), restaurantController.getRestaurant);

router
  .route('/:restaurantId')
  .get(staffAuth('getRestaurant'), validate(restaurantValidation.getRestaurantById), restaurantController.getRestaurantById)
  .patch(
    staffAuth('manageRestaurant'),
    validate(restaurantValidation.updateRestaurant),
    restaurantController.updateRestaurant
  )
  .delete(
    staffAuth('manageRestaurant'),
    validate(restaurantValidation.deleteRestaurant),
    restaurantController.deleteRestaurant
  );

export default router;

import express from 'express';
import multer from 'multer';
import { validate } from '../../modules/validate/index.js';
import { restaurantController, restaurantValidation } from '../../modules/restaurant/index.js';
import { staffAuth } from '../../modules/staffAuth/index.js';

const router = express.Router();

// File upload config
const upload = multer({ storage: multer.memoryStorage() });

router
  .route('/')
  .post(
    staffAuth('manageRestaurant'),
    upload.fields([
      { name: 'restaurantImage', maxCount: 1 },
      { name: 'logo', maxCount: 1 },
    ]),
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

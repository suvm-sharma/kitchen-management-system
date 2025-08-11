import Joi from 'joi';
import { objectId } from '../validate';

const createRestaurant = {
  name: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.number(),
  email: Joi.string(),
  hoursOfOperation: Joi.array().items(
    Joi.object({
      daysOfWork: Joi.string(),
      openingTime: Joi.string(),
      closingTime: Joi.string(),
    })
  ),
  location: Joi.array().items({
    latitude: Joi.string(),
    longitude: Joi.string(),
  }),
  // location: Joi.array().items(Joi.string()).required(),
  restaurantImage: Joi.string(),
  logo: Joi.string(),
};

export const creRestaurantBody = {
  body: Joi.object().keys(createRestaurant),
};

export const getRestaurant = {
  body: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getRestaurantById = {
  params: Joi.object().keys({
    restaurantId: Joi.string().custom(objectId),
  }),
};

export const updateRestaurant = {
  params: Joi.object().keys({
    restaurantId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.number(),
    email: Joi.string(),
    hoursOfOperation: Joi.array().items(
      Joi.object({
        daysOfWork: Joi.string(),
        openingTime: Joi.string(),
        closingTime: Joi.string(),
      })
    ),
    location: Joi.array().items(
      Joi.object({
        latitude: Joi.string(),
        longitude: Joi.string(),
      })
    ),
    restaurantImage: Joi.string(),
    logo: Joi.string(),
  }),
};

export const deleteRestaurant = {
  params: Joi.object().keys({
    restaurantId: Joi.string().custom(objectId),
  }),
};

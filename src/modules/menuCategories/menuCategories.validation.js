import Joi from 'joi';
import { objectId } from '../validate/index.js';

const createMenuCategories = {
  name: Joi.string().required(),
  description: Joi.string(),
  icon: Joi.string(),
  image: Joi.string(),
  type: Joi.array().items(Joi.string().valid('veg', 'NonVeg', 'Vegan')),
};

export const createMenuCategoriesBody = {
  body: Joi.object().keys(createMenuCategories),
};

export const getMenuCategories = {
  body: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getMenuCategoriesById = {
  params: Joi.object().keys({
    menuCategoriesId: Joi.string().custom(objectId),
  }),
};

export const updateMenuCategories = {
  params: Joi.object().keys({
    menuCategoriesId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    icon: Joi.string(),
    image: Joi.string(),
    type: Joi.array().items(Joi.string().valid('veg', 'NonVeg', 'Vegan')),
  }),
};

export const deleteMenuCategories = {
  params: Joi.object().keys({
    menuCategoriesId: Joi.string().custom(objectId),
  }),
};

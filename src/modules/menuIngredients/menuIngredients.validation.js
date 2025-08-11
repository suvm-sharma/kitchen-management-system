import Joi from 'joi';
import { objectId } from '../validate';

const createMenuIngredients = {
  name: Joi.string().required(),
  description: Joi.string(),
  unit: Joi.string(),
  image: Joi.string(),
  quantityInStock: Joi.string(),
  threshold: Joi.string(),
  supplier: Joi.object({
    name: Joi.string(),
    contactDetails: Joi.string(),
  }),
  cost: Joi.number(),
  lastOrderedDate: Joi.date(),
  shelfLife: Joi.string(),
  storageInstruction: Joi.string(),
  category: Joi.string(),
};

export const createMenuIngredientsBody = {
  body: Joi.object().keys(createMenuIngredients),
};

export const getMenuIngredients = {
  body: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getMenuIngredientsById = {
  params: Joi.object().keys({
    menuIngredientsId: Joi.string().custom(objectId),
  }),
};

export const updateMenuIngredients = {
  params: Joi.object().keys({
    menuIngredientsId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    unit: Joi.string(),
    image: Joi.string(),
    quantityInStock: Joi.string(),
    threshold: Joi.string(),
    supplier: Joi.object({
      name: Joi.string(),
      contactDetails: Joi.string(),
    }),
    cost: Joi.number(),
    lastOrderedDate: Joi.date(),
    shelfLife: Joi.string(),
    storageInstruction: Joi.string(),
    category: Joi.string(),
  }),
};

export const deleteMenuIngredients = {
  params: Joi.object().keys({
    menuIngredientsId: Joi.string().custom(objectId),
  }),
};

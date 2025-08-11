import Joi from 'joi';
import { objectId } from '../validate';

const createMenu = {
  restaurant: Joi.custom(objectId).required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string(),
  category: Joi.custom(objectId).required(),
  ingredient: Joi.array().items(
    Joi.object({
      ingredient: Joi.custom(objectId),
      quantity: Joi.string(),
    })
  ),
  tags: Joi.array().items(Joi.string()),
  availability: Joi.array().items(Joi.string()),
  prepTime: Joi.number(),
  nutritionInfo: {
    calories: Joi.string(),
    protein: Joi.string(),
    carbs: Joi.string(),
    fat: Joi.string(),
  },
  allergies: Joi.array().items(Joi.string()),
  options: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      description: Joi.string(),
      additionalPrice: Joi.string(),
    })
  ),
  variants: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
      })
    )
    .required(),
  addOn: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      description: Joi.string(),
      additionalPrice: Joi.number(),
    })
  ),
  offers: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      description: Joi.string(),
      validity: Joi.object({
        from: Joi.string(),
        to: Joi.string(),
      }),
      discountPercentage: Joi.string(),
      discountAmount: Joi.number(),
      applicableON: Joi.boolean(),
    })
  ),
  isAvailable: Joi.boolean(),
};

export const createMenuBody = {
  body: Joi.object().keys(createMenu),
};

export const getMenu = {
  body: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getMenuById = {
  params: Joi.object().keys({
    menuId: Joi.string().custom(objectId),
  }),
};

export const updateMenu = {
  params: Joi.object().keys({
    menuId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    restaurant: Joi.custom(objectId).required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string(),
    category: Joi.custom(objectId).required(),
    ingredient: Joi.array().items(
      Joi.object({
        ingredient: Joi.custom(objectId),
        quantity: Joi.string(),
      })
    ),
    tags: Joi.array().items(Joi.string()),
    availability: Joi.array().items(Joi.string()),
    prepTime: Joi.number(),
    nutritionInfo: {
      calories: Joi.string(),
      protein: Joi.string(),
      carbs: Joi.string(),
      fat: Joi.string(),
    },
    allergies: Joi.array().items(Joi.string()),
    options: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        description: Joi.string(),
        additionalPrice: Joi.string(),
      })
    ),
    variants: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          description: Joi.string().required(),
          price: Joi.number().required(),
        })
      )
      .required(),
    addOn: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        description: Joi.string(),
        additionalPrice: Joi.number(),
      })
    ),
    offers: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        description: Joi.string(),
        validity: Joi.object({
          from: Joi.string(),
          to: Joi.string(),
        }),
        discountPercentage: Joi.string(),
        discountAmount: Joi.number(),
        applicableON: Joi.boolean(),
      })
    ),
    isAvailable: Joi.boolean(),
  }),
};

export const deleteMenu = {
  params: Joi.object().keys({
    menuId: Joi.string().custom(objectId),
  }),
};

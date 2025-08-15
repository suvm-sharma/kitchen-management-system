import Restaurant from './restaurant.model.js';
import { ApiError } from '../errors/index.js';
import httpStatus from 'http-status';
import { uploadFileToAws } from '../utils/index.js';

export const createRestaurant = async (req) => {
  let restaurantImageUrl = null;
  let restaurantLogoUrl = null;

  // Upload restaurant image to S3
  if (req.files && Array.isArray(req.files.restaurantImage) && req.files.restaurantImage.length > 0) {
    const file = req.files.restaurantImage[0];
    const uploadResult = await uploadFileToAws({
      buffer: file.buffer,
      mimetype: file.mimetype,
    });
    restaurantImageUrl = uploadResult['url'];
  }

  // Upload logo to S3
  if (req.files && Array.isArray(req.files.logo) && req.files.logo.length > 0) {
    const file = req.files.logo[0];
    const uploadResult = await uploadFileToAws({
      buffer: file.buffer,
      mimetype: file.mimetype,
    });
    restaurantLogoUrl = uploadResult['url'];
  }

  return await Restaurant.create({
    ...req.body,
    restaurantImage: restaurantImageUrl,
    logo: restaurantLogoUrl,
  });
};

export const getRestaurant = async (filter, options) => {
  const restaurant = await Restaurant.paginate(filter, options);
  return restaurant;
};

export const getRestaurantById = async (RestaurantId) => {
  return await Restaurant.findById(RestaurantId);
};

export const updateRestaurant = async (RestaurantId, updateBody) => {
  const restaurant = await getRestaurantById(RestaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not Found');
  }
  Object.assign(restaurant, updateBody);
  await restaurant.save();
  return restaurant;
};

export const deleteRestaurant = async (RestaurantId) => {
  const restaurant = await getRestaurantById(RestaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not Found');
  }
  await restaurant.deleteOne();
  return restaurant;
};

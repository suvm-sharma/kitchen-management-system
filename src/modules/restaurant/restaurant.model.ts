import mongoose from 'mongoose';
import { IRestaurantDoc, IRestaurantModel } from './restaurant.interface';
import { toJSON } from '../toJSON';
import { paginate } from '../paginate';

const restaurantSchema = new mongoose.Schema<IRestaurantDoc, IRestaurantModel>({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: Number,
  email: String,
  hoursOfOperation: [
    {
      daysOfWork: String,
      openingTime: String,
      closingTime: String,
    },
  ],
  location: {
    longitude: String,
    latitude: String,
  },
  restaurantImage: String,
  logo: String,
});

restaurantSchema.plugin(toJSON);
restaurantSchema.plugin(paginate);

const Restaurant = mongoose.model<IRestaurantDoc, IRestaurantModel>('Restaurant', restaurantSchema);
export default Restaurant;

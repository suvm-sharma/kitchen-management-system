import mongoose from 'mongoose';
import { toJSON } from '../toJSON';
import { paginate } from '../paginate';

const restaurantSchema = new mongoose.Schema({
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

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;

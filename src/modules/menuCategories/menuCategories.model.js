import mongoose from 'mongoose';
import { toJSON } from '../toJSON/index.js';
import { paginate } from '../paginate/index.js';

const menuCategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
  },
  image: {
    type: String,
  },
  type: {
    type: [String],
    enum: ['veg', 'NonVeg', 'Vegan'],
  },
});

menuCategoriesSchema.plugin(toJSON);
menuCategoriesSchema.plugin(paginate);

const MenuCategories = mongoose.model('MenuCategories', menuCategoriesSchema);
export default MenuCategories;

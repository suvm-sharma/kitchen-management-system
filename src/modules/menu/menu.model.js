import mongoose from 'mongoose';
import { toJSON } from '../toJSON';
import { paginate } from '../paginate';

const menuSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuCategories',
    required: true,
  },
  ingredient: [
    {
      ingredient: {
        type: mongoose.Types.ObjectId,
        ref: 'MenuIngredients',
      },
      quantity: {
        type: String,
      },
    },
  ],
  tags: {
    type: [String],
  },
  availability: {
    type: [String],
  },
  prepTime: Number,
  nutritionInfo: {
    calories: String,
    protein: String,
    carbs: String,
    fat: String,
  },
  allergies: [String],
  options: [
    {
      name: {
        type: String,
      },
      description: {
        type: String,
      },
      additionalPrice: {
        type: String,
      },
    },
  ],
  variants: [
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  addOn: [
    {
      name: {
        type: String,
      },
      description: {
        type: String,
      },
      additionalPrice: {
        type: Number,
      },
    },
  ],
  offers: [
    {
      name: {
        type: String,
      },
      description: {
        type: String,
      },
      validity: {
        from: String,
        to: String,
      },
      discountPercentage: {
        type: String,
      },
      discountAmount: {
        type: Number,
      },
      applicableON: {
        type: Boolean,
      },
    },
  ],
  isAvailable: {
    type: Boolean,
  },
});

menuSchema.plugin(toJSON);
menuSchema.plugin(paginate);

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;

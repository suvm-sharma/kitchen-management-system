import mongoose from 'mongoose';
import { toJSON } from '../toJSON';
import { paginate } from '../paginate';

const menuIngredientsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  unit: String,
  image: String,
  quantityInStock: String,
  threshold: String,
  supplier: {
    name: String,
    contactDetails: String,
  },
  cost: Number,
  lastOrderedDate: Date,
  shelfLife: String,
  storageInstruction: String,
  category: String,
});

menuIngredientsSchema.plugin(toJSON);
menuIngredientsSchema.plugin(paginate);

const MenuIngredients = mongoose.model('MenuIngredients', menuIngredientsSchema);
export default MenuIngredients;

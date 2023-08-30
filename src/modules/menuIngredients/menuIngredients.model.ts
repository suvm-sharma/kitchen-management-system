import mongoose from 'mongoose';
import { IMenuIngredientsDoc, IMenuIngredientsModel } from './menuIngredients.interface';
import { toJSON } from '../toJSON';
import { paginate } from '../paginate';

const menuIngredientsSchema = new mongoose.Schema<IMenuIngredientsDoc, IMenuIngredientsModel>({
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

const MenuIngredients = mongoose.model<IMenuIngredientsDoc, IMenuIngredientsModel>('MenuIngredients', menuIngredientsSchema);
export default MenuIngredients;

// @ts-check

import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsColection = "products";
let productsSchema = new Schema({
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  thumnail: { type: String },
  code: { type: String },
  stock: { type: Number },
});

productsSchema.plugin(mongoosePaginate);

const ProductModel = model(productsColection, productsSchema);

export default ProductModel;

// @ts-check

import { model, Schema } from "mongoose";

const ProductModel = model(
  "products",
  new Schema({
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    thumnail: { type: String },
    code: { type: String },
    stock: { type: Number },
  })
);

export default ProductModel;

import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        min: 1,
        default: 1,
      },
    },
  ],
});

cartSchema.pre("findOne", function () {
  this.populate("products.product");
});

const CartModel = mongoose.model("Cart", cartSchema);

export default CartModel;

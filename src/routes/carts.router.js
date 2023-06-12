//@ts-check
import express from "express";
import CartManager from "../DAO/cartManager.js";

const routerCarts = express.Router();
const cartManager = new CartManager("./carts.json");

routerCarts.post("/", (req, res) => {
  try {
    const newCart = cartManager.createCart();
    res.status(200).send({ status: "success", data: newCart });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

routerCarts.get("/:cid", (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = cartManager.getCartById(cartId);

    if (!cart) {
      res.status(404).send({ status: "error", message: "Cart not found" });
    } else {
      res.status(200).send({ status: "success", data: cart.products });
    }
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

routerCarts.post("/:cid/product/:pid", (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    cartManager.addProductToCart(cartId, productId);

    res
      .status(200)
      .json({ status: "success", message: "Product added to cart" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default routerCarts;

import express from "express";
import { cartService } from "../services/cartService.js";

const routerCarts = express.Router();

routerCarts.post("/", async (req, res) => {
  try {
    const newCart = await cartService.createCart();
    res.status(200).send({ status: "success", data: newCart });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

routerCarts.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.getCartById(cid);

    if (!cart) {
      res.status(404).send({ status: "error", message: "Cart not found" });
    } else {
      res.status(200).send({ status: "success", data: cart.products });
    }
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

routerCarts.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    await cartService.addProductToCart(cid, { product: pid, quantity });

    res
      .status(200)
      .json({ status: "success", message: "Product added to cart" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

routerCarts.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    await cartService.removeProductFromCart(cid, pid);

    res
      .status(200)
      .json({ status: "success", message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

routerCarts.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    await cartService.updateCartProducts(cid, products);

    res.status(200).json({ status: "success", message: "Cart updated" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

routerCarts.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    await cartService.updateProductQuantity(cid, pid, quantity);

    res
      .status(200)
      .json({ status: "success", message: "Product quantity updated" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

routerCarts.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    await cartService.clearCart(cid);

    res.status(200).json({ status: "success", message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default routerCarts;

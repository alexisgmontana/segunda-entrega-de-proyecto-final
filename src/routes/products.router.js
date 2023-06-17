import express from "express";
import { productService } from "../services/products.service.js";

const routerProducts = express.Router();

routerProducts.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, query, sort } = req.query;
    const products = await productService.getAllProducts(
      limit,
      page,
      query,
      sort
    );
    return res.json({ products });
  } catch (error) {
    res.status(401).send(error);
  }
});

routerProducts.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productService.getProductById(pid);
    if (product) {
      res.status(200).send({ status: "success", data: product });
    } else {
      res.status(404).send({ status: "error", message: "Product not found" });
    }
  } catch (error) {
    res.status(401).send(error);
  }
});

routerProducts.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    await productService.createProduct(newProduct);
    res
      .status(200)
      .send({ status: "success", message: "Product added successfully" });
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
});

export default routerProducts;

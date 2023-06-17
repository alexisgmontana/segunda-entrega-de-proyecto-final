//@ts-check

import express from "express";
import { productService } from "../services/products.service.js";

const routerHtmlProducts = express.Router();

routerHtmlProducts.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, query, sort } = req.query;
    const products = await productService.getAllProducts(
      limit,
      page,
      query,
      sort
    );
    let prod = products.map((p) => {
      return {};
    });
    return res.render("products", { products });
  } catch (error) {
    res.status(401).send(error);
  }
});

export default routerHtmlProducts;

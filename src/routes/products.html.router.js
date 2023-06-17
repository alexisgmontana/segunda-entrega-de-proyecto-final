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
    let prod = products.docs.map((p) => {
      return {
        id: p._id,
        title: p.title,
        description: p.description,
        price: p.price,
        code: p.code,
        stock: p.stock,
      };
    });
    return res.render("products", { products, prod });
  } catch (error) {
    res.status(401).send(error);
  }
});

export default routerHtmlProducts;

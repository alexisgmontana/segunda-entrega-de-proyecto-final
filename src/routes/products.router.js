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

// routerProducts.get("/:id", (req, res) => {
//   try {
//     const productId = req.params.id;
//     const product = productManager.getProductById(productId);
//     if (product) {
//       res.status(200).send({ status: "success", data: product });
//     } else {
//       res.status(404).send({ status: "error", message: "Product not found" });
//     }
//   } catch (error) {
//     res.status(401).send(error);
//   }
// });

routerProducts.post("/", (req, res) => {
  try {
    const newProduct = req.body;
    productService.createProduct(newProduct);
    res
      .status(200)
      .send({ status: "success", message: "Product added successfully" });
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
});

// routerProducts.put("/:id", (req, res) => {
//   try {
//     const productId = req.params.id;
//     const fieldsToUpdate = req.body;
//     productManager.updateProduct(productId, fieldsToUpdate);
//     res
//       .status(200)
//       .send({ status: "success", message: "Product updated successfully" });
//   } catch (error) {
//     res.status(400).send({ status: "error", message: error.message });
//   }
// });

// routerProducts.delete("/:id", (req, res) => {
//   try {
//     const productId = req.params.id;
//     productManager.deleteProduct(productId);
//     res
//       .status(200)
//       .send({ status: "success", message: "Product deleted successfully" });
//   } catch (error) {
//     res.status(400).send({ status: "error", message: error.message });
//   }
// });

export default routerProducts;

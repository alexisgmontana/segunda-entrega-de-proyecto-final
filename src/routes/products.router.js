//@ts-check
import express from "express";
import { productService } from "../services/products.service.js";

// import ProductManager from "../DAO/productManager";

const routerProducts = express.Router();
// const productManager = new ProductManager("./products.json");

routerProducts.get("/", async (req, res) => {
  try {
    const totalProducts = await productService.getAllProducts();
    return res.status(200).send({ status: "succes", data: totalProducts });
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

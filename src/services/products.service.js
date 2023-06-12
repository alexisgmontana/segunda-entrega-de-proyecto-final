//@ts-check
import ProductModel from "../DAO/models/porducts.model.js";

class ProductService {
  async getAllProducts() {
    const products = await ProductModel.find().exec();
    return products;
  }

  async createProduct(product) {
    const productCreated = await ProductModel.create(product);
    return productCreated;
  }
}

export const productService = new ProductService();

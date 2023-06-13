import ProductModel from "../DAO/models/porducts.model.js";

class ProductService {
  async getAllProducts(limit, page) {
    const products = await ProductModel.paginate(
      {},
      { limit: limit, page: page }
    );
    return products;
  }

  async createProduct(product) {
    const productCreated = await ProductModel.create(product);
    return productCreated;
  }
}

export const productService = new ProductService();

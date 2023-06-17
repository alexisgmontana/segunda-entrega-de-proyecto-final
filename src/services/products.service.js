import ProductModel from "../DAO/models/porducts.model.js";

class ProductService {
  async getAllProducts(limit, page, query, sort) {
    const sortOption = sort == "asc" ? { price: 1 } : { price: -1 };
    const filter = query ? { title: query } : {};
    const products = await ProductModel.paginate(filter, {
      limit: limit,
      page: page,
      sort: sortOption,
    });
    return products;
  }

  async getProductById(pid) {
    const productId = await ProductModel.findById(pid);
    return productId;
  }

  async createProduct(product) {
    const productCreated = await ProductModel.create(product);
    return productCreated;
  }
}

export const productService = new ProductService();

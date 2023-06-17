import CartModel from "../DAO/models/carts.model";

class CartService {
  async createCart() {
    const newCart = await CartModel.create({ products: [] });
    return newCart;
  }

  async getCartById(cartId) {
    const cart = await CartModel.findById(cartId).populate("products.product");
    return cart;
  }

  async addProductToCart(cartId, { product, quantity }) {
    const cart = await CartModel.findById(cartId);
    cart.products.push({ product, quantity });
    await cart.save();
  }

  async removeProductFromCart(cartId, productId) {
    const cart = await CartModel.findById(cartId);
    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();
  }

  async updateCartProducts(cartId, products) {
    const cart = await CartModel.findById(cartId);
    cart.products = products;
    await cart.save();
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await CartModel.findById(cartId);
    const product = cart.products.find(
      (item) => item.product.toString() === productId
    );
    if (product) {
      product.quantity = quantity;
      await cart.save();
    }
  }

  async clearCart(cartId) {
    const cart = await CartModel.findById(cartId);
    cart.products = [];
    await cart.save();
  }
}

export const cartService = new CartService();

import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];

    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, "[]");
    }
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      const carts = JSON.parse(data);
      if (!Array.isArray(carts)) {
        throw new Error("El archivo no contiene una matriz de carritos");
      }
      this.carts = carts;
    } catch (err) {
      throw new Error(`Error al leer ${this.path}: ${err.message}`);
    }
  }

  createCart() {
    const newCart = {
      id: this.generateCartId(),
      products: [],
    };

    this.carts.push(newCart);
    this.saveCarts();

    return newCart;
  }

  getCartById(cartId) {
    return this.carts.find((cart) => cart.id == cartId);
  }

  addProductToCart(cartId, productId, quantity = 1) {
    const cart = this.getCartById(cartId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    const existingProduct = cart.products.find((p) => p.product == productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    this.saveCarts();
  }

  generateCartId() {
    const cId =
      this.carts.length > 0 ? Math.max(...this.carts.map((p) => p.id)) + 1 : 1;
    return cId;
  }

  saveCarts() {
    fs.writeFileSync(this.path, JSON.stringify(this.carts));
  }
}

export default CartManager;

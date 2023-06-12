import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];

    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, "[]");
    }
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      const products = JSON.parse(data);
      if (!Array.isArray(products)) {
        throw new Error("El archivo no contiene una matriz de productos");
      }
      this.products = products;
    } catch (err) {
      throw new Error(`Error al leer ${this.path}: ${err.message}`);
    }
  }

  addProduct(product) {
    if (!product.title) {
      throw new Error("Error, titulo necesario");
    }
    if (!product.description) {
      throw new Error("Error, descripción necesaria");
    }
    if (!product.price) {
      throw new Error("Error, precio necesario");
    }
    if (!product.thumnail) {
      throw new Error("Error, ruta de imágen necesaria");
    }
    if (!product.code) {
      throw new Error("Error, código necesario");
    }
    if (!product.stock) {
      throw new Error("Error, stock necesario");
    }
    const codeValidation = this.products.some((p) => p.code == product.code);
    if (codeValidation) {
      throw new Error("Error, código repetido");
    } else {
      const id =
        this.products.length > 0
          ? Math.max(...this.products.map((p) => p.id)) + 1
          : 1;
      this.products.push({ ...product, id });
      console.log(this.products);
      fs.writeFileSync(this.path, JSON.stringify(this.products));
      return console.log("success");
    }
  }

  updateProduct(id, fields) {
    const index = this.products.findIndex((p) => p.id == id);
    if (index != -1) {
      this.products[index] = { ...this.products[index], ...fields };
      fs.writeFileSync(this.path, JSON.stringify(this.products));
      console.log("success");
    } else {
      console.log("id not defined");
    }
  }

  getProducts() {
    return JSON.parse(fs.readFileSync(this.path, "utf-8"));
  }

  getProductById(id) {
    return this.products.find((p) => p.id == id);
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex((p) => p.id == id);
    if (productIndex != -1) {
      this.products.splice(productIndex, 1);
      fs.writeFileSync(this.path, JSON.stringify(this.products));
    } else {
      console.log("id not defined");
    }
  }
}

export default ProductManager;

// const productManager = new ProductManager("../products.json");

// const product1 = {
//   title: "Remera Nike",
//   description: "Azul, talle L, mangas cortas",
//   price: 8000,
//   thumnail: "../toImage",
//   code: "BAC323",
//   stock: 7,
// };
// const product2 = {
//   title: "Remera Adidas",
//   description: "Roja, talle L, mangas cortas",
//   price: 7000,
//   thumnail: "../toImage",
//   code: "BDC125",
//   stock: 10,
// };
// const product3 = {
//   title: "Buso Nike",
//   description: "Negro, talle L",
//   price: 12000,
//   thumnail: "../toImage",
//   code: "ABA126",
//   stock: 2,
// };
// const product4 = {
//   title: "Remera Puma",
//   description: "Azul, talle L, mangas cortas",
//   price: 6000,
//   thumnail: "../toImage",
//   code: "FSC127",
//   stock: 3,
// };
// const product5 = {
//   title: "Campera Kappa",
//   description: "Blanca, talle L",
//   price: 16000,
//   thumnail: "../toImage",
//   code: "YRM558",
//   stock: 4,
// };

// const productsManager = new ProductManager("../products.json");

// try {
//   productsManager.addProduct(product1);
//   productsManager.addProduct(product2);
//   productsManager.addProduct(product3);
//   productsManager.addProduct(product4);
//   productsManager.addProduct(product5);
// } catch (error) {
//   console.log(error);
// }

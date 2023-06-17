import express from "express";
import handlebars from "express-handlebars";
import routerHtmlProducts from "./routes/products.html.router.js";
import routerProducts from "./routes/products.router.js";
import { connectMongo, __dirname } from "./utils.js";
import path from "path";

const app = express();
const port = 8080;

//MIDDLEWARE
app.use(express.json());

//MOTOR HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));

//CONECT MONGO
connectMongo();

//RUTA PRODUCTOS
app.use("/api/products", routerProducts);

//RENDER PRODUCTOS
app.use("/products", routerHtmlProducts);

//RUTA NO ENCONTRADA
app.get("*", (req, res) => {
  return res.status(404).json({
    status: "Error",
    msg: "Page not found",
    data: {},
  });
});

//PAGINA NO ENCONTRADA
// app.use("*", (res, req) => {
//   return res.status(404).json({
//     status: "error",
//     msg: "Page not found",
//     data: {},
//   });
// });

// app.get("/", (req, res) => {
//   let testUser = {
//     age: 50,
//     lastName: "Martinez",
//   };
//   res.render("index", testUser);
// });

app.listen(port, () => console.log(`Server listening on port ${port}`));

//@ts-check

import express from "express";
import handlebars from "express-handlebars";
import routerProducts from "./routes/products.router.js";
import { connectMongo, __dirname } from "./utils/utils.js";

const app = express();
const port = 8080;

//MIDDLEWARE
app.use(express.json());

//MOTOR HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

//CONECT MONGO
connectMongo();

//RUTA PRODUCTOS
app.use("/products", routerProducts);

// app.get("/", (req, res) => {
//   let testUser = {
//     age: 50,
//     lastName: "Martinez",
//   };
//   res.render("index", testUser);
// });

app.listen(port, () => console.log(`Server listening on port ${port}`));

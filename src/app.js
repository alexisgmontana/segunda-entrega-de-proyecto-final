//@ts-check

import express from 'express';
import handlebars from 'express-handlebars';
import routerHtmlProducts from './routes/products.html.router.js';
import routerProducts from './routes/products.router.js';
import { connectMongo, __dirname } from './utils.js';
import path from 'path';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import loginRouter from './routes/login.router.js';
import viewsRouter from './routes/views.routers.js';
import passport from 'passport';
import { iniPassport } from './config/passport.js';
import process from 'process';

const app = express();
const port = 8080;

console.log(process.argv[3]);

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//IMPLEMENTACION SESSION
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://alexisgmontana:Cobikpo10@cluster0.nbgemzy.mongodb.net/',
      ttl: 3600 * 24 * 7,
    }),
    secret: 'secretsession',
    resave: true,
    saveUninitialized: true,
  })
);

// PASSPORT
iniPassport();

app.use(passport.initialize());
app.use(passport.session());

//MOTOR HANDLEBARS
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

//CONECT MONGO
connectMongo();

//RUTA PRODUCTOS
app.use('/api/products', routerProducts);

//RENDER PRODUCTOS
app.use('/products', routerHtmlProducts);

//RUTA LOGIN
app.use('/api/session', loginRouter);

//VIEWSROUTER
app.use('/', viewsRouter);

//RUTA NO ENCONTRADA
app.get('*', (req, res) => {
  return res.status(404).json({
    status: 'Error',
    msg: 'Page not found',
    data: {},
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

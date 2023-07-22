import express from 'express';

const viewsRouter = express.Router();

viewsRouter.get('/', (req, res) => {
  res.render('index');
});

viewsRouter.get('/register', (req, res) => {
  res.render('register-form');
});

viewsRouter.get('/login', (req, res) => {
  res.render('login-form');
});

viewsRouter.get('/profile', (req, res) => {
  res.render('profile');
});

export default viewsRouter;

import express from 'express';
import passport from 'passport';

const loginRouter = express.Router();

// Register
loginRouter.post('/register', passport.authenticate('register'), (req, res) => {
  if (!req.user) {
    return res.json({ msg: 'error' });
  }
  const user = req.user;
  req.session.firstName = user.firstName;
  req.session._id = user._id.toString();
  req.session.email = user.email;
  req.session.rol = user.rol;
  return res.redirect('/api/session/current');
});

// Login
loginRouter.post('/login', passport.authenticate('login'), async (req, res) => {
  if (!req.user) {
    return res.redirect('/error-page');
  }
  const user = req.user;
  req.session.firstName = user.firstName;
  req.session._id = user._id.toString();
  req.session.email = user.email;
  req.session.rol = user.rol;
  return res.redirect('/api/session/current');
});

// Current
loginRouter.get('/current', async (req, res) => {
  res.render('current', { name: req.session.firstName });
});

// Logout
loginRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/login');
  });
});

export default loginRouter;

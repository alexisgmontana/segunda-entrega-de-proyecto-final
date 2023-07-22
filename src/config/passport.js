import passport from 'passport';
import local from 'passport-local';
import { UserModel } from '../DAO/models/user.model.js';
import { createHash, isValidPassword } from '../utils.js';

// Configurar la estrategia de autenticación local
const LocalStrategy = local.Strategy; // Corrección aquí

export const iniPassport = () => {
  passport.use(
    'login',
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
          console.log('Usuario no encontrado con email ' + email);
          return done(null, false);
        }
        if (!isValidPassword(password, user.password)) {
          console.log('Contraseña incorrecta');
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        console.log(err);
        return done(err);
      }
    })
  );

  passport.use(
    'register',
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email',
      },
      async (req, email, password, done) => {
        try {
          const { firstName, lastName, age } = req.body;
          const user = await UserModel.findOne({ email: email });
          if (user) {
            console.log('Usuario existente');
            return done(null, false);
          }

          const userCreated = await UserModel.create({ email, firstName, password: createHash(password), lastName, age, rol: 'user' });
          console.log(userCreated);
          console.log('Usuario registrado con éxito');
          return done(null, userCreated);
        } catch (err) {
          console.log(err);
          return done(err);
        }
      }
    )
  );

  // Serializar y deserializar al usuario para la sesión
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

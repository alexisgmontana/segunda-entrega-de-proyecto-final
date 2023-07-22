//DIRNAME
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export { __dirname };

//MONGOOSE
import { connect } from 'mongoose';
export async function connectMongo() {
  try {
    await connect('mongodb+srv://alexisgmontana:Cobikpo10@cluster0.nbgemzy.mongodb.net/');
    console.log('plug to mongo!');
  } catch (e) {
    console.log(e);
    throw 'can not connect to the db';
  }
}

//BCRYPT
import bcrypt from 'bcrypt';
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);

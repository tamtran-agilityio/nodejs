import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  port: process.env.PORT,
  database: process.env.DATABASE,
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  storage: process.env.STORAGE,
  dialect: process.env.DIALECT,
  jwtSecret: process.env.JWT_SECRET,
  jwtSession: {
    session: false
  }
};


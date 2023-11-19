require('dotenv').config();
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Database connection estabalished!', process.env.DB_URL);
    next();
  } catch (e) {
    console.log('Database connection failed!', e);
  }
};

require('dotenv').config();
const ConfigActionType = require('../models/configActionType');
const mongoose = require('mongoose');

const configActionTypes = [
  new ConfigActionType({
    value: 'CHANGE_TO_DUPLICATE_STATUS',
    name: "Change To 'Duplicate' Status",
  }),
  new ConfigActionType({
    value: 'MOVE_TO_DUPLICATE_GROUP',
    name: "Move To 'Duplicate' Group",
  }),
];

//connect mongoose
mongoose
  .connect(String(process.env.DB_URL), { useNewUrlParser: true })
  .catch((err) => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log('connected to db ', process.env.DB_URL);
  });

//save
configActionTypes.map(async (duAcTy, index) => {
  await duAcTy.save();
  if (index === configActionTypes.length - 1) {
    console.log('Seeding completed!');
    mongoose.disconnect();
  }
});

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const configActionTypeSchema = new Schema({
  value: String,
  name: String,
});

module.exports = mongoose.model('ConfigActionType', configActionTypeSchema);

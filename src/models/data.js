const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  userId: String,
  boardId: String,
  itemId: String,
  columnId: String,
  itemColumnValues:String
});

module.exports = mongoose.model('Data', dataSchema);

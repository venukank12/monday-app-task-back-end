const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const configurationSchema = new Schema({
  userId: String,
  boardId: String,
  configType: String,
  configField: String,
  configActionType: { type: Schema.ObjectId, ref: 'ConfigActionType' },
});

module.exports = mongoose.model('Configuration', configurationSchema);

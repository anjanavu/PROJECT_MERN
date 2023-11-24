// batchModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const batchSchema = new Schema({
  batchName: {
    type: String,
    required: true
  },
  exitTestDate: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    required: true
  }
  // Add other batch fields as needed
});

const batches = mongoose.model('batches', batchSchema);

module.exports = batches;

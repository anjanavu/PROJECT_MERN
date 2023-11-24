// studentModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  exitTestConfirmation: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  batchId: {
    type: Schema.Types.ObjectId,
    ref: 'batches',
    required: true
  }
  // Add other student fields as needed
});

const Student = mongoose.model('students', studentSchema);

module.exports = Student;

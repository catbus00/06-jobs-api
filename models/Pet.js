const mongoose = require('mongoose');
const PetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the name of your pet'],
      maxlength: 50,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'unknown'],
      default: 'unknown',
    },
    color: {
      type: String,
      required: [true, 'Please provide the color of your pet'],
      maxlength: 100,
    },
    age: {
      type: Number,
      required: [true, 'Please provide the age of your pet'],
      max: 99,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pet', PetSchema);

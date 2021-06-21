const { Schema, model } = require("mongoose");

const resultsSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  patronymic: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  frankness: {
    type: Number,
    required: true,
  },
  unbalanced: {
    type: Number,
    required: true,
  },
});

module.exports = model("results", resultsSchema);

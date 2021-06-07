const { Schema, model } = require("mongoose");

const resultsSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
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

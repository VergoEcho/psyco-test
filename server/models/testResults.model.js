const { Schema, model } = require("mongoose");

const resultsSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  invitationLink: {
    type: String,
    required: true,
  },
  passed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  surname: {
    type: String,
  },
  name: {
    type: String,
  },
  patronymic: {
    type: String,
  },
  birthday: {
    type: String,
  },
  phone: {
    type: String,
  },
  group: {
    type: String,
  },
  frankness: {
    type: Number,
  },
  unbalanced: {
    type: Number,
  },
});

module.exports = model("results", resultsSchema);

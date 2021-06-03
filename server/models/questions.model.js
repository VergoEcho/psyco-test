const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
  index: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  answer: {
    type: Boolean,
    required: true,
  },
});

module.exports = model("questions", questionSchema);

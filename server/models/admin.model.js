const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

module.exports = model("admins", adminSchema);

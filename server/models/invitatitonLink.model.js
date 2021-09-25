const { Schema, model } = require("mongoose");

const invitationLinkSchema = new Schema({
  link: {
    type: String,
    required: true,
  },
});

module.exports = model("invitationLinks", invitationLinkSchema);

const { Schema, model } = require("mongoose");

const invitationLinkSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // createdAt: { type: Date, expires: "2m", default: Date.now },
  link: {
    type: String,
    required: true,
  },
});

// invitationLinkSchema.createIndex(
//   { createdAt: 1 },
//   { expireAfterSeconds: 3600 }
// );

module.exports = model("invitationLinks", invitationLinkSchema);

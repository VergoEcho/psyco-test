const { Strategy, ExtractJwt } = require("passport-jwt");
const Admin = require("../models/admin.model");
const keys = require("../keys");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwtKey,
};

module.exports = new Strategy(options, async (payload, done) => {
  try {
    console.log("payload", payload);
    const candidate = await Admin.findById(payload.userId).select("id");

    if (candidate) {
      done(null, candidate);
    } else {
      done(null, false);
    }
  } catch (e) {
    console.error(e);
  }
});

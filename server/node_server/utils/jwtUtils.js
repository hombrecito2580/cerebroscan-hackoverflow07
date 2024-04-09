const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const RTSecret = process.env.RTS || "78887";
const ATSecret = process.env.ATS || "78889";
const MobSecret = process.env.MTS || "8777";
module.exports = {
  verifyJWT: async (token, type) => {
    try {
      var publicKey;
      if (type == 1) {
        publicKey = RTSecret;
      } else if (type == 0) {
        publicKey = ATSecret;
      } else {
        publicKey = MobSecret;
      }

      const decoded = await jwt.verify(token, publicKey);
      return { payload: decoded, expired: false };
    } catch (error) {
      return { payload: null, expired: true };
    }
  },
  signJWT: async function (userId, type) {
    try {
      var expiry, secret;
      if (type == 1) {
        expiry = "1d";
        secret = RTSecret;
      } else if (type == 0) {
        expiry = "2d";
        secret = ATSecret;
      } else {
        expiry = "3d";
        secret = MobSecret;
      }
      const payload = {
        _id: userId,
        login: Date.now(),
      };
      const options = {
        expiresIn: expiry,
      };
      const token = jwt.sign(payload, secret, options);
      return token;
    } catch (e) {
      return e;
    }
  },
};

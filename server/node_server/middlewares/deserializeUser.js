const { verifyJWT, signJWT } = require("../utils/jwtUtils");
const userSchema = require("../models/users.js");
const createError = require("http-errors");
module.exports = {
  deserializeUser: async (req, res, next) => {
    try {
      if (req.query.source == "mobile") {
        //deserialize user for mobile
        console.log("mobile device hit");
        const { token } = req.body;
        console.log(token)
        if(!token) return next(createError.Unauthorized("please login"))
        const tokenData = await verifyJWT(token, 2);
        console.log(tokenData)
        const userData = await userSchema.findById({ _id: tokenData.payload._id });
        req.user = userData;
        return next();
      } else {
        //deserialize user for browser
        console.log("not mobile");
        const { accessToken, refreshToken } = req.cookies;
        const { payload, expired } = await verifyJWT(accessToken, 0);
        if (payload && !expired) {
          console.log(payload);
          const userData = await userSchema.findById({ _id: payload._id });
          req.user = userData;
          return next();
        }
        if (expired && !refreshToken)
          return next(createError.Unauthorized("Please Login!!"));
        const refreshTokenData = await verifyJWT(refreshToken, 1);
        const newAccesToken = await signJWT(refreshTokenData.payload._id, 0);
        res.cookie("accessToken", newAccesToken, {
          expires: new Date(Date.now() + 10 * 1000 * 60), //1 mins
          httpOnly: false,
          // secure : true
        });
        const user = await userSchema.findById({
          _id: refreshTokenData.payload._id,
        });
        req.user = user;
        return next();
      }
    } catch (e) {
      next(e);
    }
  },
};

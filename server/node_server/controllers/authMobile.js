const { schema } = require("../utils/schema.js");
const userSchema  = require("../models/users.js");
const createError = require("http-errors");
const {signJWT } = require("../utils/jwtUtils.js");
const bcrypt = require("bcrypt")

module.exports = {
  signup: async (req, res, next) => {
    try {
      console.log("hit mobile")
      const { username, password } = req.body;
      console.log(username , password)
      // const isJoiValid = await schema.validateAsync({ username, password });

      const doesExist = await userSchema.findOne({ username: username });
      if (doesExist) {
        return next(
          createError.Conflict("User with same username already exists !!")
        );
      }
      const user = new userSchema({ username, password });
      const userData = await user.save();

      const token = await signJWT(userData._id , 2);
      res.send({token : token , userData : userData});
    } catch (e) {
      next(e);
    }
  },
  login : async(req , res , next) => {
    try{
        const {username , password} = req.body;
        const userData = await userSchema.findOne({username : username});
        if(!userData){
            return createError.Unauthorized("No such User Exists !!");
        }
        const isCorr = await bcrypt.compare(password, userData.password);
        if (!isCorr) throw createError.BadRequest("Wrong username or password !!");

        const token = await signJWT(userData._id , 2);
        res.send({userData : userData , token : token});
    }
    catch(e){
        next(e);
    }
  }
};

const { schema } = require("../utils/schema.js");
const userSchema  = require("../models/users.js");
const createError = require("http-errors");
const {signJWT } = require("../utils/jwtUtils.js");
const bcrypt = require("bcrypt")
module.exports = {
  Register : async (req, res, next) => {
    try {
      const { username, password } = req.body;
      // const isJoiValid = await schema.validateAsync({ username, password });
  
      const doesExist = await userSchema.findOne({ username : username});
      if (doesExist) return next(createError.Conflict("User with same username already exists !!"))
  
      const user = new userSchema({ username, password });
      const userData = await user.save();
  
      const AT = await signJWT(userData._id , 0);
      const RT = await signJWT(userData._id , 1);
      
      res.cookie("accessToken", AT, {
        expires: new Date(Date.now() + 24 * 60 * 1000 * 60),//10 mins
        httpOnly: false
        // secure : true
      });
      res.cookie("refreshToken", RT, {
        expires: new Date(Date.now() + 24 * 60 * 1000 * 60 * 3),//1 hour 
        httpOnly: false,
        // secure : true,
        
      });
      console.log("Access Token : " , AT)
      console.log("Refresh Token : " , RT)
      res.send({ user: userData });
    } catch (e) {
      if (e.isJoi) {
        e.message = "Pass or email wrong!!";
      }
      next(e);
    }
  },
  
  Login  :  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      // const isJoiValid = await schema.validateAsync({ username, password });
  
      const userData = await userSchema.findOne({ username });
      const isCorr = await bcrypt.compare(password, userData.password);
      if (!isCorr) throw createError.BadRequest("Wrong username or password !!");
      
      const AT = await signJWT(userData._id , 0);
      const RT = await signJWT(userData._id , 1);
      
      res.cookie("accessToken", AT, {
        expires: new Date(Date.now() + 24 * 60 * 1000 * 60),//10 mins
        httpOnly: false
      });
      res.cookie("refreshToken", RT, {
        expires: new Date(Date.now() + 3 * 24 * 60 * 1000 * 60),//1hour
        httpOnly: false,
      });
      res.send({ user: userData });
    } catch (e) {
      if (e.isJoi) {
        e.message = "Pass or email wrong!!";
      }
      next(e);
    }
  },
  Logout : (req ,res , next) => {
    try{
      res.cookie("refreshToken" , "lundlele")
      res.cookie("accessToken" , "lundlele")
      res.send({data : "Logged Out Successfully !!"});
    }
    catch(e){
      next(e);
    }
  },
  isUserLoggedIn : (req ,res , next) => {
    try{
      const {user} = req;
      if(user)return res.send({success : true , user : user});
      else res.send({success : false , user :  "No user Logged in !!"});
    }
    catch(e){
      next(e);
    }
  }

}

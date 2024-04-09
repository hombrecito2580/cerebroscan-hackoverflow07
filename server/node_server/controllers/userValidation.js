const userSchema = require("../models/users");
module.exports = {
    checkUsernameAvail :  async(req , res ,next) => {
        try{
            console.log(req.body.username);
            const data = await userSchema.findOne({username : req.body.username});
            const isAvail = (data) ? false : true;
            res.send({isAvail : isAvail});
        }
        catch(e){
            return next(e);
        }
    }
}
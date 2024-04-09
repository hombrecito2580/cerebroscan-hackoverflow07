const blogData = require("../json/blogs.json");

module.exports = {
    homePage : (req , res) => {
        console.log("Hit");
        if(req.user) return res.send({Hello : "Hello from Backend !!!" , user : req.user});
        else return res.send({Hello : "Hello from Backend !!!"})
    },
    blogs : (req , res , next) => {
        try{
            res.send({success : true , data : blogData})
        }
        catch(e){
            next(e);
        }
    }
}
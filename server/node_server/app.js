require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const exp = require("constants");
const upload = multer();
const app = express();
const axios = require("axios")
const cors = require("cors")
const mongoose = require("mongoose")
const auth = require("./routes/auth");
const cookieParser = require("cookie-parser");
const userValidation = require("./routes/userValidation");
const general = require("./routes/general")
const jsonData = require("./json/data.json")
const authMobile = require("./routes/authMobile");
const {deserializeUser} = require("./middlewares/deserializeUser");
const {password , user} = process.env;
const PORT  =process.env.port || 8000


main().catch(e => console.log(e)).then(() => console.log("Database connected !!!"));
async function main(){
  await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.juiwvco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
}

const corsOptions = {
  origin: 'http://localhost:3000',
  // origin: '*',
  credentials: true,
};

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended :true}))
app.use(cookieParser());

app.use("/api" ,auth );
app.use("/api" ,userValidation);
app.use("/api" , general)
app.use("/api" , authMobile)
app.post("/test" , upload.single('image') ,async(req ,res , next) => {
    try{
      console.log("Hitt hhua");
      console.log(req.file)
      //https://dermi-check-server-1-tc0o.onrender.com/uploadTest
        const {data} = await axios.post('https://dermi-check-server-1-tc0o.onrender.com/uploadTest' , {
            image : req.file.buffer
        } ,  {
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'multipart/form-data'
            }
          })
          console.log(data);
        console.log("launf")
        const responseObject = jsonData[data];
        const disease = data;
        res.send({diseaseInfo : {...responseObject , disease : data }})
    }
    catch(e){
        next(e);
    }
})

app.use((err ,req , res , next) => {
  console.log(err);
  res.send({error : err.message})
})




app.listen(PORT, () => {
  console.log("Listening !!");
});

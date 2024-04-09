const express = require("express");
const router = express.Router();
const {signup , login} = require("../controllers/authMobile");
const {deserializeUser} = require("../middlewares/deserializeUser");
const {wrapAsync} = require("../utils/asyncError.js")


router.post("/register-mobile" , signup);
router.post("/login-mobile" , login);


module.exports = router;
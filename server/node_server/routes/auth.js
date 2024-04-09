const express = require("express");
const router = express.Router();
const {Register , Login ,Logout , isUserLoggedIn} = require("../controllers/auth");
const {deserializeUser} = require("../middlewares/deserializeUser");
const {wrapAsync} = require("../utils/asyncError.js")


router.post('/register' , wrapAsync(Register))
router.post('/login' , wrapAsync(Login))
router.get('/logout', Logout)
router.get('/isLoggedIn' , deserializeUser , isUserLoggedIn )


module.exports = router;
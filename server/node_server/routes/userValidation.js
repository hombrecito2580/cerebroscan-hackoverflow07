const express = require("express");
const router = express.Router();
const {checkUsernameAvail} = require("../controllers/userValidation")

router.post("/checkUser" , checkUsernameAvail);

module.exports = router;
const express = require("express");
const router = express.Router();
const {homePage , blogs} = require("../controllers/general");
const { deserializeUser } = require("../middlewares/deserializeUser");

router.get("/home", deserializeUser , homePage);
router.get("/blogs" , blogs)

module.exports = router;
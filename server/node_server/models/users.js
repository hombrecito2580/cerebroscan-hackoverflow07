const { number } = require('joi');
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const jwt = require("jsonwebtoken");
const createError = require('http-errors');
const bcrypt = require("bcrypt")
const {Populate} = require("../utils/populate")

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String ,
        required : true
    }
})


userSchema.pre("save", async function (next) {
    try {
      if (this.isModified("password") || this.isNew) {
        console.log("Pass : ", this.password);
        const hashed = await bcrypt.hash(this.password, 10);
        console.log("hashed : ", hashed);
        this.password = hashed;
      }
      next();
    } catch (e) {
      next(e);
    }
  });

module.exports = mongoose.model("User" , userSchema);
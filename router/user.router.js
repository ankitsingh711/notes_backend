const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { UserModel } = require("../model/user.model");
const UserRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

UserRouter.post("/signup", async (req, res) => {
  const { username, email, role, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        console.log(err);
        res.send();
      } else {
        const data = new UserModel({ username, email, role, password: hash });
        await data.save();
        res.send("User Registered");
      }
    });
  } catch (error) {
    console.log(error);
    res.send("Error while registering");
  }
});

UserRouter.post("/login", async(req,res)=>{
  const {username,password} = req.body;
  const data = await UserModel.findOne({username});
  const UserId = data._id;
  console.log(UserId)
  try {
    const user = await UserModel.findOne({username});
    bcrypt.compare(password, user.password, (err, decoded)=>{
      if(user){
        jwt.sign({UserId}, process.env.key, (err,right)=>{
          if(err){
            console.log(err);
            res.send({"Invalid user":"Error while logging in"});
          }else{
            if(decoded){
              res.send({"LogIn Success":"LoggedIn", "Token":right});
            }
          }
        },{expiresIn:"1h"});
      }else{
        res.send("no User Found");
      }
    })
  } catch (error) {
    console.log(error);
    res.send({"Login Failed":"Something went wrong while login"});
  }
})

module.exports = { UserRouter };

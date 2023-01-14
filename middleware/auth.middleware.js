const express =  require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Auth = (req,res,next) => {
  const token = req.headers.authorization;
  try {
    if(token){
      jwt.verify(token, process.env.key, (err,decoded) => {
        if(err) {
          console.log(err);
          res.send({"Message":"Unauthorized User"});
        } else {
          const userId = decoded.UserId;
          req.body.userID = userId;
          next();
        }
      })
    }else{
      console.log("Unauthorized User");
      res.status(401).send("Unautorized User");
    }
  } catch (error) {
    console.log(error);
    res.send("Something Went Wrong");
  }
}

module.exports = { Auth };
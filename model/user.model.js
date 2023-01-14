const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {type:String, unique:true},
    email: String,
    role:String,
    password: String,
  },
  { versionKey: false }
);

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };

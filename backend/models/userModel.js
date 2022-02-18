const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim:true  
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  avatar: {
    public_id: String,
    image_url: String,
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  reserPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updated:Date
});

userSchema.pre("save", async function (next) {
  //console.log("done");
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  const isTrue = await bcrypt.compare(enteredPassword, this.password);
  return isTrue;
};

userSchema.methods.getResetPasswordToken = async function () {
  const resettoken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = await crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  return this.resetPasswordToken;
};

module.exports = mongoose.model("User", userSchema);

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorhandler");
const User = require("../models/userModel");


exports.isAuthorized = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler(401, "Please login to authorize this action"));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  User.findById(decodedData.id)
    .then((user) => {
       // console.log(user);
      req.user = user;  // assign a user property to user
      next();
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(401, err));
    });
 
};

exports.isAuthorizedRoles = (...roles) => {
    
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(
        new ErrorHandler(
          401,
          `${req.user.role} is not authorized to perform this action`
        )
      );
    }
    next();
  };
};

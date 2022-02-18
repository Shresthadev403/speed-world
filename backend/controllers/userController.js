const sendMail = require("../utils/sendemail");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const { sendToken, decodeToken } = require("../utils/jwttoken");
const cloudinary = require("cloudinary");
const path = require("path");

exports.createNewUser = async (req, res, next) => {
  const defaultAvatar = path.join(__dirname, "../static/avatar.png");
  const avatar = req.body.avatar || defaultAvatar;
  const { name, email, password } = req.body;
  // upload avatar imgage to cloudinary
  const mycloud = await cloudinary.v2.uploader.upload(avatar, {
    folder: "avatars",
    width: 150,
    height: 100,
    crop: "scale",
  });

  // create new user with given details
  User.create({
    name,
    email,
    password,
    avatar: {
      public_id: mycloud.public_id,
      image_url: mycloud.secure_url,
    },
  })
    .then((user) => {
      sendToken(user, 200, res);
      user.password = undefined; // exclude password in resposnse
      res.status(200).json({ sucess: true, user: user });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(400, err));
    });
};

exports.signIn = (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email, password);
  User.findOne({ email: email })
    .select("+password")
    .then((user) => {
      user.comparePassword(password).then((result) => {
        if (result) {
          sendToken(user, 200, res);
          user.password = undefined; // exclude password in resposnse
          res.status(200).json({ sucess: true, user: user });
        } else {
          return next(
            new ErrorHandler(401, "email and password doesnot match")
          );
        }
      });
    })
    .catch((err) => {
      return next(new ErrorHandler(400, "email doesnot exist"));
    });
};

exports.signOut = (req, res) => {
  console.log("odd");
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.status(200).json({
    sucess: true,
    message: "Logged out sucessfully",
  });
};

exports.forgetPassword = (req, res, next) => {
  const { email } = req.body;
  //console.log(email, "jjjjjjjjjjjjjj");
  User.findOne({ email: email })
    .then((user) => {
      // console.log(user,"mmmmmmmmmmmmm");
      if (!user) {
        return next(new ErrorHandler(400, "Email doesnot exist"));
      }
      user.getResetPasswordToken().then((token) => {
        sendMail(email, token);
        res.status(200).json({
          sucess: true,
          message: "Password reset link has been sent to your mail.",
        });
        user.save(() => {
          next();
        });
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(400, err));
    });
};

exports.resetPassword = (req, res, next) => {
  const { token } = req.params;
  const { newpassword, confirmpassword } = req.body;
  if (newpassword != confirmpassword) {
    return next(
      new ErrorHandler(400, "New password and confirm password doesnot match")
    );
  }
  User.findOne({ resetPasswordToken: token })
    .then((user) => {
      // console.log(user);
      if (!user) {
        return next(new ErrorHandler(401, "Invalid token"));
      }
      user.password = newpassword;
      user.resetPasswordToken = undefined;
      user.save(() => {
        return res
          .status(200)
          .json({ sucess: true, message: "password reset sucessful" });
      });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(400, err));
    });
};

exports.getMyProfile = (req, res, next) => {
  const { token } = req.cookies;
  // console.log(token);
  decodeToken(token)
    .then((decodedData) => {
      //  console.log(decodedData);
      User.findById(decodedData.id).then((user) => {
        if (user) {
          return res.status(200).json({ sucess: true, user: user });
        }

        return next(new ErrorHandler(400, "data not found"));
      });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(400, err));
    });
};

// admin
exports.getAllUser = (req, res, next) => {
  User.find()
    .then((users) => {
      if (users) {
        return res.status(200).json({ sucess: true, users: users });
      }
      return next(new ErrorHandler(404, "data not found"));
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(400, err));
    });
};

// admin
exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.status(200).json({ sucess: true, user: user });
      }
      return next(new ErrorHandler(404, "user not found"));
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(400, err));
    });
};

//admin delete user
exports.deleteUser = (req, res, next) => {
  User.findByIdAndDelete({ _id: req.params.id })
    .then((user) => {
      //  console.log(user);
      if (user) {
        return res
          .status(200)
          .json({ sucess: true, message: "user deleted sucessfully" });
      }
      return next(new ErrorHandler(404, "user not found"));
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(400, err));
    });
};

//admin update role
exports.updateRole = (req, res, next) => {
  User.findById(req.params.id).then((user) => {
    if (user) {
      if (user.role === "admin") {
        user.role = "user";
      } else {
        user.role = "admin";
      }
    }

    user.save(() => {
      return res
        .status(200)
        .json({ sucess: true, message: `role changed to ${user.role}` });
    });
  });
};

// update password
exports.updateUserPassword = (req, res, next) => {
  const { oldpassword, newpassword, confirmpassword } = req.body;
  const { token } = req.cookies;
  // console.log(newpassword, confirmpassword);
  if (newpassword != confirmpassword) {
    return next(
      new ErrorHandler(401, "new password and confirm password doesnot match")
    );
  }

  decodeToken(token).then((decodedData) => {
    User.findById(decodedData.id)
      .select("+password")
      .then((user) => {
        if (!user) {
          return next(new ErrorHandler(404, "data not found"));
        }
        user.comparePassword(oldpassword).then((result) => {
          console.log(result);
          if (result) {
            user.password = newpassword;
            user.save(() => {
              sendToken(user, 200, res);
              res.status(200).json({
                sucess: true,
                message: "passowrd changed sucessfully",
              });
            });
          } else {
            return next(new ErrorHandler(401, "Old password doesnot match"));
          }
        });
      })
      .catch((err) => {
        console.log(err);
        return next(new ErrorHandler(401, err));
      });
  });
};


// update user Details
exports.updateUserProfile = (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
  };
  User.findOneAndUpdate({ _id: req.params.id }, newData)
    .then((user) => {
      //  console.log(user);
      if (user) {
        return res
          .status(200)
          .json({ sucess: true, message: "profile updated sucessfully" });
      }
      return next(new ErrorHandler(404, "user not found"));
    })
    .then((err) => {
      console.log(err);
      return next(new ErrorHandler(400, err));
    });
};

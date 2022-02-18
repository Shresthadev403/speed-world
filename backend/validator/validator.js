const {  check, validationResult } = require("express-validator");
const ErrorHandler = require("../utils/errorhandler");

exports.emailValidator = [
  check("email").isEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorHandler(401, "invalid Email"));
    }
    next();
  },
];

exports.passwordValidator = [
  check("password")
  .optional({nullable:true})
    .not()
    .isEmpty()
    .isLength({ min: 5 })
    .withMessage("password must be 8 character long")
    .matches(/\d/)
    .withMessage("password must have atleast one numeric character")
    .matches(/.*[A-Z].*/)
    .withMessage("password must have atleast one upper case letter")
   ,
   check("newpassword")
   .optional({nullable:true})
     .not()
     .isEmpty()
     .isLength({ min: 5 })
     .withMessage("password must be 8 character long")
     .matches(/\d/)
     .withMessage("password must have atleast one numeric character")
     .matches(/.*[A-Z].*/)
     .withMessage("password must have atleast one upper case letter")
    ,
    check("confirmpassword")
   .optional({nullable:true})
     .not()
     .isEmpty()
     .isLength({ min: 5 })
     .withMessage("password must be 8 character long")
     .matches(/\d/)
     .withMessage("password must have atleast one numeric character")
     .matches(/.*[A-Z].*/)
     .withMessage("password must have atleast one upper case letter")
    ,
  (req, res, next) => {
    const errors = validationResult(req).array();
    if (errors.length) {
      const message = errors[0].msg;
      return next(new ErrorHandler(400, message));
    }
    next();
  },
];

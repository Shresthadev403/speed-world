"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(email,token) {
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: "shresthadev403@gmail.com",
        pass: "jrfrprrkzwqnwema"
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'shresthadev403@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Reset password", // Subject line
    text: "Click on the link to reset your password", // plain text body
    html:`<p>Please use the following link to reset your password:</p> <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>` // html body
  });


}

module.exports=sendMail;

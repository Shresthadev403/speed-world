const mongoose = require("mongoose");

const contactFormSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim:true
  },
});

module.exports = mongoose.model("ContactForm", contactFormSchema);

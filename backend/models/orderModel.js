const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  shippingInfo: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: "Nepal",
  },
  pinCode: {
    type: Number,
   
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
     
    },
    status: {
      type: String,
      
    },
  },
  paidDate: {
    type: Date
  },
  itemPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    default: "processing",
  },
  deliveredAt:{
      type:Date,
      
  },
  createdAt:{
      type:Date,
      default:Date.now
  },
  deleted:{
    type:Boolean,
    default:false
  },
  deletedAt:{
    type:Date,
      default:Date.now
  }

});

module.exports = mongoose.model("Order", orderSchema);

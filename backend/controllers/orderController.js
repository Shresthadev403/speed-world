const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");

// create new order
exports.createNewOrder = (req, res, next) => {
  const productId = req.query.productId;
  const { shippingInfo, city, state, pinCode, phoneNo, quantity } = req.body;

  //   console.log(productId);
  Product.findById(productId).then((product) => {
    if (!product) {
      return next(new ErrorHandler(404, "product not found"));
    }
    const {price}=product;
    const shippingPrice=0;
    const taxPrice=0;
    const orderItem = {
      name: product.name,
      quantity,
      image: product.images[0].image_url,
      product: productId,
    };
    const order = {
      shippingInfo,
      city,
      state,
      pinCode,
      phoneNo,
      orderItems: orderItem,
      user: req.user._id,
      taxPrice:taxPrice,
      shippingPrice:shippingPrice,
      itemPrice:price,
      totalPrice:price*quantity+((taxPrice/100)*price)*quantity+shippingPrice
      
    };

    Order.create(order)
      .then((order) => {
        return res.status(200).json({ sucess: true, order: order });
      })
      .catch((err) => {
        console.log(err);
        return next(new ErrorHandler(400), err);
      });
  });
};

// get all orders-- admin
exports.getAllOrders = (req, res, next) => {
  Order.find()
    .then((orders) => {
      if (!orders) {
        return next(new ErrorHandler(400, "order not found"));
      }
      return res.status(200).json({ sucess: true, orders: orders });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(400, err));
    });
};

// get deleted orders
exports.getDeletedOrders = (req, res, next) => {
  Order.find({deleted:true})
    .then((orders) => {
      if (!orders) {
        return next(new ErrorHandler(400, "order not found"));
      }
      return res.status(200).json({ sucess: true, orders: orders });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(400, err));
    });
};

exports.getDeliveredOrCancelledOrders = (req, res, next) => {
  Order.find({$and:[{$or:[{orderStatus:"delivered"},{ orderStatus:"cancelled"}]},{deleted:false}]})
    .then((orders) => {
      if (!orders) {
        return next(new ErrorHandler(400, "order not found"));
      }
      return res.status(200).json({ sucess: true, orders: orders });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(400, err));
    });
};

exports.getDeliveredOrders = (req, res, next) => {
  Order.find({orderStatus:"delivered"})
    .then((orders) => {
      if (!orders) {
        return next(new ErrorHandler(400, "order not found"));
      }
      return res.status(200).json({ sucess: true, orders: orders });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(400, err));
    });
};

exports.getProcessingOrders = (req, res, next) => {
  Order.find({orderStatus:"processing"})
    .then((orders) => {
      if (!orders) {
        return next(new ErrorHandler(400, "order not found"));
      }
      return res.status(200).json({ sucess: true, orders: orders });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(400, err));
    });
};

// ger single order
exports.getSingleOrder = (req, res, next) => {
  Order.findById(req.params.id)
    .then((order) => {
      if (!order) {
        return next(new ErrorHandler(400, "order not found"));
      }
      return res.status(200).json({ sucess: true, order: order });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(400, err));
    });
};

//get userOrders// my orders
exports.getUserAllOrders = (req, res, next) => {
  const user = req.user._id.valueOf();
  Order.find({ user: user })
    .then((orders) => {
      if (!orders) {
        return next(new ErrorHandler(400, "orders not found"));
      }
      return res.status(200).json({ sucess: true, orders: orders });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(400, err));
    });
};

// delete order
exports.deleteOrder = (req, res, next) => {
  Order.findByIdAndDelete(req.params.id)
    .then((order) => {
      if (!order) {
        return next(new ErrorHandler(404, "order not found"));
      } else if (order.orderStatus !== "processing") {
        return next(new ErrorHandler(400, "cannot delete delivered order"));
      }
      return res
        .status(200)
        .json({ sucess: true, message: "Order deleted sucessfully" });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(400, err));
    });
};

// update order status --admin
exports.updateOrderStatus = (req, res, next) => {
  Order.findById(req.params.id)
    .then((order) => {
      if (!order) {
        return next(new ErrorHandler(404, "order not found"));
      }
      if (order.orderStatus === "delivered") {
        return next(new ErrorHandler(400, "Object has already been delivered"));
      }
      // if (req.body.status === "shipped") {
      //   order.orderItems.forEach((obj) => {
      //     updateStock(obj.product, obj.quantity);
      //   });
      //   order.orderStatus = req.body.status;
      // }
      if (req.body.status === "cancelled") {
        order.orderStatus = req.body.status;
       
      }

      if (req.body.status === "delivered") {
        order.orderItems.forEach((obj) => {
          updateStock(obj.product, obj.quantity);
        });
        order.orderStatus = req.body.status;
        order.deliveredAt = Date.now();
      }
      order.save(() => {
        return res
          .status(200)
          .json({
            sucess: true,
            message: `order status changed to ${order.orderStatus}`,
          });
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(400, err));
    });
};

// update deleted status --admin
exports.updateDeletedStatus = (req, res, next) => {
  Order.findById(req.params.id)
    .then((order) => {
      if (!order) {
        return next(new ErrorHandler(404, "order not found"));
      }
      if (order.deleted ) {
        return next(new ErrorHandler(400, "Object has already been deleted"));
      }
      
      if (req.body.deleted) {
        
        order.deleted = req.body.deleted;
        order.deletedAt = Date.now();
      }
      order.save(() => {
        return res
          .status(200)
          .json({
            sucess: true,
            message: `deleted status changed to ${order.deleted}`,
          });
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(400, err));
    });
};

// update stock admin
async function updateStock(product_id, quantity) {
  Product.findById(product_id).then((product) => {
    product.stock -= quantity;
    product.save({ validateBeforeSave: false });
  });
}

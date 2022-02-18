const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorhandler");

const cloudinary = require("cloudinary");
const path = require("path");

// create a new product
exports.createNewProduct = async(req, res, next) => {
 
  const defaultProductImage = path.join(__dirname, "../static/product.png");
  const productImageUpload = req.body.images || defaultProductImage;
  

  // upload avatar imgage to cloudinary
  const mycloud = await cloudinary.v2.uploader.upload(productImageUpload, {
    folder: "products",
    width: 150,
    height: 100,
    crop: "scale",
  });
  
const productImage={
  public_id: mycloud.public_id,
  image_url: mycloud.secure_url,
}

// give user and image to req.body
req.body.images=productImage;
req.body.user = req.user.id;

  Product.create(req.body)
    .then((product) => {
      return res.status(200).json({ sucess: true, product: product });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(400, err));
    });
};

// get product info
exports.getProductDetails = (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (product) {
        return res.status(200).json({ sucess: true, product: product });
      }
      return next(new ErrorHandler(404, "product not found"));
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(404, err));
    });
};

// get all products in database
exports.getAllProducts = async (req, res, next) => {
  const resultPerPage = 5;
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  apiFeatures.query
    .then((products) => {
      return res.status(200).json({ sucess: true, products: products });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(404, err));
    });
};

// update product info
exports.updateProduct = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((product) => {
      if (product) {
        return res.status(200).json({ sucess: true, product: product });
      }
      return next(new ErrorHandler(404, "product not found"));
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(404, err));
    });
};

// delete product from database
exports.deleteProduct = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ sucess: true, message: "product deleted sucessfully" });
      }
      return next(new ErrorHandler(404, "product not found"));
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(404, err));
    });
};

// Review section

// create new review or update review
exports.makeReview = (req, res, next) => {
  const { productId } = req.body;
  let ratingAvg = 0;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(req.body.rating),
    comment: req.body.comment,
  };

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return next(new ErrorHandler(404, "product not found"));
      }
      product.reviews.forEach((obj) => {
        if (
          obj.user.valueOf().toString() === req.user._id.valueOf().toString()
        ) {
          product.reviews.pop(obj); // remove review if it already exist
        }
      });
      product.reviews.push(review); // push review to array
      // calculate rating after review
      product.reviews.forEach((obj) => {
        ratingAvg += obj.rating;
      });
      product.rating = (ratingAvg / product.reviews.length).toFixed(2);
      product.numOfReviews = product.reviews.length;
      product.save(() => {
        return res
          .status(200)
          .json({ sucess: true, message: "review made sucessfully" });
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(400, err));
    });
};

// delete review--admin
exports.deleteReview = (req, res, next) => {
  const { productId, reviewUserId } = req.body;
  let isDeleted = false;
  let ratingAvg = 0;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return next(new ErrorHandler(400, "product not found"));
      }
      product.reviews.forEach((obj) => {
        // console.log(obj.user, reviewUserId);
        if (obj.user.valueOf().toString() == reviewUserId.toString()) {
          product.reviews.pop(obj);
          isDeleted = true;
        }
      });
      if (isDeleted) {
        product.reviews.forEach((obj) => {
          ratingAvg += obj.rating;
        });
        product.rating = (ratingAvg / product.reviews.length).toFixed(2);
        product.numOfReviews = product.reviews.length;
        product.save(() => {
          return res
            .status(200)
            .json({ sucess: true, message: "review deleted sucessfully" });
        });
      } else {
        return next(new ErrorHandler(400, "review not found"));
      }
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(400, err));
    });
};

// admin get all review of a product
exports.getAllReviewsOfProduct = (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        return next(new ErrorHandler(400, "product not found"));
      }
      return res.status(200).json({ sucess: true, reviews: product.reviews });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(400, err));
    });
};

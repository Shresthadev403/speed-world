const express=require('express');
const {  createNewProduct, getProductDetails, getAllProducts, updateProduct, deleteProduct, makeReview, deleteReview, getAllReviewsOfProduct } = require('../controllers/productController');
const { isAuthorized, isAuthorizedRoles } = require('../middlewares/auth');

const router=express.Router();

router.post('/createnewproduct',isAuthorized,isAuthorizedRoles("admin"),createNewProduct);
router.get('/product/:id',getProductDetails);
router.get('/products',getAllProducts);
router.put('/product/update/:id',isAuthorized,isAuthorizedRoles("admin"),updateProduct);
router.delete('/product/delete/:id',isAuthorized,isAuthorizedRoles("admin"),deleteProduct);
router.put('/user/review',isAuthorized,makeReview);
router.put('/delete/review',isAuthorized,isAuthorizedRoles("admin"),deleteReview);
router.get('/reviews',isAuthorized,getAllReviewsOfProduct);

module.exports=router;
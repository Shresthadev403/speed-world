const express=require('express');

const { createNewUser, signOut, signIn, forgetPassword, resetPassword,  getUser, getAllUser, deleteUser, updateRole, updateUserProfile, updateUserPassword, getMyProfile ,makeReview, deleteReview, getAllReviewsOfProduct} = require("../controllers/userController");
const { isAuthorized, isAuthorizedRoles } = require('../middlewares/auth');
const { emailValidator, passwordValidator } = require('../validator/validator');

const router=express.Router();

router.post('/createnewuser',emailValidator,passwordValidator,createNewUser);
router.get('/signout',signOut);
router.post('/signin',emailValidator,signIn);
router.post('/forgetpassword',emailValidator,forgetPassword);
router.post('/resetpassword/:token',passwordValidator,resetPassword);
router.get('/myprofile',isAuthorized,getMyProfile);
router.get('/user/:id',isAuthorized,isAuthorizedRoles("admin"),getUser);
router.get('/users',isAuthorized,isAuthorizedRoles("admin"),getAllUser);
router.delete('/delete/user/:id',isAuthorized,isAuthorizedRoles("admin"),deleteUser);
router.put('/update/role/:id',isAuthorized,isAuthorizedRoles("admin"),updateRole);
router.put('/update/profile/:id',isAuthorized,updateUserProfile);
router.put('/update/password',passwordValidator,isAuthorized,updateUserPassword);


module.exports=router;
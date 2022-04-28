const express=require('express');
const { createNewContactForm, getAllContactForms, deleteContactForm } = require('../controllers/contactFormController');
const { isAuthorized, isAuthorizedRoles } = require("../middlewares/auth");

const router=express.Router()



router.post('/createnewcontactform',createNewContactForm);
router.get('/contactforms',isAuthorized,isAuthorizedRoles("admin"),getAllContactForms);
router.delete('/contactform/delete/:id',isAuthorized,isAuthorizedRoles("admin"),deleteContactForm);






module.exports=router;
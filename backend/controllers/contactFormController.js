const ContactForm = require("../models/contactFormModel");
const ErrorHandler = require("../utils/errorhandler");

//create new contact form
exports.createNewContactForm = (req, res, next) => {
  const { name, subject, email, phoneNo, description } = req.body;
  const formData = {
    name,
    subject,
    email,
    phoneNo,
    description,
  };
  //   console.log(formData);

  ContactForm.find({email:email}).then(contactForm=>{
      if(contactForm.length>0){
          console.log(contactForm[0]._id);
          ContactForm.findByIdAndUpdate(contactForm[0]._id,formData,{new:true}).then(updatedData=>{
            //   console.log(updatedData);
              if(updatedData){
                return res.status(200).json({sucess:true,message:"your previous form updated sucessfully"});
              }else{
                  return res.status(400).json({sucess:false,error:"request unsucessful"})
              }
          })
        
      }else{
        ContactForm.create(formData)
        .then((contactForm) => {
          //   console.log(contactFrom);
          return res.status(200).json({ sucess: true, contactForm: contactForm });
        })
        .catch((err) => {
          console.log(err);
          return next(new ErrorHandler(400), err);
        });
      }
  })
 
};

exports.getAllContactForms = (req, res, next) => {
  ContactForm.find()
    .then((contactForms) => {
      return res.status(200).json({ sucess: true, contactForms: contactForms });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(400), err);
    });
};

exports.deleteContactForm=(req,res,next)=>{
    const contactFormId=req.params.id;
    ContactForm.findByIdAndDelete(contactFormId).then(contactForm=>{
        if(contactForm){
            return res.status(200).json({sucess:true,message:"contact form deleted sucessfully"})
        }
     
        return next(new ErrorHandler(404, "contact form not found"));
    }).catch (err=>{
        console.log(err);
        return next(new ErrorHandler(400),err);
    });
}

import "./contact.css";
import React, { Fragment, useRef, useState, useEffect } from "react";
import{ createNewContactFormOrUpdate }from '../controllers/contactFormController'
import { useSnackbar } from "notistack";
function Contact() {
  const {enqueueSnackbar}=useSnackbar();
  const [contactFrom, setContactForm] = useState({
    name: "",
    subject: "",
    phoneNo: "",
    email: "",
    description: "write your problems or queries here",
  });

  const { name, subject, phoneNo, email, description } = contactFrom;

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    createNewContactFormOrUpdate(contactFrom).then(data=>{
      console.log(data);
      if(data.sucess){
        enqueueSnackbar(data.message||"form sent sucessfully you will be contacted soon", {
          variant: "success",
          autoHideDuration: 2000,
        });
        setContactForm({
          name: "",
          subject: "",
          phoneNo: "",
          email: "",
          description: "write your problems or queries here",
        });
      }
    });
    
  };

  const handleDataChange = (e) => {
    console.log(e.target.value);
    setContactForm({ ...contactFrom, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div style={{ fontSize: "20px" }}>
        we are reliable and fastest helemt and other products distributors
        inside kathmandu valley.
      </div>
      <div>
        <h3>
          If you have any query about us and our products. (Fill up the form
          below or email us at ............
        </h3>
      </div>
      <div className="form-container">
        <div className="contact-form">
          <form onSubmit={formSubmit}>
            <div>Name</div>
            <input
              type="text"
              placeholder="name"
              required
              name="name"
              value={name}
              onChange={(e) => {
                handleDataChange(e);
              }}
            />
            <div>Subject</div>
            <input
              type="text"
              placeholder="subject"
              required
              name="subject"
              value={subject}
              onChange={(e) => {
                handleDataChange(e);
              }}
            />
            <div>Email</div>
            <input
              type="text"
              placeholder="email"
              required
              name="email"
              value={email}
              onChange={(e) => {
                handleDataChange(e);
              }}
            />

            <div>PhoneNo</div>
            <input
              type="number"
              placeholder="phoneNo"
              name="phoneNo"
              value={phoneNo}
              onChange={(e) => {
                handleDataChange(e);
              }}
            />
            <div>Description</div>
            <textarea
              id="w3review"
              rows="4"
              cols="50"
              required
              className="text-area"
              name="description"
              value={description}
              onChange={(e) => {
                handleDataChange(e);
              }}
            ></textarea>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="submit"
                value="Submit"
                className="submitBtn"
                onChange={(e) => {
                  handleDataChange();
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;

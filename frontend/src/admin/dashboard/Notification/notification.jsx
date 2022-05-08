import * as React from "react";

import { getAllContactForm, getallContactForms } from "../../../controllers/adminController";
import NotificationList from "./notificationList";
function Notification() {
  const [ContactForm, setContactForm] = React.useState([]);
  const[isRerendered,setIsRerendered]=React.useState(false);

const changeIsRendered=()=>{
  setIsRerendered(!isRerendered);
}

  const showDetail=(e,contactFromId)=>{
      const expand=e.currentTarget.getAttribute("expand");
      if(expand==="false"){
          e.currentTarget.setAttribute("expand","true");
          console.log("fetch");
          console.log(contactFromId);
      }else{
        e.currentTarget.setAttribute("expand","false");
      }

      console.log( e.currentTarget.getAttribute("expand"));
     

      
  }

  React.useEffect(() => {
   getallContactForms().then((data) => {
      console.log(data);
      setContactForm(data.contactForms);
    });
  }, [isRerendered]);
   console.log(ContactForm);

  if(ContactForm.length==0){
    return(<div style={{display:"flex",width:"100%",justifyContent:"center"}}>No Queries yet </div>)
  }

  return (
    <div style={{backgroundColor:"rgb(235 236 244)",marginBottom:"2px"}}>
       <div className="flex-heading">Notification</div>
      {ContactForm.map((contactForm, index) => {
        return (
          <NotificationList key={contactForm._id} contactForm={contactForm} changeIsRendered={changeIsRendered}/>
        );
      })}
     
    </div>
  );
}

export default Notification;

import * as React from "react";


import { getdeletedOrders  } from "../../../controllers/adminController";
import SpamList from "./spamList";
function Spam() {
  const [orders, setOrders] = React.useState([]);
  const[isRerendered,setIsRerendered]=React.useState(false);

const changeIsRendered=()=>{
  setIsRerendered(!isRerendered);
}

  const showDetail=(e,productId)=>{
      const expand=e.currentTarget.getAttribute("expand");
      if(expand==="false"){
          e.currentTarget.setAttribute("expand","true");
          console.log("fetch");
          console.log(productId);
      }else{
        e.currentTarget.setAttribute("expand","false");
      }

      console.log( e.currentTarget.getAttribute("expand"));
     

      
  }

  React.useEffect(() => {
    getdeletedOrders().then((data) => {
      console.log(data);
      setOrders(data.orders);
    });
  }, [isRerendered]);
  // console.log(orders);
  if(orders.length==0){
    return(<div style={{display:"flex",width:"100%",justifyContent:"center"}}>No deleted order yet</div>)
  }

  return (
    <div style={{backgroundColor:"rgb(235 236 244)",marginBottom:"2px"}}>
       <div className="flex-heading">Spam</div>
      {orders.map((order, index) => {
        return (
          <SpamList key={order._id} order={order} changeIsRendered={changeIsRendered}/>
        );
      })}
     
    </div>
  );
}

export default Spam;

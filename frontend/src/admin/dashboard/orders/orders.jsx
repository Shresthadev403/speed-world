import * as React from "react";

import {  getAllProcessingOrders } from "../../../controllers/adminController";
import OrderList from "./orderList";
function Orders() {
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
    getAllProcessingOrders().then((data) => {
      console.log(data);
      setOrders(data.orders);
    });
  }, [isRerendered]);
  // console.log(orders);

  if(orders.length==0){
    return(<div style={{display:"flex",width:"100%",justifyContent:"center"}}>No Order Yet</div>)
  }

  return (
    <div style={{backgroundColor:"rgb(235 236 244)"}}>
       <div className="flex-heading">Orders</div>
      {orders.map((order, index) => {
        return (
          <OrderList key={order._id} order={order} changeIsRendered={changeIsRendered}/>
        );
      })}
     
    </div>
  );
}

export default Orders;

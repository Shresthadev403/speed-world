import {useEffect, useState} from 'react'
import { getMyOrders } from '../controllers/userController';
import MyOrderList from './myOrderList';




function MyOrder() {

    const[orders,setOrders]=useState(null);

 useEffect(()=>{
     getMyOrders().then(data=>{
    // console.log(data);
    setOrders(data.orders);
    
     })
 },[])
 console.log(orders);

 if(!orders || orders.length==0){
     return<div style={{width:"100%",textAlign:"center"}}>You have not ordered any items yet</div>
 }
    return ( <>
   {
       orders.map((order,index)=>{
           return <MyOrderList key={order._id} order={order}/>
       })
   }
    </> );
}

export default MyOrder;
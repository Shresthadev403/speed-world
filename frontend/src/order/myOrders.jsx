import {useEffect, useState} from 'react'
import { getMyOrders } from '../controllers/userController';
import MyOrderList from './myOrderList';
import '../css/global.css'




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
     return<div className='component' style={{width:"100%",textAlign:"center"}}>You have not ordered any items yet</div>
 }
    return ( <div className='component'>
   {
       orders.map((order,index)=>{
           return <MyOrderList key={order._id} order={order}/>
       })
   }
    </div> );
}

export default MyOrder;
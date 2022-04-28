import './orderList.css'

function MyOrderList(props) {
    const {shippingInfo,city,orderStatus,phoneNo,totalPrice}=props.order;
  return (
    <div>
      <div className="container-order">
        <div className="img">
          <img src={props.order.orderItems[0].image} alt="" />
        </div>
        <div className="details">
            <div>Name:{props.order.orderItems[0].name}</div>
            <div>Quantity:{props.order.orderItems[0].quantity}</div>
            <div>DeliveryAddress:{shippingInfo},{city}</div>
            <div>OrderStatus:{orderStatus}</div>
            <div>Your Contact:{phoneNo}</div>
            <div>Total Price:{totalPrice}</div>
        </div>
      </div>
     
    </div>
  );
}

export default MyOrderList;

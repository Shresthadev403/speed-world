import "./makeOrder.css";

import React, { Fragment, useRef, useState, useEffect } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import DescriptionIcon from "@mui/icons-material/Description";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ClassIcon from "@mui/icons-material/Class";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { color } from "@mui/system";
import { makeOrder } from "../controllers/orderController";
import { useSnackbar } from 'notistack';
//const categories = ["helmet", "gear", "glubs", "others"];

function MakeOrder(props) {
  const {productId}=useParams();
  const { enqueueSnackbar } = useSnackbar();
  const[isLoading,setIsLoading]=useState(false);
  const [order, setOrder] = useState({
    shippingInfo: "",
    state: "",
    city: "",
    panNo: "",
    quantity: 1,
    phoneNo: "",
    price: "",
  });
//console.log(productId);
  //const [imagePreview, setImagePreview] = useState(null);
  const { shippingInfo, state, city, panNo, quantity, phoneNo, price } = order;

  const handleDataChange = (e) => {
    e.preventDefault();
    console.log("done");
    console.log(e.target.name);
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("shippingInfo", shippingInfo);
    myForm.set("state", state);
    myForm.set("city", city);
    myForm.set("pinCode", panNo);
    myForm.set("phoneNo", phoneNo);
    myForm.set("quantity", quantity);
   setIsLoading(true);
    makeOrder(myForm,productId).then(data=>{
      console.log(data);
      if(data.sucess){
        enqueueSnackbar("order  sucessfull we will contact you soon",{variant:"success",autoHideDuration:4000});
        setIsLoading(false);
        setOrder({
          shippingInfo: "",
          state: "",
          city: "",
          panNo: "",
          quantity: 1,
          phoneNo: "",
          price: "",
        });
      }else{
        enqueueSnackbar("please Login to order our product",{variant:"error",autoHideDuration:2000});
        setIsLoading(false);
      }

    
    })

  };

  if(isLoading){
    console.log("loading");
    return(<div className="loading">
    <CircularProgress />
    </div>)
  }

  return (
    <div>
      <div className="Container">
        <div className="Container-Box">
          <div className="Container-header">Buy Now</div>
          <form className="Form" onSubmit={handleSubmit}>
            <div className="order-Tag">Shipping Info</div>
            <div className="order-item">
              <HouseSidingIcon />
              <input
                name="shippingInfo"
                type="text"
                placeholder="exact location"
                required
                value={shippingInfo}
                onChange={handleDataChange}
              />
            </div>
            <div className="order-Tag">State</div>
            <div className="order-item">
              <DriveFileRenameOutlineIcon />
              <input
                type="text"
                name="state"
                placeholder="eg:Bagmati"
                required
                value={state}
                onChange={handleDataChange}
              />
            </div>
            <div className="order-Tag">City</div>
            <div className="order-item">
              <LocationCityIcon />
              <input
                type="text"
                name="city"
                placeholder="eg:kathmandu"
                required
                value={city}
                onChange={handleDataChange}
              />
            </div>
            <div className="order-Tag">PAN NO(optional)</div>
            <div className="order-item">
              <DriveFileRenameOutlineIcon />
              <input
                type="number"
                name="panNo"
                placeholder="PAN NO"
                value={panNo}
                onChange={handleDataChange}
              />
            </div>
            <div className="order-Tag">Phone No</div>
            <div className="order-item">
              <ContactPhoneIcon />
              <input
                type="number"
                name="phoneNo"
                placeholder="eg:9812345678"
                required
                value={phoneNo}
                onChange={handleDataChange}
              />
            </div>
            <div className="order-Tag">
              Quantity
              <div style={{ paddingLeft: "10px" }}>
                {/* <ButtonGroup
                  size="small"
                  aria-label="small outlined button group"
                >
                  <span style={{backgroundcolor:"red"}}>
                  <Button
                    
                      onClick={(e) => {
                        setOrder({ ...order, quantity: quantity + 1 });
                      }}
                    >
                      +
                    </Button>
                    {quantity > 1 && (
                      <Button
                        
                        onClick={(e) => {
                          setOrder({ ...order, quantity: quantity - 1 });
                        }}
                      >
                        -
                      </Button>
                    )}
                 
                  </span>
                   
                </ButtonGroup> */}
              </div>
            </div>
            <div className="order-item">
              <DriveFileRenameOutlineIcon />
              <input
                type="number"
                name="quantity"
                min="0"
                onInput={e=>{e.target.validity.valid||(e.target.value='')}}
                placeholder="quantity"
                required
                value={quantity}
                onChange={handleDataChange}
              />
            </div>
            <div className="order-Tag">Total Price(with VAT)</div>
            <div className="order-Tag" style={{ color: "green" }}>
              NRs:{props.price * quantity}
            </div>
            <input type="submit" value="Buy" className="submitBtn" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default MakeOrder;

import "../../../css/global.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from '@mui/material/Avatar';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import Box from "@mui/material/Box";
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from "@mui/material/CircularProgress";
import { changeOrderStatusDeliveredAndDeleted, deleteHistoryDeivered, getUserDetails, moveToSpamFolder } from "../../../controllers/adminController";
import { getProductDetails } from "../../../controllers/productControllers";
import { Button } from "@mui/material";
import DeleteHistoryAlert from "./deleteHistoryalert";
import { useSnackbar } from 'notistack';
import DeleteIcon from '@mui/icons-material/Delete';



const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 0, // smol phone
      xs: 300, // phone
      sm: 600, // tablets
      md: 800, // small laptop
      lg: 1200, // desktop
      xl: 1536, // large screens
    },
  },
});

function HistoryList(props) {
  const { order } = props;
  // console.log();
  const {enqueueSnackbar}=useSnackbar();
  const [expand, setExpand] = useState("false");
  const [userDetails, setUserDetails] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  
  const[delHistoryStatus,setDelHistoryStatus]=useState(false);
  
  const dateFromObjectId=(objectId)=>{

    const dateObj= new Date(parseInt(objectId.toString().substring(0, 8), 16) * 1000);
    return(dateObj.getUTCFullYear()) + "/" + (dateObj.getMonth() + 1)+ "/" + (dateObj.getUTCDate());
  }

  const deleteHistoryStatus=(e)=>{
    e.stopPropagation();
    setDelHistoryStatus(!delHistoryStatus);
    console.log("query");
  }

  

  const historyDeleted=()=>{
    console.log("history deleted");
    moveToSpamFolder(order._id).then(data=>{
     // console.log(data);
     if(data.sucess){
      enqueueSnackbar("history deleted sucessfully",{variant:"success",autoHideDuration:3000});
      props.changeIsRendered();
     }
     
    
     
    })
  }

 

  const showDetails = (e, productId, userId) => {
    console.log(productId);
    setExpand(!expand);
    if (expand) {
      console.log("fetch");
      getUserDetails(userId).then((data) => {
        console.log(data.user);

        setUserDetails(data.user);

        //   console.log(userDetails);
      });
      getProductDetails(productId).then((data) => {
        console.log(data);
        if (data.sucess) {
          setProductDetails(data.product);
        }

        //  console.log(productDetails);
      });
    } else {
      console.log("close");
    }
  };
  // console.log(userDetails);
  // console.log(productDetails);

  return (
    <ThemeProvider theme={theme}>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={(e) => {
            showDetails(e, order.orderItems[0].product, order.user);
          }}
        >
          <div className="toggle-fit">
            
          <Typography className="toggle-left" noWrap={false} variant="h6">{order.orderItems[0].name} </Typography>
          <Typography className="toggle-center" variant="h6">{dateFromObjectId(order._id).toString()} </Typography>
          <Typography className="toggle-right" variant="h6" style={
            {
              color:order.orderStatus==="cancelled"?"red":"green"
            }
          } >{order.orderStatus}
           
          <Button onClick={(e)=>{deleteHistoryStatus(e)}}><DeleteIcon /></Button>
          </Typography>
          
          {
            delHistoryStatus&& <DeleteHistoryAlert
             deleteHistoryStatus={deleteHistoryStatus}
             historyDeleted={historyDeleted}
             />
          }
          </div>
          
        </AccordionSummary>
        {}
        <AccordionDetails theme={theme}>
          <div className="flex-container" >
            {productDetails && (
              <Box
                className="flex-container-left"
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignContent: "flex-start",

                  p: 1,
                  m: 1,
                  bgcolor: "background.paper",
                  width: "50%",
                  borderRadius: 1,

                  width: {
                    xxx: "100%",
                    sm: "96%",
                    md: "98%",
                    lg: "50%",
                  },
                }}
              >
                <div className="flex-data flex-container" >
                  <div className="flex-item-left">
                  <div>Name:{productDetails.name}</div>
                  <div>Category:{productDetails.category[0]}</div>
                  <div>Quantity:{order.orderItems[0].quantity}</div>
                 <div>@Price:{productDetails.price}</div>
                 <div>Total Price:{order.totalPrice}</div>
                  </div>
                 
                  <div className="flex-item-right">
                  <Avatar  variant="square" src={productDetails.images[0].image_url} sx={{
                    width:"100%",
                    height:"auto",
                    minWidth:"150px",
                    minHeight:"150px",
                    maxWidth:"275px"
                  }}>
  N
</Avatar>
                  </div>
                </div>
              </Box>
            )}
            {userDetails && (
              <Box
                className="flex-container-right"
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignContent: "flex-start",

                  p: 1,
                  m: 1,
                  bgcolor: "background.paper",
                  width: "50%",
                  borderRadius: 1,
                  width: {
                    xxx: "100%",
                    sm: "96%",
                    md: "98%",
                    lg: "50%",
                  },
                }}
              >
                <div className="flex-data">
                  <div>Name:{userDetails.name}</div>
                  <div>Email:{userDetails.email}</div>
                  <div>
                    Phone No:{order.phoneNo}
                  </div>
                  <div>
                    PAN No:{order.pinCode}
                  </div>
                  <div>
                    Shipping Address:{order.shippingInfo},{order.city}
                  </div>
                  <div>
                  <Avatar alt="avatar" sx={{ width: "25vmin", height:"25vmin",m:"5px" }} src={userDetails.avatar.image_url} />
                  </div>
                </div>
              </Box>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </ThemeProvider>
  );
}

export default HistoryList;

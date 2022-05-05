import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./admin/dashboard/dashboard";
import { doesHttpOnlyCookieExist } from "./controllers/auth";
import { getMyProfile } from "./controllers/userController";
import Home from "./home/home";
import MyProfile from "./myProfile/myProfile";
import Navbar from "./navbar/navbar";
import Product from "./product/product";
import Products from "./products/products";
import Login from "./user/signUpLogin";
import { SnackbarProvider, useSnackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';
import MyOrder from "./order/myOrders";
import Contact from "./contact/contact";
import About from "./about/about";
import ForgetPassowrd from "./user/forgetPassowrd";
import ResetPassword from "./user/resetPassword";
import Footer from "./footer/footer";
import TermsAndCondition from "./termsAndCondition/termsAndCondition";
import PrivacyPolicy from "./privacyPolicy/privacyPolicy";


function MainRouter() {
  const [isLoggedIn, SetIsLoggedIn] = useState(false);
  const[isAdmin,setIsAdmin]=useState(false);
const changeLoginStatus=(status)=>{
SetIsLoggedIn(status);
}
  useEffect(() => {
    const token = doesHttpOnlyCookieExist("token");
    if (token) {
      SetIsLoggedIn(true);
      getMyProfile().then(data=>{
        if(data.user.role==='admin'){
          setIsAdmin(true);
        }
      })
    } else {
      SetIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, [isLoggedIn,isAdmin]);
 console.log(isAdmin);
  return (
    <div>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
      }}
      TransitionComponent={Slide}
      >
      <Navbar isLoggedIn={isLoggedIn} changeLoginStatus={changeLoginStatus} isAdmin={isAdmin} />
      
     
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/Login" element={<Login isLoggedIn={isLoggedIn} changeLoginStatus={changeLoginStatus}/>}></Route>
        <Route exact path="/password/forgot" element={<ForgetPassowrd/>}></Route>
        <Route exact path="/resetpassword/:resetToken" element={<ResetPassword/>}></Route>
       
        <Route exact path="/Profile" element={<MyProfile />}></Route>
        <Route exact path="/MyOrders" element={<MyOrder />}></Route>
        <Route exact path="/Contact" element={<Contact />}></Route>
        <Route exact path="/About" element={<About/>}></Route>
        {/* products */}
        <Route exact path="/Products" element={<Products />}></Route>
        <Route exact path="/Product/:productId" element={<Product isLoggedIn={isLoggedIn} isAdmin={isAdmin}   />}></Route>

        {/*admin routes*/}
        <Route exact path="/Dashboard" element={<Dashboard />}></Route>

          {/* website routes */}
        <Route exact path="/termsandconditions" element={<TermsAndCondition />}></Route>
        <Route exact path="/privacypolicy" element={<PrivacyPolicy />}></Route>

      </Routes>
   
  
    
      </SnackbarProvider>
      <Footer/>
    </div>
  );
}

export default MainRouter;


import React, { Fragment, useRef, useState, useEffect } from "react";
import "./signUpLogin.css";
import '../css/global.css'
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import CircularProgress from "@mui/material/CircularProgress";
import { login, signUp } from "../controllers/userController";
import defaultAvatar from "../static/avatar.png"
import { useSnackbar } from "notistack";
import { resizeFile } from "../global/imageSizeReducer";




function Login (props) {
  const {changeLoginStatus}=props;
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const navigate=useNavigate();
  const{enqueueSnackbar}=useSnackbar();

  const[isLoading,setIsLoading]=useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState(defaultAvatar);
  const [avatarPreview, setAvatarPreview] = useState(defaultAvatar);

  const loginSubmit = (e) => {
    e.preventDefault();
     console.log("submitted");
     const loginData={
        email:loginEmail,
         password:loginPassword
     }
     setIsLoading(true);
     login(loginData).then(data=>{
         console.log("data",data);
         setIsLoading(false);
         if(data.sucess){
          
          changeLoginStatus(true);
          localStorage.setItem('user',JSON.stringify(data.user));
          navigate('/Products');
          
         }else{
          enqueueSnackbar(data.error,{variant:"error",autoHideDuration:2000});
         }
         
     });
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
  
   console.log("register submit");
   setIsLoading(true);

   signUp(myForm).then(data=>{
    console.log(data);
    setIsLoading(false);
    if(data.sucess){
     
      enqueueSnackbar("Register Sucessful.Please Login",{variant:"success",autoHideDuration:2000});
    }else{
      enqueueSnackbar(data.error,{variant:"error",autoHideDuration:2000});
    }
   
   })
  };

  const registerDataChange = async(e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
       resizeFile(file).then(image=>{
         console.log(image);
         setAvatarPreview(image);
         setAvatar(image);
       });
      
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };




  const switchTabs = (event, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  if(isLoading){
    console.log("loading");
    return(<div className="loading">
    <CircularProgress />
    </div>)
  }

  
  return (
        <div className="component">
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                   
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </div>
      
    
  );
};

export default Login;


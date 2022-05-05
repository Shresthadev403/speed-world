import "./signUpLogin.css";
import "../css/global.css"

import React, { Fragment, useRef, useState, useEffect } from "react";
import "./signUpLogin.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { forgetPassowrd, resetPassword } from "../controllers/userController";
import { useSnackbar } from "notistack";

function ResetPassowrd() {
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [newPassowrd, setNewPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");
  const [isSent, setIsSent] = useState(false);

  const resetSubmit = (e) => {

    e.preventDefault();

    const resetData={
        "newpassword":newPassowrd,
        "confirmpassword":confirmPassowrd
    }
    console.log(resetData);
    resetPassword(resetToken,resetData).then((data) => {
        console.log(data);
      if (data.sucess) {
        setIsSent(true);
        enqueueSnackbar(data.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
        navigate('/login');
      } else {
        enqueueSnackbar(data.error, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    });
  };

  return (
    <div className="component">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          
        }}
      >
        <div style={{ maxWidth: "700px", width: "500px" }}>
          <form className="loginForm" onSubmit={resetSubmit}>
              <div style={{fontSize:"larger",fontFamily:"roboto"}}>NewPassword</div>
          <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="new password"
                    required
                    name="password"
                    value={newPassowrd}
                    onChange={e=>{setNewPassword(e.target.value)}}
                  />
                </div>
                <div style={{fontSize:"larger",fontFamily:"roboto"}}>Confirm passowrd</div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="confirm password"
                    required
                    name="password"
                    value={confirmPassowrd}
                    onChange={e=>{setConfirmPassword(e.target.value)}}
                  />
                </div>

            <input type="submit" value="Reset" className="loginBtn"  style={{marginTop:"20px"}}/>
          </form>
        </div>
      </div>
      {isSent && (
        <p style={{ textAlign: "center" }}>
          Follow the instruction sent in your email
        </p>
      )}
    </div>
  );
}

export default ResetPassowrd;

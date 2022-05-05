import "./signUpLogin.css";
import "../css/global.css"
import React, { Fragment, useRef, useState, useEffect } from "react";
import "./signUpLogin.css";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { forgetPassowrd, resetPassword } from "../controllers/userController";
import { useSnackbar } from "notistack";

function ForgetPassowrd() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const onEmailSubmit = (e) => {
    e.preventDefault();
    forgetPassowrd(email).then((data) => {
      if (data.sucess) {
        setIsSent(true);
        enqueueSnackbar(data.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
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
          <form className="loginForm" onSubmit={onEmailSubmit}>
            <div className="loginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input type="submit" value="Submit" className="loginBtn" />
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

export default ForgetPassowrd;

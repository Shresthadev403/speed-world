import '../css/global.css'

import { Fragment } from "react";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getMyProfile } from "../controllers/userController";



const theme = createTheme();

theme.typography.h3 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  
  },
};

function MyProfile() {
const[user,setUser]=React.useState(null);
React.useEffect(()=>{
getMyProfile().then(data=>{
  console.log(data);
  setUser(data.user);
})
},[])
console.log(user);
  return (
    <div className='component'>
      <div style={{ width: "100%" }}>
        <Avatar
          alt="avatar"
          src={user?user.avatar.image_url:""}
          sx={{ width: "25vw", height: "25vw", m: 2,minWidth:"180px",minHeight:"180px" }}
        />
      </div>
      <Box
        sx={{
          display: "block",
          flexWrap: "wrap",
          alignContent: "flex-start",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          maxWidth: "100",
          maxHeight: "200",
          borderRadius: 1,
        }}
      >
        <ThemeProvider theme={theme}>
          <Typography variant="h3">Name:{user && user.name}</Typography>
          <Typography variant="h3">Email:{user && user.email}</Typography>
          <Typography variant="h3">Role:{user && user.role}</Typography>
        </ThemeProvider>
      </Box>
    </div>
  );
}

export default MyProfile;

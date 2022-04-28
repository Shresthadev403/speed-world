import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddBoxIcon from '@mui/icons-material/AddBox';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DeleteIcon from '@mui/icons-material/Delete';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import HistoryIcon from '@mui/icons-material/History';
import RedeemIcon from '@mui/icons-material/Redeem';
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';
import { makeStyles } from "@mui/styles";
import CreateProduct from "./createProduct/createProduct";
import Analytics from "./analytics/analytics";
import History from "./history/history";

import Orders from "./orders/orders";
import Stock from "./stock/stock";
import Spam  from "./spam/spam"
import Notification from "./Notification/notification";

const drawerWidth = 240;

// styling drawertop margin
const useStyles = makeStyles({
  drawerPaper: {
    marginTop:"70px",

  },
});

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Dashboard() {
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [activeDashboardComponent,setActiveDashboardComponent]=React.useState("Create Product");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDashboardChange=(event)=>{
      const target=event.currentTarget.getAttribute("name")
    //  console.log(target);
      setActiveDashboardComponent(target);
  }

  React.useEffect(()=>{
     
      console.log(activeDashboardComponent);
     
  },[activeDashboardComponent])

  return (
    <div >
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
       
        <Drawer
          variant="permanent"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <DrawerHeader>
          {<IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
           
              sx={{
                marginRight: 0.5,
                float:"right",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>}

          { open && <IconButton onClick={handleDrawerClose} sx={{ ...(!open && { display: "none" }),}}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>}
          </DrawerHeader>
          <Divider />
          <List>
            {["Create Product", "History", "Analytic", "Notification"].map((text, index) => (
              <ListItemButton
                key={text}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={handleDashboardChange}
                name={text}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index  === 0 ? <AddBoxIcon /> : ""}
                  {index  === 1 ? <HistoryIcon/> : ""}
                  {index  === 2 ? <AnalyticsIcon /> : ""}
                  {index  === 3 ? <EditNotificationsIcon /> : ""}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <List>
            {["Orders", "Stock", "Spam"].map((text, index) => (
              <ListItemButton
                key={text}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={handleDashboardChange}
                name={text}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                    {index  === 0 ? < RedeemIcon/>:""}
                  {index  === 1 ? <ShowChartIcon /> : ""}
                  {index  === 2? <MailIcon />:""}
                 
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
        <div style={{width:"100%"}}>
        <Box component="main" sx={{ flexGrow: 1,  }} >
         
         <DrawerHeader />
         {
             activeDashboardComponent=="Create Product"?<CreateProduct/>:""
             
         }
          {
             activeDashboardComponent=="History"?<History/>:""
             
         }
          {
             activeDashboardComponent=="Analytic"?<Analytics/>:""
             
         }
          {
             activeDashboardComponent=="Notification"?<Notification/>:""
             
         }
         {
             activeDashboardComponent=="Orders"?<Orders/>:""
             
         }
         {
             activeDashboardComponent=="Stock"?<Stock/>:""
             
         }
         {
             activeDashboardComponent=="Spam"?<Spam/>:""
             
         }
 
       </Box>
        </div>
        

      </Box>
    </div>
  );
}

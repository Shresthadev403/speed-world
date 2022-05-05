import "../../../css/global.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import {
  deleteContactForm,
  getallContactForms,
  moveToSpamFolder,
} from "../../../controllers/adminController";

import { Button } from "@mui/material";
import DeleteNotificationAlert from "./deleteNotificationalert";
import { useSnackbar } from "notistack";
import DeleteIcon from "@mui/icons-material/Delete";

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

function NotificationList(props) {
  const { contactForm } = props;
  // console.log();
  const { enqueueSnackbar } = useSnackbar();
  const [expand, setExpand] = useState("false");
  const [contactDetails, setContactDetails] = useState(null);

  const [delContactStatus, setDelContactStatus] = useState(false);

  const dateFromObjectId = (objectId) => {
    const dateObj = new Date(
      parseInt(objectId.toString().substring(0, 8), 16) * 1000
    );
    return (
      dateObj.getUTCFullYear() +
      "/" +
      (dateObj.getMonth() + 1) +
      "/" +
      dateObj.getUTCDate()
    );
  };

  const deleteContactStatus = (e) => {
    e.stopPropagation();
    setDelContactStatus(!delContactStatus);
    console.log("query");
  };

  const contactFormDeleted = () => {
    console.log("form contact deleted");
    deleteContactForm(contactForm._id).then((data) => {
      if (data.sucess) {
        enqueueSnackbar("form deleted sucessfully", {
          variant: "success",
          autoHideDuration: 2000,
        });
        props.changeIsRendered();
      }
    });
  };

  const showDetails = (e, contactFormId) => {
    console.log(contactFormId);
    if (expand) {
      setExpand(true);
    } else {
      setExpand(false);
    }

    // if (expand) {

    // } else {
    //   console.log("close");
    // }
  };

  console.log(contactDetails);
  console.log(contactForm);
  console.log(expand, "mmmmmmmmmmmmmmm");

  useEffect(() => {}, [expand]);

  return (
    <ThemeProvider theme={theme}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={(e) => {
            showDetails(e, contactForm._id);
          }}
        >
          <div className="toggle-fit">
            <Typography className="toggle-left" noWrap={false} variant="h6">
              {contactForm.name}{" "}
            </Typography>
            <Typography className="toggle-center" variant="h6">
              {dateFromObjectId(contactForm._id).toString()}{" "}
            </Typography>
            <Typography className="toggle-right" variant="h6">
              <Button
                onClick={(e) => {
                  deleteContactStatus(e);
                }}
              >
                <DeleteIcon />
              </Button>
            </Typography>

            {delContactStatus && (
              <DeleteNotificationAlert
                deleteContactStatus={deleteContactStatus}
                contactFormDeleted={contactFormDeleted}
              />
            )}
          </div>
        </AccordionSummary>
        {}
        <AccordionDetails theme={theme}>
          <div
            className="flex-container"
            style={{ backgroundColor: "rgb(206, 207, 233)" }}
          >
            {expand && (
              <Box
                className="flex-container-left"
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignContent: "flex-start",

                  p: 1,
                  m: 1,
                  bgcolor: "background.paper",
                  width: "100%",
                  borderRadius: 1,

                  width: {
                    xxx: "100%",
                    sm: "96%",
                    md: "98%",
                    lg: "100%",
                  },
                }}
              >
                <div className="flex-data flex-container">
                  <div className="flex-item-left">
                    <div>Name:{contactForm.name}</div>
                    <div>Subject:{contactForm.subject}</div>
                    <div>Phone No:{contactForm.phoneNo}</div>
                    <div>Email:{contactForm.email}</div>
                    <div>Description:{contactForm.description}</div>
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

export default NotificationList;

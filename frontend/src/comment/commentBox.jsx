import "./commentBox.css";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ReactDOM from "react-dom";
import ReactStars from "react-rating-stars-component";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";

import { Divider, Avatar, Grid, div } from "@material-ui/core";
import { padding } from "@mui/system";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const reactStarsOptions = {
  size: 50,
  value: 0,
  edit: true,
  isHalf: true,
};

const imgLink = null;
export default function CommentBox(props) {
  const [open, setOpen] = React.useState(false);
  const [review, setReview] = React.useState("");
  const [rating, setRating] = React.useState(0);

  const handleDataChange = (e) => {
    if (e.target.name == "review") {
      setReview(e.target.value);
    }
  };
  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
    props.showCommentBox(e);
    console.log("husl");
  };

  const sendComment = (e) => {
    e.stopPropagation();
    console.log("dom");
    props.showCommentBox(e);
    props.makeComment(review, rating);
  };

  const calculateTimeGap = (postedDate) => {
    let secondBetweenTwoDate = Math.abs(
      (new Date().getTime() - new Date(postedDate).getTime()) / 1000
    );
    console.log(secondBetweenTwoDate);
    let time = parseInt(secondBetweenTwoDate).toString().concat("seconds");

    if (secondBetweenTwoDate > 3600 * 60 * 24 * 30 * 12) {
      secondBetweenTwoDate = parseInt(
        secondBetweenTwoDate / (3600 * 24 * 30 * 12)
      );
      time = secondBetweenTwoDate.toString().concat("years");
    } else if (secondBetweenTwoDate > 3600 * 24 * 30) {
      secondBetweenTwoDate = parseInt(secondBetweenTwoDate / (3600 * 24 * 30));
      time = secondBetweenTwoDate.toString().concat("months");
    } else if (secondBetweenTwoDate > 3600 * 24) {
      secondBetweenTwoDate = parseInt(secondBetweenTwoDate / (3600 * 24));
      time = secondBetweenTwoDate.toString().concat("days");
    } else if (secondBetweenTwoDate > 3600) {
      secondBetweenTwoDate = parseInt(secondBetweenTwoDate / 3600);
      time = secondBetweenTwoDate.toString().concat("hours");
    } else if (secondBetweenTwoDate > 3600) {
      console.log("done2");
      secondBetweenTwoDate = parseInt(secondBetweenTwoDate / 3600);
      time = secondBetweenTwoDate.toString().concat("hours");
    } else if (secondBetweenTwoDate > 60) {
      // console.log("Done");
      secondBetweenTwoDate = parseInt(secondBetweenTwoDate / 60);
      time = secondBetweenTwoDate.toString().concat("minutes");
    }

    return time;
  };
  React.useEffect(() => {
    setOpen(true);
  }, []);

  // console.log(review);

  if (!props.comments) {
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "blue" }}>
        Comments
        <span style={{ float: "right", marginRight: "50px", color: "black" }}>
          <Button
            onClick={(e) => {
              handleClose(e);
            }}
          >
            {" "}
            <CloseIcon fontSize="large" />
          </Button>
        </span>
      </h1>

      <div
        style={{
          padding: 14,
          backgroundColor: "rgb(247, 249, 251)",
          overflowY: "scroll",
          maxHeight: "300px",
          width: "94%",
        }}
      >
        {props.comments.length == 0 && (
          <div style={{ padding: "40px 20px ", width: "100%" }}>
            <Grid wrap="nowrap" container spacing={2}>
              <Grid item>
                <Avatar alt="Remy Sharp" src={imgLink} />
              </Grid>
              <Grid container justifyContent="flex-start" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left", width: "100%" }}>
                  Admin
                </h4>
                <p style={{ textAlign: "left" }}>
                  Be first to review this product.Your feedback will be
                  appreciated.{" "}
                </p>
              </Grid>
            </Grid>
            <div
              style={{
                textAlign: "left",
                color: "gray",
                display: "block",
                paddingTop: "5px",
                overflowY: "scroll",
              }}
            >
              posted 1 minutes ago
            </div>
          </div>
        )}

        {props.comments &&
          props.comments.map((comment, index) => {
            return (
              <div key={comment.user} style={{ padding: "40px 20px " }}>
                <Grid wrap="nowrap" container spacing={2}>
                  <Grid item>
                    <Avatar alt="Remy Sharp" src={comment.image} />
                  </Grid>
                  <Grid
                    container
                    justifyContent="flex-start"
                    item
                    xs
                    zeroMinWidth
                  >
                    <h4
                      style={{
                        margin: 0,
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        padding: "3px",
                        width: "100%",
                      }}
                    >
                      {comment.name}
                      <span style={{ paddingLeft: "20px" }}>
                        <ReactStars
                        edit={false}
                          count={5}
                          size={20}
                          isHalf={true}
                          value={comment.rating}
                          emptyIcon={<i className="far fa-star"></i>}
                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor="#ffd700"
                        />
                      </span>
                    </h4>
                    <p
                      style={{
                        textAlign: "left",
                        font: "larger",
                        overflowWrap: "break-word",
                      }}
                    >
                      {comment.comment}.{" "}
                    </p>
                  </Grid>
                </Grid>
                <div
                  style={{
                    textAlign: "left",
                    color: "gray",
                    display: "block",
                    paddingTop: "5px",
                    overflowY: "scroll",
                  }}
                >
                  posted {calculateTimeGap(comment.postedDate)} ago
                </div>
                <Divider variant="fullWidth" style={{ margin: "0px 5px" }} />
              </div>
            );
          })}
      </div>
      <div
        style={{
          width: "97%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <div> Give us your rating</div>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={40}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
        />
      </div>

      <div className="commentInput">
        <input
          type="text"
          name="review"
          value={review}
          onChange={(e) => {
            handleDataChange(e);
          }}
        />
        <Button
          onClick={(e) => {
            sendComment(e);
          }}
        >
          <SendIcon fontSize="larger" />
        </Button>
      </div>
    </div>
  );
}

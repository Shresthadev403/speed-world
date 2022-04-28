import "./product.css";
import "../css/global.css";

import { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import ReactStars from "react-rating-stars-component";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteProductByAdmin,
  getProductDetails,
  getProductReviews,
  sendReviews,
} from "../controllers/productControllers";
import MakeOrder from "../order/makeOrder";
import CircularProgress from "@mui/material/CircularProgress";
import CommentBox from "../comment/commentBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteProductAlert from "../admin/dashboard/deleteProduct/deleteProductAlert";
import { useSnackbar } from "notistack";
import UpdateProductProductBox from "../admin/dashboard/updateProduct/updateProductBox";

const theme = createTheme();

theme.typography.h3 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "20.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
};

const reactStarsOptions = {
  size: 50,
  value: 0,
  edit: false,
  isHalf: true,
};

function Product(props) {
  const { isLoggedIn, isAdmin } = props;
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState(null);
  const [isCommentBoxOpen, setisCommentBoxOpen] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showProductUpdateBox, setShowProductUpdateBox] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const showCommentBox = (e) => {
    console.log("show");
    setisCommentBoxOpen(!isCommentBoxOpen);
    if (!isCommentBoxOpen) {
      console.log("llll");
      getProductReviews(productId).then((data) => {
        setComments(data.reviews);
        console.log(data);
      });
    }
  };

  const makeComment = (comment, rating) => {
    console.log(comment);
    sendReviews(productId, comment, rating).then((data) => {
      console.log(data);
      window.location.reload(false);
    });
  };

  const showUpdateProductBox = (e) => {
    console.log("show update box");
    setShowProductUpdateBox(!showProductUpdateBox);
  };

  const toggledeleteProductAlert = (e) => {
    console.log("delete");
    setShowDeleteAlert(!showDeleteAlert);
  };

  const deleteProduct = (e) => {
    console.log("product deleted");
    deleteProductByAdmin(productId).then((data) => {
      if (data.sucess) {
        enqueueSnackbar("product deleted sucessfully", {
          variant: "success",
          autoHideDuration: 2000,
        });
        navigate("/products");
      } else {
        enqueueSnackbar(data.error, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    });
  };

  useEffect(() => {
    getProductDetails(productId).then((data) => {
      setProduct(data.product);
      console.log(product);
    });
  }, []);

  if (!product) {
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );
  }

  console.log(isAdmin, isLoggedIn);
  return (
    <div>
      <div className="comment-box">
        {isCommentBoxOpen && (
          <CommentBox
            showCommentBox={showCommentBox}
            makeComment={makeComment}
            comments={comments}
          />
        )}
        {showProductUpdateBox && <UpdateProductProductBox productId={productId} showUpdateProductBox={showUpdateProductBox} />}
      </div>
      <div className="container">
        <div className="detailbox">
          <Box
            component="img"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignContent: "flex-start",

              p: 1,
              m: 1,
              bgcolor: "background.paper",
              width: "50vw",
              height: "50vw",
              minWidth: "280px",
              maxWidth: "400px",
              maxHeight: "450px",
              minHeight: "280px",
              borderRadius: 1,
            }}
            alt="product image"
            src={product && product.images[0].image_url}
          />

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignContent: "flex-start",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
              width: "50vw",

              minWidth: "280px",
              maxWidth: "400px",
              maxHeight: "450px",
              minHeight: "280px",
              borderRadius: 1,
            }}
          >
            <ThemeProvider theme={theme}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  color="orange"
                >
                  {product && product.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {product && product.description}
                </Typography>
                <Typography variant="h5" color="green">
                  Nrs: {product && product.price}
                </Typography>
                <Typography
                  variant="h5"
                  color={product && product.stock !== 0 ? "green" : "red"}
                >
                  {product && product.stock !== 0 ? "In stock" : "Out of stock"}
                </Typography>
                <ReactStars {...reactStarsOptions} value={product.rating} />
              </CardContent>
              <CardActions sx={{ width: "100%" }}>
                <Button
                  size="large"
                  onClick={(e) => {
                    showCommentBox(e);
                  }}
                >
                  Reviews: {product && product.numOfReviews}
                </Button>
                <Button size="large">Share</Button>
              </CardActions>
              {isLoggedIn && isAdmin && (
                <CardActions sx={{ width: "100%" }}>
                  <Button
                    size="large"
                    onClick={(e) => {
                      showUpdateProductBox(e);
                    }}
                  >
                    <EditIcon />
                    update
                  </Button>
                  <Button
                    size="large"
                    onClick={(e) => {
                      toggledeleteProductAlert(e);
                    }}
                  >
                    <DeleteIcon sx={{ color: "red" }} />
                    <span style={{ color: "red" }}>Delete</span>
                    {showDeleteAlert && (
                      <DeleteProductAlert
                        toggledeleteProductAlert={toggledeleteProductAlert}
                        deleteProduct={deleteProduct}
                      />
                    )}
                  </Button>
                </CardActions>
              )}
            </ThemeProvider>
          </Box>
        </div>

        <div className="orderbox">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignContent: "flex-start",

              p: 1,
              m: 1,
              bgcolor: "background.paper",
              width: "50vw",
              height: "auto",
              minWidth: "280px",

              minHeight: "280px",
              borderRadius: 1,
            }}
          >
            <MakeOrder price={product.price} />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Product;

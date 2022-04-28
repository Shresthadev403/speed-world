import React, { Fragment, useRef, useState, useEffect } from "react";
import "./updateProductBox.css";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ClassIcon from "@mui/icons-material/Class";
import { createProduct } from "../../../controllers/adminController";
import CircularProgress from "@mui/material/CircularProgress";
import { SnackbarProvider, useSnackbar } from "notistack";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { updateProductByAdmin } from "../../../controllers/productControllers";
import Radio from "@mui/material/Radio";

const categories = ["helmet", "gear", "glubs", "others"];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const  createUpdateform=(product)=>{
  const myForm=new FormData();
 console.log("form created");
 for (let item in product){
   console.log(item+":"+product[item]);
   if(product[item]!==""){
     console.log("fffffffffffffffffffffffffffffffffffff");
     myForm.set(item,product[item]);
   }

 }
 return myForm;
}

function UpdateProductProductBox(props) {
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    stock: "",
    price: "",
    isFeatured: false,
  });

  const { name, description, category, stock, price, isFeatured } = product;

  const handleClose = (e) => {
    // setOpen(false);
    props.showUpdateProductBox(e);
    console.log("husl");
  };
  const handleAgree = (e) => {
    e.stopPropagation();
    props.historyDeleted();
    props.deleteHistoryStatus(e);
  };

  const handleDataChange = (e) => {
    e.preventDefault();
    // console.log("done");
    if (e.target.name === "isFeatured") {
      if (e.target.value === "true") {
     
        setProduct({ ...product, ["isFeatured"]: true });
      } else {
        setProduct({ ...product, ["isFeatured"]: false });
      }
    } else {
       console.log(e.target.value);
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const myForm = new FormData();
    // myForm.set("name", name);
    // myForm.set("description", description);

    // myForm.set("category", category);
    // myForm.set("price", price);
    // myForm.set("stock", stock);
    // myForm.set("isFeatured", isFeatured);

  //  console.log(props.productId);

      const myForm=createUpdateform(product);
   setIsLoading(true);
    updateProductByAdmin(props.productId, myForm).then((data) => {
      console.log(data);
      if (data.sucess) {
        enqueueSnackbar("product updated sucessfully", {
          variant: "success",
          autoHideDuration: 2000,
        });
        setIsLoading(false);
        setProduct({
          name: "",
          description: "",
          category: "",
          price: "",
          stock: "",
          isFeatured: false,
        });
        window.location.reload(true);
      }
    });
  };
  if (isLoading) {
    console.log("loading");
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );
  }

  // console.log(typeof isFeatured);
  // console.log(isFeatured);
  return (
    <div>
      <div className="update-container">
        <span style={{ float: "right" }}>
          <Button
            onClick={(e) => {
              handleClose(e);
            }}
          >
            {" "}
            <CloseIcon />
          </Button>
        </span>

        <div className="update-container-box">
          <div className="Container-header">Update Product</div>
          <form className="Form" onSubmit={handleSubmit}>
            <div className="productName">
              <DriveFileRenameOutlineIcon />
              <input
                name="name"
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={handleDataChange}
              />
            </div>
            <div className="description">
              <DescriptionIcon />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={description}
                onChange={handleDataChange}
              />
            </div>
            <div>
              <ClassIcon />
              <FormControl sx={{ m: 0.5, minWidth: 100, width: "100vmax" }}>
                <InputLabel
                  sx={{ font: "300 2.7vmin cursive" }}
                  className="category"
                >
                  Category
                </InputLabel>
                <Select
                  labelId="category"
                  id="category"
                  name="category"
                  value={category}
                  onChange={handleDataChange}
                  autoWidth
                  label="category"
                  sx={{
                    minWidth: 120,
                    maxHeight: 50,
                    paddingLeft: "2vmax",
                  }}
                >
                  {categories.map((category) => {
                    return (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="price">
              <DriveFileRenameOutlineIcon />
              <input
                type="number"
                name="price"
                placeholder="Price"
                min="0"
                onInput={e=>{e.target.validity.valid||(e.target.value='')}}
                value={price}
                onChange={handleDataChange}
              />
            </div>
            <div className="stock">
              <DriveFileRenameOutlineIcon />
              <input
                type="number"
                placeholder="Stock"
                min="0"
               onInput= {e=>{e.target.validity.valid||(e.target.value='')}}
                name="stock"
                value={stock}
                onChange={handleDataChange}
              />
            </div>
            <div>
              <div className="div-item">
                Featured:On
                <Radio
                  checked={isFeatured}
                  onChange={handleDataChange}
                  value="true"
                  name="isFeatured"
                  inputProps={{ "aria-label": "A" }}
                />
                Off
                <Radio
                  checked={!isFeatured}
                  onChange={handleDataChange}
                  value="false"
                  name="isFeatured"
                  inputProps={{ "aria-label": "B" }}
                />
              </div>
            </div>
            <input type="submit" value="Update" className="submitBtn" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProductProductBox;

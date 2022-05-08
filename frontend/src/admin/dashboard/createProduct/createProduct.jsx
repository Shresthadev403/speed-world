import React, { Fragment, useRef, useState, useEffect } from "react";
import "./createProduct.css";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import DescriptionIcon from "@mui/icons-material/Description";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ClassIcon from '@mui/icons-material/Class';
import { createProduct } from "../../../controllers/adminController";
import CircularProgress from '@mui/material/CircularProgress';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { resizeFile } from "../../../global/imageSizeReducer";

const categories = ["helmet", "gear", "glubs", "others"];

function CreateProduct(props) {
  const { enqueueSnackbar } = useSnackbar();
  const[isLoading,setIsLoading]=useState(false);
  const [product, setProduct] = useState({
    name: "",
    description:"",
    category:"",
    stock:"",
    price:""
  });

  
  const [imagePreview, setImagePreview] = useState(null);
  const {name ,description,category,stock,price}=product;

  const handleDataChange = (e) => {
    e.preventDefault();
    console.log("done");
    if (e.target.name === "productImage") {
      const file = e.target.files[0];
      resizeFile(file).then(image=>{
        console.log(image);
        setImagePreview(image);
      });

     
     
    } else {
      console.log(e.target.name);
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();
   const myForm=new FormData();
   myForm.set("name",name);
   myForm.set("description",description);
   myForm.set("images",imagePreview);
   myForm.set("category",category);
   myForm.set("price",price);
   myForm.set("stock",stock);
   setIsLoading(true);
createProduct(myForm).then(data=>{
  console.log(data);
  if(data.sucess==true){
    enqueueSnackbar("product created sucessfully",{variant:"success",autoHideDuration:2000});
    setIsLoading(false);
    setProduct({
      name:"",
      description:"",
      category:"",
      price:"",
      stock:""

    });
    setImagePreview("null");
  }
  
})
  };
if(isLoading){
  console.log("loading");
  return(<div className="loading">
  <CircularProgress />
  </div>)
}
  return (
    <div  className="component">
        <div className="Container-x-header">Create Product</div>
      <div className="Container-x">
    
        <div className="Container-x-Box">
         
          <form className="Form-x" onSubmit={handleSubmit}>
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
                required
                value={description}
                onChange={handleDataChange}
              />
            </div>
            <div>
            <ClassIcon/>
              <FormControl   sx={{  width:"100%",backgroundColor:"white"}}>
                 
                <InputLabel sx={{  font: "300 0.9em roboto",}} className="category"  >
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
                  required
               
                  sx={{ minWidth:56, maxHeight: 70,paddingLeft:"1.25em" }}
                >
                  
                  {categories.map((category) => {
                    return (
                      <MenuItem key={category}  value={category}>
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
                min="0"
                onInput={e=>{e.target.validity.valid||(e.target.value='')}}
                placeholder="Price"
                required
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
                onInput={e=>{e.target.validity.valid||(e.target.value='')}}
                name="stock"
                required
                value={stock}
               
                onChange={handleDataChange}
              />
            </div>
            <div id="productImage">
                  <img src={imagePreview} alt="product Preview" />
                  </div>
            <div id="registerImage">
                 <div>
                 <input
                    type="file"
                    name="productImage"
                    accept="image/*"
                    required
                    onChange={handleDataChange}
                  />
                 </div>
                </div>
            <input type="submit" value="Create" className="submitBtn" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;

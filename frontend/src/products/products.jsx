import * as React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ProductCard from "../productcard/productcard";
import { getAllProducts } from "../controllers/productControllers";

const categories = ["helmet", "gear", "glubs", "others"];

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 5,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

function Products() {
  const [products, setProducts] = React.useState(null);
  const [category, setCategory] = React.useState("");
  const [page, setPage] = React.useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  React.useEffect(() => {
    getAllProducts(category, page).then((data) => {
    //  console.log(data, "data");
      setProducts(data.products);
    });
    window.scrollTo(0, 0);
  }, [category, page]);

  return (
    <div className="component" style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "flex-start",
          p: 0.5,
          m: 0.5,
          bgcolor: "background.paper",
          maxWidth: "100",
          maxHeight: "200",
          borderRadius: 1,
          justifyContent: "center",
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={category}
            onChange={handleCategoryChange}
            autoWidth
            label="Category"
            sx={{ minWidth: 120, maxHeight: 50 }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {categories.map((category) => {
              return (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "flex-start",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          maxWidth: "100%",

          maxHeight: "200",
          borderRadius: 1,
          justifyContent: "center",
        }}
      >
        {products &&
          products.map((product) => {
            return (
              <Item key={product._id}>
              <Link to={`/Product/${product._id}`}><ProductCard product={product} /></Link>  
              </Item>
            );
          })}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "flex-start",
          p: 0.5,
          m: 0.5,
          bgcolor: "background.paper",
          maxWidth: "100",
          maxHeight: "200",
          borderRadius: 1,
          justifyContent: "center",
        }}
      >
        {products && products.length > 0 ? "" : "No Products found go back"}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "flex-start",
          p: 0.5,
          m: 0.5,
          bgcolor: "background.paper",
          maxWidth: "100",
          maxHeight: "200",
          borderRadius: 1,
          justifyContent: "center",
        }}
      >
        <Pagination
          count={10}
          siblingCount={1}
          color="secondary"
          size="small"
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </div>
  );
}

export default Products;

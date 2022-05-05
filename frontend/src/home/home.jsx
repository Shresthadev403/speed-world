import '../css/global.css'

import * as React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import ProductCard from '../productcard/productcard';
import { getAllProducts, getFeaturedProductsFirst } from '../controllers/productControllers';
import { ClassNames } from '@emotion/react';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 5,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};





 function Home() {
   const[products,setProducts]=React.useState(null);
  React.useEffect(()=>{
    getFeaturedProductsFirst().then(data=>{
      //console.log(data,"data");
      setProducts(data.products);
    })
    },[]);

  return (
    <div  className='component' style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          maxWidth: '100%',
         
          maxHeight:'200',
          borderRadius: 1,
          justifyContent:'center'
        }}
      >
       
       {products &&
          products.map((product) => {
            return (
              <Item key={product._id}>
              <Link to={`/product/${product._id}`}><ProductCard product={product} /></Link>  
              </Item>
            );
          })}
      </Box>
      <div style={{textAlign:"center"}}>
        <Link to={'/products'}  style={{textDecoration:"none",fontSize:"2.5vmax",color:"orange"}}>Explore more products</Link>
      </div>
     
    </div>
  );
}

export default Home;
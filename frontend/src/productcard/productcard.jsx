import './productCard.css'

import * as React from 'react';
import ReactStars from "react-rating-stars-component";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ProductCard(props) {
    const {product}=props;
    const reactStarsOptions = {
      size: 30,
      value: product.rating,
      edit: false,
      isHalf:true
    };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="300"
        image={product&&product.images[0].image_url}
        alt={product?product.name:"product"}
        sx={{ height:"300",width:"300",minWidth:300 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div"color="orange">
          { product && product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {product&&product.description}
        </Typography>
        <Typography variant="h6" color="green">
        Nrs: {product&&product.price}
        </Typography>
        <Typography variant="h6" color={product&& product.stock!=0?"green":"red"}>
        {product&& product.stock!=0?"In stock":"Out of stock"}
        </Typography>
        <ReactStars {...reactStarsOptions} />
      </CardContent>
      <CardActions>
        <Button size="small">Reviews: {product&&product.numOfReviews}</Button>
        
      </CardActions>
    </Card>
  );
}

export default ProductCard;
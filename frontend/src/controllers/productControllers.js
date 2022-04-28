import axios from "axios";

export const getAllProducts = (
  category = "",
  currentPage = 1,
  keyword = ""
) => {
  let link;

  if (category && keyword) {
    link = `${process.env.REACT_APP_API_URI}/products?category=${category}&page=${currentPage}&keyword=${keyword}`;
  } else if (keyword) {
    link = `${process.env.REACT_APP_API_URI}/products?keyword=${keyword}&page=${currentPage}`;
  } else if (category) {
    link = `${process.env.REACT_APP_API_URI}/products?category=${category}&page=${currentPage}`;
  } else {
    link = `${process.env.REACT_APP_API_URI}/products?page=${currentPage}`;
  }

  return axios
    .get(link)
    .then((response) => {
   //   console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return err.response.data;
    });
};

export const getFeaturedProductsFirst=()=>{
  return  axios.get(`${process.env.REACT_APP_API_URI}/products/featured`,{
    withCredentials:true
}).then(response=>{
   // console.log(response);
   return response.data;
}).catch(err=>{
    console.log(err.response.data);
    return err.response.data;
})
}
export const getProductDetails=(productId)=>{
  return  axios.get(`${process.env.REACT_APP_API_URI}/product/${productId}`,{
      withCredentials:true
  }).then(response=>{
     // console.log(response);
     return response.data;
  }).catch(err=>{
      console.log(err.response.data);
      return err.response.data;
  })
}


export const getProductReviews=(productId)=>{
  return  axios.get(`${process.env.REACT_APP_API_URI}/review/${productId}`,{
      withCredentials:true
  }).then(response=>{
     // console.log(response);
     return response.data;
  }).catch(err=>{
      console.log(err.response.data);
      return err.response.data;
  })
}

export const sendReviews=(productId,comment,rating)=>{
  return  axios.put(`${process.env.REACT_APP_API_URI}/user/review`,{productId:productId,comment:comment,rating:rating},{
      withCredentials:true
  }).then(response=>{
     // console.log(response);
     return response.data;
  }).catch(err=>{
      console.log(err.response.data);
      return err.response.data;
  })
}


export const deleteProductByAdmin=(productId)=>{
  return  axios.delete(`${process.env.REACT_APP_API_URI}/product/delete/${productId}`,{
      withCredentials:true
  }).then(response=>{
     // console.log(response);
     return response.data;
  }).catch(err=>{
      console.log(err.response.data);
      return err.response.data;
  })
}


export const updateProductByAdmin=(productId,updateData)=>{
  return  axios.put(`${process.env.REACT_APP_API_URI}/product/update/${productId}`,updateData,{
      withCredentials:true
  }).then(response=>{
     // console.log(response);
     return response.data;
  }).catch(err=>{
      console.log(err.response.data);
      return err.response.data;
  })
}
import axios from 'axios'

export const makeOrder=(orderData,productId)=>{
    return  axios.post(`${process.env.REACT_APP_API_URI}/order/new?productId=${productId}`,orderData,{
        header:{
            contentType:'application/json'
        },withCredentials:true
    }).then(response=>{
       console.log(response);
       return response.data;
    }).catch(err=>{
        console.log(err.response.data);
        return err.response.data;
    });
}
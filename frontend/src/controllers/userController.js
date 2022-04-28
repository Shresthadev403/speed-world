import axios from "axios"

export const signUp=(signUpData)=>{
    // console.log(loginData);
   return  axios.post(`${process.env.REACT_APP_API_URI}/createnewuser`,signUpData,{
         header:{
             contentType:'application/json'
         },withCredentials:true
     }).then(response=>{
       //  console.log(response);
        return response.data;
     }).catch(err=>{
         console.log(err.response.data);
         return err.response.data;
     });
 
 
 }

export const login=(loginData)=>{
   // console.log(loginData);
  return  axios.post(`${process.env.REACT_APP_API_URI}/signin`,loginData,{
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

export const logout=()=>{
 
    return  axios.get(`${process.env.REACT_APP_API_URI}/signout`,{
        withCredentials:true
    }).then(response=>{
        console.log(response);
       return response.data;
    }).catch(err=>{
        console.log(err.response.data);
        return err.response.data;
    })
}

export const getMyProfile=()=>{
    return  axios.get(`${process.env.REACT_APP_API_URI}/myprofile`,{
        withCredentials:true
    }).then(response=>{
       // console.log(response);
       return response.data;
    }).catch(err=>{
        console.log(err.response.data);
        return err.response.data;
    })
}


export const getMyOrders=()=>{
    return  axios.get(`${process.env.REACT_APP_API_URI}/myorders`,{
        withCredentials:true
    }).then(response=>{
       // console.log(response);
       return response.data;
    }).catch(err=>{
        console.log(err.response.data);
        return err.response.data;
    })
}


export const forgetPassowrd=(email)=>{
    return  axios.post(`${process.env.REACT_APP_API_URI}/forgetpassword`,{email:email},{
        withCredentials:true
    }).then(response=>{
       // console.log(response);
       return response.data;
    }).catch(err=>{
        console.log(err.response.data);
        return err.response.data;
    })
}

export const resetPassword=(resetToken,resetData)=>{
    console.log(resetData);
    return  axios.post(`${process.env.REACT_APP_API_URI}/resetpassword/${resetToken}`,resetData,{
        withCredentials:true
    }).then(response=>{
       // console.log(response);
       return response.data;
    }).catch(err=>{
        console.log(err.response.data);
        return err.response.data;
    })
}
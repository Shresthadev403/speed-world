import axios from "axios";

export const createProduct = (productData) => {
  return axios
    .post(`${process.env.REACT_APP_API_URI}/createnewproduct`, productData, {
      header: {
        contentType: "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return err.response.data;
    });
};


// orders
export const getAllProcessingOrders= () => {
  return axios
    .get(`${process.env.REACT_APP_API_URI}/admin/orders/processing`, {
      header: {
        contentType: "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return err.response.data;
    });
};


// history
export const getDeliveredOrCancelledOrders= () => {
  return axios
    .get(`${process.env.REACT_APP_API_URI}/admin/orders/deliveredorcancelled`, {
      header: {
        contentType: "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return err.response.data;
    });
};


export const getDeliveredOrders= () => {
  return axios
    .get(`${process.env.REACT_APP_API_URI}/admin/orders/delivered`, {
      header: {
        contentType: "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return err.response.data;
    });
};



// spam
export const getdeletedOrders= () => {
  return axios
    .get(`${process.env.REACT_APP_API_URI}/admin/orders/deleted`, {
      header: {
        contentType: "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return err.response.data;
    });
};

export const getUserDetails = (userId) => {
  return axios
    .get(`${process.env.REACT_APP_API_URI}/user/${userId}`, {
      header: {
        contentType: "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return err.response.data;
    });
};

export const changeStatusOfOrder=(orderId,orderStatus)=>{
  return axios
    .put(`${process.env.REACT_APP_API_URI}/admin/update/orderstatus/${orderId}`,{"status":orderStatus} ,{
      header: {
        contentType: "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return err.response.data;
    });

}

export const moveToSpamFolder=(orderId)=>{
  return axios
    .put(`${process.env.REACT_APP_API_URI}/admin/update/deletestatus/${orderId}`,{"deleted":true} ,{
      header: {
        contentType: "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return err.response.data;
    });

}

// get stock info
export const getStockInfo= () => {
  return axios
    .get(`${process.env.REACT_APP_API_URI}/admin/stock`, {
      header: {
        contentType: "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return err.response.data;
    });
};



export const getAllUsers= () => {
  return axios
    .get(`${process.env.REACT_APP_API_URI}/users`, {
      header: {
        contentType: "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return err.response.data;
    });
};


//////contact form
// get all contactform --admin
export const getallContactForms = () => {
  return axios
    .get(`${process.env.REACT_APP_API_URI}/contactforms`, {
      header: {
        contentType: "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return err.response.data;
    });
};

// delete contact form  --admin
export const deleteContactForm = (contactFormId) => {
  return axios
    .delete(
      `${process.env.REACT_APP_API_URI}/contactform/delete/${contactFormId}`, {
        header: {
          contentType: "application/json",
        },
        withCredentials: true,
      }
    )
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return err.response.data;
    });
};

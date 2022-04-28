import axios from "axios";

export const createNewContactFormOrUpdate = (contactData) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_URI}/createnewcontactform`,
      contactData,
      {
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


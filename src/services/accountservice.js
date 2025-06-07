import { BASE_URL } from "config/CONSTANTS"
import { object } from "prop-types"
import axiosClient from "./clientservice"
import axios from "axios"



// account service starts

export const accountLoginServices = async (apiData) => {
  return axiosClient.post(process.env.REACT_APP_BASE_API_URL + 'Account/login', {
    email: 'admin@sscam.com',
    password: 'admin@123'
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const getProfile = async () => {
  const response = await axios.get(process.env.REACT_APP_BASE_API_URL  + "User/myprofile"); // Replace with your actual endpoint
  return response.data;
};
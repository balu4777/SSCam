import { BASE_URL } from "config/CONSTANTS"
import { object } from "prop-types"
import axiosClient from "./clientservice"
import axios from "axios"
import useAuth from '../hooks/useAuth';

// account service starts

export const accountLoginServices = async (apiData) => {
  return axiosClient.post(process.env.REACT_APP_BASE_API_URL + 'account/login', {
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

export const getProfile = async (accessToken) => {
  const response = await axiosClient.get( "user/myprofile",{
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    withCredentials: true
  }
  ); // Replace with your actual endpoint
  return response.data;
};
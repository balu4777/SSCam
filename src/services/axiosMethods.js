import axiosClient from "./clientservice";
import { handleResponse } from "./responseHandlers";

export const getCall = async (URL, showToaster = false, config = {}) => {
  try {
    const response = await axiosClient.get(URL, config);
    return handleResponse(response, showToaster);
  } catch (error) {
    return handleResponse(error?.response, true);
  }
};

export const postCall = async (URL, payload = {}, showToaster = false, config = {}) => {
  try {
    const response = await axiosClient.post(URL, payload, config);
    return handleResponse(response, showToaster);
  } catch (error) {
    return handleResponse(error?.response, true);
  }
};

export const putCall = async (URL, payload = {}, showToaster = false, config = {}) => {
  try {
    const response = await axiosClient.put(URL, payload, config);
    return handleResponse(response, showToaster);
  } catch (error) {
    return handleResponse(error?.response, true);
  }
};

export const deleteCall = async (URL, payload = {}, showToaster = false, config = {}) => {
  try {
    const response = await axiosClient.delete(URL, { data: payload, ...config });
    return handleResponse(response, showToaster);
  } catch (error) {
    return handleResponse(error?.response, true);
  }
};

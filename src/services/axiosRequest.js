import axios from "axios"
import { BLOCK_USER_MESSAGE, NO_RECORDES_FOUND } from "../config/CONSTANTS"
import axiosClient from "./clientservice"
import { handleResponseFromStatusCode } from "./handleResponseFromStatusCode"

let cancelToken

const getResponseMethod = async (response, isShowToaster, isShowLoader) => {
  // disable loader after getting response from api  

  if (isShowToaster === true || isShowToaster === false) {
    let out = await handleResponseFromStatusCode(response, isShowToaster)
    return out
  }
  return response
}

export function getRequest(URL, isShowToaster, isShowLoader, axiosConfig) {
  //showLoaderHandler(isShowLoader)
  return axiosClient
    .get(`${URL}`, axiosConfig)
    .then((response) =>
      getResponseMethod(response, isShowToaster, isShowLoader)
    )
    .catch((error) => {
      if (error?.message === "cancelled" || error?.response?.data?.message===NO_RECORDES_FOUND) {
        return error
      }
      return getResponseMethod(error?.response, true, isShowLoader)
    })
}

export function getRequestNotification(URL, isShowToaster) {
  return axiosClient
    .get(`${URL}`)
    .then((response) => getResponseMethod(response?.data?.data))
    .catch((error) => {
      return getResponseMethod(error?.response, true)
    })
}

export function getRequestNotificationTransaction(URL, loader,isShowToaster) {
  return axiosClient
    .get(`${URL}`)
    .then((response) => getResponseMethod(response,false,loader))
    .catch((error) => {
      return getResponseMethod(error?.response, true)
    })
}
export function postRequest(URL, payload, isShowToaster, isShowLoader, isShowErrorToast = true) {
  //showLoaderHandler(isShowLoader)
  return axiosClient
    .post(`${URL}`, payload)
    .then((response) => {
      return getResponseMethod(response, isShowToaster, isShowLoader)
    })
    .catch((error) => {
      
      if(error?.response?.data?.message === BLOCK_USER_MESSAGE || !isShowErrorToast)
      {
        return getResponseMethod(error?.response, false, isShowLoader)
      }
      return getResponseMethod(error?.response, isShowToaster, isShowLoader)
    })
}

// this is temporary for cancelling pending request later it will be refactored

export function postRequestSearch(URL, payload, isShowToaster, isShowLoader) {
  //showLoaderHandler(isShowLoader)
  if (cancelToken) {
    cancelToken.cancel("Operations cancelled due to new request")
  }
  cancelToken = axios.CancelToken.source()
  return axiosClient
    .post(`${URL}`, payload, {
      cancelToken: cancelToken.token,
    })
    .then((response) => {
      return getResponseMethod(response, isShowToaster, isShowLoader)
    })
    .catch((error) => {
      return getResponseMethod(error?.response, true, isShowLoader)
    })
}
export function putRequest(URL, payload, isShowToaster, isShowLoader) {
  //showLoaderHandler(isShowLoader)
  return axiosClient
    .put(`${URL}`, payload)
    .then((response) =>
      getResponseMethod(response, isShowToaster, isShowLoader)
    )
    .catch((error) => {
      return getResponseMethod(error?.response, isShowToaster, isShowLoader)
    })
}

export function patchRequest(URL, payload, isShowToaster) {
  return axiosClient
    .patch(`${URL}`, payload)
    .then((response) => getResponseMethod(response, isShowToaster))
    .catch((error) => {
      return getResponseMethod(error?.response, true)
    })
}

export function deleteRequest(URL, payload, isShowToaster, isShowLoader) {
  return axiosClient
    .delete(`${URL}`, payload)
    .then((response) =>
      getResponseMethod(response, isShowToaster, isShowLoader)
    )
    .catch((error) => {
      return getResponseMethod(error?.response, true)
    })
}

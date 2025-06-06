import { toast } from "react-toastify"

import { toastSuccess, toastError } from "../helper/customToaster"

const showToaster = (response, error, isShowToaster) => {
  if (isShowToaster) {
    if (response?.data?.isSuccess && !error)
      toast.success(response?.data?.message, toastSuccess())
    else if (!response?.data?.isSuccess || error) {
      if (!response?.data?.data?.errors) {
        toast.error(response?.data?.message, toastError())
      }
    }
  }
  return response?.data
}

export function handleResponseFromStatusCode(response, isShowToaster) {
  if (response?.status === 201 && response?.data) {
    return showToaster(response, false, isShowToaster)
  }
  if (response?.status === 200 && response?.data) {
    return showToaster(response, false, isShowToaster)
  }
  if (response?.status === 400 && response?.data) {
    return showToaster(response, true, isShowToaster)
  }
  if (response?.status === 404 && response?.data) {
    return showToaster(response, false, false)
  }
  if (response?.status === 401) {
    localStorage.clear()
    window.location.reload()
  }
  if (response?.status === 500) {
    return {
      message: "Something went wrong.Please try after sometime.",
      status: 500,
    }
  }
  if (response?.status === 801 && response?.data) {
    return showToaster(response, false, isShowToaster)
  }

  // If anyother status code, we are not showing
  return showToaster(response, false, false)
}

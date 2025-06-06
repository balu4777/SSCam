import React from "react"
import SuccessIcon from "../assets/images/Success.svg"
import DangerIcon from "../assets/images/Danger.svg"
import WarningIcon from "../assets/images/Warning.svg"
import InfoIcon from "../assets/images/info_blue_circle.svg"

export function toastSuccess(additionalConfig = {}) {
  return {
    icon: () => (<img src={SuccessIcon} alt="" />),
    ...additionalConfig
  }
}
export function toastError(additionalConfig = {}) {
  return {
    icon: () => (<img src={DangerIcon} alt="" />),
    ...additionalConfig
  }
}
export function toastWarn(additionalConfig = {}) {
  return {
    icon: () => (<img src={WarningIcon} alt="" />),
    ...additionalConfig
  }
}
export function toastInfo(additionalConfig = {}) {
  return {
    icon: () => (<img src={InfoIcon} alt="" />),
    ...additionalConfig
  }
}

export const ToastWithButton = ({ message, children }) => {
  return (
    <div className="custom-content">
      {message}
      {children}
    </div>
  )
}
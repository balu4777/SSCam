import { toast } from "react-toastify";

// toaster handler
const toastHandler = (data, showToaster, error) => {
  const { message, isSuccess } = data || {};
  if (showToaster) {
    if (isSuccess && !error) toast.success(message);
    else if (!isSuccess || error) {
      toast.error(message);
    }
  }
  return data;
};

// handler response according to response codes
export const handleResponse = (response, showToaster) => {
  const { status, data } = response || {};
  switch (status) {
    case 200:
    case 201:
      if (data) return toastHandler(data, showToaster, false);
    case 400:
      if (data) return toastHandler(data, showToaster, true);
    case 404:
      if (data) return toastHandler(data, false, false);
    case 401:
      localStorage.clear();
      window.location.reload();
      return;
    case 500:
      return {
        message: "Something went wrong. Please try after some time.",
        status: 500,
      };
    default:
      return toastHandler(data, false, false);
  }
};

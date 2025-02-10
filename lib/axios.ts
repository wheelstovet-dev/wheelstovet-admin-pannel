import Axios, { AxiosResponse, Method } from 'axios';
import { getSessionStorageItem, removeSessionStorageItem } from '@/utils/localStorage'; // Assuming you have a function to remove items from sessionStorage

// Request Interceptor to add the token
function authRequestInterceptor(config: any) {
  config.headers = config.headers ?? {};
  const token: any = getSessionStorageItem('token');
  if (token) {
    config.headers.authorization = `Bearer ${token.token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  // baseURL: ${process.env.NEXT_PUBLIC_API_URL}
  baseURL: "http://15.206.246.97:3001"
});

// Adding request interceptor
axios.interceptors.request.use(authRequestInterceptor);

// Response Interceptor to handle 401 Unauthorized (token expired)
axios.interceptors.response.use(
  (response: any) => {
    return response.data?.result ? response.data?.result : response.data;
  },
  (error: any) => {
    let message = error.response?.data || error.message;

    // If the error is a 401 Unauthorized, handle the token expiration
    if (error.response && error.response.status === 401) {
      // Clear the token if expired or invalid
      localStorage.clear(); // Clear all localStorage items
      removeSessionStorageItem('token'); // Assuming you have this function to remove items from sessionStorage
      
      // Redirect user to login page automatically
      window.location.href = '/auth/login'; // Adjust the route as needed
    } else if (error.response && error.response.data && error.response.data.error) {
      message =
        error.response.data.error?.errors.join(',') ||
        error.response.data.error?.error_params
          ?.map((e: any) => e.message || e.msg)
          ?.join(',');
    }

    // Return a rejected promise with the error message
    return Promise.reject({
      statusCode: error.response?.status,
      message: message
    });
  }
);

// Common method for API calls
async function apiCall<T = any>(
  method: Method,
  url: string,
  data?: any
): Promise<AxiosResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url,
      data,
      // You can add headers or other configurations here if needed
    });
    return response; // Return the full response object
  } catch (error: any) {
    // Log the error for debugging if necessary
    throw error; // Rethrow the error for handling in the caller
  }
}

export default apiCall;

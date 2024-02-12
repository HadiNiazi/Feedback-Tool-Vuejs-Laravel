import axios from 'axios';

// Add request interceptor
axios.interceptors.request.use(
  config => {
    // Retrieve the authentication token from local storage
    const authToken = localStorage.getItem('auth_token');

    // Set the authorization header if the token exists
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  error => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default axios;

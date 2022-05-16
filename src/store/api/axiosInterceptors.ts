import axios from 'axios';
// import { LOGIN } from '../../navigation/routes/routes';

const axiosInterceptors = (token: string) => {
  axios.interceptors.request.use(
    (config) => {
      if (token) {
        // @ts-ignore
        config.headers.Authorization = token ? `Bearer ${token}` : null;
      }
      // Do something before request is sent
      return config;
    },
    (error) => Promise.reject(error),
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        window.location.replace(window.location.origin);
        localStorage.removeItem('token');
      }
    },
    // @ts-ignore
    (error) => Promise.reject(error),
  );
};

export default axiosInterceptors;

import axios from 'axios';
// import { LOGIN } from '../../navigation/routes/routes';

const axiosInterceptors = (token: string) => {
  axios.interceptors.request.use(
    (config) => {
      config.headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
        'Content-Type': 'application/json',
      };
      if (token) {
        // @ts-ignore
        config.headers.Authorization = token ? `Bearer ${token}` : null;
      }
      // Do something before request is sent
      console.log(config.headers);
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

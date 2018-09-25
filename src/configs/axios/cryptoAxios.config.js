//@ts-check

import axios from "axios";

let cryptoAxios = axios.create();

cryptoAxios.interceptors.response.use(
  function(response) {
    // Do something with response data
    //return response.data.data;
    return response.data;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default cryptoAxios;

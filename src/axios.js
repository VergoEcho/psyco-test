import Axios from "axios";
import store from "./store/index";

const axios = Axios.create({
  // baseURL: "https://nervous-mental-stability-test.herokuapp.com/api",
  baseURL: "http://localhost:8080/api",
});

axios.interceptors.request.use((request) => {
  if (store.getters.isAdmin && !request.headers.common["Authorization"]) {
    const token = store.getters.adminToken;
    request.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return request;
});

export default axios;

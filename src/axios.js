import Axios from "axios";
const axios = Axios.create({
  // baseURL: "https://nervous-mental-stability-test.herokuapp.com/api",
  baseURL: "http://localhost:8080/api",
});

export default axios;

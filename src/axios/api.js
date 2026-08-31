import axios from "axios";

const api = axios.create({
  baseURL: "https://api.thectcgroup.in/",
  // baseURL: 'https://dimerse.com/ctc-group',
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

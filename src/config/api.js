import axios from "axios";

export const API = axios.create({
  // baseURL: "http://34.101.33.73:5000/api/v1",
  baseURL: "http://localhost:5000/cinema/"
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.commin["Authorization"];
  }
};

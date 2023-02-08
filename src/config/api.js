import axios from "axios";

export const API = axios.create({
  baseURL: "https://api1.chaostic-hoki.my.id/api/v1"
  // baseURL: "http://localhost:5000/cinema/"
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.commin["Authorization"];
  }
};

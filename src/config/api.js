//api Config
import axios from "axios";

export const API = axios.create({
    // baseURL: process.env.REACT_APP_BASEURL //API INTEGRATION FOR DEPLOY BACKEND
    baseURL: "http://localhost:5000/api/v1/", //API INTEGRATION FOR LOCALHOST
});

    export const setAuthToken = (token) => {
        if (token) {
            API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete API.defaults.headers.common["Authorization"];
        }
    };

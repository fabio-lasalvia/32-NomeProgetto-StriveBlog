import axios from "axios";

//////////////////
///// AXIOS /////
/////////////////
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

//////////////////////
/////INTERCEPTOR /////
//////////////////////
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // console.log("Token Axios:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;

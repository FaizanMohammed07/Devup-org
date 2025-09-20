import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const loginUser = (credentials) => API.post("/auth/login", credentials);

export const postMessage = (message) =>
  API.post("/messages/create", message, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export const fetchMessages = () =>
  API.get("/messages", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

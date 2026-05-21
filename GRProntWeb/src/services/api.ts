import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:44329/api", // ajuste conforme porta da sua API
});

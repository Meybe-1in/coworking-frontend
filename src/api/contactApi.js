import API from "./axiosConfig";

export const sendContact = (data) =>
  API.post("/contact", data);
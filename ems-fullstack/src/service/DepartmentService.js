import axios from "axios";

const BASE_URL = "http://localhost:8080/api/departments";

export const getAllDepartments = () => {
  return axios.get(BASE_URL);
};
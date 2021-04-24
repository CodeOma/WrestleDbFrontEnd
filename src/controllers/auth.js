import axios from "axios";
import { auth } from "../firebase";
const API = "http://localhost:5000";

export const createUserAccount = data => {
  return axios.post(`${API}/signup`, data).then(res => res.data);
};

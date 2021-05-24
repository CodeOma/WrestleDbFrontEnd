import axios from "axios";
import { auth } from "../firebase";
const API = "http://localhost:5000";

export const createUserAccount = data => {
  try {
    return axios.put(`${API}/auth/signup`, data).then(res => res.data);
  } catch (e) {
    console.log(e);
  }
};

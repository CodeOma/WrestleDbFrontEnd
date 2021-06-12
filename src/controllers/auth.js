import axios from "axios";
import { auth } from "../firebase";
const API = process.env.REACT_APP_API;

export const createUserAccount = async data => {
  try {
    const create = await axios.put(`${API}/auth/signup`, data);
    return create;
  } catch (e) {
    return e;
  }
};

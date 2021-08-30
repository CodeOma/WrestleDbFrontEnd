import axios from "axios";
import { getIdToken } from "../../firebase";

const API = process.env.REACT_APP_API;

export const userCreateCategory = async category => {
  try {
    const token = await getIdToken();

    const update = await axios.post(`${API}/user/category`, category, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};
export const userUpdateCategory = async category => {
  try {
    const token = await getIdToken();

    const update = await axios.put(`${API}/user/category`, category, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};
export const userFetchCategory = async () => {
  try {
    const token = await getIdToken();
    const data = axios.get(`${API}/user/category/all`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const userDeleteCategory = async category => {
  try {
    const token = await getIdToken();

    const update = await axios.delete(`${API}/user/category/${category._id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};

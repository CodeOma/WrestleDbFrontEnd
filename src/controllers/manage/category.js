import axios from "axios";
import { getIdToken } from "../../firebase";

const API = "http://localhost:5000";

export const userCreateCategory = async category => {
  try {
    const token = await getIdToken();

    const update = await axios.post(`${API}/user/category`, category, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(update);
  } catch (e) {
    console.log(e);
  }
};
export const userUpdateCategory = async category => {
  try {
    const token = await getIdToken();

    const update = await axios.put(`${API}/user/category`, category, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(update);
  } catch (e) {
    console.log(e);
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
    console.log(update);
  } catch (e) {
    console.log(e);
  }
};

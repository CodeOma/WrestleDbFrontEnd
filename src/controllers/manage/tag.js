import axios from "axios";
import { getIdToken } from "../../firebase";

const API = "http://localhost:5000";

export const userCreateTag = async tag => {
  try {
    const token = await getIdToken();

    const update = await axios.post(`${API}/user/tag`, tag, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(update);
  } catch (e) {
    console.log(e);
  }
};
export const userUpdateTag = async tag => {
  try {
    const token = await getIdToken();

    const update = await axios.put(`${API}/user/tag`, tag, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(update);
  } catch (e) {
    console.log(e);
  }
};
export const userFetchTag = async () => {
  try {
    const token = await getIdToken();
    const data = axios.get(`${API}/user/tag/all`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const userFetchTagById = async id => {
  try {
    const token = await getIdToken();

    const data = await axios.get(`${API}/user/tag/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const userDeleteTag = async tag => {
  try {
    const token = await getIdToken();

    const update = await axios.delete(`${API}/user/tag/${tag._id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(update);
  } catch (e) {
    console.log(e);
  }
};

import axios from "axios";
import { getIdToken } from "../../firebase";

const API = "http://localhost:5000";

export const userCreatePosition = async position => {
  try {
    const token = await getIdToken();

    const update = await axios.post(`${API}/user/position`, position, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(update);
  } catch (e) {
    console.log(e);
  }
};
export const userUpdatePosition = async position => {
  try {
    const token = await getIdToken();

    const update = await axios.put(`${API}/user/position`, position, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(update);
  } catch (e) {
    console.log(e);
  }
};
export const userFetchPosition = async () => {
  try {
    const token = await getIdToken();
    const data = axios.get(`${API}/user/position/all`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const userDeletePosition = async position => {
  try {
    const token = await getIdToken();

    const update = await axios.delete(`${API}/user/position/${position._id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(update);
  } catch (e) {
    console.log(e);
  }
};

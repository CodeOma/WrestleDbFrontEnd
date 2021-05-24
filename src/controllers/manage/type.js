import axios from "axios";
import { getIdToken } from "../../firebase";

const API = "http://localhost:5000";

export const userCreateType = async type => {
  try {
    const token = await getIdToken();

    const update = await axios.post(`${API}/user/type`, type, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(update);
  } catch (e) {
    console.log(e);
  }
};
export const userUpdateType = async type => {
  try {
    const token = await getIdToken();

    const update = await axios.put(`${API}/user/type`, type, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(update);
  } catch (e) {
    console.log(e);
  }
};
export const userFetchType = async () => {
  try {
    const token = await getIdToken();
    const data = axios.get(`${API}/user/type/all`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const userDeleteType = async type => {
  try {
    const token = await getIdToken();

    const update = await axios.delete(`${API}/user/type/${type._id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(update);
  } catch (e) {
    console.log(e);
  }
};

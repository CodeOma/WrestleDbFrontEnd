import axios from "axios";
import { getIdToken } from "../../firebase";

const API = "http://localhost:5000";

export const userCreateWrestler = async wrestler => {
  try {
    const token = await getIdToken();

    const update = await axios.post(`${API}/user/wrestler`, wrestler, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(update);
  } catch (e) {
    console.log(e);
  }
};
export const userUpdateWrestler = async wrestler => {
  try {
    const token = await getIdToken();

    const update = await axios.put(`${API}/user/wrestler`, wrestler, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(update);
  } catch (e) {
    console.log(e);
  }
};
export const userFetchWrestler = async () => {
  try {
    console.log("fec");
    const token = await getIdToken();
    const data = axios.get(`${API}/user/wrestler/all`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const userFetchWrestlerById = async id => {
  try {
    const token = await getIdToken();

    const data = await axios.get(`${API}/user/wrestler/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const userDeleteWrestler = async wrestler => {
  try {
    const token = await getIdToken();

    const update = await axios.delete(`${API}/user/wrestler/${wrestler._id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(update);
  } catch (e) {
    console.log(e);
  }
};

import axios from "axios";
import { getIdToken } from "../../firebase";

const API = "http://localhost:5000";

export const userCreateWrestler = async wrestler => {
  try {
    const token = await getIdToken();

    const update = await axios.post(`${API}/user/wrestler`, wrestler, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};
export const userUpdateWrestler = async wrestler => {
  try {
    const token = await getIdToken();

    const update = await axios.put(`${API}/user/wrestler`, wrestler, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};
export const userFetchWrestler = async () => {
  try {
    const token = await getIdToken();
    const data = axios.get(`${API}/user/wrestler/all`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (e) {
    return e;
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
    return e;
  }
};
export const userDeleteWrestler = async id => {
  try {
    const token = await getIdToken();

    const update = await axios.delete(`${API}/user/wrestler/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};

import axios from "axios";
import { getIdToken } from "../../firebase";

const API = "http://localhost:5000";

export const userCreateTournament = async tournament => {
  try {
    console.log("create");
    const token = await getIdToken();

    const update = await axios.post(`${API}/user/tournament`, tournament, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};
export const userUpdateTournament = async tournament => {
  try {
    const token = await getIdToken();

    const update = await axios.put(`${API}/user/tournament`, tournament, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};
export const userFetchTournament = async () => {
  try {
    const token = await getIdToken();
    const data = axios.get(`${API}/user/tournament/all`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (e) {
    return e;
  }
};
export const userDeleteTournament = async id => {
  try {
    const token = await getIdToken();

    const update = await axios.delete(`${API}/user/tournament/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};

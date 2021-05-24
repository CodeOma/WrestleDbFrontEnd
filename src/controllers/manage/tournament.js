import axios from "axios";
import { getIdToken } from "../../firebase";

const API = "http://localhost:5000";

export const userCreateTournament = async tournament => {
  try {
    const token = await getIdToken();

    const update = await axios.post(`${API}/user/tournament`, tournament, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(update);
  } catch (e) {
    console.log(e);
  }
};
export const userUpdateTournament = async tournament => {
  try {
    const token = await getIdToken();

    const update = await axios.put(`${API}/user/tournament`, tournament, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(update);
  } catch (e) {
    console.log(e);
  }
};
export const userFetchTournament = async () => {
  try {
    const token = await getIdToken();
    const data = axios.get(`${API}/user/tournament/all`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const userDeleteTournament = async tournament => {
  try {
    const token = await getIdToken();

    const update = await axios.delete(
      `${API}/user/tournament/${tournament._id}`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    console.log(update);
  } catch (e) {
    console.log(e);
  }
};

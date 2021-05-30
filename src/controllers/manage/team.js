import axios from "axios";
import { getIdToken } from "../../firebase";

const API = "http://localhost:5000";

export const userCreateTeam = async team => {
  try {
    const token = await getIdToken();

    const update = await axios.post(`${API}/user/team`, team, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};
export const userUpdateTeam = async team => {
  try {
    const token = await getIdToken();

    const update = await axios.put(`${API}/user/team`, team, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};
export const userFetchTeam = async () => {
  try {
    const token = await getIdToken();
    const data = axios.get(`${API}/user/team/all`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (e) {
    return e;
  }
};
export const userDeleteTeam = async id => {
  try {
    const token = await getIdToken();

    const update = await axios.delete(`${API}/user/team/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};

export const userAutocompleteTeam = async query => {
  try {
    if (query.length > 0) {
      const token = await getIdToken();
      console.log(query);
      var url = `${API}/user/autosearch/team/${query}`;
      const fetch = await axios.get(url, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await fetch.data;
      return data;
    }
  } catch (e) {
    return e;
  }
};

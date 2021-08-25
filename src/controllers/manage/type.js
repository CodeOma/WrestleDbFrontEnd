import axios from "axios";
import { getIdToken } from "../../firebase";

const API = process.env.REACT_APP_API;

export const userCreateType = async type => {
  try {
    const token = await getIdToken();

    const update = await axios.post(`${API}/user/type`, type, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};
export const userUpdateType = async type => {
  try {
    const token = await getIdToken();

    const update = await axios.put(`${API}/user/type`, type, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};
export const userFetchType = async () => {
  try {
    const token = await getIdToken();
    const data = axios.get(`${API}/user/type/all`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (e) {
    return e;
  }
};
export const userDeleteType = async id => {
  try {
    const token = await getIdToken();

    const update = await axios.delete(`${API}/user/type/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};

export const userAutocompleteType = async query => {
  try {
    if (query.length > 0) {
      const token = await getIdToken();
      console.log(query);
      var url = `${API}/user/autosearch/type/${query}`;
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

import axios from "axios";
import { getIdToken } from "../../firebase";

const API = process.env.REACT_APP_API;

export const userCreatePosition = async position => {
  try {
    const token = await getIdToken();

    const update = await axios.post(`${API}/user/position`, position, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};
export const userUpdatePosition = async position => {
  try {
    const token = await getIdToken();

    const update = await axios.put(`${API}/user/position`, position, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};
export const userFetchPosition = async () => {
  try {
    const token = await getIdToken();
    const data = axios.get(`${API}/user/position/all`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (e) {
    return e;
  }
};
export const userDeletePosition = async id => {
  try {
    const token = await getIdToken();

    const update = await axios.delete(`${API}/user/position/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};

export const userAutocompletePosition = async query => {
  try {
    if (query.length > 0) {
      const token = await getIdToken();
      console.log(query);
      var url = `${API}/user/autosearch/position/${query}`;
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
